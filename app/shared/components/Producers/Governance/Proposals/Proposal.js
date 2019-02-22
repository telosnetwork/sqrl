// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Header, Message, Segment } from 'semantic-ui-react';

import GovernanceProposalsProposalVote from './Proposal/Vote';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';

class GovernanceProposalsProposal extends Component<Props> {
  approve = (ballot_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 1;
    actions.registerVoter(voter).then( (tx) => {
      actions.mirrorCast(voter).then( (tx) => {
        actions.voteBallot(voter, ballot_id, vote);
      });
    });
  }
  abstain = (ballot_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 2;

    actions.registerVoter(voter).then( (tx) => {
      actions.mirrorCast(voter).then( (tx) => {
        actions.voteBallot(voter, ballot_id, vote);
      });
    });
  }
  oppose = (ballot_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 0;

    actions.registerVoter(voter).then( (tx) => {
      actions.mirrorCast(voter).then( (tx) => {
        actions.voteBallot(voter, ballot_id, vote);
      });
    });
  }
  claim = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'claim');
  }
  openVoting = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'openvoting');
  }
  cancelSubmission = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'cancelsub');
  }
  openLink = (link) => {
    const { settings } = this.props;
    if (link.match(/^\/(ip(f|n)s)\/((\w+).*)/)) {
      shell.openExternal(settings.ipfsProtocol + "://" + settings.ipfsNode + "/" + link);
    } else {
      shell.openExternal(link);
    }
  }
  render() {
    const {
      actions,
      ballots,
      blockExplorers,
      settings,
      proposal,
      submissions,
      system,
      t,
      votes
    } = this.props;
    const {
      prop_id,
      publisher,
      info_url,
      no_count,
      yes_count,
      abstain_count,
      unique_voters,
      begin_time,
      end_time,
      cycle_count,
      status
    } = proposal;
    let ballot = ballots.filter((b) => b.reference_id === prop_id && b.table_id === 0)[0]; 
    if (!ballot)
      ballot = {};
    
    let submission = submissions.filter ((s) => s.ballot_id === ballot.ballot_id)[0];
    if (!submission) submission = {};

    let proposalFee = submission.fee;
    if (proposalFee && proposalFee > 0) proposalFee = proposalFee / 10000; // convert to precision
    const vote = find(votes, ['ballot_id', ballot.ballot_id]);
    const voted = !!(vote);
    const against = (voted) ? (vote.directions[0]=='0') : false;
    const approved = (voted) ? (vote.directions[0]=='1') : false;
    const abstained = (voted) ? (vote.directions[0]=='2') : false;
    const isExpired = (end_time * 1000) < Date.now();
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const isSupporting = (voted && approved);
    const isAbstaining = (voted && abstained);
    const isAgainst = (voted && against);
    return (
      <React.Fragment>
        <Header
          as={Segment}
          loading={system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING'}
          color="black"
          block
          size="huge"
        >
          {submission.title} (#{submission.id})
          <Header.Subheader>
            <p floated="left">Proposed By <strong>{submission.proposer}</strong></p>
            {
            (submission.proposer === settings.account && proposal.cycle_count === 0 && proposal.status === 0) ?
            <GlobalTransactionModal
                actionName="GOVERNANCE_ACT_ON_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "Start Ballot",
                  icon: 'folder'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This action will open the <strong>{submission.title}</strong> worker proposal's ballot for voting by other users on the network. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Start Ballot"
                      floated="right"
                      icon="folder"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.openVoting(submission.id)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Open Voting for Proposal"
              />
            : ''}
            {
            (submission.proposer === settings.account && proposal.cycle_count === 0 && proposal.status === 0) ?
            <GlobalTransactionModal
                actionName="GOVERNANCE_ACT_ON_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "Delete Proposal",
                  icon: 'close'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This action will permanently delete the <strong>{submission.title}</strong> worker proposal from the blockchain. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Delete Proposal"
                      floated="right"
                      icon="delete"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.cancelSubmission(submission.id)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Delete Worker Proposal"
              />
            : ''}
            {
            (submission.proposer === settings.account && proposal.status === 0 && isExpired) ?
              <GlobalTransactionModal
                actionName="GOVERNANCE_ACT_ON_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "Claim",
                  icon: 'dollar'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This will claim the funds for the <strong>{submission.title}</strong> worker proposal and 
                    make a deposit to the <strong>{submission.receiver}</strong> account.
                    <Button
                      color='green'
                      content="Claim Funds"
                      floated="right"
                      icon="checkmark"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.claim(submission.id)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Claim Worker Proposal Funds"
              />
            : ''}
          </Header.Subheader>
        </Header>
        <Segment attached>
          {(isSupporting)
            ? (
              <Message
                color="green"
                header="You have voted YES on this worker proposal."
                icon="checkmark"
              />
            )
            : false
          }
          {(isAbstaining)
            ? (
              <Message
                color="yellow"
                header="You have voted to ABSTAIN on this worker proposal."
                icon="minus"
              />
            )
            : false
          }
          {(isAgainst)
            ? (
              <Message
                color="red"
                header="You have voted NO on this worker proposal."
                icon="x"
              />
            )
            : false
          }
          <React.Fragment><p><strong>Voting Begins:</strong> <Moment>{begin_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Voting Ends:</strong> <Moment>{end_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Amount Requested:</strong> {submission.amount} {settings.blockchain.tokenSymbol} in {cycle_count} cycle(s)</p></React.Fragment>
          <React.Fragment><p><strong>Requesting Account:</strong> {submission.receiver}</p></React.Fragment>
          <React.Fragment><p><strong>Worker Proposal Fee:</strong> {proposalFee + ' ' + settings.blockchain.tokenSymbol}</p></React.Fragment>
          <React.Fragment><p><strong>Yes Votes:</strong> {proposal.yes_count}</p></React.Fragment>
          <React.Fragment><p><strong>No Votes:</strong> {proposal.no_count}</p></React.Fragment>
          <React.Fragment><p><strong>Abstain Votes:</strong> {proposal.abstain_count}</p></React.Fragment>
        
          <React.Fragment>
            {
              (proposal.info_url) ? 
              <p>For more information on this proposal, please visit this IPFS url: 
                <a
                  onClick={() => this.openLink(proposal.info_url)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                > {proposal.info_url}</a>
              </p>
              : ''
            }
          </React.Fragment>

          {
            (proposal.cycle_count > 0 && !isExpired) ?
            <React.Fragment>
              <React.Fragment><p>Please use the buttons below to specify your vote for this proposal.</p></React.Fragment>
              
              <GovernanceProposalsProposalVote
                actionName="GOVERNANCE_VOTE_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'grey',
                  content: t('Yes'),
                  disabled: isSupporting,
                  icon: 'checkmark'
                }}
                confirm={(
                  <Button
                    color={(isSupporting) ? 'green' : 'grey'}
                    content={t('confirm')}
                    floated="right"
                    icon="checkmark"
                    loading={isVotePending}
                    style={{ marginTop: 10 }}
                    onClick={() => this.approve(ballot.ballot_id)}
                    primary
                  />
                )}
                isExpired={isExpired}
                proposal={proposal}
                settings={settings}
                submission={submission}
                system={system}
                vote="Yes"
              />
              <GovernanceProposalsProposalVote
                actionName="GOVERNANCE_VOTE_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'grey',
                  content: t('No'),
                  disabled: isAgainst,
                  icon: 'x'
                }}
                confirm={(
                  <Button
                    color={(isAgainst) ? 'orange' : 'grey'}
                    content={t('confirm')}
                    disabled={isAgainst}
                    floated="right"
                    icon="checkmark"
                    loading={isVotePending}
                    style={{ marginTop: 10 }}
                    onClick={() => this.oppose(ballot.ballot_id)}
                    primary
                  />
                )}
                isExpired={isExpired}
                proposal={proposal}
                settings={settings}
                submission={submission}
                system={system}
                vote="No"
              />
              <GovernanceProposalsProposalVote
                actionName="GOVERNANCE_VOTE_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'grey',
                  content: t('Abstain'),
                  disabled: isAbstaining,
                  icon: 'minus'
                }}
                confirm={(
                  <Button
                    color={(isAbstaining) ? 'blue' : 'grey'}
                    content={t('confirm')}
                    disabled={isAbstaining}
                    floated="right"
                    icon="checkmark"
                    loading={isVotePending}
                    style={{ marginTop: 10 }}
                    onClick={() => this.abstain(ballot.ballot_id)}
                    primary
                  />
                )}
                isExpired={isExpired}
                proposal={proposal}
                settings={settings}
                submission={submission}
                system={system}
                vote="Abstain"
              />
            </React.Fragment>
            : 
            <React.Fragment><p>The ballot for proposal is currently closed.</p></React.Fragment>}
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(GovernanceProposalsProposal);
