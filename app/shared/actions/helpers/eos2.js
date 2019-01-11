import { decrypt } from '../wallet';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');
import { Api, Rpc } from 'eosjs2';
import JsSignatureProvider from 'eosjs2/dist/eosjs2-jssig';

export default function eos2(connection, signing = true) {
  const decrypted = Object.assign({}, connection);
  const rpc = new Rpc.JsonRpc(connection.httpEndpoint);
  if (signing && decrypted.keyProviderObfuscated) {
    const {
      hash,
      key
    } = decrypted.keyProviderObfuscated;
    if (hash && key) {
      const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
      if (ecc.isValidPrivate(wif) === true) {
        decrypted.keyProvider = [wif];
      }
    }

    const signatureProvider = new JsSignatureProvider(decrypted.keyProvider);
    return new Api({ rpc, signatureProvider });
  } else {
    const signatureProvider = {
      getAvailableKeys (){ return [];}
    }
    return new Api({ rpc, signatureProvider });
  }
}
