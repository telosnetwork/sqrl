import { partition } from 'lodash';

import * as types from '../actions/types';

const initialState = [];

export default function wallets(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SET_WALLET_ACTIVE:
    case types.IMPORT_WALLET_KEY: {

      const partitionParams = {
        account: action.payload.account,
        chainId: action.payload.chainId || false,
      };
      if (action.payload.authorization) {
        partitionParams.authorization = action.payload.authorization;
      }
      const [, other] = partition(state, partitionParams);
      
      return [
        action.payload,
        ...other
      ];
    }
    case types.REMOVE_WALLET: {
      if (action.payload.authorization) {
        const [, other] = partition(state, { 
          account: action.payload.account,
          authorization: action.payload.authorization,
          chainId: action.payload.chainId
        });
        return other;
      } else {
        const [, other] = partition(state, { 
          account: action.payload.account,
          chainId: action.payload.chainId
        });
        return other;
      }
    }
    case types.UPGRADE_WALLET: {
      const partitionQuery = {
        account: action.payload.account,
        chainId: action.payload.chainId,
      };
      if (action.payload.oldAuthorization) {
        partitionQuery.authorization = action.payload.oldAuthorization;
      }
      const [current, other] = partition(state, partitionQuery);
      if (current.length > 0) {
        const modified = Object.assign({}, current[0]);
        modified.accountData = action.payload.accountData;
        modified.authorization = action.payload.authorization;
        modified.pubkey = action.payload.pubkey;
        modified.mode = action.payload.mode;
        return [
          ...[modified],
          ...other
        ];
      }
      return [
        ...current,
        ...other
      ];
    }
    default: {
      return state;
    }
  }
}
