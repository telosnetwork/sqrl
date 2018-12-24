import React, { Component } from 'react';
import { Header, Icon, Modal } from 'semantic-ui-react';
import { I18n } from 'react-i18next';
import ReactJson from 'react-json-view';

export default class RePairPrompt extends Component<Props> {

  render() {
      const {
        error,
        request,
        payload
      } = this.props;

      const messages = {
        "app": payload.origin || payload.data.origin,
        // "nonce": request.nonce,
        "with appkey": request.appkey || payload.data.appkey 
      };

      if(payload.fields && payload.fields.accounts){
        messages["requires account for network"] = payload.fields.accounts.map((a) => { return {
          blockchain: a.blockchain,
          chainId: a.chainId
        }});
      }

      const collapsed = false;

      return (
        <I18n ns="wapii">
          {
            (t) => (
              <React.Fragment>
                <Header icon="unlock" content={t('wapii_prompt_header_pair')} />
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