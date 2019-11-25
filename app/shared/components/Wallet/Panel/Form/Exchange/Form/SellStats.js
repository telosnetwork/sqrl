// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Header, Segment } from 'semantic-ui-react';

class WalletPanelFormExchangeSellStats extends Component<Props> {
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
    let maturedRex = rex.rexbal && rex.rexbal.matured_rex;

    let maturedBalance = 0;
    let maturingBalance = 0;
    let maturingDate = '';
    let savingsBalance = 0;
    if (maturingRex && maturingRex.second) {
      maturingBalance = this.coreBalance(totalRex, totalLendable, maturingRex.second/10000);
      maturingDate = 'Maturing on ' + new Date(maturingRex.first).toString();
    }
    if (savingsRex && savingsRex.second)
      savingsBalance = this.coreBalance(totalRex, totalLendable, savingsRex.second/10000);

    if (maturingRex && new Date(maturingRex.first) < new Date()) { // expired
      maturedRex = Decimal(maturedRex).plus(maturingRex.second);
      maturingBalance = 0;
      maturingDate = '';
    }
    if (maturedRex) 
      maturedBalance = this.coreBalance(totalRex, totalLendable, maturedRex/10000);

    return (
      <Segment basic>
        <Segment.Group horizontal>
          <Segment>
            <Header textAlign="center">
              {(maturingBalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
              {t('rex_sellrex_amount_maturing', {tokenSymbol:settings.blockchain.tokenSymbol})}
              </Header.Subheader>
              <Header.Content>
                <p style={{fontSize:'9pt'}}>
                  {maturingDate}  
                </p>
              </Header.Content>
            </Header>
          </Segment>
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment>
            <Header textAlign="center">
              {(maturedBalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
              {t('rex_sellrex_amount_ratio', {tokenSymbol:settings.blockchain.tokenSymbol})}
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

export default translate('exchange')(WalletPanelFormExchangeSellStats);
