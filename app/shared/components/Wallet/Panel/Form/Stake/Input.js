// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Decimal } from 'decimal.js';

import FormFieldToken from '../../../../Global/Form/Field/Token';

class WalletPanelFormStakeInput extends Component<Props> {
  onChange = (e, { name, value }) => {
    const {
      onChange
    } = this.props;
    const parsed = new Decimal(value.split(' ')[0]).toFixed(settings.tokenPrecision);
    onChange(name, parsed);
  }

  render() {
    const {
      defaultValue,
      label,
      icon,
      name,
      settings
    } = this.props;

    return (
      <FormFieldToken
        autoFocus
        icon={icon}
        label={label}
        loading={false}
        name={name}
        onChange={this.onChange}
        defaultValue={defaultValue.toFixed(settings.tokenPrecision)}
        settings={settings}
      />
    );
  }
}

export default translate('stake')(WalletPanelFormStakeInput);
