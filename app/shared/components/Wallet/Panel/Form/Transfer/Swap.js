// @flow
import React, { Component } from 'react';
import { Button, Divider, Dropdown, Form, Label, Message, Table, Icon, Image, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash';

import FormFieldMultiToken from '../../../../Global/Form/Field/MultiToken';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldMemo from '../../../../Global/Form/Field/Memo';
import WalletPanelFormTransferSendConfirming from './Send/Confirming';

import exchangeAccounts from '../../../../../constants/exchangeAccounts';
import { toASCII } from 'punycode';

class WalletPanelFormTransferSwap extends Component<Props> {
  constructor(props) {
    super(props);
    
    const { globals, settings } = props;

    const fromToken = globals && globals.remotetokens 
      && globals.remotetokens.filter((token) => token.symbol==settings.blockchain.tokenSymbol)[0];
    const toToken = globals && globals.remotetokens 
      && globals.remotetokens.filter((token) => token.symbol=='SQRL')[0];

    this.state = {
      fromAsset: settings.blockchain.tokenSymbol,
      toAsset: 'SQRL',
      fromQuantity: '0.0000 TLOS',
      toQuantity: '0.0000 SQRL',
      fromLogo: fromToken ? fromToken.logo : '',
      toLogo: toToken ? toToken.logo : '',
      confirming: false,
      formError: false,
      submitDisabled: true,
      waiting: false,
      waitingStarted: 0
    };
  }

  async fetchConversionData () {
    const { 
      actions,
      globals,
      settings
    } = this.props;
    const { 
      fromAsset,
      toAsset
    } = this.state;

    const fromToken = globals && globals.remotetokens 
      && globals.remotetokens.filter((token) => token.symbol==fromAsset)[0];
    const toToken = globals && globals.remotetokens 
      && globals.remotetokens.filter((token) => token.symbol==toAsset)[0];

    console.log('getting info for from|to:', fromToken, toToken)

    const tokenSettings = await actions.getTable('eosio', settings.account, 'delband');
    console.log('Settings:', tokenSettings);
    const tokenReserves = await actions.getTable('eosio', settings.account, 'delband');
    console.log('Reserves:', tokenReserves);

    /*const fromBalance = await actions.getCurrencyBalance(fromToken.bancor_converter, 
      ['eosio.token:' + settings.blockchain.tokenSymbol, fromToken.account + ':' + fromToken.bancor_converter]);
      */
  }

  onConfirm = () => {
    const {
      fromQuantity,
      toQuantity,
      fromAsset,
      toAsset
    } = this.state;
    this.setState({ confirming: false }, () => {
      //this.props.actions.transfer(from, to, quantity, memo, asset);
    });
  }

  onSubmit = () => {
    this.setState({
      confirming: true,
      waiting: true,
      waitingStarted: new Date()
    });
    const tick = setInterval(this.tick, 250);
    // Make the user wait 3 seconds before they can confirm
    setTimeout(() => {
      clearInterval(tick);
      this.setState({
        waiting: false
      });
    }, 3000);
  }

  tick = () => this.setState({ waiting: true });

  onCancel = (e) => {
    this.setState({
      confirming: false,
      waiting: false
    });
    e.preventDefault();
    return false;
  }

  onChange = (e, { name, value, valid }) => {
    const { globals } = this.props;
    const newState = { [name]: value };
    if (name === 'fromQuantity') {
      const [, asset] = value.split(' ');
      newState.fromAsset = asset;
      const fromToken = globals && globals.remotetokens 
        && globals.remotetokens.filter((token) => token.symbol==asset)[0];
      if (fromToken) {
        newState.fromLogo = fromToken.logo;
      }
    }
    if (name === 'toQuantity') {
      const [, asset] = value.split(' ');
      newState.toAsset = asset;
      const toToken = globals && globals.remotetokens 
        && globals.remotetokens.filter((token) => token.symbol==asset)[0];
      if (toToken) {
        newState.toLogo = toToken.logo;
      }
    }

    newState[`${name}Valid`] = valid;

    newState.submitDisabled = false;
    newState.formError = false;

    this.setState(newState, () => {
      const error = this.errorInForm();

      if (error) {
        this.onError(error);
      }
    });

    this.fetchConversionData();
  }

  onError = (error) => {
    let formError;

    if (error !== true) {
      formError = error;
    }

    this.setState({
      formError,
      submitDisabled: true
    });
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  errorInForm = () => {
    const {
      fromQuantity,
      toQuantity
    } = this.state;

    const {
      settings
    } = this.props;

    if (!fromQuantity || fromQuantity === '' || fromQuantity === '0.'.padEnd(settings.tokenPrecision + 2, '0')) {
      return true;
    }

    if (!toQuantity || toQuantity === '' || toQuantity === '0.'.padEnd(settings.tokenPrecision + 2, '0')) {
      return true;
    }

    return false;
  }

  render() {
    const {
      balances,
      globals,
      onClose,
      settings,
      system,
      t,
      connection
    } = this.props;
    const {
      fromAsset,
      fromLogo,
      toAsset,
      toLogo,
      confirming,
      formError,
      fromQuantity,
      toQuantity,
      submitDisabled,
      waiting,
      waitingStarted
    } = this.state;

    const balance = balances[settings.account];

    return (
      <Form
        loading={system.SWAP_TOKEN === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
        warning={true}
      >
        {(confirming)
          ? (
            <WalletPanelFormTransferSendConfirming
              balances={balances}
              connection={connection}
              fromAsset={fromAsset}
              toAsset={toAsset}
              fromQuantity={fromQuantity}
              toQuantity={toQuantity}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              waiting={waiting}
              waitingStarted={waitingStarted}
            />
          ) : (
            <Segment basic clearing>
              <Message info content="Quickly swap from one token to another using the Telos Bancor Network, subject to each token's available liquidity. There's a 0.20% conversion fee that goes back into the liquidity pool." />
              <Table basic="very">
                <Table.Row>
                  <Table.Cell width="6">
                    <Image 
                      bordered
                      circular 
                      size='tiny'
                      src={fromLogo} 
                      style={{margin:'auto'}}
                    />
                    <FormFieldMultiToken
                      balances={balances}
                      globals={globals}
                      label={t('transfer_swap_from_token')}
                      loading={false}
                      maximum={balance[fromAsset]}
                      name="fromQuantity"
                      onChange={this.onChange}
                      reverseInputs={true}
                      settings={settings}
                      value={fromQuantity}
                      connection={connection}
                      dropdownStyle={{minWidth:'125px'}}
                      style={{width:'100px'}}
                      showAll={true}
                    />
                    <p>
                      {`${balance[fromAsset].toFixed(settings.tokenPrecision)} ${fromAsset} ${t('transfer_swap_available')}`}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name="exchange" size="big" style={{marginLeft:'50px'}} />
                    <p>
                      1 {fromAsset} = {balance[fromAsset].toFixed(settings.tokenPrecision)} {toAsset}
                    </p>
                    <Button primary icon labelPosition='left'>
                      <Icon name='refresh' />
                      Convert
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                  <Image 
                      bordered
                      circular 
                      size='tiny'
                      src={toLogo} 
                      style={{margin:'auto'}}
                    />
                    <FormFieldMultiToken
                      balances={balances}
                      globals={globals}
                      label={t('transfer_swap_to_token')}
                      loading={false}
                      maximum={balance[toAsset]}
                      name="toQuantity"
                      onChange={this.onChange}
                      reverseInputs={true}
                      settings={settings}
                      value={toQuantity}
                      connection={connection}
                      dropdownStyle={{minWidth:'125px'}}
                      style={{width:'100px'}}
                      showAll={true}
                    />
                    <p>
                      {`${balance[toAsset].toFixed(settings.tokenPrecision)} ${toAsset} ${t('transfer_swap_available')}`}
                    </p>
                  </Table.Cell>
                </Table.Row>
              </Table>

              <FormMessageError
                error={formError}
              />

              <Divider />
              <Button
                content={t('confirm')}
                disabled={submitDisabled}
                floated="right"
                primary
              />
              <Button
                onClick={onClose}
              >
                <Icon name="x" /> {t('cancel')}
              </Button>
            </Segment>
          )}
      </Form>
    );
  }
}

export default translate('transfer')(WalletPanelFormTransferSwap);
