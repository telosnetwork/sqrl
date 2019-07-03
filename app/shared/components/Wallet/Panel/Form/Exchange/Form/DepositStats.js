// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';

class WalletPanelFormExchangeDepositStats extends Component<Props> {
  render() {
    const {
      EOSbalance,
      settings,
      t
    } = this.props;

    return (
      <Segment.Group horizontal>
        <Segment>
          <Header textAlign="center">
            {(EOSbalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
              {t('rex_deposit_amount_avail', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
      </Segment.Group>
    );
  }
}

export default translate('exchange')(WalletPanelFormExchangeDepositStats);
