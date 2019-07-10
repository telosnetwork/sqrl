import * as types from '../actions/types';

const initialState = {
  __contracts: {},
  __genesisbal: {}
};

export default function balances(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.CLEAR_BALANCE_CACHE:
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.GET_ACCOUNT_BALANCE_SUCCESS: {
      const {
        account_name,
        contract,
        precision,
        symbol,
        tokens
      } = action.payload;
      return Object.assign({}, state, {
        __contracts: Object.assign({}, state.__contracts, {
          [symbol.toUpperCase()]: {
            contract,
            precision
          }
        }),
        [account_name]: Object.assign({}, state[account_name], tokens)
      });
    }
    case types.GET_GENESIS_BALANCE_SUCCESS: {
      const {
        account,
        balance, 
        unclaimed_balance, 
        last_claim_time, 
        last_updated 
      } = action.payload;
      return Object.assign({}, state, {
        __genesisbal: Object.assign({}, {
          account,
          balance, 
          unclaimed_balance, 
          last_claim_time, 
          last_updated 
        })
      });
    }
    default: {
      return state;
    }
  }
}
