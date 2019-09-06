// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Form, Grid, List, Message, Segment, Header } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';
import Countdown from 'react-countdown-now';

class WalletPanelFormBuyFiatConfirm extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      charge3dDisabled,
      charge3dErrorMsg,
      loading,
      onBack,
      purchaseAmount,
      rates,
      settings,
      t,
      totalCost,
      transactionFee,
      values
    } = this.props;

    const symbolLower = settings.blockchain.tokenSymbol.toLowerCase();
    const fiatSymbol = values.currency + "/" + symbolLower;

    return (
      <Form
        loading={loading}
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_buytoken_request_step_4_header', {tokenSymbol:settings.blockchain.tokenSymbol})}
          <Header.Subheader>
            {t('wallet_buytoken_request_step_4_subheader')}
          </Header.Subheader>
        </Header>

        {(charge3dDisabled) ?
        <Message
          content={charge3dErrorMsg}
          icon="info circle"
          negative
        />
        : false}

        <Grid unstackable="true">
          <Grid.Row>
            <Grid.Column>
              <Segment>
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
              />
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
                      <List.Header as='p'>{Decimal(rates.estimatedCryptoPurchase).toFixed(4)} {settings.blockchain.tokenSymbol}</List.Header>
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
                      <List.Description as='p'>{values.currency.toUpperCase()}/{settings.blockchain.tokenSymbol}</List.Description>
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
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

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
                content={t('Confirm Purchase')}
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