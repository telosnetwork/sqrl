// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { debounce, filter, findIndex, sortBy } from 'lodash';
import { Grid, Input, Segment, Transition, Table, Message } from 'semantic-ui-react';

import GovernanceArbitrationCandidatesTableRow from './Table/Row';

class GovernanceArbitrationCandidatesTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: false
    };
  }

  onSearchChange = debounce((e, { value }) => {
    const { isQuerying } = this.props;
    const query = String(value).toLowerCase();
    this.setState({ query }, () => {
      isQuerying((query && query.length > 0));
    });
    this.props.resetDisplayAmount();
  }, 400);

  querying() {
    const {
      query
    } = this.state;
    return (query && query.length > 0);
  }

  render() {

    const {
      query
    } = this.state;
    const {
      actions,
      amount,
      ballots,
      blockExplorers,
      isValidUser,
      leaderboard,
      settings,
      system,
      t,
      votes
    } = this.props;
    const {
      board_id,
      publisher,
      info_url,
      candidates,
      unique_voters,
      voting_symbol,
      available_seats,
      begin_time,
      end_time,
      status
    } = leaderboard;
    let ballot = ballots.filter((b) => b.reference_id === board_id)[0]; 
    if (!ballot)
      ballot = {};

    const isExpired = (end_time * 1000) < Date.now();
    const loading = (candidates.length < 1);
    const querying = this.querying();
    let baseTable = <Table.Body />;
    let searchTable = (
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={5}>
            {t('producers_none_match')}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
    const sortedCandidates = sortBy(candidates, 'member');
    if (!loading) {
      const fullResults = sortedCandidates.slice(0, amount);
      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((candidate) => {
            const isSelected = (candidate.member === settings.account);

            return (
              <GovernanceArbitrationCandidatesTableRow
                actions={actions}
                candidate={candidate}
                key={leaderboard.board_id}
                isSelected={isSelected}
                isValidUser={isValidUser}
                ballots={ballots}
                blockExplorers={blockExplorers}
                leaderboard={leaderboard}
                settings={settings}
                system={system}
                votes={votes}
              />
            );
          })}
        </Table.Body>
      );

      if (querying) {
        const partResults = filter(sortedCandidates, (candidate) =>
          candidate.member.indexOf(query) > -1
        ).slice(0, amount);

        if (partResults.length > 0) {
          searchTable = (
            <Table.Body key="PartResults">
              {partResults.map((candidate) => {
                const isSelected = (candidate.member === settings.account);

                return (
                  <GovernanceArbitrationCandidatesTableRow
                    actions={actions}
                    candidate={cand}
                    key={leaderboard.board_id}
                    isSelected={isSelected}
                    isValidUser={isValidUser}
                    ballots={ballots}
                    blockExplorers={blockExplorers}
                    leaderboard={leaderboard}
                    settings={settings}
                    system={system}
                    votes={votes}
                  />
                );
              })}
            </Table.Body>
          );
        }
      }
    }
    return (
      <Segment basic loading={loading} vertical>
        <Grid>
          <Grid.Column width={1} key="ArbitrationCandidateSearch" textAlign="right">
            <Input
              icon="search"
              onChange={this.onSearchChange}
              placeholder="Search candidates..."
            />
          </Grid.Column>
        </Grid>
        <Table
          color="violet"
          size="small"
          striped
          style={{ borderRadius: 0 }}
          unstackable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing />
              <Table.HeaderCell>
                Candidate Details
              </Table.HeaderCell>
              <Table.HeaderCell>
                Votes
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Transition visible={querying} animation="slide down" duration={200}>
            {searchTable}
          </Transition>
          <Transition visible={!querying} animation="slide down" duration={200}>
            {baseTable}
          </Transition>
        </Table>
      </Segment>
    );
  }
}

export default translate('producers')(GovernanceArbitrationCandidatesTable);
