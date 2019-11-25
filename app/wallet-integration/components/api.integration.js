import React, { Component } from 'react';
import * as Actions from '../API/models/api/ApiActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthorizedApp from '../API/models/AuthorizedApp';
import ApiService from '../API/services/ApiService';
import Identity from '../API/models/Identity';
import { IdentityRequiredFields } from '../API/models/Identity';
import {Blockchains} from '../API/models/Blockchains';
import APIUtils from '../API/util/APIUtils';
import eos from '../../shared/actions/helpers/eos';// ./helpers/eos';

import { I18n } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Menu, Message, Modal } from 'semantic-ui-react';
import Prompt from './modals/Prompt';
import Permission from '../API/models/Permission';

import * as WAPII_ACCOUNT_ACTIONS from "../actions/accounts";
import * as WAPII_AUTH_APPS_ACTIONS from "../actions/authorizedApps";
import * as WAPII_IDENTITY_ACTIONS from "../actions/identity";
import * as WAPII_KEYPROVIDER_ACTIONS from "../actions/keyProvider";
import * as WAPII_PERMISSIONS_ACTIONS from "../actions/permissions";
import { useWallet } from "../../shared/actions/wallets";

import PopupService from '../API/services/PopupService';
import SocketService from '../API/services/SocketService';
import Hasher from '../API/util/Hasher';
import IdGenerator from '../API/util/IdGenerator';

let rekeyPromise;
let io = null;

class APIIntegration extends Component<Props> {
  props:{
    keys:{
      account: false
    },
    wallets:[]
  };

  popupPromise = null;

  constructor(props) {
    super(props);
    this.state = {
      keyProviderObfuscated: {},
      open:false
    };

    if(this.props){
      let identity;
      
      if(!this.props.wapii || !this.props.wapii.identity){
        identity = Identity.placeholder();
        identity.initialize(Hasher.unsaltedQuickHash(IdGenerator.text(32)))
          .then(()=>{
            this.props.actions.updateIdentity(identity);
          }, (err) => console.error(err))
          .catch((err) => console.error(err));
      }

      //if(this.props.wallets){
      if(this.props.account){
        this._extractAccounts(this.props).then((accounts)=>{
          if(!this.props.wapii || !this.props.wapii.accounts){
            this.props.actions.updateAccounts(accounts);
          }
        });
      }
      
    }
  }

  onClose = (data) => {
    this.popupPromise.reject(data);
    this.popupPromise = null;
    this.setState({ open: false })
  };
  onSubmit = (data) => {
    this.popupPromise.resolve(data);
    this.popupPromise = null;
    this.setState({ open: false })
  };
  onOpen = (popupData) =>{
    if(this.popupPromise){
      console.error(" POPUP ALREADY OPEN BRO ! BUG ??? ");
    }
    this.setState({ open: true, popupData });
    return new Promise((resolve, reject) => this.popupPromise = {resolve,reject});
  } 

  render() {
    const {
      open,
      popupData
    } = this.state;
    const {
      actions,
      wapii
    } = this.props;
    const {
      queueInfo
    } = wapii;
    return ( 
      <I18n ns="wallet">
        {
          (t) => (
            <Prompt
              actions={actions}
              onClose={this.onClose}
              onSubmit={this.onSubmit}
              open={open}
              data={popupData}
              queueInfo={queueInfo}
            />
          )
        }
      </I18n>
    );
  }

  componentDidMount(){
    PopupService.connect( this.onOpen, this.props.actions );
    SocketService.initialize(this.props.actions);
    APIUtils.plugin.setBlockchain(this.props.blockchain);
  }

  componentWillUnmount(){
    SocketService.close();
  }

  async _extractAccounts(props){
    const accs = [];
    // for users who do not save their wallets locally, 'wallets'
    // will be empty. so let's construct a wallet for them
    let wallets = props.wallets;
    if (!wallets || wallets.length == 0) {
      if (props.keys && props.keys.account == props.account) {
        wallets = [{
          account: props.account,
          pubkey: props.keys.pubkey
        }]; 
      }
    }
    for(let i = 0; i < wallets.length; i++){
      let account = props.accounts[wallets[i].account];
      if (!account) {
        try{
          account = await eos(props.connection).getAccount(wallets[i].account);
        }catch(err){
          console.error(err);
          return accs;
        }
      }
      if(account){
        for(let j = 0; j < account.permissions.length; j++){
          accs.push({
            publicKey: wallets[i].pubkey,
            name: wallets[i].account,
            authority: account.permissions[j].perm_name
          });
        }
      } 
    }

    return accs;
  }

  componentWillReceiveProps(nextProps) {
    this._extractAccounts(nextProps).then((accounts)=>{
      if( (this.props.wapii.accounts || []).length !== accounts.length ){
        this.props.actions.updateAccounts(accounts);
      }
    })
    APIUtils.plugin.setBlockchain(nextProps.blockchain);
  } 
}

const mapStateToProps = (state) => {
  return {
    account: state.settings.account,
    keys: state.keys,
    wallets: state.wallets,
    wapii: state.wapii,
    blockchain: state.settings.blockchain,
    settings: state.settings,
    accounts: state.accounts,
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WAPII_ACCOUNT_ACTIONS,
      ...WAPII_AUTH_APPS_ACTIONS,
      ...WAPII_IDENTITY_ACTIONS,
      ...WAPII_KEYPROVIDER_ACTIONS,
      ...WAPII_PERMISSIONS_ACTIONS,
      useWallet
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(APIIntegration);
