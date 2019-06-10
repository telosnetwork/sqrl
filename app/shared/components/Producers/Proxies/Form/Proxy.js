// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';

import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../../Global/Form/Field/Generic';
import FormMessageError from '../../../Global/Form/Message/Error';
import ProxiesFormProxyConfirming from './Proxy/Confirming';

import ipfs from '../../../../actions/helpers/ipfs';

const formAttributes = ['name', 'website', 'slogan', 'background', 'logo_256', 'twitter'];

class ProxiesFormProposal extends Component<Props> {
  constructor(props) {
    super(props);

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
      reserved_3
    } = props;
    
    this.state = {
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
      updatingRegistration: name && name.length > 0,

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

  uploadLogo =(e) => {
    e.stopPropagation();
    e.preventDefault();

    const logoFile = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(logoFile);
    reader.onloadend = async () => {
      const fileBuffer = await Buffer.from(reader.result);
      this.setState({
        fileBuffer, 
        fileInfo: logoFile
      });
      this.onChange(e, {
        name: 'logo_256', 
        value: logoFile, 
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

      if (!valid) {
        formErrors[name] = `invalid_proposal_${name}`;
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
      name,
      website,
      slogan,
      background,
      logo_256,
      philosophy,
      twitter
    } = this.state;
    const formErrors = errors;
    let submitDisabled = false;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if ((!name || name.length < 5 || name.size > 256) && !submitDisabled) {
      formErrors.name = 'invalid_name';
      submitDisabled = true;
    }

    if ((!website || website.size < 10 || website.size > 256 || !website.startsWith('http')) && !submitDisabled) {
      formErrors.website = 'invalid_website';
      submitDisabled = true;
    }
    if ((!slogan || slogan.size < 10 || slogan.size > 256) && !submitDisabled) {
      formErrors.slogan = 'invalid_slogan';
      submitDisabled = true;
    }
    if ((!philosophy || philosophy.size < 10 || philosophy.size > 256) && !submitDisabled) {
      formErrors.philosophy = 'invalid_philosophy';
      submitDisabled = true;
    }
    if ((!background || background.size < 10 || background.size > 256) && !submitDisabled) {
      formErrors.background = 'invalid_background';
      submitDisabled = true;
    }
    if ((!logo_256 || logo_256.size < 1) && !submitDisabled) {
      formErrors.logo_256 = 'invalid_logo_256';
      submitDisabled = true;
    }
    if ((!twitter || twitter.size < 10 || twitter.size > 256) && !submitDisabled) {
      formErrors.twitter = 'invalid_twitter';
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
      regproxy,
      setregproxyinfo
    } = actions;

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
      updatingRegistration
    } = this.state;
    
    // save logo to IPFS, return its hash#, and submit proxy to chain
    if (!updatingRegistration || this.state.fileBuffer != '') {
      await ipfs(settings.ipfsNode, settings.ipfsPort, settings.ipfsProtocol).add(this.state.fileBuffer, (error, ipfsHash) => {
        if (error) {
          console.log('got error in IPFS..', error)
          this.setState({ ipfsError:error });
        }
        
        // now we can finally add the proxy to the blockchain
        if (ipfsHash) {
          const ipfsLocation = settings.ipfsProtocol + "://" + 
            settings.ipfsNode + "/ipfs/" + ipfsHash[0].hash;
  
          // submit registration
          setregproxyinfo(name, website, slogan, philosophy, background, ipfsLocation, 
            telegram, steemit, twitter, wechat, reserved_1, reserved_2, reserved_3);
          regproxy();
  
          this.setState({
            ipfsHash: ipfsHash[0].hash,
            logo_256: ipfsLocation
          });
        }
  
        this.setState({ipfsing: false});
      });
    } else {
      // submit registration
      setregproxyinfo(name, website, slogan, philosophy, background, logo_256, 
        telegram, steemit, twitter, wechat, reserved_1, reserved_2, reserved_3);
      regproxy();
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
        loading={ipfsing === true || system.SET_REGPROXYINFO === 'PENDING'}
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
                  <p>Registering Proxy: {name}</p>
                </Header>
                }
              <Message
                content="Proxies play an important role in the EOS.IO blockchain by being delegated the responsibility of determining which Block Producers should be in the Top 21. Submitting your information in this form will register you on chain and allow voters to research your proxy and determine whether or not they would like to proxy their votes to you. For users that are trusting you with their votes, it is expected that you vote responsibly!"
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
              {
                (formErrorKeys.length > 0) ? <Divider /> : ''
              }
              <GlobalFormFieldGeneric
                autoFocus
                label="Proxy Name:"
                name="name"
                onChange={this.onChange}
                value={name} 
              />
              <input 
                type = "file"
                onChange = {this.uploadLogo}
                //value="Upload Logo"
              />
              <GlobalFormFieldGeneric
                label="Website:"
                name="website"
                onChange={this.onChange}
                value={website}
              />
              <GlobalFormFieldGeneric
                label="Slogan:"
                name="slogan"
                onChange={this.onChange}
                value={slogan}
              />
              <GlobalFormFieldGeneric
                label="Philosophy:"
                name="philosophy"
                onChange={this.onChange}
                value={philosophy}
              />
              <GlobalFormFieldGeneric
                label="Background:"
                name="background"
                onChange={this.onChange}
                value={background}
              />
              <GlobalFormFieldGeneric
                label="Telegram:"
                name="telegram"
                onChange={this.onChange}
                value={telegram}
              />
              <GlobalFormFieldGeneric
                label="Steemit:"
                name="steemit"
                onChange={this.onChange}
                value={steemit}
              />
              <GlobalFormFieldGeneric
                label="Twitter:"
                name="twitter"
                onChange={this.onChange}
                value={twitter}
              />
              <GlobalFormFieldGeneric
                label="WeChat:"
                name="wechat"
                onChange={this.onChange}
                value={wechat}
              />
              {
                (formErrorKeys.length > 0) ? <Divider /> : ''
              }
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
            <ProxiesFormProxyConfirming
              actions={actions}
              
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

export default translate('producers')(ProxiesFormProposal);
