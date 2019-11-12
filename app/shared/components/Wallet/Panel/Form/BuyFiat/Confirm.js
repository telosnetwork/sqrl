// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Form, Grid, List, Message, Segment, Table, Header } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';
import Countdown from 'react-countdown-now';

class WalletPanelFormBuyFiatConfirm extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      bankAccountErrDisabled,
      bankAccountErrorMsg,
      bankTransactionSent,
      bankTransactionSentMsg,
      charge3dDisabled,
      charge3dErrorMsg,
      cusdSymbol,
      loading,
      onBack,
      paymentMethods,
      purchaseAmount,
      rates,
      settings,
      t,
      totalCost,
      tokenSymbolLower,
      transactionFee,
      values
    } = this.props;

    const fiatSymbol = values.currency + "/" + values.token;

    let bankInfo = {
      bankName: values.bankName,
      bankAccountNumber: values.bankAccountNumber,
      bankAccountType: values.bankAccountType,
      routingNumber: values.routingNumber
    }
    if (values.existingPaymentMethodId) {
      const paymentMethod = paymentMethods.filter((payment) => (payment.id == values.existingPaymentMethodId))[0];
      bankInfo = {
        bankName: paymentMethod.bankName,
        bankAccountNumber: paymentMethod.accountNumber,
        bankAccountType: paymentMethod.bankAccountType ? paymentMethod.bankAccountType : "checking",
        routingNumber: paymentMethod.routingNumber
      }
    }

    const confirmButtonText = bankTransactionSent ? "Close" : "Confirm Purchase";
    const showBankInfoInSummary = values.bankACHTransfer === true || 
      (!bankTransactionSent && values.bankWireTransfer === true);
    return (
      <Form
        loading={loading}
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_buytoken_request_step_4_header', {tokenSymbol:values.token.toUpperCase()})}
          <Header.Subheader>
            {t('wallet_buytoken_request_step_4_subheader')}
          </Header.Subheader>
        </Header>

        {(charge3dDisabled) ?
        <Message
          content={charge3dErrorMsg}
          icon="exclamation circle"
          negative
        />
        : false}

        {(bankAccountErrDisabled) ?
          <Message
            content={bankAccountErrorMsg}
            icon="exclamation circle"
            negative
          />
          : false}

        {(bankTransactionSent) ?
          <Message
            content={bankTransactionSentMsg}
            icon="info circle"
            info
          />
          : false}

        {(bankTransactionSent && values.bankWireTransfer) ?
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Beneficiary Name</Table.Cell>
                <Table.Cell>Prime Trust, LLC</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Beneficiary Address</Table.Cell>
                <Table.Cell>330 S Rampart Ave, Suite 260 Las Vegas, NV, 89145</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bank Name</Table.Cell>
                <Table.Cell>Pacific Mercantile Bank</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bank Address</Table.Cell>
                <Table.Cell>949 South Coast Drive, Third Floor Costa Mesa, CA 92626</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Routing Number</Table.Cell>
                <Table.Cell>122242869</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Account Number</Table.Cell>
                <Table.Cell>45585603</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Swift Code</Table.Cell>
                <Table.Cell>PMERUS66</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bank Phone</Table.Cell>
                <Table.Cell>+1-714-438-2500</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        : false}

        <Grid unstackable="true">
          <Grid.Row>
            <Grid.Column>
              <Segment>
                { (!bankTransactionSent 
                  && values.bankWireTransfer !== true 
                  && values.bankACHTransfer !== true) ?
                <Message
                content={(
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column textAlign="right">
                      <p>Awaiting Payment:</p>
                      </Grid.Column>
                      <Grid.Column textAlign="left">
                        <Countdown 
                          date={Date.now() + 600000} 
                          renderer={props => <div>0{props.minutes}:{props.seconds}</div>} 
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  )}
                icon="info circle"
                info
              />:false}

              {(values.token != cusdSymbol) ?
                <List divided relaxed size='medium'>
                  <List.Item>
                    <List.Icon name='credit card' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>XXXX-XXXX-XXXX-{values.cardNumber.substring(values.cardNumber.length - 4)}</List.Header>
                      <List.Description as='p'>Card Number</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='calendar' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{values.cardExpiry}</List.Header>
                      <List.Description as='p'>Exipration</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='address card' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{values.cardAddress} {values.cardPostal}</List.Header>
                      <List.Description as='p'>Billing Address</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(purchaseAmount).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'>Purchase Amount</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='exchange' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(rates.estimatedCryptoPurchase).toFixed(4)} {values.token.toUpperCase()}</List.Header>
                      <List.Description as='p'>Estimated Purchase</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(transactionFee).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'>Carbon Fee</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{rates[fiatSymbol]} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'>{values.currency.toUpperCase()}/{values.token.toUpperCase()}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(totalCost).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'><strong>Total Cost</strong></List.Description>
                    </List.Content>
                  </List.Item>
              </List>
              :<List divided relaxed size='medium'>
                  {(showBankInfoInSummary) ?
                  <List.Item>
                    <List.Icon name='building' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{bankInfo.bankName}</List.Header>
                      <List.Description as='p'>Bank Name</List.Description>
                    </List.Content>
                  </List.Item>
                  :false}
                  {(showBankInfoInSummary) ?
                  <List.Item>
                    <List.Icon name='check square' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{bankInfo.bankAccountType[0].toUpperCase() + bankInfo.bankAccountType.slice(1)}</List.Header>
                      <List.Description as='p'>Account Type</List.Description>
                    </List.Content>
                  </List.Item>
                  :false}
                  {(showBankInfoInSummary) ?
                  <List.Item>
                    <List.Icon name='id card' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>XXXX-XXXX-{bankInfo.bankAccountNumber.substring(bankInfo.bankAccountNumber.length - 4)}</List.Header>
                      <List.Description as='p'>Account Number</List.Description>
                    </List.Content>
                  </List.Item>
                  :false}
                  {(showBankInfoInSummary) ?
                  <List.Item>
                    <List.Icon name='road' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{bankInfo.routingNumber}</List.Header>
                      <List.Description as='p'>Routing Number</List.Description>
                    </List.Content>
                  </List.Item>
                  :false}
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(purchaseAmount).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'>Purchase Amount</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='exchange' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(rates.estimatedCryptoPurchase).toFixed(4)} {values.token.toUpperCase()}</List.Header>
                      <List.Description as='p'>Estimated Purchase</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(transactionFee).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'>Carbon Fee</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{rates[fiatSymbol]} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'>{values.currency.toUpperCase()}/{values.token.toUpperCase()}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name={values.currency} verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='p'>{Decimal(totalCost).toFixed(2)} {values.currency.toUpperCase()}</List.Header>
                      <List.Description as='p'><strong>Total Cost</strong></List.Description>
                    </List.Content>
                  </List.Item>
              </List>}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              {(!bankTransactionSent) ?
              <Form.Button
                content={t('back')}
                onClick={onBack}
                size="small"
              />:false}
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Form.Button
                color="blue"
                content={confirmButtonText}
                size="medium"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormBuyFiatConfirm);