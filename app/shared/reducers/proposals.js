import * as types from '../actions/types';

const initialState = {
  list: [],
  milestones: [],
  votes: [],
  ballots: [],
  ratifydocuments: [],
  submissions: [],
  ratifysubmissions: [],
  wpsconfig: {},
  scope: ''
};

export default function proposals(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS: {
      return Object.assign({}, state, {
        votes: Object.assign({}, state.votes, {
          [action.payload.ballot_name]: action.payload.votes
        })
      });
    }
    case types.SYSTEM_GOVERNANCE_GETWORKSMILESTONE_SUCCESS: {
      return Object.assign({}, state, {
        milestones: Object.assign({}, state.milestones, {
          [action.payload.proposal_name]: action.payload.milestones
        })
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS: {
      return Object.assign({}, state, {
        list: action.payload.proposals,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GETWORKSCONFIG_SUCCESS: {
      return Object.assign({}, state, {
        wpsconfig: action.payload.wpsconfig
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
