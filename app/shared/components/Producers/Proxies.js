// @flow
import React, { Component } from 'react';
import { Container, Header, Loader, Message, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import ProxiesTable from './Proxies/Table';
import ProxiesButtonProxy from './Proxies//Button/Proxy';

class Proxies extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      amount: 100,
      querying: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 120000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadMore = () => this.setState({ amount: this.state.amount + 20 });

  resetDisplayAmount = () => this.setState({ amount: 20 });
  isQuerying = (querying) => this.setState({ querying });

  tick() {
    const {
      actions,
      settings,
      validate
    } = this.props;
    const {
      getTable
    } = actions;

    if (validate.NODE) {
      if (settings.blockchain.tokenSymbol === 'TLOS')
        getTable('tlsproxyinfo', 'tlsproxyinfo', 'proxies');
      else if (settings.blockchain.tokenSymbol === 'WAX')
        getTable('eosio', 'eosio', 'voters', 10000000);
    }
  }

  render() {
    const {
      accounts,
      actions,
      addProxy,
      blockExplorers,
      globals,
      keys,
      removeProxy,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      amount,
      querying,
    } = this.state;

    const account = accounts[settings.account];
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const currentProxy = account && account.voter_info && account.voter_info.proxy;
    let proxies = (tables.tlsproxyinfo && tables.tlsproxyinfo.tlsproxyinfo.proxies.rows) || [];
    if (proxies.length < 1) {
      const voters = (tables.eosio && 
        tables.eosio.eosio && 
        tables.eosio.eosio.voters && 
        tables.eosio.eosio.voters.rows) || [];
      if (voters.length > 0)
        proxies = voters.filter( (p) => {return p.is_proxy === 1} ).map(proxy => {
        return {
          owner: proxy.owner,
          name: proxy.owner,
          website: '',
          slogan: '',
          philosophy: '',
          background: '',
          logo_256: '',
          telegram: '',
          steemit: '',
          twitter: '',
          wechat: '',
          reserved_1: '',
          reserved_2: '',
          reserved_3: ''
        }
      });
    }
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');
    const currentProxyReg = (proxies && proxies.length > 0) ? proxies.filter( (p)=> { return p.owner == settings.account;})[0] : null;
    
    return (proxies.length > 0)
      ? [(<Header floated="left">
      Voting Proxies
      </Header>),
    (
        <Container floated="right" style={{ marginBottom: '50px' }}>
          {(settings.blockchain.tokenSymbol!=='WAX') ?
            <ProxiesButtonProxy
              accounts={accounts}
              actions={actions}
              blockExplorers={blockExplorers}
              currentProxyReg={currentProxyReg}
              onClose={this.onClose}
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />:''}
          </Container>
      ),(
        <Visibility
          continuous
          key="ProxiesTable"
          fireOnMount
          onBottomVisible={this.loadMore}
          once={false}
        >
          <ProxiesTable
            accounts={accounts}
            actions={actions}
            addProxy={addProxy}
            attached="top"
            currentProxy={currentProxy}
            blockExplorers={blockExplorers}
            globals={globals}
            isProxying={isProxying}
            isQuerying={this.isQuerying}
            isValidUser={isValidUser}
            proxies={proxies}
            removeProxy={removeProxy}
            resetDisplayAmount={this.resetDisplayAmount}
            settings={settings}
            system={system}
          />
        </Visibility>
      ), (
          (!querying && amount < proxies.length)
            ? (
              <Segment key="ProxiesTableLoading" clearing padded vertical>
                <Loader active />
              </Segment>
            ) : false
        )] : [(<Container floated="right" style={{ marginBottom: '50px' }}>
        <ProxiesButtonProxy
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
      </Container>),(
          <Segment attached="bottom" stacked>
            <Header textAlign="center">
              {t('producers_proxies_none_loaded')}
            </Header>
          </Segment>
      )];
  }
}

export default translate('producers')(Proxies);
