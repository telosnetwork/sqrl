import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';
import { payforcpunet } from '../helpers/eos';

export function buyram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_BUYRAM_PENDING
    });

    const { account } = settings;

    let actions = [
      {
        account: 'eosio',
        name: 'buyram',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          payer: account,
          receiver: account,
          quant: `${amount.toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }).then((tx) => {
      setTimeout(dispatch(getAccount(account)), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_BUYRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_BUYRAM_FAILURE
    }));
  };
}

export default {
  buyram
};
