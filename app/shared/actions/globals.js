import { isEmpty } from 'lodash';
import sortBy from 'lodash/sortBy';
import concat from 'lodash/concat';
import pTokens from 'ptokens';
import * as types from './types';
import * as config from './config';

import eos from './helpers/eos';
import { payforcpunet, convertNameToInt } from './helpers/eos';

let tokenContract = "btc.ptokens";
let tbondContract = "marblefinall";
let marketContract = "marblemarkt1";

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
      let precision = supply.indexOf('.') == -1 ? 0 :
        supply && supply.split('.')[1] && supply.split('.')[1].length;
      if (precision==null) precision = 4;
      
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

export function getExchangeRates(token, currency = 'usd', amount) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_EXCHANGERATES_REQUEST
    });
    const { settings } = getState();
    return fetch(`${config.CARBON_ROOT}/v1/rates?cryptocurrencyArray=${token.toLowerCase()}` + 
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
    return fetch(`${config.CARBON_ROOT}/v1/contacts/query?publicKey=${publicKey}`, {
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
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/create`, {
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

    return await fetch(`${config.CARBON_ROOT}/v1/card/addNew`, {
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
        
        return fetch(`${config.CARBON_ROOT}/v1/card/charge3d`, {
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
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/verify`, {
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
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/submitCheck`, {
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

export function submitOfframpKYC(
  contactId, firstName, lastName, 
  dob, country, street, state, city, postalCode, 
  phoneNumber, taxCountry, taxId, sex) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_SUBMITOFFRAMPKYC_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId, 
      firstName:firstName, 
      lastName:lastName, 
      dob:dob, 
      phoneNumber: phoneNumber,
      street:street, 
      city:city, 
      region:state, 
      postalCode:postalCode,
      country:country,
      taxCountry: taxCountry,
      taxId: taxId,
      sex: sex
    })
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/submitKYC`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_SUBMITOFFRAMPKYC_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_SUBMITOFFRAMPKYC_FAILURE
    }));    
  };
}

export function approveOfframpKYC(contactId) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_APPROVEOFFRAMPKYC_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/approveKYC`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_APPROVEOFFRAMPKYC_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_APPROVEOFFRAMPKYC_FAILURE
    }));    
  };
}

export function addACHAccount(contactId, bankAccountNumber, 
  routingNumber, bankName, bankAccountType) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ADDACHACCOUNT_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId,
      bankAccountNumber: bankAccountNumber,
      routingNumber: routingNumber,
      bankName: bankName,
      bankAccountType: bankAccountType
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/paymentMethods/ach`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ADDACHACCOUNT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ADDACHACCOUNT_FAILURE
    }));    
  };
}

export function addACHDeposit(contactId, bankAccountNumber, 
  routingNumber, bankName, bankAccountType, chain, address, amount) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ADDACHDEPOSIT_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId,
      bankAccountNumber: bankAccountNumber,
      routingNumber: routingNumber,
      bankName: bankName,
      bankAccountType: bankAccountType,
      chain: chain,
      address: address,
      amount: amount
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/deposits/ach`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ADDACHDEPOSIT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ADDACHDEPOSIT_FAILURE
    }));    
  };
}

export function addACHWithdrawal(contactId, chain, address, amount, paymentMethodId,txtHash) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ADDACHWITHDRAWAL_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId,
      chain: chain,
      address: address,
      amount: amount,
      paymentMethodId: paymentMethodId,
      txtHash: txtHash
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/withdrawals/ach`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ADDACHWITHDRAWAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ADDACHWITHDRAWAL_FAILURE
    }));    
  };
}

export function addWireAccount(contactId, isBankInternational, 
  bankAccountNumber, routingNumber, bankName, beneficiaryAddress1, 
  beneficiaryAddressCity, beneficiaryAddressCountry, 
  beneficiaryAddressRegion, beneficiaryAddressZip
  ) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ADDWIREACCOUNT_REQUEST
    });
    const { globals } = getState();
    let postBody = {
      contactId:contactId,
      isBankInternational: (isBankInternational === true),
      bankAccountNumber: bankAccountNumber,
      routingNumber: routingNumber,
      bankName: bankName,
      beneficiaryAddress: {
        'street-1': beneficiaryAddress1,
        city: beneficiaryAddressCity,
        country: beneficiaryAddressCountry,
        region: beneficiaryAddressRegion,
        'postal-code': beneficiaryAddressZip
      }
    };
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/paymentMethods/wire`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: JSON.stringify(postBody)
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ADDWIREACCOUNT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ADDWIREACCOUNT_FAILURE
    }));    
  };
}

export function addWireDeposit(contactId, chain, address, amount) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ADDWIREDEPOSIT_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId,
      chain: chain,
      address: address,
      amount: amount
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/deposits/wire`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ADDWIREDEPOSIT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ADDWIREDEPOSIT_FAILURE
    }));    
  };
}

export function addWireWithdrawal(contactId, chain, address, amount, paymentMethodId,txtHash) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ADDWIREWITHDRAWAL_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId,
      chain: chain,
      address: address,
      amount: amount,
      paymentMethodId: paymentMethodId,
      txtHash: txtHash
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/withdrawals/wire`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_ADDWIREWITHDRAWAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_ADDWIREWITHDRAWAL_FAILURE
    }));    
  };
}

export function getPaymentMethods(contactId) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GETPAYMENTMETHODS_REQUEST
    });
    const { globals } = getState();
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/stablecoinPaymentMethods/all?contactId=${contactId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_GETPAYMENTMETHODS_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_GETPAYMENTMETHODS_FAILURE
    }));    
  };
}

export function getDeposits(contactId) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GETDEPOSITS_REQUEST
    });
    const { globals } = getState();
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/deposits/all?contactId=${contactId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      }
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_GETDEPOSITS_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_GETDEPOSITS_FAILURE
    }));    
  };
}

export function settleDeposit(contactId, depositId) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_SETTLEDEPOSIT_REQUEST
    });
    const { globals } = getState();
    let postBody = new URLSearchParams({
      contactId:contactId,
      depositId: depositId
    });
    return await fetch(`${config.CARBON_ROOT}/v1/contacts/settleDeposit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globals.exchangeapi}`
      },
      body: postBody
    }).then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_SETTLEDEPOSIT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_SETTLEDEPOSIT_FAILURE
    }));    
  };
}

export function create2FA(contactId, issuer='SqrlWallet') {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CREATE2FA_REQUEST
    });
    const { globals } = getState();
    return await fetch(`${config.CARBON_ROOT}/v1/auth/create2fa?contactId=${contactId}&twoFactorIssuer=${issuer}`, {
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
    return await fetch(`${config.CARBON_ROOT}/v1/auth/enable2fa`, {
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
    return await fetch(`${config.CARBON_ROOT}/v1/auth/disable2fa`, {
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
    return fetch(`${config.CARBON_ROOT}/v1/users/returnJWT?apikey=${config.CARBON_TOKEN}`, {
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
          'api_secret': config.PRICE_API_SECRET
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

export function getPriceFeedGecko(baseToken, quoteToken, actualToken) {
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
        base: actualToken? actualToken.toUpperCase() : baseToken.toUpperCase()
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
    let url = `${config.CARBON_ROOT}/v1/contacts/upload`;
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

export function uploadOfframpKYCDoc(file, contactId) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_OFFRAMPKYCUPLOAD_PENDING
    });
    const { globals } = getState();

    const mime = require('mime-types');
    let url = `${config.CARBON_ROOT}/v1/contacts/uploadDocument`;
    let formData = new FormData();

    formData.append("file", file, {
      filename: file.name,
      contentType: mime.contentType(file.name),
    });
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
        type: types.GET_OFFRAMPKYCUPLOAD_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_OFFRAMPKYCUPLOAD_FAILURE
    }));    
  };
}

export function getProfiles(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GET_PROFILE_PENDING
    });
    const { connection } = getState();
    const query = {
      scope: config.SQRL_CONTRACT,
      code: config.SQRL_CONTRACT,
      table: 'profiles',
      json: true,
      limit:1000000
    };

    //lower_bound: settings.account,

    if (account) {
      query.lower_bound = account;
    }

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;

      return dispatch({
        type: types.SYSTEM_GET_PROFILE_SUCCESS,
        payload: {
          profiles: rows
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GET_PROFILE_FAILURE,
      payload: { err },
    }));
  };
}

export function setProfileAvatar(avatar, bio) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_SET_PROFILEAVATAR_PENDING
    });

    const { account } = settings;

    let actions = [
      {
        account: config.SQRL_CONTRACT,
        name: 'setavatar',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          account: account,
          avatar: avatar,
          bio: bio
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({actions: actions})
    .then((tx) => {
      setTimeout(() => {
        dispatch(getProfiles());
      }, 1000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_SET_PROFILEAVATAR_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SET_PROFILEAVATAR_FAILURE
    }));
  };
}

export function openProfile() {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_OPENPROFILE_PENDING
    });

    const { account } = settings;

    let actions = [{
      account: config.SQRL_CONTRACT,
      name: 'payforcpunet',
      authorization: [{
          actor: config.SQRL_CONTRACT,
          permission: 'payforcpunet'
        }],
      data: {
        account: account
      }
    },{
      account: config.SQRL_CONTRACT,
      name: 'openprofile',
      authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
      data: {
        account: account
      }
    }];

    return eos(connection, true, true).transaction({actions: actions})
    .then((tx) => {
      setTimeout(() => {
        dispatch(getProfiles());
      }, 1000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_OPENPROFILE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_OPENPROFILE_FAILURE
    }));
  };
}

export function getCustomTokensRemote() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CUSTOMTOKENSREMOTE_REQUEST
    });
    return fetch('https://raw.githubusercontent.com/telosnetwork/sqrl/master/resources/tokens.json')
    .then(response => response.json()).then((response) => {
      return dispatch({
        payload: response,
        type: types.GET_CUSTOMTOKENSREMOTE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.GET_CUSTOMTOKENSREMOTE_FAILURE
    }));    
  };
}

export const getPBTCAddress = (account) => {
  return async (dispatch: () => void, getState) => {
    const {
        settings
    } = getState();
    dispatch({
        type: types.SYSTEM_GETPBTC_PENDING,
    });

    let pBtcToken = new pTokens({
      pbtc: {
        blockchain: "Telos",
        network: "mainnet",
      },
    });
    const pbtcAddress = await pBtcToken.pbtc.getDepositAddress(account);
    dispatch({
      type: types.SYSTEM_GETPBTC_SUCCESS,
    });
    return pbtcAddress.toString();
  };
}

function checkForTelosMainet(settings) {
  if (settings.blockchain.chainId == "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11") {
    marketContract = "tbond.code";
    tbondContract = "tlos.tbond";
  }
}
export function buyTBond(serial, price, referral) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_BUYBONDS_PENDING
    });

    const { account } = settings;
    checkForTelosMainet(settings);

    let actions = [
      {
        account: tokenContract,
        name: 'transfer',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          from: account,
          to: marketContract,
          quantity: price,
          memo:"[deposit]"
        }
      },{
        account: marketContract,
        name: "buymrbitm",
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          account: account,
          marble_contract: tbondContract,
          serial: serial,
          price: price,
          referral: referral || "telosmiamibp"
        }
      },{
        account: marketContract,
        name: "withdrawmitm",
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          owner: account,
          marble_contract: tbondContract,
          serial: serial
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({actions: actions})
    .then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_BUYBONDS_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_BUYBONDS_FAILURE
    }));
  };
}

export function sellTBond(serial, price) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_SELLBONDS_PENDING
    });

    const { account } = settings;
    checkForTelosMainet(settings);

    let actions = [
      {
        account: tbondContract,
        name: 'transferitem',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          from: account,
          to: marketContract,
          serials: [serial],
          memo: 'Posting T-Bond for Sale',
        }
      },{
        account: marketContract,
        name: 'sellmrbitm',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          owner: account,
          price : price,
          serial: serial
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({actions: actions})
    .then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_SELLBONDS_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SELLBONDS_FAILURE
    }));
  };
}

export function withdrawPBTC(amount, destinationAddr) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_WITHDRAWPBTC_PENDING
    });

    const { account } = settings;
    checkForTelosMainet(settings);

    let actions = [
      {
        account: "btc.ptokens",
        name: 'redeem',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          sender: account,
          quantity: amount,
          memo: destinationAddr
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({actions: actions})
    .then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_WITHDRAWPBTC_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_WITHDRAWPBTC_FAILURE
    }));
  };
}

export function releaseTBond(serial, amount) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_RELEASETBOND_PENDING
    });

    const { account } = settings;
    checkForTelosMainet(settings);

    let actions = [
      {
        account: tbondContract,
        name: 'release',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          serial: serial
        }
      },{
        account: tbondContract,
        name: 'withdraw',
        authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
        data: {
          wallet_owner: account,
          amount: amount
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({actions: actions})
    .then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_RELEASETBOND_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_RELEASETBOND_FAILURE
    }));
  };
}

function getTBondIndex(upper, lower) {
  const u = convertNameToInt(upper);
  const l = lower.toString().padStart(16,"0");
  return u+l;
}
export function getTBondsByOwner(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETBONDS_PENDING
    });
    const { connection, settings } = getState();
    checkForTelosMainet(settings);

    const upper = getTBondIndex(settings.account, "9000000000000000");
    const lower = getTBondIndex(settings.account, "0");
    
    const query = {
      json: true,
      code: tbondContract,
      scope: tbondContract,
      table: 'items',
      upper_bound: upper,
      lower_bound: lower,
      index_position: 3,
      key_type: "i128",
      limit: 500
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      // if there are missing results
      if (results.more) {
        return dispatch(getTBondsByOwner(rows));
      }
      const data = rows
        .map((item) => {
          const {
            serial,
            group,
            owner
          } = item;
          dispatch(getTBondsTagInfo(serial));
          dispatch(getTBondsEventInfo(serial));
          dispatch(getTBondsBondInfo(serial));
          return {
            serial,
            group,
            owner
          };
        });
      const allbonds = sortBy(data, 'serial').reverse();
      return dispatch({
        type: types.SYSTEM_GETBONDS_SUCCESS,
        payload: allbonds
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETBONDS_FAILURE,
      payload: { err },
    }));
  };
}

export function getTBondsForSale(limit) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETBONDSFORSALE_PENDING
    });
    const { connection, settings } = getState();
    checkForTelosMainet(settings);

    const query = {
      json: true,
      code: marketContract,
      scope: marketContract,
      table: 'listeditems',
      limit: limit
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const data = rows
        .map((item) => {
          const {
            id,
            serial,
            owner,
            price
          } = item;
          dispatch(getTBondsTagInfo(serial));
          dispatch(getTBondsEventInfo(serial));
          dispatch(getTBondsBondInfo(serial));
          return {
            id,
            serial,
            owner,
            price,
            priceFloat: parseFloat(price.split(' ')[0])
          };
        });
      const listeditems = sortBy(data, 'priceFloat').reverse();
      return dispatch({
        type: types.SYSTEM_GETBONDSFORSALE_SUCCESS,
        payload: listeditems
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETBONDSFORSALE_FAILURE,
      payload: { err },
    }));
  };
}

export function getTBondsBondInfo(serial) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETBONDS_BOND_PENDING
    });
    const { connection, settings } = getState();
    checkForTelosMainet(settings);

    const query = {
      json: true,
      code: tbondContract,
      scope: serial,
      table: 'bonds',
      limit: 1000000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const bondData = rows
        .map((item) => {
          const {
            backed_amount,
            release_event,
            locked
          } = item;
          return {
            serial,
            backed_amount,
            release_event,
            locked
          };
        });
      return dispatch({
        type: types.SYSTEM_GETBONDS_BOND_SUCCESS,
        payload: {
          serial,
          bondData
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETBONDS_BOND_FAILURE,
      payload: { err },
    }));
  };
}

export function getTBondsEventInfo(serial) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETBONDS_EVENT_PENDING
    });
    const { connection, settings } = getState();
    checkForTelosMainet(settings);

    const query = {
      json: true,
      code: tbondContract,
      scope: serial,
      table: 'events',
      limit: 1000000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const eventData = rows
        .map((item) => {
          const {
            event_name,
            event_time,
            locked
          } = item;
          return {
            serial,
            event_name,
            event_time,
            locked
          };
        });
      return dispatch({
        type: types.SYSTEM_GETBONDS_EVENT_SUCCESS,
        payload: {
          serial,
          eventData
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETBONDS_EVENT_FAILURE,
      payload: { err },
    }));
  };
}

export function getTBondsTagInfo(serial) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETBONDSTAGS_PENDING
    });
    const { connection, settings } = getState();
    checkForTelosMainet(settings);

    const query = {
      json: true,
      code: tbondContract,
      scope: serial,
      table: 'tags',
      limit: 1000000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const tagData = rows
        .map((item) => {
          const {
            tag_name,
            content,
            locked
          } = item;
          return {
            serial,
            tag_name,
            content,
            locked
          };
        });
      return dispatch({
        type: types.SYSTEM_GETBONDSTAGS_SUCCESS,
        payload: {
          serial,
          tagData
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETBONDSTAGS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  addACHAccount,
  addACHDeposit,
  addACHWithdrawal,
  addWireAccount,
  addWireDeposit,
  addWireWithdrawal,
  approveOfframpKYC,
  create2FA,
  enable2FA,
  disable2FA,
  chargeCard,
  createExchangeContact,
  buyTBond,
  sellTBond,
  withdrawPBTC,
  releaseTBond,
  getTBondsForSale,
  getPBTCAddress,
  getContactByPublicKey,
  getCurrencyStats,
  getCustomTokensRemote,
  getDeposits,
  getExchangeAPI,
  getExchangeRates,
  getGlobals,
  getPaymentMethods,
  getPriceFeed,
  getPriceFeedGecko,
  getProfiles,
  getRamStats,
  openProfile,
  setProfileAvatar,
  submitExchangeKYC,
  submitOfframpKYC,
  uploadExchangeKYCDoc,
  uploadOfframpKYCDoc,
  verifyExchangeContact
};
