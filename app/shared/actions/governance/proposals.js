import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';
import { Decimal } from 'decimal.js';
import { payforcpunet } from '../helpers/eos';

const defaultContract = 'eosio.saving';
const worksContract = 'works.decide';

export function createWorksProposal(title, description, content, proposal_name, category, total_requested, milestones) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_CREATEWORKSPROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [
      {
        account: worksContract,
        name: 'draftprop',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          title,
          description,
          content,
          proposal_name,
          proposer: account,
          category,
          total_requested: total_requested + ' ' + settings.blockchain.tokenSymbol,
          milestones
        }
      }
    ];
    
    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_CREATEWORKSPROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_CREATEWORKSPROPOSAL_FAILURE
    }));
  };
}

export function addWorksMilestones(proposal_name, milestones) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_ADDWORKSMILESTONE_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [];
    milestones.map((milestone) => {
      actions.push({
        account: worksContract,
        name: 'addmilestone',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proposal_name,
          requested: milestone.amount + ' ' + settings.blockchain.tokenSymbol
        }
      });
    });
    
    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_ADDWORKSMILESTONE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_ADDWORKSMILESTONE_FAILURE
    }));
  };
}

export function editWorksMilestones(proposal_name, milestones) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_EDITWORKSMILESTONE_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [];
    milestones.map((milestone) => {
      actions.push({
        account: worksContract,
        name: 'editms',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proposal_name,
          milestone_id: milestone.number,
          new_requested: milestone.amount + ' ' + settings.blockchain.tokenSymbol
        }
      });
    });
    
    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_EDITWORKSMILESTONE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_EDITWORKSMILESTONE_FAILURE
    }));
  };
}

export function createProposal(title, ipfs_location, cycles, amount, send_to) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    
    let feeAmount = (amount * 3 / 100);
    if (feeAmount < 50 || isNaN(feeAmount))
      feeAmount = 50;

    let actions = [
      {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          from: account,
          to:'eosio.saving',
          quantity: feeAmount.toFixed(settings.tokenPrecision) + ' ' + settings.blockchain.tokenSymbol,
          memo: "WPS deposit ("+title+")"
        }
      },{
        account: defaultContract,
        name: 'submit',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proposer: account,
          title,
          cycles,
          ipfs_location,
          amount: amount + ' ' + settings.blockchain.tokenSymbol,
          receiver:send_to
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
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

export function editProposal(proposal_id, title, ipfs_location, amount, send_to) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_EDITPROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [
      {
        account: defaultContract,
        name: 'editproposal',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          sub_id: proposal_id,
          title: title,
          ipfs_location: ipfs_location,
          amount: amount,
          receiver:send_to
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_EDITPROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_EDITPROPOSAL_FAILURE
    }));
  };
}

export function actOnProposal(proposal_name, actionName, feeAmount, title, scope = worksContract) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_ACT_ON_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [];

    if (actionName == 'launchprop') {
      actions.push({
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          from: account,
          to: worksContract,
          quantity: Decimal(feeAmount).plus(30).toFixed(settings.tokenPrecision) + ' ' + settings.blockchain.tokenSymbol,
          memo: "Works deposit ("+title+")"
        }
      });
    } 
    if (actionName === 'cancelprop') {
      actions.push({
        account: scope,
        name: actionName,
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proposal_name,
          memo:'Cancelled by ' + account
        }
    });
    } else if (actionName === 'submitreport') {
      actions.push({
        account: scope,
        name: actionName,
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proposal_name,
          report: proposal_name
        }
    });
    } else {
      actions.push({
        account: scope,
        name: actionName,
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          proposal_name
        }
      });
    }
  
    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
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

export function actOnAmendment(ballot_name, actionName, feeAmount, title, scope = worksContract) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_ACT_ON_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [];

    if (actionName == 'launchprop') {
      actions.push({
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          from: account,
          to: worksContract,
          quantity: Decimal(feeAmount).plus(30).toFixed(settings.tokenPrecision) + ' ' + settings.blockchain.tokenSymbol,
          memo: "Works deposit ("+title+")"
        }
      });
    } 
    if (actionName === 'cancelprop') {
      actions.push({
        account: scope,
        name: actionName,
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          ballot_name,
          memo:'Cancelled by ' + account
        }
    });
    } else {
      actions.push({
        account: scope,
        name: actionName,
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          ballot_name
        }
      });
    }
  
    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
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
      limit: 1000000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].prop_id;
    }
    //dispatch(getBallots());
    //dispatch(getProposalMilestones());
    //dispatch(getProposalSubmissions());
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

export function getBallots(scope = 'telos.decide', previous = false) {
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
      limit: 1000000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].ballot_name;
    } else { // first call
      dispatch(getProposalSubmissions());
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
        .map((ballot) => {
          const {
            ballot_name,
            category,
            publisher,
            status,
            title,
            description,
            content,
            treasury_symbol,
            voting_method,
            min_options,
            max_options,
            options,
            total_voters,
            total_delegates,
            total_raw_weight,
            cleaned_count,
            begin_time,
            end_time
          } = ballot;
          dispatch(getVoteInfo(ballot_name));
          return {
            ballot_name,
            category,
            publisher,
            status,
            title,
            description,
            content,
            treasury_symbol,
            voting_method,
            min_options,
            max_options,
            options,
            total_voters,
            total_delegates,
            total_raw_weight,
            cleaned_count,
            begin_time,
            end_time
          };
        });
      const ballots = sortBy(data, 'begin_time').reverse();
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

export function getProposalSubmissions(scope = 'works.decide', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_SUBMISSIONS_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'proposals',
      limit: 1000000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].proposal_name;
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
        .map((proposal) => {
          const {
            title,
            description,
            content,
            proposal_name,
            proposer,
            category,
            status,
            current_ballot,
            fee,
            refunded,
            total_requested,
            remaining,
            milestones,
            current_milestone
          } = proposal;
          dispatch(getProposalMilestones(proposal_name));
          return {
            title,
            description,
            content,
            proposal_name,
            proposer,
            category,
            status,
            current_ballot,
            fee,
            refunded,
            total_requested,
            remaining,
            milestones,
            current_milestone
          };
        });
      const submissions = sortBy(data, 'status').reverse();
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

export function getProposalMilestones(proposal_name, previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETWORKSMILESTONE_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'works.decide',
      scope: proposal_name,
      table: 'milestones',
      limit: 1000000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].milestone_id;
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
        return dispatch(getProposalMilestones(proposal_name, rows));
      }
      const data = rows
        .map((milestone) => {
          const {
            milestone_id,
            status,
            requested,
            report,
            ballot_name,
            ballot_results
          } = milestone;
          return {
            milestone_id,
            status,
            requested,
            report,
            ballot_name,
            ballot_results
          };
        });
      const milestones = sortBy(data, 'milestone_id');
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETWORKSMILESTONE_SUCCESS,
        payload: {
          milestones,
          proposal_name
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETWORKSMILESTONE_FAILURE,
      payload: { err },
    }));
  };
}

export function getVoteInfo(ballot_name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'telos.decide',
      scope: ballot_name,
      table: 'votes',
      limit: 1000000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const votes = rows
        .map((data) => {
          const {
            voter,
            is_delegate,
            raw_votes,
            weighted_votes,// [{ "key": "yes", "value": "40.0000 VOTE" }]
            vote_time,
            worker,
            rebalances,
            rebalance_volume
          } = data;
          return {
            voter,
            is_delegate,
            raw_votes,
            weighted_votes,
            vote_time,
            worker,
            rebalances,
            rebalance_volume
          };
        });
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS,
        payload: {
          ballot_name,
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

    let actions = [
      {
        account: 'telos.decide',
        name: 'regvoter',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          voter,
          treasury_symbol:'0.'.padEnd(settings.tokenPrecision + 2, '0') + ' VOTE'
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
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

    let actions = [
      {
        account: 'eosio.trail',
        name: 'mirrorcast',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          voter,
          token_symbol: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
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

export function voteBallot(voter, ballot_name, options) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;

    let actions = [
      {
        account: 'telos.decide',
        name: 'refresh',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          voter
        }
      },{
        account: 'telos.decide',
        name: 'castvote',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          voter,
          ballot_name,
          options
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
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

export function getWPSConfig(scope = 'works.decide') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETWORKSCONFIG_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'config',
      limit: 1000000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      /*const {
        app_name,
        app_version,
        admin,
        available_funds,
        reserved_funds,
        deposited_funds,
        paid_funds,
        quorum_threshold,
        yes_threshold,
        quorum_refund_threshold,
        yes_refund_threshold,
        min_fee,
        fee_percent,
        min_milestones,
        max_milestones,
        milestone_length,
        min_requested,
        max_requested
      }*/
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETWORKSCONFIG_SUCCESS,
        payload: {
          wpsconfig: rows[0],
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETWORKSCONFIG_FAILURE,
      payload: { err },
    }));
  }
};

export function getRatifySubmissions(scope = 'amend.decide', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_RATIFYSUBMISSIONS_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'proposals',
      limit: 1000000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].proposal_id;
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
        return dispatch(getRatifySubmissions(scope, rows));
      }
      const data = rows
        .map((submission) => {
          const {
            title,
            subtitle,
            ballot_name,
            document_name,
            status,
            treasury_symbol,
            proposer,
            ballot_results,
            new_content
          } = submission;
          return {
            title,
            subtitle,
            ballot_name,
            document_name,
            status,
            treasury_symbol,
            proposer,
            ballot_results,
            new_content
          };
        });
      const submissions = sortBy(data, 'ballot_name').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_RATIFYSUBMISSIONS_SUCCESS,
        payload: {
          submissions
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_RATIFYSUBMISSIONS_FAILURE,
      payload: { err },
    }));
  };
}

export function getRatifyDocuments(scope = 'amend.decide', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_RATIFYDOCUMENTS_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'documents',
      limit: 1000000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].document_id;
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
        return dispatch(getRatifyDocuments(scope, rows));
      }
      const data = rows
        .map((document) => {
          const {
            title,
            subtitle,
            document_name,
            author,
            sections,
            open_proposals,
            amendment
          } = document;
          return {
            title,
            subtitle,
            document_name,
            author,
            sections,
            open_proposals,
            amendment
          };
        });
      const documents = sortBy(data, 'document_name').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_RATIFYDOCUMENTS_SUCCESS,
        payload: {
          documents
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_RATIFYDOCUMENTS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  actOnProposal,
  addWorksMilestones,
  createProposal,
  createWorksProposal,
  editWorksMilestones,
  editProposal,
  getProposals,
  getRatifyDocuments,
  getRatifySubmissions,
  getWPSConfig,
  mirrorCast,
  registerVoter,
  voteBallot
};