import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Message, Modal, Icon } from 'semantic-ui-react';
import WalletModalUnlock from '../../../shared/components/Wallet/Modal/Unlock';
import * as Actions from  '../../API/models/api/ApiActions';
import { debounce } from 'lodash';
import UnlockAccessPrompt from './UnlockAccessPrompt';
import RequestSignaturePrompt from './RequestSignaturePrompt';
import GetIdentityPrompt from './GetIdentityPrompt';
import RePairPrompt from './RePairPrompt';
import ArbitrarySignature from './ArbitrarySignature';

export default class Prompt extends Component<Props> {
  state = {
    whitelists: [],
    password: '',
    account: {authorityName:''},
    error: '',
    loading: false,
    closeAll: false
  }

  resetState = ()=>{
    this.setState({
      whitelists: [],
      password: '',
      account: {authorityName:''},
      error: '',
      loading: false,
      closeAll: false
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
  closeAll = () => {
    this.state.closeAll = true;
    this.onClose();
  }

  chooseAccount = (account) => {
    this.setState({account});
  }

  toggleChangeWallet = () => {
    this.setState({changeWallet: !this.state.changeWallet});
  }

  extractModalInfo = (data, error) => {
    const result = {
      request: data || {},
      payload: {},
      okButtonMessage: 'wapii_prompt_ok',
      disableOK: false,
      modalContent: null,
      size: 'large' //'fullscreen' | 'large' | 'mini' | 'small' | 'tiny'
    }

    const request = result.request;
    const payload = request.payload || {};
    result.payload = payload;

    switch(request.type){
      case Actions.GET_OR_REQUEST_IDENTITY:{
        result.disableOK = !this.state.account.authorityName;
        result.modalContent = <GetIdentityPrompt
          error={error}
          request={request}
          payload={payload}
          account={this.state.account}
          chooseAccount={this.chooseAccount}
        />
      }break;

      case Actions.REQUEST_SIGNATURE:{
        result.modalContent = <RequestSignaturePrompt
          error={error}
          request={request}
          payload={payload}
        />
      }break;
      
      case Actions.UNLOCK_ACCESS:{
        result.okButtonMessage = 'wapii_prompt_ok_unlock';
        
        result.modalContent = <UnlockAccessPrompt
          error={error}
          request={request}
          payload={payload}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          changeWallet={this.state.changeWallet}
          toggleChangeWallet={this.toggleChangeWallet}
        />
      }break;

      case Actions.REPAIR:{
        result.modalContent = <RePairPrompt
          error={error}
          request={request}
          payload={payload}
        />
      }break;

      case Actions.REQUEST_ARBITRARY_SIGNATURE:{
        result.modalContent = <ArbitrarySignature
          error={error}
          request={request}
          payload={payload}
        />
      }
    }

    return result;
  }

  render() {
    const {
      actions,
      onSubmit,
      onClose,
      open,
      data,
      queueInfo
    } = this.props;

    if(!open){
      return null;
    }

    let{
      error,
      loading,
      account
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

    const info = this.extractModalInfo(data, error);
    const {
      okButtonMessage,
      disableOK,
      size,
      modalContent
    } = info;

    return (
      <I18n ns="wapii">
        {
          (t) => (
            <Modal
              centered={false}
              onClose={this.onClose}
              open={open}
              size={size}
            >
              {modalContent}

              <Modal.Actions>
                { queueInfo.size > 1 &&
                  "Queue: 1 of " + queueInfo.size
                }{queueInfo.size > 1 &&
                  <Button
                      onClick={this.closeAll}
                  >
                      <Icon name="x" /> {t('cancel_all')}
                  </Button>
                }
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
