// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Container, Header, Message, Segment } from 'semantic-ui-react';

import GovernanceTFVotingTFVoting from './Governance/TFVoting/TFVoting';
import GovernanceTFVotingButtonTFVoting from './Governance/TFVoting/Button/TFVoting';
import { getTFVoterBalances, getTFNominees, getTFConfig } from '../../actions/governance/tfvoting';

class GovernanceTFVoting extends Component<Props> {
  componentDidMount() {
    const {
      actions
    } = this.props;
    actions.getTFConfig();

    this.tick();
    this.interval = setInterval(this.tick.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getLeaderBoards,
      getTFBoardMembers,
      getTFNominees,
      getTFVoterBalances
    } = actions;
    if (validate && validate.NODE) {
      getTFNominees();
      getTFBoardMembers();
      getLeaderBoards();
      getTFVoterBalances();
    }
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
      tfvoting,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      arbitrators,
      leaderboards
    } = arbitration;
    const {
      ballots,
      votes
    } = proposals;
    
    return (
      <Segment basic>
        <Header floated="left">
          TF Voting Portal
        </Header>
          <Container floated="right" style={{ marginBottom: '75px' }}>
            <GovernanceTFVotingButtonTFVoting
              accounts={accounts}
              actions={actions}
              arbitrators={arbitrators}
              blockExplorers={blockExplorers}
              leaderboards={leaderboards}
              onClose={this.onClose}
              settings={settings}
              system={system}
              tables={tables}
              tfvoting={tfvoting}
              validate={validate}
              wallet={wallet}
            />
          </Container>
          <Message
            content={(
              <React.Fragment>
                <p>
                  This portal allows you to participate in the on-chain voting for the Telos Foundation Board. If you're a TFVT holder, you can submit a nominee, while also joining everyone else in voting for your favorite candidates.
                </p>
              </React.Fragment>
            )}
            info
          />
          {([].concat(leaderboards)
            .filter((board) => { return board.voting_symbol && board.voting_symbol.indexOf('TFVT') != -1 && board.board_id > 0;})
            .map((leaderboard) => (
              <GovernanceTFVotingTFVoting
                actions={actions}
                arbitrators={arbitrators}
                key={leaderboard.board_id}
                ballots={ballots}
                blockExplorers={blockExplorers}
                leaderboard={leaderboard}
                settings={settings}
                system={system}
                tfvoting={tfvoting}
                votes={votes}
                validate={validate}
                wallet={wallet}
              />
            ))
          )}
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceTFVoting);
