// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Accordion, Menu, Segment } from 'semantic-ui-react';

import WalletPanelButtonBroadcast from './Button/Broadcast';
import WalletPanelButtonLock from './Button/Lock';
import WalletPanelButtonStake from './Button/Stake';
import WalletPanelButtonAutoClaim from './Button/AutoClaim';

import WalletPanelButtonRegisterExchange from './Button/RegisterExchange';
import WalletPanelButtonBuyFiat from './Button/BuyFiat';
import WalletPanelButtonSwapToken from './Button/SwapToken';

import WalletPanelButtonTransferReceive from './Button/Transfer/Receive';
import WalletPanelButtonTransferSend from './Button/Transfer/Send';

import WalletPanelButtonRamSell from './Button/Ram/Sell';
import WalletPanelButtonRamBuy from './Button/Ram/Buy';

class WalletPanelUnlocked extends Component<Props> {
  state = { activeIndex: 0 }

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
      globals,
      keys,
      validate,
      settings,
      system,
      transaction,
      t,
      connection
    } = this.props;

    const carbonRegistered = globals.exchangecontact && globals.exchangecontact.contactId;

    return (
      <div>
        {(settings.walletMode !== 'watch' && !settings.walletTemp)
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
            exclusive={false}
          >
            {(settings.walletMode === 'hot')
              ? (
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0 || activeIndex === 1}
                content="Exchange Actions"
                index={0}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 0 || activeIndex === 1}
              >
                <Segment.Group>
                    <Segment>
                    <WalletPanelButtonRegisterExchange
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      globals={globals}
                      keys={keys}
                      validate={validate}
                      settings={settings}
                      system={system}
                      connection={connection}
                    />
                    </Segment>
                    {(carbonRegistered ?
                    <Segment>
                      <WalletPanelButtonBuyFiat
                        actions={actions}
                        accounts={accounts}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        globals={globals}
                        keys={keys}
                        validate={validate}
                        settings={settings}
                        system={system}
                        connection={connection}
                      />
                    </Segment>
                     :'')}
                    {(carbonRegistered && 0==1 ?
                    <Segment>
                      <WalletPanelButtonSwapToken
                        actions={actions}
                        accounts={accounts}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        globals={globals}
                        keys={keys}
                        validate={validate}
                        settings={settings}
                        system={system}
                        connection={connection}
                      />
                    </Segment>
                    :'')}
                  </Segment.Group>
              </Accordion.Content>
            </Menu.Item>
              ):false}
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0 || activeIndex === 1}
                content={t('wallet_actions')}
                index={1}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 0 || activeIndex === 1}
              >
                <Segment.Group>
                {(settings.blockchain.tokenSymbol === 'WAX')
                    ? (
                  <Segment>
                    <WalletPanelButtonAutoClaim
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      validate={validate}
                      settings={settings}
                      system={system}
                      connection={connection}
                    />
                  </Segment>
                    ) : ''}
                  <Segment>
                    <WalletPanelButtonStake
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      validate={validate}
                      settings={settings}
                      system={system}
                      connection={connection}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonTransferSend
                      actions={actions}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      settings={settings}
                      system={system}
                      connection={connection}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonTransferReceive
                      accountName={settings.account}
                      connection={connection}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonRamBuy
                      account={accounts[settings.account]}
                      actions={actions}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      globals={globals}
                      settings={settings}
                      system={system}
                      connection={connection}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonRamSell
                      account={accounts[settings.account]}
                      actions={actions}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      globals={globals}
                      settings={settings}
                      system={system}
                      connection={connection}
                    />
                  </Segment>
                  {(settings.walletMode === 'watch')
                    ? (
                      <Segment>
                        <WalletPanelButtonBroadcast
                          actions={actions}
                          blockExplorers={blockExplorers}
                          settings={settings}
                          system={system}
                          transaction={transaction}
                          connection={connection}
                        />
                      </Segment>
                    )
                    : false
                  }
                </Segment.Group>
              </Accordion.Content>
            </Menu.Item>
            {(settings.walletMode === 'hot')
              ? (
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 2}
                    content={t('wallet_actions_advanced')}
                    index={2}
                    onClick={this.handleClick}
                  />
                  <Accordion.Content
                    active={activeIndex === 2}
                  >
                    <Segment basic>
                      <WalletPanelButtonBroadcast
                        actions={actions}
                        blockExplorers={blockExplorers}
                        settings={settings}
                        system={system}
                        transaction={transaction}
                        connection={connection}
                      />
                    </Segment>
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

export default translate('wallet')(WalletPanelUnlocked);
