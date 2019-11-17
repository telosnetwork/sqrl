import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';
import { payforcpunet } from '../helpers/eos';

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

export default {
  unregproxy
};
