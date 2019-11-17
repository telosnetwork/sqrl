// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';
import macaddress from 'macaddress';

const { clipboard } = require('electron');

class WalletPanelModalAccountRequestCode extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      accountCreated: false
    };
  }
  componentWillReceiveProps(nextProps){
    if (nextProps && nextProps.system.CREATEACCOUNT === 'SUCCESS'){
      this.setState({accountCreated: true});
    }
  }
  createAccount = () => {
    const { 
      actions,
      connection,
      settings,
      values 
    } = this.props;
    
    if (settings.freeAccountCreated !== true){
      macaddress.all(function (err, all) {
        const macaddresses = [];
        const map = new Map();
        let keys = Object.keys(all);
        for(let index=0;index<keys.length;index++)
        {
          const mac = all[keys[index]].mac;
          if(!map.has(mac) && mac != '00:00:00:00:00:00'){
            map.set(mac, true);
            macaddresses.push(mac);
          }
        }

        if (macaddresses.length > 0)
          {actions.createFreeAccount(values.accountName, values.owner, values.active, macaddresses, values.referredby);}
      });
    }
  }
  render() {
    const {
      actions,
      onBack,
      t,
      settings,
      system,
      values
    } = this.props;
    const {
      accountCreated
    } = this.state;
    const confirmInfo = {
      account:values.accountName, 
      ownerKey:values.owner, 
      activeKey: values.active
    };
    if (system.CREATEACCOUNT === 'SUCCESS' && settings.account !== values.accountName){
      actions.setSetting('account', values.accountName); // this will pre-pop field when user goes to 'Lookup account' section
    }

    let lastErrorMessage = '';
    if (system.CREATEACCOUNT === 'FAILURE' && system[`CREATEACCOUNT_LAST_ERROR`]) {
      if (system[`CREATEACCOUNT_LAST_ERROR`].error)
        lastErrorMessage = system.CREATEACCOUNT_LAST_ERROR.error.code + ':' + system.CREATEACCOUNT_LAST_ERROR.error.what;
      else if (system.CREATEACCOUNT_LAST_ERROR.message) {
        lastErrorMessage = system.CREATEACCOUNT_LAST_ERROR.message;
      } else {
        lastErrorMessage = system.CREATEACCOUNT_LAST_ERROR;
      }
    }

    return (
      <Segment loading={system.CREATEACCOUNT === 'PENDING'}>
        <Header>
          {t('wallet_account_request_account_header')}
          <Header.Subheader>
            {t('wallet_account_request_account_subheader')}
          </Header.Subheader>
        </Header>
        
        <Segment basic>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={confirmInfo}
            style={{ padding: '1em', fontSize: '8px' }}
            theme="harmonic"
          />
        </Segment>

        <Form>
          <Container textAlign="center">
            <Form.Button
              disabled={accountCreated}
              color="purple"
              content={t('wallet_account_request_form_create_account')}
              onClick={this.createAccount}
            />
          </Container>
        </Form>
        <Divider hidden />
          {(system.CREATEACCOUNT === 'FAILURE')
          ? (
            <Message
              content={t('wallet_account_request_account_failed')}
              icon="info circle"
              warning
            />
          ) : ''}
          {(lastErrorMessage && lastErrorMessage.length > 0)
          ? (
            <Message
              content={lastErrorMessage}
              icon="info circle"
              error
            />
          ) : ''}
          {(system.CREATEACCOUNT === 'SUCCESS')
          ? (
            <Message
              content={t('wallet_account_request_account_succeeded')}
              icon="info circle"
              warning
            />
          ) : ''}
          {(system.CREATEACCOUNT !== 'SUCCESS')
          ? (
          <Button
            content={t('back')}
            onClick={onBack}
            size="small"
          />
          ) : ''
          }
      </Segment>
    );
  }
}

export default translate('wallet')(WalletPanelModalAccountRequestCode);
