import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { I18n } from 'react-i18next';
import ReactJson from 'react-json-view';

export default class GetIdentityPrompt extends Component<Props> {

  render() {
      const {
        error,
        request,
        payload,
        account,
        chooseAccount
      } = this.props;

      const messages = {
        "app": payload.origin,
        "with key": request.appkey,
        "using network": payload.fields.accounts.map((a) => { return {
          blockchain: a.blockchain,
          chainId: a.chainId
        }})
      };
      
      const collapsed = false;

      return (
        <I18n ns="wapii">
          {
            (t) => (
              <React.Fragment>
                <Header icon="unlock" content={t('wapii_prompt_header_identity')} />
                <Modal.Content>
                  <h3>{t('wapii_prompt_message_identity', {appName:payload.origin})}</h3>

                  {payload.accounts.map((item, index) => {
                    return <Button onClick={ ()=>{chooseAccount(item)} } key={index} primary={account.authorityName === item.authorityName} > {item.authorityName} </Button>
                  })}

                  <br/>
                  <br/>
                  
                  <span style={{fontWeight:"bold", fontSize:"1.1em"}}>{t("wapii_json_details")}</span> 
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