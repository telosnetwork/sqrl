// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Icon, Header, Segment, Message } from 'semantic-ui-react';

class WalletPanelFormRegisterExchangeWelcome extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      t
    } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <Header as='h3' icon textAlign='center'>
          <Icon name='exchange' circular />
          <Header.Content>{t('wallet_registercarbon_request_step_1_header')}</Header.Content>
        </Header>

        <Message info>
          <Message.Header>What is Carbon.Money?</Message.Header>
          <p>
          Carbon.Money is the creator of CarbonUSD, the first U.S. dollar-pegged stablecoin for EOSIO-based networks. 
          Features within Carbon allow Sqrl to abstract trading cryptocurrency into an easy-to-use exchange service.
          </p>
          <p>
            In order to take advantage of our exchange features, you must create an account within the Carbon platform. You 
            have the option to use the service with or without KYC/AML verification.
          </p>
          <p>
          Card purchasing limits for non-verified accounts is $250.00 USD per day, while verified accounts can trade up to $2500.00 USD per day. 
          Bank wires for verified accounts have a minimum transaction amount of $100.00 USD with NO deposit or withdrawal limits.
          </p>
          <p>
            Ready to get started? Click the button below to begin!
          </p>
        </Message>
        
        <Container textAlign="center">
          <Form.Button
            color="blue"
            content={t('Get Started')}
          />
        </Container>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeWelcome);
