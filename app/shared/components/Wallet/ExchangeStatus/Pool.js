// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Grid, Header, Segment, Responsive } from 'semantic-ui-react';

class WalletExchangeStatusPool extends Component<Props> {
  render() {
    const {
      rex,
      settings,
      t
    } = this.props;

    const rexpool = rex.rexpool ? rex.rexpool : {};
    return (
      
        <Grid columns={3} celled>
          <Grid.Row>
            <Grid.Column>
              <Header
                content={t('rex_status_pool_totalloans_title')}
                //icon="database"
                size="small"
                subheader={t('rex_status_pool_totalloans_desc')}
              />
            <div className="rexlabel">
              {rexpool.loan_num}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_pool_totalrex_title')}
                size="small"
                subheader={t('rex_status_pool_totalrex_desc')}
              />
            <div className="rexlabel">
            {rexpool.total_rex}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_pool_totalrent_title')}
                size="small"
                subheader={t('rex_status_pool_totalrent_desc')}
              />
            <div className="rexlabel">
            {rexpool.total_rent}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header
                content={t('rex_status_pool_totallendable_title', {tokenSymbol:settings.blockchain.tokenSymbol})}
                size="small"
                subheader={t('rex_status_pool_totallendable_desc')}
              />
            <div className="rexlabel">
              <span fontSize="20">{rexpool.total_lendable}</span>
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_pool_totallent_title')}
                size="small"
                subheader={t('rex_status_pool_totallent_desc')}
              />
            <div className="rexlabel">
              {rexpool.total_lent}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('rex_status_pool_totalunlent_title')}
                size="small"
                subheader={t('rex_status_pool_totalunlent_desc')}
              />
            <div className="rexlabel">
              {rexpool.total_unlent}
              <Responsive as="span" minWidth={800} />
            </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
    );
  }
}

export default translate('exchange')(WalletExchangeStatusPool);
