// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormRentStats from './Form/RentStats';
import WalletPanelFormRentConfirming from './Form/RentConfirming';
import FormMessageError from '../../../../Global/Form/Message/Error';

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldToken from '../../../../Global/Form/Field/Token';
import { bancorConvert } from '../../../../../actions/rex';

type Props = {
  account: {},
  balance: {},
  system: {}
};

class WalletPanelFormExchangeRent extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let { rex, settings } = props;
    
    this.state = {
      confirming: false,
      loanAmountValid: true,
      decimalPaymentAmount: 0,
      decimalLoanAmount: 0,
      rentNETorCPU: 'CPU',
      REXfund: rex.rexfund ? Decimal(rex.rexfund.balance.split(' ')[0]) : 0,
      REXbalance: rex.rexbal ? Decimal(rex.rexbal.rex_balance.split(' ')[0]) : 0,
      EOSbalance: (props.balance && props.balance[settings.blockchain.tokenSymbol]) 
        ? props.balance[settings.blockchain.tokenSymbol] : 0,
      formError: null,
      paymentAmountValid: true,
      receiver: '',
      receiverValid: false,
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      confirming,
      loanAmount,
      paymentAmount,
      receiver
    } = this.props;

    this.setState({
      confirming,
      decimalPaymentAmount: paymentAmount || Decimal(0),
      decimalLoanAmount: loanAmount || Decimal(0),
      receiver: receiver || '',
    });
  }

  onSubmit = (e) => {
    if (!this.state.submitDisabled) {
      this.setState({
        confirming: true
      });
    }
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  onError = (error) => {
    let errorMessage;

    if (error !== true) {
      errorMessage = error;
    }

    this.setState({
      submitDisabled: true,
      formError: errorMessage
    });
  }

  handleRadioChange = (e, { value }) => {
    this.setState({
      rentNETorCPU: value
    });
  }

  onChange = (e, { name, value, valid }) => {
    const {
      actions,
      rex
    } = this.props;

    const {
      checkAccountExists
    } = actions;

    const newState = {
      [name]: value,
      formError: null,
      submitDisabled: false
    };

    if (name === 'receiver') {
      checkAccountExists(value);
    } else {
      const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      newState[decimalFieldName] = Decimal(value.split(' ')[0]);

      if (name == 'paymentAmount') {
        const totalRent = rex.rexpool.total_rent.split(' ')[0];
        const totalUnlent = rex.rexpool.total_unlent.split(' ')[0];
        const calculatedLoanAmount = bancorConvert(totalRent, totalUnlent, newState[decimalFieldName]);
        this.setState({
          decimalLoanAmount: Decimal(calculatedLoanAmount)
        });
      }
    }

    newState[`${name}Valid`] = valid;

    this.setState(newState, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      decimalPaymentAmount,
      REXfund,
      EOSbalance,
      loanAmountValid,
      receiverValid,
      paymentAmountValid
    } = this.state;

    if (!paymentAmountValid || !loanAmountValid || decimalPaymentAmount < 1) {
      return 'invalid_amount';
    }

    if (!receiverValid) {
      return 'not_valid_account_name';
    }

    if (Decimal.max(0, decimalPaymentAmount).greaterThan(REXfund)) {
      return 'not_enough_balance';
    }

    return false;
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  onConfirm = () => {
    const {
      actions
    } = this.props;

    const {
      decimalLoanAmount,
      decimalPaymentAmount,
      receiver,
      rentNETorCPU
    } = this.state;

    const {
      rentcpu,
      rentnet
    } = actions;

    this.setState({
      confirming: false
    });

    if (rentNETorCPU == 'CPU') 
      rentcpu(receiver, decimalPaymentAmount, 0)
    else
      rentnet(receiver, decimalPaymentAmount, 0)
    /*console.log('going to rent ', decimalLoanAmount.toFixed(4), 
    ' and pay ', decimalPaymentAmount.toFixed(4), 
    ' goin to ', receiver, ' for ', rentNETorCPU)*/
  }

  render() {
    const {
      account,
      balance,
      onClose,
      rex,
      system,
      settings,
      t
    } = this.props;

    const {
      decimalLoanAmount,
      decimalPaymentAmount,
      receiver,
      rentNETorCPU,
      REXbalance,
      REXfund,
      submitDisabled
    } = this.state;

    const EOSbalance = balance[settings.blockchain.tokenSymbol] || 0;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    let {
      formError
    } = this.state;

    if (system.ACCOUNT_EXISTS === 'FAILURE' &&
        system.ACCOUNT_EXISTS_LAST_ACCOUNT === receiver) {
      formError = formError || 'account_does_not_exist';
    }

    const netOrCPU = ['CPU'];
    netOrCPU.push('NET');
    return (
      <Segment
        loading={system.REX_RENTRESOURCE === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormRentStats
                EOSbalance={EOSbalance}
                REXbalance={REXbalance}
                REXfund={REXfund}
                rex={rex}
                settings={settings}
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group widths="equal">
                  <GlobalFormFieldToken
                    autoFocus
                    icon="dollar"
                    label={t('rex_rent_payment_amount', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="paymentAmount"
                    onChange={this.onChange}
                    defaultValue={decimalPaymentAmount.toFixed(settings.tokenPrecision)}
                    settings={settings}
                  />
                  <Message
                    style={{ width: '100%' }}
                    content={t('rex_rent_loan_amount', {loanAmount: decimalLoanAmount.toFixed(settings.tokenPrecision), tokenSymbol:settings.blockchain.tokenSymbol})}
                  />
                  <GlobalFormFieldAccount
                    value={receiver}
                    label={t('rex_rent_receiver')}
                    name="receiver"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group inline>
                    {netOrCPU.map((option) => (
                      <Form.Radio
                        label={t(`rex_rent_resource_${option}`)}
                        key={option}
                        name="rentNETorCPU"
                        style={{ marginLeft: '10px' }}
                        value={option}
                        checked={this.state.rentNETorCPU === option}
                        onChange={this.handleRadioChange}
                      />
                    ))}
                  </Form.Group>
                <FormMessageError
                  error={formError}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('rex_rent_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
                />
                <Divider />
                <Button
                  content={t('cancel')}
                  color="grey"
                  onClick={onClose}
                />
                <Button
                  content={t('rex_rent_button')}
                  color="green"
                  disabled={submitDisabled || formError != null}
                  floated="right"
                  primary
                />
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormRentConfirming
              account={account}
              balance={balance}
              decimalLoanAmount={decimalLoanAmount}
              EOSbalance={EOSbalance}
              receiver={receiver}
              rentNETorCPU={rentNETorCPU}
              decimalPaymentAmount={decimalPaymentAmount}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              rex={rex}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('exchange')(WalletPanelFormExchangeRent);
