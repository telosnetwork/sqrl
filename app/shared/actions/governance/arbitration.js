import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';
import { getBallots, getVoteInfo } from './proposals';

const defaultContract = 'eosio.arb';

export function registerCandidate(candidate, creds_ipfs_url) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_REGCANDIDATE_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'regcand',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            candidate,
            creds_ipfs_url
          }
        },
        {
          account: defaultContract,
          name: 'candaddlead',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            candidate,
            creds_ipfs_url
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      dispatch(getLeaderBoards());
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_REGCANDIDATE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_REGCANDIDATE_FAILURE
    }));
  };
}

export function unRegisterCandidate(candidate) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_UNREGCANDIDATE_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'candrmvlead',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            candidate
          }
        },
        {
          account: defaultContract,
          name: 'unregcand',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            candidate
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      dispatch(getLeaderBoards());
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_UNREGCANDIDATE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_UNREGCANDIDATE_FAILURE
    }));
  };
}

export function endElection(candidate) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_ENDELECTION_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'endelection',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            candidate
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      dispatch(getLeaderBoards());
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_ENDELECTION_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_ENDELECTION_FAILURE
    }));
  };
}

export function getArbitrators(scope = 'eosio.arb', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETARBITRATORS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'arbitrators',
      limit: 100000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].board_id;
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
        return dispatch(getArbitrators(scope, rows));
      }
      const data = rows
        .map((arbitrator) => {
          const {
            arb,
            arb_status,
            open_case_ids,
            closed_case_ids,
            credential_link,
            elected_time,
            term_length,
            languages
          } = arbitrator;
          return {
            arb,
            arb_status,
            open_case_ids,
            closed_case_ids,
            credential_link,
            elected_time,
            term_length,
            languages
          };
        });
      const arbitrators = sortBy(data, 'arb').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETARBITRATORS_SUCCESS,
        payload: {
          arbitrators,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETARBITRATORS_FAILURE,
      payload: { err },
    }));
  };
}

export function getLeaderBoards(scope = 'eosio.trail', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETLEADERBOARDS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: scope,
      scope,
      table: 'leaderboards',
      limit: 100000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].board_id;
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
      dispatch(getVoteInfo(settings.account));
      dispatch(getBallots());
      dispatch(getArbitrators());
      // if there are missing results
      if (results.more) {
        return dispatch(getLeaderBoards(scope, rows));
      }
      const data = rows
        .map((leaderboard) => {
          const {
            board_id,
            publisher,
            info_url,
            candidates,
            unique_voters,
            voting_symbol,
            available_seats,
            begin_time,
            end_time,
            status
          } = leaderboard;

          // make sure we preserve the original candidate index
          // since we sort them alphabetically by member in the UI
          // we don't want to lose this index!
          const candidatesWithIndex = candidates.map((candidate,index) => {
            const {
              member,
              info_link,
              votes,
              status
            } = candidate;
  
            return {
              index,
              member,
              info_link,
              votes,
              status
            };
          });
          return {
            board_id,
            publisher,
            info_url,
            candidates: candidatesWithIndex,
            unique_voters,
            voting_symbol,
            available_seats,
            begin_time,
            end_time,
            status
          };
        });
      const leaderboards = sortBy(data, 'board_id').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETLEADERBOARDS_SUCCESS,
        payload: {
          leaderboards,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETLEADERBOARDS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  endElection,
  getArbitrators,
  getLeaderBoards,
  registerCandidate,
  unRegisterCandidate
};