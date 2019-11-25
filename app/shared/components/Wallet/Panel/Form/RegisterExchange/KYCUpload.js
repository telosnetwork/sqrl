// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Grid, Image, Icon, Message, Segment, Header } from 'semantic-ui-react';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import dlFrontPlaceholder from '../../../../../../renderer/assets/images/dl-front.png';
import dlBackPlaceholder from '../../../../../../renderer/assets/images/dl-back.png';
import passportPlaceholder from '../../../../../../renderer/assets/images/passport.png';
import selfiePlaceholder from '../../../../../../renderer/assets/images/selfie.png';

class WalletPanelFormRegisterExchangeKYCUpload extends Component<Props> {
  constructor(props) {
    super(props);
      this.state = {
        passportFile: null,
        passportPreview: null,
        passportMessage: null,
        selfiePhotoFile: null,
        selfiePhotoPreview: null,
        selfieMessage: null,
        dlFrontFile: null,
        dlFrontPreview: null,
        dlFrontMessage: null,
        dlBackFile: null,
        dlBackPreview: null,
        dlBackMessage: null,
        loading: false,
        verifiedError: null
      }
  }
  onSubmit = () => this.props.onSubmit()
  submitFiles = async () => {
    const {
      actions,
      globals,
      keys,
      values
    } = this.props;
    const {
      passportFile,
      selfiePhotoFile,
      dlFrontFile,
      dlBackFile
    } = this.state;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    let uploadPassport = '';
    let uploadSelfie = '';
    let uploadDLFront = '';
    let uploadDLBack = '';
    
    this.setState({loading: true, verifiedError: null});

    if (passportFile) {
      uploadPassport = await actions.uploadExchangeKYCDoc(passportFile, contact.id, 'passport');
      if (uploadPassport && uploadPassport.payload && uploadPassport.payload.message) {
        this.setState({passportMessage: uploadPassport.payload.message});
      } else {
        this.setState({passportMessage: "Something went wrong while attempting to upload your passport. Please try again."});
      }
    }
    if (selfiePhotoFile) {
      uploadSelfie = await actions.uploadExchangeKYCDoc(selfiePhotoFile, contact.id, 'livePhoto');
      if (uploadSelfie && uploadSelfie.payload && uploadSelfie.payload.message) {
        this.setState({selfieMessage: uploadSelfie.payload.message});
      } else {
        this.setState({selfieMessage: "Something went wrong while attempting to upload your selfie. Please try again."});
      }
    }
    if (dlFrontFile) {
      uploadDLFront = await actions.uploadExchangeKYCDoc(dlFrontFile, contact.id, 'driverLicenseFront');
      if (uploadDLFront && uploadDLFront.payload && uploadDLFront.payload.message) {
        this.setState({dlFrontMessage: uploadDLFront.payload.message});
      } else {
        this.setState({dlFrontMessage: "Something went wrong while attempting to upload the front of your ID. Please try again."});
      }
    }
    if (dlBackFile) {
      uploadDLBack = await actions.uploadExchangeKYCDoc(dlBackFile, contact.id, 'driverLicenseBack');
      if (uploadDLBack && uploadDLBack.payload && uploadDLBack.payload.message) {
        this.setState({dlBackMessage: uploadDLBack.payload.message});
      } else {
        this.setState({dlBackMessage: "Something went wrong while attempting to upload the back of your ID. Please try again."});
      }
    }

    if (
        (
        uploadPassport.payload && uploadPassport.payload.message && uploadPassport.payload.message.indexOf('successful') > 0 &&
        uploadSelfie.payload && uploadSelfie.payload.message && uploadSelfie.payload.message.indexOf('successful') > 0
        ) || 
        (
          uploadDLFront.payload && uploadDLFront.payload.message && uploadDLFront.payload.message.indexOf('successful') > 0 &&
          uploadDLBack.payload && uploadDLBack.payload.message && uploadDLBack.payload.message.indexOf('successful') > 0 &&
          uploadSelfie.payload && uploadSelfie.payload.message && uploadSelfie.payload.message.indexOf('successful') > 0
        )
      )
    {
      const getCountryISO3 = require("country-iso-2-to-3");
      let iso3Code = getCountryISO3(values.country);
      if (!iso3Code) {
        iso3Code = values.country;
      }
      const submitKYC = await actions.submitExchangeKYC(contact.id);

      this.setState({verifiedError:null});

      const kycCheckSubmitted = submitKYC.payload 
        && submitKYC.payload.message 
        && (submitKYC.payload.message.indexOf('Submitted') != -1 ||
            submitKYC.payload.message.indexOf('Success') != -1);
      if (kycCheckSubmitted) {
        this.props.onCompleted();
      } else if (submitKYC.payload && submitKYC.payload.error) {
        let errorResponse = submitKYC.payload.error.message;
        if (!errorResponse || errorResponse == '') {
          errorResponse = submitKYC.payload.error;
        }
        errorResponse += '. Please go back to review your information and try again (e.g. State/Zip/Country).'
        this.setState({verifiedError: errorResponse});
      } else {
        this.setState({verifiedError: 'An error occured while submitting your KYC check. Please go back, verify your info and try again.'});
      }
    }
    this.setState({loading: false});
  }
  imageChange(e) {
    e.preventDefault();
    
    let reader = new FileReader();
    let file = e.target.files[0];
    let inputName = e.target.name;

    reader.onloadend = () => {
      this.setState({
        [inputName + 'File']: file,
        [inputName + 'Preview']: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  render() {
    const {
      globals,
      onBack,
      system,
      t
    } = this.props;

    let {
      loading,
      passportFile,
      passportPreview,
      passportMessage,
      dlFrontFile,
      dlFrontPreview,
      dlFrontMessage,
      dlBackFile,
      dlBackPreview,
      dlBackMessage,
      selfiePhotoFile,
      selfiePhotoPreview,
      selfieMessage,
      verifiedError
    } = this.state;

    let $passportPreview = null;
    if (passportPreview) $passportPreview = (<Image src={passportPreview} centered size='small' />);
    else $passportPreview = (<Image src={passportPlaceholder} centered size='small' />);

    let $dlFrontPreview = null;
    if (dlFrontPreview) $dlFrontPreview = (<Image src={dlFrontPreview} centered size='small' />);
    else $dlFrontPreview = (<Image src={dlFrontPlaceholder} centered size='small' />);

    let $dlBackPreview = null;
    if (dlBackPreview) $dlBackPreview = (<Image src={dlBackPreview} centered size='small' />);
    else $dlBackPreview = (<Image src={dlBackPlaceholder} centered size='small' />);

    let $selfiePhotoPreview = null;
    if (selfiePhotoPreview) $selfiePhotoPreview = (<Image src={selfiePhotoPreview} centered size='small' />);
    else $selfiePhotoPreview = (<Image src={selfiePlaceholder} bordered centered style={{width:"185px"}} />);
    
    const contact = globals.exchangecontact && globals.exchangecontact.data;
    const kycStatus = 
      contact.kycPassOnfido=='5'?"Blocked":
      contact.kycPassOnfido=='4'?"Resubmitted - Pending":
      contact.kycPassOnfido=='3'?"Application Error - Resubmit":
      contact.kycPassOnfido=='2'?"Verified":
      contact.kycPassOnfido=='1'?"Submitted - Pending":"Not Submitted";

    let error = '';
    if ( (!passportFile && !selfiePhotoFile) ||
         (!dlFrontFile && !dlBackFile && !selfiePhotoFile)
      ) {
      error = 'registercarbon_kyc_missing_docs';
    }

    return (
      <Form loading={loading}>
        <Header>
          {t('wallet_registercarbon_request_step_3_header1')} - {kycStatus}
          <Header.Subheader>
            <p>
            A goverment ID must be submitted as part of your KYC verification. This can be a passport, driver's license, national ID card, or any official form of identity documentation.
            </p>
            <p>
            You should also upload a current photo of you with today's date to help simplify the verification process.
            </p>
          </Header.Subheader>
        </Header>

        <Message
          content="In order to avoid processing delays, you MUST supply either: 1) the front and back of your Goverment ID AND a live selfie OR 2) your passport and a live selfie."
          icon="info circle"
          info
        />

        <Segment.Group horizontal>
          <Segment textAlign="center">
            <div>
              {$passportPreview}
            </div>
            <form onSubmit={(e)=>this.submitFile(e)}>
              <input 
                type="file" 
                name="passport"
                onChange={(e)=>this.imageChange(e)}
                style={{width:"110px", border:"0px"}}
              />
            </form>
          </Segment>

          <Segment textAlign="center">
            <div>
              {$selfiePhotoPreview}
            </div>
            <form onSubmit={(e)=>this.submitFile(e)}>
              <input 
                type="file" 
                name="selfiePhoto"
                onChange={(e)=>this.imageChange(e)}
                style={{width:"110px", border:"0px"}}
              />
            </form>
          </Segment>
        </Segment.Group>

        <Segment.Group horizontal>
          <Segment textAlign="center">
            <div>
              {$dlFrontPreview}
            </div>
            <form onSubmit={(e)=>this.submitFile(e)}>
              <input 
                type="file" 
                name="dlFront"
                onChange={(e)=>this.imageChange(e)}
                style={{width:"110px", border:"0px"}}
              />
            </form>
          </Segment>

          <Segment textAlign="center">
            <div>
              {$dlBackPreview}
            </div>
            <form onSubmit={(e)=>this.submitFile(e)}>
              <input 
                type="file" 
                name="dlBack"
                onChange={(e)=>this.imageChange(e)}
                style={{width:"110px", border:"0px"}}
              />
            </form>
          </Segment>
        </Segment.Group>

        {(verifiedError ?
          <Message
            content={verifiedError}
            icon="info circle"
            negative
          />
        :'')}

        {(passportMessage ?
          <Message
            content={passportMessage}
            icon="info circle"
            info
          />
        :'')}
        {(selfieMessage ?
          <Message
            content={selfieMessage}
            icon="info circle"
            info
          />
        :'')}
        {(dlFrontMessage ?
          <Message
            content={dlFrontMessage}
            icon="info circle"
            info
          />
        :'')}
        {(dlBackMessage ?
          <Message
            content={dlBackMessage}
            icon="info circle"
            info
          />
        :'')}
        
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Form.Button
                content={t('back')}
                onClick={onBack}
                size="small"
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Form.Button
                color="blue"
                content={t('Complete Registration')}
                onClick={(e)=>this.submitFiles()}
                disabled={error.length > 0}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeKYCUpload);
