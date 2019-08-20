// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Grid, Input, Message, Segment, Header } from 'semantic-ui-react';
import CreditCardInput from 'react-credit-card-input';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';

class WalletPanelFormBuyFiatPurchase extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      error,
      isValid,
      onBack,
      onChange,
      settings,
      shouldShowKYCWarning,
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
          cardNumberInputProps={{ value: values.cardNumber, onChange: onChange }}
          cardExpiryInputProps={{ value: values.cardExpiry, onChange: onChange }}
          cardCVCInputProps={{ value: values.cardCvc, onChange: onChange }}
          
        />

        <GlobalFormFieldGeneric
          label="Name on Card:"
          name="cardName"
          onChange={onChange}
          value={values.cardName} 
        />

        <GlobalFormFieldGeneric
          label="Billing Address:"
          name="cardAddress"
          onChange={onChange}
          value={values.cardAddress} 
        />

        <GlobalFormFieldGeneric
          label="Billing Town:"
          name="cardTown"
          onChange={onChange}
          value={values.cardTown} 
        />

        <GlobalFormFieldGeneric
          label="Billing Postal:"
          name="cardPostal"
          onChange={onChange}
          value={values.cardPostal} 
        />
        
        <FormMessageError
          error={error}
          icon="warning sign"
          style={{ margin: '1em 0' }}
        />

          {(shouldShowKYCWarning)
          ? (
            <Message
              content={t('wallet_buytoken_request_kyc_warning', {currency:values.currency})}
              icon="info circle"
              info
            />
          ) : ''}

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
                disabled={!isValid}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormBuyFiatPurchase);
