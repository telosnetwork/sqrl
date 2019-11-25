// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import { Container,Dropdown,Header,Input,List,Loader,Message,Segment,Select,Visibility } from 'semantic-ui-react';

import GovernanceProposalsProposalTable from './Governance/Proposals/Table';
import GovernanceProposalsButtonProxy from './Governance/Proposals/Button/Proposal';

class GovernanceProposals extends Component<Props> {
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

    const validList = list.filter((proposal) => proposal.publisher=='eosio.saving')
    .map((proposal) => {

      let ballot = ballots.filter((b) => b.reference_id === proposal.prop_id && b.table_id === 0)[0];
      if (!ballot) ballot = {};

      let submission = submissions.filter ((s) => s.ballot_id === ballot.ballot_id)[0];
      if (!submission) submission = {};
      
      let vote = find(votes, { ballot_id: ballot.ballot_id });
      if (!vote) vote = { directions: [], expiration: 0 };

      const proposalAttributes = proposal;

      proposalAttributes.title = submission.title;
      proposalAttributes.sub_id = submission.id;
      proposalAttributes.proposer = submission.proposer;
      proposalAttributes.amount = submission.amount;
      proposalAttributes.attrVoted = !!vote;
      proposalAttributes.attrVotedNo = vote && vote.directions[0] === 0;
      proposalAttributes.attrVotedYes = vote && vote.directions[0] === 1;
      proposalAttributes.attrVotedAbstain = vote && vote.directions[0] === 2;

      proposalAttributes.attrIsExpired = (proposal.end_time * 1000) < Date.now();
      proposalAttributes.attrIsActive = ((proposal.begin_time * 1000) < Date.now()) && ((proposal.end_time * 1000) > Date.now());

      if (vote.expiration > 0 && submission.cycles > 2 && proposal.cycle_count <= submission.cycles - 1 
        && proposalAttributes.attrIsActive) { // allow vote again if new cycle
        proposalAttributes.cycleVoteExpired = (vote.expiration * 1000) < Date.now();
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
      validList.filter((proposal) => (queryString.length === 0 ||
          (proposal.title && proposal.title.toLowerCase().includes(queryString.toLowerCase()))));
    const sortedList = filteredList.filter((proposal) => {
      switch (filterByStatus) {
        case 'expired':
          return proposal.attrIsExpired;
        case 'cycles':
          return proposal.cycleVoteExpired || proposal.cycleVoteExpired===false;
        case 'all':
        return true;
        case 'active':
        default:
          return proposal.attrIsActive;
      }
    });
    const filterByStatusOptions = [
      {
        key: 'all',
        text: 'Show all proposals',
        value: 'all',
      },
      {
        key: 'active',
        text: 'Show active proposals',
        value: 'active',
      },
      {
        key: 'expired',
        text: 'Show expired proposals',
        value: 'expired',
      },
      {
        key: 'cycles',
        text: 'Show proposals with cycles',
        value: 'cycles',
      }
    ];
    return (
      <Segment basic>
        <Header floated="left">
          Worker Proposals
        </Header>
          <Container floated="right" style={{ marginBottom: '50px' }}>
            <GovernanceProposalsButtonProxy
              accounts={accounts}
              actions={actions}
              blockExplorers={blockExplorers}
              onClose={this.onClose}
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
            defaultValue="active"
            name="filterByStatus"
            onChange={(e, { value }) => this.setState({ filterByStatus: value })}
            options={filterByStatusOptions}
            selection
            style={{ marginLeft: '10px' }}
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
                list={sortedList.splice(0, amount)}
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
