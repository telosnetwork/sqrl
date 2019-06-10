// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Container, Header, Message, Segment, Visibility } from 'semantic-ui-react';

import GovernanceArbitrationCandidatesTable from './Table';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';

class GovernanceArbitrationArbitration extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      amount: 100,
      querying: false
    };
  }

  componentDidMount() {
    //this.tick();
    //this.interval = setInterval(this.tick.bind(this), 120000);
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  loadMore = () => this.setState({ amount: this.state.amount + 20 });

  resetDisplayAmount = () => this.setState({ amount: 20 });
  isQuerying = (querying) => this.setState({ querying });

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getTable
    } = actions;

    //if (validate.NODE) {
      //getTable('tlsproxyinfo', 'tlsproxyinfo', 'proxies');
    //}
  }

  endElection = () => {
    const { 
      actions, 
      settings, 
      system 
    } = this.props;

    system.GOVERNANCE_ENDELECTION_LAST_ERROR = null;

    actions.endElection(settings.account);
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
      amount,
      querying,
    } = this.state;
    const {
      actions,
      arbitrators,
      ballots,
      blockExplorers,
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

    const currentCandidate = leaderboard.candidates.filter((a) => a.member === settings.account)[0]; 
    
    const isExpired = (end_time * 1000) < Date.now();
    return (
      <React.Fragment>
        <Header
          as={Segment}
          loading={system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING'}
          color="black"
          block
          size="huge"
        >
          Arbitration Election: (#{board_id})
          <Header.Subheader >
          {
            (isExpired && status != 3 && currentCandidate) ?
              <GlobalTransactionModal
                actionName="GOVERNANCE_ENDELECTION"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'green',
                  content: "End Election",
                  icon: 'close'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This action will attempt to end this current election and allow a new one to begin. Are you sure you would like to proceed?
                    <Button
                      color='green'
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
                system={system}
                title="End Current Election"
              />
              : ''}
            </Header.Subheader>
        </Header>
        <Segment attached>
          <React.Fragment><p><strong>Election Begins:</strong> <Moment>{begin_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Election Ends:</strong> <Moment>{end_time*1000}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Available Seats:</strong> {available_seats} </p></React.Fragment>
          <React.Fragment><p><strong>Candidates:</strong> {candidates.length} </p></React.Fragment>
          <React.Fragment>
            {
              (info_url) ? 
              <p>For more information on this election, please visit this url: 
                <a
                  onClick={() => this.openLink(info_url)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                > {info_url}</a>
              </p>
              : ''
            }
          </React.Fragment>

          {
            (status == 3) ?
            <Message negative size="small">The ballot for this election has been closed.</Message>
            : (isExpired) ?
            <Message negative size="small">This election has expired.</Message>
            :''
          }
          {
            [(
              <Visibility
                continuous
                key="ArbitrationCandidatesTable"
                fireOnMount
                onBottomVisible={this.loadMore}
                once={false}
              >
                <GovernanceArbitrationCandidatesTable
                  arbitrators={arbitrators}
                  amount={amount}
                  attached="top"
                  isQuerying={this.isQuerying}
                  resetDisplayAmount={this.resetDisplayAmount}
                  actions={actions}
                  candidates={candidates}
                  key={leaderboard.board_id}
                  ballots={ballots}
                  blockExplorers={blockExplorers}
                  leaderboard={leaderboard}
                  settings={settings}
                  system={system}
                  votes={votes}
                  validate={validate}
                  wallet={wallet}
                />
              </Visibility>
            )]
          }
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(GovernanceArbitrationArbitration);
