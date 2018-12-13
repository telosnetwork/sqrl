// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import ProxiesFormProposal from '../Form/Proxy';

class ProxiesButtonProposal extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      currentProxyReg,
      onClose,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;

    let currentProxyRegInfo = {};
    if (currentProxyReg) {
      currentProxyRegInfo = currentProxyReg;
    }
    const {
      name,
      website,
      slogan,
      philosophy,
      background,
      logo_256,
      telegram,
      steemit,
      twitter,
      wechat,
      reserved_1,
      reserved_2,
      reserved_3,
    } = currentProxyRegInfo;

    return (
      (currentProxyReg) ?
        <GlobalTransactionModal
          actionName="SET_REGPROXYINFO"
          actions={actions}
          blockExplorers={blockExplorers}
          button={{
            color: 'blue',
            content: 'Update Registration',
            icon: "circle plus",
            floated: 'right',
            size: 'small'
          }}
          content={(
            <ProxiesFormProposal
              accounts={accounts}
              actions={actions}
              key="ProxiesForm"
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}

              name={name}
              website={website}
              slogan={slogan}
              philosophy={philosophy}
              background={background}
              logo_256={logo_256}
              telegram={telegram}
              steemit={steemit}
              twitter={twitter}
              wechat={wechat}
              reserved_1={reserved_1}
              reserved_2={reserved_2}
              reserved_3={reserved_3}
            />
          )}
          icon="inbox"
          onClose={onClose}
          settings={settings}
          system={system}
          title="Update Registration"
          />
          :
          <GlobalTransactionModal
          actionName="SET_REGPROXYINFO"
          actions={actions}
          blockExplorers={blockExplorers}
          button={{
            color: 'blue',
            content: 'Register as Proxy',
            icon: "circle plus",
            floated: 'right',
            size: 'small'
          }}
          content={(
            <ProxiesFormProposal
              accounts={accounts}
              actions={actions}
              key="ProxiesForm"
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />
          )}
          icon="inbox"
          onClose={onClose}
          settings={settings}
          system={system}
          title="Register as Proxy"
          />
    );
  }
}

export default translate('producers')(ProxiesButtonProposal);
