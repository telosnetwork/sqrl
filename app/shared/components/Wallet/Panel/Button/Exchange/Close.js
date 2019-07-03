// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormStake from '../../Form/Stake';

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

class WalletPanelButtonExchangeClose extends Component<Props> {
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
        actionName="STAKE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('rex_closerex', {tokenSymbol:settings.blockchain.tokenSymbol}),
          fluid: true,
          icon: 'microchip'
        }}
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
        title={t('rex_closerex_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('exchange')(WalletPanelButtonExchangeClose);
