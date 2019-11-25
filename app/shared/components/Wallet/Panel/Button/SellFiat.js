// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelModalFiatRequest from '../Modal/SellFiat/Request';

class WalletPanelButtonSellFiat extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const {
      accountName,
      accounts,
      actions,
      connection,
      globals,
      keys,
      history,
      settings,
      shouldShowAccountNameWarning,
      system,
      t,
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <WalletPanelModalFiatRequest
        accounts={accounts}
        actions={actions}
        connection={connection}
        globals={globals}
        keys={keys}
        history={history}
        onClose={this.onClose}
        open={open}
        settings={settings}
        system={system}
        trigger={(
          <Button
            color="blue"
            content={t('wallet_selltoken_button_cta', {tokenSymbol:settings.blockchain.tokenSymbol})}
            icon="dollar"
            fluid={true}
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('wallet')(WalletPanelButtonSellFiat);
