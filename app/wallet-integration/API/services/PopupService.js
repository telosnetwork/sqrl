import * as Actions from '../models/api/ApiActions';

export class PopupService {
    openPopup = null;
    queue = [];
    currentPopup = null;
    
    connect(openPopup, actions){
        this.openPopup = openPopup;
        this.actions = actions;
    }

    next = (data) => {
        this.currentPopup = this.queue.shift(); 
        if(this.currentPopup){
            this.open();
        }
    }

    popup = (popupRequest, cb) => {
        if(typeof cb !== "function"){
            console.error("cb needs to be a function!");
            return null;
        }

        let popupData = {
            info: {
                type: popupRequest.type
            },
            cb
        };
        
        let returnData = null;

        switch(popupRequest.type){
            case Actions.GET_OR_REQUEST_IDENTITY:{
                popupData.info.message = "DO YOU WANNA GIVE IDENTITY BRO ?";
                popupData.info.selectAccount = this.actions.getAccounts();
                popupData.getResult = (response) => {
                    return this.actions.getPromptIdentity(response);
                }
            }break;

            case Actions.REQUEST_SIGNATURE:{
                popupData.info.message = "DO YOU WANNA SIGN BRO ?";
                popupData.getResult = (reponse) => {
                    return {
                        whitelists:[]
                    }
                }
            }break;

            case 'repair':
            default:{
                popupData.info.message = "DO YOU WANNA PAIR BRO ?";
                popupData.getResult = (response) => true;
            }break;
        }

        if(!this.currentPopup){
            this.currentPopup = popupData;
            this.open();
        }else{
            this.queue.push(popupData);
        }
    }

    open = () => {
        this.openPopup(this.currentPopup.info)
            .then(
                (data) => this.currentPopup.cb(this.currentPopup.getResult(data)),
                (data) => this.currentPopup.cb(null)
            )
            .finally(this.next)
    }
}

export default new PopupService()