// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import { Container,Dropdown,Header,Input,List,Loader,Message,Segment,Select,Visibility } from 'semantic-ui-react';

import GovernanceProposalsProposalTable from './Governance/Proposals/Table';
import GovernanceProposalsButtonProposal from './Governance/Proposals/Button/Proposal';

class GovernanceProposals extends Component<Props> {
  state = {
    amount: 10,
    filterByCategory: 'all',
    filterByStatus: 'all',
    scope: 'telos.decide',
    queryString: ''
  };
  componentDidMount() {
    this.sync();
  }
  loadMore = () => {
    this.setState({ amount: this.state.amount + 10 });
  };
  onChange = (e, { name, selection, value }) => {
    this.setState({ [name]: value }, () => {
      // If this is the dropdown, fire the submit
      if (selection) {
        this.sync();
      }
    });
  }
  onClose = () => {
    const { onCloseProposal } = this.props;
    this.sync();
    onCloseProposal();
  }
  sync = () => {
    const { actions } = this.props;
    actions.getBallots();
  }
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      globals,
      proposals,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      amount,
      queryString,
      scope,
      filterByVote,
      filterByCategory,
      filterByStatus
    } = this.state;
    const {
      ballots,
      list,
      milestones,
      submissions,
      votes
    } = proposals;
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }

    const validList = submissions.map((submission) => {
      let ballot = ballots.filter ((b) => b.ballot_name === submission.current_ballot)[0];
      if (!ballot) ballot = {};
      
      let vote = find(votes[submission.proposal_name], { voter: settings.account });
      if (!vote) vote = { weighted_votes: [], vote_time: 0 };

      let submissionMilestones = milestones[submission.proposal_name];
      if (!submissionMilestones) submissionMilestones = [];

      const proposalAttributes = submission;

      proposalAttributes.title = submission.title;
      proposalAttributes.description = submission.description;
      proposalAttributes.category = submission.category;
      proposalAttributes.content = submission.content;
      proposalAttributes.current_milestone = submission.current_milestone;
      proposalAttributes.fee = submission.fee;
      proposalAttributes.proposal_name = submission.proposal_name;
      proposalAttributes.proposer = submission.proposer;
      proposalAttributes.refunded = submission.refunded;
      proposalAttributes.remaining = submission.remaining;
      proposalAttributes.status = submission.status;
      proposalAttributes.total_requested = submission.total_requested;
      proposalAttributes.milestones = submissionMilestones;
      proposalAttributes.milestonesCount = submissionMilestones.length;
      proposalAttributes.votes = votes[submission.proposal_name];
      proposalAttributes.tallyTotal = ballot.total_raw_weight || "0.0000 VOTE";
      proposalAttributes.tallyYes = ballot.options && ballot.options.filter((option)=>option.key=='yes')[0].value || "0.0000 VOTE";
      proposalAttributes.tallyNo = ballot.options && ballot.options.filter((option)=>option.key=='no')[0].value || "0.0000 VOTE";
      proposalAttributes.tallyAbstain = ballot.options && ballot.options.filter((option)=>option.key=='abstain')[0].value || "0.0000 VOTE";
      
      proposalAttributes.vote = vote;
      proposalAttributes.attrVoted = !!vote && vote.weighted_votes && vote.weighted_votes.length > 0;
      proposalAttributes.attrVotedNo = vote && vote.weighted_votes.length > 0 && vote.weighted_votes[0].key === "no";
      proposalAttributes.attrVotedYes = vote && vote.weighted_votes.length > 0 && vote.weighted_votes[0].key === "yes";
      proposalAttributes.attrVotedAbstain = vote && vote.weighted_votes.length > 0 && vote.weighted_votes[0].key === "abstain";

      proposalAttributes.attrIsExpired = new Date(ballot.end_time) < Date.now();
      proposalAttributes.attrIsActive = (new Date(ballot.begin_time) < Date.now() && new Date(ballot.end_time) > Date.now());
      proposalAttributes.startTime = ballot.begin_time;
      proposalAttributes.endTime = ballot.end_time;

      if (vote.vote_time > 0 
        && submission.current_milestone > 1 
        && submission.current_milestone <= submission.milestonesCount - 1 
        && proposalAttributes.attrIsActive) { // allow vote again if new cycle
        proposalAttributes.cycleVoteExpired = (new Date(vote.vote_time) < new Date(ballot.begin_time)); // last vote before start of new milestone
        if (proposalAttributes.cycleVoteExpired) { // on new cycle, user needs to revote
          proposalAttributes.attrVoted = false;
          proposalAttributes.attrVotedNo = false;
          proposalAttributes.attrVotedYes = false;
          proposalAttributes.attrVotedAbstain = false;
        }
      }

      return proposalAttributes;
    });
    
    const filteredList =
      validList.filter((submission) => (queryString.length === 0 ||
          (submission.title && submission.title.toLowerCase().includes(queryString.toLowerCase()))));
    const statusesList = filteredList.filter((submission) => {
      switch (filterByStatus) {
        case 'drafting':
          return submission.status=='drafting';
        case 'inprogress':
          return submission.status=='inprogress';
        case 'failed':
          return submission.status=='failed';
        case 'cancelled':
          return submission.status=='cancelled';
        case 'completed':
          return submission.status=='completed';
        case 'expired':
          return submission.attrIsExpired;
        case 'milestones':
          return submission.milestones.length > 1;
        case 'active':
          return submission.attrIsActive;
        case 'all':
        default:
          return true;
      }
    });
    const sortedList = statusesList.filter((submission) => {
      switch (filterByCategory) {
        case 'apps':
          return submission.category=='apps';
        case 'developers':
          return submission.category=='developers';
        case 'education':
          return submission.category=='education';
        case 'marketing':
          return submission.category=='marketing';
        case 'all':
        default:
          return true;
      }
    });
    const filterByStatusOptions = [
      {
        key: 'all',
        text: 'Show all proposals',
        value: 'all',
      },
      {
        key: 'cancelled',
        text: 'Show cancelled proposals',
        value: 'cancelled',
      },
      {
        key: 'completed',
        text: 'Show completed proposals',
        value: 'completed',
      },
      {
        key: 'drafting',
        text: 'Show draft proposals',
        value: 'drafting',
      },
      {
        key: 'expired',
        text: 'Show expired proposals',
        value: 'expired',
      },
      {
        key: 'failed',
        text: 'Show failed proposals',
        value: 'failed',
      },
      {
        key: 'inprogress',
        text: 'Show in-progress proposals',
        value: 'inprogress',
      },
      {
        key: 'milestones',
        text: 'Show proposals with milestones',
        value: 'milestones',
      }
    ];
    const filterByCategoryOptions = [
      {
        key: 'all',
        text: 'Show all categories',
        value: 'all',
      },
      {
        key: 'apps',
        text: 'Apps - applications being built on Telos',
        value: 'apps',
      },
      {
        key: 'developers',
        text: 'Development - tools, libraries, modules, etc',
        value: 'developers',
      },
      {
        key: 'education',
        text: 'Education - tutorials, guides, workshops, etc',
        value: 'education',
      },
      {
        key: 'marketing',
        text: 'Marketing - audio, video, articles, etc',
        value: 'marketing',
      }
    ];
    return (
      <Segment basic>
        <Header floated="left">
          Worker Proposals
        </Header>
          <Container floated="right" style={{ marginBottom: '50px' }}>
            <GovernanceProposalsButtonProposal
              accounts={accounts}
              actions={actions}
              blockExplorers={blockExplorers}
              onClose={this.onClose}
              proposals={proposals}
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />
          </Container>
          <Message 
            content={(
              <React.Fragment>
                <p>
                  We encourage you to participate in these worker proposals to make your voice heard in the governance of this blockchain. Please vote responsibly.
                </p>
              </React.Fragment>
            )}
            info
          />
          <Input
            placeholder='Search for proposal'
            onChange={(e) => this.setState({ queryString: e.target.value })}
          />
          <Select
            defaultValue="all"
            name="filterByStatus"
            onChange={(e, { value }) => this.setState({ filterByStatus: value })}
            options={filterByStatusOptions}
            selection
            style={{ marginLeft: '10px', minWidth: '250px', marginBottom: '5px' }}
          />
          <Select
            defaultValue="all"
            name="filterByCategory"
            onChange={(e, { value }) => this.setState({ filterByCategory: value })}
            options={filterByCategoryOptions}
            selection
            style={{ marginLeft: '10px', minWidth: '275px', marginBottom: '5px' }}
          />
          {(sortedList.length > 0) ? (
            <Visibility
              continuous
              key="GovernanceProposalsTable"
              fireOnMount
              onBottomVisible={this.loadMore}
              once={false}
            >
              <GovernanceProposalsProposalTable
                actions={actions}
                ballots={ballots}
                blockExplorers={blockExplorers}
                globals={globals}
                list={sortedList.splice(0, amount)}
                proposals={proposals}
                scope={scope}
                settings={settings}
                submissions={submissions}
                system={system}
                validate={validate}
                votes={votes}
                wallet={wallet}
              />
            </Visibility>
          ) : (
            <Message
              content='There are no proposals matching this criteria'
              warning
            />
          )}
          {((!queryString && !filterByVote && amount < sortedList.length) ||
            (system.GOVERNANCE_GET_PROPOSALS === 'PENDING')) && (
            <Segment key="GovernanceProposalsTableLoading" clearing padded vertical>
              <Loader active />
            </Segment>
          )}
          
          {/*([].concat(list)
            // .filter((p) => ((p.created + p.cycles * 2500000) * 1000) < Date.now()) // ignored expired proposals
            .map((proposal) => (
              <GovernanceProposalsProposal
                actions={actions}
                key={proposal.prop_id}
                ballots={ballots}
                blockExplorers={blockExplorers}
                proposal={proposal}
                scope={scope}
                settings={settings}
                submissions={submissions}
                system={system}
                votes={votes}
              />
            ))
            )*/}
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceProposals);
