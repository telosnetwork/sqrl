// import { find, forEach, partition, pluck, uniq } from 'lodash';

import * as types from './types';
// import { decrypt, encrypt } from './wallet';

// const CryptoJS = require('crypto-js');

export function setStorage(data) {
    console.log("SET STORAGE ACTION");
    console.dir(data);
    console.log("********")
  return async (dispatch: () => void) => {
    // flush to disk
    if (window && window.persistor) {
      setTimeout(window.persistor.flush, 2000);
    }
    // update store
    return dispatch({
      type: types.WALLET_STORAGE_UPDATE,
      payload: data
    });
  };
}