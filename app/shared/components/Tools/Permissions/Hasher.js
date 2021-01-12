const ecc = require('eosjs-ecc');
const scrypt = require('scrypt-async');

export default class PermissionsHasher {

    /***
     * Hashes a cleartext using the SHA-256 algorithm.
     * This is INSECURE and should only be used for fingerprinting.
     * @param cleartext
     */
    static insecureHash(cleartext) {
        return ecc.sha256(cleartext);
    }

    /***
     * Hashes a cleartext using scrypt.
     * @param cleartext
     * @param salt
     */
    static async secureHash(cleartext, salt = null) {
        return new Promise(async resolve => {
            if(!salt) salt = 'SALT_ME';
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