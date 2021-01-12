import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { List } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class GlobalTransactionMessageErrorDeadline extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;

    const colorStyle = { color: '#3C3A3B' };

    return (
      <div>
        <p>
          {t('global_transaction_message_error_deadline_paragraph')}
        </p>
        <hr style={colorStyle} />
        <p style={colorStyle}>*&nbsp;{t('global_transaction_message_error_deadline_note')}</p>
        {(typeof error === 'object') ? (
          <ReactJson
            collapsed={2}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error}
            style={{ padding: '1em' }}
          />
        ) : ''}
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorDeadline);
