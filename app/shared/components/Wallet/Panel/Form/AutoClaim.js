// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Radio, Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormAutoClaimStats from './AutoClaim/Stats';

type Props = {
  actions: {},
  account: {},
  system: {}
};

class WalletPanelFormAutoClaim extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let { account, settings } = props;
    if (!account) account = {};
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth || {
      cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
      net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
    };

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];

    this.state = {
      cpuOriginal: Decimal(parsedCpuWeight),
      lastClaimTime: {},
      nextClaimTime: {},
      rewardsDue: 0,
      stakedBalance: 0,
      secondsSinceClaimed: 0,
      netOriginal: Decimal(parsedNetWeight)
    };
  }

  componentWillMount() {
    const {
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.props;

    this.setState({
      cpuOriginal: cpuOriginal || cpuAmount || Decimal(0),
      netOriginal: netOriginal || netAmount || Decimal(0)
    });
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    const {
      accounts,
      settings
    } = this.props;

    const {
      cpuOriginal,
      netOriginal
    } = this.state;

    if (accounts[settings.account]) {
      const account = accounts[settings.account];
      if (account.voter_info && account.voter_info.last_claim_time) {

        const lastClaimed = new Date(account.voter_info.last_claim_time+'z');
        const nextClaim = new Date(lastClaimed);
        nextClaim.setHours(lastClaimed.getHours() + 24);

        const secondsSince = ((new Date().getTime() - lastClaimed.getTime()) / 1000);
        const staked = cpuOriginal.plus(netOriginal);
        const rewards = 0.000000010560287 * secondsSince * staked;
        
        this.setState({ 
          lastClaimTime: lastClaimed,
          nextClaimTime: nextClaim,
          secondsSinceClaimed: secondsSince,
          stakedBalance: staked,
          rewardsDue: rewards
        });
      }
    }
  }

  claimAutoRestake = () => {
    const {
      actions,
      settings
    } = this.props;

    if (settings.claimGBMRestake === true)
      actions.setSetting('claimGBMRestake', false);
    else {
      actions.setSetting('claimGBMRestake', true);
      actions.setSetting('claimGBMBuyRAM', false);
    }
  }

  claimAutoBuyRAM = () => {
    const {
      actions,
      settings
    } = this.props;

    if (settings.claimGBMBuyRAM === true)
      actions.setSetting('claimGBMBuyRAM', false);
    else {
      actions.setSetting('claimGBMBuyRAM', true);
      actions.setSetting('claimGBMRestake', false);
    }
  }

  claimAutomatically = () => {
    const {
      actions,
      settings
    } = this.props;

    if (settings.claimGBMRewards === true){
      actions.setSetting('claimGBMRewards', false);
      actions.setSetting('claimGBMBuyRAM', false);
      actions.setSetting('claimGBMRestake', false);
    }
    else 
      actions.setSetting('claimGBMRewards', true);
  }

  claimVotingNow = () => {
    const {
      actions
    } = this.props;
    const {
      claimVotingRewards
    } = actions;

    claimVotingRewards();
  }

  claimGBMNow = () => {
    const {
      actions
    } = this.props;
    const {
      claimGBMRewards
    } = actions;

    claimGBMRewards();
  }

  render() {
    const {
      onClose,
      system,
      settings,
      t
    } = this.props;

    const {
      lastClaimTime,
      nextClaimTime,
      rewardsDue,
      secondsSinceClaimed,
      stakedBalance
    } = this.state;
    return (
      <Segment>
        <div>
          <Header>
            Current <u>GBM</u> Stats
          </Header>
          <WalletPanelFormAutoClaimStats
            claimGBMRewards={settings.claimGBMRewards}
            lastClaimTime={lastClaimTime}
            nextClaimTime={nextClaimTime}
            rewardsDue={rewardsDue}
            secondsSinceClaimed={secondsSinceClaimed}
            stakedBalance={stakedBalance}
            settings={settings}
          />
          <Form>
            <Message
              icon="info circle"
              info
              content={t('claimgbm_explanation2', {tokenSymbol:settings.blockchain.tokenSymbol})}
            />
            <Divider />

            {(settings.claimGBMRewards === true ?
              <div>
                <Message
                    attached='bottom' 
                    icon="checkmark"
                    info
                    content={t('claimgbm_currently_auto', {tokenSymbol:settings.blockchain.tokenSymbol})}
                  />
                <Divider />
              </div>
              : '' )}

            <Segment>
              <Button
                content={settings.claimGBMRewards === true ? t('claimgbm_claim_auto_off') : t('claimgbm_claim_auto')}
                color="purple"
                onClick={this.claimAutomatically}
                primary
              />
              <p style={{ float:"right", marginLeft:5 }} >Auto stake rewards</p>
              <Radio 
                style={{ float:"right" , marginLeft:15}} 
                disabled={settings.claimGBMRewards != true} 
                toggle 
                onChange={this.claimAutoRestake} 
                checked={settings.claimGBMRestake===true} /> 
              <p style={{ float:"right", marginLeft:5 }} >Buy RAM with rewards</p>
                <Radio 
                  style={{ float:"right" }} 
                  disabled={settings.claimGBMRewards != true} 
                  toggle 
                  onChange={this.claimAutoBuyRAM} 
                  checked={settings.claimGBMBuyRAM===true} /> 
            </Segment>
            <Segment>
              <Button
                content={t('close')}
                color="grey"
                onClick={onClose}
              />
              <Button
                content={'Claim Genesis Rewards'}
                color="green"
                disabled={rewardsDue <= 0 || secondsSinceClaimed < 86400}
                floated="right"
                onClick={this.claimGBMNow}
                primary
              />
              <Button
                content={'Claim Voting Rewards'}
                color="green"
                disabled={rewardsDue <= 0 || secondsSinceClaimed < 86400}
                floated="right"
                onClick={this.claimVotingNow}
                primary
              />
            </Segment>
          </Form>
        </div>
      </Segment>
    );
  }
}

export default translate('stake')(WalletPanelFormAutoClaim);
