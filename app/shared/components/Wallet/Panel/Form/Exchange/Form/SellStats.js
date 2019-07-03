// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';

class WalletPanelFormExchangeSellStats extends Component<Props> {
  render() {
    const {
      rex,
      REXbalance,
      settings,
      t
    } = this.props;

    const totalRex = rex.rexpool.total_rex.split(' ')[0];
    const totalLendable = rex.rexpool.total_lendable.split(' ')[0];
    const sellRatio = totalRex > 0 ? parseFloat(totalLendable) / parseFloat(totalRex) * REXbalance : 0;

    return (
      <Segment.Group horizontal>
        <Segment>
          <Header textAlign="center">
            {(REXbalance).toFixed(settings.tokenPrecision)} REX
            <Header.Subheader>
              {t('rex_sellrex_amount_avail', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment>
          <Header textAlign="center">
            {(sellRatio).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
            {t('rex_sellrex_amount_ratio', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
      </Segment.Group>
    );
  }
}

export default translate('exchange')(WalletPanelFormExchangeSellStats);
