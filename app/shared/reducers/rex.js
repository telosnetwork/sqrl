import * as types from '../actions/types';

const initialState = {
  rexfund: [],
  rexpool: [],
  rexbal: [],
  cpuloans: [],
  netloans: [],
  rexqueue: []
};

export default function rex(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_REX_GETREX_SUCCESS: {
      return Object.assign({}, state, {
        rexfund: action.payload.rexfund
      });
    }
    case types.SYSTEM_REX_GETREXPOOL_SUCCESS: {
      return Object.assign({}, state, {
        rexpool: action.payload.rexpool
      });
    }
    case types.SYSTEM_REX_GETREXPOOL_FAILURE: {
      return Object.assign({}, state, {
        rexpool: null
      });
    }
    case types.SYSTEM_REX_GETREXBAL_SUCCESS: {
      return Object.assign({}, state, {
        rexbal: action.payload.rexbal
      });
    }
    case types.SYSTEM_REX_GETCPULOAN_SUCCESS: {
      return Object.assign({}, state, {
        cpuloans: action.payload.cpuloans
      });
    }
    case types.SYSTEM_REX_GETNETLOAN_SUCCESS: {
      return Object.assign({}, state, {
        netloans: action.payload.netloans
      });
    }
    case types.SYSTEM_REX_GETREXORDER_SUCCESS: {
      return Object.assign({}, state, {
        rexqueue: action.payload.rexqueue
      });
    }
    default: {
      return state;
    }
  }
}
