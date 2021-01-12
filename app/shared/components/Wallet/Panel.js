// @flow
import React, { Component } from 'react';

import WalletPanelExchange from './Panel/Exchange';
import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';
import WalletPanelWaiting from './Panel/Waiting';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  blockExplorers: {},
  globals: {},
  settings: {},
  system: {},
  transaction: {},
  validate: {},
  keys: {},
  wallet: {}
};

export default class WalletPanel extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      globals,
      isExchange,
      keys,
      rex,
      settings,
      system,
      transaction,
      validate,
      wallet,
      connection
    } = this.props;
    let panel = false;

    if (settings.walletMode === 'wait') {
      return (
        <WalletPanelWaiting />
      );
    }

    if (wallet.data) {
      panel = (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
          connection={connection}
        />
      );
    }
    if ((keys && keys.key) && isExchange && isExchange === true) {
      panel = (
        <WalletPanelExchange
          accounts={accounts}
          actions={actions}
          balances={balances}
          blockExplorers={blockExplorers}
          globals={globals}
          rex={rex}
          settings={settings}
          system={system}
          transaction={transaction}
          validate={validate}
          connection={connection}
        />
      );
    }
    else if ((keys && keys.key) || settings.walletMode === 'watch') {
      panel = (
        <WalletPanelUnlocked
          accounts={accounts}
          actions={actions}
          balances={balances}
          blockExplorers={blockExplorers}
          globals={globals}
          keys={keys}
          settings={settings}
          system={system}
          transaction={transaction}
          validate={validate}
          connection={connection}
        />
      );
    }
    return (
      <div>
        {panel}
      </div>
    );
  }
}
