// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Image, Popup, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';
import { Decimal } from 'decimal.js';
import NumberFormat from 'react-number-format';

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

    let coreTokenInfo = globals.remotetokens && globals.remotetokens.filter((t)=>t.symbol==settings.blockchain.tokenSymbol)[0];
    let coreTokenName = settings.blockchain.tokenSymbol;
    if (coreTokenInfo) 
      coreTokenName = coreTokenInfo.name;
    else 
      coreTokenInfo = {logo:null};

    const rows = [
      (
        <Table.Row key={settings.blockchain.tokenSymbol}>
          <Table.Cell width={2}>
            <Header>
              <Image src={coreTokenInfo.logo} rounded bordered size="mini" />&nbsp;{coreTokenName}
            </Header>
          </Table.Cell>
          <Table.Cell width={10}>
            <Table size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>{t('wallet_status_liquid')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  <Table.Cell>{(tokens[settings.blockchain.tokenSymbol]) ? 
                    <NumberFormat value={tokens[settings.blockchain.tokenSymbol].toFixed(settings.tokenPrecision)} 
                      displayType={'text'}
                      thousandSeparator={true}
                    /> : 
                    '0.'.padEnd(settings.tokenPrecision + 2, '0')} {settings.blockchain.tokenSymbol}</Table.Cell>
                </Table.Row>
                {(settings.blockchain.tokenSymbol === 'WAX') ?
                  <Table.Row>
                    <Table.Cell width={4}>Genesis Tokens</Table.Cell>
                    <Table.Cell>{(genesisbalance) ? 
                      <NumberFormat value={genesisbalance.toFixed(settings.tokenPrecision)} 
                        displayType={'text'}
                        thousandSeparator={true}
                      /> : '0.'.padEnd(settings.tokenPrecision + 2, '0')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  </Table.Row>
                : ''}
                {(totalREX > 0 && rex && rex.rexpool) ?
                  <Table.Row>
                    <Table.Cell width={4}>Staked to REX</Table.Cell>
                    <Table.Cell>{(totalREX) ? 
                      <NumberFormat value={totalREX.toFixed(settings.tokenPrecision)} 
                        displayType={'text'}
                        thousandSeparator={true}
                      /> : '0.'.padEnd(settings.tokenPrecision + 2, '0')} {settings.blockchain.tokenSymbol}</Table.Cell>
                  </Table.Row>
                : ''}
                <Table.Row>
                  <Table.Cell>{t('wallet_status_balances_staked_to_self')}</Table.Cell>
                  <Table.Cell>
                    <NumberFormat value={totalStakedToSelf.toFixed(settings.tokenPrecision)} 
                        displayType={'text'}
                        thousandSeparator={true}
                      /> {settings.blockchain.tokenSymbol} </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_balances_staked_to_others')}</Table.Cell>
                  <Table.Cell>
                    <NumberFormat value={totalStakedToOthers.toFixed(settings.tokenPrecision)} 
                        displayType={'text'}
                        thousandSeparator={true}
                      /> {settings.blockchain.tokenSymbol} </Table.Cell>
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
                        <NumberFormat value={totalBeingUnstaked.toFixed(settings.tokenPrecision)} 
                        displayType={'text'}
                        thousandSeparator={true}
                      /> {settings.blockchain.tokenSymbol} (<TimeAgo date={refundDate} />)
                      </Table.Cell>
                    </Table.Row>
                  )
                  : false
                }
              </Table.Body>
            </Table>
          </Table.Cell>
        </Table.Row>
      )
    ];
    // Add rows for remaining tokens
    forEach(tokens, (amount, token) => {
      if (token.toUpperCase() === settings.blockchain.tokenSymbol || watchedTokens.indexOf(token) === -1 || amount < 0.0002) return;
      let tokenInfo = globals.remotetokens && globals.remotetokens.filter((t)=>t.symbol==token && t.chain.toUpperCase()==settings.blockchain.tokenSymbol)[0];
      
      let tokenName = token;
      let contract = 'unknown';
      let precision = {
        [token]: 4
      };
      if (contracts && contracts[token]) {
        ({ contract, precision } = contracts[token]);
      }
      if (tokenInfo)
        tokenName = tokenInfo.name;
      else
        tokenInfo = {logo:null};
      
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            <Header>
              <Image src={tokenInfo.logo} rounded bordered size="mini" />&nbsp;{tokenName}
            </Header>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat value={amount.toFixed(precision[token])}
              displayType={'text'}
              thousandSeparator={true}
            /> {token}
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
