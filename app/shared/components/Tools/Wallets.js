// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Label, Popup, Segment, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../containers/Global/Button/Elevate';
import GlobalButtonAccountImport from '../Global/Button/Account/Import';

import { find } from 'lodash';

class ToolsWallets extends Component<Props> {
  removeWallet = (account) => {
    const { actions } = this.props;
    actions.removeWallet(account.account, account.chainId, account.authorization);
  }
  swapWallet = (account, password = false) => {
    const { actions, settings } = this.props;

    // if we're not on the chain associated with this wallet, do so now...
    const blockchain = settings.blockchains.filter( (c) => { return c.chainId === account.chainId})[0];
    if (blockchain && blockchain.chainId !== settings.blockchain.chainId) {
      actions.setSetting('blockchain', blockchain);
      actions.setSettingWithValidation('node', blockchain.node);
      actions.changeCoreTokenSymbol(blockchain.tokenSymbol);
    }

    actions.useWallet(account.account, account.chainId);
    if (password) {
      actions.unlockWallet(password);
    }
  }
  render() {
    const {
      settings,
      t,
      validate,
      wallet,
      wallets
    } = this.props;
    return (
      <Segment basic>
        <Button.Group floated="right">
          <GlobalButtonAccountImport
            settings={settings}
          />
        </Button.Group>
        <Header floated="left">
          {t('tools_wallets_header')}
          <Header.Subheader>
            {t('tools_wallets_subheader')}
          </Header.Subheader>
        </Header>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('tools_wallets_account')}</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">{t('tools_wallets_mode')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_wallets_controls')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(wallets)
                .sort((a, b) => {
                  const k1 = `${a.chainId}-${a.account}@${a.authorization}`;
                  const k2 = `${b.chainId}-${b.account}@${b.authorization}`;
                  return k1 > k2;
                })
                .map((account) => (
                  <Table.Row key={account.account + account.authorization + account.chainId}>
                    <Table.Cell>
                      <Header size="small">
                      {settings.blockchains.find( c => c.chainId === account.chainId)
                      && settings.blockchains.find( c => c.chainId === account.chainId).blockchain ?
                      settings.blockchains.find( (c) => c.chainId === account.chainId).blockchain : ''} 
                      ({account.account}@{account.authorization})
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Popup
                        content={t(`wallet:wallet_mode_explain_${account.mode}`)}
                        inverted
                        trigger={(
                          <Label
                            basic
                            content={t(`global:global_modal_account_import_${account.mode}_wallet`)}
                            icon={(account.mode === 'wait') ? 'loading sync' : 'disk'}
                            position="left center"
                          />
                        )}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      {(account.mode === 'watch')
                        ? (
                          <Button
                            color="green"
                            content={t('tools_wallets_swap')}
                            disabled={(account.account === wallet.account && 
                              account.authorization == wallet.authorization && 
                              account.chainId === wallet.chainId)}
                            icon="random"
                            onClick={() => this.swapWallet(account)}
                          />
                        )
                        : (
                          <GlobalButtonElevate
                            onSuccess={(password) => this.swapWallet(account, password)}
                            settings={settings}
                            trigger={(
                              <Button
                                color="green"
                                content={t('tools_wallets_swap')}
                                disabled={(account.account === wallet.account && 
                                  account.authorization == wallet.authorization && 
                                  account.chainId === wallet.chainId)}
                                icon="random"
                              />
                            )}
                            validate={validate}
                            wallet={account}
                          />
                        )
                      }
                      {(account.mode === 'watch')
                        ? (
                          <Button
                            color="red"
                            disabled={(account.account === wallet.account && 
                              account.authorization == wallet.authorization && 
                              account.chainId === wallet.chainId)}
                            icon="trash"
                            onClick={() => this.removeWallet(account)}
                          />
                        )
                        : (
                          <GlobalButtonElevate
                            onSuccess={() => this.removeWallet(account)}
                            settings={settings}
                            trigger={(
                              <Button
                                color="red"
                                disabled={(account.account === wallet.account && 
                                  account.authorization == wallet.authorization && 
                                  account.chainId === wallet.chainId)}
                                icon="trash"
                              />
                            )}
                            validate={validate}
                            wallet={account}
                          />
                        )
                      }
                    </Table.Cell>
                  </Table.Row>
            )))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsWallets);
