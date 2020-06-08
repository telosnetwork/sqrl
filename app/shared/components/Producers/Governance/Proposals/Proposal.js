// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Header, Image, Label, List, Message, Segment, Table } from 'semantic-ui-react';
import {Chart} from 'react-google-charts';
import avatarPlaceholder from '../../../../../renderer/assets/images/profile.png';
import NumberFormat from 'react-number-format';

import GovernanceProposalsProposalVote from './Proposal/Vote';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import GovernanceProposalsFormProposal from './Form/Proposal';

class GovernanceProposalsProposal extends Component<Props> {
  approve = async (proposal_name) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = ['yes'];
    
    await actions.registerVoter(voter);
    await actions.voteBallot(voter, proposal_name, vote);
    actions.getVoteInfo(proposal_name);
  }
  abstain = async (proposal_name) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = ['abstain'];
    
    await actions.registerVoter(voter);
    await actions.voteBallot(voter, proposal_name, vote);
    actions.getVoteInfo(proposal_name);
  }
  oppose = async (proposal_name) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = ['no'];
    
    await actions.registerVoter(voter);
    await actions.voteBallot(voter, proposal_name, vote);
    actions.getVoteInfo(proposal_name);
  }
  claim = async (proposal_name, reportUrl) => {
    const { actions } = this.props;
    await actions.actOnProposal(proposal_name, 'submitreport');
    await actions.actOnProposal(proposal_name, 'closems');
    await actions.actOnProposal(proposal_name, 'claimfunds');
    await actions.actOnProposal(proposal_name, 'nextms');
    await actions.actOnProposal(proposal_name, 'withdraw');
    actions.getProposalSubmissions();
  }
  openVoting = async (proposal_name, fee_amount, title) => {
    const { actions } = this.props;
    await actions.actOnProposal(proposal_name, 'launchprop', fee_amount, title);
    actions.getProposalSubmissions();
  }
  cancelSubmission = async (proposal_name) => {
    const { actions } = this.props;
    await actions.actOnProposal(proposal_name, 'cancelprop');
    actions.getProposalSubmissions();
  }
  deleteSubmission = async (proposal_name) => {
    const { actions } = this.props;
    await actions.actOnProposal(proposal_name, 'deleteprop');
    actions.getProposalSubmissions();
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
      globals,
      proposal,
      proposals,
      settings,
      submissions,
      system,
      t,
      tables,
      validate,
      votes,
      wallet
    } = this.props;

    let totalRequested = proposal.total_requested.split(' ')[0];

    const feePercent = parseFloat(proposals.wpsconfig.fee_percent).toFixed(settings.tokenPrecision);
    const feeMin = parseFloat(proposals.wpsconfig.min_fee.split(' ')[0]);
    let proposalFee = parseFloat(totalRequested * feePercent / 100);
    if (proposalFee < feeMin || isNaN(proposalFee))
      proposalFee = feeMin;

    const voted = proposal.attrVoted;
    const against = proposal.attrVotedNo;
    const approved = proposal.attrVotedYes;
    const abstained = proposal.attrVotedAbstain;
    const isExpired = proposal.attrIsExpired;
    const isStarted = proposal.attrIsActive;
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' 
      || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING'
      || system.GOVERNANCE_ACT_ON_PROPOSAL === 'PENDING');
    const isSupporting = (voted && approved);
    const isAbstaining = (voted && abstained);
    const isAgainst = (voted && against);
    const isPastCycleVoter = proposal.cycleVoteExpired;
    const yesVotes = parseFloat(proposal.tallyYes.split(' ')[0]);
    const noVotes = parseFloat(proposal.tallyNo.split(' ')[0]);
    const absVotes = parseFloat(proposal.tallyAbstain.split(' ')[0]);
    const remainingAmount = proposal.remaining.split(' ')[0];
    const proposalVotes = proposal.votes || [];
    const currentMilestone = proposal.milestones.filter((m)=>m.milestone_id==proposal.current_milestone)[0];
    
    /*let profile;
    if (globals.profiles && globals.profiles.length > 0) {
      profile = globals.profiles.filter((p) => (p.account == settings.account))[0];
    }
    if (!profile) 
      profile = {
        referrals: 0,
        vip_level: 0,
        usage: '0.0000 SQRL'
      }
    if (!profile.avatar)
      profile.avatar = avatarPlaceholder;
      */
    return (
      <React.Fragment>
        <Header
          as={Segment}
          loading={system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING'}
          color="black"
          block
          size="huge"
        >
          {proposal.title} ({proposal.proposal_name})
          <Header.Subheader>
            <p floated="left">Proposed By <strong>{proposal.proposer}</strong></p>
            <p>{proposal.description}</p>
            {
            (proposal.proposer === settings.account && proposal.status === 'drafting') ?
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
                    This action will open the <strong>{proposal.title}</strong> worker proposal's ballot for voting by other users on the network. You 
                    will also be charged for a deposit of {parseFloat(proposalFee).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}, 
                    plus a ballot fee of 30.0000 {settings.blockchain.tokenSymbol}.
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Start Ballot"
                      floated="right"
                      icon="folder"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.openVoting(proposal.proposal_name, proposalFee, proposal.title)}
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
              (proposal.proposer == settings.account && proposal.status == 'drafting') ?
              <GlobalTransactionModal
                actionName="GOVERNANCE_EDITPROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'blue',
                  content: 'Edit',
                  icon: "circle plus",
                  size: 'small'
                }}
                content={(
                  <GovernanceProposalsFormProposal
                    accounts={accounts}
                    actions={actions}
                    editing={true}
                    key="ProposalModifyForm"
                    settings={settings}
                    system={system}
                    tables={tables}
                    validate={validate}
                    wallet={wallet}
                    proposals={proposals}
                    proposal_name={proposal.proposal_name}
                    total_requested={proposal.total_requested}
                    category={proposal.category}
                    content={proposal.content}
                    description={proposal.description}
                    milestones={proposal.milestones}
                    title={proposal.title}
                  />
                )}
                icon="inbox"
                //onClose={onClose}
                settings={settings}
                size="large"
                system={system}
                title="Modify"
                />
            : ''}
            {
            (proposal.proposer === settings.account && proposal.status === 'inprogress') ?
            <GlobalTransactionModal
                actionName="GOVERNANCE_ACT_ON_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "Cancel",
                  icon: 'close'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This action will cancel the draft of <strong>{proposal.title}</strong> worker proposal from the blockchain. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Cancel"
                      floated="right"
                      icon="delete"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.cancelSubmission(proposal.proposal_name)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Cancel Works Proposal"
              />
            : ''}
            {
            (proposal.proposer === settings.account && proposal.status !== 'inprogress') ?
            <GlobalTransactionModal
                actionName="GOVERNANCE_ACT_ON_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "Delete",
                  icon: 'trash',
                  floated:"right"
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This action will delete the <strong>{proposal.title}</strong> proposal from the blockchain. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Delete"
                      floated="right"
                      icon="trash"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.deleteSubmission(proposal.proposal_name)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Delete Works Proposal"
              />
            : ''}
            {
            (proposal.proposer === settings.account && currentMilestone.status === 'voting' && isExpired) ?
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
                    This will claim the funds for <strong>milestone # {currentMilestone.milestone_id}</strong> and 
                    make a deposit of <strong>{currentMilestone.requested}</strong> to the <strong>{proposal.proposer}</strong> account.
                    <Button
                      color='green'
                      content="Claim Funds"
                      floated="right"
                      icon="checkmark"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.claim(proposal.proposal_name)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Claim Milestone Funds"
              />
            : ''}
          </Header.Subheader>
        </Header>
        <Segment attached>
          {(isSupporting)
            ? (
              <Message
                color="green"
                header={isPastCycleVoter ? "Note: You voted YES on this proposal for A PREVIOUS MILESTONE. This is your chance to vote YES again or change your vote to something else." : "You voted YES"}
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
                header={isPastCycleVoter ? "Note: You voted to ABSTAIN on this proposal for A PREVIOUS MILESTONE. This is your chance to vote ABSTAIN again or change your vote to something else." : "You voted ABSTAIN"}
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
                header={isPastCycleVoter ? "Note: You voted NO on this proposal for A PREVIOUS MILESTONE. This is your chance to vote NO again or change your vote to something else." : "You voted NO"}
                icon="x"
                size="tiny"
              />
            )
            : false
          }
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                <strong>Category:</strong>
                </Table.Cell>
                <Table.Cell>
                  {proposal.category}
                </Table.Cell>
                <Table.Cell>
                <strong>Total Requested:</strong>
                </Table.Cell>
                <Table.Cell>
                {parseFloat(totalRequested).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                <strong>Milestone:</strong>
                </Table.Cell>
                <Table.Cell>
                {proposal.current_milestone} of {proposal.milestonesCount}
                </Table.Cell>
                <Table.Cell>
                <strong>Total Remaining:</strong>
                </Table.Cell>
                <Table.Cell>
                {parseFloat(remainingAmount).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                <strong>Voting Begins:</strong>
                </Table.Cell>
                <Table.Cell>
                <Moment>{proposal.startTime}</Moment>
                </Table.Cell>
                <Table.Cell>
                <strong>Submission Fee:</strong>
                </Table.Cell>
                <Table.Cell>
                {parseFloat(proposalFee).toFixed(settings.tokenPrecision) + ' ' + settings.blockchain.tokenSymbol}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                <strong>Voting Ends:</strong>
                </Table.Cell>
                <Table.Cell>
                <Moment>{proposal.endTime}</Moment>
                </Table.Cell>
                <Table.Cell>
                <strong>Total Votes:</strong>
                </Table.Cell>
                <Table.Cell>
                <NumberFormat value={proposal.tallyTotal} 
                      displayType={'text'}
                      thousandSeparator={true}
                    /> {settings.blockchain.tokenSymbol}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                <strong>Status:</strong>
                </Table.Cell>
                <Table.Cell>
                  {proposal.status}
                </Table.Cell>
                <Table.Cell>
                <strong>Total Voters:</strong>
                </Table.Cell>
                <Table.Cell>
                {proposalVotes.length}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        
          <React.Fragment>
            {
              (proposal.content) ? 
              <p>For more information on this proposal, please visit this url: 
                <a
                  onClick={() => this.openLink(proposal.content)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                > {proposal.content}</a>
              </p>
              : ''
            }
          </React.Fragment>

          {
            (proposal.status == 'inprogress' && !isExpired) ?
            <React.Fragment>
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
                    onClick={() => this.approve(proposal.proposal_name)}
                    primary
                  />
                )}
                currentMilestone={currentMilestone}
                isExpired={isExpired}
                proposal={proposal}
                settings={settings}
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
                    onClick={() => this.oppose(proposal.proposal_name)}
                    primary
                  />
                )}
                currentMilestone={currentMilestone}
                isExpired={isExpired}
                proposal={proposal}
                settings={settings}
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
                    onClick={() => this.abstain(proposal.proposal_name)}
                    primary
                  />
                )}
                currentMilestone={currentMilestone}
                isExpired={isExpired}
                proposal={proposal}
                settings={settings}
                system={system}
                vote="Abstain"
              />
            </React.Fragment>
            : 
            <React.Fragment><p>The ballot for proposal is currently closed.</p></React.Fragment>}

            {
            (proposal.status !== 'drafting') ?
            <Segment basic>
            <Table basic="very">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <React.Fragment>
                      <Table columns={3} definition>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>
                            <strong>Milestone #</strong>
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            Amount
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            Status
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {proposal.milestones.map((milestone) => {
                            return (
                              <Table.Row key={milestone.milestone_id} >
                                  <Table.Cell textAlign="center">
                                    {(proposal.current_milestone==milestone.milestone_id) ?
                                    <Label ribbon>Current (#{milestone.milestone_id})</Label>
                                    :<span>{milestone.milestone_id}</span>}
                                  </Table.Cell>
                                  <Table.Cell collapsing>
                                    {parseFloat(milestone.requested).toFixed(settings.tokenPrecision)}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {milestone.status}
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })}
                        </Table.Body>
                      </Table>
                    </React.Fragment>
                  </Table.Cell>
                  <Table.Cell>
                    <Chart
                      width={'100%'}
                      height={'100%'}
                      chartType="PieChart"
                      loader={<div>Loading...</div>}
                      data={[
                        ['Vote', 'Weight'],
                        ['Yes', yesVotes],
                        ['No', noVotes],
                        ['Abstain', absVotes],
                      ]}
                      legendToggle
                      options={{
                        //chartArea: { width: '80%' },
                        legend:{position:'bottom'},
                        title: 'Milestone Voting Statistics',
                        is3D: true
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Table celled padded>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>
                            Voter
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            Decision
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            Weight
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {proposalVotes.map((vote) => {
                          var avatar = avatarPlaceholder;
                          if (globals.profiles && globals.profiles.length > 0) {
                            var profile = globals.profiles.filter((p) => (p.account == vote.voter))[0];
                            if (profile && profile.avatar) avatar = profile.avatar;
                          }
                        return (
                          <Table.Row key={vote.voter}>
                            <Table.Cell>
                              <Image avatar src={avatar} />
                              {vote.voter}
                            </Table.Cell>
                            <Table.Cell>
                              {vote.weighted_votes[0].key}
                            </Table.Cell>
                            <Table.Cell>
                              {vote.weighted_votes[0].value}
                            </Table.Cell>
                          </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Segment>
          : ''}
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(GovernanceProposalsProposal);
