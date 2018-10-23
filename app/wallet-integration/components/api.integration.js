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

import { I18n } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Menu, Message, Modal } from 'semantic-ui-react';
import Prompt from './modals/Prompt';
import Permission from '../API/models/Permission';

import * as WAPII_ACCOUNT_ACTIONS from "../actions/accounts";
import * as WAPII_AUTH_APPS_ACTIONS from "../actions/authorizedApps";
import * as WAPII_IDENTITY_ACTIONS from "../actions/identity";
import * as WAPII_KEYPROVIDER_ACTIONS from "../actions/keyProvider";
import * as WAPII_PERMISSIONS_ACTIONS from "../actions/permissions";

import PopupService from '../API/services/PopupService';
import SocketService from '../API/services/SocketService';

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
    return ( 
      <I18n ns="wallet">
        {
          (t) => (
            <Prompt
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              onClose={this.onClose}
              onSubmit={this.onSubmit}
              open={open}
              data={popupData}
              validate={this.validate}
            />
          )
        }
      </I18n>
    );
  }

  componentDidMount(){
    PopupService.connect( this.onOpen, this.props.actions );
    SocketService.initialize(this.props.actions);
    
    if(this.props){
      let accounts, identity;
      if(this.props.wallets){
        accounts = this._extractAccounts(this.props);
      }
      if(this.props.keys && this.props.keys.account){
        identity = Identity.placeholder();
        identity.accounts = accounts;
      }
      
      identity = identity || Identity.placeholder;
      accounts = accounts || [];
      
      if(!this.props.wapii || !this.props.wapii.identity){
        this.props.actions.updateIdentity(identity);
      }
      if(!this.props.wapii || !this.props.wapii.accounts){
        this.props.actions.updateAccounts(accounts);
      }
    }
  }

  _extractIdentity(props){
    let key = '';
    for(let i = 0; i < props.wallets.length && !key; i++){
      if(props.wallets[i].account === props.account){
        key = props.wallets[i].pubkey;
      }
    }
    return Identity.fromJson({
      hash: '', // props.keys.hash,
      privateKey: '', // props.keys.key,
      publicKey: '', // props.keys.pubkey || key,
      name: '', // props.account
    });
  }

  _extractAccounts(props){
    const accs = [];
    for(let i = 0; i < props.wallets.length; i++){
      if(props.wallets[i].accountData){
        for(let j = 0; j < props.wallets[i].accountData.permissions.length; j++){
          accs.push({
            publicKey: props.wallets[i].pubkey,
            name: props.wallets[i].account,
            authority: props.wallets[i].accountData.permissions[j].perm_name
          });
        }
      }
    }
    return accs;
  }

  componentWillReceiveProps(nextProps) {
    console.log("INTEGRATION NEXT PROPS", this.props, nextProps);
    
    // extract identity and accounts
    const accounts = this._extractAccounts(nextProps);
    if( (this.props.wapii.accounts || []).length !== accounts.length ){
      this.props.actions.updateAccounts(accounts);
    }
    // if( nextProps.keys.account != this.props.keys.account ){
    //   const identity = this._extractIdentity(nextProps, accounts);
    //   this.props.actions.updateIdentity(identity);
    // }
    
    // if(nextProps.keyProviderObfuscated){
    //   this.setState({keyProviderObfuscated: nextProps.keyProviderObfuscated});
    // }

    // if(nextProps.keyProviderObfuscated && nextProps.keyProviderObfuscated.key){
    //   this.setState({open: false});
    // }else{
    //   this.setState({open: true});
    // }
    
    // const {
    //   actions
    // } = this.props;
    // const {
    //   getConnection
    // } = actions;
    // getConnection();
  } 
}

function mapStateToProps(state) {
  console.log(state);
  return {
    account: state.settings.account,
    keys: state.keys,
    wallets: state.wallets,
    wapii: state.wapii
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WAPII_ACCOUNT_ACTIONS,
      ...WAPII_AUTH_APPS_ACTIONS,
      ...WAPII_IDENTITY_ACTIONS,
      ...WAPII_KEYPROVIDER_ACTIONS,
      ...WAPII_PERMISSIONS_ACTIONS
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(APIIntegration);
