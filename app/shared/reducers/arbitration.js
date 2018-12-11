import * as types from '../actions/types';

const initialState = {
  leaderboards: [],
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
    default: {
      return state;
    }
  }
}
