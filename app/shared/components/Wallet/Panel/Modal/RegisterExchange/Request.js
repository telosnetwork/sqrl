// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Grid, Header, Icon, Modal, Segment, Step } from 'semantic-ui-react';

import WalletPanelFormRegisterExchangeWelcome from '../../Form/RegisterExchange/Welcome';
import WalletPanelFormRegisterExchangeAccount from '../../Form/RegisterExchange/Account';
import WalletPanelFormRegisterExchangeKYC from '../../Form/RegisterExchange/KYC';
import WalletPanelFormRegisterExchangeKYCUpload from '../../Form/RegisterExchange/KYCUpload';

const WELCOME = 1;
const ACCOUNT = 2;
const KYC = 3;
const KYC_DOCS = 4;
class WalletPanelModalRegisterExchange extends Component<Props> {
  state = {
    confirming: false,
    open: true,
    stage: WELCOME,
    values: {
      firstName: '',
      lastName:'',
      dob:'',
      buildingNumber:'',
      street:'',
      city:'',
      state:'',
      postalCode:'',
      country:'',
      emailAddress: ''
    },
    validated: {
      firstName: false,
      lastName:false,
      dob:false,
      buildingNumber:false,
      street:false,
      city:false,
      state:false,
      postalCode:false,
      country:false,
      emailAddress: false
    },
    location: ''
  }
  componentDidMount() {
    (async () => {
      await fetch('http://ip-api.com/json')
      .then(response=>{
        return response.json();
      }).then(data =>{
        this.setState({
          location: data
        });
      }).catch(error => {
      });
    })();
  }
  onChange = (e, { name, valid, value }) => {
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    values[name] = value;
    validated[name] = valid;
    this.setState({values,validated});
  }
  onBeforeClose = ()=> {
    const {onClose} = this.props;
    this.setState({
      confirming: false,
      open: false,
      stage: WELCOME,
      values: {
        firstName: '',
        lastName:'',
        dob:'',
        buildingNumber:'',
        street:'',
        city:'',
        state:'',
        postalCode:'',
        country:'',
        emailAddress: ''
      },
      validated: {
        firstName: false,
        lastName:false,
        dob:false,
        buildingNumber:false,
        street:false,
        city:false,
        state:false,
        postalCode:false,
        country:false,
        emailAddress: false
      },
    });
    onClose();
  }
  onRegister = async () => {
    const {
      actions,
      globals,
      keys
    } = this.props;
    const {
      values
    } = this.state;

    if (globals.exchangecontact && globals.exchangecontact.contactId) {
      this.onStageSelect(KYC);
    } else {
      const contactRequest = await actions.createExchangeContact(keys.pubkey, values.emailAddress);
      if (contactRequest && contactRequest.payload && contactRequest.payload.code == 200) {
        await actions.getContactByPublicKey(keys.pubkey); // fetch full contact record
        this.onStageSelect(KYC);
      } else {
        this.onStageSelect(ACCOUNT);
      }
    }
  }
  onVerify = async () => {
    const {
      actions,
      globals,
      keys
    } = this.props;
    const {
      values
    } = this.state;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    if (contact && contact.onfidoId) {
      this.onStageSelect(KYC_DOCS);
    } else {
      const verifyRequest = await actions.verifyExchangeContact(
        contact.id, values.firstName, values.lastName, 
        values.dob, values.country, values.buildingNumber, 
        values.street, values.state, values.city, values.postalCode);
      if (verifyRequest && verifyRequest.payload 
        && verifyRequest.payload.details && verifyRequest.payload.details.applicantId) {
          await actions.getContactByPublicKey(keys.pubkey); // fetch full contact record
        this.onStageSelect(KYC_DOCS);
      } else {
        this.onStageSelect(KYC);
      }
    }
  }
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ confirming: false });
  onStageSelect = (stage) => this.setState({ confirming: false, stage });
  render() {
    const {
      actions,
      globals,
      keys,
      open,
      settings,
      system,
      t,
      trigger
    } = this.props;

    const {
      location,
      stage,
      values
    } = this.state;
    
    let carbonRegistered = false;
    if (globals.exchangecontact && globals.exchangecontact.contactId) {
        carbonRegistered = true;
    }
    let carbonKYCFido = false;
    const contact = globals.exchangecontact && globals.exchangecontact.data;
    if (contact && contact.kycPassOnfido == 2) {
      carbonKYCFido = true;
    }

    let stageElement = (
      <WalletPanelFormRegisterExchangeWelcome
        location={location}
        onChange={this.onChange}
        onSubmit={() => this.onStageSelect(ACCOUNT)}
        settings={settings}
        values={values}
      />
    );

    if (stage === ACCOUNT) {
      stageElement = (
        <WalletPanelFormRegisterExchangeAccount
          globals={globals}
          keys={keys}
          onBack={() => this.onStageSelect(WELCOME)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onRegister()}
          settings={settings}
          values={values}
        />
      );
    }

    if (stage === KYC) {
      stageElement = (
        <WalletPanelFormRegisterExchangeKYC
          actions={actions}
          globals={globals}
          onBack={() => this.onStageSelect(ACCOUNT)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onVerify()}
          settings={settings}
          system={system}
          values={values}
        />
      );
    }

    if (stage === KYC_DOCS) {
      stageElement = (
        <WalletPanelFormRegisterExchangeKYCUpload
          actions={actions}
          globals={globals}
          onBack={() => this.onStageSelect(KYC)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={this.onSubmit}
          settings={settings}
          system={system}
          values={values}
        />
      );
    }

    return (
      <Modal
        centered={false}
        closeIcon={false}
        closeOnDimmerClick={false}
        trigger={trigger}
        onClose={this.onBeforeClose}
        open={open}
        size="fullscreen"
      >
        <Header icon={values.currency} content={t('wallet_registercarbon_button_title', {tokenSymbol:settings.blockchain.tokenSymbol})} />
        <Modal.Content>
          <Grid unstackable="true">
            <Grid.Row>
              <Grid.Column width={7}>
                <Step.Group fluid vertical>
                  <Step active={stage === WELCOME} completed={stage > WELCOME || carbonRegistered}>
                    <Icon name="home" />
                    <Step.Content>
                      <Step.Title>{t('wallet_registercarbon_request_step_1')}</Step.Title>
                      <Step.Description>{t('wallet_registercarbon_request_step_1_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === ACCOUNT} completed={stage > ACCOUNT || carbonRegistered}>
                    <Icon name="user plus" />
                    <Step.Content>
                      <Step.Title>{t('wallet_registercarbon_request_step_2')}</Step.Title>
                      <Step.Description>{t('wallet_registercarbon_request_step_2_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === KYC} completed={carbonKYCFido}>
                    <Icon name="id card" />
                    <Step.Content>
                      <Step.Title>{t('wallet_registercarbon_request_step_3')}</Step.Title>
                      <Step.Description>{t('wallet_registercarbon_request_step_3_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>
              </Grid.Column>
              <Grid.Column width={9}>
                <Segment>
                  {stageElement}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Container textAlign="center">
            <Button
              onClick={this.onBeforeClose}
            >
              <Icon name="x" /> {t('Close')}
            </Button>
          </Container>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('wallet')(WalletPanelModalRegisterExchange);
