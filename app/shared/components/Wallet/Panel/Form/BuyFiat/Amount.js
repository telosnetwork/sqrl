// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Dropdown, Form, Input, Message, Segment, Header, Divider } from 'semantic-ui-react';

import GlobalFormFieldMemo from '../../../../Global/Form/Field/Memo';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';

class WalletPanelFormBuyFiatAmount extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      cusdSymbol,
      error,
      globals,
      isValid,
      onChange,
      onChangeFast,
      rates,
      settings,
      shouldShowKYCWarning,
      t,
      values
    } = this.props;

    const contactDetails = globals.exchangecontact && globals.exchangecontact.details;

    const currencies = [
      { key: 'usd', value: 'usd', text: 'US Dollar' },
      { key: 'eur', value: 'eur', text: 'Euro' },
      { key: 'gbp', value: 'gbp', text: 'Great Britain Pound' }
    ];

    const tokens = [];

    tokens.push({key: 'tlos',value: 'tlos',text: 'Telos'});

    /*if (contactDetails && contactDetails.kycStatusStablecoin == true) {
      tokens.push({
        key: cusdSymbol,
        value: cusdSymbol,
        text: cusdSymbol.toUpperCase()
      });
    }*/

    tokens.push({key: 'btc',value: 'btc',text: 'Bitcoin'});
    tokens.push({key: 'eos',value: 'eos',text: 'EOS'});

    return (
      <Form onSubmit={this.onSubmit}>
        <Header>
          {t('wallet_buytoken_request_step_1_header', {tokenSymbol:values.token.toUpperCase()})}
          <Header.Subheader>
            {t('wallet_buytoken_request_step_1_subheader', {tokenSymbol:values.token.toUpperCase()})}
          </Header.Subheader>
        </Header>

        <Segment basic color='green'>
          <p><strong>Token</strong></p>
          <Dropdown
            defaultValue={values.token}
            name="token"
            onChange={onChange}
            options={tokens}
            style={{ marginBottom:"20px" }} 
          />

          <Form.Field
            autoFocus
            style={{ float:"left" }} 
            control={Input}
            fluid
            icon={values.currency}
            label={t('wallet_buytoken_request_amount')}
            name="amount"
            onChange={onChange}
            defaultValue={values.amount || ''}
            width="5"
          />
          
          <Dropdown
            style={{ float:"left", marginLeft: "15px" }} 
            name="currency"
            onChange={onChange}
            options={currencies}
            defaultValue='usd'
          />

          <GlobalFormFieldMemo
            value={values.memo || ''}
            icon="note"
            label={t('wallet_buytoken_request_memo')}
            name="memo"
            onChange={onChangeFast}
          />
        </Segment>

        <Message style={{marginLeft:"15px",marginRight:"15px"}} info size="small">
          Minimum purchase of 5.00 {values.currency.toUpperCase()} required
        </Message>

          {(shouldShowKYCWarning)
          ? (
            <Message
              content={t('wallet_buytoken_request_kyc_warning', {limit:values.limit,currency:values.currency.toUpperCase()})}
              icon="info circle"
              info
            />
          ) : ''}
        
        <Container textAlign="right">
          <Form.Button
            color="blue"
            content={t('next')}
            loading={!isValid && values.amount >= 5}
            disabled={!isValid || !rates || rates.txFee == 0}
            style={{marginRight:"15px"}}
          />
        </Container>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormBuyFiatAmount);
