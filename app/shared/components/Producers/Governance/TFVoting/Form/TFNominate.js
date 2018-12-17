// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
const CryptoJS = require('crypto-js');

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GovernanceTFNominatingFormTFNominatingConfirming from './TFVoting/Nominating';

const formAttributes = ['nominee'];

class GovernanceTFNominateFormTFNominate extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirming: false,
      fileBuffer:'',
      fileInfo: '',
      ipfsHash:null,
      ipfsing: false,
      ipfsError: {
        address:'',
        code:'',
        errno:'',
        port: 0,
        syscall:'',
        message:''
      },
      nominee: '',
      formErrors: {},
      submitDisabled: true
    };
  }

  onSubmit = (e) => {
    if (!this.state.submitDisabled) {
      this.setState({
        confirming: true,
        ipfsing: false,
        ipfsError: {
          address:'',
          code:'',
          errno:'',
          port: 0,
          syscall:'',
          message:''
        }
      });
    }
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  onChange = debounce((e, { name, value, valid=true }) => {
    this.setState({
      submitDisabled: false,
      [name]: value
    }, () => {
      let {
        formErrors
      } = this.state;

      const {
        nominee
      } = this.state;

      const {
        actions
      } = this.props;

      const {
        checkAccountAvailability
      } = actions;

      if (name === 'nominee' && nominee.length !== 0) {
        checkAccountAvailability(nominee);
      }

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_nominee_${name}`;
      } else {
        formErrors[name] = null;
      }

      ({ formErrors, submitDisabled } = this.errorsInForm(formErrors));

      this.setState({
        formErrors,
        submitDisabled
      });
    });
  }, 200)

  errorsInForm = (errors) => {
    const {
      nominee
    } = this.state;
    const formErrors = errors;
    let submitDisabled = false;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    return { formErrors, submitDisabled };
  }

  onConfirm = async () => {
    this.setState({      
      ipfsing: true,
      ipfsError: {
        address:'',
        code:'',
        errno:'',
        port: 0,
        syscall:'',
        message:''
      }
    });

    const {
      actions
    } = this.props;

    const {
      nominateBoardMember
    } = actions;

    const {
      nominee
    } = this.state;
    
    // submit WP
    nominateBoardMember(nominee);
  }

  onBack = (e) => {
    this.setState({
      confirming: false,
      ipfsing: false
    });
    e.preventDefault();
    return false;
  }

  onClose = (e) => {
    this.setState({
      confirming: false,
      ipfsing: false,
      fileInfo: ''
    });

    this.props.onClose();
  }

  render() {
    const {
      actions,
      settings,
      system,
      t,
      tfvoting,
      validate,
      wallet
    } = this.props;

    const {
      confirming,
      nominee,
      formErrors,
      ipfsing,
      ipfsError,
      ipfsHash
    } = this.state;
    let {
      submitDisabled
    } = this.state;

    if (nominee &&
      nominee.length !== 0 &&
      system.ACCOUNT_AVAILABLE === 'SUCCESS' &&
      system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === nominee) {
      formErrors.nominee = 'producers_form_tfvt_not_exists';
      submitDisabled = true;
    }

    if (system.ACCOUNT_AVAILABLE === 'SUCCESS' && !submitDisabled) { // account doesn't exist!
      submitDisabled = true;
    }

    let nomineeAccount = {};
    if (tfvoting && tfvoting.tfvtnominees) {
      nomineeAccount = tfvoting.tfvtnominees.filter((a) => a.nominee === nominee)[0]; 
      if (!nomineeAccount)
      nomineeAccount = {};
    }
    const isNominee = nomineeAccount.nominee && nomineeAccount.nominee.length > 0;
    if (isNominee) {
      formErrors.nominee = 'producers_form_tfvt_is_nominee';
      submitDisabled = true;
    }

    let boardMember = {};
    if (tfvoting && tfvoting.tfvtboardmembers) {
      boardMember = tfvoting.tfvtboardmembers.filter((a) => a.member === nominee)[0]; 
      if (!boardMember)
      boardMember = {};
    }
    const isBoardMember = boardMember.member && boardMember.member.length > 0;
    if (isBoardMember) {
      formErrors.nominee = 'producers_form_tfvt_is_board';
      submitDisabled = true;
    }

    const formErrorKeys = Object.keys(formErrors);
    const hasError = ipfsError.message && ipfsError.message.length > 0;
    return (
      <Form
        warning
        loading={ipfsing === true || system.GOVERNANCE_NOMINATEBOARDMEMBER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(!confirming && !ipfsing) ? (
            <Segment basic clearing>
                {(hasError === true)
                  ? (
                    <Message
                    color="red"
                    header={ipfsError.message}
                    icon="x"
                    />
                  )
                  : <Header
                    attached="top"
                    color="black"
                    block
                    size="huge"
                  >
                  Nominate Board Member
                  <Header.Subheader>
                  
                  </Header.Subheader>
                </Header>
                }
              <Message
                content="As an open blockchain network, we allow anyone to be nominated to the Telos Foundation Board. 
                If you would like to nominate someone who you believe can make a positive impact on the future of Telos, 
                please use the form below to submit this nomination."
                warning
              />
              <GlobalFormFieldAccount
                autoFocus
                contacts={settings.contacts}
                label="Nominee:"
                name="nominee"
                onChange={this.onChange}
                value={nominee}
              />
              <Divider />
              <FormMessageError
                errors={
                  formErrorKeys.length > 0 && formErrorKeys.reduce((errors, key) => {
                    const error = this.state.formErrors[key];
                    if (error) {
                      errors.push(error);
                    }
                    return errors;
                  }, [])
                }
                icon="warning sign"
                style={{ marginBottom: 10 }}
              />
              <Button
                onClick={this.onClose}
              >
                <Icon name="x" /> {t('close')}
              </Button>
              <Button
                content={t('producers_form_proxy_confirm')}
                disabled={submitDisabled}
                floated="right"
                primary
              />
            </Segment>
          ) : ''}
        {(confirming)
          ? (
            <GovernanceTFNominatingFormTFNominatingConfirming
              actions={actions}
              nominee={nominee}
              onBack={this.onBack}
              onClose={this.onClose}
              onConfirm={this.onConfirm}
              settings={settings}
              system={system}
              tfvoting={tfvoting}
              validate={validate}
              wallet={wallet}
            />
          ) : ''
        }
      </Form>
    );
  }
}

export default translate('producers')(GovernanceTFNominateFormTFNominate);
