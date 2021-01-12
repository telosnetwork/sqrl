import * as types from '../types';

import { getAccounts } from '../accounts';
import eos from '../helpers/eos';
import { payforcpunet } from '../helpers/eos';

export function voteproducers(producers = [], proxy = '') {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_PENDING
    });
    const { account } = settings;
    // sort (required by most EOSIO networks)
    producers.sort();

    let actions = [
      {
        account: 'eosio',
        name: 'voteproducer',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          voter:account, 
          proxy:proxy, 
          producers:producers
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions 
    }).then((tx) => {
        const accounts = [account];
        // If a proxy is set, that account also needs to be loaded
        if (proxy) {
          accounts.push(proxy);
        }
        // Add a short delay for data processing on the node
        setTimeout(() => {
          dispatch(getAccounts([account, proxy]));
        }, 500);
        return dispatch({
          payload: { tx, producers, proxy },
          type: types.SYSTEM_VOTEPRODUCER_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: { err, producers, proxy },
        type: types.SYSTEM_VOTEPRODUCER_FAILURE
      }));
  };
}

export default {
  voteproducers
};
