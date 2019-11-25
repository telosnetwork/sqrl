// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';

class WalletPanelFormExchangeSavingsStats extends Component<Props> {
  coreBalance (totalRex, totalLendable, amount) {
    return parseFloat(totalLendable) / parseFloat(totalRex) * amount;
  }
  render() {
    const {
      rex,
      settings,
      t
    } = this.props;

    const totalRex = rex.rexpool.total_rex.split(' ')[0];
    const totalLendable = rex.rexpool.total_lendable.split(' ')[0];
    const maturingRex = rex.rexbal && rex.rexbal.rex_maturities && rex.rexbal.rex_maturities[0];
    const savingsRex = rex.rexbal && rex.rexbal.rex_maturities && rex.rexbal.rex_maturities[1];
    const maturedRex = rex.rexbal && rex.rexbal.matured_rex;

    let maturedBalance = 0;
    let maturingBalance = 0;
    let savingsBalance = 0;
    if (maturingRex && maturingRex.second)
      maturingBalance = this.coreBalance(totalRex, totalLendable, maturingRex.second/10000);
    if (savingsRex && savingsRex.second)
      savingsBalance = this.coreBalance(totalRex, totalLendable, savingsRex.second/10000);
    if (maturedRex) 
      maturedBalance = this.coreBalance(totalRex, totalLendable, maturedRex/10000);

    return (
      <Segment basic>
        <Segment.Group horizontal>
          <Segment>
            <Header textAlign="center">
              {(maturedBalance+maturingBalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
              {t('rex_savings_amount_core_available', {tokenSymbol:settings.blockchain.tokenSymbol})}
              </Header.Subheader>
            </Header>
          </Segment>
          <Segment>
            <Header textAlign="center">
              {(savingsBalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
                {t('rex_sellrex_amount_savings', {tokenSymbol:settings.blockchain.tokenSymbol})}
              </Header.Subheader>
            </Header>
          </Segment>
        </Segment.Group>
      </Segment>
    );
  }
}

export default translate('exchange')(WalletPanelFormExchangeSavingsStats);
