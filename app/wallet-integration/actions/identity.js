import * as types from '../wapii.types';
import APIUtils from "../API/util/APIUtils";
import { IdentityRequiredFields } from "../API/models/Identity";

export function updateIdentity(indentity) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.WAPII_UPDATE_IDENTITY,
            payload: indentity
        });
    };
}

export function identityFromPermissions(origin, formatForResult = true){
    return (dispatch: () => void, getState) => {
        const permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        const possibleId = permissions.find(x => x.isIdentityPermissionFor(origin));
        if(possibleId){
            let identityRequirements = IdentityRequiredFields.fromPermission(possibleId.identityRequirements);
            let identity = APIUtils.getIdentity([APIUtils.mapIdentity(getState().wapii.identity)], possibleId.identity);
            if(!identity) return null;
            if(formatForResult){
                identity = identity.asOnlyRequiredFields(identityRequirements);
            }
            identity.accounts = APIUtils.getAccounts(getState().wapii.accounts, possibleId.accounts).map(x => formatForResult ? APIUtils.plugin.returnableAccount(x) : x);
            if(identity.accounts.length == 0) return null;
            return identity;
        }
        return null;
    };
}

export function findIdentity(publicKey) {
    return (dispatch: () => void, getState) => {
        return APIUtils.findIdentity([APIUtils.mapIdentity(getState().wapii.identity)], publicKey);
    };
}

export function getPromptIdentity(account){
    return (dispatch: () => void, getState) => {
        return {
            identity: APIUtils.mapIdentity(getState().wapii.identity),
            accounts: [account]
        };
    }
}