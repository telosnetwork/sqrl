// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Popup, Message, Table, Header } from 'semantic-ui-react';
import { isEqual } from 'lodash';
const { shell } = require('electron');

import DangerLink from '../../../../Global/Modal/DangerLink';

class GovernanceArbitrationCandidatesTableRow extends Component<Props> {
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
    let ballot = ballots.filter((b) => b.reference_id === board_id && b.table_id === 2)[0]; 
    if (!ballot)
      ballot = {};
    
    let vote = votes.filter((v) => v.ballot_id === ballot.ballot_id)[0]; 
    if (!vote)
      vote = {};

    let votedCandidate = {};
    if (vote.directions) {
      votedCandidate = vote.directions.find(d => d === candidate.index);
    }
    if (!(votedCandidate >=0))
      votedCandidate = {};
    
    let arbitrator = {};
    if (arbitrators) {
      arbitrator = arbitrators.filter((a) => a.arb === candidate.member)[0]; 
      if (!arbitrator)
        arbitrator = {};
    }
    
    const voted = !!(vote.ballot_id >= 0 && candidate.index===votedCandidate);
    const isExpired = (end_time * 1000) < Date.now();
    const isTooEarly = (begin_time * 1000) > Date.now();
    const isArbitrator = arbitrator.arb && arbitrator.arb.length > 0;

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
            content={"Click here to learn more about this candidate at " + candidate.info_link}
            header={"Candidate Details"}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'blue' : 'grey'}
                icon='info'
                //disabled={!(candidate.member === settings.account && status === 0 && isExpired)}
                onClick={() => this.openLink(candidate.info_link)}
                size="small"
              />
            )}
          />

          <Popup
            content={"If you would like to vote for this candidate as an arbitrator, click here."}
            header={"Vote for Candidate"}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'green' : 'grey'}
                icon='checkmark'
                disabled={voted || isExpired || isTooEarly || candidate.member === settings.account}
                onClick={() => this.approve(ballot.ballot_id)}
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
              You voted for this candidate.
            </Message>
            : 
            <Message negative size="tiny">
            You did not vote for this candidate.
            </Message>
          }
          {(isArbitrator)
            ? 
            <Message positive size="tiny">
              Elected as an Arbitrator.
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

export default translate('producers')(GovernanceArbitrationCandidatesTableRow);
