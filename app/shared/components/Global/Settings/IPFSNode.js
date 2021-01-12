// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalFormFieldGeneric from '../Form/Field/Generic';

class GlobalSettingsIPFSNode extends Component<Props> {
  onChange = (e, { name, value }) => {
    const { actions } = this.props;

    actions.setSetting(name, value);
  }

  render() {
    const {
      settings
    } = this.props;

    return (
      [(<GlobalFormFieldGeneric
        key="ipfsNode"
        name="ipfsNode"
        onChange={this.onChange}
        value={settings.ipfsNode}
      />),
        (<GlobalFormFieldGeneric
          key="ipfsPort"
          label="IPFS Port:"
          name="ipfsPort"
          onChange={this.onChange}
          value={settings.ipfsPort}
        />),
        (<GlobalFormFieldGeneric
          key="ipfsProtocol"
          label="IPFS Protocol:"
          name="ipfsProtocol"
          onChange={this.onChange}
          value={settings.ipfsProtocol}
        />)
      ]
    );
  }
}

export default translate('global')(GlobalSettingsIPFSNode);
