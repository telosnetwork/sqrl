// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Accordion, Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';
const { ipcRenderer } = require('electron');

import WalletPanelModalRegisterExchange from './Modal/RegisterExchange/Request';
import WalletPanelModalBuyFiatRequest from './Modal/BuyFiat/Request';
import WalletPanelModalSellFiatRequest from './Modal/SellFiat/Request';
import WalletPanelFormTransferSwap from './Form/Transfer/Swap';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import WalletPanelFormAutoClaim from './Form/AutoClaim';
import WalletPanelFormStake from './Form/Stake';
import WalletPanelModalTransferReceive from './Modal/Transfer/Receive';
import WalletPanelModalTransferSend from './Form/Transfer/Send';
import WalletPanelFormRamBuy from './Form/Ram/Buy';
import WalletPanelFormRamSell from './Form/Ram/Sell';

import WalletModalContentBroadcast from '../Modal/Content/Broadcast';

import WalletPanelButtonLock from './Button/Lock';

const WIN_CLOSED = -1;
const WIN_ACCOUNT_SETTINGS = 0;
const WIN_BUY_TOKENS = 1;
const WIN_SELL_TOKENS = 2;
const WIN_SWAP_TOKENS = 3;
const WIN_UPDATE_STAKED = 4;
const WIN_SEND_TOKENS = 5;
const WIN_RECEIVE_TOKENS = 6;
const WIN_BUY_RAM = 7;
const WIN_SELL_RAM = 8;
const WIN_BROADCAST_TX = 9;
const WIN_CLAIM_REWARDS = 10;

class WalletPanelUnlocked extends Component<Props> {
  state = { 
    activeWindow: WIN_CLOSED
  }

  broadcast = () => {
    ipcRenderer.send('openFile');
    this.onOpen(WIN_BROADCAST_TX);
  }

  onOpen = (window) => this.setState({ activeWindow: window });

  onClose = () => this.setState({ activeWindow: WIN_CLOSED });

  render() {
    const { 
      activeWindow 
    } = this.state;
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      connection,
      globals,
      keys,
      history,
      validate,
      settings,
      system,
      transaction,
      t
    } = this.props;

    const carbonRegistered = globals.exchangecontact && globals.exchangecontact.contactId;
    const contactDetails = globals.exchangecontact && globals.exchangecontact.details;
    const hotWallet = (settings.walletMode === 'hot');
    const menuMargin = {marginBottom:'5px'};

    let account = accounts[settings.account];
    if (!account) account = {};
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth || {
      cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
      net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
    };

    let bancorUnlocked = false;
    if (globals.profiles && globals.profiles.length > 0) {
      const profile = globals.profiles.filter((p) => (p.account == settings.account))[0];
      if (profile && profile.usage) {
        if (profile.usage.split(' ')[0] >= 100)
          bancorUnlocked = true;
      }
    }

    return (
      <div>
        <Segment vertical>
          <Menu compact icon='labeled' className="walletmenuoption" vertical style={{width:'100% !important'}}>
            <Dropdown item simple text={t('wallet_panel_wallet_buy_sell_actions')} icon='dollar'>
              <Dropdown.Menu style={{marginTop:'-75px'}}>
                {(hotWallet) ?
                <Dropdown.Item icon='settings' text={t('wallet_exchange_settings_button_cta')} onClick={()=>this.onOpen(WIN_ACCOUNT_SETTINGS)} />:false}
                {(hotWallet && carbonRegistered) ?
                <Dropdown.Item icon='dollar' text={t('wallet_buytoken_button_cta', {tokenSymbol:settings.blockchain.tokenSymbol})} onClick={()=>this.onOpen(WIN_BUY_TOKENS)} />:false}
                {(hotWallet && carbonRegistered && contactDetails && contactDetails.kycStatusStablecoin === true && 0==1) ?
                <Dropdown.Item icon='money' text={t('wallet_selltoken_button_cta', {tokenSymbol:settings.blockchain.tokenSymbol})} onClick={()=>this.onOpen(WIN_SELL_TOKENS)} />:
                <Dropdown.Item icon='money' text={t('wallet_selltoken_button_cta_vip', {tokenSymbol:settings.blockchain.tokenSymbol})} />}
                {(hotWallet && bancorUnlocked===true) ?
                <Dropdown.Item icon='exchange' text={t('wallet_swaptoken_button_cta')} onClick={()=>this.onOpen(WIN_SWAP_TOKENS)} />:
                <Dropdown.Item icon='exchange' text={t('wallet_swaptoken_button_cta_vip')} />}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item simple text={t('wallet_panel_wallet_send_receive_actions')}  icon='send'>
              <Dropdown.Menu style={{marginTop:'-75px'}}>
                {(settings.blockchain.tokenSymbol === 'WAX') ?
                <Dropdown.Item icon='dollar' text={t('stake:claimgbm_button_cta')} onClick={()=>this.onOpen(WIN_CLAIM_REWARDS)} />:false}
                <Dropdown.Item icon='send' text={t('transfer:transfer_send_button_cta')} onClick={()=>this.onOpen(WIN_SEND_TOKENS)} />
                <Dropdown.Item icon='arrow circle down' text={t('transfer:transfer_receive_button_cta')} onClick={()=>this.onOpen(WIN_RECEIVE_TOKENS)} />
                <Dropdown.Item icon='microchip' text={t('stake:stake_button_cta')} onClick={()=>this.onOpen(WIN_UPDATE_STAKED)} />
                <Dropdown.Item icon='database' text={t('ram:ram_buy_button_cta')} onClick={()=>this.onOpen(WIN_BUY_RAM)} />
                <Dropdown.Item icon='database' text={t('ram:ram_sell_button_cta')} onClick={()=>this.onOpen(WIN_SELL_RAM)} />
                {(settings.walletMode === 'watch') ?
                <Dropdown.Item icon='wifi' text={t('wallet_panel_wallet_broadcast')} onClick={()=>this.onOpen(WIN_BROADCAST_TX)} />:false}
              </Dropdown.Menu>
            </Dropdown>
                
            {(hotWallet) ?
            <Dropdown style={menuMargin} item simple text={t('wallet_panel_wallet_advanced_actions')}  icon='code'>
              <Dropdown.Menu style={{marginTop:'-75px'}}>
                <Dropdown.Item icon='wifi' text={t('wallet_panel_wallet_broadcast')} onClick={()=>this.onOpen(WIN_BROADCAST_TX)} />
              </Dropdown.Menu>
            </Dropdown>:false}
          </Menu>

          {(hotWallet) ?
          <WalletPanelModalRegisterExchange
            accounts={accounts}
            actions={actions}
            connection={connection}
            globals={globals}
            keys={keys}
            history={history}
            onClose={this.onClose}
            open={activeWindow == WIN_ACCOUNT_SETTINGS}
            settings={settings}
            system={system}
          />:false}
          {(hotWallet && carbonRegistered) ?
          <WalletPanelModalBuyFiatRequest
            accounts={accounts}
            actions={actions}
            connection={connection}
            globals={globals}
            keys={keys}
            history={history}
            onClose={this.onClose}
            open={activeWindow == WIN_BUY_TOKENS}
            settings={settings}
            system={system}
          />:false}
          {(hotWallet && carbonRegistered && contactDetails && contactDetails.kycStatusStablecoin === true) ?
          <WalletPanelModalSellFiatRequest
            accounts={accounts}
            actions={actions}
            connection={connection}
            globals={globals}
            keys={keys}
            history={history}
            onClose={this.onClose}
            open={activeWindow == WIN_SELL_TOKENS}
            settings={settings}
            system={system}
          />:false}
          
        {(hotWallet) ?
        <GlobalTransactionModal
          actionName="TRANSFER"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletPanelFormTransferSwap
              actions={actions}
              balances={balances}
              globals={globals}
              settings={settings}
              system={system}
              connection={connection}
            />
          )}
          icon="exchange"
          onClose={this.onClose}
          openModal={activeWindow == WIN_SWAP_TOKENS}
          title={t('transfer:transfer_swap_modal_title')}
          size="medium"
          settings={settings}
          system={system}
        />
        :false}

        <GlobalTransactionModal
          actionName="STAKE"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletPanelFormStake
              account={account}
              accountName={settings.account}
              actions={actions}
              balance={balances[settings.account]}
              cpuAmount={Decimal(cpu_weight.split(' ')[0])}
              key="StakeForm"
              netAmount={Decimal(net_weight.split(' ')[0])}
              onClose={this.onClose}
              settings={settings}
              system={system}
              validate={validate}
            />
          )}
          icon="microchip"
          onClose={this.onClose}
          openModal={activeWindow == WIN_UPDATE_STAKED}
          title={t('stake:update_staked_coins')}
          settings={settings}
          system={system}
        />

        <WalletPanelModalTransferReceive
          accountName={settings.account}
          fluid
          onClose={this.onClose}
          open={activeWindow == WIN_RECEIVE_TOKENS}
        />

        <GlobalTransactionModal
          actionName="TRANSFER"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletPanelModalTransferSend
              actions={actions}
              balances={balances}
              globals={globals}
              settings={settings}
              system={system}
              connection={connection}
            />
          )}
          icon="arrow circle up"
          onClose={this.onClose}
          openModal={activeWindow == WIN_SEND_TOKENS}
          title={t('transfer:transfer_modal_title')}
          settings={settings}
          system={system}
        />

        <GlobalTransactionModal
          actionName="BUYRAM"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletPanelFormRamBuy
              account={account}
              actions={actions}
              balance={balances[settings.account]}
              globals={globals}
              settings={settings}
              system={system}
              connection={connection}
            />
          )}
          icon="database"
          onClose={this.onClose}
          openModal={activeWindow == WIN_BUY_RAM}
          title={t('ram:ram_buy_modal_title')}
          settings={settings}
          system={system}
        />

        <GlobalTransactionModal
          actionName="SELLRAM"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletPanelFormRamSell
              account={account}
              actions={actions}
              balances={balances}
              globals={globals}
              settings={settings}
              system={system}
              connection={connection}
            />
          )}
          icon="database"
          onClose={this.onClose}
          openModal={activeWindow == WIN_SELL_RAM}
          title={t('ram:ram_sell_modal_title')}
          settings={settings}
          system={system}
        />

        {(settings.blockchain.tokenSymbol === 'WAX') ?
        <GlobalTransactionModal
          actionName="CLAIMGBMREWARDS"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletPanelFormAutoClaim
              account={account}
              accounts={accounts}
              accountName={settings.account}
              actions={actions}
              balance={balances[settings.account]}
              cpuAmount={Decimal(cpu_weight.split(' ')[0])}
              key="ClaimForm"
              netAmount={Decimal(net_weight.split(' ')[0])}
              onClose={this.onClose}
              settings={settings}
              system={system}
              validate={validate}
            />
          )}
          icon="dollar"
          onClose={this.onClose}
          openModal={activeWindow == WIN_CLAIM_REWARDS}
          title={t('stake:claimgbm_schedule_rewards')}
          settings={settings}
          system={system}
        />:false}

        {(settings.walletMode == 'watch' || hotWallet) ?
        <GlobalTransactionModal
          actionName="TRANSACTION_BROADCAST"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
            />
          )}
          icon="wifi"
          onOpen={this.broadcast}
          onClose={this.onClose}
          openModal={activeWindow == WIN_BROADCAST_TX}
          title={t('wallet_panel_wallet_broadcast')}
          settings={settings}
          system={system}
          transaction={transaction}
        />:false}

        </Segment>

        {(settings.walletMode !== 'watch' && !settings.walletTemp)
          ? (
            <WalletPanelButtonLock
              lockWallet={actions.lockWallet}
            />
          )
          : ''
        }
      </div>
    );
  }
}

export default translate(['wallet', 'ram', 'stake'])(WalletPanelUnlocked);
