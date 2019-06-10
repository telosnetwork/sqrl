// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormExchangeWithdraw from '../../Form/Exchange/Withdraw';

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

class WalletPanelButtonExchangeWithdraw extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      blockExplorers,
      settings,
      validate,
      rex,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="REX_WITHDRAW"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('rex_withdraw', {tokenSymbol:settings.blockchain.tokenSymbol}),
          fluid: true,
          icon: 'microchip'
        }}
        content={(
          <WalletPanelFormExchangeWithdraw
            actions={actions}
            key="RexWithdrawForm"
            onClose={this.onClose}
            rex={rex}
            settings={settings}
            system={system}
            validate={validate}
          />
        )}
        icon="microchip"
        title={t('rex_withdraw_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('exchange')(WalletPanelButtonExchangeWithdraw);
