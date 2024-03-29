// @flow
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Form, Header, Icon, Input, Message, Modal, Segment, Table } from 'semantic-ui-react';

import * as WalletActions from '../../../actions/wallet';

const { ipcRenderer } = require('electron');
const CryptoJS = require('crypto-js');

class GlobalButtonElevate extends Component<Props> {
  state = {
    password: '',
    open: false,
    viewKeys: false,
    walletData: []
  }

  componentDidUpdate(prevProps) {
    const { validate } = this.props;
    if (
      this.state.open
      && prevProps.validate.WALLET_PASSWORD === 'PENDING'
      && validate.WALLET_PASSWORD === 'SUCCESS'
    ) {
      const { password } = this.state;
      this.showKeys(password);
    }
  }

  showKeys = (password) => {
    const {
      wallets,
      settings
    } = this.props;

    const tableData = wallets.map((wallet, i) => {
      const decrypted = WalletActions.decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
      return {
        account: wallet.account,
        key: decrypted,
        pubkey: wallet.pubkey,
        blockchain: settings.blockchains.find(blockchain => blockchain.chainId === wallet.chainId).blockchain,
        id: i
      };
    });

    this.setState({ walletData: tableData });
  }

  clearKeys = () => {
    this.setState({ walletData: [] });
  }

  onChange = (e, { value }) => this.setState({ password: value })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => {
    this.setState({ open: true });
  }

  onClose = () => {
    this.setState({
      open: false,
      viewKeys: false
    });
    this.clearKeys();
  }

  onSubmit = () => {
    const {
      actions,
      wallet
    } = this.props;
    const {
      validateWalletPassword
    } = actions;
    const {
      password
    } = this.state;
    validateWalletPassword(password, wallet);
    this.setState({
      viewKeys: true
    });
  }

  exportKeys = () => {
    const { actions } = this.props;
    const { walletData } = this.state;
    ipcRenderer.send(
      'saveFile',
      JSON.stringify(walletData.map(keyObj => { 
        delete keyObj.id;
        return keyObj;
      })),
      'wallet-keys'
    );
    ipcRenderer.once('lastFileSuccess', (event, file) => {
      actions.setSetting('lastFilePath', file.substring(0, file.lastIndexOf('/')));
      actions.setSetting('lastBackupDate', Date.now());
    });
  }

  render() {
    const {
      settings,
      t,
      trigger,
      validate
    } = this.props;
    const {
      open,
      viewKeys,
      walletData
    } = this.state;

    const keysVisible = viewKeys && walletData.length > 0;
    const pending = (
      validate.WALLET_PASSWORD === 'PENDING' ||
      (
        viewKeys
        && walletData.length === 0
        && validate.WALLET_PASSWORD !== 'FAILURE'
      )
    );
    const modalSize = keysVisible ? 'keys' : 'tiny';

    let modalContent;

    const walletKeys = walletData.map((wallet) => {
      return (
        <Table.Row key={wallet.id}>
          <Table.Cell>{wallet.blockchain}</Table.Cell>
          <Table.Cell>{wallet.account}</Table.Cell>
          <Table.Cell>{wallet.pubkey}</Table.Cell>
          <Table.Cell>{wallet.key}</Table.Cell>
        </Table.Row>
      );
    });

    if (keysVisible) {
      modalContent = (
        <Fragment>
          <Header icon="key" content={t('global_button_elevate_keys_modal_title')} />
          <Modal.Content>
            <Segment basic>
              <h3>{t('global_button_elevate_keys_modal_description')}</h3>
              <Table celled unstackable className="keys">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Network</Table.HeaderCell>
                    <Table.HeaderCell>Account</Table.HeaderCell>
                    <Table.HeaderCell>Public Key</Table.HeaderCell>
                    <Table.HeaderCell>Private Key</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {walletKeys}
                </Table.Body>
              </Table>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.onClose}
            >
              <Icon name="x" /> {t('close')}
            </Button>
            <Button
              color="green"
              content={t('Export Keys')}
              icon="save"
              onClick={this.exportKeys}
            />
          </Modal.Actions>
        </Fragment>
      );
    } else {
      modalContent = (
        <Fragment>
          <Header icon="unlock" content={t('global_button_elevate_modal_title')} />
          <Modal.Content>
            <Segment basic>
              <h3>{t('global_button_elevate_modal_description')}</h3>
              <Form.Field
                autoFocus
                control={Input}
                disabled={pending}
                fluid
                label={t('wallet:wallet_panel_password_label')}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                type="password"
              />
            </Segment>
            {(settings && settings.walletMode !== 'cold' && validate.WALLET_PASSWORD === 'FAILURE')
                ? (
                  <Message
                    content={t('global_button_elevate_failure_content')}
                    error
                    header={t('global_button_elevate_failure_header')}
                    icon="warning circle"
                  />
                ) : null
              }
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.onClose}
            >
              <Icon name="x" /> {t('cancel')}
            </Button>
            <Button
              color="green"
              content={t('global_button_elevate')}
              disabled={pending}
              loading={pending}
              icon="unlock"
              onClick={this.onSubmit}
            />
          </Modal.Actions>
        </Fragment>
      );
    }

    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={open}
        className={modalSize}
      >
        {modalContent}

      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonElevate);
