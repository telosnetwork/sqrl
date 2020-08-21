// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Header, Image, Message, Segment, Table } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';
import ReactMarkdown from 'react-markdown';
import NumberFormat from 'react-number-format';
import avatarPlaceholder from '../../../../../renderer/assets/images/profile.png';

import GovernanceProposalsRatifyVote from './Ratify/Vote';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';

const scope = 'amend.decide';

class GovernanceProposalsRatify extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      proposedClauseMarkdowns: []
    };
  }
  approve = async (ballot_name) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = ['yes'];
    
    await actions.registerVoter(voter);
    await actions.voteBallot(voter, ballot_name, vote);
    actions.getVoteInfo(ballot_name);
  }
  abstain = async (ballot_name) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = ['abstain'];
    
    await actions.registerVoter(voter);
    await actions.voteBallot(voter, ballot_name, vote);
    actions.getVoteInfo(ballot_name);
  }
  oppose = async (ballot_name) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = ['no'];
    
    await actions.registerVoter(voter);
    await actions.voteBallot(voter, ballot_name, vote);
    actions.getVoteInfo(ballot_name);
  }
  openVoting = async (ballot_name, fee_amount, title) => {
    const { actions } = this.props;
    await actions.actOnAmendment(ballot_name, 'launchprop', fee_amount, title);
    actions.getProposalSubmissions();
  }
  cancelSubmission = async (ballot_name) => {
    const { actions } = this.props;
    await actions.actOnAmendment(ballot_name, 'cancelprop');
    actions.getProposalSubmissions();
  }
  closeSubmission = async (ballot_name) => {
    const { actions } = this.props;
    await actions.actOnAmendment(ballot_name, 'endprop');
    await actions.actOnAmendment(ballot_name, 'amendprop');
    actions.getProposalSubmissions();
  }
  deleteSubmission = async (ballot_name) => {
    const { actions } = this.props;
    await actions.actOnAmendment(ballot_name, 'deleteprop');
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
  componentDidMount(){
    const {
      proposal
    } = this.props;
    const {
      new_content
    } = proposal;
    
    if (new_content && new_content.length > 0) {
      for (let clauseIdx = 0; clauseIdx < new_content.length; clauseIdx++) {
        const currentClauseURL = new_content[clauseIdx].value;
        //console.log(' seeking clause index ' + clauseIdx + ' for clause # ' + new_content[clauseIdx].key + ' at url ' + currentClauseURL);

        (async () => {
          await fetch(currentClauseURL)
          .then(response=>{
            return response.text();
          }).then(data =>{
            const newProposedClauseMarkdowns = [
              ...this.state.proposedClauseMarkdowns.slice(0, clauseIdx),
              data,
              ...this.state.proposedClauseMarkdowns.slice(clauseIdx + 1)
            ];

            this.setState({
              proposedClauseMarkdowns: newProposedClauseMarkdowns 
            });
          }).catch(error => {
          });
        })();
      }
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
      proposedClauseMarkdowns
    } = this.state;
    
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const yesVotes = parseFloat(proposal.tallyYes.split(' ')[0]);
    const noVotes = parseFloat(proposal.tallyNo.split(' ')[0]);
    const absVotes = parseFloat(proposal.tallyAbstain.split(' ')[0]);
    const proposalVotes = proposal.votes || [];

    const clauseNotFound = 'Matching clause not found in ' + proposal.title;
    const newClauseNotFound = 'New clause details not found for ' + proposal.submission_title;

    return (
      <React.Fragment>
        <Header
          as={Segment}
          loading={system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING'}
          color="black"
          block
          size="huge"
        >
          {proposal.submission_title} (#{proposal.ballot_name})
          <Header.Subheader>
            <p floated="left">Proposed By <strong>{proposal.proposer}</strong></p>
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
                    This action will open the <strong>{proposal.submission_title}</strong> ratification proposal's ballot for voting by other users on the network. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Start Ballot"
                      floated="right"
                      icon="folder"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.openVoting(proposal.ballot_name)}
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
            (proposal.proposer === settings.account && proposal.status === 'voting') ?
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
                    This action will permanently delete the <strong>{proposal.submission_title}</strong> ratification proposal from the blockchain. 
                    Are you sure you would like to proceed?
                    <Button
                      color='green'
                      content="Cancel Proposal"
                      floated="right"
                      icon="delete"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.cancelSubmission(proposal.ballot_name)}
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
            (proposal.proposer === settings.account && proposal.status !== 'passed' && isExpired) ?
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
                    This will close the ballot for the <strong>{proposal.submission_title}</strong> ratification proposal, tally the votes 
                    and finalize all changes, if votes are passed, on chain.
                    <Button
                      color='green'
                      content="Process Proposal"
                      floated="right"
                      icon="checkmark"
                      loading={isVotePending}
                      style={{ marginTop: 20 }}
                      onClick={() => this.closeSubmission(proposal.ballot_name)}
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
          {(proposal.attrVotedYes === true)
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
          {(proposal.attrVotedAbstain === true)
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
          {(proposal.attrVotedNo === true)
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
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                <strong>Document Title:</strong>
                </Table.Cell>
                <Table.Cell>
                  {proposal.title}
                </Table.Cell>
                <Table.Cell>
                <strong>Subtitle:</strong>
                </Table.Cell>
                <Table.Cell>
                {proposal.subtitle}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                <strong>Open Proposals:</strong>
                </Table.Cell>
                <Table.Cell>
                {proposal.open_proposals}
                </Table.Cell>
                <Table.Cell>
                <strong>Sections:</strong>
                </Table.Cell>
                <Table.Cell>
                {proposal.sections}
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
                <strong>Treasury Symbol:</strong>
                </Table.Cell>
                <Table.Cell>
                {proposal.treasury_symbol}
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

          {
            (proposal.status === 'voting') ?
            <React.Fragment>
              <React.Fragment><p>Please use the buttons below to specify your vote for this ratification proposal.</p></React.Fragment>
              
              <GovernanceProposalsRatifyVote
                actionName="GOVERNANCE_VOTE_PROPOSAL"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'grey',
                  content: t('Yes'),
                  disabled: proposal.attrVotedYes === true,
                  icon: 'checkmark'
                }}
                confirm={(
                  <Button
                    color={(proposal.attrVotedYes === true) ? 'green' : 'grey'}
                    content={t('confirm')}
                    floated="right"
                    icon="checkmark"
                    loading={isVotePending}
                    style={{ marginTop: 10 }}
                    onClick={() => this.approve(proposal.ballot_name)}
                    primary
                  />
                )}
                proposal={proposal}
                settings={settings}
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
                  disabled: proposal.attrVotedNo === true,
                  icon: 'x'
                }}
                confirm={(
                  <Button
                    color={(proposal.attrVotedNo === true) ? 'orange' : 'grey'}
                    content={t('confirm')}
                    disabled={proposal.attrVotedNo === true}
                    floated="right"
                    icon="checkmark"
                    loading={isVotePending}
                    style={{ marginTop: 10 }}
                    onClick={() => this.oppose(proposal.ballot_name)}
                    primary
                  />
                )}
                proposal={proposal}
                settings={settings}
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
                  disabled: proposal.attrVotedAbstain === true,
                  icon: 'minus'
                }}
                confirm={(
                  <Button
                    color={(proposal.attrVotedAbstain === true) ? 'blue' : 'grey'}
                    content={t('confirm')}
                    disabled={proposal.attrVotedAbstain === true}
                    floated="right"
                    icon="checkmark"
                    loading={isVotePending}
                    style={{ marginTop: 10 }}
                    onClick={() => this.abstain(proposal.ballot_name)}
                    primary
                  />
                )}
                proposal={proposal}
                settings={settings}
                system={system}
                vote="Abstain"
              />
            </React.Fragment>
            : 
            <React.Fragment><p>The ballot for ratification proposal is currently closed.</p></React.Fragment>}

          {
            (proposal.status !== 'drafting') ?
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
          /> : ''}
        
          <React.Fragment>
            {([].concat(proposedClauseMarkdowns)
            .map((clauseNum, idx) => {
              return (
                <div>
                <React.Fragment>
                <Header
                  color="black"
                  size="large"
                >
                </Header>
                </React.Fragment>
                <Table style={{ marginTop: 20 }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      Amendment
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell style={{
                      whiteSpace: "normal",
                      wordWrap: "break-all"
                    }}>
                    {(proposedClauseMarkdowns[idx]) ? <ReactMarkdown source={proposedClauseMarkdowns[idx]} /> : clauseNotFound}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
                </Table>
                </div>
              )
            }))}
          </React.Fragment>

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
      </React.Fragment>
    );
  }
}

export default translate('tools')(GovernanceProposalsRatify);
