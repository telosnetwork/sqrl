import * as types from './types';
import eos from './helpers/eos';
import eos2 from './helpers/eos2';
import { payforcpunet } from './helpers/eos';
import { Decimal } from 'decimal.js';

export function deposit(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_DEPOSIT_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [
      {
        account: 'eosio',
        name: 'deposit',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account,
          amount: `${Decimal(amount).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_DEPOSIT_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_DEPOSIT_FAILURE
    }));
  };
}

export function withdraw(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_WITHDRAW_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'withdraw',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account,
          amount: `${Decimal(amount).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_WITHDRAW_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_WITHDRAW_FAILURE
    }));
  };
}

export function buyrex(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_BUYREX_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'buyrex',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          amount: `${Decimal(amount).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_BUYREX_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_BUYREX_FAILURE
    }));
  };
}

export function sellrex(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_SELLREX_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'sellrex',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          rex: `${Decimal(amount).toFixed(settings.tokenPrecision)} REX`
        },
      }
    ];
    
    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_SELLREX_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_SELLREX_FAILURE
    }));
  };
}

export function unstaketorex(from_net, from_cpu) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_UNSTAKETOREX_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'unstaketorex',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account,
          receiver: account,
          from_net: `${Decimal(from_net).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol,
          from_cpu: `${Decimal(from_cpu).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_UNSTAKETOREX_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_UNSTAKETOREX_FAILURE
    }));
  };
}

export function cnclrexorder() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_CANCELREXORDER_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'cnclrexorder',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_CANCELREXORDER_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_CANCELREXORDER_FAILURE
    }));
  };
}

export function rentcpu(receiver, loan_payment, loan_fund) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_RENTRESOURCE_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'rentcpu',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          receiver: receiver,
          loan_payment: `${Decimal(loan_payment).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol,
          loan_fund: `${Decimal(loan_fund).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_RENTRESOURCE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_RENTRESOURCE_FAILURE
    }));
  };
}

export function rentnet(receiver, loan_payment, loan_fund) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_RENTRESOURCE_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'rentnet',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          receiver: receiver,
          loan_payment: `${Decimal(loan_payment).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol,
          loan_fund: `${Decimal(loan_fund).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_RENTRESOURCE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_RENTRESOURCE_FAILURE
    }));
  };
}

export function fundcpuloan(loan_num, payment) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_FUNDCPU_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'fundcpuloan',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          loan_num: loan_num,
          payment: `${Decimal(payment).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_FUNDCPU_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_FUNDCPU_FAILURE
    }));
  };
}

export function defcpuloan(loan_num, amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_DEFUNDCPU_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'defcpuloan',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          loan_num: loan_num,
          amount: `${Decimal(amount).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_DEFUNDCPU_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_DEFUNDCPU_FAILURE
    }));
  };
}

export function fundnetloan(loan_num, payment) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_FUNDNET_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'fundnetloan',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          loan_num: loan_num,
          payment: `${Decimal(payment).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_FUNDNET_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_FUNDNET_FAILURE
    }));
  };
}

export function defnetloan(loan_num, amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_DEFUNDNET_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'defnetloan',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          from: account,
          loan_num: loan_num,
          amount: `${Decimal(amount).toFixed(settings.tokenPrecision)} ` + settings.blockchain.tokenSymbol
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_DEFUNDNET_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_DEFUNDNET_FAILURE
    }));
  };
}

export function consolidate() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_CONSOLIDATE_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'consolidate',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_CONSOLIDATE_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_CONSOLIDATE_FAILURE
    }));
  };
}

export function mvtosavings(rex) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_MVTOSAVINGS_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'mvtosavings',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account,
          rex: `${Decimal(rex).toFixed(settings.tokenPrecision)} REX`
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      //setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_MVTOSAVINGS_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_MVTOSAVINGS_FAILURE
    }));
  };
}

export function mvfromsavings(rex) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      globals,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_MVFROMSAVINGS_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'mvfrsavings',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account,
          rex: `${Decimal(rex).toFixed(settings.tokenPrecision)} REX`
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      //setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_MVFROMSAVINGS_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_MVFROMSAVINGS_FAILURE
    }));
  };
}

export function updaterex() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_UPDATEREX_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'updaterex',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_UPDATEREX_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_UPDATEREX_FAILURE
    }));
  };
}

export function closerex() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_REX_CLOSEREX_PENDING
    });

    const { account } = settings;

    // Build the operation to perform
    let actions = [{
        account: 'eosio',
        name: 'closerex',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active',
        }],
        data: {
          owner: account
        },
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos2(connection, true, payforaction!==null).transact({actions}, {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 120
    }).then((tx) => {
      setTimeout(dispatch(getRexFund()), 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REX_CLOSEREX_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REX_CLOSEREX_FAILURE
    }));
  };
}

export function getRexFund() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_REX_GETREX_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rexfund',
      lower_bound: account,
      limit: 1
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const data = rows
      .filter((record) => (record.owner == account))
        .map((record) => {
          const {
            version,
            owner,
            balance
          } = record;
          return {
            version,
            owner,
            balance
          };
        });

        return dispatch({
          type: types.SYSTEM_REX_GETREX_SUCCESS,
          payload: {
            rexfund:data[0]
          }
        });
      
    }).catch((err) => dispatch({
      type: types.SYSTEM_REX_GETREX_FAILURE,
      payload: { err },
    }));
  };
}

export function getRexPool() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_REX_GETREXPOOL_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rexpool',
      limit: 1
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const data = rows
        .map((pool) => {
          const {
            version,
            total_lent,
            total_unlent,
            total_rent,
            total_lendable,
            total_rex,
            namebid_proceeds,
            loan_num
          } = pool;
          return {
            version,
            total_lent,
            total_unlent,
            total_rent,
            total_lendable,
            total_rex,
            namebid_proceeds,
            loan_num
          };
        });

        return dispatch({
          type: types.SYSTEM_REX_GETREXPOOL_SUCCESS,
          payload: {
            rexpool:data[0]
          }
        });
    }).catch((err) => dispatch({
      type: types.SYSTEM_REX_GETREXPOOL_FAILURE,
      payload: { err },
    }));
  };
}

export function getRexBalance() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_REX_GETREXBAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rexbal',
      lower_bound: isNaN(account) ? account : ' ' + account,
      limit: 1
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const data = rows
        .filter((record) => (record.owner == account))
        .map((record) => {
          const {
            version,
            owner,
            vote_stake,
            rex_balance,
            matured_rex,
            rex_maturities
          } = record;
          return {
            version,
            owner,
            vote_stake,
            rex_balance,
            matured_rex,
            rex_maturities
          };
        });
        
        return dispatch({
          type: types.SYSTEM_REX_GETREXBAL_SUCCESS,
          payload: {
            rexbal:data[0]
          }
        });
    }).catch((err) => dispatch({
      type: types.SYSTEM_REX_GETREXBAL_FAILURE,
      payload: { err },
    }));
  };
}

export function getCPULoans(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_REX_GETCPULOAN_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'cpuloan',
      limit: 1000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].loan_num;
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
        // recurse
        return dispatch(getCPULoans(rows));
      }
      return dispatch({
        type: types.SYSTEM_REX_GETCPULOAN_SUCCESS,
        payload: {
          cpuloans:rows
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_REX_GETCPULOAN_FAILURE,
      payload: { err },
    }));
  };
}

export function getNETLoans(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_REX_GETNETLOAN_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'netloan',
      limit: 1000
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].loan_num;
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
        // recurse
        return dispatch(getNETLoans(rows));
      }
      return dispatch({
        type: types.SYSTEM_REX_GETNETLOAN_SUCCESS,
        payload: {
          netloans:rows
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_REX_GETNETLOAN_FAILURE,
      payload: { err },
    }));
  };
}

export function getREXOrders(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_REX_GETREXORDER_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rexqueue',
      limit: 1000
    };
    if (previous) {
      const owner = previous[previous.length - 1].owner;
      query.lower_bound =  isNaN(owner) ? owner : ' ' + owner;
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
        // recurse
        return dispatch(getREXOrders(rows));
      }
      return dispatch({
        type: types.SYSTEM_REX_GETREXORDER_SUCCESS,
        payload: {
          rexqueue:rows
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_REX_GETREXORDER_FAILURE,
      payload: { err },
    }));
  };
}

export function bancorConvert ($conin, $conout, $in) {
  const $F0 = parseFloat($conin);
  const $T0 = parseFloat($conout);
  const $I = parseFloat($in);

  let $out = (($I * $T0) / ($I + $F0));

  if ($out < 0)
      $out = 0;

  $conin += $in;
  $conout -= $out;

  return $out;
}

export default {
  bancorConvert,
  buyrex,
  closerex,
  cnclrexorder,
  consolidate,
  defcpuloan,
  defnetloan,
  deposit,
  fundcpuloan,
  fundnetloan,
  getCPULoans,
  getNETLoans,
  getRexBalance,
  getRexFund,
  getRexPool,
  getREXOrders,
  mvfromsavings,
  mvtosavings,
  rentcpu,
  rentnet,
  sellrex,
  unstaketorex,
  updaterex,
  withdraw
};
