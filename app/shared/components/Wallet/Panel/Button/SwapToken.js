// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelModalFiatRequest from '../Modal/BuyFiat/Request';

class WalletPanelButtonSwap extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const {
      accountName,
      actions,
      connection,
      globals,
      history,
      settings,
      shouldShowAccountNameWarning,
      system,
      t,
    } = this.props;

    const {
      open
    } = this.state;

    const altTokenSymbol = 
      settings.blockchain.tokenSymbol == "EOS" ? "TLOS" :
      settings.blockchain.tokenSymbol == "TLOS" ? "EOS" : "TLOS";

    return (
      <WalletPanelModalFiatRequest
        actions={actions}
        connection={connection}
        globals={globals}
        history={history}
        onClose={this.onClose}
        open={open}
        settings={settings}
        system={system}
        trigger={(
          <Button
            color="blue"
            content={t('wallet_swaptoken_button_cta', 
              {tokenSymbol:settings.blockchain.tokenSymbol, altTokenSymbol:altTokenSymbol})}
            icon="exchange"
            fluid={true}
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('wallet')(WalletPanelButtonSwap);
