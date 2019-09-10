import { isEmpty } from 'lodash';

import * as types from './types';

import eos from './helpers/eos';

const CARBON_ROOT = process.env.NODE_ENV === "production" ? "https://api.carbon.money" : "https://sandbox.carbon.money";
const CARBON_TOKEN = process.env.NODE_ENV === "production" ? '5tu8orjwlkfwr0j4i4nr308' : 'fjioj23rfji230js';
const PRICE_API_SECRET = 'fasdf134t3nh5$';

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
    return fetch(`${CARBON_ROOT}/v1/rates?cryptocurrencyArray=${settings.blockchain.tokenSymbol.toLowerCase()}` + 
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
    return fetch(`${CARBON_ROOT}/v1/contacts/query?publicKey=${publicKey}`, {
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
    return await fetch(`${CARBON_ROOT}/v1/contacts/create`, {
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

export function chargeCard(
  cardNumber, 
  expiry, 
  cvc, 
  billingStreet, 
  billingPostal, 
  contactId, 
  fiatBaseCurrency,
  fiatChargeAmount,
  cryptocurrencySymbol,
  receiveAddress,
  memo) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CHARGECONTACT_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      cardNumber: cardNumber,
      expiry: expiry,
      cvc: cvc,
      billingPremise: billingStreet,
      billingStreet: billingStreet,
      billingPostal: billingPostal,
      contactId: contactId,
      fiatBaseCurrency: fiatBaseCurrency,
      rememberMe: false
    });

    return await fetch(`${CARBON_ROOT}/v1/card/addNew`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      if (response.details && response.details.creditDebitId){
        const creditDebitId = response.details.creditDebitId;

        let postBody = new URLSearchParams({
          creditDebitId: creditDebitId,
          fiatChargeAmount: fiatChargeAmount,
          cryptocurrencySymbol: cryptocurrencySymbol,
          receiveAddress: receiveAddress,
          memo: memo || '',
          contactId: contactId,
          confirmationUrl:`https://sqrlwallet.io/carbon?action=confirm&contactid=${contactId}`,
          successRedirectUrl:`https://sqrlwallet.io/carbon?action=success&contactid=${contactId}`,
          errorRedirectUrl:`https://sqrlwallet.io/carbon?action=fail&contactid=${contactId}`
        });
        
        return fetch(`${CARBON_ROOT}/v1/card/charge3d`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${globals.exchangeapi}`
          },
          body: postBody
        }).then(response => response.json()).then((response) => {
          if (response.charge3denrolled !== 'Y') {
            return dispatch({
              payload: response,
              type: types.GET_CHARGECONTACT_NOTENROLLED
            });
          } else {
            const url = getGeneratedPageURL({
              html: `
                <div>
                  <h3 style="text-align:center;font-family:Tahoma">Connecting to your card provider. Please wait...</h3>
                  <form style="visibility:hidden;" name="form" id="form" action=${response.acsurl} method="POST">
                    <input type="hidden" name="PaReq" value=${response.pareq} />
                    <input type="hidden" name="TermUrl" value=${response.termurl} />
                    <input type="hidden" name="MD" value=${response.md} /> 
                  </form>
                </div>
              `,
            });
            // submit URL
            return dispatch({
              payload: url,
              type: types.GET_CHARGECONTACT_ENROLLED
            });
          }
        });
      } else {
        return dispatch({
          payload: response,
          type: types.GET_CHARGECONTACT_FAILURE
        });
      }
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CHARGECONTACT_FAILURE
    }));    
  };
}

function getGeneratedPageURL({ html, css, js }) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const cssURL = getBlobURL(css, 'text/css');
  const jsURL = getBlobURL(js, 'text/javascript');

  const source = `
    <html>
      <head>
        ${css ? `<link rel="stylesheet" type="text/css" href="${cssURL}" />` : ''}
        ${js ? `<script src="${jsURL}"></script>` : ''}
      </head>
      <body onLoad="document.form.submit();">
        ${html || ''}
      </body>
    </html>
  `;

  return getBlobURL(source, 'text/html');
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
    return await fetch(`${CARBON_ROOT}/v1/contacts/verify`, {
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

export function submitExchangeKYC(contactId) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_SUBMITCONTACTKYC_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId
    });
    return await fetch(`${CARBON_ROOT}/v1/contacts/submitCheck`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_SUBMITCONTACTKYC_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_SUBMITCONTACTKYC_FAILURE
    }));    
  };
}

export function create2FA(contactId, issuer='SqrlWallet') {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CREATE2FA_REQUEST
    });
    const { globals } = getState();
    return await fetch(`${CARBON_ROOT}/v1/auth/create2fa?contactId=${contactId}&twoFactorIssuer=${issuer}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_CREATE2FA_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CREATE2FA_FAILURE
    }));    
  };
}

export function enable2FA(contactId, token) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ENABLE2FA_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId, 
      token:token
    })
    return await fetch(`${CARBON_ROOT}/v1/auth/enable2fa`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ENABLE2FA_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ENABLE2FA_FAILURE
    }));    
  };
}

export function disable2FA(contactId) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_DISABLE2FA_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId
    })
    return await fetch(`${CARBON_ROOT}/v1/auth/disable2fa`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_DISABLE2FA_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_DISABLE2FA_FAILURE
    }));    
  };
}

export function getExchangeAPI() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CONTACTJWT_REQUEST
    });
    return fetch(`${CARBON_ROOT}/v1/users/returnJWT?apikey=${CARBON_TOKEN}`, {
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
      type: types.GET_CONTACTKYCUPLOAD_PENDING
    });
    const { globals } = getState();

    const mime = require('mime-types');
    let url = `${CARBON_ROOT}/v1/contacts/upload`;
    let formData = new FormData();

    formData.append("file", file, {
      filename: file.name,
      contentType: mime.contentType(file.name),
    });
    formData.append("fileType", fileType); 
    formData.append("contactId",contactId); 

    return fetch(url, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${globals.exchangeapi}`,
      }),
      body: formData
    })
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

export default {
  create2FA,
  enable2FA,
  disable2FA,
  chargeCard,
  createExchangeContact,
  getContactByPublicKey,
  getCurrencyStats,
  getExchangeAPI,
  getExchangeRates,
  getGlobals,
  getPriceFeed,
  getPriceFeedGecko,
  getRamStats,
  submitExchangeKYC,
  uploadExchangeKYCDoc,
  verifyExchangeContact
};
