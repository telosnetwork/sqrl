// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { forEach } from 'lodash';
import { Decimal } from 'decimal.js';
import eos from '../actions/helpers/eos';
import calculateAmountOfRam from '../components/helpers/calculateAmountOfRam';
import EOSAccount from '../utils/EOS/Account';
import { Segment } from 'semantic-ui-react';

import About from '../components/About';
import Exchange from '../components/Exchange';
import Producers from '../components/Producers';
import TabMenu from '../components/TabMenu';
import APIIntegration from '../../wallet-integration/components/api.integration';
import Tools from './Tools';
import Wallet from '../components/Wallet';
import ModalConstitution from '../components/Global/Modal/Constitution';

import * as AccountsActions from '../actions/accounts';
import * as ArbitrationActions from '../actions/governance/arbitration';
import * as BlockExplorersActions from '../actions/blockexplorers';
import * as BuyRamBytesActions from '../actions/system/buyrambytes';
import * as BuyRamActions from '../actions/system/buyram';
import * as ContractsActions from '../actions/contracts';
import * as CreateAccountActions from '../actions/createaccount';
import * as ChainActions from '../actions/chain';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as ProposalsActions from '../actions/governance/proposals';
import * as ProxyActions from '../actions/system/community/regproxyinfo';
import * as REXActions from '../actions/rex';
import * as SellRamActions from '../actions/system/sellram';
import * as SettingsActions from '../actions/settings';
import * as StakeActions from '../actions/stake';
import * as TableActions from '../actions/table';
import * as TFVotingActions from '../actions/governance/tfvoting';
import * as TransactionActions from '../actions/transaction';
import * as TransferActions from '../actions/transfer';
import * as ValidateActions from '../actions/validate';
import * as VoteProducerActions from '../actions/system/voteproducer';
import * as WalletActions from '../actions/wallet';
import * as SystemStateActions from '../actions/system/systemstate';
import { isArray } from 'util';

type Props = {
  accounts: {},
  actions: {
    getAccount: () => void,
    getGlobals: () => void,
    getInfo: () => void
  },
  balances: {},
  history: {},
  keys: {},
  settings: {},
  system: {},
  validate: {},
  wallet: {}
};

class BasicVoterContainer extends Component<Props> {
  props: Props;

  state = {
    activeItem: 'wallet'
  };

  componentWillReceiveProps() {
    const { 
      actions,
      blockExplorers,
      settings,
      system
    } = this.props;

    if (system.BLOCKEXPLORERS === 'SUCCESS' && !settings.blockExplorer) {
      system.BLOCKEXPLORERS = '';
      
       // look for compatible block explorer based on token, else use first
      const blockExplorerKeys = Object.keys(blockExplorers);
      let blockExplorer = blockExplorers[blockExplorerKeys[0]];
      blockExplorerKeys.forEach( (blockExplorerKey) => {
        const explorer = blockExplorers[blockExplorerKey];
        if (explorer.tokenSymbol == settings.blockchain.tokenSymbol){
          blockExplorer = Object.assign({ 
            name: blockExplorerKey
          }, explorer);
          return;
        }
      });

      if (blockExplorer)
        actions.setSetting('blockExplorer', blockExplorer.name);
    }
  }
  
  componentDidMount = async () => {
    const {
      actions,
      globals,
      history,
      settings
    } = this.props;

    const {
      addCustomToken,
      getBlockExplorers,
      getCurrencyStats,
      getCustomTokensRemote,
      getExchangeAPI,
      getProfiles,
      getRamStats,
      getRexPool,
      getRexFund,
      getRexBalance
    } = actions;

    switch (settings.walletMode) {
      case 'cold': {
        history.push('/coldwallet');
        break;
      }
      default: {
        if (!settings.walletInit && !settings.skipImport && !settings.walletTemp) {
          history.push('/');
        } else {

          getCurrencyStats();
          getBlockExplorers();
          getProfiles();
          getRamStats();
          getRexPool();
          getRexFund();
          getRexBalance();

          // open profile for user if not exists ?

          const remoteTokensResult = await getCustomTokensRemote();
          if (remoteTokensResult && remoteTokensResult.payload && isArray(remoteTokensResult.payload)) {
            for (var i = 0; i < remoteTokensResult.payload.length; i++) {
              const remoteToken = remoteTokensResult.payload[i];
              if (remoteToken.chain.toUpperCase()==settings.blockchain.tokenSymbol) {
                const tokenTracked = settings.customTokens.filter((t)=>t.split(':')[0]==remoteToken.account)[0];
                if (!tokenTracked) {
                  await addCustomToken(remoteToken.account, remoteToken.symbol);
                }
              }
            };
          }
          
          await getExchangeAPI();
        }
      }
    }
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      accounts,
      actions,
      connection,
      globals,
      producers,
      settings,
      validate
    } = this.props;
    const {
      claimGBMRewards,
      claimVotingRewards,
      clearSystemState,
      getAccount,
      getCurrencyStats,
      getGlobals,
      getInfo,
      getPriceFeed,
      getPriceFeedGecko,
      getProfiles,
      getRamStats,
      setSetting,
      voteproducers
    } = actions;

    if (validate.NODE === 'SUCCESS') {
      if (settings.account) {
        getAccount(settings.account);
      }
      getCurrencyStats();
      getGlobals();
      getRamStats();
      getInfo();
      getProfiles();

      if (settings.blockchain.tokenSymbol === "TLOS") {
        getPriceFeedGecko("TELOS", "USD", settings.blockchain.tokenSymbol);
        getPriceFeedGecko("TELOS", "EOS", settings.blockchain.tokenSymbol);
      }
      else {
        getPriceFeedGecko(settings.blockchain.tokenSymbol, "USD");
        getPriceFeedGecko(settings.blockchain.tokenSymbol, "EOS");
      }
    }

    if (globals.precision > 0 && settings.tokenPrecision != globals.precision) {
      actions.setSetting('tokenPrecision', globals.precision);
    }

    if (
      settings.blockchain.tokenSymbol === 'WAX' && 
      settings.autoRefreshVote === true && 
      settings.account && accounts[settings.account]) {

      if (settings.autoRefreshVoteDate != '') {
        const lastRefreshDate = new Date(settings.autoRefreshVoteDate);
        const nextRefreshDate = new Date(lastRefreshDate);
        nextRefreshDate.setHours(lastRefreshDate.getHours() + (24 * parseInt(settings.autoRefreshVoteDays)));
        const secondsSince = ((new Date().getTime() - lastRefreshDate.getTime()) / 1000);

        if (secondsSince > (86400 * parseInt(settings.autoRefreshVoteDays))){
          clearSystemState();

          const voter = accounts[settings.account];
          const currentProxy = voter && voter.voter_info && voter.voter_info.proxy;
          const selected = voter && voter.voter_info && voter.voter_info.producers;

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
      }
    }

    if (
      settings.blockchain.tokenSymbol === 'WAX' && 
      settings.claimGBMRewards === true && 
      settings.account) {

       eos(connection).getAccount(settings.account).then((results) => {
        const claimer = results;
        if (claimer.voter_info && claimer.voter_info.last_claim_time) {
          const lastClaimed = new Date(claimer.voter_info.last_claim_time+'z');
          const secondsSince = ((new Date().getTime() - lastClaimed.getTime()) / 1000);
  
          if (secondsSince > 86401) {
            (async () => {
              await Promise.all([claimGBMRewards(), claimVotingRewards()]);
              
              setTimeout(() => {
                eos(connection).getActions(settings.account, -1, -10).then((results) => {
                    const {
                      cpu_weight,
                      net_weight
                    } = claimer.self_delegated_bandwidth || {
                      cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
                      net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
                    };
                    
                    const currentCpuWeight = Decimal(cpu_weight.split(' ')[0]);
                    const currentNetWeight = Decimal(net_weight.split(' ')[0]);
      
                    if (results && results.actions) {
                      let claimActionDone = false;
                      results.actions.map(action => {
                        if (action && action.action_trace && action.action_trace.act) {
                          const trace = action.action_trace.act;
                          if (trace.data && trace.data.from == "genesis.wax" && trace.data.memo == "claimgenesis" && !claimActionDone) {
                            const rewards = Decimal(trace.data.quantity.split(' ')[0]);
                            if (rewards > 0.10) {
                              if (settings.claimGBMRestake === true) {
                                claimActionDone = true;

                                actions.setStake(
                                  settings.account, 
                                  currentNetWeight.plus(rewards/2).toFixed(8), 
                                  currentCpuWeight.plus(rewards/2).toFixed(8)
                                  );
                              } else if (settings.claimGBMBuyRAM === true) {
                                claimActionDone = true;

                                const decPrice = Decimal(rewards - (rewards * 0.0051)); // ram fee
                                const decBaseBal = Decimal(globals.ram.base_balance);
                                const decQuoteBal = Decimal(globals.ram.quote_balance);
                                const decAmount = calculateAmountOfRam(decBaseBal, decQuoteBal, decPrice);
                                const amountOfRam = decAmount.floor();

                                actions.buyrambytes(amountOfRam);
                              }
                            }
                          }
                        }
                      });
                    }
                  })
                }, 2500);
            })();
          }
        }
      })
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const {
      activeItem
    } = this.state;
    const {
      actions,
      keys,
      rex,
      settings,
      system,
      validate,
      wallet
    } = this.props;

    let activeTab = <Producers {...this.props} />;
    switch (activeItem) {
      case 'exchange': {
        activeTab = <Exchange {...this.props} />;
        break;
      }
      case 'wallet': {
        activeTab = <Wallet {...this.props} />;
        break;
      }
      case 'about': {
        activeTab = <About {...this.props} />;
        break;
      }
      case 'tools': {
        activeTab = <Tools {...this.props} />;
        break;
      }
      default: {
        break;
      }
    }
    return (
      <div>
        <TabMenu
          actions={actions}
          activeItem={activeItem}
          handleItemClick={this.handleItemClick}
          locked={(!keys.key)}
          rex={rex}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
        <Segment
          attached="bottom"
          basic
          style={{ borderBottom: 'none' }}
        >
          {activeTab}
        </Segment>
        <APIIntegration actions={actions}/>
        <ModalConstitution
          actions={actions}
          isUser={(keys.account)}
          settings={settings}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    actionHistories: state.actions,
    arbitration: state.arbitration,
    balances: state.balances,
    blockExplorers: state.blockexplorers,
    chain: state.chain,
    connection: state.connection,
    contracts: state.contracts,
    globals: state.globals,
    keys: state.keys,
    producers: state.producers,
    proposals: state.proposals,
    rex: state.rex,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    tfvoting: state.tfvoting,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...ArbitrationActions,
      ...BlockExplorersActions,
      ...BuyRamActions,
      ...BuyRamBytesActions,
      ...ChainActions,
      ...ContractsActions,
      ...CreateAccountActions,
      ...GlobalsActions,
      ...ProducersActions,
      ...ProposalsActions,
      ...ProxyActions,
      ...REXActions,
      ...SellRamActions,
      ...SettingsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...TFVotingActions,
      ...TransactionActions,
      ...TransferActions,
      ...ValidateActions,
      ...VoteProducerActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));
