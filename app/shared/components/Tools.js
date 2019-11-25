// @flow
import React, { Component } from 'react';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import WelcomeConnectionContainer from '../containers/Welcome/Connection';
import GlobalSettingsLanguage from './Global/Settings/Language';
import GlobalSettingsBlockExplorer from './Global/Settings/BlockExplorer';
import GlobalSettingsIdleTimeout from './Global/Settings/IdleTimeout';
import GlobalSettingsIPFSNode from './Global/Settings/IPFSNode';
import GlobalSettingsSkipLinkModal from './Global/Settings/SkipLinkModal';
import GlobalSettingsResourceDisplayFormat from './Global/Settings/ResourceDisplayFormat';
import GlobalSettingsFilterSpamTransfers from './Global/Settings/FilterSpamTransfers';
import GlobalSettingsMirrorCastVote from './Global/Settings/MirrorCastVote';
import GlobalSettingsResourceDisplay from './Global/Settings/ResourceDisplay';
import GlobalSettingsSqrlToken from './Global/Settings/SqrlToken';

class Tools extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      i18n,
      settings,
      t
    } = this.props;

    return (
      <React.Fragment>
        <Segment attached="top">
          <Header icon size="large" textAlign="center">
            <Icon
              name="cog"
            />
            {t('tools_title')}
            <Header.Subheader
              content={t('tools_description')}
            />
          </Header>
        </Segment>
        <Segment attached padded="very">
          <Header>
            {t('tools_settings_header')}
            <Header.Subheader
              content={t('tools_settings_subheader')}
            />
          </Header>
          <Form>
            {(settings.walletMode !== 'cold')
              ? (
                <Form.Field>
                  <label>{t('tools_change_block_explorer2')}</label>
                  <GlobalSettingsBlockExplorer
                    actions={actions}
                    blockExplorers={blockExplorers}
                    defaultValue={settings.blockExplorer}
                    selection
                  />
                </Form.Field>
              ) : false
            }
            <Form.Field>
              <label>Default IPFS Node:</label>
              <GlobalSettingsIPFSNode
                actions={actions}
                settings={settings}
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_language2')}</label>
              <GlobalSettingsLanguage
                actions={actions}
                setLanguage={settings.lang}
                i18n={i18n}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_timeout')}</label>
              <GlobalSettingsIdleTimeout
                actions={actions}
                defaultValue={settings.idleTimeout}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_skip_link_modal')}</label>
              <GlobalSettingsSkipLinkModal
                actions={actions}
                defaultValue={settings.skipLinkModal}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_resource_display_format')}</label>
              <GlobalSettingsResourceDisplayFormat
                actions={actions}
                defaultValue={settings.displayResourcesAvailable}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_mirror_cast_vote')}</label>
              <GlobalSettingsMirrorCastVote
                actions={actions}
                defaultValue={settings.mirrorCastOnVote}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_use_sqrl_token')}</label>
              <GlobalSettingsSqrlToken
                actions={actions}
                defaultValue={settings.useSQRLtoken}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_show_resources')}</label>
              <GlobalSettingsResourceDisplay
                actions={actions}
                defaultValue={settings.showResourcesInWallet}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>{t('tools_change_spam_transfer_filter', {tokenSymbol:settings.blockchain.tokenSymbol})}</label>
              <GlobalSettingsFilterSpamTransfers
                actions={actions}
                defaultValue={settings.filterSpamTransfersUnder}
                selection
              />
            </Form.Field>
          </Form>
        </Segment>
        {(settings.walletMode !== 'cold')
          ? (
            <Segment attached="bottom" padded="very" secondary stacked>
              <WelcomeConnectionContainer
                autoFocus={false}
                onStageSelect={() => undefined}
              />
            </Segment>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default translate('tools')(Tools);
