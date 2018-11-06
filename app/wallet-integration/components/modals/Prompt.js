// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Message, Modal, Checkbox } from 'semantic-ui-react';
import ReactJson from 'react-json-view';
import WalletModalUnlock from '../../../shared/components/Wallet/Modal/Unlock';
import * as Actions from  '../../API/models/api/ApiActions';
import { debounce } from 'lodash';

export default class Prompt extends Component<Props> {
  state = {
    whitelists: [],
    password: '',
    account: {authorityName:''},
    error: '',
    loading: false
  }

  resetState = ()=>{
    this.setState({
      whitelists: [],
      password: '',
      account: {authorityName:''},
      error: '',
      loading: false
    });
  }

  onChange = debounce((e, { value }) => {
      this.setState({ password: value })  
    }, 150);
   // (e, { value }) => this.setState({ password: value })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      debounce(() => {
        this.onSubmit();
      }, 200)();
    }
  }

  onSubmit = () => {
    this.state.loading = true;
    const result = Object.assign({}, this.state);
    if(this.props.data && this.props.data.transformResult){
      this.props.data.transformResult(result).then(
        (newResult)=>{
          this.resetState();
          this.props.onSubmit(newResult);
        },
        (rejectReason)=>{
          this.setState({error: rejectReason.message});
        }).catch(err=>{
          console.error(err);
          this.setState({error: err.message});
        });
    }else{
      this.resetState();
      this.props.onSubmit(result);
    }
  }
  onClose = () => {
    const result = Object.assign({}, this.state);
    this.resetState();
    this.props.onClose(result);
  }

  chooseAccount = (account) => {
    this.setState({account});
  }

  extractModalInfo = (data) => {
    const result = {
      request: data || {},
      displayMessage: '',
      headerMessage: '',
      listAccounts: [],
      messages: '',
      unlock: '',
      okButtonMessage: 'wapii_prompt_ok',
      disableOK: false,
      size: 'large' //'fullscreen' | 'large' | 'mini' | 'small' | 'tiny'
    }
    const {
      actions
    } = this.props;

    const request = result.request;
    const payload = request.payload || {};

    switch(request.type){
      case Actions.GET_OR_REQUEST_IDENTITY:{
        result.disableOK = !this.state.account.authorityName;
        result.listAccounts = actions.getAccounts().map(a => {a.authorityName=a.name+'@'+a.authority; return a;});
        result.displayMessage = 'wapii_prompt_message_identity';
        result.headerMessage = 'wapii_prompt_header_identity';
        payload.messages = {
          "app": payload.origin,
          "with key": request.appkey,
          "using network": payload.fields.accounts.map((a) => { return {
            blockchain: a.blockchain,
            chainId: a.chainId
          }})
        };
      }break;
      case Actions.REQUEST_SIGNATURE:{
        result.headerMessage = 'wapii_prompt_header_sign';
      }break;
      case Actions.UNLOCK_ACCESS:{
        result.okButtonMessage = 'wapii_prompt_ok_unlock';
        result.headerMessage = 'wapii_prompt_header_unlock';
        result.displayMessage = 'wapii_prompt_message_unlock';
        result.unlock = 
                <React.Fragment>
                  <Form.Field
                    autoFocus
                    control={Input}
                    fluid
                    label={"Password to unlock "+payload.wallet.account}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    type="password"
                  />
                  
                  <Checkbox
                    label="Change to this wallet"
                    checked={this.state.changeWallet}
                    onChange={() => this.setState({changeWallet: !this.state.changeWallet})}
                  />
                </React.Fragment>
      }break;
      case Actions.REPAIR:{
        result.headerMessage = 'wapii_prompt_header_pair';
        payload.messages = {
          "app": payload.origin || payload.data.origin,
          // "nonce": request.nonce,
          "with appkey": request.appkey 
        };
        if(payload.fields && payload.fields.accounts){
          payload.message["requires account for network"] = payload.fields.accounts.map((a) => { return {
            blockchain: a.blockchain,
            chainId: a.chainId
          }});
        }
      }break;
    }

    if( payload.messages ){
      result.messages = (<React.Fragment> 
        <h4>Details</h4> 
        <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={payload.messages}
            style={{ padding: '1em' }}
            theme="harmonic"
        />
        </React.Fragment>
      );
    }

    return result;
  }

  render() {
    const {
      actions,
      onSubmit,
      onClose,
      open,
      data
      // settings
      // trigger
      // validate
    } = this.props;

    if(!open){
      return null;
    }

    const info = this.extractModalInfo(data);
    const {
      headerMessage,
      displayMessage,
      listAccounts,
      messages,
      unlock,
      okButtonMessage,
      disableOK,
      size
    } = info;

    let{
      error,
      loading
    } = this.state;

    if(error){
      loading = false;
      error = <Message
        content={error}
        error
        header={error}
        icon="warning circle"
      />;
    }

    return (
      <I18n ns="wapii">
        {
          (t) => (
            <Modal
              centered={false}
              // trigger={trigger}
              onClose={this.onClose}
              open={open}
              size={size}
            >
              <Header icon="unlock" content={t(headerMessage)} />
              <Modal.Content>
                <h3>{t(displayMessage)}</h3>

                {listAccounts.map((item, index) => (
                  <Button onClick={ ()=>{this.chooseAccount(item)} } key={index} primary={this.state.account.authorityName === item.authorityName} > {item.authorityName} </Button>)
                )}

                {messages}

                {unlock}
                
                {error}

              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button
                  color="green"
                  content={t(okButtonMessage)}
                  icon="unlock"
                  loading={loading}
                  onClick={this.onSubmit}
                  disabled={disableOK || loading}
                />
              </Modal.Actions>
            </Modal>
          )
        }
      </I18n>
    );
  }
}
