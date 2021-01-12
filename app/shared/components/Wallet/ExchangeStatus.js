// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Header, Menu, Segment } from 'semantic-ui-react';

import WalletExchangeStatusPool from './ExchangeStatus/Pool';
import WalletExchangeStatusBalance from './ExchangeStatus/Balances';
import WalletExchangeStatusActions from './ExchangeStatus/Actions';

import TradingViewWidget from 'react-tradingview-widget';

import StatsFetcher from '../../utils/StatsFetcher';

class WalletExchangeStatus extends Component<Props> {
  state = {
    activeItem: 'summary',
  };
  
  componentDidMount = () => {
    const {
      actions,
      settings
    } = this.props;

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
      rex,
      settings,
      t,
      tables,
      validate
    } = this.props;

    const {
      activeItem
    } = this.state;

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
        case 'summary': {
          activeTab = (
            <div>
              <WalletExchangeStatusPool
                rex={rex}
                settings={settings}
                statsFetcher={statsFetcher}
                connection={connection}
              />
              
            </div>
          );
          break;
        }
        /*case 'maturities': {
          activeTab = (
            <WalletExchangeStatusActions
              actionHistory={actionHistories[settings.account]}
              actions={actions}
              blockExplorers={blockExplorers}
              chain={chain}
              rex={rex}
              settings={settings}
              validate={validate}
              connection={connection}
            />
          );
          break;
        }
        case 'loans': {
          activeTab = (
            <WalletExchangeStatusActions
              actionHistory={actionHistories[settings.account]}
              actions={actions}
              blockExplorers={blockExplorers}
              chain={chain}
              rex={rex}
              settings={settings}
              validate={validate}
              connection={connection}
            />
          );
          break;
        }
        case 'orders': {
          activeTab = (
            <WalletExchangeStatusActions
              actionHistory={actionHistories[settings.account]}
              actions={actions}
              blockExplorers={blockExplorers}
              chain={chain}
              rex={rex}
              settings={settings}
              validate={validate}
              connection={connection}
            />
          );
          break;
        }*/
        default: {
          break;
        }
      }
    }
    return (
      /*<Menu.Item
              name="maturities"
              icon="calendar alternate outline"
              content={t('rex_status_maturities')}
              active={activeItem === 'maturities'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="loans"
              icon="history"
              content={t('rex_status_loans')}
              active={activeItem === 'loans'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="orders"
              icon="bars"
              content={t('rex_status_orders')}
              active={activeItem === 'orders'}
              onClick={this.handleItemClick}
            />
      */
      <div>
        <WalletExchangeStatusBalance
          actions={actions}
          rex={rex}
          settings={settings}
          statsFetcher={statsFetcher}
          connection={connection}
        />
        <Segment>
          <Menu
            pointing
            size="small"
            secondary
          >
            <Menu.Item
              name="summary"
              icon="sliders horizontal"
              content={t('rex_status_summary', {tokenSymbol:settings.blockchain.tokenSymbol})}
              active={activeItem === 'summary'}
              onClick={this.handleItemClick}
            />
          </Menu>
          {activeTab}
        </Segment>

      </div>
    );
  }
}

export default translate('exchange')(WalletExchangeStatus);
