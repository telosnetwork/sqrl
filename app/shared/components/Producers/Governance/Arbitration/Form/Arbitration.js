// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
const CryptoJS = require('crypto-js');

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GovernanceArbitrationFormArbitrationConfirming from './Arbitration/Confirming';

import ipfs from '../../../../../actions/helpers/ipfs';

const formAttributes = ['creds_ipfs_url'];

class GovernanceArbitrationFormArbitration extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      creds_ipfs_url
    } = props;
    
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
      creds_ipfs_url,
      formErrors: {},
      submitDisabled: true
    };
  }

  uploadCreds =(e) => {
    e.stopPropagation();
    e.preventDefault();

    const credsFile = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(credsFile);
    reader.onloadend = async () => {
      const fileBuffer = await Buffer.from(reader.result);
      this.setState({
        fileBuffer, 
        fileInfo: credsFile
      });
      this.onChange(e, {
        name: 'creds_ipfs_url', 
        value: credsFile, 
        valid: true});
    };
  };

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
        actions
      } = this.props;

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_arbitration_${name}`;
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
      creds_ipfs_url
    } = this.state;
    const formErrors = errors;
    let submitDisabled = false;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if ((!creds_ipfs_url || creds_ipfs_url.size < 1) && !submitDisabled) {
      formErrors.creds_ipfs_url = 'invalid_arbitration_creds_ipfs_url';
      submitDisabled = true;
    }

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
      actions,
      settings
    } = this.props;

    const {
      registerCandidate
    } = actions;

    // save proposal to IPFS, return its hash#, and submit contract to chain
    await ipfs(settings.ipfsNode, settings.ipfsPort, settings.ipfsProtocol).add(this.state.fileBuffer, (error, ipfsHash) => {
      if (error) {
        console.log('IPFS error occurred...', error)
        this.setState({ ipfsError:error });
      }

      // now we can finally add the proposal to the blockchain
      if (ipfsHash) {
        const hashPath = "/ipfs/" + ipfsHash[0].hash + "/";
        const ipfsLocation = settings.ipfsProtocol + "://" + settings.ipfsNode + hashPath;

        // submit candidate
        registerCandidate(settings.account, hashPath);

        this.setState({
          ipfsHash: hashPath,
          creds_ipfs_url: ipfsLocation
        });
      }

      this.setState({ipfsing: false});
    });
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
      validate,
      wallet
    } = this.props;

    const {
      confirming,
      creds_ipfs_url,
      fileInfo,
      formErrors,
      ipfsing,
      ipfsError,
      ipfsHash
    } = this.state;
    let {
      submitDisabled
    } = this.state;

    const formErrorKeys = Object.keys(formErrors);
    const hasError = ipfsError.message && ipfsError.message.length > 0;
    return (
      <Form
        warning
        loading={ipfsing === true || system.GOVERNANCE_REGCANDIDATE === 'PENDING'}
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
                  File {settings.account}'s Arbitration Application
                  <Header.Subheader>
                    
                  </Header.Subheader>
                </Header>
                }
              <Message
                content="Register your account to be an on-chain arbitrator candidate using this form. Simply upload your credentials to share with voters and we will attempt to register your candidacy for any open arbitration seat."
                warning
              />
              <input 
                type = "file"
                onChange = {this.uploadCreds}
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
            <GovernanceArbitrationFormArbitrationConfirming
              actions={actions}
              creds_ipfs_url={creds_ipfs_url}
              fileInfo={fileInfo}
              ipfsHash={ipfsHash}
              onBack={this.onBack}
              onClose={this.onClose}
              onConfirm={this.onConfirm}
              settings={settings}
              system={system}
              validate={validate}
              wallet={wallet}
            />
          ) : ''
        }
      </Form>
    );
  }
}

export default translate('producers')(GovernanceArbitrationFormArbitration);
