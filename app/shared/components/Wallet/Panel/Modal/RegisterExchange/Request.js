// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Grid, Header, Icon, Modal, Segment, Step } from 'semantic-ui-react';

import WalletPanelFormRegisterExchangeWelcome from '../../Form/RegisterExchange/Welcome';
import WalletPanelFormRegisterExchangeAccount from '../../Form/RegisterExchange/Account';
import WalletPanelFormRegisterExchangeAccountRegistered from '../../Form/RegisterExchange/AccountRegistered';
import WalletPanelFormRegisterExchangeKYC from '../../Form/RegisterExchange/KYC';
import WalletPanelFormRegisterExchangeKYCUpload from '../../Form/RegisterExchange/KYCUpload';
import WalletPanelFormRegisterExchangeOffRampKYC from '../../Form/RegisterExchange/OffRampKYC';
import WalletPanelFormRegisterExchangeOffRampKYCUpload from '../../Form/RegisterExchange/OffRampKYCUpload';
import WalletPanelFormRegisterExchangeKYCSubmitted from '../../Form/RegisterExchange/KYCSubmitted';
import EOSAccount from '../../../../../utils/EOS/Account';

const WELCOME = 1;
const ACCOUNT = 2;
const ACCOUNT_REGISTERED = 3;
const KYC = 4;
const KYC_DOCS = 5;
const OFFRAMP_KYC = 6;
const OFFRAMP_KYC_DOCS = 7;
const KYC_SENT = 8;

class WalletPanelModalRegisterExchange extends Component<Props> {
  constructor(props) {
    super(props);
      const {
        accounts,
        globals,
        keys,
        settings
      } = this.props;
      const model = new EOSAccount(accounts[settings.account]);
      const auth = settings.authorization || 'active';
      const accountKey = model && model.getKeysForAuthorization(auth);
      let publicKey = keys.pubkey;
      if (accountKey && accountKey.length > 0) {
        let { pubkey } = accountKey[0];
        if (pubkey) publicKey = pubkey;
      }
      const kycSubmitted = settings['kycSubmitted' + publicKey];
      const offrampKycSubmitted = settings['offrampKycSubmitted' + publicKey];
      let contact = globals.exchangecontact && globals.exchangecontact.data;
      if (!contact) {
        contact = {};
      }
      if (!contact.address) {
        contact.address = {};
      }
      this.state = {
        confirming: false,
        kycSubmitted: kycSubmitted || false,
        offrampKycSubmitted: offrampKycSubmitted || false,
        open: true,
        pubkey: publicKey,
        stage: WELCOME,
        values: {
          firstName: contact.firstName || '',
          lastName: contact.lastName || '',
          dob: contact.dob || '',
          buildingNumber:'',
          street: contact.address.street || '',
          city: contact.address.city || '',
          state: contact.address.region || '',
          postalCode: contact.address.postalCode || '',
          country: contact.address.country || '',
          emailAddress: contact.emailAddress || '',
          // offramp kyc fields
          phoneNumber: contact.phoneNumber || '',
          taxCountry: contact.taxCountry || '',
          taxId: '',
          sex: contact.sex || ''
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
          emailAddress: false,
          phoneNumber: false,
          taxCountry: false,
          taxId: false,
          sex: false
        },
        location: ''
      }
  }
  componentDidMount = async () => {
    await fetch('http://ip-api.com/json')
      .then(response=>{
        return response.json();
      }).then(data =>{
        this.setState({
          location: data
        });
      }).catch(error => {
    });
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
        emailAddress: '',
        phoneNumber: '',
        taxCountry: '',
        taxId: '',
        sex: ''
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
        emailAddress: false,
        phoneNumber: false,
        taxCountry: false,
        taxId: false,
        sex: false
      },
    });
    onClose();
  }
  onRegister = async () => {
    const {
      actions,
      globals,
    } = this.props;
    const {
      pubkey,
      values
    } = this.state;

    if (globals.exchangecontact && globals.exchangecontact.contactId) {
      this.onStageSelect(ACCOUNT_REGISTERED);
    } else {
      const contactRequest = await actions.createExchangeContact(pubkey, values.emailAddress);
      if (contactRequest && contactRequest.payload && contactRequest.payload.code == 200) {
        await actions.getContactByPublicKey(pubkey);
        this.onStageSelect(ACCOUNT_REGISTERED);
      } else {
        this.onStageSelect(ACCOUNT);
      }
    }
  }
  onVerify = async () => {
    const {
      actions,
      globals,
    } = this.props;
    const {
      pubkey,
      values
    } = this.state;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    if (contact && contact.onfidoId) {
      this.onStageSelect(KYC_DOCS);
    } else {
      const getCountryISO3 = require("country-iso-2-to-3");
      let iso3Code = getCountryISO3(values.country);
      if (!iso3Code) {
        iso3Code = values.country;
      }
      const verifyRequest = await actions.verifyExchangeContact(
        contact.id, values.firstName, values.lastName, 
        values.dob, iso3Code.toUpperCase(), values.buildingNumber, 
        values.street, values.state.toUpperCase(), values.city, values.postalCode);
      if (verifyRequest && verifyRequest.payload 
        && verifyRequest.payload.details && verifyRequest.payload.details.applicantId) {
          await actions.getContactByPublicKey(pubkey);
        this.onStageSelect(KYC_DOCS);
      } else {
        this.onStageSelect(KYC);
      }
    }
  }
  onCompleted = () => {
    const {
      actions
    } = this.props;
    const {
      pubkey
    } = this.state;
    actions.setSetting('kycSubmitted' + pubkey, true);
    this.onStageSelect(KYC_SENT);
  }
  onResubmit = () => {
    const {
      actions
    } = this.props;
    const {
      pubkey
    } = this.state;
    this.setState({ ['kycSubmitted' + pubkey]: false })
    actions.setSetting('kycSubmitted' + pubkey, false);
    this.onStageSelect(KYC);
  }
  onVerifyOffRamp = async () => {
    const {
      actions,
      globals,
    } = this.props;
    const {
      pubkey,
      values
    } = this.state;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    const contactDetails = globals.exchangecontact && globals.exchangecontact.details;
    if (contactDetails && contactDetails.kycSentStablecoin) {
      this.onStageSelect(OFFRAMP_KYC_DOCS);
    } else {
      const submitKYCRequest = await actions.submitOfframpKYC(
        contact.id, values.firstName, values.lastName, 
        values.dob, values.country.toUpperCase(), values.street, 
        values.state.toUpperCase(), values.city, values.postalCode, 
        values.phoneNumber, values.taxCountry, values.taxId, values.sex);
      if (submitKYCRequest && submitKYCRequest.payload 
        && submitKYCRequest.payload.message && submitKYCRequest.payload.message.indexOf('Success') != -1) {
          await actions.getContactByPublicKey(pubkey);
        this.onStageSelect(OFFRAMP_KYC_DOCS);
      } else {
        this.onStageSelect(OFFRAMP_KYC);
      }
    }
  }
  onOffRampKYCCompleted = () => {
    const {
      actions
    } = this.props;
    const {
      pubkey
    } = this.state;
    actions.setSetting('offrampKycSubmitted' + pubkey, true);
    this.onStageSelect(KYC_SENT);
  }
  onOffRampKYCResubmit = () => {
    const {
      actions
    } = this.props;
    const {
      pubkey
    } = this.state;
    this.setState({ ['offrampKycSubmitted' + pubkey]: false })
    actions.setSetting('offrampKycSubmitted' + pubkey, false);
    this.onStageSelect(OFFRAMP_KYC);
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

    let {
      kycSubmitted,
      offrampKycSubmitted,
      pubkey
    } = this.state;
    
    let carbonRegistered = false;
    if (globals.exchangecontact && globals.exchangecontact.contactId) {
        carbonRegistered = true;
    }
    let carbonKYCFido = false;
    const contact = globals.exchangecontact && globals.exchangecontact.data;

    if (contact && contact.onfidoId && contact.publicKey == pubkey) {
      kycSubmitted = true;
    }
    const contactDetails = globals.exchangecontact && globals.exchangecontact.details;
    if (contactDetails && contactDetails.kycSentStablecoin && contact.publicKey == pubkey) {
      offrampKycSubmitted = true;
    }

    if ( (contact && contact.kycPassOnfido == '2') ||
      (contactDetails && contactDetails.keyStatusStablecoin==true)
    ) {
      carbonKYCFido = true;
    }

    if ((kycSubmitted || carbonKYCFido || offrampKycSubmitted) && (stage < KYC)) {
        this.onStageSelect(KYC_SENT);
    }

    if (stage == KYC_SENT && !(kycSubmitted || carbonKYCFido || offrampKycSubmitted)){
      this.onStageSelect(WELCOME);
    }

    if (stage === WELCOME && carbonRegistered) {
      this.onStageSelect(ACCOUNT_REGISTERED);
    }

    let stageElement = (
      <WalletPanelFormRegisterExchangeWelcome
        kycSubmitted={kycSubmitted}
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
          pubkey={pubkey}
          kycSubmitted={kycSubmitted}
          offrampKycSubmitted={offrampKycSubmitted}
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

    if (stage === ACCOUNT_REGISTERED) {
      stageElement = (
        <WalletPanelFormRegisterExchangeAccountRegistered
          globals={globals}
          pubkey={pubkey}
          kycSubmitted={kycSubmitted}
          offrampKycSubmitted={offrampKycSubmitted}
          onBack={() => this.onStageSelect(ACCOUNT)}
          onKYCSubmit={() => this.onStageSelect(KYC)}
          onCUSDKYCSubmit={() => this.onStageSelect(OFFRAMP_KYC)}
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
          keys={keys}
          kycSubmitted={kycSubmitted}
          location={location}
          onBack={() => this.onStageSelect(ACCOUNT_REGISTERED)}
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
          keys={keys}
          kycSubmitted={kycSubmitted}
          onBack={() => this.onStageSelect(KYC)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={this.onSubmit}
          onCompleted={this.onCompleted}
          settings={settings}
          system={system}
          values={values}
        />
      );
    }

    if (stage === OFFRAMP_KYC) {
      stageElement = (
        <WalletPanelFormRegisterExchangeOffRampKYC
          actions={actions}
          globals={globals}
          keys={keys}
          offrampKycSubmitted={offrampKycSubmitted}
          location={location}
          onBack={() => this.onStageSelect(ACCOUNT_REGISTERED)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onVerifyOffRamp()}
          settings={settings}
          system={system}
          values={values}
        />
      );
    }

    if (stage === OFFRAMP_KYC_DOCS) {
      stageElement = (
        <WalletPanelFormRegisterExchangeOffRampKYCUpload
          actions={actions}
          globals={globals}
          keys={keys}
          offrampKycSubmitted={offrampKycSubmitted}
          onBack={() => this.onStageSelect(OFFRAMP_KYC)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={this.onSubmit}
          onCompleted={this.onOffRampKYCCompleted}
          settings={settings}
          system={system}
          values={values}
        />
      );
    }
    
    if (stage === KYC_SENT) {
      stageElement = (
        <WalletPanelFormRegisterExchangeKYCSubmitted
          actions={actions}
          globals={globals}
          keys={keys}
          kycSubmitted={kycSubmitted}
          offrampKycSubmitted={offrampKycSubmitted}
          onCancel={this.onCancel}
          onResubmit={this.onResubmit}
          onOffRampKYCResubmit={this.onOffRampKYCResubmit}
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
                  <Step active={stage === ACCOUNT || stage === ACCOUNT_REGISTERED} completed={stage > ACCOUNT || carbonRegistered}>
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
                  <Step active={stage === KYC_SENT} completed={stage === KYC_SENT}>
                    <Icon name="flag checkered" />
                    <Step.Content>
                      <Step.Title>{t('wallet_registercarbon_request_step_4')}</Step.Title>
                      <Step.Description>{t('wallet_registercarbon_request_step_4_desc', {tokenSymbol:settings.blockchain.tokenSymbol})}</Step.Description>
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
