// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Grid, Header, Icon, List, Modal, Segment, Step } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';

import WalletPanelFormBuyFiatAmount from '../../Form/BuyFiat/Amount';
import WalletPanelFormBuyFiatAccount from '../../Form/BuyFiat/Account';
import WalletPanelFormBuyFiatPurchase from '../../Form/BuyFiat/Purchase';

class WalletPanelModalBuyFiat extends Component<Props> {
  state = {
    confirming: false,
    stage: 1,
    values: {
      amount: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      currency: 'usd',
      memo: null,
      token: ''
    },
    validated: {
      amount: false,
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
      currency: false,
      memo: false,
      token: false
    },
    location: ''
  }
  componentDidMount() {
    (async () => {
      await fetch('http://ip-api.com/json')
      .then(response=>{
        return response.json();
      }).then(data =>{
        this.setState({
          location: data
        });
      }).catch(error => {
      });
    })();
  }
  onChange = (e, { name, valid, value }) => {
    const {
      actions
    } = this.props;
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    if (name === 'amount' && value >= 5)
    {
      valid = true;
      value = Decimal(value).toFixed(2);
    }
    values[name] = value;
    validated[name] = valid;
    this.setState({
      values,
      validated
    }, () => {
      if (name === 'accountName' && value.length !== 0) {
        const { actions } = this.props;
        actions.checkAccountExists(value);
      }
      
    });

    if (name == 'amount' || name == 'currency') {
      actions.getExchangeRates(values.currency, values.amount * 100);
    } 
  }
  onBeforeClose = ()=> {
    const {onClose} = this.props;
    this.setState({
      confirming: false,
      stage: 1,
      values: {
        amount: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        currency: '',
        memo: '',
        token: ''
      },
      validated: {
        amount: false,
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
        currency: false,
        memo: false,
        token: false
      },
    });
    onClose();
  }
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ confirming: false });
  onStageSelect = (stage) => {
    this.setState({ confirming: false, stage })
  }
  render() {
    const {
      actions,
      connection,
      globals,
      open,
      settings,
      system,
      t,
      trigger
    } = this.props;

    const {
      location,
      stage,
      values,
      validated
    } = this.state;

    let error;
    let isValid = !!(validated.amount);
    let isAccountValid = false;
    if (values.accountName
        && values.accountName.length !== 0
        && system.ACCOUNT_EXISTS === 'FAILURE'
    ) {
      isAccountValid = false;
      error = 'buytoken_request_accountname_invalid';
    } else if (values.accountName
      && values.accountName.length == 12
      && system.ACCOUNT_EXISTS === 'SUCCESS') {
      isAccountValid = true;
    }
    if (values.amount < 0 || isNaN(values.amount)) {
      isValid = false;
      error = 'buytoken_request_amount_invalid';
    }

    if (!values.amount){
      values.amount = 0;
    }
    
    const shouldShowAccountNameWarning = values.accountName && values.accountName.length !== 12;
    const shouldShowKYCWarning = values.amount && values.amount > 100;

    const symbolLower = settings.blockchain.tokenSymbol.toLowerCase();
    let rates = globals.fiat && globals.fiat.rates && globals.fiat.rates[symbolLower];

    const symbolFiat = symbolLower + "/" + values.currency;
    const fiatSymbol = values.currency + "/" + symbolLower;

    if (!rates) {
      rates = {
        available: false,
        estimatedCryptoPurchase: 0,
        txFee: 0
      }
    }

    if (isNaN(rates.estimatedCryptoPurchase))
      {rates.estimatedCryptoPurchase = 0}
    if (isNaN(rates.txFee))
      {rates.txFee = 0}
    if (rates.code == 400) 
      {isValid = false;}

    let purchaseAmount = values.amount;
    if (!purchaseAmount || isNaN(purchaseAmount))
      {purchaseAmount = 0}

    const totalCost = Decimal(rates.txFee).plus(values.amount);

    let stageElement = (
      <WalletPanelFormBuyFiatAmount
        error={error}
        isValid={isValid}
        location={location}
        onChange={this.onChange}
        onSubmit={() => this.onStageSelect(2)}
        settings={settings}
        shouldShowKYCWarning={shouldShowKYCWarning}
        values={values}
      />
    );

    if (stage === 2) {
      stageElement = (
        <WalletPanelFormBuyFiatAccount
          error={error}
          isAccountValid={isAccountValid}
          onBack={() => this.onStageSelect(1)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onStageSelect(3)}
          shouldShowAccountNameWarning={shouldShowAccountNameWarning}
          shouldShowKYCWarning={shouldShowKYCWarning}
          values={values}
        />
      );
    }

    if (stage === 3) {
      stageElement = (
        <WalletPanelFormBuyFiatPurchase
          actions={actions}
          error={error}
          onBack={() => this.onStageSelect(2)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onStageSelect(3)}
          shouldShowKYCWarning={shouldShowKYCWarning}
          settings={settings}
          system={system}
          values={values}
        />
      );
    }

    return (
      <Modal
        centered={false}
        closeIcon={false}
        closeOnDimmerClick={false}
        trigger={trigger}
        onClose={this.onBeforeClose}
        open={open}
        size="fullscreen"
      >
        <Header icon={values.currency} content={t('wallet_buytoken_button_title', {tokenSymbol:settings.blockchain.tokenSymbol})} />
        <Modal.Content>
          <Grid unstackable="true">
            <Grid.Row>
              <Grid.Column width={6}>
                <Step.Group fluid vertical>
                  <Step active={stage === 1} completed={stage > 1}>
                    <Icon name="money" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_1')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_1_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === 2} completed={stage > 2}>
                    <Icon name="id card" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_2')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_2_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === 3} completed={stage > 3}>
                    <Icon name="credit card" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_3')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_3_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>

                <Segment>
                  <List divided relaxed>
                    <List.Item>
                      <List.Icon name='angle double up' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>100.00 {values.currency.toUpperCase()} / 1000.00 {values.currency.toUpperCase()} (KYC)</List.Header>
                        <List.Description as='a'>Weekly Account Limits</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name={values.currency} size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>{Decimal(purchaseAmount).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                        <List.Description as='a'>Purchase Amount</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='exchange' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>{Decimal(rates.estimatedCryptoPurchase).toFixed(4)} {settings.blockchain.tokenSymbol}</List.Header>
                        <List.Description as='a'>Estimated Purchase</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name={values.currency} size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>{Decimal(rates.txFee).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                        <List.Description as='a'>Carbon Fee</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='linkify' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>{rates[symbolFiat]} {settings.blockchain.tokenSymbol}</List.Header>
                        <List.Description as='a'>{settings.blockchain.tokenSymbol}/{values.currency.toUpperCase()}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name={values.currency} size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>{rates[fiatSymbol]} {values.currency.toUpperCase()}</List.Header>
                        <List.Description as='a'>{values.currency.toUpperCase()}/{settings.blockchain.tokenSymbol}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name={values.currency} size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header size="large" as='a'>{Decimal(totalCost).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                        <List.Description size="large" as='a'><strong>Total Cost</strong></List.Description>
                      </List.Content>
                    </List.Item>
                </List>
                </Segment>
              </Grid.Column>
              <Grid.Column width={10}>
                <Segment>
                  {stageElement}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Container textAlign="center">
            <Button
              onClick={this.onBeforeClose}
            >
              <Icon name="x" /> {t('cancel')}
            </Button>
          </Container>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('wallet')(WalletPanelModalBuyFiat);
