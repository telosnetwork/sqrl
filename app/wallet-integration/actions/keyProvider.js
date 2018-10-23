import * as types from '../wapii.types';

export function getKeyProvider(){
    return (dispatch: () => void, getState) => {
        return getState().connection.keyProviderObfuscated;
    }
}
