// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Grid, Input, Message, Segment, Header } from 'semantic-ui-react';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';

class WalletPanelFormRegisterExchangeKYC extends Component<Props> {
  constructor(props) {
    super(props);
      this.state = {
        passport: null,
        livePhoto: null,
        dlFront: null,
        dlBack: null
      }
  }
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      globals,
      onBack,
      onChange,
      settings,
      t,
      values
    } = this.props;

    const contact = globals.exchangecontact && globals.exchangecontact.data;
    const kycStatus = 
      contact.kycPassOnfido==5?"Blocked":
      contact.kycPassOnfido==4?"Resubmitted - Pending":
      contact.kycPassOnfido==3?"Application Error - Resubmit":
      contact.kycPassOnfido==2?"Verified":
      contact.kycPassOnfido==1?"Submitted - Pending":"Not Submitted";

    // note: contact.onfidoId stores 'applicantId' submission

    let error = '';
    if (!values.firstName || !values.lastName || !values.dob || !values.buildingNumber
      || !values.street || !values.city || !values.state || !values.postalCode
      || !values.country){
      error = 'registercarbon_kyc_fields';
    }
    let disabled = false;
    let submittedMsg = '';
    let continueButtonText = "Get Verified";
    if (contact.onfidoId) {
      error = '';
      disabled = true;
      continueButtonText = "Review Documentation";
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
            Carbon users must pass Primetrust's KYC/AML process before purchasing/redeeming CUSD via wire or ACH or adding ACH/wire payment methods. This process involves submitting an identity form and uploading identity photos/documentation.
            </p>
          </Header.Subheader>
        </Header>

        {(!disabled ? 
        <Message
          content="After going through KYC, you will be required to use Google 2FA to secure your account. This is to protect you and Carbon against future fraud."
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

        <Form.Group unstackable widths={3}>
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

        <GlobalFormFieldGeneric
          label="DOB:"
          name="dob"
          onChange={onChange}
          value={values.dob} 
          disabled={disabled}
        />
        </Form.Group>

        <Form.Group unstackable widths={3}>
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

        <GlobalFormFieldGeneric
          label="City:"
          name="city"
          onChange={onChange}
          value={values.city} 
          disabled={disabled}
        />
        </Form.Group>

        <Form.Group unstackable widths={3}>
        <GlobalFormFieldGeneric
          label="State:"
          name="state"
          onChange={onChange}
          value={values.state} 
          disabled={disabled}
        />
        
        <GlobalFormFieldGeneric
          label="Zip:"
          name="postalCode"
          onChange={onChange}
          value={values.postalCode} 
          disabled={disabled}
        />

        <GlobalFormFieldGeneric
          label="Country:"
          name="country"
          onChange={onChange}
          value={values.country} 
          disabled={disabled}
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
