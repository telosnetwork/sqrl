// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactDOM from "react-dom";
import { Container, Dropdown, Form, Grid, Input, Message, Segment, Header } from 'semantic-ui-react';
import CreditCardInput from 'react-credit-card-input';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';

class WalletPanelFormBuyFiatCCInfo extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  onCCInputChange = (e, name) => {
    const invalidFields = ReactDOM.findDOMNode(this).getElementsByClassName('is-invalid');
    const isValid = !(invalidFields && invalidFields.length > 0);
    this.props.onChange(e, {name: name, valid: isValid, value: e.target.value})
  }
  render() {
    const {
      charge3dDisabled,
      charge3dErrorMsg,
      error,
      isCCValid,
      onBack,
      onChange,
      settings,
      t,
      values
    } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_buytoken_request_step_3_header', {tokenSymbol:settings.blockchain.tokenSymbol})}
          <Header.Subheader>
            {t('wallet_buytoken_request_step_3_subheader')}
          </Header.Subheader>
        </Header>

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
          icon="info circle"
          negative
        />
        : false}

        <Message
          content="Important Note: Sqrl does NOT store your information. It simply collects and securely transmits your credit/debit card information to Carbon.Money for processing."
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
              <Form.Button
                color="blue"
                content={t('next')}
                disabled={!isCCValid}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormBuyFiatCCInfo);