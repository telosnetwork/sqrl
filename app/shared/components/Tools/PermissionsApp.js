// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import {
  Button,
  Confirm,
  Container,
  Icon,
  Header, 
  Input,
  Message,
  Segment,
  Table
} from 'semantic-ui-react';

import ToolsModalPermissionAuth from './Modal/Permissions/Auth';
import WalletPanelLocked from '../Wallet/Panel/Locked';
import PermissionsAuthorizedApp from './Permissions/AuthorizedApp';

import { debounce, filter, sortBy } from 'lodash';
import { PermissionList } from './Permissions/Permission';
import APIUtils from '../../../wallet-integration/API/util/APIUtils';

class ToolsPermissionsApp extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      numberToLoad: 10,
      confirmDeleteAll: false,
      confirmDeleteApp: false,
      confirmDeletePermission: false,
      appToDelete: undefined,
      permissionToDelete: undefined
    };
  }

  onSearchChange = debounce((e, { value }) => {
    const query = String(value).toLowerCase();

    this.setState({ query });
  }, 300);

  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      keys,
      settings,
      system,
      t,
      validate,
      wallet,
      wapii,
      connection
    } = this.props;

    if (settings.walletMode !== 'watch' && !(keys && keys.key)) {
      return (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
          connection={connection}
        />
      );
    }

    const account = accounts[settings.account];

    if (!account || !wapii || !wapii.authorizedApps || !wapii.authorizedApps.length)
      return (
        <Message
          header={t('tools_permissions_app_empty_header')}
          content={t('tools_permissions_app_empty_subheader')}
          icon="info circle"
          info
        />
      );

    const {
      confirmDeleteAll,
      confirmDeleteApp,
      confirmDeletePermission,
      numberToLoad,
      query
    } = this.state;

    const {
      removeApp,
      removeApps,
      removePermission,
      removePermissionsByOrigin
    } = actions;

    const apps = wapii.authorizedApps.map((app) => {
      return new PermissionsAuthorizedApp(app.origin, app.appkey, app.nextNonce, app.createdAt);
    });

    const sortedApps = sortBy(apps, 'origin');

    const appsToDisplay = filter(sortedApps, (app) => {
      const matchesLabel = (String(app.origin).toLowerCase()).indexOf(query) > -1;

      return !query || matchesLabel;
    }).slice(0, numberToLoad);

    let permissions = PermissionList.permissionsPerOrigin(wapii.permissions);
    permissions = Object.keys(permissions)
      .reduce((value, origin) => {
        value[origin] = PermissionList.permissionsPerType( permissions[origin] );
        return value;
      }, {});


    return (
      <React.Fragment>
        <Header
          content={t('tools_permissions_app_header')}
          subheader={t('tools_permissions_app_subheader')}
          textAlign="left"/>
        <Message
          header={t('tools_permissions_app_warning_header')}
          content={t('tools_permissions_app_warning_subheader')}
          icon="info circle"
          info
        />
        <Segment basic>
          <Input
            icon="search"
            onChange={this.onSearchChange}
            placeholder={t('tools_permissions_app_text')}
            floated="left"
          />
          <Button
            content={t('tools_permissions_app_delete_all')}
            icon="trash alternate"
            floated="right"
            onClick={() => this.setState({ confirmDeleteAll: true})}>
          </Button>
        </Segment>

        {appsToDisplay.map((app, i) => (
          <Segment
            color="orange"
            key={`${app.origin}-${app.appkey}`}>
            <Header
              content={app.origin}
              size="medium"
            />
            <Button
              content={t('tools_permissions_app_delete')}
              icon="trash alternate"
              floated="right"
              onClick={() => this.setState({ confirmDeleteApp: true, appToDelete: app})}>
            </Button>

            <Header
              content={t('tools_permissions_app_metadata')}
              size="small"
            />
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_metadata_origin')}</Table.Cell>
                  <Table.Cell>{app.origin}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_metadata_authorized_date')}</Table.Cell>
                  <Table.Cell>{new Date(app.createdAt).toLocaleString()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_metadata_hased_app_key')}</Table.Cell>
                  <Table.Cell>{app.hashed()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_metadata_nonce')}</Table.Cell>
                  <Table.Cell>{app.nextNonce}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            {(permissions[app.origin] && permissions[app.origin].identity.length) ? (
              <React.Fragment>
                <Segment basic>
                  <Header
                    content={t('tools_permissions_app_identity')}
                    size="small"/>
                </Segment>
                <Table>
                  <Table.Body>
                    {permissions[app.origin].identity.map((permission, i) => {
                      const identity = wapii.identity;
                      return (
                      <React.Fragment key={i}>
                        <Table.Row>
                          <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_identity_identity')}</Table.Cell>
                          <Table.Cell>{identity.publicKey}</Table.Cell>
                          <Table.Cell>
                            <Button
                              content={t('tools_permissions_app_delete')}
                              icon="trash alternate"
                              floated="right"
                              onClick={() => this.setState({ confirmDeletePermission: true, permissionToDelete: permission})}>
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                        {permission.accounts.map((unique, i1) => {
                          const account = PermissionList.getAccountUnique(unique, wapii.accounts);
                          return (
                            <Table.Row key={i1}>
                              <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_identity_account')}</Table.Cell>
                              <Table.Cell>{account.name}@{account.authority}</Table.Cell>
                              <Table.Cell></Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </React.Fragment>
                    )})}
                  </Table.Body>
                </Table>
              </React.Fragment>
            ) : false}

            {(permissions[app.origin] && permissions[app.origin].identityRequirements.length) ? (
              <React.Fragment>
                <Header
                  content={t('tools_permissions_app_identity_fields')}
                  size="small"
                />
                <Table>
                  <Table.Body>
                    {permissions[app.origin].identityRequirements.map((permissions, i) => {
                      const identity = wapii.identity;
                      return (
                        <React.Fragment key={i}>
                          <Table.Row>
                            <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_identity_fields_identity')}</Table.Cell>
                            <Table.Cell>{identity.publicKey}</Table.Cell>
                            <Table.Cell>
                              <Button
                                content={t('tools_permissions_app_delete')}
                                icon="trash alternate"
                                floated="right"
                                onClick={() => this.setState({ confirmDeletePermission: true, permissionToDelete: permission})}>
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                          {permission.identityRequirements.map((field, i1) => (
                            <Table.Row key={i1}>
                              <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_identity_fields_required_field')}</Table.Cell>
                              <Table.Cell>{field}</Table.Cell>
                              <Table.Cell></Table.Cell>
                            </Table.Row>
                          ))}
                        </React.Fragment>
                      )}
                    )}
                  </Table.Body>
                </Table>
              </React.Fragment>
            ) : false}

            {(permissions[app.origin] && permissions[app.origin].contractAction.length) ? (
              <React.Fragment>
                <Header
                  content={t('tools_permissions_app_contract')}
                  size="small"
                />
                <Table>
                  <Table.Body>
                    {permissions[app.origin].contractAction.map((permission, i) => {
                      const identity = wapii.identity;
                      const permAccounts = PermissionList.getAccountsUnique(unique, wapii.accounts);
                      return (
                        <React.Fragment key={i}>
                          <Table.Row>
                            <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_contract_identity')}</Table.Cell>
                            <Table.Cell>{identity.publicKey}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_contract_accounts')}</Table.Cell>
                            <Table.Cell>{permAccounts.map((account) => `${account.name}@${account.authority}`).join(', ')}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_contract_contract')}</Table.Cell>
                            <Table.Cell>{permission.contract}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_contract_action')}</Table.Cell>
                            <Table.Cell>{permission.action}</Table.Cell>
                          </Table.Row>
                          {permission.mutableActionFields.map((field, i1) => (
                            <Table.Row key={i1}>
                              <Table.Cell collapsing textAlign="right">{t('tools_permissions_app_contract_mutable_fields')}</Table.Cell>
                              <Table.Cell>{field}</Table.Cell>
                            </Table.Row>
                          ))}
                          <Table.Row>
                            <Table.Cell collapsing textAlign="right"></Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                              <Button
                                content={t('tools_permissions_app_delete')}
                                icon="trash alternate"
                                floated="right"
                                onClick={() => this.setState({ confirmDeletePermission: true, permissionToDelete: permission})}>
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        </React.Fragment>
                      )}
                    )}
                  </Table.Body>
                </Table>
              </React.Fragment>
            ) : false}
          </Segment>
        ))}
        <Confirm
          content={t('tools_permissions_app_delete_modal_all')}
          open={confirmDeleteAll}
          onCancel={() => {
            this.setState({ confirmDeleteAll: false });
          }}
          onConfirm={() => {
            removeApps();
            this.setState({ confirmDeleteAll: false }, () => {
              // this.onSuccess('tools_contacts_success_delete');
            });
          }}
        />
        <Confirm
          content={t('tools_permissions_app_delete_modal_app')}
          open={confirmDeleteApp}
          onCancel={() => {
            this.setState({ confirmDeleteApp: false });
          }}
          onConfirm={() => {
            removePermissionsByOrigin(this.state.appToDelete.origin);
            removeApp(this.state.appToDelete);
            this.setState({ confirmDeleteApp: false, appToDelete: undefined }, () => {
              // this.onSuccess('tools_contacts_success_delete');
            });
          }}
        />
        <Confirm
          content={t('tools_permissions_app_delete_modal_permission')}
          open={confirmDeletePermission}
          onCancel={() => {
            this.setState({ confirmDeletePermission: false });
          }}
          onConfirm={() => {
            removePermission(this.state.permissionToDelete.id);
            this.setState({ confirmDeletePermission: false, permissionToDelete: undefined });
          }}
        />
      </React.Fragment>
    );
  }
}



export default translate('tools')(ToolsPermissionsApp);
