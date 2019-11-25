// @flow
import React, { Component } from 'react';

import GlobalTransactionMessageError from './Message/Error';
import GlobalTransactionMessageSuccess from './Message/Success';
import GlobalTransactionMessageUnsignedSign from './Message/Unsigned/Sign';
import GlobalTransactionMessageUnsignedDownload from './Message/Unsigned/Download';

type Props = {
  actionName: string,
  blockExplorers: {},
  onClose: () => void,
  content: {},
  settings: {},
  system: {}
};

export default class GlobalTransactionHandler extends Component<Props> {
  componentWillUnmount = () => {
    this.props.actions.clearSystemState();
  }

  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      contract,
      hideClose,
      onClose,
      settings,
      system,
      transaction
    } = this.props;

    const hasTransaction = (transaction && transaction.transaction_id);
    const broadcastTransaction = (hasTransaction && ((transaction.broadcast) || (transaction.processed && transaction.processed.receipt.status === 'executed')));
    const hasError = (system[`${actionName}_LAST_ERROR`]);

    /*if (hasError) { 
      const parsedError = system[`${actionName}_LAST_ERROR`].error;
      if (parsedError && parsedError.code) {
        switch (parsedError.code) {
          case 3081001: console.log('account CPU limits exceeded'); break;
          case 3080001: console.log('Not enough RAM to complete operation'); break;
          case 3080002: console.log('Network usage exceeded node\'s capability. Try another node'); break;
          case 3080004: console.log('CPU usage exceeded node\'s capability. Try another node'); break;
          case 3080006: console.log('Transaction went beyond alloted time. Try another node'); break;
        }
      }
    }*/

    let { content } = this.props;
    if (broadcastTransaction) {
      content = (
        <GlobalTransactionMessageSuccess
          blockExplorers={blockExplorers}
          settings={settings}
          hideClose={hideClose}
        />
      );
    } else if (hasError) {
      content = (
        <GlobalTransactionMessageError
          error={system[`${actionName}_LAST_ERROR`]}
        />
      );
    } else if (hasTransaction && settings.walletMode !== 'watch') {
      content = (
        <GlobalTransactionMessageUnsignedSign />
      );
    } else if (hasTransaction && settings.walletMode === 'watch') {
      content = (
        <GlobalTransactionMessageUnsignedDownload />
      );
    }

    return React.cloneElement(content, {
      actions,
      contract,
      onClose,
      transaction
    });
  }
}
