// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormExchangeSellStats from './Form/SellStats';
import WalletPanelFormExchangeSellConfirming from './Form/SellConfirming';
import FormMessageError from '../../../../Global/Form/Message/Error';

import GlobalFormFieldToken from '../../../../Global/Form/Field/Token';

type Props = {
  balance: {},
  system: {}
};

class WalletPanelFormExchangeSell extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let { rex } = props;
    
    this.state = {
      confirming: false,
      sellAmountValid: true,
      decimalSellAmount: 0,
      REXbalance: rex && rex.rexbal ? Decimal(rex.rexbal.rex_balance.split(' ')[0]) : 0,
      formError: null,
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      confirming,
      sellAmount
    } = this.props;

    this.setState({
      confirming,
      decimalSellAmount: sellAmount || Decimal(0)
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
      sellAmountValid,
      decimalSellAmount,
      REXbalance
    } = this.state;

    if (!sellAmountValid) {
      return 'invalid_amount';
    }

    if (Decimal.max(0, decimalSellAmount).greaterThan(REXbalance)) {
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
      decimalSellAmount
    } = this.state;

    const {
      sellrex
    } = actions;

    this.setState({
      confirming: false
    });

    sellrex(decimalSellAmount);
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
      decimalSellAmount,
      REXbalance,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    let {
      formError
    } = this.state;

    const totalRex = rex.rexpool.total_rex.split(' ')[0];
    const totalLendable = rex.rexpool.total_lendable.split(' ')[0];
    const sellRatio = totalRex > 0 ? parseFloat(totalLendable) / parseFloat(totalRex) * decimalSellAmount : 0;

    return (
      <Segment
        loading={system.REX_SELLREX === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormExchangeSellStats
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
                    label={t('rex_sellrex_amount', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="sellAmount"
                    onChange={this.onChange}
                    defaultValue={decimalSellAmount.toFixed(settings.tokenPrecision)}
                    settings={settings}
                  />
                </Form.Group>
                <Header size="tiny">
                    {(sellRatio).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                    <Header.Subheader>
                    {t('rex_sellrex_amount_ratio', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    </Header.Subheader>
                </Header>
                <FormMessageError
                  error={formError}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('rex_sellrex_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
                />
                <Divider />
                <Button
                  content={t('cancel')}
                  color="grey"
                  onClick={onClose}
                />
                <Button
                  content={t('rex_sellrex_button', {tokenSymbol:settings.blockchain.tokenSymbol})}
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
            <WalletPanelFormExchangeSellConfirming
              balance={balance}
              decimalSellAmount={decimalSellAmount}
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


export default translate('exchange')(WalletPanelFormExchangeSell);
