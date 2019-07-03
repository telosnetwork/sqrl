// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Form/UnStakeToStats';
import WalletPanelFormStakeConfirming from './Form/UnStakeToConfirming';
import FormMessageError from '../../../../Global/Form/Message/Error';

import GlobalFormFieldToken from '../../../../Global/Form/Field/Token';

type Props = {
  account: {},
  balance: {},
  system: {}
};

class WalletPanelFormExchangeUnStakeTo extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let { account, settings } = props;
    if (!account) account = {};
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth || {
      cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
      net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
    };

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];

    this.state = {
      confirming: false,
      cpuAmountValid: true,
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalCpuAmount: Decimal(parsedCpuWeight),
      decimalNetAmount: Decimal(parsedNetWeight),
      EOSbalance: (props.balance && props.balance[settings.blockchain.tokenSymbol]) 
        ? props.balance[settings.blockchain.tokenSymbol] : 0,
      formError: null,
      netAmountValid: true,
      netOriginal: Decimal(parsedNetWeight),
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      confirming,
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.props;

    this.setState({
      confirming,
      cpuOriginal: cpuOriginal || cpuAmount || Decimal(0),
      decimalCpuAmount: cpuAmount || Decimal(0),
      decimalNetAmount: netAmount || Decimal(0),
      netOriginal: netOriginal || netAmount || Decimal(0)
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
      account
    } = this.props;

    const {
      cpuAmountValid,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      EOSbalance,
      netAmountValid,
      netOriginal
    } = this.state;

    if (!cpuAmountValid || !netAmountValid) {
      return 'not_valid_stake_amount';
    }

    if (cpuOriginal.equals(decimalCpuAmount) && netOriginal.equals(decimalNetAmount)) {
      return true;
    }

    if (Decimal.max(0, decimalCpuAmount).greaterThan(cpuOriginal) || Decimal.max(0, decimalNetAmount).greaterThan(netOriginal)) {
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
      decimalCpuAmount,
      decimalNetAmount
    } = this.state;

    const {
      getRexBalance,
      unstaketorex
    } = actions;

    this.setState({
      confirming: false
    });

    unstaketorex(decimalNetAmount, decimalCpuAmount);
    getRexBalance();
  }

  render() {
    const {
      account,
      balance,
      onClose,
      system,
      settings,
      t
    } = this.props;

    const {
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      netOriginal,
      submitDisabled
    } = this.state;

    const EOSbalance = balance[settings.blockchain.tokenSymbol] || 0;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    let {
      formError
    } = this.state;
    
    return (
      <Segment
        loading={system.REX_UNSTAKETOREX === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormStakeStats
                cpuOriginal={cpuOriginal}
                netOriginal={netOriginal}
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
                    label={t('rex_unstaketo_cpu', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="cpuAmount"
                    onChange={this.onChange}
                    defaultValue={decimalCpuAmount.toFixed(settings.tokenPrecision)}
                    settings={settings}
                  />

                  <GlobalFormFieldToken
                    autoFocus
                    icon="wifi"
                    label={t('rex_unstaketo_net', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="netAmount"
                    onChange={this.onChange}
                    defaultValue={decimalNetAmount.toFixed(settings.tokenPrecision)}
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
                  content={t('rex_unstaketo_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
                />
                <Divider />
                <Button
                  content={t('cancel')}
                  color="grey"
                  onClick={onClose}
                />
                <Button
                  content={t('rex_unstaketo_button')}
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
            <WalletPanelFormStakeConfirming
              account={account}
              balance={balance}
              decimalCpuAmount={decimalCpuAmount}
              cpuOriginal={cpuOriginal}
              EOSbalance={EOSbalance}
              decimalNetAmount={decimalNetAmount}
              netOriginal={netOriginal}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('exchange')(WalletPanelFormExchangeUnStakeTo);
