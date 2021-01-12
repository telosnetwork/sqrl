// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Message, Modal, Segment } from 'semantic-ui-react';

const { clipboard } = require('electron');
const { PrivateKey } = require('eosjs-ecc');

const initialState = {
  keys: [],
  open: false,
};

class ToolsModalKeysGenerate extends Component<Props> {
  state = initialState;

  constructor(props) {
    super(props);
    this.state.open = this.props.open;
  }

  copyToClipboard = (key, i) => {
    clipboard.writeText(key.key);

    const { keys } = this.state;
    keys.map((key, index) => {
      if (index === i) key.copied = true;
      else key.copied = false;

      return key;
    });

    this.setState({ keys });
  };

  handleOpen = () => {
    this.setState({ open: true});
    this.generateKeyPair();
  };

  onClose = () => this.setState({ open: false, keys: [] });

  generateKeyPair = () => {
    const { connection } = this.props;
    const keys = this.state.keys.slice(0);
    PrivateKey.randomKey().then(privateKey => {
      const wif = privateKey.toWif();
      const publicKey = privateKey.toPublic().toString(connection.keyPrefix);
      this.setState({ keys: [{ key: publicKey, copied: false }, { key: wif, copied: false }] })
      return keys;
    });
  }

  render() {
    const {
      account,
      keys,
      loading,
      open,
      symbol,
      token
    } = this.state;
    const {
      button,
      settings,
      t
    } = this.props;
    return (
      <Modal
        closeIcon
        closeOnDimmerClick
        onClose={this.onClose}
        open={open}
        size="small"
        trigger={(button)
          ? (
            <Button
              color={button.color}
              content={t(button.content)}
              fluid={button.fluid}
              floated={button.floated}
              icon={button.icon}
              onClick={this.handleOpen}
              size={button.size}
            />
          ) : false
        }>
        <Modal.Header>
          {t('tools_keys_key_generation_header')}
        </Modal.Header>
        <Modal.Content>
          <Message
            content={t('tools_keys_key_generation_warning_content')}
            icon="warning sign"
            warning/>
          <div className="list">
            {
              keys.map((key, i) => {
                return (
                  <React.Fragment key={i}>
                    <Button
                      color="black"
                      className="break-word list-item -spacing-small"
                      content={key.key}
                      onClick={() => this.copyToClipboard(key, i)}
                    />
                    {
                      (key.copied) ?
                        (
                          <div className="list-item -spacing-small">
                            Key copied to clipboard
                          </div>
                        ): false
                    }
                  </React.Fragment>
                );
              })
            }
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t('tools_keys_key_generation_new_key')}
            icon="key"
            onClick={this.generateKeyPair}/>
          <Button
            content={t('close')}
            onClick={this.onClose}/>
        </Modal.Actions>
      </Modal>
    );
  }
}

ToolsModalKeysGenerate.defaultProps = {
  open: false
};

export default translate('tools')(ToolsModalKeysGenerate);