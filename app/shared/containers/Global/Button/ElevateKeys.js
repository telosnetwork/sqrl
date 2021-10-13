// @flow
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Form, Header, Icon, Input, Message, Modal, Segment, Table } from 'semantic-ui-react';

import * as WalletActions from '../../../actions/wallet';

class GlobalButtonElevate extends Component<Props> {
  state = {
    password: '',
    open: false,
    viewKeys: false
  }

  componentDidUpdate(prevProps) {
    const { validate } = this.props;
    if (
      this.state.open
      && prevProps.validate.WALLET_PASSWORD === 'PENDING'
      && validate.WALLET_PASSWORD === 'SUCCESS'
    ) {
      this.setState({
        viewKeys: true
      }, () => {
        const { password } = this.state;
        this.props.onSuccess(password);
      });
    }
  }

  onChange = (e, { value }) => this.setState({ password: value })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

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
  }

  render() {
    const {
      settings,
      t,
      trigger,
      validate,
      walletData
    } = this.props;
    const {
      open,
      viewKeys
    } = this.state;
    const pending = (validate.WALLET_PASSWORD === 'PENDING');
    const modalSize = viewKeys ? 'keys' : 'tiny';

    let modalContent;

    const walletKeys = walletData.map((wallet) => {
      return (
        <Table.Row>
          <Table.Cell>{wallet.blockchain}</Table.Cell>
          <Table.Cell>{wallet.account}</Table.Cell>
          <Table.Cell>{wallet.pubkey}</Table.Cell>
          <Table.Cell>{wallet.key}</Table.Cell>
        </Table.Row>
      );
    });

    if (viewKeys && walletData) {
      modalContent = (
        <Fragment>
          <Header icon="key" content={t('global_button_elevate_keys_modal_title')} />
          <Modal.Content>
            <Segment basic>
              <h3>{t('global_button_elevate_keys_modal_description')}</h3>
              <Table celled unstackable className="keys">
                <Table.Row>
                  <Table.HeaderCell>Network</Table.HeaderCell>
                  <Table.HeaderCell>Account</Table.HeaderCell>
                  <Table.HeaderCell>Public Key</Table.HeaderCell>
                  <Table.HeaderCell>Private Key</Table.HeaderCell>
                </Table.Row>
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
        size={modalSize}
      >
        {modalContent}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate
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
