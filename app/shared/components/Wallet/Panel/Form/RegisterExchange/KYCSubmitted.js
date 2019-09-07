// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Icon, Header, List, Segment, Message } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';

class WalletPanelFormRegisterExchangeKYCSubmitted extends Component<Props> {
  onResubmit = () => this.props.onResubmit()
  render() {
    const {
      globals,
      kycSubmitted,
      settings,
      t
    } = this.props;

    let contact = globals.exchangecontact && globals.exchangecontact.data;
    let allowResubmit = false;
    let kycStatus = '';

    if (contact) {
      allowResubmit = contact.kycPassOnfido == '3' || contact.kycPassOnfido == '0';
      kycStatus = 
        contact.kycPassOnfido=='5'?"Blocked":
        contact.kycPassOnfido=='4'?"Resubmitted - Pending":
        contact.kycPassOnfido=='3'?"Application Error - Resubmit":
        contact.kycPassOnfido=='2'?"Verified":
        contact.kycPassOnfido=='1'?"Submitted - Pending":"Not Submitted";

      if (contact.kycPassOnfido == '0' && kycSubmitted) {
        kycStatus = "Submitted - Pending";
      }
    } else {
      contact = {
        kycPassOnfido: 0,
        id:'',
        emailAddress: '',
        publicKey: '',
        weeklyMax: '',
        defaultCurrency: 'usd',
        remainingWeeklyLimit: '',
        onfidoId: ''
      }
    }

    return (
      <Form
      onSubmit={this.onResubmit}>
        <Header as='h3' textAlign='center'>
          <Header.Content>{t('wallet_registercarbon_request_step_4_header')} {kycStatus}</Header.Content>
        </Header>

        <Message info>
          <Message.Header>Status: {kycStatus}</Message.Header>
        </Message>

        <Message info>
          <Message.Header>KYC Verification Submitted</Message.Header>
          <p>
          Thank you for registering to increase your account limits by completing the KYC/AML verification with 
          Carbon.Money.
          </p>
          {(contact.kycPassOnfido=='2') ?
          <div>
          <p>
            Your application for KYC verifiation has been approved.
          </p>
          <p>
            Welcome aboard!
          </p>
          </div>
          :<div><p>
            Depending on the workload, this process may take several days to complete. You will be notified of your 
            application status once an update is available. In the interim, you may continue using your account 
            in an unverified state.
          </p>
          <p>
          Carbon Contact Id: {contact.id}
          </p>
          <p>
          Onfido Id: {contact.onfidoId}
          </p>
          </div>}
        </Message>

        {(contact.kycPassOnfido != '2') ?
        <Container textAlign="center">
          <Form.Button
            color="blue"
            content={t('Resubmit KYC')}
            disabled={!allowResubmit}
          />
        </Container>
        :<Segment>
          <List divided relaxed size='medium'>
              <List.Item>
                <List.Icon name='user' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='p'>{contact.id}</List.Header>
                  <List.Description as='p'>Carbon Contact Id</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='mail' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='p'>{contact.emailAddress}</List.Header>
                  <List.Description as='p'>Email</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='key' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='p'>{contact.publicKey}</List.Header>
                  <List.Description as='p'>Public Key</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="dollar" verticalAlign='middle' />
                <List.Content>
                  <List.Header as='p'>{Decimal(contact.weeklyMax/100).toFixed(2)} {contact.defaultCurrency.toUpperCase()}</List.Header>
                  <List.Description as='p'>Daily Maximum</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="dollar" verticalAlign='middle' />
                <List.Content>
                  <List.Header as='p'>{Decimal(contact.remainingWeeklyLimit/100).toFixed(2)} {contact.defaultCurrency.toUpperCase()}</List.Header>
                  <List.Description as='p'>Remaining Daily Limit</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="mail" verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>support@carbon.money</List.Header>
                  <List.Description as='p'><strong>Carbon Support</strong></List.Description>
                </List.Content>
              </List.Item>
          </List>
        </Segment>}
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeKYCSubmitted);