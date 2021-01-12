// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormExchangeWithdrawStats from './Form/WithdrawStats';
import WalletPanelFormExchangeWithdrawConfirming from './Form/WithdrawConfirming';
import FormMessageError from '../../../../Global/Form/Message/Error';

import GlobalFormFieldToken from '../../../../Global/Form/Field/Token';

type Props = {
  balance: {},
  system: {}
};

class WalletPanelFormExchangeWithdraw extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let { rex } = props;
    
    this.state = {
      confirming: false,
      withdrawalAmountValid: true,
      decimalWithdrawalAmount: 0,
      REXbalance: rex.rexfund ? Decimal(rex.rexfund.balance.split(' ')[0]) : 0,
      formError: null,
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      confirming,
      withdrawalAmount
    } = this.props;

    this.setState({
      confirming,
      decimalWithdrawalAmount: withdrawalAmount || Decimal(0)
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

  onChange = (e, { name, value, valid }) => {
    const newState = {
      [name]: value,
      formError: null,
      submitDisabled: false
    };

    const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    newState[decimalFieldName] = Decimal(value.split(' ')[0]);

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
      withdrawalAmountValid,
      decimalWithdrawalAmount,
      REXbalance
    } = this.state;

    if (!withdrawalAmountValid) {
      return 'invalid_amount';
    }

    if (Decimal.max(0, decimalWithdrawalAmount).greaterThan(REXbalance)) {
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
      decimalWithdrawalAmount
    } = this.state;

    const {
      withdraw
    } = actions;

    this.setState({
      confirming: false
    });

    withdraw(decimalWithdrawalAmount);
  }

  render() {
    const {
      balance,
      onClose,
      rex,
      system,
      settings,
      t
    } = this.props;

    const {
      decimalWithdrawalAmount,
      REXbalance,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    let {
      formError
    } = this.state;

    return (
      <Segment
        loading={system.REX_WITHDRAW === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormExchangeWithdrawStats
                REXbalance={REXbalance}
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
                    icon="microchip"
                    label={t('rex_withdraw_amount', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="withdrawalAmount"
                    onChange={this.onChange}
                    defaultValue={decimalWithdrawalAmount.toFixed(settings.tokenPrecision)}
                    settings={settings}
                  />
                </Form.Group>
                <FormMessageError
                  error={formError}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('rex_withdraw_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
                />
                <Divider />
                <Button
                  content={t('cancel')}
                  color="grey"
                  onClick={onClose}
                />
                <Button
                  content={t('rex_withdraw_button', {tokenSymbol:settings.blockchain.tokenSymbol})}
                  color="green"
                  disabled={submitDisabled}
                  floated="right"
                  primary
                />
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormExchangeWithdrawConfirming
              balance={balance}
              decimalWithdrawalAmount={decimalWithdrawalAmount}
              REXbalance={REXbalance}
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


export default translate('exchange')(WalletPanelFormExchangeWithdraw);
