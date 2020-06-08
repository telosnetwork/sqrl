// @flow
import React, { Component } from 'react';
import { Tab, Grid, Divider } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import BlockProducers from './Producers/BlockProducers';
import ProducersProxy from './Producers/Proxy';
import GovernanceArbitration from './Producers/Arbitration';
import GovernanceProposals from './Producers/Proposals';
import GovernanceRatifyAmend from './Producers/RatifyAmend';
import GovernanceRatify from './Producers/Ratify';
import GovernanceTFVoting from './Producers/TFVoting';
import ProducersVotingPreview from './Producers/BlockProducers/Modal/Preview';
import Proxies from './Producers/Proxies';
import ProducersSelector from './Producers/BlockProducers/Selector';
import GovernanceButtonRefreshVote from './Producers/RefreshVote';
import SidebarAccount from '../containers/Sidebar/Account';
import WalletPanel from './Wallet/Panel';

type Props = {
  actions: {
    clearSystemState: () => void,
    getAccount: () => void,
    getGlobals: () => void,
    getProducers: () => void,
    voteproducers: () => void
  },
  accounts: {},
  arbitration: {
    arbitrators: {},
    leaderboards: {}
  },
  balances: {},
  blockExplorers: {},
  globals: {},
  history: {},
  producers: {
    lastTransaction: {},
    selected: []
  },
  proposals: {
    list: {},
    votes: {}
  },
  tfvoting: {
    tfvtbalances: {},
    tfvtboardmembers: {},
    tfvtnominees: {}
  },
  settings: {},
  system: {},
  t: () => void,
  validate: {},
  wallet: {}
};

class Producers extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      amount: 50,
      lastError: false,
      lastTransaction: {},
      previewing: false,
      querying: false,
      selected: [],
      selected_account: false,
      selected_loaded: false,
      submitting: false,
      activeTabIndex: 0
    };
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ activeTabIndex: activeIndex })

  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const { settings, system } = nextProps;
    const nextValidate = nextProps.validate;
    // On a new node connection, update props + producers
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.props.actions.getGlobals();
    }
    // Update state when the transaction has gone through
    if (
      this.state.submitting
      && (
        this.state.lastTransaction !== system.VOTEPRODUCER_LAST_TRANSACTION
        || this.state.lastError !== system.VOTEPRODUCER_LAST_ERROR
      )
    ) {
      this.setState({
        lastError: system.VOTEPRODUCER_LAST_ERROR,
        lastTransaction: system.VOTEPRODUCER_LAST_TRANSACTION,
        submitting: false
      });
    }
    // If no selected are loaded, attempt to retrieve them from the props
    if (
      !this.state.selected_loaded
      || this.state.selected_account !== settings.account
      || (nextProps.producers.proxy && nextProps.producers.proxy !== this.state.selected_account)
    ) {
      const { accounts } = nextProps;
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          const selected_account = account.voter_info.proxy || account.account_name;
          let selected = account.voter_info.producers
          if (selected_account !== settings.account && accounts[selected_account]) {
            selected = accounts[selected_account].voter_info.producers;
          }
          // If the voter_info entry exists, load those votes into state
          this.setState({
            selected,
            selected_account,
            selected_loaded: true
          });
        } else {
          // otherwise notify users that they must stake before allowed voting
        }
      }
    }
  }


  addProxy = (proxyAccout) => {
    this.setState({
      addProxy: proxyAccout
    });
  }

  removeProxy = () => {
    this.setState({
      removeProxy: true
    });
  }

  onClose = () => {
    this.setState({
      addProxy: false,
      removeProxy: false
    });
  }

  addProposal = () => {
    this.setState({
      addProposal: true
    });
  }

  removeProposal = () => {
    this.setState({
      removeProposal: true
    });
  }

  onCloseProposal = () => {
    this.setState({
      addProposal: false,
      removeProposal: false
    });
  }

  addArbCandidate = () => {
    this.setState({
      addArbCandidate: true
    });
  }

  removeArbCandidate = () => {
    this.setState({
      removeArbCandidate: true
    });
  }

  onCloseArbCandidate = () => {
    this.setState({
      addArbCandidate: false,
      removeArbCandidate: false
    });
  }

  addProducer = (producer) => {
    const producers = [...this.state.selected];
    if (producers.indexOf(producer) === -1) {
      producers.push(producer);
      producers.sort();
      this.setState({
        selected: producers
      });
    }
  }

  removeProducer = (producer) => {
    const producers = [...this.state.selected];
    const index = producers.indexOf(producer);
    if (index !== -1) {
      producers.splice(index, 1);
    }
    this.setState({
      selected: producers
    });
  }

  previewProducerVotes = (previewing) => this.setState({
    previewing,
    lastError: false, // Reset the last error
    lastTransaction: {} // Reset the last transaction
  });

  submitProducerVotes = () => {
    const {
      clearSystemState,
      voteproducers
    } = this.props.actions;
    const {
      selected
    } = this.state;
    const { 
      producers
    } = this.props;
    clearSystemState();
    //make sure selected producers weren't kicked
    //while user was in the research process
    const compliantProducers = producers.list
      .filter((p) => {return selected.indexOf(p.owner) !== -1})
      .map((s) => {return s.owner});

    voteproducers(compliantProducers);
    this.setState({
      lastError: false, // Reset the last error
      lastTransaction: {}, // Reset the last transaction
      submitting: true
    });
  }

  render() {
    const {
      actions,
      accounts,
      actionHistories,
      balances,
      blockExplorers,
      connection,
      globals,
      history,
      keys,
      producers,
      settings,
      system,
      t,
      tables,
      transaction,
      validate,
      wallet
    } = this.props;
    const {
      activeTabIndex,
      addProxy,
      lastError,
      lastTransaction,
      previewing,
      removeProxy,
      selected,
      submitting
    } = this.state;
    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        balances={balances}
        blockExplorers={blockExplorers}
        globals={globals}
        key="WalletPanel"
        keys={keys}
        settings={settings}
        system={system}
        transaction={transaction}
        validate={validate}
        wallet={wallet}
        connection={connection}
      />
    )];
    const account = accounts[settings.account];
    const isMainnet = (connection && connection.chain && connection.chain.toLowerCase().indexOf('mainnet') !== -1);
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
    const currentProxy = (account && account.voter_info && account.voter_info.proxy);

    const columnWidth = (activeTabIndex == 0 || activeTabIndex == 1) ? 11 : 16;
    
    if (isValidUser && settings.walletMode !== 'wait') {
      sidebar = (
        <React.Fragment>
          <div>
            <GovernanceButtonRefreshVote
              account={account}
              accounts={accounts}
              actions={actions}
              actionHistories={actionHistories}
              addProxy={addProxy}
              balances={balances}
              blockExplorers={blockExplorers}
              currentProxy={currentProxy}
              keys={keys}
              isProxying={isProxying}
              isValidUser={isValidUser}
              onClose={this.onClose}
              producers={producers}
              removeProxy={removeProxy}
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
            />
            <Divider hidden />
          </div>
          <ProducersProxy
            account={account}
            accounts={accounts}
            actions={actions}
            addProxy={addProxy}
            blockExplorers={blockExplorers}
            currentProxy={currentProxy}
            keys={keys}
            isProxying={isProxying}
            isValidUser={isValidUser}
            onClose={this.onClose}
            removeProxy={removeProxy}
            settings={settings}
            system={system}
            tables={tables}
          />

          <Divider hidden />

          {(!isProxying) ? (
            <ProducersVotingPreview
              actions={actions}
              blockExplorers={blockExplorers}
              lastError={lastError}
              lastTransaction={lastTransaction}
              open={previewing}
              onClose={() => this.previewProducerVotes(false)}
              onConfirm={this.submitProducerVotes.bind(this)}
              onOpen={() => this.previewProducerVotes(true)}
              selected={selected}
              settings={settings}
              submitting={submitting}
              system={system}
            />
          ) : ''}

          <ProducersSelector
            account={accounts[settings.account]}
            isProxying={isProxying}
            modified={modified}
            producers={producers}
            removeProducer={this.removeProducer.bind(this)}
            selected={selected}
            settings={settings}
            submitProducerVotes={() => this.previewProducerVotes(true)}
            submitting={submitting}
          />
        </React.Fragment>
      );
    }
    return (
      <div ref={this.handleContextRef}>
        <Grid divided>
          <Grid.Row>
            {( activeTabIndex == 0 || activeTabIndex == 1) ?
            <Grid.Column width={5}>
              <SidebarAccount
                actions={actions}
                history={history}
                wallet={wallet}
              />
              {sidebar}
            </Grid.Column>
            : '' }
            <Grid.Column width={columnWidth}>
              <Tab onTabChange={this.handleTabChange}
                panes={
                  (settings.blockchain.tokenSymbol==='TLOS') ?
                  [
                    {
                      menuItem: t('producers_block_producers'),
                      render: () => {
                        return (
                          <Tab.Pane>
                            <BlockProducers
                              {...this.props}
                              addProducer={this.addProducer.bind(this)}
                              removeProducer={this.removeProducer.bind(this)}
                              selected={selected}
                            />
                          </Tab.Pane>
                        );
                      }
                    },
                    {
                      menuItem: t('producers_proxies'),
                      render: () => {
                        return (
                          <Tab.Pane>
                            <Proxies
                              {...this.props}
                              addProxy={this.addProxy.bind(this)}
                              removeProxy={this.removeProxy.bind(this)}
                            />
                          </Tab.Pane>
                        );
                      }
                    },
                    {
                      menuItem: 'Proposals',
                      render: () => {
                        return (
                          <Tab.Pane>
                            <GovernanceProposals
                              {...this.props}
                              onCloseProposal={this.onCloseProposal.bind(this)}
                              isValidUser={isValidUser}
                            />
                          </Tab.Pane>
                        );
                      }
                    },
                    /*{
                      menuItem: 'Arbitration',
                      render: () => {
                        return (
                          <Tab.Pane>
                            <GovernanceArbitration
                              {...this.props}
                            />
                          </Tab.Pane>
                        );
                      }
                    },
                    {
                      menuItem: 'TF Voting',
                      render: () => {
                        return (
                          <Tab.Pane>
                            <GovernanceTFVoting
                              {...this.props}
                            />
                          </Tab.Pane>
                        );
                      }
                    },*/
                    {
                      menuItem: 'Ratify',
                      render: () => {
                        return (
                          <Tab.Pane>
                            <GovernanceRatify
                              {...this.props}
                            />
                          </Tab.Pane>
                        );
                      }
                    },
                    {
                      menuItem: 'Docs',
                      render: () => {
                        return (
                          <Tab.Pane>
                            <GovernanceRatifyAmend
                              {...this.props}
                            />
                          </Tab.Pane>
                        );
                      }
                    }
                  ] : (settings.blockchain.tokenSymbol==='WAX') ? [{
                    menuItem: t('producers_block_producers'),
                    render: () => {
                      return (
                        <Tab.Pane>
                          <BlockProducers
                            {...this.props}
                            addProducer={this.addProducer.bind(this)}
                            removeProducer={this.removeProducer.bind(this)}
                            selected={selected}
                          />
                        </Tab.Pane>
                      );
                    }
                    },
                    {
                      menuItem: t('producers_proxies'),
                      render: () => {
                        return (
                          <Tab.Pane>
                            <Proxies
                              {...this.props}
                              addProxy={this.addProxy.bind(this)}
                              removeProxy={this.removeProxy.bind(this)}
                            />
                          </Tab.Pane>
                        );
                      }
                    }] : [{
                    menuItem: t('producers_block_producers'),
                    render: () => {
                      return (
                        <Tab.Pane>
                          <BlockProducers
                            {...this.props}
                            addProducer={this.addProducer.bind(this)}
                            removeProducer={this.removeProducer.bind(this)}
                            selected={selected}
                          />
                        </Tab.Pane>
                      );
                    }
                  }]
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default translate('producers')(Producers);
