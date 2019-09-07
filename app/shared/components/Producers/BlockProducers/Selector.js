// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Message, Icon, List, Segment } from 'semantic-ui-react';

import ProducersSelectorItem from './Selector/Item';
import ProducersSelectorItemEmpty from './Selector/Item/Empty';

const { shell } = require('electron');

export default class ProducersSelector extends Component<Props> {
  openLink = (link) => { shell.openExternal(link); }
  render() {
    const {
      account,
      isProxying,
      modified,
      producers,
      selected,
      settings
    } = this.props;
    // Filter selected to only producers in our chain
    const selectedForChain = producers.list
      .filter((p) => {return selected.indexOf(p.owner) !== -1})
      .map((s) => {return s.owner});
    let showSponsor = selectedForChain.filter((p) => {return p.indexOf('telosmiamibp') !== -1}).length == 0 ||
      selectedForChain.filter((p) => {return p.indexOf('goodblocktls') !== -1}).length == 0;

    if (settings.blockchain.tokenSymbol === 'WAX')
      showSponsor = selectedForChain.filter((p) => {return p.indexOf('zenblockswax') !== -1}).length == 0;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment loading={!(account)}>
              <List
                divided
                relaxed
                size="small"
              >
                <List.Item key="header">
                  <Header color="blue" textAlign="center">
                    {(isProxying) ? t('producer_voter_proxying_vote') : false}
                    <Header.Subheader>
                      {selectedForChain.length}/30 {t('producer_voter_votes_used')}
                    </Header.Subheader>
                  </Header>
                </List.Item>
                { (settings.blockchain.tokenSymbol === 'TLOS' && showSponsor) ?
                <Message icon info>
                <Icon name='thumbs outline up' />
                <Message.Content>
                <Message.Header>
                  Help us make Sqrl better
                </Message.Header>
                  Please vote for&nbsp;<b><a onClick={() => this.openLink("https://telos.miami")} role="link" style={{ cursor: 'pointer' }}>telosmiamibp</a></b>&nbsp;to help support Sqrl development and 
                  for&nbsp;<b><a onClick={() => this.openLink("https://goodblock.io")} role="link" style={{ cursor: 'pointer' }}>goodblocktls</a></b>, a key sponsor of Telos.
                  </Message.Content>
                </Message>
                :''}
                { (settings.blockchain.tokenSymbol === 'WAX' && showSponsor) ?
                <Message icon info>
                <Icon name='thumbs outline up' />
                <Message.Content>
                <Message.Header>
                  Help us make Sqrl better
                </Message.Header>
                  Please vote for&nbsp;<b><a onClick={() => this.openLink("https://zenblocks.io")} role="link" style={{ cursor: 'pointer' }}>zenblockswax</a></b>&nbsp;to help support our development for great tools such as Sqrl.
                  </Message.Content>
                </Message>
                :''}
                {(selectedForChain.length)
                  ? selectedForChain.map((producer) => (
                    <ProducersSelectorItem
                      isProxying={isProxying}
                      key={`${isProxying}-${producer}`}
                      producer={producer}
                      removeProducer={this.props.removeProducer}
                      settings={settings}
                    />
                  ))
                  : (
                    <ProducersSelectorItemEmpty
                      isProxying={isProxying}
                      key={`${isProxying}-empty`}
                      modified={modified}
                      settings={settings}
                    />
                  )
                }
              </List>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
