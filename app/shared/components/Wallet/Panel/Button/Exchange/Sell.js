// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormExchangeSell from '../../Form/Exchange/Sell';

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

class WalletPanelButtonExchangeSell extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      rex,
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
      cpu_weight: '0.0000 ' + settings.blockchain.tokenSymbol,
      net_weight: '0.0000 ' + settings.blockchain.tokenSymbol
    };

    const noMaturies = rex.rexbal && rex.rexbal.matured_rex > 0 ? false : true;

    return (
      <GlobalTransactionModal
        actionName="REX_SELLREX"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('rex_sellrex', {tokenSymbol:settings.blockchain.tokenSymbol}),
          fluid: true,
          icon: 'microchip',
          disabled: noMaturies
        }}
        content={(
          <WalletPanelFormExchangeSell
            account={account}
            actions={actions}
            balance={balances[settings.account]}
            cpuAmount={Decimal(cpu_weight.split(' ')[0])}
            key="StakeForm"
            netAmount={Decimal(net_weight.split(' ')[0])}
            onClose={this.onClose}
            rex={rex}
            settings={settings}
            system={system}
            validate={validate}
          />
        )}
        icon="microchip"
        title={t('rex_sellrex_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('exchange')(WalletPanelButtonExchangeSell);
