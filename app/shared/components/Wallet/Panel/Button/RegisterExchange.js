// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelModalRegisterExchange from '../Modal/RegisterExchange/Request';

class WalletPanelButtonRegisterExchange extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const {
      accounts,
      actions,
      connection,
      keys,
      globals,
      history,
      settings,
      system,
      t,
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <WalletPanelModalRegisterExchange
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
            content={t('wallet_registercarbon_button_activate_cta')}
            icon="exchange"
            fluid={true}
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('wallet')(WalletPanelButtonRegisterExchange);
