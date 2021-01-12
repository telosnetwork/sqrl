// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalTransactionModal from '../Global/Transaction/Modal';
import GovernanceFormRefreshVote from './RefreshVote/RefreshVote';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  accounts: {},
  balances: {},
  blockExplorers: {},
  settings: {},
  validate: {},
  system: {},
  t: () => void
};

class GovernanceButtonRefreshVote extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      actionHistories,
      accounts,
      balances,
      blockExplorers,
      producers,
      settings,
      validate,
      system,
      t
    } = this.props;

    let account = accounts[settings.account];
    if (!account) account = {};

    return (
      <GlobalTransactionModal
        actionName="REFRESHVOTE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: 'Auto Refresh Proxy Vote',
          fluid: true,
          icon: 'sync'
        }}
        content={(
          <GovernanceFormRefreshVote
            account={account}
            accounts={accounts}
            accountName={settings.account}
            actions={actions}
            actionHistories={actionHistories}
            balance={balances[settings.account]}
            key="RefreshVotes"
            onClose={this.onClose}
            producers={producers}
            settings={settings}
            system={system}
            validate={validate}
          />
        )}
        icon="sync"
        title="Auto Refresh Proxy Vote"
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('stake')(GovernanceButtonRefreshVote);
