// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';
import { Grid, Segment, Form, Divider, Input, Menu, Message, Button, Header, Container } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeConfirming from './Stake/Confirming';
import FormMessageError from '../../../Global/Form/Message/Error';

import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';
import GlobalFormFieldToken from '../../../Global/Form/Field/Token';

type Props = {
  actions: {},
  account: {},
  balance: {},
  system: {}
};

class WalletPanelFormStake extends Component<Props> {
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
      activeTab: 'stake',
      accountName: account.account_name,
      accountNameValid: true,
      confirming: false,
      cpuAmountValid: true,
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalCpuAmount: 0,
      decimalNetAmount: 0,
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
      accountName,
      confirming,
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.props;

    this.setState({
      accountName: accountName || '',
      confirming,
      cpuOriginal: cpuOriginal || cpuAmount || Decimal(0),
      decimalCpuAmount: Decimal(0),
      decimalNetAmount: Decimal(0),
      netOriginal: netOriginal || netAmount || Decimal(0)
    });
  }

  handleTabClick = (e, { name }) => this.setState({ activeTab: name })

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

  stakePercentage = (resource, percentage) => {
    const {
      EOSbalance
    } = this.state;
    const {
      settings
    } = this.props;
    
    const isCpu = (resource == "cpu");
    const resourceName = isCpu ? "cpuAmount" : "netAmount";
    let percentageAmount = isCpu ? 
      EOSbalance * percentage / 100:
      EOSbalance * percentage / 100;

    percentageAmount = percentageAmount.toFixed(settings.tokenPrecision);

    this.validateTokenAmount(null, {
      name: resourceName, 
      value: percentageAmount
    });
  }

  validateTokenAmount = (e, { name, value }) => {
    const {
      settings
    } = this.props;
    
    value = value.split(' ')[0];
    const valid = settings.tokenPrecision == 8 ? 
      !!(value.match(/^\d+(\.\d{1,8})?$/g)) : !!(value.match(/^\d+(\.\d{1,4})?$/g));
    this.onChange(e, { name, value: value, valid });
  }

  onChange = (e, { name, value, valid }) => {
    const {
      actions,
      settings
    } = this.props;

    const {
      checkAccountExists
    } = actions;

    if (name == 'cpuAmount' || name == 'netAmount'){
      value = value.split(' ')[0];

      if (!value) value = 0;
      value = Decimal(value).toFixed(settings.tokenPrecision) + ' ' + settings.blockchain.tokenSymbol;
    }
    
    const newState = {
      [name]: value,
      formError: null,
      submitDisabled: false
    };

    if (name === 'accountName') {
      checkAccountExists(value);
    } else {
      const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      newState[decimalFieldName] = Decimal(value.split(' ')[0]);
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
      account
    } = this.props;

    const {
      accountName,
      accountNameValid,
      activeTab,
      cpuAmountValid,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      EOSbalance,
      netAmountValid,
      netOriginal
    } = this.state;

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

    if (!cpuAmountValid || !netAmountValid) {
      return 'not_valid_stake_amount';
    }

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

    if (activeTab == 'stake') {
      if (decimalCpuAmount.greaterThan(EOSbalance) ||
        decimalNetAmount.greaterThan(EOSbalance) ||
        decimalCpuAmount.plus(decimalNetAmount).greaterThan(EOSbalance)
        )
      {
        return 'not_enough_balance';
      }
    } else {
      if (decimalCpuAmount.greaterThan(cpuOriginal) ||
        decimalNetAmount.greaterThan(netOriginal) ||
        decimalCpuAmount.plus(decimalNetAmount).greaterThan(netOriginal.plus(cpuOriginal))
        )
      {
        return 'not_enough_balance';
      }
      if (cpuOriginal.minus(decimalCpuAmount) <=0 ||
        netOriginal.minus(decimalNetAmount) <=0 ) {
        return 'no_stake_left';
        }
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
      activeTab,
      accountName,
      decimalCpuAmount,
      decimalNetAmount,
      cpuOriginal,
      netOriginal
    } = this.state;

    const {
      setStake
    } = actions;

    this.setState({
      confirming: false
    });

    if (activeTab == 'unstake') {
      setStake(accountName, netOriginal.minus(decimalNetAmount), cpuOriginal.minus(decimalCpuAmount));
    }
    else {
      setStake(accountName, netOriginal.plus(decimalNetAmount), cpuOriginal.plus(decimalCpuAmount));
    }

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
      activeTab,
      accountName,
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

    if (system.ACCOUNT_EXISTS === 'FAILURE' &&
        system.ACCOUNT_EXISTS_LAST_ACCOUNT === accountName) {
      formError = formError || 'account_does_not_exist';
    }
    return (
      <Segment
        loading={system.STAKE === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              {(this.props.accountName && this.props.accountName !== account.account_name)
                ?
                (
                  <Header>
                    {t('update_stake_for_other_header')}
                    <u>{this.props.accountName}</u>
                  </Header>
                ) : ''}
              <WalletPanelFormStakeStats
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
                settings={settings}
              />
              <Menu tabular>
                <Menu.Item name="stake" active={activeTab === 'stake'} onClick={this.handleTabClick} />
                <Menu.Item name="unstake" active={activeTab === 'unstake'} onClick={this.handleTabClick} />
              </Menu>
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                {(!this.props.accountName)
                  ? (
                    <Form.Group widths="equal">
                      <GlobalFormFieldAccount
                        value={accountName}
                        label={t('update_staked_account_name')}
                        name="accountName"
                        onChange={this.onChange}
                      />
                    </Form.Group>
                  ) : ''}
                <Form.Group widths="equal">
                  <GlobalFormFieldToken
                    autoFocus
                    icon="microchip"
                    label={t('update_staked_cpu_amount', {tokenSymbol:settings.blockchain.tokenSymbol,action:activeTab})}
                    name="cpuAmount"
                    onChange={this.onChange}
                    defaultValue={decimalCpuAmount.toFixed(settings.tokenPrecision)}
                    settings={settings}
                  />

                  <GlobalFormFieldToken
                    icon="wifi"
                    label={t('update_staked_net_amount', {tokenSymbol:settings.blockchain.tokenSymbol,action:activeTab})}
                    name="netAmount"
                    onChange={this.onChange}
                    defaultValue={decimalNetAmount.toFixed(settings.tokenPrecision)}
                    settings={settings}
                  />
                </Form.Group>

                  {(activeTab === 'stake' && 0==1)
                    ? (
                      <Grid>
                          <Grid.Row>
                            <Grid.Column width={8} textAlign="center">
                              <Button.Group size="mini">
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'cpu',25)}>25%</Button>
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'cpu',50)}>50%</Button>
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'cpu',75)}>75%</Button>
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'cpu',100)}>100%</Button>
                              </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={8} textAlign="center">
                              <Button.Group size="mini">
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'net',25)}>25%</Button>
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'net',50)}>50%</Button>
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'net',75)}>75%</Button>
                                <Button type="button" onClick={this.stakePercentage.bind(this, 'net',100)}>100%</Button>
                              </Button.Group>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                    ) : ''
                  }
                
                {(activeTab === 'stake')
                ?
                <Message
                  icon="info circle"
                  info
                  content={t('delegate_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
                /> :
                <Message
                  icon="info circle"
                  info
                  content={t('undelegate_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
                />
                  }
                <FormMessageError
                  error={formError}
                />
                <Button
                  content={t('cancel')}
                  color="grey"
                  onClick={onClose}
                  style={{marginTop:"15px"}}
                />
                <Button
                  content={t('update_staked_coins')}
                  color="green"
                  disabled={submitDisabled}
                  floated="right"
                  primary
                  style={{marginTop:"15px"}}
                />
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormStakeConfirming
              account={account}
              accountName={accountName}
              activeTab={activeTab}
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


export default translate('stake')(WalletPanelFormStake);
