// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Moment from 'react-moment';

import { Grid, Header } from 'semantic-ui-react';

class WalletPanelFormAutoClaimStats extends Component<Props> {
  render() {
    const {
      lastClaimTime,
      nextClaimTime,
      rewardsDue,
      stakedBalance,
      settings,
      t
    } = this.props;

    return (
      <Grid columns={2} celled>
        <Grid.Row>
          <Grid.Column>
            <Header textAlign="center">
              {(stakedBalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
                {t('claimgbm_total_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header textAlign="center">
              {(rewardsDue).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
                {t('claimgbm_rewards_due', {tokenSymbol:settings.blockchain.tokenSymbol})}
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header textAlign="center">
              <Moment fromNow>{lastClaimTime}</Moment>
              <Header.Subheader>
                {t('claimgbm_last_claimed')} (<Moment>{lastClaimTime}</Moment>)
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header textAlign="center">
            <Moment fromNow>{nextClaimTime}</Moment>
              <Header.Subheader>
                {t('claimgbm_next_eligible_claim')} (<Moment>{nextClaimTime}</Moment>)
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate('stake')(WalletPanelFormAutoClaimStats);
