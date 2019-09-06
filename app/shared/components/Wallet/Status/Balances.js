// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';
import { Decimal } from 'decimal.js';

import GlobalDataBytes from '../../Global/Data/Bytes';

class WalletStatusBalances extends Component<Props> {
  claimUnstaked = () => {
    const {
      actions,
      settings
    } = this.props;
    actions.claimUnstaked(settings.account);
  }
  render() {
    const {
      account,
      balances,
      globals,
      rex,
      settings,
      statsFetcher,
      t
    } = this.props;

    const {
      refundDate,
      tokens,
      totalBeingUnstaked,
      totalStakedToSelf,
      totalStakedToOthers,
      totalTokens,
      totalREX
    } = statsFetcher.fetchAll();
    const contracts = balances.__contracts;
    const genesisbalance = balances.__genesisbal && 
      balances.__genesisbal.balance && 
      Decimal(balances.__genesisbal.balance.split(' ')[0]);
    const claimable = (new Date() > refundDate);
    const watchedTokens = (settings.customTokens) ? settings.customTokens.map((token) => token.split(':')[1]) : [];

    let totalUSDValue = 0;
    let usdPrice = 0;
    const totalBalance = totalTokens.toFixed(settings.tokenPrecision);
    if (globals.pricefeed 
      && globals.pricefeed.CUSD
      && globals.pricefeed.CUSD.price 
      && globals.pricefeed.CUSD.base == settings.blockchain.tokenSymbol) {
      usdPrice = Decimal(globals.pricefeed.CUSD.price).toFixed(settings.tokenPrecision);
      totalUSDValue = usdPrice * totalBalance;
    }

    const rows = [
      (
        <Table.Row key={settings.blockchain.tokenSymbol}>
          <Table.Cell width={2}>
            <Header>
            {settings.blockchain.tokenSymbol}
              <Header.Subheader>
                eosio.token
              </Header.Subheader>
            </Header>
          </Table.Cell>
          <Table.Cell width={10}>
            <Table size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>{t('wallet_status_liquid')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  <Table.Cell>{(tokens[settings.blockchain.tokenSymbol]) ? tokens[settings.blockchain.tokenSymbol].toFixed(settings.tokenPrecision) : '0.'.padEnd(settings.tokenPrecision + 2, '0')} {settings.blockchain.tokenSymbol}</Table.Cell>
                </Table.Row>
                {(settings.blockchain.tokenSymbol === 'WAX') ?
                  <Table.Row>
                    <Table.Cell width={4}>Genesis Tokens</Table.Cell>
                    <Table.Cell>{(genesisbalance) ? genesisbalance.toFixed(settings.tokenPrecision) : '0.'.padEnd(settings.tokenPrecision + 2, '0')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  </Table.Row>
                : ''}
                {(totalREX > 0 && rex && rex.rexpool) ?
                  <Table.Row>
                    <Table.Cell width={4}>Staked to REX</Table.Cell>
                    <Table.Cell>{(totalREX) ? totalREX.toFixed(settings.tokenPrecision) : '0.'.padEnd(settings.tokenPrecision + 2, '0')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  </Table.Row>
                : ''}
                <Table.Row>
                  <Table.Cell>{t('wallet_status_balances_staked_to_self')}</Table.Cell>
                  <Table.Cell>{totalStakedToSelf.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol} </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_balances_staked_to_others')}</Table.Cell>
                  <Table.Cell>{totalStakedToOthers.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol} </Table.Cell>
                </Table.Row>
                {(refundDate)
                  ? (
                    <Table.Row>
                      <Table.Cell>{t('wallet_status_resources_being_unstaked')} </Table.Cell>
                      <Table.Cell>
                        {(claimable)
                          ? (
                            <Button
                              color="blue"
                              content={t('wallet_status_resources_claim_unstaked')}
                              floated="right"
                              onClick={this.claimUnstaked}
                              size="small"
                            />
                          )
                          : false
                        }
                        {totalBeingUnstaked.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol} (<TimeAgo date={refundDate} />)
                      </Table.Cell>
                    </Table.Row>
                  )
                  : false
                }
                <Table.Row>
                  <Table.Cell>{t('wallet_status_total_balance')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  <Table.Cell>{totalTokens.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total USD</Table.Cell>
                  <Table.Cell>${totalUSDValue.toFixed(settings.tokenPrecision)} (${usdPrice}/{settings.blockchain.tokenSymbol})</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_ram_amount')}</Table.Cell>
                  <Table.Cell>
                    <GlobalDataBytes
                      bytes={account.ram_quota}
                    />

                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Table.Cell>
        </Table.Row>
      )
    ];
    // Add rows for remaining tokens
    forEach(tokens, (amount, token) => {
      if (token === settings.blockchain.tokenSymbol || watchedTokens.indexOf(token) === -1) return;
      let contract = 'unknown';
      let precision = {
        [token]: 4
      };
      if (contracts && contracts[token]) {
        ({ contract, precision } = contracts[token]);
      }
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            <Header>
              {token}
              <Header.Subheader>
                {contract}
              </Header.Subheader>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {amount.toFixed(precision[token])}
          </Table.Cell>
        </Table.Row>
      ));
    });
    return (
      <Segment vertical basic loading={!tokens}>
        <Header>
          {t('wallet_status_add_custom_token_header')}
          <Header.Subheader>
            {t('wallet_status_add_custom_token_subheader')}
          </Header.Subheader>
        </Header>
        <Table
          attached="bottom"
          definition
          unstackable
        >
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusBalances);
