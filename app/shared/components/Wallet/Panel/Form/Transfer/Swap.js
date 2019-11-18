// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Message, Table, Icon, Image, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import eos from '../../../../../actions/helpers/eos';

import FormFieldMultiToken from '../../../../Global/Form/Field/MultiToken';
import FormMessageError from '../../../../Global/Form/Message/Error';
import WalletPanelFormTransferSwapConfirming from './Swap/Confirming';

class WalletPanelFormTransferSwap extends Component<Props> {
  constructor(props) {
    super(props);
    
    const { globals } = props;

    const fromToken = globals.remotetokens && globals.remotetokens.filter((token) => token.symbol=='QBE')[0];
    const toToken = globals.remotetokens && globals.remotetokens.filter((token) => token.symbol=='SQRL')[0];

    this.state = {
      fromAsset: 'QBE',
      toAsset: 'SQRL',
      quantity: '0.0000 QBE',
      toQuantity: '0.0000 SQRL',
      fromLogo: fromToken ? fromToken.logo : '',
      toLogo: toToken ? toToken.logo : '',
      confirming: false,
      formError: false,
      submitDisabled: true,
      waiting: false,
      waitingStarted: 0,
      values: {
        sourceNetwork: '',
        sourceAsset:'',
        sourceConverter:'',
        sourceQuantity: '',
        sourceTotal: 0,
        sourceFee: 0,
        sourceTotalAfterFee: 0,
        destAsset:'',
        destConverter:'',
        destTotal: 0,
        destFee: 0,
        destTotalAfterFee: 0,
      }
    };
  }

  onConfirm = () => {
    const {
      quantity,
      fromAsset,
      values
    } = this.state;
    const {
      settings
    } = this.props;
    this.setState({ confirming: false }, () => {
      const memo = '1,' + 
        values.sourceConverter.concat(' ').concat(settings.blockchain.tokenSymbol) + ' ' +
        values.destConverter.concat(' ').concat(values.destAsset);
      this.props.actions.transfer(settings.account, values.sourceNetwork, quantity, memo, fromAsset);
      //console.log('submitting SWAP to!!!', quantity, values.sourceNetwork, memo, fromAsset)
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
    if (name === 'quantity') {
      const [quantity, asset] = value.split(' ');
      newState.fromAsset = asset;
      const fromToken = globals.remotetokens && globals.remotetokens.filter((token) => token.symbol==asset)[0];
      if (fromToken) {
        newState.fromLogo = fromToken.logo;
      }
      this.fetchConversionData(asset, this.state.toAsset, name, quantity);
    }
    if (name === 'toQuantity') {
      const [, asset] = value.split(' ');
      newState.toAsset = asset;
      const toToken = globals.remotetokens && globals.remotetokens.filter((token) => token.symbol==asset)[0];
      if (toToken) {
        newState.toLogo = toToken.logo;
      }
      this.fetchConversionData(this.state.fromAsset, asset, name, this.state.quantity.split(' ')[0]);
    }

    newState[`${name}Valid`] = valid;
    newState.formError = false;

    this.setState(newState, () => {
      const error = this.errorInForm();

      if (error) {
        this.onError(error);
      } else {
        this.setState({
          submitDisabled: false
        });
      }
    });
  }


  async fetchConversionData (fromSymbol, toSymbol, editedField, _quantity) {
    const {
      connection,
      globals,
      settings
    } = this.props;
    
    const networkContract = 'eosio.token';
    const fromToken = globals.remotetokens && globals.remotetokens.filter((token) => token.symbol==fromSymbol)[0];
    const toToken = globals.remotetokens && globals.remotetokens.filter((token) => token.symbol==toSymbol)[0];

    const fromSettings = await eos(connection).getTableRows(
      {
        json: true,
        code: fromToken.bancor_converter,
        scope: fromToken.bancor_converter,
        table: 'settings'
      }
    );
    const toSettings = await eos(connection).getTableRows(
      {
        json: true,
        code: toToken.bancor_converter,
        scope: toToken.bancor_converter,
        table: 'settings'
      }
    );

    const fromCoreBalance = await eos(connection).getCurrencyBalance(
      networkContract, fromToken.bancor_converter, settings.blockchain.tokenSymbol);
    const fromTokenBalance = await eos(connection).getCurrencyBalance(
      fromToken.account, fromToken.bancor_converter, fromToken.symbol);

    const toCoreBalance = await eos(connection).getCurrencyBalance(
      networkContract, toToken.bancor_converter, settings.blockchain.tokenSymbol);
    const toTokenBalance = await eos(connection).getCurrencyBalance(
      toToken.account, toToken.bancor_converter, toToken.symbol);

    const _sourceNetwork = fromSettings.rows[0].network;
    const _sourceFee = fromSettings.rows[0].fee;
    const _sourceConverter = fromToken.bancor_converter;
    const _sourceTokenAsset = fromTokenBalance[0].split(' ')[1];
    const _sourceTokenBalance = fromTokenBalance[0].split(' ')[0];
    const _sourceCoreBalance = fromCoreBalance[0].split(' ')[0];
    const _sourceCoreTotal = Decimal(_quantity).div(Decimal(_sourceTokenBalance).plus(_quantity)).mul(_sourceCoreBalance);
    const _sourceCoreTotalAfterFee = _sourceCoreTotal.mul(Decimal(1).sub(Decimal(_sourceFee).div(1000000)).pow(2));
    const _sourceCoreConversionFee = _sourceCoreTotal.sub(_sourceCoreTotalAfterFee);

    console.log('Source Amount:', _quantity, _sourceTokenAsset);
    console.log('Source Core Total:', _sourceCoreTotal.toFixed(8), settings.blockchain.tokenSymbol);
    console.log('Source Conversion Fee:', _sourceCoreConversionFee.toFixed(8), settings.blockchain.tokenSymbol);
    console.log('Source Total - Fee:', _sourceCoreTotalAfterFee.toFixed(8), settings.blockchain.tokenSymbol);

    const _destFee = toSettings.rows[0].fee;
    const _destConverter = toToken.bancor_converter;
    const _destTokenAsset = toTokenBalance[0].split(' ')[1];
    const _destTokenBalance = toTokenBalance[0].split(' ')[0];
    const _destCoreBalance = toCoreBalance[0].split(' ')[0];

    const _destTokenTotal = Decimal(_sourceCoreTotalAfterFee).div(Decimal(_destCoreBalance).plus(_sourceCoreTotalAfterFee)).mul(_destTokenBalance);
    const _destTokenTotalAfterFee = _destTokenTotal.mul(Decimal(1).sub(Decimal(_destFee).div(1000000)).pow(2));
    const _destTokenConversionFee = _destTokenTotal.sub(_destTokenTotalAfterFee);

    console.log('Destination Amount:', _sourceCoreTotalAfterFee.toFixed(8), settings.blockchain.tokenSymbol);
    console.log('Destination Token Total:', _destTokenTotal.toFixed(8), _destTokenAsset);
    console.log('Destination Conversion Fee:', _destTokenConversionFee.toFixed(8), _destTokenAsset);
    console.log('Destination Total - Fee:', _destTokenTotalAfterFee.toFixed(8), _destTokenAsset);

    this.setState({
      values: {
        sourceConverter: _sourceConverter,
        sourceNetwork: _sourceNetwork,
        sourceAsset: _sourceTokenAsset,
        sourceFee: _sourceCoreConversionFee,
        sourceQuantity: _quantity,
        sourceTotal: _sourceCoreTotal,
        sourceTotalAfterFee: _sourceCoreTotalAfterFee,
        destConverter: _destConverter,
        destAsset: _destTokenAsset,
        destFee: _destTokenConversionFee,
        destTotal: _destTokenTotal,
        destTotalAfterFee: _destTokenTotalAfterFee
      }
    });
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
      fromAsset,
      quantity,
      values
    } = this.state;

    const {
      balances,
      settings
    } = this.props;

    if (!quantity || quantity === '' || quantity === '0.'.padEnd(settings.tokenPrecision + 2, '0')) {
      return true;
    }

    const balance = balances[settings.account];
    const qty = quantity.split(' ')[0];
    if (balance[fromAsset] < qty) {
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
      quantity,
      toQuantity,
      submitDisabled,
      waiting,
      waitingStarted,
      values
    } = this.state;

    const balance = balances[settings.account];

    return (
      <Form
        loading={system.TRANSFER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
        warning={true}
      >
        {(confirming)
          ? (
            <WalletPanelFormTransferSwapConfirming
              balance={balance}
              balances={balances}
              connection={connection}
              fromAsset={fromAsset}
              toAsset={toAsset}
              fromLogo={fromLogo}
              toLogo={toLogo}
              quantity={quantity}
              toQuantity={toQuantity}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              settings={settings}
              waiting={waiting}
              waitingStarted={waitingStarted}
              values={values}
            />
          ) : (
            <Segment basic clearing>
              <Message info content={t('transfer_swap_overview')} />
              <Table basic="very">
                <Table.Row>
                  <Table.Cell width="5">
                    <Image 
                      bordered
                      circular 
                      src={fromLogo} 
                      style={{margin:'auto', height:'80px',width:'80px'}}
                    />
                    <FormFieldMultiToken
                      balances={balances}
                      bancorOnly={true}
                      globals={globals}
                      label={t('transfer_swap_from_token')}
                      loading={false}
                      maximum={balance[fromAsset]}
                      name="quantity"
                      onChange={this.onChange}
                      reverseInputs={true}
                      settings={settings}
                      value={quantity}
                      connection={connection}
                      dropdownStyle={{minWidth:'125px'}}
                      style={{width:'125px'}}
                      showAll={true}
                    />
                    <p style={{textAlign:'center'}}>
                      {`${balance[fromAsset].toFixed(settings.tokenPrecision)} ${fromAsset} ${t('transfer_swap_available')}`}
                    </p>
                  </Table.Cell>
                  <Table.Cell width="5" textAlign="center">
                    <Icon 
                      color='orange'
                      name="exchange" 
                      size="big" 
                    />
                    <p style={{fontWeight:'bold'}}>
                      {quantity} = {values.destTotalAfterFee.toFixed(settings.tokenPrecision)} {toAsset}
                    </p>
                    <p>
                    Fee: {values.destFee.toFixed(settings.tokenPrecision)} {toAsset}
                    </p>
                  </Table.Cell>
                  <Table.Cell width="5">
                    <Image 
                      bordered
                      circular 
                      src={toLogo} 
                      style={{margin:'auto', height:'80px',width:'80px'}}
                    />
                    <FormFieldMultiToken
                      balances={balances}
                      bancorOnly={true}
                      globals={globals}
                      label={t('transfer_swap_to_token')}
                      loading={false}
                      maximum={balance[toAsset]}
                      name="toQuantity"
                      noInput={true}
                      onChange={this.onChange}
                      reverseInputs={true}
                      settings={settings}
                      value={toQuantity}
                      connection={connection}
                      dropdownStyle={{minWidth:'245px'}}
                      showAll={true}
                    />
                    <p style={{textAlign:'center'}}>
                      {`${balance[toAsset].toFixed(settings.tokenPrecision)} ${toAsset} ${t('transfer_swap_available')}`}
                    </p>
                  </Table.Cell>
                </Table.Row>
              </Table>

              <FormMessageError
                error={formError}
              />

              <Divider />
              <Button primary icon labelPosition='left'
                disabled={submitDisabled}
                floated="right">
                <Icon name='refresh' />
                {t('Convert')}
              </Button>
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
