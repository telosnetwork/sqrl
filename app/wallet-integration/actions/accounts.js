import * as types from '../wapii.types';

export function updateAccounts(accounts) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.WAPII_SAVE_ACCOUNTS,
            payload: accounts
        });
    };
}

export function getAccounts(){
    return (dispatch: () => void, getState) => {
        const currentWallet = getState().settings.account;
        return getState().wapii.accounts.filter(x => x.name === currentWallet);
    }
}
