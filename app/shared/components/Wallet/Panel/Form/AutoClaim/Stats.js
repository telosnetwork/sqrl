// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Moment from 'react-moment';

import { Grid, Header } from 'semantic-ui-react';

class WalletPanelFormAutoClaimStats extends Component<Props> {
  render() {
    const {
      claimGBMRewards,
      lastClaimTime,
      nextClaimTime,
      rewardsDue,
      stakedBalance,
      settings,
      t
    } = this.props;

    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column>
            <Header textAlign="center">
              {(stakedBalance).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
              <Header.Subheader>
                {t('claimgbm_total_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} >
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
            {(claimGBMRewards === true) ? 
              <div>
              <Moment fromNow>{nextClaimTime}</Moment>
              <Header.Subheader>
                {t('claimgbm_next_eligible_claim')} (<Moment>{nextClaimTime}</Moment>)
              </Header.Subheader>
              </div>
              :  
              <div>
                Automatic claiming is disabled
              <Header.Subheader>
                Next time rewards can be claimed
              </Header.Subheader>
              </div>
              }
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate('stake')(WalletPanelFormAutoClaimStats);
