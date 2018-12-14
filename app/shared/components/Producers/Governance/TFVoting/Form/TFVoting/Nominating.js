// @flow
import React, { Component } from 'react';
import { Button, Divider, Icon, Segment, Table, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import GlobalButtonElevate from '../../../../../../containers/Global/Button/Elevate';
const { shell } = require('electron');

class GovernanceTFNominatingFormTFNominatingConfirming extends Component<Props> {
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
    system.GOVERNANCE_NOMINATEBOARDMEMBER_LAST_ERROR = null;
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
      nominee,
      onBack,
      onClose,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;
    let lastError = system.GOVERNANCE_NOMINATEBOARDMEMBER_LAST_ERROR;

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
          Confirm {nominee}'s Nomination to the TF Board.
            <Header.Subheader>
              Once you've submitted this nomination, they must accept this nomination in order to join an open election for the Telos Foundation board. 
              If you would like to confirm this nomination, please click Submit below to continue.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Message positive size="small">
        <div>
          <Message.Header>
          Confirm Nominee: <code>{nominee}</code>
          </Message.Header>
        </div>
        </Message>

        <Divider style={{ marginTop: '40px' }} />
        {(lastError && system.GOVERNANCE_NOMINATEBOARDMEMBER !== 'SUCCESS')
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

        {(lastError && lastError.message && lastError.message.indexOf('keyProvider') !== -1) ?
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

        {
        <div>
        <Button
          color="green"
          floated="right"
          onClick={this.onConfirm}
          content='Submit Nominee'
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

export default translate('producers')(GovernanceTFNominatingFormTFNominatingConfirming);
