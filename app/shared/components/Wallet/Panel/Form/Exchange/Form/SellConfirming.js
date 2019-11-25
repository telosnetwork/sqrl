// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

class WalletPanelFormExchangeSellConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      decimalSellAmount,
      COREbalance,
      onBack,
      settings,
      t
    } = this.props;

    const sellAmount = decimalSellAmount.toNumber();
    const balanceDifference =  Decimal(COREbalance).toNumber() - sellAmount;

    return (
        <Segment padding="true" basic>
          <Segment.Group>
            <Segment>
              <Header textAlign="center">
                <font color="green">
                  <Icon name="microchip" />{t('rex_sellrex_about_to', 
                    {sellAmount: sellAmount.toFixed(settings.tokenPrecision), tokenSymbol: settings.blockchain.tokenSymbol})}
                </font>
                <Header.Subheader>
                  ({t('rex_you_will_have')} {balanceDifference.toFixed(settings.tokenPrecision)} {t('rex_sellrex_balance_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
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

export default translate('exchange')(WalletPanelFormExchangeSellConfirming);
