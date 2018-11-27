import * as types from '../wapii.types';
import APIUtils from "../API/util/APIUtils";

export function updateOrPushApp(app) {
    return (dispatch: () => void, getState) => {
        let _apps = APIUtils.mapAuthorizedApps(getState().wapii.authorizedApps);
        const idx = _apps.findIndex(x => x.origin === app.origin);
        if(idx > -1){
            _apps[idx] = app;
        }else{
            _apps.unshift(app);
        }

        dispatch({
            type: types.WAPII_SAVE_AUTHORIZED_APPS,
            payload: _apps
        });
    };
}

export function removeApp(app){
    return (dispatch: () => void, getState) => {
        let _apps = APIUtils.mapAuthorizedApps(getState().wapii.authorizedApps);
        const idx = _apps.findIndex(x => x.origin === app.origin);
        if(idx > -1){
            _apps.splice(idx, 1);
        }

        dispatch({
            type: types.WAPII_SAVE_AUTHORIZED_APPS,
            payload: _apps
        });
    };
}

export function removeApps(){
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.WAPII_SAVE_AUTHORIZED_APPS,
            payload: []
        });
        dispatch({
            type: types.WAPII_SAVE_PERMISSIONS,
            payload: []
        });
    };
}

export function findApp(origin) {
    return (dispatch: () => void, getState) => {
        return APIUtils.findApp(APIUtils.mapAuthorizedApps(getState().wapii.authorizedApps), origin);
    };
}
