// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Header, Message, Segment, Table } from 'semantic-ui-react';
import {Chart} from 'react-google-charts';

import GovernanceProposalsRatifyVote from './Ratify/Vote';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';

const scope = 'eosio.amend';

class GovernanceProposalsRatify extends Component<Props> {
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
  closeprop = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'closeprop', scope);
  }
  openVoting = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'openvoting', scope);
  }
  cancelSubmission = (submission_id) => {
    const { actions } = this.props;
    actions.actOnProposal(submission_id, 'cancelsub', scope);
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
      ratifysubmissions,
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
      document_clauses,
      document_id,
      document_last_amend,
      document_title,
      submission_new_clause_nums,
      submission_new_ipfs_urls,
      submission_proposal_id,
      submission_proposer,
      submission_title
    } = proposal;

    console.log(proposal);

    let ballot = ballots.filter((b) => b.reference_id === prop_id && b.table_id === 0)[0]; 
    if (!ballot)
      ballot = {};
    
    let submission = ratifysubmissions.filter ((s) => s.ballot_id === ballot.ballot_id)[0];
    if (!submission) submission = {};

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
    const yesVotes = parseFloat(proposal.yes_count.split(' ')[0]);
    const noVotes = parseFloat(proposal.no_count.split(' ')[0]);
    const absVotes = parseFloat(proposal.abstain_count.split(' ')[0]);

    let clauseIndex = -1;
    return (
      <React.Fragment>
        <Header
          as={Segment}
          loading={system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING'}
          color="black"
          block
          size="huge"
        >
          {submission_title} (#{submission_proposal_id})
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
                    This action will open the <strong>{submission_title}</strong> ratification proposal's ballot for voting by other users on the network. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Start Ballot"
                      floated="right"
                      icon="folder"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.openVoting(submission_proposal_id)}
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
                    This action will permanently delete the <strong>{submission_title}</strong> ratification proposal from the blockchain. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Cancel Proposal"
                      floated="right"
                      icon="delete"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.cancelSubmission(submission_proposal_id)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Cancel Proposal"
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
                  content: "Process Proposal",
                  icon: 'dollar'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This will close the ballot for the <strong>{submission_title}</strong> ratification proposal, tally the votes 
                    and finalize all changes, if votes are passed, on chain.
                    <Button
                      color='green'
                      content="Process Proposal"
                      floated="right"
                      icon="checkmark"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.closeprop(submission_proposal_id)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Process Proposal"
              />
            : ''}
          </Header.Subheader>
        </Header>
        <Segment attached>
          {(isSupporting)
            ? (
              <Message
                color="green"
                header="You have voted YES on this ratification proposal"
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
                header="You have voted to ABSTAIN on this ratification proposal"
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
                header="You have voted NO on this ratification proposal"
                icon="x"
                size="tiny"
              />
            )
            : false
          }
          <React.Fragment><p><strong>Ballot Begins:</strong> <Moment>{begin_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Ballot Ends:</strong> <Moment>{end_time*1000}</Moment></p></React.Fragment>

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
              (submission_new_ipfs_urls && submission_new_ipfs_urls.length > 0) ? 
              <p>For more information on this ratification request, see below: 
              </p>
              : ''
            }
            <Table style={{ marginTop: 20 }}>
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell>
                    Current Clause
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    New Clause #'s
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    IPFS Link
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                  {([].concat(submission_new_clause_nums)
                  .map((clauseNum) => {
                    clauseIndex++;
                    return (
                      <React.Fragment key={clauseNum}>
                        <Table.Row>
                          <Table.Cell collapsing>
                            {document_clauses[clauseIndex]}
                          </Table.Cell>
                          <Table.Cell style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                          }}>
                          {clauseNum}
                          </Table.Cell>
                          <Table.Cell style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                          }}>
                          {(submission_new_ipfs_urls[clauseIndex]) ?
                            <p>
                            <small>
                              <a
                                onClick={() => this.openLink(submission_new_ipfs_urls[clauseIndex])}
                                role="link"
                                style={{ cursor: 'pointer', fontSize:'10pt' }}
                                tabIndex={0}
                              > {submission_new_ipfs_urls[clauseIndex].replace('/ipfs/','')} fsjdklfjsldf</a>
                            </small>
                          </p> : ''}
                          </Table.Cell>                            
                        </Table.Row>
                      </React.Fragment>
                    );
                  }))}
              </Table.Body>
            </Table>
          </React.Fragment>

          {
            (isStarted && !isExpired) ?
            <React.Fragment>
              <React.Fragment><p>Please use the buttons below to specify your vote for this ratification proposal.</p></React.Fragment>
              
              <GovernanceProposalsRatifyVote
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
              <GovernanceProposalsRatifyVote
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
              <GovernanceProposalsRatifyVote
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
            <React.Fragment><p>The ballot for ratification proposal is currently closed.</p></React.Fragment>}
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(GovernanceProposalsRatify);
