// @flow
import React, { Component } from 'react';
import { Button, Table, Header, Segment, Label, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
const { shell } = require('electron');
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as config from '../../../../actions/config';

class WalletStatusReferralsForm extends Component<Props> {
  constructor(props) {
    super(props);

    const { settings } = this.props;
    const referralUrl = 'https://sqrlwallet.io/earn?refer=' + settings.account;

    this.state = {
      copied: false,
      dedicatedUrl: referralUrl,
      shortenedUrl: ''
    };
  }

  async componentWillMount() {
    const {
      dedicatedUrl
    } = this.state;

    let linkRequest = {
      destination: dedicatedUrl,
      domain: { fullName: "refer.sqrlwallet.io" }
    }
    
    let requestHeaders = {
      "Content-Type": "application/json",
      "apikey": config.RB_API_KEY,
      "workspace": config.RB_WORKSPACE_ID
    };

    await fetch('https://api.rebrandly.com/v1/links', {
      method: 'GET',
      headers: requestHeaders
    }).then(response => response.json()).then((response) => {
      let shortlinkFound = false;
      for (const i in response) {
        const link = response[i];
        if (link && link.destination == dedicatedUrl) {
          this.setState({ shortenedUrl: link.shortUrl });
          shortlinkFound = true;
          return;
        }
      }
      if (!shortlinkFound) {
        fetch('https://api.rebrandly.com/v1/links', {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify(linkRequest)
        }).then(response => response.json()).then((response) => {
          this.setState({ shortenedUrl: response.shortUrl });
        }); 
      }
    }).catch((e)=>{});
  }

  openLink = (url) => shell.openExternal(url);

  onClose = (e) => {
    this.props.onClose();
  }

  render() {
    const {
      profile,
      t
    } = this.props;

    const { shortenedUrl, dedicatedUrl } = this.state;
    const referralUrl = shortenedUrl ? shortenedUrl : dedicatedUrl;
    const referrals = profile ? profile.referrals : 0;
    const earnings = referrals * 5;

    return (
      <Segment basic clearing vertical textAlign="center">
          <Header>
            {t('wallet_panel_profile_refer')}
          </Header>
          <Message 
            content={(
              <React.Fragment>
                {t('wallet_panel_profile_earn')}
              </React.Fragment>
            )}
            info
          />
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Total Referrals</Table.HeaderCell>
                <Table.HeaderCell>Tokens Earned</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h2' textAlign='center'>
                    {referrals}
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as='h2' textAlign='center'>
                    {earnings} SQRL
                  </Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>
                  <Label>Personal Referral Link:</Label>&nbsp;&nbsp;
                  <a onClick={() => this.openLink(referralUrl)} role="link">{referralUrl}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                  <CopyToClipboard text={referralUrl}
                    onCopy={() => this.setState({copied: true})}>
                    <Label style={{cursor:'pointer'}} icon="copy" content="Copy" />
                  </CopyToClipboard>
                  {this.state.copied ? <span style={{color: 'red'}}>Copied</span> : null}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusReferralsForm);
