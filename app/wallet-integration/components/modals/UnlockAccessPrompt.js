import React, { Component } from 'react';
import { Form, Header, Icon, Input, Modal, Checkbox } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class UnlockAccessPrompt extends Component<Props> {

  render() {
      const {
        error,
        request,
        payload,
        onKeyPress,
        onChange,
        changeWallet,
        toggleChangeWallet
      } = this.props;

      return (
        <I18n ns="wapii">
          {
            (t) => (
              <React.Fragment>
                <Header icon="unlock" content={t('wapii_prompt_header_unlock')} />
                <Modal.Content>
                  <h3>{t('wapii_prompt_message_unlock')}</h3>
                
                  <Form.Field
                    autoFocus
                    control={Input}
                    fluid
                    label={"Password to unlock "+payload.wallet.account}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    type="password"
                    />
                        
                  <Checkbox
                    label="Change to this wallet"
                    checked={changeWallet}
                    onChange={toggleChangeWallet}
                    />
                  {error}
                </Modal.Content>
              </React.Fragment>
            )
          }
        </I18n>
      );
  }
}