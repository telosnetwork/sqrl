// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import GovernanceFormRefreshVoteStats from './Stats';

type Props = {
  actions: {},
  account: {},
  system: {}
};

class GovernanceFormRefreshVote extends Component<Props> {
  props: Props;

  refreshVoteAutomatically = () => {
    const {
      actions,
      settings
    } = this.props;

    if (settings.autoRefreshVote === true) {
      actions.setSetting('autoRefreshVote', false);
      actions.setSetting('autoRefreshVoteDate', '');
    }
    else {
      actions.setSetting('autoRefreshVote', true);
      actions.setSetting('autoRefreshVoteDate', new Date());
    }
  }

  saveRefreshOptions = (e, { value }) => {
    const {
      actions
    } = this.props;

    actions.setSetting('autoRefreshVoteDays', value);
    
  }

  refreshVoteNow = () => {
    const {
      clearSystemState,
      setSetting,
      voteproducers
    } = this.props.actions;
    const {
      account,
      producers
    } = this.props;
    clearSystemState();

    const currentProxy = account && account.voter_info && account.voter_info.proxy;
    const selected = account && account.voter_info && account.voter_info.producers;

    if (currentProxy && currentProxy.length > 0) {
      voteproducers([], currentProxy);
    } else if (selected && selected.length > 0) {
      //make sure selected producers weren't kicked
      //while user was in the research process
      /*const compliantProducers = producers.list
      .filter((p) => {return selected.indexOf(p.owner) !== -1})
      .map((s) => {return s.owner});
      voteproducers(compliantProducers);*/
    }

    setSetting('autoRefreshVoteDate', new Date());
  }

  render() {
    const {
      onClose,
      settings,
      t
    } = this.props;

    let lastRefreshDate = '';
    let nextRefreshDate = '';
    let secondsSince = 0;

    if (settings.autoRefreshVoteDate != '') {
      lastRefreshDate = new Date(settings.autoRefreshVoteDate);
      nextRefreshDate = new Date(lastRefreshDate);
      nextRefreshDate.setHours(lastRefreshDate.getHours() + (24 * parseInt(settings.autoRefreshVoteDays)));
      secondsSince = ((new Date().getTime() - lastRefreshDate.getTime()) / 1000);
    }

    const refreshOptions = [
      {
        key: '1',
        text: 'Refresh votes every day',
        value: '1'
      },
      {
        key: '3',
        text: 'Refresh votes every 3 days',
        value: '3'
      },
      {
        key: '7',
        text: 'Refresh votes every 7 days',
        value: '7'
      },
      {
        key: '14',
        text: 'Refresh votes every 14 days',
        value: '14'
      },
      {
        key: '30',
        text: 'Refresh votes every 30 days',
        value: '30'
      },
    ]

    return (
      <Segment>
        <div>
          <Header>
            <u>Voting Stats</u>
          </Header>
          <GovernanceFormRefreshVoteStats
            autoRefreshVote={settings.autoRefreshVote}
            lastRefreshDate={lastRefreshDate}
            nextRefreshDate={nextRefreshDate}
            secondsSince={secondsSince}
            settings={settings}
          />
          <Form>
          {(settings.blockchain.tokenSymbol === 'WAX') ? 
            <Message
              icon="info circle"
              info
              content={t('claimgbm_explanation2', {tokenSymbol:settings.blockchain.tokenSymbol})}
            />
            :''}

            {(settings.autoRefreshVote === true ?
              <div>
                <Message
                    attached='bottom' 
                    icon="checkmark"
                    info
                    content={"You're currently setup to automatically refresh your vote every " 
                      + settings.autoRefreshVoteDays + " day(s). Good job!"}
                  />
              </div>
              : '' )}

            <Segment>
              <Button
                content={settings.autoRefreshVote === true ? "Disable Automatic Refreshes" : "Enable Automatic Refreshes"}
                color="purple"
                onClick={this.refreshVoteAutomatically}
                primary
              />
              <Dropdown
                placeholder='How often should your votes be refreshed?'
                compact
                disabled={settings.autoRefreshVote!=true}
                selection
                options={refreshOptions}
                onChange={this.saveRefreshOptions}
                value={settings.autoRefreshVoteDays || 1}
                width="100"
              />
            </Segment>

            <Segment>
              <Button
                content={t('close')}
                color="grey"
                onClick={onClose}
              />
              <Button
                content={'Refresh Votes Now'}
                color="green"
                floated="right"
                onClick={this.refreshVoteNow}
                primary
              />
            </Segment>
          </Form>
        </div>
      </Segment>
    );
  }
}

export default translate('stake')(GovernanceFormRefreshVote);
