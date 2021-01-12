// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

export default class GlobalFormFieldToken extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }
  onChange = debounce((e, { name, value }) => {
    const {
      settings
    } = this.props;
    const asset = settings.blockchain.tokenSymbol;
    const valid = settings.tokenPrecision == 8 ? 
      !!(value.match(/^\d+(\.\d{1,8})?$/g)) : !!(value.match(/^\d+(\.\d{1,4})?$/g));

    const defaultValue = '0.'.padEnd(settings.tokenPrecision + 2, '0');
    const parsed = (value > 0) ? `${new Decimal(value).toFixed(settings.tokenPrecision)} ${asset}` : `${defaultValue} ${asset}`;

    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, { name, value: parsed, valid });
    });
  }, 300)

  render() {
    const {
      autoFocus,
      icon,
      label,
      loading,
      name,
      settings
    } = this.props;
    const {
      value
    } = this.state;
    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        defaultValue={value}
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        placeholder={'0.'.padEnd(settings.tokenPrecision + 2, '0')}
      />
    );
  }
}
