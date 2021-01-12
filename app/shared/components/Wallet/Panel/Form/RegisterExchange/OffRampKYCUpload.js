// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Grid, Image, Icon, Message, Segment, Header } from 'semantic-ui-react';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import dlFrontPlaceholder from '../../../../../../renderer/assets/images/dl-front.png';
import dlBackPlaceholder from '../../../../../../renderer/assets/images/dl-back.png';
import passportPlaceholder from '../../../../../../renderer/assets/images/passport.png';
import utilityPlaceholder from '../../../../../../renderer/assets/images/utilitybill.jpg';

class WalletPanelFormRegisterExchangeOffRampKYCUpload extends Component<Props> {
  constructor(props) {
    super(props);
      this.state = {
        passportFile: null,
        passportPreview: null,
        passportMessage: null,
        utilityPhotoFile: null,
        utilityPhotoPreview: null,
        utilityMessage: null,
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
      utilityPhotoFile,
      dlFrontFile,
      dlBackFile
    } = this.state;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    let uploadPassport = '';
    let uploadUtility = '';
    let uploadDLFront = '';
    let uploadDLBack = '';
    
    this.setState({loading: true, verifiedError: null});

    if (passportFile) {
      uploadPassport = await actions.uploadOfframpKYCDoc(passportFile, contact.id);
      if (uploadPassport && uploadPassport.payload && uploadPassport.payload.message) {
        this.setState({passportMessage: uploadPassport.payload.message});
      } else {
        this.setState({passportMessage: "Something went wrong while attempting to upload your passport. Please try again."});
      }
    }
    if (utilityPhotoFile) {
      uploadUtility = await actions.uploadOfframpKYCDoc(utilityPhotoFile, contact.id);
      if (uploadUtility && uploadUtility.payload && uploadUtility.payload.message) {
        this.setState({utilityMessage: uploadUtility.payload.message});
      } else {
        this.setState({utilityMessage: "Something went wrong while attempting to upload your utility bill. Please try again."});
      }
    }
    if (dlFrontFile) {
      uploadDLFront = await actions.uploadOfframpKYCDoc(dlFrontFile, contact.id);
      if (uploadDLFront && uploadDLFront.payload && uploadDLFront.payload.message) {
        this.setState({dlFrontMessage: uploadDLFront.payload.message});
      } else {
        this.setState({dlFrontMessage: "Something went wrong while attempting to upload the front of your ID. Please try again."});
      }
    }
    if (dlBackFile) {
      uploadDLBack = await actions.uploadOfframpKYCDoc(dlBackFile, contact.id);
      if (uploadDLBack && uploadDLBack.payload && uploadDLBack.payload.message) {
        this.setState({dlBackMessage: uploadDLBack.payload.message});
      } else {
        this.setState({dlBackMessage: "Something went wrong while attempting to upload the back of your ID. Please try again."});
      }
    }

    if (
        (
        uploadPassport.payload && uploadPassport.payload.message && uploadPassport.payload.message.indexOf('Successfully') != -1 &&
        uploadUtility.payload && uploadUtility.payload.message && uploadUtility.payload.message.indexOf('Successfully') != -1
        ) || 
        (
          uploadDLFront.payload && uploadDLFront.payload.message && uploadDLFront.payload.message.indexOf('Successfully') != -1 &&
          uploadDLBack.payload && uploadDLBack.payload.message && uploadDLBack.payload.message.indexOf('Successfully') != -1 &&
          uploadUtility.payload && uploadUtility.payload.message && uploadUtility.payload.message.indexOf('Successfully') != -1
        )
      )
    {
      const getCountryISO3 = require("country-iso-2-to-3");
      let iso3Code = getCountryISO3(values.country);
      if (!iso3Code) {
        iso3Code = values.country;
      }
      const approveKYC = await actions.approveOfframpKYC(contact.id);

      this.setState({verifiedError:null});

      const kycCheckSubmitted = approveKYC.payload 
        && approveKYC.payload.message 
        && approveKYC.payload.message.indexOf('Success') != -1;
      if (kycCheckSubmitted) {
        this.props.onCompleted();
      } else if (approveKYC.payload && approveKYC.payload.error) {
        let errorResponse = approveKYC.payload.error.message;
        if (!errorResponse || errorResponse == '') {
          errorResponse = approveKYC.payload.error;
        }
        errorResponse += '. Please go back to review your information and try again (e.g. State/Zip/Country).'
        this.setState({verifiedError: errorResponse});
      } else {
        this.setState({verifiedError: 'An error occured while submitting your bank KYC check. Please go back, verify your info and try again.'});
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
      utilityPhotoFile,
      utilityPhotoPreview,
      utilityMessage,
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

    let $utilityPhotoPreview = null;
    if (utilityPhotoPreview) $utilityPhotoPreview = (<Image src={utilityPhotoPreview} centered size='small' />);
    else $utilityPhotoPreview = (<Image src={utilityPlaceholder} bordered centered style={{width:"185px"}} />);
    
    const contactDetails = globals.exchangecontact && globals.exchangecontact.details;
    const kycStatus = 
      contactDetails.kycUpdateStablecoin==true?"Application Error - Resubmit":
      contactDetails.kycStatusStablecoin==true?"Verified":
      contactDetails.kycSentStablecoin==true?"Submitted - Pending":"Not Submitted";

    let error = '';
    if ( (!passportFile && !utilityPhotoFile) ||
         (!dlFrontFile && !dlBackFile && !utilityPhotoFile)
      ) {
      error = 'registercarbon_kyc_missing_docs';
    }

    return (
      <Form loading={loading}>
        <Header>
          {t('wallet_registercarbon_request_step_3_header2b')} - {kycStatus}
          <Header.Subheader>
            <p>
            A goverment ID must be submitted as part of your KYC verification. This can be a passport, driver's license, national ID card, or any official form of identity documentation.
            </p>
            <p>
            You should also upload a proof of address from the past 90 days. A proof of address may include a utility bill, a banking statement, or any official item of record that displays your name and address dated in the past 90 days.
            </p>
          </Header.Subheader>
        </Header>

        <Message
          content="In order to avoid processing delays, you MUST supply either: 1) the front and back of your Goverment ID AND a recent utility bill OR 2) your passport and a recent utility bill."
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
              {$utilityPhotoPreview}
            </div>
            <form onSubmit={(e)=>this.submitFile(e)}>
              <input 
                type="file" 
                name="utilityPhoto"
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
        {(utilityMessage ?
          <Message
            content={utilityMessage}
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

export default translate('wallet')(WalletPanelFormRegisterExchangeOffRampKYCUpload);
