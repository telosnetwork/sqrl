// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import StatsFetcher from '../../../../../../utils/StatsFetcher';

class WalletPanelFormExchangeUnStakeToConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      account,
      balance,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      netOriginal,
      onBack,
      settings,
      t
    } = this.props;

    const cpuAmount = decimalCpuAmount.toNumber();
    const netAmount = decimalNetAmount.toNumber();

    const cpuDifference = cpuAmount - cpuOriginal.toNumber();
    const netDifference = netAmount - netOriginal.toNumber();

    const lessThanOneEosStaked = (cpuAmount < 1 || netAmount < 1);

    const statsFetcher = new StatsFetcher(account, balance, settings);

    const refundDate = statsFetcher.refundDate();

    const unstaking = (cpuDifference < 0 || netDifference < 0);

    return (
      <div>
        <Segment padding="true" basic>
          {(unstaking) ? (
            <Header textAlign="center">
              {t('rex_unstaketo_explanation_confirm')}
            </Header>
          ) : ''}
          <Segment.Group>
            <Segment>
              <Header textAlign="center">
                <font color="red">
                  <Icon name="wifi" />{t('about_to_unstake_from_net')} {(-netAmount).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                </font>
                <Header.Subheader>
                  ({t('you_will_have')} {netDifference.toFixed(settings.tokenPrecision)} {t('eos_in_net_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
                </Header.Subheader>
              </Header>
            </Segment>

            <Segment>
              <Header textAlign="center">
                <font color="red">
                  <Icon name="microchip" />{t('about_to_unstake_from_cpu')} <b>{(-cpuAmount).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</b>
                </font>
                <Header.Subheader>
                  ({t('you_will_have')} {cpuDifference.toFixed(settings.tokenPrecision)} {t('eos_in_cpu_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
                </Header.Subheader>
              </Header>
            </Segment>
          </Segment.Group>

          {(lessThanOneEosStaked) ? (
            <Message warning="true">{t('will_have_less_than_one_eos_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}</Message>
          ) : ''}

          <Divider />
          <Button
            onClick={onBack}
          >
            <Icon name="arrow left" /> {t('back')}
          </Button>
          <Button
            color="blue"
            floated="right"
            onClick={this.onConfirm}
          >
            <Icon name="check" /> {t('confirm_stake')}
          </Button>
        </Segment>  
      </div>
    );
  }
}

export default translate('stake')(WalletPanelFormExchangeUnStakeToConfirming);
