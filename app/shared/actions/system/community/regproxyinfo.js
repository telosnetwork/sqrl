import * as types from '../../types';

import { getTable } from '../../table';
import { getAccount } from '../../accounts';
import eos from '../../helpers/eos';
import { payforcpunet } from '../../helpers/eos';

export function regproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const { account } = settings;

    dispatch({
      type: types.SYSTEM_REGPROXY_PENDING
    });

    let actions = [
      {
        account: 'eosio',
        name: 'regproxy',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proxy: account,
          isproxy: 1
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REGPROXY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REGPROXY_FAILURE
    }));
  };
}

export function unregproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    const { account } = settings;

    dispatch({
      type: types.SYSTEM_UNREGPROXY_PENDING
    });

    let actions = [
      {
        account: 'eosio',
        name: 'regproxy',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proxy: account,
          isproxy: 0
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UNREGPROXY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNREGPROXY_FAILURE
    }));
  };
}

export function setregproxyinfo(
  name,
  website,
  slogan,
  philosophy,
  background,
  logo_256,
  telegram,
  steemit,
  twitter,
  wechat,
  reserved_1,
  reserved_2,
  reserved_3) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_SET_REGPROXYINFO_PENDING
    });

    const { account } = settings;

    let actions = [
      {
        account: 'tlsproxyinfo',
        name: 'set',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proxy:account,
          name,
          website,
          slogan,
          philosophy,
          background,
          logo_256,
          telegram: telegram || '',
          steemit: steemit  || '',
          twitter: twitter  || '',
          wechat: wechat  || '',
          reserved_1: reserved_1 || '',
          reserved_2: reserved_2 || '',
          reserved_3: reserved_3 || ''
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }).then((tx) => {
      setTimeout(() => {
        dispatch(getTable('tlsproxyinfo', 'tlsproxyinfo', 'proxies'));
      }, 1000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_SET_REGPROXYINFO_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SET_REGPROXYINFO_FAILURE
    }));
  };
}

export function removeregproxyinfo() {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();
    
    dispatch({
      type: types.SYSTEM_REMOVE_REGPROXYINFO_PENDING
    });

    const { account } = settings;

    let actions = [
      {
        account: 'tlsproxyinfo',
        name: 'remove',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proxy: account
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }).then((tx) => {
      setTimeout(() => {
        dispatch(getTable('tlsproxyinfo', 'tlsproxyinfo', 'proxies'));
      }, 1000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REMOVE_REGPROXYINFO_SUCCESS
      });
  }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REMOVE_REGPROXYINFO_FAILURE
    }));
  };
}

export default {
  regproxy,
  removeregproxyinfo,
  setregproxyinfo,
  unregproxy
};
