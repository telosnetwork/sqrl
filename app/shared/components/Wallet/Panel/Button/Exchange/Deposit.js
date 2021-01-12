// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormExchangeDeposit from '../../Form/Exchange/Deposit';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  balances: {},
  blockExplorers: {},
  settings: {},
  validate: {},
  system: {},
  t: () => void
};

class WalletPanelButtonExchangeDeposit extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      balances,
      blockExplorers,
      rex,
      settings,
      validate,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="REX_DEPOSIT"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('rex_deposit', {tokenSymbol:settings.blockchain.tokenSymbol}),
          fluid: true,
          icon: 'microchip'
        }}
        content={(
          <WalletPanelFormExchangeDeposit
            actions={actions}
            balance={balances[settings.account]}
            key="RexDepositForm"
            onClose={this.onClose}
            rex={rex}
            settings={settings}
            system={system}
            validate={validate}
          />
        )}
        icon="microchip"
        title={t('rex_deposit_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('exchange')(WalletPanelButtonExchangeDeposit);
