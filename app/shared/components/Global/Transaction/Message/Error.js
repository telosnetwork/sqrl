// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Message } from 'semantic-ui-react';

import GlobalTransactionErrorAuthorization from './Error/Authorization';
import GlobalTransactionErrorLeeway from './Error/Leeway';
import GlobalTransactionErrorRAMUsage from './Error/RAMUsage';
import GlobalTransactionErrorNETUsage from './Error/NETUsage';
import GlobalTransactionErrorCPUUsage from './Error/CPUUsage';
import GlobalTransactionErrorDeadline from './Error/Deadline';
import GlobalTransactionErrorDefault from './Error/Default';

const transactionErrorsMapping = {
  // unsatisfied_authorization, 3090003
  // "Provided keys, permissions, and delays do not satisfy declared authorizations"
  unsatisfied_authorization: GlobalTransactionErrorAuthorization,

  // leeway_deadline_exception, 3081001
  // "Transaction reached the deadline set due to leeway on account CPU limits"
  leeway_deadline_exception: GlobalTransactionErrorLeeway,

  // ram_usage_exceeded, 3080001
  // "Account using more than allotted RAM usage"
  ram_usage_exceeded: GlobalTransactionErrorRAMUsage,

  // tx_net_usage_exceeded, 3080002
  // "Transaction exceeded the current network usage limit imposed on the transaction"
  tx_net_usage_exceeded: GlobalTransactionErrorNETUsage,

  // tx_cpu_usage_exceeded, 3080004
  // "Transaction exceeded the current CPU usage limit imposed on the transaction"
  tx_cpu_usage_exceeded: GlobalTransactionErrorCPUUsage,

  // deadline_exception, 3080006
  // "Transaction took too long"
  deadline_exception: GlobalTransactionErrorDeadline
};

class GlobalTransactionMessageError extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      error
    } = this.props;

    const errorName = error.error && error.error.name;

    this.state = {
      ComponentType: transactionErrorsMapping[errorName] || GlobalTransactionErrorDefault
    };
  }

  render() {
    const {
      error,
      onClose,
      style,
      t
    } = this.props;

    const {
      ComponentType
    } = this.state;

    return (
      <div style={style}>
        <Message negative>
          <Header>{t('error')}</Header>
          <ComponentType
            error={error}
            onClose={onClose}
            style={style}
          />
        </Message>
        {(onClose) ? (
          <Button
            color="red"
            content={t('close')}
            fluid
            onClick={onClose}
          />) : ''}
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageError);
