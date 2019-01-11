import * as Actions from '../models/api/ApiActions';
import APIUtils from '../util/APIUtils';
import { pctEncChar } from 'uri-js';
const { ipcRenderer } = require('electron');

const ecc = require('eosjs-ecc');
export class PopupService {
    openPopup = null;
    queue = [];
    currentPopup = null;
    queueInfo = {
        size: 0
    };
    
    connect(openPopup, actions){
        this.openPopup = openPopup;
        this.actions = actions;
        this.actions.updateQueueInfo(this.queueInfo);
    }

    next = (data) => {
        this.queueInfo.size--;
        this.actions.updateQueueInfo(this.queueInfo);
        this.currentPopup = this.queue.shift(); 
        if(this.currentPopup){
            this.open();
        } else {
            ipcRenderer.send('sendToBack');
        }
    }

    cancelAll = () => {
        this.queue.forEach(popupReq => {
            if(popupReq){
                popupReq.cb(null);
            }
        });
        this.queue.splice(0,this.queue.length);
        this.queueInfo.size = 0;
        this.actions.updateQueueInfo(this.queueInfo);
    }


    async requestAccess(forPublicKey){
        console.log("REQUEST ACCESS");
        return new Promise((resolve, reject) => {
            // get wallet
            const wallets = this.actions.getWallets(forPublicKey);
            if(!wallets || !wallets.wallets || !wallets.wallets.length){
                const identity = this.actions.findIdentity(forPublicKey);
                if(!identity || !identity.privateKey){
                    return resolve(null);
                }
                return resolve(identity.privateKey);
            }
            
            const wallet = wallets.wallets.reduce((acc, w) => {
                acc = acc.account === wallets.currentAccount ? acc : w;
                return acc;
            }, {});

            const keyProvider = this.actions.getKeyProvider();
            if(!keyProvider || !keyProvider.hash || keyProvider.account !== wallet.account){
                this.popup({
                    type:Actions.UNLOCK_ACCESS, 
                    payload:{wallet}, 
                    transformResult:(popupResult)=>{
                        return new Promise((resolve, reject)=>{
                            if(popupResult.changeWallet){
                                this.actions.useWallet(wallet.account, wallet.chainId);
                            }
                            this.actions.unlockWallet({
                                useWallet: wallet,
                                password: popupResult.password,
                                changeWallet: popupResult.changeWallet
                            }).then((key)=>{
                                if(key){
                                    return resolve({wif:key});
                                }
                                reject(new Error("Invalid Password"))
                            });
                        });  
                    }
                }, 
                (result) => {
                    if(!result || !result.wif){
                        return resolve(null);
                    }
                    resolve(result.wif);
                });
            }else{
                const wif = APIUtils.decrypt(keyProvider.key, keyProvider.hash, 1);
                if (ecc.isValidPrivate(wif) === true) {
                    return resolve(wif);
                }
                resolve(null);
            }
        });
    }

    popup = (popupRequest, cb) => {
        if(typeof cb !== "function"){
            console.error("cb needs to be a function!");
            return null;
        }
    
        switch(popupRequest.type){
            case Actions.GET_OR_REQUEST_IDENTITY:{
                popupRequest.payload = popupRequest.payload || {};
                popupRequest.payload.accounts = this.actions.getAccounts().map(a=>{
                    return Object.assign({authorityName:(a.name+'@'+a.authority)}, a);
                });
                if(!popupRequest.transformResult)
                    popupRequest.transformResult = (popupResponse) => {
                        return Promise.resolve( this.actions.getPromptIdentity(popupResponse.account) );
                    }
            }break;

            // no transformation needed
            // case Actions.REPAIR:
            // case Actions.UNLOCK_ACCESS:
            // case Actions.REQUEST_SIGNATURE:
            default: break;
        }

        let popupData = {
            info: popupRequest,
            cb
        };

        this.queueInfo.size++;
        this.actions.updateQueueInfo(this.queueInfo);
        if(!this.currentPopup){
            this.currentPopup = popupData;
            this.open();
        }else{
            this.queue.push(popupData);
        }

        ipcRenderer.send('bringToFront');
    }

    open = () => {
        this.openPopup(this.currentPopup.info)
            .then(
                // return the data as it is or true if there's no data for cases with no processing involved
                (data) => { 
                    if(data && data.closeAll)
                        this.cancelAll();
                    this.currentPopup.cb(data || true) 
                },
                (data) => { 
                    if(data && data.closeAll)
                        this.cancelAll();
                    this.currentPopup.cb(null)
                }
            )
            .finally(this.next)
    }
}

export default new PopupService()