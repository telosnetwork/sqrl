// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Moment from 'react-moment';

import { Grid, Header } from 'semantic-ui-react';

class GovernanceFormRefreshVoteStats extends Component<Props> {
  render() {
    const {
      autoRefreshVote,
      lastRefreshDate,
      nextRefreshDate,
      t
    } = this.props;

    return (
      <Grid columns={2} celled>
        <Grid.Row>
          <Grid.Column>
            <Header textAlign="center">
            {(autoRefreshVote === true) ?
              <div>
              <Moment fromNow>{lastRefreshDate}</Moment>
              <Header.Subheader>
                Last time votes were refreshed (<Moment>{lastRefreshDate}</Moment>)
              </Header.Subheader>
              </div>
              : 
              <div>
                0:00:00
              <Header.Subheader>
                Last time votes were refreshed
              </Header.Subheader>
              </div>
            }
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header textAlign="center">
            {(autoRefreshVote === true) ? 
              <div>
                <Moment fromNow>{nextRefreshDate}</Moment>
                <Header.Subheader>
                  Next time votes will be refreshed (<Moment>{nextRefreshDate}</Moment>)
                </Header.Subheader>
              </div>
              : 
              <div>
                Auto refreshing votes is disabled
              <Header.Subheader>
                Next time votes will be refreshed
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

export default translate('stake')(GovernanceFormRefreshVoteStats);
