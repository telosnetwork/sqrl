import * as types from '../actions/types';

const initialState = {
  list: [],
  votes: [],
  ballots: [],
  ratifydocuments: [],
  submissions: [],
  ratifysubmissions: [],
  scope: ''
};

export default function proposals(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS: {
      return Object.assign({}, state, {
        votes: action.payload.votes,
        scope: action.payload.account
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS: {
      return Object.assign({}, state, {
        list: action.payload.proposals,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_BALLOTS_SUCCESS: {
      return Object.assign({}, state, {
        ballots: action.payload.ballots,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_SUBMISSIONS_SUCCESS: {
      return Object.assign({}, state, {
        submissions: action.payload.submissions,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_RATIFYSUBMISSIONS_SUCCESS: {
      return Object.assign({}, state, {
        ratifysubmissions: action.payload.submissions,
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_RATIFYDOCUMENTS_SUCCESS: {
      return Object.assign({}, state, {
        ratifydocuments: action.payload.documents,
      });
    }
    default: {
      return state;
    }
  }
}
