// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import ExplorerLink from '../../../../Global/Modal/ExplorerLink';

import WalletExchangeStatusActionTableRowGeneric from './Row/Generic';

const rowComponentsMapping = {
  
};

class WalletExchangeStatusActionsTableRow extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      action
    } = this.props;

    const {
      act
    } = action.action_trace;

    this.state = {
      ComponentType: rowComponentsMapping[act.name] || WalletExchangeStatusActionTableRowGeneric,
      generic: !(rowComponentsMapping[act.name])
    };
  }
  render() {
    const {
      action,
      blockExplorers,
      chain,
      settings
    } = this.props;
    const {
      ComponentType,
      generic
    } = this.state;
    const {
      act,
      receipt,
      trx_id
    } = action.action_trace;

    const {
      authorization
    } = act;
    const mentionedInReceiverField = [settings.account, 'eosio'].indexOf(receipt.receiver) === -1;

    const permissionActors = authorization.map((permission) => permission.actor);
    const mentionedInActObject =
      permissionActors.concat(act.account).indexOf(settings.account) === -1;

    // Filter out duplicate actions returned by API
    if (mentionedInReceiverField && mentionedInActObject) {
      return false;
    }

    return (
      <Table.Row style={{ height: '60px' }}>
        <Table.Cell
          colSpan={(generic) ? 3 : 1}
          width={(generic) ? 16 : 10}
        >
          <ComponentType
            action={action}
            blockExplorers={blockExplorers}
            chain={chain}
            settings={settings}
          />
        </Table.Cell>
        {(!generic)
          ? (
            <React.Fragment>
              <Table.Cell
                width={3}
              >
                <TimeAgo date={`${action.block_time}z`} />
              </Table.Cell>
              <Table.Cell
                width={3}
              >
                <ExplorerLink
                  blockExplorers={blockExplorers}
                  content={`${trx_id.substr(0, 4)}...${trx_id.substr(-4)}`}
                  linkData={action.action_trace.trx_id}
                  linkType="txid"
                  settings={settings}
                />
              </Table.Cell>
            </React.Fragment>
          )
          : false
        }
      </Table.Row>
    );
  }
}

export default translate('actions')(WalletExchangeStatusActionsTableRow);
