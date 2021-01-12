import * as types from '../types';

import eos from '../helpers/eos';
import { payforcpunet } from '../helpers/eos';

export function regproducer(producerKey, producerUrl, producerLocation = 0) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_REGPRODUCER_PENDING
    });
    
    let actions = [
      {
        account: 'eosio',
        name: 'regproducer',
        authorization: [{
          actor: account,
          permission: settings.authorization || 'active'
        }],
        data: {
          producer: account,
          producer_key: producerKey,
          url: producerUrl,
          location: 0
        }
      }
    ];

    const payforaction = payforcpunet(account, getState());
    if (payforaction) actions = payforaction.concat(actions);

    return eos(connection, true, payforaction!==null).transaction({
      actions
    }).then((tx) => dispatch({
      payload: { tx, producers },
      type: types.SYSTEM_REGPRODUCER_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REGPRODUCER_FAILURE
    }));
  };
}

export default {
  regproducer
};
