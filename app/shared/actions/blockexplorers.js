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
        name: 'telosfoundation.io',
        patterns: {
          account: 'http://monitor.telosfoundation.io/account/{account}',
          txid: 'http://monitor.telosfoundation.io/transaction/{txid}',
          tokenSymbol: 'TLOS'
        }
      },
      {
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
      },
      {
        name: 'telosindex.io',
        patterns: {
          account: 'https://explorer.telosindex.io/lookup/accounts/{account}',
          txid: 'https://explorer.telosindex.io/lookup/transactions/{txid}',
          tokenSymbol: 'TLOS'
        }
      },
      {
        name: 'bloks.io',
        tokenSymbol: 'EOS',
        patterns: {
          account: 'https://www.bloks.io/account/{account}',
          txid: 'https://www.bloks.io/transaction/{txid}',
          tokenSymbol: 'EOS'
        }
      },
      {
        name: 'eosflare.io',
        tokenSymbol: 'EOS',
        patterns: {
          account: 'https://eosflare.io/account/{account}',
          txid: 'https://eosflare.io/tx/{txid}',
          tokenSymbol: 'EOS'
        }
      },
      {
        name: 'eosmonitor.io',
        tokenSymbol: 'EOS',
        patterns: {
          account: 'https://eosmonitor.io/account/{account}',
          txid: 'https://eosmonitor.io/txn/{txid}',
          tokenSymbol: 'EOS'
        }
      },
      {
        name: 'eospark.com',
        patterns: {
          account: 'https://eospark.com/MainNet/account/{account}',
          txid: 'https://eospark.com/MainNet/tx/{txid}',
          tokenSymbol: 'EOS'
        }
      },
      {
        name: 'eosweb.net',
        patterns: {
          account: 'https://eosweb.net/account/{account}',
          txid: 'https://eosweb.net/transaction/{txid}',
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
