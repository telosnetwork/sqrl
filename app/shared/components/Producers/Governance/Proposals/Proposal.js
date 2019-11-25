// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Header, Message, Segment } from 'semantic-ui-react';
import {Chart} from 'react-google-charts';

import GovernanceProposalsProposalVote from './Proposal/Vote';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import GovernanceProposalsFormProposal from './Form/Proposal';

class GovernanceProposalsProposal extends Component<Props> {
  approve = async (ballot_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 1;
    
    await actions.registerVoter(voter);
    if (settings.mirrorCastOnVote !== false) {
      await actions.mirrorCast(voter);
    }
    actions.voteBallot(voter, ballot_id, vote);
  }
  abstain = async (ballot_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 2;
    
    await actions.registerVoter(voter);
    if (settings.mirrorCastOnVote !== false) {
      await actions.mirrorCast(voter);
    }
    actions.voteBallot(voter, ballot_id, vote);
  }
  oppose = async (ballot_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 0;
    
    await actions.registerVoter(voter);
    if (settings.mirrorCastOnVote !== false) {
      await actions.mirrorCast(voter);
    }
    actions.voteBallot(voter, ballot_id, vote);
  }
  claim = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'claim');
    actions.getProposals();
  }
  openVoting = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'openvoting');
    actions.getProposals();
  }
  cancelSubmission = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'cancelsub');
    actions.getProposals();
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
      accounts,
      actions,
      ballots,
      blockExplorers,
      proposal,
      settings,
      submissions,
      system,
      t,
      tables,
      validate,
      votes,
      wallet
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
      status,
      cycleVoteExpired
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
    const isStarted = (begin_time * 1000) < Date.now();
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const isSupporting = (voted && approved);
    const isAbstaining = (voted && abstained);
    const isAgainst = (voted && against);
    const isPastCycleVoter = proposal.cycleVoteExpired;
    const totalCycles = submission.cycles > 0 ? submission.cycles - 1 : submission.cycles;
    const yesVotes = parseFloat(proposal.yes_count.split(' ')[0]);
    const noVotes = parseFloat(proposal.no_count.split(' ')[0]);
    const absVotes = parseFloat(proposal.abstain_count.split(' ')[0]);
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
            (submission.proposer === settings.account && !isStarted) ?
            <GlobalTransactionModal
                actionName="GOVERNANCE_ACT_ON_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "Cancel Proposal",
                  icon: 'close'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This action will permanently delete the <strong>{submission.title}</strong> worker proposal from the blockchain. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Cancel Proposal"
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
                title="Cancel Worker Proposal"
              />
            : ''}
            {
              (submission.proposer == settings.account && 0==1) ?
              <GlobalTransactionModal
                actionName="GOVERNANCE_EDITPROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'blue',
                  content: 'Modify Proposal',
                  icon: "circle plus",
                  floated: 'right',
                  size: 'small'
                }}
                content={(
                  <GovernanceProposalsFormProposal
                    accounts={accounts}
                    actions={actions}
                    key="ProposalModifyForm"
                    settings={settings}
                    system={system}
                    tables={tables}
                    validate={validate}
                    wallet={wallet}

                    proposal_id={submission.id}
                    amount={submission.amount}
                    ipfs_location={submission.ipfs_location}
                    send_to={submission.receiver}
                    title={submission.title}
                  />
                )}
                icon="inbox"
                //onClose={onClose}
                settings={settings}
                system={system}
                title="Modify"
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
                header={isPastCycleVoter ? "Note: You have voted YES on this worker proposal IN A PREVIOUS CYCLE. This is your chance to vote YES again on this proposal, or change your vote to something else." : "You have voted YES on this worker proposal"}
                icon="checkmark"
                size="tiny"
              />
            )
            : false
          }
          {(isAbstaining)
            ? (
              <Message
                color="yellow"
                header={isPastCycleVoter ? "Note: You have voted to ABSTAIN on this worker proposal IN A PREVIOUS CYCLE. This is your chance to vote ABSTAIN again on this proposal, or change your vote to something else." : "You have voted to ABSTAIN on this worker proposal"}
                icon="minus"
                size="tiny"
              />
            )
            : false
          }
          {(isAgainst)
            ? (
              <Message
                color="red"
                header={isPastCycleVoter ? "Note: You have voted NO on this worker proposal IN A PREVIOUS CYCLE. This is your chance to vote NO again on this proposal, or change your vote to something else." : "You have voted NO on this worker proposal"}
                icon="x"
                size="tiny"
              />
            )
            : false
          }
          <React.Fragment><p><strong>Cycle:</strong> {proposal.cycle_count} of {totalCycles}</p></React.Fragment>
          <React.Fragment><p><strong>Voting Begins:</strong> <Moment>{begin_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Voting Ends:</strong> <Moment>{end_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Amount Requested:</strong> {(submission.amount/10000).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</p></React.Fragment>
          <React.Fragment><p><strong>Receiving Account:</strong> {submission.receiver}</p></React.Fragment>
          <React.Fragment><p><strong>Submission Fee:</strong> {parseFloat(proposalFee).toFixed(settings.tokenPrecision) + ' ' + settings.blockchain.tokenSymbol}</p></React.Fragment>

          {
            (isStarted || isExpired) ?
          <Chart
            width={'90%'}
            chartType="BarChart"
            loader={<div>Loading...</div>}
            data={[
              ['Vote', 'Yes', 'No', 'Abstain'],
              ['', yesVotes, noVotes, absVotes],
            ]}
            legendToggle
            options={{
              chartArea: { width: '99%' },
              legend:{position:'top'},
            }}
          /> : ''}
        
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
                  disabled: isSupporting && !isPastCycleVoter,
                  icon: 'checkmark'
                }}
                confirm={(
                  <Button
                    color={(isSupporting && !isPastCycleVoter) ? 'green' : 'grey'}
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
                  disabled: isAgainst && !isPastCycleVoter,
                  icon: 'x'
                }}
                confirm={(
                  <Button
                    color={(isAgainst && !isPastCycleVoter) ? 'orange' : 'grey'}
                    content={t('confirm')}
                    disabled={isAgainst && !isPastCycleVoter}
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
                  disabled: isAbstaining && !isPastCycleVoter,
                  icon: 'minus'
                }}
                confirm={(
                  <Button
                    color={(isAbstaining && !isPastCycleVoter) ? 'blue' : 'grey'}
                    content={t('confirm')}
                    disabled={isAbstaining && !isPastCycleVoter}
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
