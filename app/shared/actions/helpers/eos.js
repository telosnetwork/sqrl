import { decrypt } from '../wallet';
import * as config from '../config';
const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');
const Eos = require('eosjs');

export default function eos(connection, signing = false, payforsig = false) {
  const decrypted = Object.assign({}, connection);
  if (signing && decrypted.keyProviderObfuscated) {
    const {
      hash,
      key
    } = decrypted.keyProviderObfuscated;
    if (hash && key) {
      const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
      if (ecc.isValidPrivate(wif) === true) {
        decrypted.keyProvider = (payforsig === true)
          ? [config.PAY_FOR_CPU_KEY, wif]: [wif];
      }
    }
  }
  // Remove edgecase where authorization is improperly set
  // TODO: Resolve why they are getting unset in certain edge cases
  if (
    decrypted.authorization
    && (
      decrypted.authorization === []
      || decrypted.authorization === [null]
      || decrypted.authorization === [undefined]
    )
  ) {
    delete decrypted.authorization;
  }
  return Eos(decrypted);
}

export function payforcpunet(account, state) {
  if ( !(state.settings.useSQRLtoken == null || state.settings.useSQRLtoken === true)) return null;
  
  // get current balance of SQRL tokens
  // if none, return NULL to not pay for tx
  // if 1, deduct from account and proceed
  const balance = state.balances[account]['SQRL'];
  if (!balance || balance < 1) return null;

  // make sure user has profile account to
  // allow paying for cpu/net resources
  let profile;
  const profiles = state.globals.profiles;
  if (profiles && profiles.length > 0)
    profile = profiles.filter((p)=>p.account==account)[0];

  const actions = [{ // our action as first auth so we foot the bill
    account: config.SQRL_CONTRACT,
    name: 'payforcpunet',
    authorization: [{
        actor: config.SQRL_CONTRACT,
        permission: 'payforcpunet'
      }],
    data: {
      account: account
    }
  }];
  
  if (!profile) { // new user, do not charge 1 SQRL
    actions.push({
      account: config.SQRL_CONTRACT,
      name: 'openprofile',
      authorization: [{
          actor: account,
          permission: state.settings.authorization || 'active'
        }],
      data: {
        account: account
      }
    });
  } else { // existing user, xfer 1 SQRL as payment for tx
    actions.push({
      account: config.SQRL_CONTRACT,
      name: 'transfer',
      authorization: [{
        actor: account,
        permission: 'active',
      }],
      data: {
        from:account,
        to:config.SQRL_CONTRACT,
        quantity:'1.0000 SQRL',
        memo:'Here\'s a SQRL for covering my CPU and NET for this transaction ;-) Thank you! ',
      },
    });
  }
  
  return actions;
}
