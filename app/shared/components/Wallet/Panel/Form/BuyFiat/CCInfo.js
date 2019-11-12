// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactDOM from "react-dom";
import { Container, Dropdown, Form, Grid, Input, Message, Radio, Segment, Header } from 'semantic-ui-react';
import CreditCardInput from 'react-credit-card-input';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class WalletPanelFormBuyFiatCCInfo extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  onAddBankAccount = () => this.props.onAddBankAccount()
  onCCInputChange = (e, name) => {
    const invalidFields = ReactDOM.findDOMNode(this).getElementsByClassName('is-invalid');
    const isValid = !(invalidFields && invalidFields.length > 0);
    this.props.onChange(e, {name: name, valid: isValid, value: e.target.value})
  }
  render() {
    const {
      bankAccountErrDisabled,
      bankAccountErrorMsg,
      charge3dDisabled,
      charge3dErrorMsg,
      cusdSymbol,
      error,
      isBankAccountValid,
      isCCValid,
      onBack,
      onChange,
      paymentMethods,
      shouldShowMismatchWarning,
      shouldShowRoutingMismatchWarning,
      t,
      values
    } = this.props;
    const step3Label = values.token === cusdSymbol ? "wallet_buytoken_request_step_3_bank_header" : "wallet_buytoken_request_step_3_header";
    const step3Desc = values.token === cusdSymbol ? "wallet_buytoken_request_step_3_bank_subheader" : "wallet_buytoken_request_step_3_subheader";

    const hasExistingPayment = values.existingPaymentMethodId && values.existingPaymentMethodId.length > 0;
    const accountTypes = [
      { key: 'checking', value: 'checking', text: 'Checking' },
      { key: 'savings', value: 'savings', text: 'Savings' }
    ];

    let paymentOptions;
    if (paymentMethods) {
      paymentOptions = paymentMethods.map((payment) => {
        const {
          id,
          accountNumber,
          bankName
        } = payment;
        return {
          key: id,
          value: id,
          text: bankName + ' (XXXX-XXXX-' + accountNumber.substring(accountNumber.length - 4) + ')'
        };
      });
      paymentOptions.unshift({
        key:null,
        value:null,
        text:'Enter New Bank Account'
      });
    }

    const transferTypeStyle = {margin: 'auto auto 20px auto'};

    //console.log('payment methods: ', paymentMethods, ' formatted: ', paymentOptions)
    return (
      <Form>
        <Header>
          {t(step3Label)}
          <Header.Subheader>
            {t(step3Desc)}
          </Header.Subheader>
        </Header>

        {(values.token != cusdSymbol) ?
        <Segment>
          <CreditCardInput
            cardNumberInputProps={{ value: values.cardNumber, onChange: (e) => this.onCCInputChange (e, 'cardNumber'), }}
            cardExpiryInputProps={{ value: values.cardExpiry, onChange: (e) => this.onCCInputChange (e, 'cardExpiry'), style:{width:'100px'} }}
            cardCVCInputProps={{ value: values.cardCvc, onChange: (e) => this.onCCInputChange (e, 'cardCvc'), style:{width:'100px'} }}
          />

          <GlobalFormFieldGeneric
            label="Billing Address:"
            name="cardAddress"
            onChange={onChange}
            value={values.cardAddress} 
          />

          <GlobalFormFieldGeneric
            label="Postal Code:"
            name="cardPostal"
            onChange={onChange}
            value={values.cardPostal} 
          />
          
          <FormMessageError
            error={error}
            icon="warning sign"
            style={{ margin: '1em 0' }}
          />

          {(charge3dDisabled) ?
          <Message
            content={charge3dErrorMsg}
            icon="exclamation circle"
            negative
          />
          : false}
        </Segment>
        :<Segment>
          <Form.Group unstackable widths={3}>
            <Dropdown
              placeholder="Select an Existing Account"
              selection
              name="existingPaymentMethodId"
              onChange={onChange}
              options={paymentOptions}
              defaultValue={values.existingPaymentMethodId}
              style={{ marginBottom: '10px', width: '45%' }}
            />
            <Radio style={transferTypeStyle}
              name='bankACHTransfer'
              toggle 
              onChange={onChange}
              checked={values.bankACHTransfer} 
            /> <p style={transferTypeStyle}>ACH Transfer</p>
            <Radio style={transferTypeStyle} 
              name='bankWireTransfer'
              toggle 
              onChange={onChange}
              checked={values.bankWireTransfer} 
            /> <p style={transferTypeStyle}>Wire Transfer</p>
          </Form.Group>
          <GlobalFormFieldGeneric
            label="Bank Name:"
            name="bankName"
            onChange={onChange}
            value={values.bankName} 
            disabled={hasExistingPayment}
          />
          <GlobalFormFieldGeneric
            label="Bank Account Number:"
            name="bankAccountNumber"
            onChange={onChange}
            value={values.bankAccountNumber} 
            disabled={hasExistingPayment}
          />
          {(!hasExistingPayment && values.bankAccountNumber) ?
          <GlobalFormFieldGeneric
            label="Confirm Account Number:"
            name="confirmBankAccountNumber"
            onChange={onChange}
            value={values.confirmBankAccountNumber} 
          />:false}
          {(shouldShowMismatchWarning)
          ? (
            <Message
              content={'Your bank account number and confirmed entry does not match.'}
              icon="exclamation circle"
              negative
            />
          ) : ''}
          <GlobalFormFieldGeneric
            label="Routing Number:"
            name="routingNumber"
            onChange={onChange}
            value={values.routingNumber} 
            disabled={hasExistingPayment}
          />
          {(!hasExistingPayment && values.routingNumber) ?
          <GlobalFormFieldGeneric
            label="Confirm Routing Number:"
            name="confirmRoutingNumber"
            onChange={onChange}
            value={values.confirmRoutingNumber} 
          />:false}
          {(shouldShowRoutingMismatchWarning)
          ? (
            <Message
              content={'Your routing number and confirmed entry does not match.'}
              icon="exclamation circle"
              negative
            />
          ) : ''}
          <Form.Group unstackable widths={2}>
            <Dropdown
              placeholder="Account Type"
              selection
              name="bankAccountType"
              onChange={onChange}
              options={accountTypes}
              defaultValue={values.bankAccountType}
              disabled={hasExistingPayment}
              style={{marginLeft:'8px',width:'254px'}}
            />
            {(values.bankWireTransfer === true && !hasExistingPayment) ?
            <div>
              <Radio 
                name='isBankInternational'
                toggle 
                onChange={onChange}
                checked={values.isBankInternational === true}
                style={{margin:'10px auto auto 20px'}} 
              /> <p style={{float:'right',margin:'10px auto auto 20px'}}>International Bank</p>
            </div>
            :false}
          </Form.Group>
          {(values.bankWireTransfer === true && !hasExistingPayment) ?
          <div>
            <Form.Group unstackable widths={2}>
              <GlobalFormFieldGeneric
                label="Bank Address:"
                name="beneficiaryAddress1"
                onChange={onChange}
                value={values.beneficiaryAddress1}
                style={{width:'530px'}}
              />
            </Form.Group>

            <Form.Group unstackable widths={2}>
            
              <CountryDropdown
                priorityOptions={["CA", "US", "GB"]}
                value={values.beneficiaryAddressCountry}
                valueType="short"
                onChange={(val) => onChange(null, {name:'beneficiaryAddressCountry',value:val, valid:true})} 
                style={{
                  margin:'7px',
                  height:'40px'
                }}  
              />

              <RegionDropdown
                disableWhenEmpty={true}
                country={values.beneficiaryAddressCountry}
                countryValueType="short"
                value={values.beneficiaryAddressRegion}
                valueType="short"
                onChange={(val) => onChange(null, {name:'beneficiaryAddressRegion',value:val, valid:true})} 
                style={{
                  margin:'7px',
                  height:'40px'
                }}    
              />
            </Form.Group>

            <Form.Group unstackable widths={2}>
              <GlobalFormFieldGeneric
                label="City:"
                name="beneficiaryAddressCity"
                onChange={onChange}
                value={values.beneficiaryAddressCity} 
              />

              <GlobalFormFieldGeneric
                label="Zip:"
                name="beneficiaryAddressZip"
                onChange={onChange}
                value={values.beneficiaryAddressZip} 
              />
            </Form.Group>
          </div>
          :false}

          {(bankAccountErrDisabled) ?
          <Message
            content={bankAccountErrorMsg}
            icon="exclamation circle"
            negative
          />
          : false}
        </Segment>}

        <Message
          content="Important Note: Sqrl does NOT store your information. It simply collects and securely transmits your payment information to Carbon.Money for processing."
          icon="info circle"
          info
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
            {(values.token != cusdSymbol) ?
              <Form.Button
                color="blue"
                content={t('next')}
                disabled={!isCCValid}
                onClick={this.onSubmit}
                size="small"
              />:
              <Form.Button
                color="blue"
                content={t('next')}
                disabled={!isBankAccountValid}
                onClick={this.onAddBankAccount}
                size="small"
              />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormBuyFiatCCInfo);