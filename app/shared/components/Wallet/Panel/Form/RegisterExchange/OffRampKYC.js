// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Grid, Input, Message, Segment, Header } from 'semantic-ui-react';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { DateInput } from 'semantic-ui-calendar-react';

class WalletPanelFormRegisterExchangeOffRampKYC extends Component<Props> {
  constructor(props) {
    super(props);
      this.state = {
        
      }
  }
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      globals,
      location,
      onBack,
      onChange,
      settings,
      t,
      values
    } = this.props;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    const contactDetails = globals.exchangecontact && globals.exchangecontact.details;
    let kycStatus = '';

    if (contactDetails) {
      kycStatus = 
        contactDetails.kycUpdateStablecoin==true?"Application Error - Resubmit":
        contactDetails.kycStatusStablecoin==true?"Verified":
        contactDetails.kycSentStablecoin==true?"Submitted - Pending":"Not Submitted";
    }

    let error = '';
    if (!values.firstName || !values.lastName || !values.dob || !values.phoneNumber
      || !values.street || !values.city || !values.state || !values.postalCode
      || !values.country || !values.taxCountry || !values.taxId || !values.sex){
      error = 'registercarbon_kyc_fields';
    }
    let disabled = false;
    let submittedMsg = '';
    let continueButtonText = "Get Verified";
    if (contactDetails && contactDetails.kycSentStablecoin) {
      //error = '';
      //disabled = true;
      continueButtonText = "KYC Documentation";
      submittedMsg = "You have already submitted this form. Feel free to contact Carbon.Money and reference Applicant ID: " + contact.id;
    }

    const sexOptions = [
      { key: 'male', value: 'male', text: 'Male' },
      { key: 'female', value: 'female', text: 'Female' },
      { key: 'unspecified', value: 'unspecified', text: 'Unspecified' }
    ];

    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_registercarbon_request_step_3_header2a')} - {kycStatus}
          <Header.Subheader>
            <p>
            Carbon users must pass Primetrust's KYC/AML process before purchasing/redeeming CUSD via wire or ACH or adding ACH/wire payment methods. This process involves submitting an identity form and uploading identity photos/documentation.
            </p>
          </Header.Subheader>
        </Header>

        {(disabled ? 
          <Message
          content={submittedMsg}
          icon="info circle"
          info
        />
        : '')}

        <Form.Group unstackable widths={2}>
          <GlobalFormFieldGeneric
            label="First Name:"
            name="firstName"
            onChange={onChange}
            value={values.firstName} 
            disabled={disabled}
          />

          <GlobalFormFieldGeneric
            label="Last Name:"
            name="lastName"
            onChange={onChange}
            value={values.lastName} 
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group unstackable widths={2}>
          <GlobalFormFieldGeneric
            label="Phone Number:"
            name="phoneNumber"
            onChange={onChange}
            value={values.phoneNumber} 
            disabled={disabled}
          />

          <GlobalFormFieldGeneric
            label="Street Address:"
            name="street"
            onChange={onChange}
            value={values.street} 
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group unstackable widths={2}>
        
          <CountryDropdown
            priorityOptions={["CA", "US", "GB"]}
            value={values.country}
            valueType="short"
            onChange={(val) => onChange(null, {name:'country',value:val, valid:true})} 
            style={{
              margin:'7px',
              height:'40px'
            }}  
          />

          <RegionDropdown
            disableWhenEmpty={true}
            country={values.country}
            countryValueType="short"
            value={values.state}
            valueType="short"
            onChange={(val) => onChange(null, {name:'state',value:val, valid:true})} 
            style={{
              margin:'7px',
              height:'40px'
            }}    
          />
        </Form.Group>

        <Form.Group unstackable widths={2}>
          <GlobalFormFieldGeneric
            label="City:"
            name="city"
            onChange={onChange}
            value={values.city} 
            disabled={disabled}
          />

          <GlobalFormFieldGeneric
            label="Zip:"
            name="postalCode"
            onChange={onChange}
            value={values.postalCode} 
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group unstackable widths={2}>
          <DateInput 
            dateFormat="YYYY-MM-DD"
            disabled={disabled}
            name="dob"
            placeholder="Date of Birth"
            value={values.dob}
            iconPosition="left"
            onChange={onChange}
          />

          <Dropdown
            placeholder="Sex"
            selection
            name="sex"
            disabled={disabled}
            onChange={onChange}
            options={sexOptions}
            defaultValue='male'
            value={values.sex}
            style={{
              marginLeft:'7px',
              width:'270px'
            }}    
          />
        </Form.Group>

        <Form.Group unstackable widths={2}>
          <CountryDropdown
            defaultOptionLabel="Tax ID Country"
            priorityOptions={["CA", "US", "GB"]}
            value={values.taxCountry}
            valueType="short"
            onChange={(val) => onChange(null, {name:'taxCountry',value:val, valid:true})} 
            style={{
              marginLeft:'7px',
              marginTop:'21px',
              height:'40px',
              width:'270px'
            }}  
          />

          <GlobalFormFieldGeneric
            label="Tax ID:"
            name="taxId"
            onChange={onChange}
            value={values.taxId} 
            disabled={disabled}
            style={{
              marginLeft:'7px'
            }}  
          />
        </Form.Group>

        <FormMessageError
          error={error}
          icon="warning sign"
          style={{ margin: '1em 0' }}
        />

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
                content={continueButtonText}
                disabled={error.length > 0 && !disabled}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormRegisterExchangeOffRampKYC);
