// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Form, Grid, Message, Header } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import FormMessageError from '../../../../Global/Form/Message/Error';

class WalletPanelFormBuyFiatAccount extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      error,
      isAccountValid,
      onBack,
      onChange,
      shouldShowAccountNameWarning,
      shouldShowChainWarning,
      t,
      values
    } = this.props;
    return (
      <Form
        warning={shouldShowAccountNameWarning}
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_buytoken_request_step_2_header')}
          <Header.Subheader>
            {t('wallet_buytoken_request_step_2_subheader')}
          </Header.Subheader>
        </Header>
        <GlobalFormFieldAccount
          autofocus
          label={t('wallet_buytoken_request_accountname')}
          name="accountName"
          onChange={debounce(onChange, 300)}
          value={values.accountName}
        />
        <FormMessageError
          error={error}
          icon="warning sign"
          style={{ margin: '1em 0' }}
        />
        {(shouldShowAccountNameWarning)
          ? (
            <Message
              content={t('wallet_buytoken_request_accountname_warning')}
              icon="info circle"
              info
            />
          ) : ''}

        {(shouldShowChainWarning)
          ? (
            <Message
              content={t('wallet_buytoken_request_accountname_chain_warning')}
              icon="exclamation circle"
              negative
            />
          ) : ''}

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Form.Button
                content={t('back')}
                onClick={onBack}
                size="small"
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Form.Button
                color="blue"
                content={t('next')}
                disabled={!isAccountValid}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormBuyFiatAccount);
