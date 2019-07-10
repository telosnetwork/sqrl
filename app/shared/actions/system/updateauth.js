import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function updateauth(permission, parent, auth, authorizationOverride = false, linkauthActions) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_UPDATEAUTH_PENDING
    });
    let authorization;
    // Setting of the authorization based on either an override or the global connection setting
    if (authorizationOverride || connection.authorization) {
      authorization = [authorizationOverride || connection.authorization];
    }
    return eos(connection, true).updateauth({
      account,
      permission,
      parent,
      auth
    }, {
      authorization,
      forceActionDataHex: false,
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(linkauth(authorization, permission, linkauthActions)), 500);
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UPDATEAUTH_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UPDATEAUTH_FAILURE
    }));
  };
}

export function linkauth(authorization, permission, linkauthActions) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_LINKAUTH_PENDING
    });
    
    linkauthActions.map( (auth) => {
      eos(connection, true).linkauth({
        account,
        code:'eosio',
        type: auth,
        requirement: permission
      }, {
        authorization,
        forceActionDataHex: false,
      }).then((tx) => {
        return dispatch({
          payload: { tx },
          type: types.SYSTEM_LINKAUTH_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_LINKAUTH_FAILURE
      }));
    });
  };
}

export function unlinkauth(auth) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_UNLINKAUTH_PENDING
    });

    const authorization = [settings.authorization || connection.authorization];
    
    return eos(connection, true).unlinkauth({
        account,
        code:'eosio',
        type: auth
      }, {
        authorization,
        forceActionDataHex: false,
      }).then((tx) => {
        return dispatch({
          payload: { tx },
          type: types.SYSTEM_UNLINKAUTH_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_UNLINKAUTH_FAILURE
    }));
  }
}

export default {
  linkauth,
  updateauth,
  unlinkauth
};
