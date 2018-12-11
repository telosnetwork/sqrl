import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';

const defaultContract = 'eosio.saving';

export function createProposal(title, ipfs_location, cycles, amount, send_to) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            from: account,
            to:'eosio.saving',
            quantity: '50.0000 ' + settings.blockchain.tokenSymbol,
            memo: "WPS deposit ("+title+")"
          }
        },{
          account: defaultContract,
          name: 'submit',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            proposer: account,
            title,
            cycles,
            ipfs_location,
            amount,
            receiver:send_to
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_FAILURE
    }));
  };
}

export function actOnProposal(submission_id, actionName) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_ACT_ON_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            sub_id: submission_id
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      dispatch(getProposals());
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_ACT_ON_PROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_ACT_ON_PROPOSAL_FAILURE
    }));
  };
}

export function getProposals(scope = 'eosio.trail', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'proposals',
      limit: 100000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].prop_id;
    }
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      // if there are missing results
      if (results.more) {
        return dispatch(getProposals(scope, rows));
      }
      dispatch(getVoteInfo(settings.account));
      dispatch(getBallots());
      dispatch(getProposalSubmissions());
      const data = rows
        .map((proposal) => {
          const {
            prop_id,
            publisher,
            info_url,
            no_count,
            yes_count,
            abstain_count,
            unique_voters,
            begin_time,
            end_time,
            cycle_count,
            status
          } = proposal;
          return {
            prop_id,
            publisher,
            info_url,
            no_count,
            yes_count,
            abstain_count,
            unique_voters,
            begin_time,
            end_time,
            cycle_count,
            status
          };
        });
      const proposals = sortBy(data, 'prop_id').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS,
        payload: {
          proposals,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getBallots(scope = 'eosio.trail', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_BALLOTS_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'ballots',
      limit: 100000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].ballot_id;
    }
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      // if there are missing results
      if (results.more) {
        return dispatch(getBallots(scope, rows));
      }
      const data = rows
        //.filter((ballot) => (ballot.table_id === 0 || ballot.table_id === 2)) // only ballots for proposals&arbs
        .map((ballot) => {
          const {
            ballot_id,
            table_id,
            reference_id
          } = ballot;
          return {
            ballot_id,
            table_id,
            reference_id
          };
        });
      const ballots = sortBy(data, 'ballot_id').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_BALLOTS_SUCCESS,
        payload: {
          ballots,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_BALLOTS_FAILURE,
      payload: { err },
    }));
  };
}

export function getProposalSubmissions(scope = 'eosio.saving', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_SUBMISSIONS_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'submissions',
      limit: 100000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].ballot_id;
    }
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      // if there are missing results
      if (results.more) {
        return dispatch(getProposalSubmissions(scope, rows));
      }
      const data = rows
        .map((submission) => {
          const {
            id,
            ballot_id,
            proposer,
            receiver,
            title,
            ipfs_location,
            cycles,
            amount,
            fee
          } = submission;
          return {
            id,
            ballot_id,
            proposer,
            receiver,
            title,
            ipfs_location,
            cycles,
            amount,
            fee
          };
        });
      const submissions = sortBy(data, 'id').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_SUBMISSIONS_SUCCESS,
        payload: {
          submissions,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_SUBMISSIONS_FAILURE,
      payload: { err },
    }));
  };
}

export function getVoteInfo(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio.trail',
      scope: account,
      table: 'votereceipts',
      limit: 10000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const votes = rows
        .map((data) => {
          const {
            ballot_id,
            directions,// vote 0=NO, 1=YES, 2=ABSTAIN
            weight,
            expiration
          } = data;
          return {
            ballot_id,
            directions,// vote 0=NO, 1=YES, 2=ABSTAIN
            weight,
            expiration
          };
        });
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS,
        payload: {
          account,
          votes,
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_FAILURE,
      payload: { err },
    }));
  }
};

export function registerVoter(voter) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_REGVOTER_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: 'eosio.trail',
          name: 'regvoter',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            voter,
            token_symbol:'0.0000 VOTE'
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_REGVOTER_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_REGVOTER_FAILURE
    }));
  };
}

export function mirrorCast(voter) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_MIRRORCAST_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: 'eosio.trail',
          name: 'mirrorcast',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            voter,
            token_symbol: '0.0000 ' + settings.blockchain.tokenSymbol
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_MIRRORCAST_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_MIRRORCAST_FAILURE
    }));
  };
}

export function voteBallot(voter, ballot_id, direction) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: 'eosio.trail',
          name: 'castvote',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            voter,
            ballot_id,
            direction
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(getVoteInfo(account));
      }, 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_FAILURE
    }));
  };
}

export default {
  actOnProposal,
  createProposal,
  getProposals,
  mirrorCast,
  registerVoter,
  voteBallot
};