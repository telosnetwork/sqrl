// @flow
import React, { Component } from 'react';
import { Button, Grid, HeartIcon, Message, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import GovernanceTFVotingFormTFVoting from '../Form/TFVoting';
import GovernanceTFNominateFormTFNominate from '../Form/TFNominate';

class GovernanceTFVotingButtonTFVoting extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      applying: false
    };
  }

  applicationSubmitted = () => {
    this.setState({ applying: true });
  }

  removeCandidacy = () => {
    const { actions, settings } = this.props;
    actions.declineNomination();
  }

  render() {
    const {
      accounts,
      actions,
      arbitrators,
      blockExplorers,
      leaderboards,
      onClose,
      settings,
      system,
      t,
      tables,
      tfvoting,
      validate,
      wallet
    } = this.props;
    const {
      applying
    } = this.state;

    let candidate = {};
    let candidateLeaderboard = {};
    leaderboards.forEach((leaderboard) => {
      if (leaderboard.voting_symbol.indexOf('TFVT') != -1 
      && leaderboard.candidates.filter ((c) => c.member === settings.account)[0]
      && leaderboard.board_id == tfvoting.config.open_election_id)
      {
        candidate = leaderboard.candidates.filter ((c) => c.member === settings.account)[0];
      }

      if (candidate && leaderboard.status == 0 && tfvoting.config
        && leaderboard.board_id == tfvoting.config.open_election_id){ // candidate is an applicant in active election
        candidateLeaderboard = leaderboard;
        return;
      }
    });

    let nominee = {};
    if (tfvoting && tfvoting.tfvtnominees) {
      nominee = tfvoting.tfvtnominees.filter((a) => a.nominee === settings.account)[0]; 
      if (!nominee) nominee = {};
    }
    const isNominee = nominee.nominee && nominee.nominee.length > 0;

    //tfvoting.tfvtbalances
    let tfvtHolder = {};
    if (tfvtHolder && tfvoting.tfvtbalances) {
      tfvtHolder = tfvoting.tfvtbalances.filter((a) => a.owner === settings.account)[0]; 
      if (!tfvtHolder) tfvtHolder = {};
    }
    const isTfvtHolder = tfvtHolder.tokens && tfvtHolder.tokens.split(' ')[0] > 0;

    let boardMember = {};
    if (tfvoting && tfvoting.tfvtboardmembers) {
      boardMember = tfvoting.tfvtboardmembers.filter((a) => a.member === settings.account)[0]; 
      if (!boardMember)
      boardMember = {};
    }
    const isBoardMember = boardMember.member && boardMember.member.length > 0;

    let isExpired = false;
    let isTooEarly = false;
    let isStarted = false;

    if (candidateLeaderboard.begin_time && candidateLeaderboard.end_time) {
      isExpired = (candidateLeaderboard.end_time * 1000) < Date.now();
      isTooEarly = (candidateLeaderboard.begin_time * 1000) > Date.now();
      isStarted = (candidateLeaderboard.begin_time * 1000) <= Date.now();
    }
    return ( 
      <Grid container>
      
      {(isNominee) ? 
      <Grid.Row><Grid.Column>
        <Message positive size="small">
        You have been nominated to be a TF Board Member - Congratulations!
        </Message>
        </Grid.Column>
      </Grid.Row>
      :''}

      {(isBoardMember) ? 
      <Grid.Row><Grid.Column>
        <Message positive size="small">
        You have been elected as a TF Board Member - Congrats!
        </Message>
        </Grid.Column>
      </Grid.Row>
      :''}

      {(candidate && candidate.member && candidateLeaderboard.board_id >=0 && candidateLeaderboard.status != 3) ?
        // only remove if we aren't over or havent' started and board isn't closed
        (!isExpired && isTooEarly && !applying) ?
        <Grid.Row><Grid.Column>
          <GlobalTransactionModal
            actionName="GOVERNANCE_DECLINENOMINATION"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'blue',
              content: 'Remove Nomination',
              icon: "circle minus",
              floated: 'right',
              size: 'small'
            }}
            content={(
              <Segment basic clearing>
                <p>
                This will remove your candidacy to become a Telos Foundation Board Member. Are you sure you would like to proceed?
                <Button
                  color='green'
                  content="Remove Nomination"
                  floated="right"
                  icon="folder"
                  loading={system.GOVERNANCE_DECLINENOMINATION === 'PENDING'}
                  style={{ marginTop: 20 }}
                  onClick={() => this.removeCandidacy()}
                  primary
                />
                </p> 
              </Segment>
            )}
            icon="inbox"
            onClose={onClose}
            settings={settings}
            system={system}
            title="Remove Nomination for TF Board"
          />
          </Grid.Column>
        </Grid.Row> : <Grid.Row><Grid.Column><Message negative size="small">Voting On Nominations In Progress</Message></Grid.Column></Grid.Row>
      :''}
      
      { (isNominee && !(candidate && candidate.member) ) ?
        <Grid.Row><Grid.Column>
          <GlobalTransactionModal
            actionName="GOVERNANCE_ACCEPTNOMINATION"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'blue',
              content: 'Accept Nomination',
              icon: "circle plus",
              floated: 'right',
              size: 'small'
            }}
            content={(
              <GovernanceTFVotingFormTFVoting
                accounts={accounts}
                actions={actions}
                applicationSubmitted={this.applicationSubmitted}
                key="TFVotingForm"
                settings={settings}
                system={system}
                tables={tables}
                tfvoting={tfvoting}
                validate={validate}
                wallet={wallet}
              />
            )}
            icon="inbox"
            onClose={onClose}
            settings={settings}
            system={system}
            title="Accept Board Nomination"
            />
            </Grid.Column>
        </Grid.Row>
      :''}

      {(!isStarted && isTfvtHolder) ?
      <Grid.Row><Grid.Column>
        <GlobalTransactionModal
            actionName="GOVERNANCE_NOMINATEBOARDMEMBER"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'blue',
              content: 'Nominate',
              icon: "circle user",
              floated: 'right',
              size: 'small'
            }}
            content={(
              <GovernanceTFNominateFormTFNominate
                accounts={accounts}
                actions={actions}
                applicationSubmitted={this.applicationSubmitted}
                key="TFNominationForm"
                settings={settings}
                system={system}
                tables={tables}
                tfvoting={tfvoting}
                validate={validate}
                wallet={wallet}
              />
            )}
            icon="inbox"
            key="TFNominationContainer"
            onClose={onClose}
            settings={settings}
            system={system}
            title="Nominate"
            />
          </Grid.Column>
      </Grid.Row>
      :''}

    </Grid>

    );
  }
}

export default translate('producers')(GovernanceTFVotingButtonTFVoting);
