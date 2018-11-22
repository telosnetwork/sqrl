import * as types from './wapii.types';

export default function wapii(state = {}, action) {
  switch (action.type) {
    case types.WAPII_SAVE_PERMISSIONS: {
      return Object.assign({}, state, {
        permissions: action.payload
      });
    }
    case types.WAPII_SAVE_AUTHORIZED_APPS: {
      return Object.assign({}, state, {
        authorizedApps: action.payload
      });
    }
    case types.WAPII_SAVE_ACCOUNTS: {
      return Object.assign({}, state, {
        accounts: action.payload
      });
    }
    case types.WAPII_UPDATE_IDENTITY: {
      return Object.assign({}, state, {
        identity: action.payload
      });
    }
    case types.WAPII_SAVE_QUEUE_INFO:{
      return Object.assign({}, state, {
        queueInfo: action.payload
      });
    }
    default: {
      return state;
    }
  }
}
