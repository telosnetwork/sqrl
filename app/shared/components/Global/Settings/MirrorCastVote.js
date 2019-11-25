// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsMirrorCastVote extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('mirrorCastOnVote', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'mirror_cast_on', value: true, text: t('global_settings_mirror_cast_vote_on') },
      { key: 'mirror_cast_off', value: false, text: t('global_settings_mirror_cast_vote_off') }
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

export default translate('global')(GlobalSettingsMirrorCastVote);
