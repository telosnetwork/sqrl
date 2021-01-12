// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Grid, Header, Segment, Responsive } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';
import NumberFormat from 'react-number-format';

class WalletStatusBalanceSummary extends Component<Props> {
  render() {
    const {
      globals,
      settings,
      statsFetcher,
      t
    } = this.props;
    const {
      tokens,
      totalTokens
    } = statsFetcher.fetchAll();

    let eosPrice = 0;
    let totalUSDValue = 0;
    let usdPrice = 0;
    const totalBalance = totalTokens.toFixed(settings.tokenPrecision);
    if (globals.pricefeed 
      && globals.pricefeed.CUSD
      && globals.pricefeed.CUSD.price
      && globals.pricefeed.CUSD.base == settings.blockchain.tokenSymbol) {
      usdPrice = Decimal(globals.pricefeed.CUSD.price).toFixed(settings.tokenPrecision);
      totalUSDValue = usdPrice * totalBalance;
    }

    if (globals.pricefeed 
      && globals.pricefeed.EOS 
      && globals.pricefeed.EOS.price
      && globals.pricefeed.EOS.base == settings.blockchain.tokenSymbol) {
      eosPrice = Decimal(globals.pricefeed.EOS.price).toFixed(settings.tokenPrecision);
    } else if (settings.blockchain.tokenSymbol == "EOS") {
      eosPrice = 1;
    }

    return (
      <Segment stacked>
        <Header dividing size="small">
          {t('wallet_status_prices_title')}
        </Header>
        <Grid columns={4} divided>
        <Grid.Row>
            <Grid.Column>
              <Header
                content={t('wallet_status_prices_current_price')}
                icon="dollar"
                size="small"
              />

            <div style={{marginLeft:"7px", textAlign:"left", fontWeight: "bold"}}>
              ${Decimal(usdPrice).toFixed(settings.tokenPrecision)} USD
              {' '}
              <Responsive as="span" minWidth={800} />
            </div>

            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('wallet_status_prices_eos_price')}
                icon="exchange"
                size="small"
              />

              <div style={{marginLeft:"2px", textAlign:"left", fontWeight: "bold"}}>
                {Decimal(eosPrice).toFixed(settings.tokenPrecision)} EOS/{settings.blockchain.tokenSymbol}
                {' '}
                <Responsive as="span" minWidth={800} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                icon="dollar"
                size="small"
              ><Header.Content>
                {t('wallet_status_total_balance')} {settings.blockchain.tokenSymbol}
              </Header.Content>
              </Header>

              <div style={{marginLeft:"2px", textAlign:"left", fontWeight: "bold"}}>
                <NumberFormat value={totalTokens.toFixed(settings.tokenPrecision)}
                  displayType={'text'}
                  thousandSeparator={true}
                /> {settings.blockchain.tokenSymbol}
                <Responsive as="span" minWidth={800} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('wallet_status_prices_total_usd')}
                icon="balance scale"
                size="small"
              />

              <div style={{marginLeft:"2px", textAlign:"left", fontWeight: "bold"}}>
                <NumberFormat value={Decimal(totalUSDValue).toFixed(settings.tokenPrecision)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                {' '}
                <Responsive as="span" minWidth={800} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusBalanceSummary);
