// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsSqrlToken extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('useSQRLtoken', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'use_sqrl_token_on', value: true, text: t('global_settings_use_sqrl_token_on') },
      { key: 'use_sqrl_token_off', value: false, text: t('global_settings_use_sqrl_token_off') }
    ];

    return (
      <Dropdown
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
        value={defaultValue}
      />
    );
  }
}

export default translate('global')(GlobalSettingsSqrlToken);
