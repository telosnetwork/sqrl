// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Icon, Header, List, Segment, Message } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';

class WalletPanelFormRegisterExchangeKYCSubmitted extends Component<Props> {
  onResubmit = () => this.props.onResubmit()
  onOffRampKYCResubmit = () => this.props.onOffRampKYCResubmit()
  render() {
    const {
      globals,
      kycSubmitted,
      offrampKycSubmitted,
      settings,
      t
    } = this.props;

    let contact = globals.exchangecontact && globals.exchangecontact.data;
    let contactDetails = globals.exchangecontact && globals.exchangecontact.details;
    let allowResubmit = false;
    let allowResubmitStablecoin = false;
    let kycStatus = '';
    let kycStatusStablecoin = '';

    if (contactDetails){
      allowResubmitStablecoin = contactDetails.kycUpdateStablecoin == true || 
        (contactDetails.kycSentStablecoin == true && contactDetails.kycStatusStablecoin==false);
      kycStatusStablecoin = 
        contactDetails.kycUpdateStablecoin==true?"Application Error - Resubmit":
        contactDetails.kycStatusStablecoin==true?"Verified":
        contactDetails.kycSentStablecoin==true?"Submitted - Pending":"Not Submitted";

      if (contactDetails.kycStatusStablecoin==false && offrampKycSubmitted) {
        kycStatusStablecoin = "Submitted - Pending";
      }
    }
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
        dailyMax: '',
        defaultCurrency: 'usd',
        remainingWeeklyLimit: '',
        onfidoId: ''
      }
    }
    return (
      <Form>
        <Message info>
          <Message.Header>KYC Status for Credit Card Purchases: {kycStatus}</Message.Header>
          <Message.Content>
          {(allowResubmit) ?
            <Form.Button
              color="blue"
              content={t('Apply')}
              onClick={this.onResubmit}
              style={{marginTop:'5px'}}
            />
          :false}
          </Message.Content>
        </Message>
        <Message info>
          <Message.Header>KYC Status for Bank Deposits/Withdrawals: {kycStatusStablecoin}</Message.Header>
          <Message.Content>
            {(allowResubmitStablecoin) ?
            <Form.Button
              color="blue"
              content={t('Apply')}
              onClick={this.onOffRampKYCResubmit}
              style={{marginTop:'5px'}}
            />
          :false}
          </Message.Content>
        </Message>

        <Message info>
          <p>
          Thank you for registering to increase your account limits by completing the KYC/AML verification with 
          Carbon.Money.
          </p>
          {(contact.kycPassOnfido=='2' && contactDetails.kycStatusStablecoin == true) ?
          <div>
          <p>
            Your KYC application for credit card purchases and bank deposits/withdrawals has been approved.
          </p>
          </div>
          :false}
          {(contact.kycPassOnfido=='2' && contactDetails.kycStatusStablecoin == false) ?
          <div>
          <p>
            Your KYC application for credit card purchases have been approved.
          </p>
          </div>
          :false}
          {(contact.kycPassOnfido!='2' && contactDetails.kycStatusStablecoin == true) ?
          <div>
          <p>
            Your KYC application for bank deposits/withdrawals have been approved.
          </p>
          </div>
          :false}
          
          {( (contact.kycPassOnfido == '0' && kycSubmitted) ||
             contactDetails.kycStatusStablecoin==false && offrampKycSubmitted ) ?
          <div><p>
            Depending on the workload, this process may take several days to complete. You will be notified of your 
            application status once an update is available. In the interim, you may continue using your account 
            in an unverified state.
          </p>
          <p>
          Carbon Contact Id: {contact.id}
          </p>
          </div>:false}
      </Message>

      {(contact.kycPassOnfido=='2' || contactDetails.kycStatusStablecoin == true) ?
        <Segment>
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
                  <List.Header as='p'>{Decimal(contact.dailyMax/100).toFixed(2)} {contact.defaultCurrency.toUpperCase()}</List.Header>
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
        </Segment>:false}
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeKYCSubmitted);