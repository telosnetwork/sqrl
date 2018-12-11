// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Container, Header, Message, Segment } from 'semantic-ui-react';

import GovernanceArbitrationArbitration from './Governance/Arbitration/Arbitration';
import GovernanceArbitrationButtonArbitration from './Governance/Arbitration/Button/Arbitration';

class GovernanceArbitration extends Component<Props> {
  componentDidMount() {
    this.sync();
  }
  onChange = (e, { name, selection, value }) => {
    this.setState({ [name]: value }, () => {
      // If this is the dropdown, fire the submit
      if (selection) {
        this.sync();
      }
    });
  }
  onClose = () => {
    const { onCloseArbCandidate } = this.props;
    this.sync();
    //onCloseArbCandidate();
  }
  sync = () => {
    const { actions } = this.props;
    actions.getLeaderBoards();
  }
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      arbitration,
      proposals,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      leaderboards
    } = arbitration;
    const {
      ballots,
      votes
    } = proposals;
    
    return (
      <Segment basic>
        <Header floated="left">
          Arbitration Portal
        </Header>
          <Container floated="right" style={{ marginBottom: '50px' }}>
            <GovernanceArbitrationButtonArbitration
              accounts={accounts}
              actions={actions}
              blockExplorers={blockExplorers}
              leaderboards={leaderboards}
              onClose={this.onClose}
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />
          </Container>
          <Message 
            content={(
              <React.Fragment>
                <p>
                  This portal allows you to participate in the on-chain arbitration process. You can apply to be an arbitrator during open election, vote for arbitrator candidates, or manage arbitration claims using this portal.
                </p>
              </React.Fragment>
            )}
            info
          />
          {([].concat(leaderboards)
            .map((leaderboard) => (
              <GovernanceArbitrationArbitration
                actions={actions}
                key={leaderboard.board_id}
                ballots={ballots}
                blockExplorers={blockExplorers}
                leaderboard={leaderboard}
                settings={settings}
                system={system}
                votes={votes}
              />
            ))
          )}
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceArbitration);
