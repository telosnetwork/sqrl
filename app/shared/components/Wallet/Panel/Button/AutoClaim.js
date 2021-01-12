// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import WalletPanelFormAutoClaim from '../Form/AutoClaim';

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

class WalletPanelButtonAutoClaim extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      settings,
      validate,
      system,
      t
    } = this.props;

    let account = accounts[settings.account];
    if (!account) account = {};
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth || {
      cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
      net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
    };

    return (
      <GlobalTransactionModal
        actionName="CLAIMGBMREWARDS"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('claimgbm_button_cta'),
          fluid: true,
          icon: 'dollar'
        }}
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
        title={t('claimgbm_schedule_rewards')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('stake')(WalletPanelButtonAutoClaim);
