import * as types from '../actions/types';

const initialState = {
  tfvtbalances: [],
  tfvtboardmembers: [],
  tfvtnominees: [],
  scope: ''
};

export default function tfvoting(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_GOVERNANCE_GETTFVTBALANCES_SUCCESS: {
      return Object.assign({}, state, {
        tfvtbalances: action.payload.tfvtbalances,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GETTFVTBOARDMEMBERS_SUCCESS: {
      return Object.assign({}, state, {
        tfvtboardmembers: action.payload.tfvtboardmembers,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GETTFVTNOMINEES_SUCCESS: {
      return Object.assign({}, state, {
        tfvtnominees: action.payload.tfvtnominees,
        scope: action.payload.scope
      });
    }
    default: {
      return state;
    }
  }
}
