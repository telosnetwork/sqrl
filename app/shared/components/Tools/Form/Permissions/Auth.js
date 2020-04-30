// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { delete as del, set } from 'dot-prop-immutable';
import { map, values } from 'lodash';

import { Button, Checkbox, Container, Divider, Form, Message, Segment } from 'semantic-ui-react';

import ToolsFormPermissionsAuthWeightedKey from './Auth/WeightedKey';

const defaultAuth = {
  perm_name: '',
  parent: 'active',
  required_auth: {
    threshold: 1,
    keys: [{
      key: '',
      weight: 1
    }],
    accounts: [],
    waits: []
  }
};

class ToolsFormPermissionsAuth extends Component<Props> {
  constructor(props) {
    super(props);
    let { auth } = props;
    const newAuth = !(auth);
    if (!auth || auth.required_auth.keys.length === 0 && auth.required_auth.accounts.length === 0) {
      auth = Object.assign({}, defaultAuth);
    }
    if (!auth || auth.required_auth.keys.length === 0 && auth.required_auth.accounts.length !== 0) {
      auth = Object.assign({}, auth);
      auth.required_auth.keys.push({
        key: '',
        weight: 1
      });
    }
    this.state = Object.assign({}, {
      auth: {
        ...auth.required_auth,
      },
      newAuth,
      original: {
        ...auth.required_auth,
      },
      parent: auth.parent,
      permission: auth.perm_name,
      selectedActions: [],
      validFields: {},
      validForm: false
    });
  }
  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({
        auth: set(this.state.auth, 'keys.0.key', this.props.defaultValue),
      });
    }
    this.validateFields();
  }
  addKey = () => this.setState({
    auth: set(this.state.auth, `keys.${this.state.auth.keys.length}`, { key: '', weight: 1 }),
    validFields: Object.assign({}, this.state.validFields, {
      [`keys.${this.state.auth.keys.length}.key`]: false
    })
  })
  onKeyChange = (e, { name, valid, value }) => {
    this.setState({
      auth: set(this.state.auth, name, value),
      validFields: Object.assign({}, this.state.validFields, { [name]: valid })
    }, () => {
      this.validateFields();
    });
  }
  validateFields = () => {
    const { validFields } = this.state;
    const eachFieldValid = values(validFields);
    this.setState({
      validForm: eachFieldValid.every((isValid) => isValid === true)
    });
  }
  onStringChange = (e, { name, value }) => {
    this.setState({
      [name]: String(value)
    });
  }
  onNumberChange = (e, { name, value }) => {
    this.setState({
      auth: set(this.state.auth, name, parseInt(value, 10))
    });
  }
  onRemoveKey = (e, { name }) => {
    const { [`${name}.key`]: value, ...validFields } = this.state.validFields;
    this.setState({
      auth: del(this.state.auth, name),
      validFields
    });
  }
  toggleAccount = (e, { checked, name }) => {
    const selectedActions = [...this.state.selectedActions];
    const existing = selectedActions.indexOf(name);
    if (checked && existing < 0) {
      selectedActions.push(name);
    } else if (!checked && existing >= 0) {
      selectedActions.splice(existing, 1);
    }
    this.setState({ selectedActions });
  }
  onSubmit = () => {
    const {
      actions,
      settings
    } = this.props;
    const { auth, parent, permission, selectedActions } = this.state;
    if (!settings.authorization) {
      settings.authorization = 'active';
      actions.setSettings('authorization', settings.authorization);
    }
    let authorization = `${settings.account}@${settings.authorization}`;
    actions.updateauth(permission, parent, auth, authorization, selectedActions);
  }
  deleteAuth = (e) => {
    e.preventDefault();

    const {
      actions,
      settings
    } = this.props;
    const { permission, selectedActions } = this.state;
    let authorization = `${settings.account}@${settings.authorization}`;
    actions.deleteauth(authorization, permission, selectedActions);
  }
  render() {
    const {
      contractActions,
      linkAuthHistory,
      pubkey,
      settings,
      t,
      connection
    } = this.props;
    const {
      auth,
      newAuth,
      original,
      parent,
      permission,
      selectedActions,
      validForm
    } = this.state;
    const isCurrentKey = map(original.keys, 'key').includes(pubkey);
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <p>{t('tools_form_permissions_auth_instructions')}</p>
        {(settings.advancedPermissions || newAuth)
          ? (
            <Form.Input
              defaultValue={permission}
              label={t('tools_form_permissions_auth_permission')}
              name="permission"
              onChange={this.onStringChange}
            />
          )
          : false
        }
        {(settings.advancedPermissions || newAuth)
          ? (
            <Form.Input
              defaultValue={parent}
              label={t('tools_form_permissions_auth_parent')}
              name="parent"
              onChange={this.onStringChange}
            />
          )
          : false
        }
        {(settings.advancedPermissions)
          ? (
            <Form.Input
              defaultValue={auth.threshold}
              label={t('tools_form_permissions_auth_threshold')}
              name="threshold"
              onChange={this.onNumberChange}
            />
          )
          : false
        }
        {auth.keys.map((keyAuths, index) => (
          <ToolsFormPermissionsAuthWeightedKey
            auth={auth}
            key={JSON.stringify(keyAuths)}
            keyAuths={keyAuths}
            index={index}
            onNumberChange={this.onNumberChange}
            onKeyChange={this.onKeyChange}
            onRemoveKey={this.onRemoveKey}
            settings={settings}
            connection={connection}
          />
        ))}
        <Segment stacked color="blue">
          {t('tools_form_permissions_auth_linkauth')}
          <Divider />
          {(contractActions && contractActions.map((action) => {
              return (
                <p>
                  <Checkbox
                    label={action.text}
                    name={action.value}
                    onChange={this.toggleAccount}
                    checked={linkAuthHistory.filter( auth => {
                      return auth.requirement == permission && auth.type == action.text}).length > 0
                    || selectedActions.indexOf(action.value) !== -1}
                  />
                </p>
              );
            })
          )}
        </Segment>
        {(settings.advancedPermissions)
          ? (
            <Button
              content={t('tools_form_permissions_auth_add_key')}
              color="green"
              icon="circle plus"
              floated="right"
              onClick={this.addKey}
            />
          )
          : false
        }
        {(isCurrentKey)
          ? (
            <Message
              content={t('tools_form_permissions_auth_current_key_content')}
              header={t('tools_form_permissions_auth_current_key_header')}
              icon="exclamation circle"
              negative
            />
          )
          : false
        }
        <Message
          content={t('tools_permissions_warning_content')}
          header={t('tools_permissions_warning_header')}
          icon="warning sign"
          color="orange"
        />
        <Container textAlign="right">
        {(settings.advancedPermissions)
          ? (
            <Button
            content={t('Delete Permission')}
            disabled={!validForm || !isCurrentKey}
            onClick={this.deleteAuth}
          />):false }
          <Button
            content={t('tools_form_permissions_auth_submit')}
            disabled={!validForm}
            primary
          />
        </Container>
      </Form>
    );
  }
}


export default translate('tools')(ToolsFormPermissionsAuth);
