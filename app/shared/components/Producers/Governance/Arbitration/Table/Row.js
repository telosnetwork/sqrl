// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Popup, Segment, Table, Header } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import Moment from 'react-moment';

import DangerLink from '../../../../Global/Modal/DangerLink';
import GlobalTransactionModal from '../../../../Global/Transaction/Modal';

class GovernanceArbitrationCandidatesTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.candidate.member, nextProps.candidate.member)
    || !isEqual(this.props.isValidUser, nextProps.isValidUser)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  approve = (ballot_id) => {
    const { actions, candindex, settings } = this.props;
    const voter = settings.account;
    actions.registerVoter(voter).then( (tx) => {
      actions.mirrorCast(voter).then( (tx) => {
        actions.voteBallot(voter, ballot_id, candindex);
      });
    });
  }

  endElection = () => {
    const { actions, settings } = this.props;
    actions.endElection(settings.account);
  }
  
  openLink = (link) => shell.openExternal(link);
    
  render() {
    const {
      actions,
      ballots,
      blockExplorers,
      candidate,
      isSelected,
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
    
    const vote = find(votes, ['ballot_id', ballot.ballot_id]);
    const voted = !!(vote);
    const approved = (voted) ? (vote.directions[0]==candidate.index) : false;
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const isSupporting = (voted && approved);
    const isExpired = (end_time * 1000) < Date.now();

    return (
      <Table.Row key={candidate.index}>
        <Table.Cell
          singleLine
          textAlign="center"
        >
          {
            (candidate.member === settings.account && status === 0 && isExpired) ?
            <GlobalTransactionModal
              actionName="GOVERNANCE_ENDELECTION"
              actions={actions}
              blockExplorers={blockExplorers}
              button={{
                color: 'purple',
                icon: 'close',
                size: 'small'
              }}
              content={(
                <Segment basic clearing>
                  <p>
                  This election period ended <strong><Moment>{end_time*1000}</Moment></strong>. You may attempt to close the election and begin vote counting now. Would you like to proceed?
                  <Button
                    color='purple'
                    content="End Election"
                    floated="right"
                    icon="close"
                    loading={system.GOVERNANCE_ENDELECTION === 'PENDING'}
                    style={{ marginTop: 20 }}
                    onClick={() => this.endElection()}
                    primary
                  />
                  </p> 
                </Segment>
              )}
              icon="share square"
              settings={settings}
              floated="right"
              system={system}
              title="End Arbitration Election"
            />
          : ''}

          <Popup
            content={t('producers_proxies_popup_content', { proxy: candidate.member })}
            header={t('producers_proxies_popup_header')}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'blue' : 'grey'}
                icon={isSelected ? 'circle' : 'circle outline'}
                //disabled={!isValidUser}
                onClick={
                  (isSelected)
                  ? () => removeProxy(candidate.member)
                  : () => addProxy(candidate.member)
                }
                size="small"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <Header size="small">
            <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
              {candidate.member}
            </span>
            <Header.Subheader>
              <DangerLink
                content={candidate.info_link.substring(0, 30).replace(/(^\w+:|^)\/\//, '')}
                link={candidate.info_link}
                settings={settings}
              />
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <b>{ candidate.member }</b>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('producers')(GovernanceArbitrationCandidatesTableRow);
