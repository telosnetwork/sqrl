// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';

class WalletPanelFormExchangeUnStakeToStats extends Component<Props> {
  render() {
    const {
      cpuOriginal,
      netOriginal,
      settings,
      t
    } = this.props;

    return (
      <Segment.Group horizontal>
        <Segment>
          <Header textAlign="center">
            {cpuOriginal.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
              {t('cpu_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment>
          <Header textAlign="center">
            {netOriginal.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
            <Header.Subheader>
              {t('net_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}
            </Header.Subheader>
          </Header>
        </Segment>
      </Segment.Group>
    );
  }
}

export default translate('stake')(WalletPanelFormExchangeUnStakeToStats);
