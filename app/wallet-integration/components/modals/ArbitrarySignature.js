import React, { Component } from 'react';
import { Header, Icon, Modal } from 'semantic-ui-react';
import { I18n } from 'react-i18next';
import ReactJson from 'react-json-view';

export default class ArbitrarySignature extends Component<Props> {

  render() {
      const {
        error,
        request,
        payload
      } = this.props;

      const messages = payload.messages;
      const collapsed = false;

      return (
        <I18n ns="wapii">
          {
            (t) => (
              <React.Fragment>
                <Header icon="unlock" content={t('wapii_prompt_header_arbitrary_signature')} />
                <Modal.Content>                  
                  <ReactJson
                      displayDataTypes={false}
                      displayObjectSize={false}
                      iconStyle="square"
                      name={null}
                      src={messages}
                      style={{ padding: '1em' }}
                      theme="harmonic"
                      collapsed={collapsed}
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