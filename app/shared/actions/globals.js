import { isEmpty } from 'lodash';
import { Decimal } from 'decimal.js';

import * as types from './types';

import eos from './helpers/eos';



export function getGlobals() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GLOBALS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getTableRows(true, 'eosio', 'eosio', 'global').then((results) => dispatch({
      type: types.GET_GLOBALS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_GLOBALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getCurrencyStats(contractName = "eosio.token", symbolName) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection, settings } = getState();
    const account = contractName.toLowerCase();
    const symbol = symbolName ? symbolName.toUpperCase() : settings.blockchain.tokenSymbol;
    
    eos(connection).getCurrencyStats(account, symbol).then((results) => {
      if (isEmpty(results)) {
        return dispatch({
          type: types.GET_CURRENCYSTATS_FAILURE,
          payload: {
            account,
            symbol
          },
        });
      }

      const supply = results[symbol].supply && results[symbol].supply.split(' ')[0];
      const precision = supply && supply.split('.')[1] && supply.split('.')[1].length;
      if (!precision) precision = 4;
      
      return dispatch({
        type: types.GET_CURRENCYSTATS_SUCCESS,
        payload: {
          account,
          results,
          symbol,
          precision
        }
      });
    }).catch((err) => dispatch({
      type: types.GET_CURRENCYSTATS_FAILURE,
      payload: {
        account,
        err,
        symbol
      },
    }));
  };
}

export function getRamStats() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_RAMSTATS_REQUEST
    });
    const { connection } = getState();
    const query = {
      scope: 'eosio',
      code: 'eosio',
      table: 'rammarket',
      json: true
    };

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const baseBalance = rows[0].base.balance.split(' ')[0];
      const quoteBalance = rows[0].quote.balance.split(' ')[0];

      return dispatch({
        type: types.GET_RAMSTATS_SUCCESS,
        payload: {
          base_balance: baseBalance,
          quote_balance: quoteBalance
        }
      });
    }).catch((err) => dispatch({
      type: types.GET_RAMSTATS_FAILURE,
      payload: { err },
    }));
  };
}

export function getExchangeRates(currency = 'usd', amount) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_EXCHANGERATES_REQUEST
    });
    const { settings } = getState();
    return fetch(`${AXIOS_ROOT}/v1/rates?cryptocurrencyArray=${settings.blockchain.tokenSymbol.toLowerCase()}` + 
    `&fiatBaseCurrency=${currency}&fiatChargeAmount=${amount}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_EXCHANGERATES_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_EXCHANGERATES_FAILURE
    }));    
  };
}

export function getContactByPublicKey(publicKey) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CONTACTBYPUBKEY_REQUEST
    });
    const { globals } = getState();
    return fetch(`${AXIOS_ROOT}/v1/contacts/query?publicKey=${publicKey}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_CONTACTBYPUBKEY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CONTACTBYPUBKEY_FAILURE
    }));    
  };
}

export function createExchangeContact(publicKey, emailAddress) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CREATECONTACTBYPUBKEY_REQUEST
    });
    const { globals } = getState();
    let postBody;
    if (emailAddress)
      postBody = new URLSearchParams({
        emailAddress: emailAddress,
        publicKey: publicKey
      })
    else
      postBody = new URLSearchParams({
        publicKey: publicKey
      })
    return await fetch(`${AXIOS_ROOT}/v1/contacts/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_CREATECONTACTBYPUBKEY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CREATECONTACTBYPUBKEY_FAILURE
    }));    
  };
}

export function verifyExchangeContact(
  contactId, firstName, lastName, 
  dob, country, buildingNumber, 
  street, state, city, postalCode) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_VERIFYCONTACT_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId, 
      firstName:firstName, 
      lastName:lastName, 
      dob:dob, 
      country:country, 
      buildingNumber:buildingNumber, 
      street:street, 
      state:state, 
      city:city, 
      postalCode:postalCode
    })
    return await fetch(`${AXIOS_ROOT}/v1/contacts/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_VERIFYCONTACT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_VERIFYCONTACT_FAILURE
    }));    
  };
}

export function getExchangeAPI() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CONTACTJWT_REQUEST
    });
    return fetch(`${AXIOS_ROOT}/v1/users/returnJWT?apikey=${AXIOS_TOKEN}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_CONTACTJWT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CONTACTJWT_FAILURE
    }));    
  };
}

export function getPriceFeed(baseToken, quoteToken) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_PRICEFEED_REQUEST
    });
    return fetch(`https://carbon-market-maker.herokuapp.com/api/quotes?base=${baseToken}&quote=${quoteToken}`, 
    {
      method: 'GET',
      headers: {
          'api_secret': PRICE_API_SECRET
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_PRICEFEED_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_PRICEFEED_FAILURE
    }));    
  };
}

export function getPriceFeedGecko(baseToken, quoteToken) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_PRICEFEED_REQUEST
    });
    return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${baseToken}&vs_currencies=${quoteToken}`, 
    {
      method: 'GET',
    }).then(response => response.json()).then((response) => {
      const eosPrice = response[baseToken.toLowerCase()].eos;
      const usdPrice = response[baseToken.toLowerCase()].usd;
      const isUSDQuote = (quoteToken == "USD");

      const data = {
        price: isUSDQuote ? usdPrice : eosPrice,
        quote: isUSDQuote ? "CUSD" : quoteToken,
        base: baseToken.toUpperCase()
      };
      return dispatch({
        payload: data,
        type: types.GET_PRICEFEED_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_PRICEFEED_FAILURE
    }));    
  };
}

export function uploadExchangeKYCDoc(file, contactId, fileType) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CONTACTKYCUPLOAD_REQUEST
    });
    const { globals } = getState();

    const mime = require('mime');
    const FormData = require('form-data');
    let url = `${AXIOS_ROOT}/v1/contacts/upload`;
    let formData = new FormData();

    formData.append("file", file, {
      filename: file.name,
      contentType: mime.getType(file.name),
    } );

    formData.append("fileType", fileType); 
    formData.append("contactId",contactId); 

    //let formDataToBufferObject = formDataToBuffer(formData);
    //contentType = formData.getHeaders()['content-type'];

    let headers = {
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      }
    };

    let fileBuffer;
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      fileBuffer = await Buffer.from(reader.result);
    };

    return axios.post(url, fileBuffer, headers)
    .then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_CONTACTKYCUPLOAD_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CONTACTKYCUPLOAD_FAILURE
    }));    
  };
}

function formDataToBuffer( formData ) {
  let dataBuffer = new Buffer( 0 );
  let boundary   = formData.getBoundary();
  for( let i = 0, len = formData._streams.length; i < len; i++ ) {
      if( typeof formData._streams[i] !== 'function' ) {
          dataBuffer = bufferWrite( dataBuffer, formData._streams[i] );
          if( typeof formData._streams[i] !== 'string' || formData._streams[i].substring( 2, boundary.length + 2 ) !== boundary ) {
              dataBuffer = bufferWrite( dataBuffer, "\r\n" );
          }
      }
  }
  dataBuffer = bufferWrite( dataBuffer, '--' + boundary + '--' );
  return dataBuffer;
}

function bufferWrite( buffer, data ) {
  let addBuffer;
  if( typeof data === 'string' ) {
      addBuffer = Buffer.from( data );
  }
  else if( typeof data === 'object' && Buffer.isBuffer( data ) ) {
      addBuffer = data;
  }
  return Buffer.concat( [buffer, addBuffer] );
}

export default {
  createExchangeContact,
  getContactByPublicKey,
  getCurrencyStats,
  getExchangeAPI,
  getExchangeRates,
  getGlobals,
  getPriceFeed,
  getPriceFeedGecko,
  getRamStats,
  uploadExchangeKYCDoc,
  verifyExchangeContact
};
