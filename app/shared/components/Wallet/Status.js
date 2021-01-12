// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Header, Menu, Segment } from 'semantic-ui-react';

import WalletStatusBalances from './Status/Balances';
import WalletStatusBalanceSummary from './Status/BalanceSummary';
import WalletStatusResources from './Status/Resources';
import WalletStatusStaked from './Status/Staked';
import WalletStatusActions from './Status/Actions';
import WalletStatusWaiting from './Status/Waiting';

import StatsFetcher from '../../utils/StatsFetcher';

class WalletStatus extends Component<Props> {
  state = {
    activeItem: 'balances',
  };
  
  componentDidMount = () => {
    const {
      actions,
      settings
    } = this.props;

    if (settings.account)
      actions.getTable('eosio', settings.account, 'delband');
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      accounts,
      actionHistories,
      actions,
      balances,
      blockExplorers,
      chain,
      connection,
      globals,
      rex,
      settings,
      t,
      tables,
      validate
    } = this.props;

    const {
      activeItem
    } = this.state;

    if (settings.walletMode === 'wait') {
      return <WalletStatusWaiting />;
    }

    const account = accounts[settings.account] || {};
    const balance = balances[settings.account] || {};

    let delegations = tables &&
      tables.eosio &&
      tables.eosio[settings.account] &&
      tables.eosio[settings.account].delband.rows;

    if (!delegations && settings.account.indexOf('.') > 0) {
      const prefix = settings.account.split('.')[0];
      const suffix = settings.account.split('.')[1];
      delegations = 
        tables &&
        tables.eosio &&
        tables.eosio[prefix] &&
        tables.eosio[prefix][suffix] &&
        tables.eosio[prefix][suffix].delband &&
        tables.eosio[prefix][suffix].delband.rows;
    }

    let rexbal = {}
    if (rex && rex.rexbal)
      rexbal = rex.rexbal;
    
    const statsFetcher = new StatsFetcher(account, balance, settings, delegations, rexbal);

    let activeTab = (
      <Segment stacked>
        <Header textAlign="center">
          {t('no_account_data')}
        </Header>
      </Segment>
    );

    if (account && account.account_name) {
      switch (activeItem) {
        case 'balances': {
          activeTab = (
            <WalletStatusBalances
              account={account}
              actions={actions}
              balances={balances}
              globals={globals}
              rex={rex}
              statsFetcher={statsFetcher}
              settings={settings}
              connection={connection}
            />
          );
          break;
        }
        case 'staked': {
          activeTab = (
            <WalletStatusStaked
              account={account}
              statsFetcher={statsFetcher}
              connection={connection}
              settings={settings}
            />
          );
          break;
        }
        case 'actions': {
          activeTab = (
            <WalletStatusActions
              actionHistory={actionHistories[settings.account]}
              actions={actions}
              blockExplorers={blockExplorers}
              chain={chain}
              settings={settings}
              validate={validate}
              connection={connection}
            />
          );
          break;
        }
        case 'data': {
          activeTab = (
            <ReactJson
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={account}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
          );
          break;
        }
        default: {
          break;
        }
      }
    }
    return (
      <div>
        <WalletStatusBalanceSummary
          balances={balances}
          globals={globals}
          statsFetcher={statsFetcher}
          connection={connection}
          settings={settings}
        />

        {(settings.showResourcesInWallet === true) ?
        <WalletStatusResources
          displayResourcesAvailableSetting={settings.displayResourcesAvailable}
          statsFetcher={statsFetcher}
          connection={connection}
        />
        :false}
        <Segment>
          <Menu
            pointing
            size="small"
            secondary
          >
            <Menu.Item
              name="balances"
              icon="list"
              content={t('wallet_status_tab_token_balances')}
              active={activeItem === 'balances'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="staked"
              icon="power cord"
              content={t('wallet_status_tab_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}
              active={activeItem === 'staked'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="actions"
              icon="book"
              content={t('wallet_status_tab_account_history')}
              active={activeItem === 'actions'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="data"
              icon="dna"
              content={t('wallet_status_tab_account_data')}
              active={activeItem === 'data'}
              onClick={this.handleItemClick}
            />
          </Menu>
          {activeTab}
        </Segment>

      </div>
    );
  }
}

export default translate('wallet')(WalletStatus);
