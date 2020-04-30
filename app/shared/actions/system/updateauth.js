import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';
import { payforcpunet } from '../helpers/eos';

export function updateauth(permission, parent, auth, authorizationOverride = false, linkauthActions) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_UPDATEAUTH_PENDING
    });
    let authorization = settings.authorization;
    // Setting of the authorization based on either an override or the global connection setting
    if (!authorization) {
      authorization = [connection.authorization];
    }
    let actions = [
      {
        account: 'eosio',
        name: 'updateauth',
        authorization: [{
          actor: account,
          permission: authorization || 'active'
        }],
        data: {
          account:account,
          permission:permission,
          parent:parent,
          auth:auth
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
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
      let actions = [
        {
          account: 'eosio',
          name: 'linkauth',
          authorization: [{
            actor: account,
            permission: authorization || 'active'
          }],
          data: {
            account,
            code:'eosio',
            type: auth,
            requirement: permission
          }
        }
      ];
  
      const payforaction = payforcpunet(account, getState());
      if (payforaction) actions = payforaction.concat(actions);
  
      return eos(connection, true, payforaction!==null).transaction({
          actions
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

export function deleteauth(authorization, permission, linkauthActions) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_DELETEAUTH_PENDING
    });
    
    linkauthActions.map( (auth) => {
      eos(connection, true).unlinkauth({
        account,
        code:'eosio',
        type: auth
      }, {
        authorization,
        forceActionDataHex: false,
      });
    });

    return eos(connection, true).deleteauth({
      account,
      permission: permission
    }, {
      authorization,
      forceActionDataHex: false,
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_DELETEAUTH_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_DELETEAUTH_FAILURE
    }));
  };
}

export default {
  deleteauth,
  linkauth,
  updateauth,
  unlinkauth
};
