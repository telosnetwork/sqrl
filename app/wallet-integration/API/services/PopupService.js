import * as Actions from '../models/api/ApiActions';
import APIUtils from '../util/APIUtils';
import { pctEncChar } from 'uri-js';

const ecc = require('eosjs-ecc');
export class PopupService {
    openPopup = null;
    queue = [];
    currentPopup = null;
    
    connect(openPopup, actions){
        this.openPopup = openPopup;
        this.actions = actions;
    }

    next = (data) => {
        this.currentPopup = this.queue.shift(); 
        if(this.currentPopup){
            this.open();
        }
    }


    async requestAccess(forPublicKey){
        console.log("REQUEST ACCESS");
        return new Promise((resolve, reject) => {
            // get wallet
            const wallets = this.actions.getWallets(forPublicKey);
            if(!wallets || !wallets.wallets || !wallets.wallets.length){
                return resolve(null);
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
                                this.actions.useWallet(wallet.account);
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

        if(!this.currentPopup){
            this.currentPopup = popupData;
            this.open();
        }else{
            this.queue.push(popupData);
        }
    }

    open = () => {
        this.openPopup(this.currentPopup.info)
            .then(
                // return the data as it is or true if there's no data for cases with no processing involved
                (data) => this.currentPopup.cb(data || true),
                (data) => this.currentPopup.cb(null)
            )
            .finally(this.next)
    }
}

export default new PopupService()