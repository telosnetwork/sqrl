// @flow
import React, { Component } from 'react';
import { Button, Message, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import GovernanceArbitrationFormArbitration from '../Form/Arbitration';

class GovernanceArbitrationButtonArbitration extends Component<Props> {
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
    actions.unRegisterCandidate(settings.account);
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
      validate,
      wallet
    } = this.props;
    const {
      applying
    } = this.state;

    let candidate = {};
    let candidateLeaderboard = {};
    leaderboards.forEach((leaderboard) => {
      if (leaderboard.voting_symbol.indexOf('VOTE') != -1 && leaderboard.candidates.filter ((c) => c.member === settings.account)[0])
      {
        candidate = leaderboard.candidates.filter ((c) => c.member === settings.account)[0];
      }

      if (candidate && leaderboard.status == 0){ // candidate is an applicant in active election
        candidateLeaderboard = leaderboard;
        return;
      }
    });

    let arbitrator = {};
    if (arbitrators) {
      arbitrator = arbitrators.filter((a) => a.arb === settings.account)[0]; 
      if (!arbitrator)
        arbitrator = {};
    }
    const isArbitrator = arbitrator.arb && arbitrator.arb.length > 0;

    let isExpired = false;
    let isElectionStarted = false;

    if (candidateLeaderboard.begin_time && candidateLeaderboard.end_time) {
      isExpired = (candidateLeaderboard.end_time * 1000) < Date.now();
      isElectionStarted = (candidateLeaderboard.begin_time * 1000) < Date.now();
    }
    
    return ( 
      (isArbitrator) ? <Message positive size="small">You are an elected arbitrator. Congratulations!</Message>
      :
      // only remove if we aren't over or havent' started and board isn't closed
      (candidate && candidate.member && candidateLeaderboard.board_id >=0 && candidateLeaderboard.status != 3) ?
        
        (!isExpired && !isElectionStarted && !applying) ?
        <GlobalTransactionModal
          actionName="GOVERNANCE_UNREGCANDIDATE"
          actions={actions}
          blockExplorers={blockExplorers}
          button={{
            color: 'blue',
            content: 'Remove Candidacy',
            icon: "circle minus",
            floated: 'right',
            size: 'small'
          }}
          content={(
            <Segment basic clearing>
              <p>
              This will remove your candidacy to become an arbitrator in the network. Are you sure you would like to proceed?
              <Button
                color='green'
                content="Remove Candidacy"
                floated="right"
                icon="folder"
                loading={system.GOVERNANCE_UNREGCANDIDATE === 'PENDING'}
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
          title="Remove Candidacy as Arbitrator"
        /> : <Message negative size="small">Application Pending</Message>
        :
        <GlobalTransactionModal
          actionName="GOVERNANCE_REGCANDIDATE"
          actions={actions}
          blockExplorers={blockExplorers}
          button={{
            color: 'blue',
            content: 'Apply as Arbitrator',
            icon: "circle plus",
            floated: 'right',
            size: 'small'
          }}
          content={(
            <GovernanceArbitrationFormArbitration
              accounts={accounts}
              actions={actions}
              applicationSubmitted={this.applicationSubmitted}
              key="ArbitratorForm"
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />
          )}
          icon="inbox"
          onClose={onClose}
          settings={settings}
          system={system}
          title="Apply as Arbitrator"
          />
    );
  }
}

export default translate('producers')(GovernanceArbitrationButtonArbitration);
