// @flow
import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import GovernanceArbitrationFormArbitration from '../Form/Arbitration';

class GovernanceArbitrationButtonArbitration extends Component<Props> {
  removeCandidacy = () => {
    const { actions, settings } = this.props;
    actions.unRegisterCandidate(settings.account);
  }

  render() {
    const {
      accounts,
      actions,
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

    let candidate = {};
    leaderboards.forEach((leaderboard) => {
      candidate = leaderboard.candidates.filter ((c) => c.member === settings.account)[0];

      if (candidate){
        return;
      }
    });
    
    return (
      (candidate && candidate.member) ?
        /*
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
        />*/''
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
