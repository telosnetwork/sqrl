import sortBy from 'lodash/sortBy';

import * as types from './types';
import eos from './helpers/eos';

export function getBlockExplorers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_PENDING
    });
    const rows = [
      {
        name: 'bloks.io',
        tokenSymbol: 'EOS',
        patterns: {
          account: 'https://www.bloks.io/account/{account}',
          txid: 'https://www.bloks.io/transaction/{txid}',
          tokenSymbol: 'EOS'
        }
      },{
        name: 'telos.bloks.io',
        tokenSymbol: 'TLOS',
        patterns: {
          account: 'https://telos.bloks.io/account/{account}',
          txid: 'https://telos.bloks.io/transaction/{txid}',
          tokenSymbol: 'TLOS'
        }
      },
      {
        name: 'wax.bloks.io',
        tokenSymbol: 'WAX',
        patterns: {
          account: 'https://wax.bloks.io/account/{account}',
          txid: 'https://wax.bloks.io/transaction/{txid}',
          tokenSymbol: 'WAX'
        }
      },{
        name: 'telos.eosx.io',
        patterns: {
          account: 'https://telos.eosx.io/account/{account}',
          txid: 'https://telos.eosx.io/tx/{txid}',
          tokenSymbol: 'TLOS'
        }
      },
      {
        name: 'telostracker.io',
        patterns: {
          account: 'https://telostracker.io/account/{account}',
          txid: 'https://telostracker.io/trx/{txid}',
          tokenSymbol: 'TLOS'
        }
      },{
        name: 'eospark.com',
        patterns: {
          account: 'https://eospark.com/MainNet/account/{account}',
          txid: 'https://eospark.com/MainNet/tx/{txid}',
          tokenSymbol: 'EOS'
        }
      }
    ];

    const sortedList = sortBy(rows, 'name');

    const blockExplorers = {};

    sortedList.forEach((bE) => {
      blockExplorers[bE.name] = bE.patterns;
    });

    return dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_SUCCESS,
      payload: {
        blockExplorers
      }
    });
  };
}

export default {
  getBlockExplorers
};
