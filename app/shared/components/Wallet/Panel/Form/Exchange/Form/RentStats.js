// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';
import { bancorConvert } from '../../../../../../actions/rex';

class WalletPanelFormExchangeRentStats extends Component<Props> {
  render() {
    const {
      EOSbalance,
      rex,
      REXfund,
      settings,
      t
    } = this.props;
    const totalRent = rex.rexpool.total_rent.split(' ')[0];
    const totalUnlent = rex.rexpool.total_unlent.split(' ')[0];

    const sellRatio = bancorConvert(totalRent, totalUnlent, 1);

    return (
      <Segment.Group horizontal>
        <Segment>
          <Header textAlign="center">
            {(EOSbalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
              {t('rex_rent_core_balance', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment>
          <Header textAlign="center">
            {(REXfund).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
              {t('Currently in deposits', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment>
          <Header textAlign="center">
            {(sellRatio).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
            {t('rex_rent_core_rate', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
      </Segment.Group>
    );
  }
}

export default translate('exchange')(WalletPanelFormExchangeRentStats);
