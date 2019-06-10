// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import { Container,Dropdown,Header,Input,List,Loader,Message,Segment,Select,Visibility } from 'semantic-ui-react';

import GovernanceProposalsRatifyTable from './Governance/Ratify/Table';

class GovernanceRatify extends Component<Props> {
  state = {
    amount: 10,
    scope: 'eosio.trail',
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
    const { scope } = this.state;
    actions.getProposals(scope);
  }
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
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

    const validList = list.filter((proposal) => proposal.publisher=='eosio.amend')
    .map((proposal) => {

      let ballot = ballots.filter((b) => b.reference_id === proposal.prop_id && b.table_id === 0)[0];
      if (!ballot) ballot = {};

      let submission = ratifysubmissions.filter ((s) => s.ballot_id === ballot.ballot_id)[0];
      if (!submission) submission = {};

      let document = ratifydocuments.filter ((s) => s.document_id === submission.document_id)[0];
      if (!document) document = {};

      let vote = find(votes, { ballot_id: ballot.ballot_id });
      if (!vote) vote = { directions: [], expiration: 0 };

      const proposalAttributes = proposal;

      proposalAttributes.submission_proposal_id = submission.proposal_id;
      proposalAttributes.submission_title = submission.proposal_title;
      proposalAttributes.document_id = submission.document_id;
      proposalAttributes.document_title = document.document_title;
      proposalAttributes.document_clauses = document.clauses;
      proposalAttributes.document_last_amend = document.last_amend;
      proposalAttributes.submission_proposer = submission.proposer;
      proposalAttributes.submission_new_clause_nums = submission.new_clause_nums;
      proposalAttributes.submission_new_ipfs_urls = submission.new_ipfs_urls;
      proposalAttributes.attrVoted = !!vote;
      proposalAttributes.attrVotedNo = vote && vote.directions[0] === 0;
      proposalAttributes.attrVotedYes = vote && vote.directions[0] === 1;
      proposalAttributes.attrVotedAbstain = vote && vote.directions[0] === 2;

      proposalAttributes.attrIsExpired = (proposal.end_time * 1000) < Date.now();
      proposalAttributes.attrIsActive = ((proposal.begin_time * 1000) < Date.now()) && ((proposal.end_time * 1000) > Date.now());

      return proposalAttributes;
    });

    const filteredList =
      validList.filter((proposal) => (queryString.length === 0 ||
          (proposal.submission_title && proposal.submission_title.toLowerCase().includes(queryString.toLowerCase())) 
          || (proposal.document_title && proposal.document_title.toLowerCase().includes(queryString.toLowerCase())) ));
    const sortedList = filteredList.filter((proposal) => {
      switch (filterByStatus) {
        case 'expired':
          return proposal.attrIsExpired;
        case 'active':
          return proposal.attrIsActive;
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
