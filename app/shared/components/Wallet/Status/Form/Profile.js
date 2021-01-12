// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';

import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../../Global/Form/Field/Generic';
import FormMessageError from '../../../Global/Form/Message/Error';
import WalletStatusProfileFormConfirm from './Profile/Confirming';

import ipfs from '../../../../actions/helpers/ipfs';

const formAttributes = ['avatar', 'bio'];

class WalletStatusProfileForm extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      avatar,
      bio
    } = props;
    
    this.state = {
      avatar,
      bio,
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
      confirming: false,
      formErrors: {},
      submitDisabled: true
    };
  }

  uploadAvatar =(e) => {
    e.stopPropagation();
    e.preventDefault();

    const avatar = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(avatar);
    reader.onloadend = async () => {
      const fileBuffer = await Buffer.from(reader.result);
      this.setState({
        fileBuffer, 
        fileInfo: avatar
      });
      this.onChange(e, {
        name: 'avatar', 
        value: avatar, 
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

      let submitDisabled = false;

      ({ formErrors, submitDisabled } = this.errorsInForm(formErrors));

      this.setState({
        formErrors,
        submitDisabled
      });
    });
  }, 200)

  errorsInForm = (errors) => {
    const {
      bio
    } = this.state;
    const formErrors = errors;
    let submitDisabled = false;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if (bio && (bio.length > 256 || bio.length < 2) && !submitDisabled) {
      formErrors.bio = 'invalid_length';
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
      setProfileAvatar
    } = actions;

    const {
      avatar,
      bio
    } = this.state;
    
    // save avatar to IPFS, return its hash#, and submit profile data to chain
    if (bio || this.state.fileBuffer != '') {
      await ipfs(settings.ipfsNode, settings.ipfsPort, settings.ipfsProtocol).add(this.state.fileBuffer, (error, ipfsHash) => {
        if (error) {
          console.log('got error in IPFS..', error)
          this.setState({ ipfsError:error });
        }
        
        // now we can finally add the proxy to the blockchain
        if (ipfsHash) {
          const ipfsLocation = settings.ipfsProtocol + "://" + 
            settings.ipfsNode + "/ipfs/" + ipfsHash[0].hash;
  
          // save to chain
          setProfileAvatar( ipfsLocation, bio );
  
          this.setState({
            ipfsHash: ipfsHash[0].hash,
            avatar: ipfsLocation
          });
        }
  
        this.setState({ipfsing: false});
      });
    }
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
      avatar,
      bio,
      confirming,
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
        loading={ipfsing === true || system.SET_PROFILEAVATAR === 'PENDING'}
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
                  : false
                }
              <Message
                content="Use the form below to update your bio and avatar."
                warning
              />
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
              <GlobalFormFieldGeneric
                autoFocus
                label="Bio:"
                name="bio"
                onChange={this.onChange}
                value={bio} 
              />
              <input 
                type = "file"
                onChange = {this.uploadAvatar}
              />
              <Divider />
              <Button
                onClick={this.onClose}
              >
                <Icon name="x" /> {t('close')}
              </Button>
              <Button
                content="Confirm"
                disabled={submitDisabled}
                floated="right"
                primary
              />
            </Segment>
          ) : ''}
        {(confirming)
          ? (
            <WalletStatusProfileFormConfirm
              actions={actions}
              
              avatar={avatar}
              bio={bio}

              hasError={hasError}
              fileInfo={fileInfo}
              ipfsHash={ipfsHash}
              ipfsError={ipfsError}
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

export default translate('wallet')(WalletStatusProfileForm);
