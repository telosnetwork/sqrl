// @flow
import React, { Component } from 'react';
import { Button, Divider, Icon, Segment, Table, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import GlobalButtonElevate from '../../../../../containers/Global/Button/Elevate';
const { shell } = require('electron');

class WalletStatusVIPFormConfirm extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      walletUnLockRequested: false
    };
  }
  onConfirm = (e) => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
    e.preventDefault();
    return false;
  }
  unlockWallet = (password = false) => {
    const { actions, system } = this.props;

    this.setState({walletUnLockRequested: true});

    actions.unlockWallet(password);
    system.SET_PROFILEAVATAR_LAST_ERROR = null;
  }
  openLink = (link) => {
    const { settings } = this.props;
    if (link.match(/^\/(ip(f|n)s)\/((\w+).*)/)) {
      shell.openExternal(settings.ipfsProtocol + "://" + settings.ipfsNode + "/" + link);
    } else {
      shell.openExternal(link);
    }
  }
  render() {
    const { 
      walletUnLockRequested 
    } = this.state;
    const {
      avatar,
      bio,

      fileInfo,
      ipfsHash,
      onBack,
      onClose,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;
    let ipfsSuccess = (ipfsHash && ipfsHash.length > 0);
    let lastError = system.SET_PROFILEAVATAR_LAST_ERROR;

    if (walletUnLockRequested && validate.WALLET_PASSWORD === 'SUCCESS'){
      lastError = '';
      ipfsSuccess = false;
      this.setState({ walletUnLockRequested: false });
    }
    return (
      <Segment basic clearing vertical>
        <Header block size="large">
          <Icon name="circle info" />
          <Header.Content>
            <Header.Subheader>
              Please confirm your profile information before submitting.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>
                Avatar:
              </Table.Cell>
              <Table.Cell>
              Committing the contents of <strong>{fileInfo.name}</strong> to IPFS
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>
                Bio:
              </Table.Cell>
              <Table.Cell>
                {bio}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider style={{ marginTop: '40px' }} />

        {(lastError && system.SET_PROFILEAVATAR !== 'SUCCESS')
          ? (
            <Message negative size="tiny">
              {(lastError.code)
                ? (
                  <div>
                    <Message.Header>
                      {lastError.code}: {lastError.name}
                    </Message.Header>
                    <code>{lastError.message}</code>
                  </div>
                )
                : (
                  <div>
                    <Message.Header>
                      {t(['producer_voter_preview_error_title'])}
                    </Message.Header>
                    <code>{new String(lastError)}</code>
                  </div>
                )
              }
            </Message>
          )
          : ''
        }

        {(lastError && lastError.message 
        && (lastError.message.indexOf('keyProvider') !== -1 || lastError.indexOf('keyProvider') !== -1) ) ?
          <GlobalButtonElevate
            onSuccess={(password) => this.unlockWallet(password)}
            settings={settings}
            trigger={(
              <Button
                color="red"
                content="Unlock Wallet"
                icon="unlock"
                style={{ marginBottom: '10px' }}
              />
            )}
            validate={validate}
            wallet={wallet}
          />
          : ''}

        { (ipfsSuccess === true && system.SET_PROFILEAVATAR === 'SUCCESS') ?
        <div>
            <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink(avatar)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >{avatar}
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Avatar Submitted to IPFS"
          />
          <Button
            onClick={onClose}
            floated="left">
            <Icon name="x" /> {t('close')}
          </Button>
        </div>
        :
        <div>
        <Button
          color="green"
          floated="right"
          onClick={this.onConfirm}
          content='Submit'
        />
        <Button
          onClick={onBack}
          floated="left">
          <Icon name="arrow left" /> Go Back
        </Button>
        </div>
        }
      </Segment>
    );
  }
}

export default translate('producers')(WalletStatusVIPFormConfirm);
