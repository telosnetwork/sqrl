const ecc = require('eosjs-ecc');
const scrypt = require('scrypt-async');
// import StorageService from '../services/StorageService'
import IdGenerator from './IdGenerator'

export default class Hasher {

    /***
     * Hashes a cleartext using the SHA-256 algorithm.
     * This is INSECURE and should only be used for fingerprinting.
     * @param cleartext
     */
    static unsaltedQuickHash(cleartext) {
        return ecc.sha256(cleartext);
    }

    static salt = null;
    /***
     * Hashes a cleartext using scrypt.
     * @param cleartext
     * @param salt
     */
    static async secureHash(cleartext, salt = null) {
        return new Promise(async resolve => {
            if(!this.salt) this.salt = this.unsaltedQuickHash(IdGenerator.text(32));
            if(!salt) salt = this.salt;
            scrypt(cleartext, salt, {
                N: 16384,
                r: 8,
                p: 1,
                dkLen: 16,
                encoding: 'hex'
            }, (derivedKey) => {
                resolve(derivedKey);
            })
        });
    }
}