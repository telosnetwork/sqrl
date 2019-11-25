// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Form, Grid, Message, Header } from 'semantic-ui-react';

import FormMessageError from '../../../../Global/Form/Message/Error';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';

class WalletPanelFormRegisterExchangeAccount extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      globals,
      onBack,
      onChange,
      pubkey,
      settings,
      t,
      values
    } = this.props;

    let error;
    if (globals.exchangecontact && globals.exchangecontact.code == 409) {
      error = 'registercarbon_email_exists';
    }

    let registered = false;
    let registerButtonText = "Register";
    let registeredMessage = "Your public key has been successfully registered in Carbon.Money as ";

    if (globals.exchangecontact && globals.exchangecontact.contactId) {
        registered = true;
        registerButtonText = "Continue";
        registeredMessage += " Carbon Id: " + globals.exchangecontact.contactId;
        values.emailAddress = globals.exchangecontact.data && globals.exchangecontact.data.emailAddress;
      }
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_registercarbon_request_step_2_header')}
          <Header.Subheader>
            {(!registered ?
              <div>
                <p>
                Creating an account in Carbon is a very simple process. We will use the <strong>public key</strong> 
                &nbsp; currently assigned to this {settings.blockchain.tokenSymbol} account to get you started. 
                </p>
                
                <p>
                  If you would like to receive email notifications of your exchange activity, you can also enter 
                  an optional email address in the field below.
                </p>
              </div>
            :  <p>
            Great - you have an account in Carbon.Money that will allow you to trade {settings.blockchain.tokenSymbol} 
            at any time. Your account information is shown below. 
            </p>)}
          </Header.Subheader>
        </Header>

        <Message
          content={pubkey}
          info>
        </Message>

        {(registered ? 
          <Message
            content={registeredMessage}
            info>
          </Message>
        :'')}
        
        <GlobalFormFieldGeneric
          label="Notification Email Address (optional):"
          name="emailAddress"
          disabled={registered}
          onChange={onChange}
          value={values.emailAddress} 
        />

        <FormMessageError
          error={error}
          icon="warning sign"
          style={{ margin: '1em 0' }}
        />

        <Message
          content={t('wallet_registercarbon_request_step_2_privacy')}
          icon="info circle"
          info
        />

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Form.Button
                content={t('back')}
                onClick={onBack}
                size="small"
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Form.Button
                color="blue"
                content={registerButtonText}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeAccount);
