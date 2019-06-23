import * as types from '../wapii.types';
import * as SqrlTypes from '../../shared/actions/types';
import eos from '../../shared/actions/helpers/eos';
import APIUtils from '../API/util/APIUtils';
import Network from '../API/models/Network';
const ecc = require('eosjs-ecc');
var urlParser = document.createElement('a');

export function updateAccounts(accounts) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.WAPII_SAVE_ACCOUNTS,
            payload: accounts
        });
    };
}

export function updateQueueInfo(queueInfo) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.WAPII_SAVE_QUEUE_INFO,
            payload: queueInfo
        });
    };
}

export function getAccounts(){
    return (dispatch: () => void, getState) => {
        const currentWallet = getState().settings.account;
        return getState().wapii.accounts.filter(x => x.name === currentWallet);
    }
}

export function getNetworks(){
    return (dispatch: () => void, getState) => {
        const blockchains = getState().settings.blockchains;
        const bchMap = blockchains.map(b=>{
            urlParser.href = b.node;
            let protocol = urlParser.protocol; protocol = protocol.substring(0, protocol.length - 1);
            const host = urlParser.hostname;
            const port = urlParser.port || 80;
            return Network.fromJson({
                name:b.blockchain,
                chainId:b.chainId,
                blockchain:b.tokenSymbol.toLowerCase(),
                protocol,
                host,
                port
            })
        });
        return bchMap;
    }
}

export function getWallets(forPublicKey = null){
    return (dispatch: () => void, getState) => {
        let wallets = getState().wallets;
        const currentAccount = getState().settings.account;
        if(forPublicKey){
            wallets = wallets.reduce((acc, w) => {
                if(forPublicKey === w.pubkey){
                    acc.push(w);
                }
                return acc;
            }, []);
        }
        return {wallets, currentAccount};
    }
}

export function unlockWallet(data) {
    return async (dispatch: () => void, getState) => {
        const{
            password,
            useWallet,
            changeWallet
        } = data;

        const state = getState();
        const {
            accounts,
            connection,
            settings
        } = state;
        let { wallet } = state;
        
        // If a wallet was passed to be used, use that instead of state.
        if (useWallet && useWallet.data) {
            wallet = useWallet;
        }
        
        dispatch({
            type: SqrlTypes.VALIDATE_WALLET_PASSWORD_PENDING
        });

        let account = accounts[wallet.account];
        if (settings.walletMode === 'hot' && !account) {
            account = await eos(connection).getAccount(wallet.account);
        }
      
        return new Promise((resolve)=>{
            setTimeout(()=>{
                let key = APIUtils.decrypt(wallet.data, password);
                if (ecc.isValidPrivate(key) === true) {
                    if(!changeWallet){
                        dispatch({
                          type: SqrlTypes.VALIDATE_WALLET_PASSWORD_SUCCESS
                        });
                        return resolve(key);
                    }
        
                    const pubkey = ecc.privateToPublic(key,connection.keyPrefix);
                    
                    // Set the active wallet
                    dispatch({
                      payload: {
                        ...wallet,
                        accountData: account,
                        pubkey
                      },
                      type: SqrlTypes.SET_WALLET_ACTIVE
                    });
                    
                    // Obfuscate key for in-memory storage
                    const hash = APIUtils.encrypt(password, password, 1);
                    const obfuscatedKey = APIUtils.encrypt(key, hash, 1);
                    
                    // Set the keys for use
                    dispatch({
                      payload: {
                        account: wallet.account,
                        accountData: account,
                        hash,
                        key: obfuscatedKey,
                        pubkey
                      },
                      type: SqrlTypes.SET_WALLET_KEYS_ACTIVE
                    });
                }else{
                    key = '';
                }

                if(!key){
                    dispatch({
                        type: SqrlTypes.VALIDATE_WALLET_PASSWORD_FAILURE
                    });
                }else{
                    dispatch({
                        type: SqrlTypes.VALIDATE_WALLET_PASSWORD_SUCCESS
                    });
                }
                resolve(key);
            }, 10);
        });
    };
}