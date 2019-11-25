// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Accordion, Menu, Segment } from 'semantic-ui-react';

import WalletPanelButtonLock from './Button/Lock';

import WalletPanelButtonExchangeDeposit from './Button/Exchange/Deposit';
import WalletPanelButtonExchangeWithdraw from './Button/Exchange/Withdraw';

import WalletPanelButtonExchangeBuy from './Button/Exchange/Buy';
import WalletPanelButtonExchangeSell from './Button/Exchange/Sell';
import WalletPanelButtonExchangeUnstakeTo from './Button/Exchange/UnstakeTo';

import WalletPanelButtonExchangeRent from './Button/Exchange/Rent';

import WalletPanelButtonExchangeMoveTo from './Button/Exchange/MoveToSavings';
import WalletPanelButtonExchangeMoveFrom from './Button/Exchange/MoveFromSavings';
import WalletPanelButtonExchangeConsolidate from './Button/Exchange/Consolidate';
import WalletPanelButtonExchangeClose from './Button/Exchange/Close';

class WalletPanelExchange extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      amount: 25,
      querying: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadMore = () => this.setState({ amount: this.state.amount + 25 });

  resetDisplayAmount = () => this.setState({ amount: 25 });
  isQuerying = (querying) => this.setState({ querying });

  tick() {
    const {
      actions,
      rex,
      validate
    } = this.props;
    const {
      getCPULoans,
      getNETLoans,
      getRexBalance,
      getRexFund,
      getRexPool,
      getREXOrders
    } = actions;
    if (validate.NODE) {
      getRexPool();

      if (rex && rex.rexpool){
        getRexBalance();
        getRexFund();
        getREXOrders();
        getCPULoans();
        getNETLoans();
      }
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      connection,
      globals,
      rex,
      settings,
      system,
      transaction,
      t,
      validate
    } = this.props;
    return (
      <div>
        {(settings.walletMode !== 'watch' && !settings.walletTemp && 0==1)
          ? (
            <WalletPanelButtonLock
              lockWallet={actions.lockWallet}
            />
          )
          : ''
        }
        <Segment vertical>

          <Accordion
            as={Menu}
            fluid
            vertical
          >
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0}
                content={t('wallet_exchange_actions')}
                index={0}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 0}
              >
                <Segment.Group>
                  <Segment>
                    <WalletPanelButtonExchangeDeposit
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      connection={connection}
                      rex={rex}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonExchangeWithdraw
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      validate={validate}
                      connection={connection}
                      rex={rex}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonExchangeBuy
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      connection={connection}
                      rex={rex}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonExchangeUnstakeTo
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      connection={connection}
                      rex={rex}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonExchangeSell
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      connection={connection}
                      rex={rex}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonExchangeRent
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      connection={connection}
                      rex={rex}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  </Segment>
                </Segment.Group>
              </Accordion.Content>
            </Menu.Item>
            {(settings.walletMode === 'hot')
              ? (
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 1}
                    content={t('wallet_actions_advanced')}
                    index={1}
                    onClick={this.handleClick}
                  />
                  <Accordion.Content
                    active={activeIndex === 1}
                  >
                  <Segment.Group>
                    <Segment>
                      <WalletPanelButtonExchangeMoveTo
                        actions={actions}
                        accounts={accounts}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        connection={connection}
                        rex={rex}
                        settings={settings}
                        system={system}
                        validate={validate}
                      />
                    </Segment>
                    <Segment>
                      <WalletPanelButtonExchangeMoveFrom
                        actions={actions}
                        accounts={accounts}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        connection={connection}
                        rex={rex}
                        settings={settings}
                        system={system}
                        validate={validate}
                      />
                    </Segment>
                    </Segment.Group>
                  </Accordion.Content>
                </Menu.Item>
              )
              : false
            }
          </Accordion>
        </Segment>
      </div>
    );
  }
}

export default translate('wallet')(WalletPanelExchange);
