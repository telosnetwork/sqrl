// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Grid, Input, Message, Segment, Header } from 'semantic-ui-react';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { DateInput } from 'semantic-ui-calendar-react';

class WalletPanelFormRegisterExchangeKYC extends Component<Props> {
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
    let kycStatus = '';

    if (contact) {
      kycStatus = contact.kycPassOnfido=='5'?"Blocked":
        contact.kycPassOnfido=='4'?"Resubmitted - Pending":
        contact.kycPassOnfido=='3'?"Application Error - Resubmit":
        contact.kycPassOnfido=='2'?"Verified":
        contact.kycPassOnfido=='1'?"Submitted - Pending":"Not Submitted";
    }

    let error = '';
    if (!values.firstName || !values.lastName || !values.dob || !values.buildingNumber
      || !values.street || !values.city || !values.state || !values.postalCode
      || !values.country){
      error = 'registercarbon_kyc_fields';
    }
    let disabled = false;
    let submittedMsg = '';
    let continueButtonText = "Get Verified";
    if (contact && contact.onfidoId) {
      //error = '';
      //disabled = true;
      continueButtonText = "KYC Documentation";
      submittedMsg = "You have already submitted this form. Feel free to contact Carbon.Money and reference Applicant ID: " + contact.onfidoId;
    }

    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_registercarbon_request_step_3_header')} - {kycStatus}
          <Header.Subheader>
            <p>
            In order to increase your daily {settings.blockchain.tokenSymbol} purchase limits for card purchase, please complete the KYC application below.
            </p>
          </Header.Subheader>
        </Header>

        {(!disabled ? 
        <Message
          content="After going through KYC, you may optionally use Google 2FA to secure your account. This is to protect you and Carbon against future fraud."
          icon="info circle"
          info
        />
        : '')}

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
            label="Building #:"
            name="buildingNumber"
            onChange={onChange}
            value={values.buildingNumber} 
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

export default translate('wallet')(WalletPanelFormRegisterExchangeKYC);
