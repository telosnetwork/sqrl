import * as types from '../wapii.types';
import { PopupService } from '../API/services/PopupService';
import APIUtils from '../API/util/APIUtils';

export function getKeyProvider(forAccount){
    return (dispatch: () => void, getState) => {
        let keyProvider = getState().keys;
        let locked = !keyProvider || !keyProvider.hash;
        // if( locked || forAccount !== keyProvider.account ){
        //     return null;
        // }
        return keyProvider;
    }
}
