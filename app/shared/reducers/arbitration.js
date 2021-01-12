import * as types from '../actions/types';

const initialState = {
  leaderboards: [],
  arbitrators: [],
  scope: ''
};

export default function arbitration(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_GOVERNANCE_GETLEADERBOARDS_SUCCESS: {
      return Object.assign({}, state, {
        leaderboards: action.payload.leaderboards,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GETARBITRATORS_SUCCESS: {
      return Object.assign({}, state, {
        arbitrators: action.payload.arbitrators,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_ENDELECTION_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
