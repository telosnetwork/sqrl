// @flow
import React, { Component } from 'react';
import { Button, Divider, Icon, Segment, Table, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import GlobalButtonElevate from '../../../../../../containers/Global/Button/Elevate';
const { shell } = require('electron');

class GovernanceProposalsFormProposalConfirming extends Component<Props> {
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
    system.GOVERNANCE_CREATEWORKSPROPOSAL_LAST_ERROR = null;
    system.GOVERNANCE_EDITWORKSMILESTONE_LAST_ERROR = null;
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
      category,
      content,
      description,
      editing,
      milestones,
      proposal_name,
      title,
      total_requested,

      fileInfo,
      ipfs_location,
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
    let lastError = system.GOVERNANCE_CREATEWORKSPROPOSAL_LAST_ERROR;
    if (editing)
      lastError = system.GOVERNANCE_EDITWORKSMILESTONE_LAST_ERROR;

    if (walletUnLockRequested && validate.WALLET_PASSWORD === 'SUCCESS'){
      lastError = '';
      ipfsSuccess = false;
      this.setState({ walletUnLockRequested: false });
    }

    return (
      <Segment basic clearing vertical>
        <Header block size="medium">
          <Icon name="circle info" />
          <Header.Content>
            <Header.Subheader>
              Please confirm your submission before proceeding. This is only a draft and will be available for editing after submission. No fees will be due at the time of submission.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>
                Title:
              </Table.Cell>
              <Table.Cell>
                {title}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>
                Description:
              </Table.Cell>
              <Table.Cell>
                {description}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>
                Category:
              </Table.Cell>
              <Table.Cell>
                {category}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Proposal Details:
              </Table.Cell>
              <Table.Cell>
              {(editing) ? 
                <strong>{content}</strong> :
                <p>Publishing <strong>{fileInfo.name}</strong> to IPFS</p>
              }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Total Requested:
              </Table.Cell>
              <Table.Cell>
                {total_requested} {settings.blockchain.tokenSymbol}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Milestones:
              </Table.Cell>
              <Table.Cell>
                {milestones.map((milestone) => {
                  return (
                      <span>
                      #{milestone.number} for {parseFloat(milestone.amount).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}<br />
                      </span>
                    )
                  })}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider style={{ marginTop: '40px' }} />

        {( (lastError && system.GOVERNANCE_CREATEWORKSPROPOSAL !== 'SUCCESS' && !editing) ||
          (lastError && system.GOVERNANCE_EDITWORKSMILESTONE !== 'SUCCESS' && editing) )
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

        { (ipfsSuccess === true && (system.GOVERNANCE_CREATEWORKSPROPOSAL === 'SUCCESS' || system.GOVERNANCE_EDITWORKSMILESTONE === 'SUCCESS')) ?
        <div>
            <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink(content)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >{content}
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Draft Proposal Submitted Successfully"
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
          content='Submit Draft'
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

export default translate('producers')(GovernanceProposalsFormProposalConfirming);
