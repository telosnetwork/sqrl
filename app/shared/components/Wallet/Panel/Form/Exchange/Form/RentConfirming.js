// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

class WalletPanelFormExchangeRentConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      decimalLoanAmount,
      decimalPaymentAmount,
      receiver,
      rentNETorCPU,
      rex,
      EOSbalance,
      onBack,
      settings,
      t
    } = this.props;

    const loanAmount = decimalLoanAmount.toNumber();
    const paymentAmount = decimalPaymentAmount.toNumber();
    const balanceDifference =  Decimal(EOSbalance).toNumber() - paymentAmount;

    return (
        <Segment padding="true" basic>
          <Segment.Group>
            <Segment>
              <Header textAlign="center">
                <font color="green">
                  <Icon name="microchip" />{t('rex_rent_about_to', 
                    {paymentAmount: paymentAmount.toFixed(settings.tokenPrecision), loanAmount: loanAmount.toFixed(settings.tokenPrecision), 
                    tokenSymbol: settings.blockchain.tokenSymbol, rentNETorCPU: rentNETorCPU,
                    receiver: receiver})}
                </font>
                <Header.Subheader>
                  ({t('rex_you_will_have')} {balanceDifference.toFixed(settings.tokenPrecision)} {t('rex_rent_balance_after', 
                  {tokenSymbol:settings.blockchain.tokenSymbol})})
                </Header.Subheader>
              </Header>
            </Segment>
          </Segment.Group>

          <Divider />
          <Button
            onClick={onBack}
          >
            <Icon name="arrow left" /> {t('back')}
          </Button>
          <Button
            color="blue"
            floated="right"
            onClick={this.onConfirm}
          >
            <Icon name="check" /> {t('rex_confirm_button')}
          </Button>
        </Segment>
    );
  }
}

export default translate('exchange')(WalletPanelFormExchangeRentConfirming);
