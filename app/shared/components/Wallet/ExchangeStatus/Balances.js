// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Grid, Header, Segment, Responsive } from 'semantic-ui-react';
import { bancorConvert } from '../../../actions/rex';

class WalletExchangeStatusBalances extends Component<Props> {
  render() {
    const {
      actions,
      rex,
      settings,
      t
    } = this.props;

    let rexConversionRates = {core_rex: 0, rex_core: 0};
    if (parseFloat(rex.rexpool.total_rex) > 0 && parseFloat(rex.rexpool.total_lendable) > 0) {
        rexConversionRates = {
            core_rex: parseFloat(rex.rexpool.total_rex) / parseFloat(rex.rexpool.total_lendable),
            rex_core: parseFloat(rex.rexpool.total_lendable) / parseFloat(rex.rexpool.total_rex)
        };
    }

    let rexbalance = rex.rexbal || {};
    let rexfund = rex.rexfund || {};
    let rexMaturingEndDate = '';

    if (rexbalance.length < 1 || rexbalance.owner != settings.account) {
      rexbalance.rex_balance = '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' REX';
      rexbalance.matured_rex = '0';
      rexbalance.vote_stake = '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol;
    } else {
      rexMaturingEndDate = '[Matures ' + new Date(rexbalance.rex_maturities[0].first).toString() + ']';
    }
    
    if (rexfund.length < 1 || rexfund.owner != settings.account) {
      rexfund.balance = '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol;
    }

    const matured_rex = rexbalance.matured_rex > 0 ? parseFloat(rex.rexbal.matured_rex / 100000000).toFixed(settings.tokenPrecision) : '0.'.padEnd(settings.tokenPrecision + 2, '0');
    const totalRent = rex.rexpool.total_rent.split(' ')[0];
    const totalUnlent = rex.rexpool.total_unlent.split(' ')[0];

    const sellRatio = bancorConvert(totalRent, totalUnlent, 1);

    return (
      <Segment stacked>
        <Header dividing size="small">
        {t('rex_status_fund_title')}
        </Header>
        <Grid columns={3} celled>
          <Grid.Row>
            <Grid.Column>
              <Header
                content={t('rex_status_fund_coretokens_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
                size="small"
                subheader={t('rex_status_fund_coretokens_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}
              />
            <div className="rexlabel">
              {rexfund.balance}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_fund_lenttokens_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
                size="small"
                subheader={t('rex_status_fund_lenttokens_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}
              />
            <div className="rexlabel">
              {rexbalance.vote_stake} <span style={{fontWeight:"bold", fontSize:"0.8em"}}>{rexMaturingEndDate}</span>
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_fund_matured_title')}
                size="small"
                subheader={t('rex_status_fund_matured_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}
              />
            <div className="rexlabel">
              {matured_rex} {settings.blockchain.tokenSymbol}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header
                content={t('rex_status_fund_rexratio_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
                size="small"
                subheader={t('rex_status_fund_rexratio_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}
              />
            <div className="rexlabel">
              {sellRatio.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_fund_profit_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
                size="small"
                subheader={t('rex_status_fund_profit_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}
              />
            <div className="rexlabel">
              {rexConversionRates.rex_core.toFixed(10)}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_fund_interest_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
                size="small"
                subheader={t('rex_status_fund_interest_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}
              />
            <div className="rexlabel">
            {rexConversionRates.core_rex.toFixed(settings.tokenPrecision)} REX
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('exchange')(WalletExchangeStatusBalances);
