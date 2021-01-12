// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';

class GovernanceProposalsProposalVote extends Component<Props> {
  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      button,
      confirm,
      currentMilestone,
      isExpired,
      open,
      proposal,
      pubkey,
      settings,
      system,
      t,
      vote
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName={actionName}
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <Segment basic clearing>
            {(proposal.status !== 'inprogress') ? 
            <p>
            You can no longer vote <strong>{vote}</strong> on worker proposal <strong>{proposal.title} ({proposal.proposal_name})</strong> because voting is not opened.
            </p>
            : 
            <p>
            Please confirm your vote of <strong>{vote}</strong> on <strong>Milestone #{currentMilestone.milestone_id}</strong> in <strong>{proposal.title}</strong>. 
            {confirm}
            </p> 
            }
          </Segment>
        )}
        icon="share square"
        open={open}
        pubkey={pubkey}
        settings={settings}
        system={system}
        title="Submit Vote for Proposal"
      />
    );
  }
}

export default translate('tools')(GovernanceProposalsProposalVote);
