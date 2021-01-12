import * as types from '../wapii.types';
import { IdentityRequiredFields } from "../API/models/Identity";
import APIUtils from "../API/util/APIUtils";
import Permission from "../API/models/Permission";

export function addIdentityOriginPermission(identity, accounts, identityRequirements, origin){
    return (dispatch: () => void, getState) => {
        identityRequirements = IdentityRequiredFields.fromJson(identityRequirements);
        identityRequirements = identityRequirements.forPermission();
        
        // Permission already exists
        let permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        if(permissions.find(x => x.isIdentity && x.origin === origin && x.identity === identity.publicKey)) return;
        
        const permission = Permission.fromAction(origin, identity, accounts, {
            identityRequirements,
            isIdentity:true
        });
        permissions.push(permission);
        
        dispatch({
            type: types.WAPII_SAVE_PERMISSIONS,
            payload: permissions
        });
    };
}

export function addIdentityRequirementsPermission(origin, identity, identityRequirements){
    return (dispatch: () => void, getState) => {
        identityRequirements = IdentityRequiredFields.fromJson(identityRequirements);

        // No need for a permission.
        if(identityRequirements.isEmpty()) return;

        identityRequirements = identityRequirements.forPermission();

        const permission = Permission.fromJson({
            origin, identity:identity.publicKey, identityRequirements, isIdentityRequirements:true
        });

        // Don't duplicate requirements.
        let permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        if(permissions.find(x => x.checksum() === permission.checksum())) return;

        permissions.push(permission);
        dispatch({
            type: types.WAPII_SAVE_PERMISSIONS,
            payload: permissions
        });
    }
}

function createActionPermission(origin, identity, accounts, whitelistData){

    const immutableActionFields = Permission.createImmutableFieldsHash(whitelistData.fields, whitelistData.props);

    const permission = Permission.fromAction(origin, identity, accounts, {
        contract:whitelistData.code,
        contractHash:whitelistData.hash || null,
        action:whitelistData.type,
        immutableActionFields,
        mutableActionFields:whitelistData.props,
        timestamp:+new Date(),
        isContractAction:true
    });

    return permission;
}

export function addActionPermissions(origin, identity, accounts, whitelists){
    return (dispatch: () => void, getState) => {
        if(!whitelists || !whitelists.length) return;

        const permissions = whitelists.map(whitelist =>
            createActionPermission(origin, identity, accounts, whitelist)
        ).filter(x => x);

        if(permissions.length){
            let savedPermissions = APIUtils.mapPermissions(getState().wapii.permissions);

            permissions.map(perm => {
                // Removing all similar permissions for this action
                const similar = savedPermissions.filter(x =>
                    x.origin === origin
                    && x.isContractAction
                    && x.contract === perm.contract
                    && x.action === perm.action
                ).map(x => x.id);

                savedPermissions = savedPermissions.filter(x => !similar.includes(x.id));
                savedPermissions.push(perm)
            });

            dispatch({
                type: types.WAPII_SAVE_PERMISSIONS,
                payload: permissions
            });
        }
    }
}

export function hasActionPermission(origin, identity, accounts, message){
    return (dispatch: () => void, getState) => {

        const contract = message.code;
        const action = message.type;
        const contractHash = null;

        const permission = Permission.fromAction(origin, identity, accounts, {
            contract,
            contractHash,
            action,
            isContractAction:true
        });

        const permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        const matchingPermissions = permissions.filter(x => x.checksum() === permission.checksum());

        if(!matchingPermissions.length) return false;

        return matchingPermissions.some(perm => {
            const immutableActionFields = Permission.createImmutableFieldsHash(message.data, perm.mutableActionFields);
            return perm.immutableActionFields === immutableActionFields;
        });
    };
}

export function isWhitelistedTransaction(origin, identity, accounts, messages, requiredFields){
    return (dispatch: () => void, getState) => {
        requiredFields = IdentityRequiredFields.fromJson(requiredFields);

        // Checking for permissions
        const whitelistedActions = messages.every(message => {return hasActionPermission(origin, identity, accounts, message)(dispatch, getState);});

        // Not all actions are whitelisted
        if(!whitelistedActions) return false;

        // Dont need to check for required fields
        if(requiredFields.isEmpty()) return true;

        return hasIdentityRequirementsPermission(origin, identity, requiredFields)(dispatch, getState);
    }
}

export function hasIdentityRequirementsPermission(origin, identity, identityRequirements){
    return (dispatch: () => void, getState) => {
        identityRequirements = IdentityRequiredFields.fromJson(identityRequirements);
        identityRequirements = identityRequirements.forPermission();

        const permission = Permission.fromJson({
            origin, identity:identity.publicKey, identityRequirements, isIdentityRequirements:true
        });

        const permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        return permissions.find(x => x.checksum() === permission.checksum());
    }
}

export function removeIdentityPermission(origin){
    return (dispatch: () => void, getState) => {
        let permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        const idPermissions = permissions.find(x => x.isIdentity && x.origin === origin);
        if(!idPermissions) return new Error('already_forgotten', "This identity does not have a permission for "+origin);
        permissions = permissions.filter(x => x.id !== idPermissions.id);
        
        dispatch({
            type: types.WAPII_SAVE_PERMISSIONS,
            payload: permissions
        });
    }
}

export function removePermissionsByOrigin(origin){
    return (dispatch: () => void, getState) => {
        let permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        
        dispatch({
            type: types.WAPII_SAVE_PERMISSIONS,
            payload: permissions.filter(x => x.origin !== origin)
        });
    }
}

export function removePermission(permissionId) {
    return (dispatch: () => void, getState) => {
        let permissions = APIUtils.mapPermissions(getState().wapii.permissions);
        const idPermissions = permissions.find(x => x.id === permissionId);
        if(!idPermissions) return new Error('already_forgotten', "This permission no longer exists!");
        permissions = permissions.filter(x => x.id !== idPermissions.id);
        
        dispatch({
            type: types.WAPII_SAVE_PERMISSIONS,
            payload: permissions
        });
    }
}