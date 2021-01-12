// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Icon, Header, Segment, Message } from 'semantic-ui-react';

class WalletPanelFormRegisterExchangeAccountRegistered extends Component<Props> {
  onKYCSubmit = () => this.props.onKYCSubmit()
  onCUSDKYCSubmit = () => this.props.onCUSDKYCSubmit()
  render() {
    const {
      globals,
      t
    } = this.props;

    let contact = globals.exchangecontact && globals.exchangecontact.data;
    if (!contact) {
      contact = {id:''}
    }

    return (
      <Form>
        <Header as='h3' icon textAlign='center'>
          <Icon name='user plus' circular />
          <Header.Content>{t('wallet_registercarbon_request_acct_registered_header')}</Header.Content>
        </Header>

        <Message info>
          <Message.Header>You're Good to Go!</Message.Header>
          <p>
          Your account has been successfully registered with Carbon.Money with ID <b>{contact.id}</b>
          </p>
          <p>
            You may now begin purchasing tokens with your debit or credit card, subject to purchase limits of $250.00 USD 
            per day for non-verified accounts. If you'd like to increase this limit to $2500.00 USD per day, please click 
            the <b>KYC for Credit Card Purchases</b> button below to begin.
          </p>
          <p>
          To enable bank deposits and withrawals via ACH or wire transfer with NO account limits, please complete the <b>KYC for 
            Bank Deposits/Withdrawals</b> step below.
          </p>
          <p>
            Welcome aboard!
          </p>
        </Message>
        
        <Container textAlign="center">
          <Form.Button
            color="blue"
            content={t('KYC for Credit Card Purchases')}
            onClick={this.onKYCSubmit}
          />
          <Form.Button
            color="blue"
            content={t('KYC for Bank Deposits/Withdrawals')}
            onClick={this.onCUSDKYCSubmit}
          />
        </Container>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeAccountRegistered);
