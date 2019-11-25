import * as types from './types';

import eos from './helpers/eos';
import { getCurrencyBalance } from './accounts';
import { payforcpunet } from './helpers/eos';

export function transfer(from, to, quantity, memo, symbol) {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SYSTEM_TRANSFER_PENDING
    });
    try {
      symbol = symbol ? symbol : settings.blockchain.tokenSymbol;
      const contracts = balances.__contracts;
      const account = contracts[symbol].contract;
      let actions = [
        {
          account: account,
          name: 'transfer',
          authorization: [{
            actor: from,
            permission: 'active',
          }],
          data: {
            from,
            to,
            quantity,
            memo,
          },
        }
      ];
  
      const payforaction = payforcpunet(from, getState());
      if (payforaction) actions = payforaction.concat(actions);
  
      return eos(connection, true, payforaction!==null).transaction(
        {
          actions
        }, 
       {
        broadcast: connection.broadcast,
        expireInSeconds: connection.expireInSeconds,
        sign: connection.sign
      }).then((tx) => {
        // If this is an offline transaction, also store the ABI
        if (!connection.sign && account !== 'eosio.token') {
          return eos(connection, true).getAbi(account).then((contract) =>
            dispatch({
              payload: {
                contract,
                tx
              },
              type: types.SYSTEM_TRANSFER_SUCCESS
            }));
        }
        dispatch(getCurrencyBalance(from));
        return dispatch({
          payload: { tx },
          type: types.SYSTEM_TRANSFER_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_TRANSFER_FAILURE
      }));
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.SYSTEM_TRANSFER_FAILURE
      });
    }
  };
}

export default {
  transfer
};
