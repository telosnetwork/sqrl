// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Grid, Header, Icon, List, Modal, Segment, Step } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

import WalletPanelFormBuyFiatAmount from '../../Form/BuyFiat/Amount';
import WalletPanelFormBuyFiatAccount from '../../Form/BuyFiat/Account';
import WalletPanelFormBuyFiatCCInfo from '../../Form/BuyFiat/CCInfo';
import WalletPanelFormBuyFiatConfirm from '../../Form/BuyFiat/Confirm';
import EOSAccount from '../../../../../utils/EOS/Account';

const AMOUNT = 1;
const ACCOUNT = 2;
const CCINFO = 3;
const CONFIRM = 4;

class WalletPanelModalSellFiat extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      globals,
      settings
    } = this.props;
    const contact = globals.exchangecontact && globals.exchangecontact.data;
    const weeklyLimit = contact && contact.weeklyMax && Decimal(contact.weeklyMax / 100).toFixed(2) || 250.00;
    const remainingWeeklyLimit =  contact && contact.weeklyMax && Decimal(contact.remainingWeeklyLimit / 100).toFixed(2) || 250.00;
    this.state = {
      contact: contact,
      confirming: false,
      stage: AMOUNT,
      loading: false,
      charge3dUrl: null,
      charge3dDisabled: false,
      charge3dErrorMsg: '',
      values: {
        accountName: settings.account,
        amount: null,
        /*
        cardNumber: null || '5100000000000511',
        cardExpiry: null || '12/30',
        cardCvc: null || '123',
        cardAddress: null || 'No 789',
        cardPostal: null || '55555',
        */
        cardNumber: null,
        cardExpiry: null,
        cardCvc: null,
        cardAddress: null,
        cardPostal: null,
        currency: 'usd',
        memo: null,
        token: settings.blockchain.tokenSymbol.toLowerCase(),
        limit: weeklyLimit,
        remainingLimit: remainingWeeklyLimit,
      },
      validated: {
        accountName: false,
        amount: false,
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
        cardAddress: false,
        cardPostal: false,
        currency: false,
        memo: false,
        token: false
      },
      location: ''
    }
  }
  componentDidMount = async () => {
    await fetch('http://ip-api.com/json')
      .then(response=>{
        return response.json();
      }).then(data =>{
        this.setState({
          location: data
        });
      }).catch(error => {
    });
  }
  onChange = debounce((e, { name, valid, value }) => {
    const {
      actions
    } = this.props;
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    if (name == 'amount' && isNaN(value)) return false;
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
  }, 400)
  onChangeFast = (e, { name, valid, value }) => {
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    values[name] = value;
    validated[name] = valid;
    this.setState({
      values,
      validated
    });
  }
  onBeforeClose = async () => {
    const {
      accounts,
      actions,
      onClose, 
      settings
    } = this.props;
    this.setState({
      confirming: false,
      stage: AMOUNT,
      loading: false,
      charge3dUrl: null,
      charge3dDisabled: false,
      charge3dErrorMsg: '',
      values: {
        accountName: settings.account,
        amount: null,
        /*
        cardNumber: null || '5100000000000511',
        cardExpiry: null || '12/30',
        cardCvc: null || '123',
        cardAddress: null || 'No 789',
        cardPostal: null || '55555',
        */
        cardNumber: null,
        cardExpiry: null,
        cardCvc: null,
        cardAddress: null,
        cardPostal: null,
        currency: 'usd',
        memo: null,
        token: settings.blockchain.tokenSymbol.toLowerCase(),
        limit: this.state.values.limit,
        remainingLimit: this.state.values.remainingLimit
      },
      validated: {
        accountName: false,
        amount: false,
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
        cardAddress: false,
        cardPostal: false,
        currency: false,
        memo: false,
        token: false
      },
    });
    const auth = settings.authorization || 'active';
    const model = new EOSAccount(accounts[settings.account]);
    const keys = model.getKeysForAuthorization(auth);
    if (keys && keys.length > 0) {
      const { pubkey } = keys[0];
      await actions.getContactByPublicKey(pubkey);
    }
    onClose();
  }
  onCompletePurchase = async () => {
    const {
      contact,
      values
    } = this.state;
    const {
      actions
    } = this.props;

    this.setState({ loading: true });

    const iframeURL = await actions.chargeCard(values.cardNumber, 
      values.cardExpiry,
      values.cardCvc,
      values.cardAddress,
      values.cardPostal,
      contact.id,
      values.currency,
      (values.amount * 100),
      values.token,
      values.accountName,
      values.memo);

    this.setState({ 
      loading: false, 
      charge3dDisabled: false,
      charge3dUrl: iframeURL.payload
    });

    if (iframeURL.type == 'GET_CHARGECONTACT_NOTENROLLED') {
      this.setState({
        charge3dDisabled: true, 
        charge3dUrl: null,
        charge3dErrorMsg: "We're sorry, but the card you entered does not support these transactions. " +
          "Please use another card and try again or contact your card issuer for further assistance."
      });
      this.onStageSelect(CCINFO);
    } else if (iframeURL.type == 'GET_CHARGECONTACT_FAILURE') {
      const errorMessage = iframeURL.payload && iframeURL.payload.message;
      this.setState({
        charge3dDisabled: true, 
        charge3dUrl: null,
        charge3dErrorMsg: errorMessage
      });
    }
  }
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ 
    confirming: false, 
    charge3dDisabled: false, 
    charge3dUrl: null 
  });
  onStageSelect = (stage) => {
    const {
      globals
    } = this.props;
    if (stage == AMOUNT) {
      const contact = globals.exchangecontact && globals.exchangecontact.data;
      const weeklyLimit = contact && contact.weeklyMax && Decimal(contact.weeklyMax / 100).toFixed(2) || 250.00;
      const remainingWeeklyLimit =  contact && contact.weeklyMax && Decimal(contact.remainingWeeklyLimit / 100).toFixed(2) || 250.00;

      const values = { ...this.state.values };
      values['limit'] = weeklyLimit;
      values['remainingLimit'] = remainingWeeklyLimit;
      this.setState({values});
    }
    this.setState({ confirming: false, stage })
  }
  render() {
    const {
      actions,
      globals,
      keys,
      open,
      settings,
      system,
      t,
      trigger
    } = this.props;

    const {
      charge3dDisabled,
      charge3dErrorMsg,
      charge3dUrl,
      contact,
      loading,
      location,
      stage,
      values,
      validated
    } = this.state;

    let error;
    let isValid = !!(validated.amount);
    let isAccountValid = false;
    let isCCValid = false;
    if (values.accountName
        && values.accountName.length !== 0
        && system.ACCOUNT_EXISTS === 'FAILURE'
    ) {
      isAccountValid = false;
      error = 'buytoken_request_accountname_invalid';
    } else if (values.accountName
      && system.ACCOUNT_EXISTS === 'SUCCESS') {
      isAccountValid = true;
    }
    if (values.accountName 
      && values.accountName.length !== 0
      && (values.token == 'btc' || values.token == 'eos')) {
        isAccountValid = true;
        error='';
    }
    if (values.amount < 0 || isNaN(values.amount)) {
      isValid = false;
      error = 'buytoken_request_amount_invalid';
    }
    if (!values.amount){
      values.amount = 0;
    }
    if (validated['cardNumber'] && validated['cardExpiry'] && validated['cardCvc']
      && values.cardAddress && values.cardPostal) {
        isCCValid = true;
    }

    const verified = contact && contact.kycPassOnfido == '2';    
    const shouldShowAccountNameWarning = 
      values.token != 'btc' && 
      values.accountName && 
      values.accountName.length !== 12;
    const shouldShowKYCWarning = !verified && values.amount && (Decimal(values.amount).greaterThan(values.limit));
    const verifiedLabel = verified ? "Verified" : "Unverified";

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

    let transactionFee = rates.txFee;
    if (rates.txFee > 0 && values.amount > 0) {
      const txFee = Decimal(rates.txFee).toFixed(2);
      const fee = Decimal(values.amount) * .005;
      transactionFee = Decimal(txFee).plus(fee);
    }

    let purchaseAmount = values.amount;
    if (!purchaseAmount || isNaN(purchaseAmount))
      {purchaseAmount = 0}

    const totalCost = Decimal(transactionFee).plus(values.amount);

    if (rates[fiatSymbol] && isValid) {
      const carbonEstimatedPurchase = Decimal(rates.estimatedCryptoPurchase).toFixed(settings.tokenPrecision);
      const localEstimatedPurchase = Decimal(rates[symbolFiat] * values.amount).toFixed(settings.tokenPrecision);
      isValid = Decimal(carbonEstimatedPurchase).equals(localEstimatedPurchase) ||
        (
          Decimal(carbonEstimatedPurchase).lessThan(Decimal(localEstimatedPurchase).plus(1)) &&
          Decimal(carbonEstimatedPurchase).greaterThan(Decimal(localEstimatedPurchase).minus(1))
        );
    }

    let stageElement = (
      <WalletPanelFormBuyFiatAmount
        error={error}
        isValid={isValid}
        globals={globals}
        keys={keys}
        location={location}
        onChange={this.onChange}
        onChangeFast={this.onChangeFast}
        onSubmit={() => this.onStageSelect(ACCOUNT)}
        purchaseAmount={purchaseAmount}
        rates={rates}
        settings={settings}
        shouldShowKYCWarning={shouldShowKYCWarning}
        totalCost={totalCost}
        transactionFee={transactionFee}
        values={values}
      />
    );

    if (stage === ACCOUNT) {
      stageElement = (
        <WalletPanelFormBuyFiatAccount
          error={error}
          isAccountValid={isAccountValid}
          keys={keys}
          onBack={() => this.onStageSelect(AMOUNT)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onStageSelect(CCINFO)}
          purchaseAmount={purchaseAmount}
          rates={rates}
          settings={settings}
          shouldShowAccountNameWarning={shouldShowAccountNameWarning}
          shouldShowKYCWarning={shouldShowKYCWarning}
          totalCost={totalCost}
          transactionFee={transactionFee}
          values={values}
        />
      );
    }

    if (stage === CCINFO) {
      stageElement = (
        <WalletPanelFormBuyFiatCCInfo
          actions={actions}
          charge3dDisabled={charge3dDisabled}
          charge3dErrorMsg={charge3dErrorMsg}
          error={error}
          isCCValid={isCCValid}
          keys={keys}
          onBack={() => this.onStageSelect(ACCOUNT)}
          onCancel={this.onCancel}
          onChange={this.onChangeFast}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onStageSelect(CONFIRM)}
          purchaseAmount={purchaseAmount}
          rates={rates}
          shouldShowKYCWarning={shouldShowKYCWarning}
          settings={settings}
          system={system}
          totalCost={totalCost}
          transactionFee={transactionFee}
          values={values}
        />
      );
    }

    if (stage === CONFIRM) {
      stageElement = (
        <WalletPanelFormBuyFiatConfirm
          actions={actions}
          charge3dDisabled={charge3dDisabled}
          charge3dErrorMsg={charge3dErrorMsg}
          error={error}
          keys={keys}
          loading={loading}
          onBack={() => this.onStageSelect(CCINFO)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={this.onCompletePurchase}
          purchaseAmount={purchaseAmount}
          rates={rates}
          settings={settings}
          system={system}
          totalCost={totalCost}
          transactionFee={transactionFee}
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
        <Header icon={values.currency} content={t('wallet_selltoken_button_title', {tokenSymbol:settings.blockchain.tokenSymbol})} />
        <Modal.Content>
          <Grid unstackable="true">
            <Grid.Row>
              <Grid.Column width={6}>
                <Step.Group fluid vertical>
                  <Step active={stage === AMOUNT} completed={stage > AMOUNT}>
                    <Icon name="money" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_1')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_1_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === ACCOUNT} completed={stage > ACCOUNT}>
                    <Icon name="id card" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_2')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_2_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === CCINFO} completed={stage > CCINFO}>
                    <Icon name="credit card" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_3')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_3_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === CONFIRM} completed={stage > CONFIRM}>
                    <Icon name="shopping cart" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_4')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_4_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>

                {(stage !== CONFIRM) ?
                  <Segment>
                    <List divided relaxed>
                      <List.Item>
                        <List.Icon name='angle double up' size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header as='a'>{values.remainingLimit} / {values.limit} {values.currency.toUpperCase()} ({verifiedLabel})</List.Header>
                          <List.Description as='a'>Remaining / Daily Limit</List.Description>
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
                          <List.Header as='a'>{Decimal(transactionFee).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
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
                : false}
              </Grid.Column>
              <Grid.Column width={10}>
                <Segment>
                  {(charge3dUrl ?
                    <iframe
                      src={charge3dUrl}
                      frameBorder={'0'}
                      style={{
                        width: '100%',
                        height: '400px',
                        border: '0',
                        position: 'relative',
                        display: 'initial'
                      }}
                    />
                  :stageElement)}
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
              <Icon name="x" /> {t('Close')}
            </Button>
          </Container>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('wallet')(WalletPanelModalSellFiat);
