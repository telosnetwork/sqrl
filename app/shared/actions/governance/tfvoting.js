import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';
import { payforcpunet } from '../helpers/eos';

const defaultContract = 'tf';

export function getTFConfig() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFCONFIG_PENDING
    });
    const { connection } = getState();
    eos(connection).getTableRows(true, defaultContract, defaultContract, 'config').then((results) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFCONFIG_SUCCESS,
      payload: { results: results.rows[0] }
    })).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFCONFIG_FAILURE,
      payload: { err },
    }));
  };
}

export function getTFVoterBalances(scope = 'eosio.trail', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFVTBALANCES_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: scope,
      scope: 'TFVT',
      table: 'balances',
      limit: 1000,
    };
    if (previous) {
      const owner = previous[previous.length - 1].owner;
      query.lower_bound = isNaN(owner) ? owner : ' ' + owner;
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
        return dispatch(getTFVoterBalances(scope, rows));
      }
      const data = rows
        .map((balance) => {
          const {
            owner,
            tokens
          } = balance;

          return {
            owner,
            tokens
          };
        });
      const balances = sortBy(data, 'owner').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETTFVTBALANCES_SUCCESS,
        payload: {
          tfvtbalances: balances,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFVTBALANCES_FAILURE,
      payload: { err },
    }));
  };
}

export function getTFBoardMembers(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFVTBOARDMEMBERS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: defaultContract,
      scope: defaultContract,
      table: 'boardmembers',
      limit: 1000,
    };
    if (previous) {
      const member = previous[previous.length - 1].member;
      query.lower_bound = isNaN(member) ? member : ' ' + member;
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
        return dispatch(getTFBoardMembers(defaultContract, rows));
      }
      const data = rows
        .map((m) => {
          const {
            member
          } = m;

          return {
            member
          };
        });
      const members = sortBy(data, 'member').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETTFVTBOARDMEMBERS_SUCCESS,
        payload: {
          tfvtboardmembers: members,
          scope: defaultContract
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFVTBOARDMEMBERS_FAILURE,
      payload: { err },
    }));
  };
}

export function getTFNominees(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFVTNOMINEES_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: defaultContract,
      scope: defaultContract,
      table: 'nominees',
      limit: 1000,
    };
    if (previous) {
      const member = previous[previous.length - 1].member;
      query.lower_bound = isNaN(member) ? member : ' ' + member;
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
        return dispatch(getTFNominees(defaultContract, rows));
      }
      const data = rows
        .map((n) => {
          const {
            nominee
          } = n;

          return {
            nominee
          };
        });
      const nominees = sortBy(data, 'nominee').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GETTFVTNOMINEES_SUCCESS,
        payload: {
          tfvtnominees: nominees,
          scope: defaultContract
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GETTFVTNOMINEES_FAILURE,
      payload: { err },
    }));
  };
}

export function nominateBoardMember(nominee) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_NOMINATEBOARDMEMBER_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'nominate',
          authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
          data: {
            nominee,
            nominator: account
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
        type: types.SYSTEM_GOVERNANCE_NOMINATEBOARDMEMBER_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_NOMINATEBOARDMEMBER_FAILURE
    }));
  };
}

export function acceptNomination(info_link) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_ACCEPTNOMINATION_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'addcand',
          authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
          data: {
            nominee: account,
            info_link: info_link
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
        type: types.SYSTEM_GOVERNANCE_ACCEPTNOMINATION_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_ACCEPTNOMINATION_FAILURE
    }));
  };
}

export function declineNomination() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_DECLINENOMINATION_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'removecand',
          authorization: [{
            actor: account,
            permission: settings.authorization || 'active'
          }],
          data: {
            candidate: account
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
        type: types.SYSTEM_GOVERNANCE_DECLINENOMINATION_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_DECLINENOMINATION_FAILURE
    }));
  };
}

export function endTFElection() {
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
            permission: settings.authorization || 'active'
          }],
          data: {
            holder: account
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
        type: types.SYSTEM_GOVERNANCE_ENDELECTION_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_ENDELECTION_FAILURE
    }));
  };
}

export default {
  getTFConfig,
  getTFVoterBalances,
  getTFBoardMembers,
  getTFNominees,
  nominateBoardMember,
  acceptNomination,
  declineNomination,
  endTFElection
}