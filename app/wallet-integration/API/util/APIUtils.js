import EosPlugin from '../plugins/default/eos';
import Permission from '../models/Permission';
import AuthorizedApp from '../models/AuthorizedApp';
import Identity from '../models/Identity';
import PopupService from '../services/PopupService';

const CryptoJS = require('crypto-js');

export default class APIUtils{
    static plugin = new EosPlugin();

    static findApp(authorizedApps, origin){
        return authorizedApps.find(x => x.origin === origin);
    }
    static findIdentity(identities, publicKey){
        return identities.find(x => x.publicKey === publicKey);
    }
    
    static getIdentity(identities, publicKey){
        return identities.find(id => id.publicKey === publicKey);
    }

    static getAccounts(allAccounts, toGet){
        const result = [];
        toGet.forEach(unique => {
            const acc = allAccounts.find(x => this.uniqueAccount(x) === unique);
            if(acc) result.push(acc);
        });
        return result;
    }

    static uniqueAccount(acc){
        return acc.name + acc.authority + acc.publicKey;
    }
    
    static mapPermissions(permissions){
        let _permissions = (permissions || []).slice(0);
        return _permissions.map(p => Permission.fromJson(p));
    }
    static mapAuthorizedApps(apps){
        let _apps = (apps || []).slice(0);
        return _apps.map(a => AuthorizedApp.fromJson(a));
    }
    static mapIdentity(identity){
        if(identity){
            return Identity.fromJson(identity);
        }
        return null;
    }

    static decrypt(data, pass, iterations = 4500) {
        const keySize = 256;
        const salt = CryptoJS.enc.Hex.parse(data.substr(0, 32));
        const iv = CryptoJS.enc.Hex.parse(data.substr(32, 32));
        const encrypted = data.substring(64);
        const key = CryptoJS.PBKDF2(pass, salt, {
            iterations,
            keySize: keySize / 4
        });
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        try{
            return decrypted.toString(CryptoJS.enc.Utf8);
        }catch(err){
            console.error(err);
            return '';
        }
    }
    
    static encrypt(data, pass, iterations = 4500) {
        const keySize = 256;
        const salt = CryptoJS.lib.WordArray.random(128 / 8);
        const key = CryptoJS.PBKDF2(pass, salt, {
            iterations,
            keySize: keySize / 4
        });
        const iv = CryptoJS.lib.WordArray.random(128 / 8);
        const encrypted = CryptoJS.AES.encrypt(data, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return (salt.toString() + iv.toString() + encrypted.toString()).toString(CryptoJS.enc.Utf8);
    }
}