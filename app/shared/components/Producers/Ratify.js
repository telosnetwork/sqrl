// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import { Container,Dropdown,Header,Input,List,Loader,Message,Segment,Select,Visibility } from 'semantic-ui-react';

import GovernanceProposalsRatifyTable from './Governance/Ratify/Table';

class GovernanceRatify extends Component<Props> {
  state = {
    amount: 10,
    scope: 'amend.decide',
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
      filterByStatus
    } = this.state;
    const {
      ballots,
      list,
      ratifydocuments,
      ratifysubmissions,
      votes
    } = proposals;
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }

    const validList = ratifydocuments.map((document) => {

      let submission = ratifysubmissions.filter ((s) => s.document_name === document.document_name)[0];
      if (!submission) submission = {};

      let ballot = ballots.filter((b) => b.ballot_name === submission.ballot_name && b.publisher === scope)[0];
      if (!ballot) ballot = {};

      let vote = find(votes[submission.ballot_name], { voter: settings.account });
      if (!vote) vote = { weighted_votes: [], vote_time: 0 };

      const proposalAttributes = submission;

      proposalAttributes.author = document.author;
      proposalAttributes.document_name = document.document_name;
      proposalAttributes.open_proposals = document.open_proposals;
      proposalAttributes.sections = document.sections;
      proposalAttributes.subtitle = document.subtitle;
      proposalAttributes.title = document.title;

      proposalAttributes.ballot_name = submission.ballot_name;
      proposalAttributes.ballot_results = submission.ballot_results;
      proposalAttributes.new_content = submission.new_content;
      proposalAttributes.proposer = submission.proposer;
      proposalAttributes.status = submission.status;
      proposalAttributes.submission_subtitle = submission.subtitle;
      proposalAttributes.submission_title = submission.title;
      proposalAttributes.treasury_symbol = submission.treasury_symbol;

      proposalAttributes.votes = votes[submission.ballot_name];
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

      return proposalAttributes;
    });

    const filteredList =
      validList.filter((proposal) => (queryString.length === 0 ||
          (proposal.submission_title && proposal.submission_title.toLowerCase().includes(queryString.toLowerCase())) 
          || (proposal.title && proposal.title.toLowerCase().includes(queryString.toLowerCase())) ));
    const sortedList = filteredList.filter((proposal) => {
      switch (filterByStatus) {
        case 'expired':
          return proposal.attrIsExpired;
        case 'active':
          return proposal.attrIsActive;
        case 'failed':
            return proposal.status==='failed';
        case 'all':
        default:
          return true;
      }
    });
    const filterByStatusOptions = [
      {
        key: 'all',
        text: 'Show all ratification proposals',
        value: 'all',
      },
      {
        key: 'active',
        text: 'Show active ratification proposals',
        value: 'active',
      },
      {
        key: 'expired',
        text: 'Show expired ratification proposals',
        value: 'expired',
      }
      ,
      {
        key: 'failed',
        text: 'Show failed ratification proposals',
        value: 'failed',
      }
    ];
    return (
      <Segment basic>
        <Header floated="left">
          Ratification Proposals
        </Header>
        <Container floated="right" style={{ marginBottom: '50px' }}>
            
          </Container>
          <Message 
            content={(
              <React.Fragment>
                <p>
                  The Telos Blockchain Network allows the community to control the governance of its mainnet. Below are proposals to ratify and/or amend certain aspects of the documents governing the network. Please vote responsibly.
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
            style={{ marginLeft: '10px' }}
          />
          {(sortedList.length > 0) ? (
            <Visibility
              continuous
              key="GovernanceRatificationTable"
              fireOnMount
              onBottomVisible={this.loadMore}
              once={false}
            >
              <GovernanceProposalsRatifyTable
                actions={actions}
                ballots={ballots}
                blockExplorers={blockExplorers}
                globals={globals}
                list={sortedList.splice(0, amount)}
                scope={scope}
                settings={settings}
                ratifysubmissions={ratifysubmissions}
                system={system}
                validate={validate}
                votes={votes}
                wallet={wallet}
              />
            </Visibility>
          ) : (
            <Message
              content='There are no ratification proposals matching this criteria'
              warning
            />
          )}
          {((!queryString && !filterByVote && amount < sortedList.length) ||
            (system.GOVERNANCE_GET_PROPOSALS === 'PENDING')) && (
            <Segment key="GovernanceRatificationTableLoading" clearing padded vertical>
              <Loader active />
            </Segment>
          )}
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceRatify);
