// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Popup, Message, Table, Header } from 'semantic-ui-react';
import { find, isEqual, trim } from 'lodash';
const { shell } = require('electron');

import DangerLink from '../../../../Global/Modal/DangerLink';

class GovernanceTFVotingCandidatesTableRow extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      walletUnLockRequested: false
    };
  }

  approve = async (ballot_id) => {
    const { 
      actions, 
      candidate, 
      settings, 
      system 
    } = this.props;
    const voter = settings.account;

    system.GOVERNANCE_VOTE_PROPOSAL_LAST_ERROR = null;

    await actions.registerVoter(voter);
    if (settings.mirrorCastOnVote !== false) {
      await actions.mirrorCast(voter);
    }
    actions.voteBallot(voter, ballot_id, candidate.index);
  }

  unlockWallet = (password = false) => {
    const { actions, system } = this.props;

    this.setState({walletUnLockRequested: true});

    system.GOVERNANCE_VOTE_PROPOSAL_LAST_ERROR = null;
    actions.unlockWallet(password);
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
      actions,
      arbitrators,
      ballots,
      blockExplorers,
      candidate,
      isSelected,
      isValidUser,
      leaderboard,
      settings,
      system,
      t,
      tfvoting,
      votes,
      validate,
      wallet
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
    let ballot = ballots.find(b => b.reference_id === board_id && b.table_id === 2); 
    if (!ballot)
      ballot = {};
    
    let vote = votes.find(v => v.ballot_id === ballot.ballot_id); 
    if (!vote)
      vote = {};

    let votedCandidate = {};
    if (vote.directions) {
      votedCandidate = vote.directions.find(d => d === candidate.index);
    }
    if (!(votedCandidate >=0))
      votedCandidate = {};
    
    let boardMember = {};
    if (tfvoting && tfvoting.tfvtboardmembers) {
      boardMember = tfvoting.tfvtboardmembers.find(a => a.member === candidate.member); 
      if (!boardMember)
      boardMember = {};
    }
    const isBoardMember = boardMember.member && boardMember.member.length > 0;
    const voted = !!(vote.ballot_id >= 0 && candidate.index===votedCandidate);
    const isExpired = (end_time * 1000) < Date.now();
    const isTooEarly = (begin_time * 1000) > Date.now();
    //const isOpenElection = (tfvoting.config && board_id == tfvoting.config.open_election_id);

    let lastError = '';
    if (system.GOVERNANCE_VOTE_PROPOSAL === 'FAILURE') {
      lastError = system.GOVERNANCE_VOTE_PROPOSAL_LAST_ERROR;
    }
    return ([(<Table.Row key={candidate.index}>
        <Table.Cell
          singleLine
          textAlign="center"
        >

          {/*
            (candidate.member === settings.account && status === 0 && isExpired) ?
            <Popup
              content={"The ballot for this election has ended. Click here to attempt to end the election and tally votes"}
              header={"End Election"}
              hoverable
              position="right center"
              trigger={(
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  icon='close'
                  onClick={() => this.endElection()}
                  size="small"
                />
              )}
            /> :<p></p>
            */
          }

          <Popup
            content={"Click here to learn more about this nominee at " + candidate.info_link}
            header={"Nominee Info"}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={'blue'}
                icon='info'
                onClick={() => this.openLink(candidate.info_link)}
                size="small"
              />
            )}
          />

          <Popup
            content={"If you would like to vote for this nominee, click here."}
            header={"Vote for Nominee"}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'green' : 'grey'}
                icon='checkmark'
                disabled={voted || isExpired || isTooEarly || settings.account == candidate.member}
                onClick={() => this.approve(ballot.ballot_id)}
                loading={system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_MIRRORCAST_PENDING === 'PENDING' || system.GOVERNANCE_REGVOTER_PENDING === 'PENDING'}
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
          </Header>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <b>{ candidate.votes }</b>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          {(voted)
            ? 
            <Message positive size="tiny">
              You voted for this nominee.
            </Message>
            : 
            <Message negative size="tiny">
            You did not vote for this nominee.
            </Message>
          }
          {(isBoardMember)
            ? 
            <Message positive size="tiny">
              Elected as a TF Board Member.
            </Message>
            : 
            ''
          }
        </Table.Cell>
      </Table.Row>
    ),(
      (lastError && lastError.error)
        ? (
          <Table.Row key={candidate.index+10000}>
          <Table.Cell colSpan={4}>
            <Message negative size="tiny">
              {(lastError.code)
                ? (
                  <div>
                    <Message.Header>
                      {lastError.code}: {lastError.name}
                    </Message.Header>
                    {(lastError.error.details) ? 
                    <code>{lastError.error.details[0].message}</code> :
                    <code>{lastError.message}</code>}
                  </div>
                )
                : (
                  <div>
                    <Message.Header>
                      {t(['producer_voter_preview_error_title'])}
                    </Message.Header>
                    <code>{new String(lastError)}</code>
                  </div>
                )
              }
            </Message>
            </Table.Cell>
          </Table.Row>
        )
        : 
        <Table.Row key={candidate.index+10000}>
          <Table.Cell colSpan={4}>
          </Table.Cell>
        </Table.Row>
    )]
    );
  }
}

export default translate('producers')(GovernanceTFVotingCandidatesTableRow);
