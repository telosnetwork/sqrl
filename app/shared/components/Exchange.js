// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SidebarAccount from '../containers/Sidebar/Account';

import WalletPanel from './Wallet/Panel';
import WalletExchangeStatus from './Wallet/ExchangeStatus';

type Props = {
  accounts: {},
  actionHistories: {},
  actions: {},
  balances: {},
  balances: {},
  blockExplorers: {},
  globals: {},
  keys: {},
  rex: {},
  settings: {},
  system: {},
  tables: {},
  transaction: {},
  validate: {},
  wallet: {},
};

export default class Exchange extends Component<Props> {
  props: Props;

  render() {
    const {
      actionHistories,
      actions,
      accounts,
      balances,
      blockExplorers,
      chain,
      connection,
      globals,
      keys,
      rex,
      settings,
      system,
      tables,
      transaction,
      validate,
      wallet
    } = this.props;

    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={5}>
            <SidebarAccount />
            <WalletPanel
              actions={actions}
              accounts={accounts}
              balances={balances}
              blockExplorers={blockExplorers}
              globals={globals}
              isExchange={true}
              keys={keys}
              rex={rex}
              settings={settings}
              system={system}
              transaction={transaction}
              validate={validate}
              wallet={wallet}
              connection={connection}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <WalletExchangeStatus
              actions={actions}
              actionHistories={actionHistories}
              accounts={accounts}
              balances={balances}
              blockExplorers={blockExplorers}
              chain={chain}
              connection={connection}
              globals={globals}
              keys={keys}
              rex={rex}
              settings={settings}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
