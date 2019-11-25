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

class WalletPanelModalBuyFiat extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      accounts,
      actions,
      globals,
      keys,
      settings
    } = this.props;
    const contact = globals.exchangecontact && globals.exchangecontact.data;
    const weeklyLimit = contact && contact.weeklyMax && Decimal(contact.weeklyMax / 100).toFixed(2) || 250.00;
    const remainingWeeklyLimit =  contact && contact.weeklyMax && Decimal(contact.remainingWeeklyLimit / 100).toFixed(2) || 250.00;

    const model = new EOSAccount(accounts[settings.account]);
    const auth = settings.authorization || 'active';
    const accountKey = model && model.getKeysForAuthorization(auth);
    let publicKey = keys.pubkey;
    if (accountKey && accountKey.length > 0) {
      let { pubkey } = accountKey[0];
      if (pubkey) publicKey = pubkey;
    }
    
    this.state = {
      contact: contact,
      confirming: false,
      stage: AMOUNT,
      loading: false,
      charge3dUrl: null,
      charge3dDisabled: false,
      charge3dErrorMsg: '',
      bankAccountErrDisabled: false,
      bankAccountErrorMsg: '',
      bankTransactionSent: false,
      bankTransactionSentMsg:'',
      deposits: null,
      paymentMethods: null,
      pubkey: publicKey,
      values: {
        accountName: settings.account,
        amount: null,
        bankACHTransfer: null,
        bankWireTransfer: true,
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
        bankAccountNumber: null,
        confirmBankAccountNumber: null,
        routingNumber: null,
        confirmRoutingNumber: null,
        bankName: null,
        bankAccountType: null,
        existingPaymentMethodId: null,
        isBankInternational: null,
        beneficiaryAddress1: null,
        beneficiaryAddressCity: null,
        beneficiaryAddressCountry: null,
        beneficiaryAddressRegion: null,
        beneficiaryAddressZip: null
      },
      validated: {
        accountName: false,
        amount: false,
        bankACHTransfer: false,
        bankWireTransfer: false,
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
        cardAddress: false,
        cardPostal: false,
        currency: false,
        memo: false,
        token: false,
        bankAccountNumber: false,
        confirmBankAccountNumber: false,
        routingNumber: false,
        confirmRoutingNumber: false,
        bankName: false,
        bankAccountType: false,
        existingPaymentMethodId: false,
        isBankInternational: false,
        beneficiaryAddress1: false,
        beneficiaryAddressCity: false,
        beneficiaryAddressCountry: false,
        beneficiaryAddressRegion: false,
        beneficiaryAddressZip: false
      },
      location: ''
    }
    actions.checkAccountExists(settings.account);

    this.onStageSelect(AMOUNT);
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

    if (name == 'amount' || name == 'currency' || name == 'token') {
      actions.getExchangeRates(values.token, values.currency, values.amount * 100);
    } 
  }, 400)
  onChangeFast = (e, { name, valid, value }) => {
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    
    if (name === 'bankWireTransfer') {
      if (values.bankWireTransfer === true) value = false;
      else value = true;

      values['bankACHTransfer'] = !value;
    } else if (name === 'bankACHTransfer') {
      if (values.bankACHTransfer === true) value = false;
      else value = true;

      values['bankWireTransfer'] = !value;
    }else if (name === 'isBankInternational') {
      if (values.isBankInternational === true) value = false;
      else value = true;

      values['isBankInternational'] = !value;
    }
    
    values[name] = value;
    validated[name] = valid;

    this.setState({
      values,
      validated
    });
  }
  onBeforeClose = async () => {
    const {
      actions,
      onClose, 
      settings
    } = this.props;
    const {
      pubkey
    } = this.state;
    await actions.getContactByPublicKey(pubkey);

    this.setState({
      confirming: false,
      stage: AMOUNT,
      loading: false,
      charge3dUrl: null,
      charge3dDisabled: false,
      charge3dErrorMsg: '',
      bankAccountErrDisabled: false,
      bankAccountErrorMsg: '',
      bankTransactionSent: false,
      bankTransactionSentMsg:'',
      values: {
        accountName: settings.account,
        amount: null,
        bankACHTransfer: null,
        bankWireTransfer: true,
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
        remainingLimit: this.state.values.remainingLimit,
        bankAccountNumber: null,
        confirmBankAccountNumber: null,
        routingNumber: null,
        confirmRoutingNumber: null,
        bankName: null,
        bankAccountType: null,
        existingPaymentMethodId: null,
        isBankInternational: null,
        beneficiaryAddress1: null,
        beneficiaryAddressCity: null,
        beneficiaryAddressCountry: null,
        beneficiaryAddressRegion: null,
        beneficiaryAddressZip: null
      },
      validated: {
        accountName: false,
        amount: false,
        bankACHTransfer: false,
        bankWireTransfer: false,
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
        cardAddress: false,
        cardPostal: false,
        currency: false,
        memo: false,
        token: false,
        bankAccountNumber: false,
        confirmBankAccountNumber: false,
        routingNumber: false,
        confirmRoutingNumber: false,
        bankName: false,
        bankAccountType: false,
        existingPaymentMethodId: false,
        isBankInternational: false,
        beneficiaryAddress1: false,
        beneficiaryAddressCity: false,
        beneficiaryAddressCountry: false,
        beneficiaryAddressRegion: false,
        beneficiaryAddressZip: false
      },
    });
    onClose();
  }
  onCompletePurchase = async () => {
    const {
      bankTransactionSent,
      contact,
      deposits,
      paymentMethods,
      pubkey,
      values
    } = this.state;
    const {
      actions,
      settings
    } = this.props;

    if (bankTransactionSent) {
      this.onBeforeClose();
      return;
    }

    this.setState({ loading: true });

    const cusdSymbol = settings.blockchain.tokenSymbol.toLowerCase() + 'd';
    if (values.token != cusdSymbol) { // card purchase
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
    } else { // stablecoin bank purchase

      this.setState({ 
        loading: false, 
        bankAccountErrDisabled: false,
        bankTransactionSent: false
      });

      let bankInfo = {
        bankName: values.bankName,
        bankAccountNumber: values.bankAccountNumber,
        bankAccountType: values.bankAccountType,
        routingNumber: values.routingNumber
      }

      if (values.existingPaymentMethodId) {
        const paymentMethod = paymentMethods.filter((payment) => (payment.id == values.existingPaymentMethodId))[0];
        bankInfo = {
          bankName: paymentMethod.bankName,
          bankAccountNumber: paymentMethod.accountNumber,
          routingNumber: paymentMethod.routingNumber,
          bankAccountType: paymentMethod.bankAccountType ? paymentMethod.bankAccountType : "checking"
        }
      }

      if (values.bankACHTransfer == true) {
        const achRequest = await actions.addACHDeposit(
          contact.id, bankInfo.bankAccountNumber, bankInfo.routingNumber,
          bankInfo.bankName, bankInfo.bankAccountType, 
          values.token=="tlosd"?"telos":values.token, 
          values.accountName, values.amount);

        if (achRequest && achRequest.payload && achRequest.payload.pTrustFundsTransferId) {
          await actions.getContactByPublicKey(pubkey);
          
          this.setState({
            bankTransactionSent: true,
            bankTransactionSentMsg: 'Your ACH deposit request has been successfully submitted. Please wait up to 24 hours for the transaction to begin processing.'
          });
        } else if (achRequest && achRequest.payload && achRequest.payload.details){
          this.setState({
            bankAccountErrDisabled: true,
            bankAccountErrorMsg: JSON.stringify(achRequest.payload.message)
          }); 
        }
      } else if (values.bankWireTransfer == true) {
        const wireRequest = await actions.addWireDeposit(
          contact.id, values.token=="tlosd"?"telos":values.token, 
          values.accountName, values.amount);

        if (wireRequest && wireRequest.payload && wireRequest.payload.pTrustFundsTransferId) {
          await actions.getContactByPublicKey(pubkey);
          
          this.setState({
            bankTransactionSent: true,
            bankTransactionSentMsg: 'Your wire deposit request has been successfully submitted. Please note that you must initiate the wire deposit yourself through your bank using the same amount specified in this deposit. Send your wire to the following recipient:'
          });
        } else if (wireRequest && wireRequest.payload && wireRequest.payload.details){
          this.setState({
            bankAccountErrDisabled: true,
            bankAccountErrorMsg: JSON.stringify(wireRequest.payload.message)
          }); 
        }
      }

      const deposits = await actions.getDeposits(contact.id);
      if (deposits && deposits.payload && deposits.payload.code == 200)
          this.setState({deposits: deposits.payload.data});

      this.setState({
        loading: false
      });
    }
  }
  onAddBankAccount = async () => {
    const {
      contact,
      pubkey,
      values
    } = this.state;
    const {
      actions
    } = this.props;

    if (values.existingPaymentMethodId) {
      this.onStageSelect(CONFIRM);
      return;
    }

    this.setState({ loading: true });

    if (values.bankACHTransfer === true) {
      const addACHRequest = await actions.addACHAccount(
        contact.id, values.bankAccountNumber, values.routingNumber,
        values.bankName, values.bankAccountType);
  
      this.setState({ 
        loading: false, 
        bankAccountErrDisabled: false
      });
      
      if (addACHRequest && addACHRequest.payload && addACHRequest.payload.paymentMethodId) {
        await actions.getContactByPublicKey(pubkey);
        
        const paymentMethods = await actions.getPaymentMethods(contact.id);
        if (paymentMethods && paymentMethods.payload && paymentMethods.payload.code == 200)
            this.setState({paymentMethods: paymentMethods.payload.details});
  
        this.onStageSelect(CONFIRM);
      } else if (addACHRequest && addACHRequest.payload && addACHRequest.payload.error){
  
        this.setState({
          bankAccountErrDisabled: true,
          bankAccountErrorMsg: JSON.stringify(addACHRequest.payload.error)
        }); 
      }
    } else if (values.bankWireTransfer === true) {
      const addWireRequest = await actions.addWireAccount(
        contact.id, values.isBankInternational, 
        values.bankAccountNumber, values.routingNumber, 
        values.bankName, values.beneficiaryAddress1, 
        values.beneficiaryAddressCity, values.beneficiaryAddressCountry, 
        values.beneficiaryAddressRegion, values.beneficiaryAddressZip
        );
  
      this.setState({ 
        loading: false, 
        bankAccountErrDisabled: false
      });
      
      if (addWireRequest && addWireRequest.payload && addWireRequest.payload.paymentMethodId) {
        await actions.getContactByPublicKey(pubkey);
        
        const paymentMethods = await actions.getPaymentMethods(contact.id);
        if (paymentMethods && paymentMethods.payload && paymentMethods.payload.code == 200)
            this.setState({paymentMethods: paymentMethods.payload.details});
  
        this.onStageSelect(CONFIRM);
      } else if (addWireRequest && addWireRequest.payload && addWireRequest.payload.error){
  
        this.setState({
          bankAccountErrDisabled: true,
          bankAccountErrorMsg: JSON.stringify(addWireRequest.payload.error)
        }); 
      }
    }
  }
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ 
    confirming: false, 
    bankAccountErrDisabled: false,
    bankAccountErrorMsg: null,
    bankTransactionSent: false,
    charge3dDisabled: false, 
    charge3dUrl: null 
  });
  onStageSelect = async (stage) => {
    const {
      actions,
      globals
    } = this.props;
    this.setState({ confirming: false, stage })
    
    if (stage == AMOUNT) {
      const contact = globals.exchangecontact && globals.exchangecontact.data;
      const weeklyLimit = contact && contact.weeklyMax && Decimal(contact.weeklyMax / 100).toFixed(2) || 250.00;
      const remainingWeeklyLimit =  contact && contact.weeklyMax && Decimal(contact.remainingWeeklyLimit / 100).toFixed(2) || 250.00;

      const values = { ...this.state.values };
      values['limit'] = weeklyLimit;
      values['remainingLimit'] = remainingWeeklyLimit;
      this.setState({values});

      if (contact.id) {
        const paymentMethods = await actions.getPaymentMethods(contact.id);
        if (paymentMethods && paymentMethods.payload && paymentMethods.payload.code == 200)
          this.setState({paymentMethods: paymentMethods.payload.details});

        const deposits = await actions.getDeposits(contact.id);
        if (deposits && deposits.payload && deposits.payload.code == 200)
            this.setState({deposits: deposits.payload.data});
      }
    }
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
      bankAccountErrDisabled,
      bankAccountErrorMsg,
      bankTransactionSent,
      bankTransactionSentMsg,
      charge3dDisabled,
      charge3dErrorMsg,
      charge3dUrl,
      contact,
      loading,
      location,
      paymentMethods,
      stage,
      values,
      validated
    } = this.state;

    let error;
    let isValid = !!(validated.amount);
    let isAccountValid = false;
    let isCCValid = false;
    let isBankAccountValid = false;
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
    if (values.bankAccountNumber && values.bankName 
      && values.bankAccountType && values.routingNumber 
      && values.bankAccountNumber == values.confirmBankAccountNumber
      && values.routingNumber == values.confirmRoutingNumber) {

        if (values.bankACHTransfer === true) {
          isBankAccountValid = true;
        } else if (values.bankWireTransfer === true && values.beneficiaryAddress1 
          && values.beneficiaryAddressCity && values.beneficiaryAddressCountry 
          && values.beneficiaryAddressRegion && values.beneficiaryAddressZip) {
          isBankAccountValid = true;
        }
    }
    if (values.existingPaymentMethodId) {
      isBankAccountValid = true;
    }

    const verified = contact && contact.kycPassOnfido == '2';    
    const shouldShowAccountNameWarning = 
      values.token != 'btc' && 
      values.accountName && 
      values.accountName.length !== 12;
    const shouldShowKYCWarning = !verified && values.amount && (Decimal(values.amount).greaterThan(values.limit));
    const verifiedLabel = verified ? "Verified" : "Unverified";
    
    const tokenSymbolLower = settings.blockchain.tokenSymbol.toLowerCase();
    
    const symbolLower = values.token.toLowerCase();
    let rates = globals.fiat && globals.fiat.rates && globals.fiat.rates[symbolLower];

    const symbolFiat = symbolLower + "/" + values.currency;
    const fiatSymbol = values.currency + "/" + symbolLower;
    const cusdSymbol = tokenSymbolLower + 'd';
    const userFee = 0.005;

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
      const fee = Decimal(values.amount) * userFee;
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

    const tokenLimit = values.token === cusdSymbol ? "Unlimited" : values.limit;
    const tokenRemainingLimit = values.token === cusdSymbol ? "Unlimited" : values.remainingLimit;
    const step3Label = values.token === cusdSymbol ? "wallet_buytoken_request_step_3_bank" : "wallet_buytoken_request_step_3";
    const step3Desc = values.token === cusdSymbol ? "wallet_buytoken_request_step_3_bank_desc" : "wallet_buytoken_request_step_3_desc";
    const shouldShowChainWarning = values.token != cusdSymbol && values.token != tokenSymbolLower;
    const shouldShowMismatchWarning = values.bankAccountNumber && values.confirmBankAccountNumber &&
      (values.bankAccountNumber != values.confirmBankAccountNumber);
    const shouldShowRoutingMismatchWarning = values.routingNumber && values.confirmRoutingNumber &&
      (values.routingNumber != values.confirmRoutingNumber);

    let stageElement = (
      <WalletPanelFormBuyFiatAmount
        cusdSymbol={cusdSymbol}
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
        shouldShowChainWarning={shouldShowChainWarning}
        shouldShowKYCWarning={shouldShowKYCWarning}
        tokenSymbolLower={tokenSymbolLower}
        totalCost={totalCost}
        transactionFee={transactionFee}
        values={values}
      />
    );

    if (stage === ACCOUNT) {
      stageElement = (
        <WalletPanelFormBuyFiatAccount
          cusdSymbol={cusdSymbol}
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
          shouldShowChainWarning={shouldShowChainWarning}
          shouldShowKYCWarning={shouldShowKYCWarning}
          tokenSymbolLower={tokenSymbolLower}
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
          bankAccountErrorMsg={bankAccountErrorMsg}
          bankAccountErrDisabled={bankAccountErrDisabled}
          charge3dDisabled={charge3dDisabled}
          charge3dErrorMsg={charge3dErrorMsg}
          cusdSymbol={cusdSymbol}
          error={error}
          isBankAccountValid={isBankAccountValid}
          isCCValid={isCCValid}
          keys={keys}
          onBack={() => this.onStageSelect(ACCOUNT)}
          onCancel={this.onCancel}
          onChange={this.onChangeFast}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onStageSelect(CONFIRM)}
          onAddBankAccount={this.onAddBankAccount}
          paymentMethods={paymentMethods}
          purchaseAmount={purchaseAmount}
          rates={rates}
          shouldShowChainWarning={shouldShowChainWarning}
          shouldShowKYCWarning={shouldShowKYCWarning}
          shouldShowMismatchWarning={shouldShowMismatchWarning}
          shouldShowRoutingMismatchWarning={shouldShowRoutingMismatchWarning}
          settings={settings}
          system={system}
          tokenSymbolLower={tokenSymbolLower}
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
          bankAccountErrorMsg={bankAccountErrorMsg}
          bankAccountErrDisabled={bankAccountErrDisabled}
          bankTransactionSent={bankTransactionSent}
          bankTransactionSentMsg={bankTransactionSentMsg}
          charge3dDisabled={charge3dDisabled}
          charge3dErrorMsg={charge3dErrorMsg}
          cusdSymbol={cusdSymbol}
          error={error}
          keys={keys}
          loading={loading}
          onBack={() => this.onStageSelect(CCINFO)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={this.onCompletePurchase}
          paymentMethods={paymentMethods}
          purchaseAmount={purchaseAmount}
          rates={rates}
          settings={settings}
          shouldShowChainWarning={shouldShowChainWarning}
          system={system}
          tokenSymbolLower={tokenSymbolLower}
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
        <Header icon={values.currency} content={t('wallet_buytoken_button_title', {tokenSymbol:values.token.toUpperCase()})} />
        <Modal.Content>
          <Grid unstackable="true">
            <Grid.Row>
              <Grid.Column width={6}>
                <Step.Group fluid vertical>
                  <Step active={stage === AMOUNT} completed={stage > AMOUNT}>
                    <Icon name="money" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_1')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_1_desc', {tokenSymbol:values.token.toUpperCase()})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === ACCOUNT} completed={stage > ACCOUNT}>
                    <Icon name="id card" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_2')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_2_desc', {tokenSymbol:values.token.toUpperCase()})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === CCINFO} completed={stage > CCINFO}>
                    <Icon name="credit card" />
                    <Step.Content>
                      <Step.Title>{t(step3Label)}</Step.Title>
                      <Step.Description>{t(step3Desc, {tokenSymbol:values.token.toUpperCase()})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === CONFIRM} completed={stage > CONFIRM}>
                    <Icon name="shopping cart" />
                    <Step.Content>
                      <Step.Title>{t('wallet_buytoken_request_step_4')}</Step.Title>
                      <Step.Description>{t('wallet_buytoken_request_step_4_desc', {tokenSymbol:values.token.toUpperCase()})}</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>

                {(stage !== CONFIRM) ?
                  <Segment>
                    <List divided relaxed>
                      <List.Item>
                        <List.Icon name='angle double up' size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header as='a'>{tokenRemainingLimit} / {tokenLimit} {values.currency.toUpperCase()} ({verifiedLabel})</List.Header>
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
                          <List.Header as='a'>{Decimal(rates.estimatedCryptoPurchase).toFixed(4)} {values.token.toUpperCase()}</List.Header>
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
                          <List.Header as='a'>{rates[symbolFiat]} {values.token.toUpperCase()}</List.Header>
                          <List.Description as='a'>{values.token.toUpperCase()}/{values.currency.toUpperCase()}</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name={values.currency} size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header as='a'>{rates[fiatSymbol]} {values.currency.toUpperCase()}</List.Header>
                          <List.Description as='a'>{values.currency.toUpperCase()}/{values.token.toUpperCase()}</List.Description>
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

export default translate('wallet')(WalletPanelModalBuyFiat);
