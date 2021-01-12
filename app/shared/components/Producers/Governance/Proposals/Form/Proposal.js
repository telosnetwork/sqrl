// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Input, Label, Segment, Select, Step, Table, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import Moment from 'react-moment';
import { Decimal } from 'decimal.js';
const CryptoJS = require('crypto-js');

import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import GlobalFormFieldTextArea from '../../../../Global/Form/Field/TextArea';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GovernanceProposalsFormProposalConfirming from './Proposal/Confirming';

import ipfs from '../../../../../actions/helpers/ipfs';

const formAttributes = ['title', 'description', 'content', 'proposal_name', 'category', 'total_requested', 'milestones'];

class GovernanceProposalsFormProposal extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      category,
      content,
      description,
      editing,
      milestones,
      proposal_name,
      title,
      total_requested,
      settings
    } = props;

    let totalRequested = 0;
    let existingMilestones = [];
    if (editing) {
      totalRequested = total_requested.split(' ')[0];
      for (let m = 0; m < milestones.length; m++){
        var date = new Date();
        date.setDate(date.getDate() + (29 * (m+1)));
        
        var requested = milestones[m].requested.split(' ')[0];
        existingMilestones[m] = {
          number: milestones[m].milestone_id,
          days: date,
          amount: parseFloat(requested).toFixed(settings.tokenPrecision)
        }
      }
    }

    this.state = {
      category,
      confirming: false,
      content,
      description,
      editing,
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
      milestones: existingMilestones || [],
      proposal_name,
      stage: editing == true? 3 : 1,
      title,
      total_requested: totalRequested,
      formErrors: {},
      submitDisabled: true
    };
  }

  uploadWorkerProposal =(e) => {
    e.stopPropagation();
    e.preventDefault();

    const proposalFile = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(proposalFile);
    reader.onloadend = async () => {
      const fileBuffer = await Buffer.from(reader.result);
      this.setState({
        fileBuffer, 
        fileInfo: proposalFile
      });
      this.onChange(e, {
        name: 'content', 
        value: proposalFile, 
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
    //e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    const {
      stage,
      submitDisabled
    } = this.state;
    if (e.key === 'Enter') {

      if (stage !== 3 && !submitDisabled)
        this.onStageSelect(stage+1);

      e.preventDefault();
      return false;
    }
  }

  onMilestoneChange = (e) => {
    const {
      milestones
    } = this.state;
    const {
      settings
    } = this.props;

    let existingMilestones = [...milestones];

    //const amount = e.target.value.indexOf('TLOS') ? e.target.value.split(' ')[0] : e.target.value;
    const index = parseInt(e.target.name - 1);
    const milestone = milestones[index];
    existingMilestones[index] = {
      number: milestone.number,
      days: milestone.days,
      amount: parseFloat(e.target.value).toFixed(settings.tokenPrecision)
    };
    this.setState({
      milestones: existingMilestones
    });

    this.setState({
      submitDisabled: false
    }, () => {
      let {
        formErrors
      } = this.state;

      let submitDisabled = false;
      formErrors['milestones'] = null;

      ({ formErrors, submitDisabled } = this.errorsInForm(formErrors));

      this.setState({
        formErrors,
        submitDisabled
      });
    });
  }

  onChange = (e, { name, value, valid=true }) => {
    const {
      total_requested
    } = this.state;
    const {
      settings
    } = this.props;

    let computedMilestones = [];
    if (name == 'milestones') {
      for (let m = 0; m < value; m++){
        var date = new Date();
        date.setDate(date.getDate() + (29 * (m+1)));
        
        computedMilestones[m] = {
          number: m+1,
          days: date,
          amount: parseFloat(total_requested / value).toFixed(settings.tokenPrecision)
        }
      }
      this.setState({
        milestones: computedMilestones
      });
    } else {
      this.setState({ [name]: value });
    }

    this.setState({
      submitDisabled: false
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
  }
  
  errorsInForm = (errors) => {
    const {
      category,
      content,
      description,
      milestones,
      proposal_name,
      stage,
      title,
      total_requested
    } = this.state;
    const {
      proposals,
      settings
    } = this.props;
    const { proposal_id } = this.props;
    const formErrors = errors;
    let submitDisabled = false;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if ((!title || title.length < 10 || title.size > 256) && !submitDisabled && stage === 1) {
      formErrors.title = 'invalid_proposal_title';
      submitDisabled = true;
    }

    if ((!description || description.length < 10 || description.size > 256) && !submitDisabled && stage === 1) {
      formErrors.title = 'invalid_proposal_description';
      submitDisabled = true;
    }

    if ((!category || category.size < 1) && !submitDisabled && stage === 1) {
      formErrors.content = 'invalid_proposal_category';
      submitDisabled = true;
    }

    if ((!content || content.size < 1) && !submitDisabled && stage === 2) {
      formErrors.content = 'invalid_proposal_content';
      submitDisabled = true;
    }

    const minAmount = parseFloat(proposals.wpsconfig.min_requested.split(' ')[0]);
    const maxAmount = parseFloat(proposals.wpsconfig.max_requested.split(' ')[0]);
    if ((Number(total_requested) < 1 || isNaN(total_requested) || 
      total_requested < minAmount || total_requested > maxAmount) && !submitDisabled && stage === 3) {
      formErrors.total_requested = 'invalid_proposal_amount';
      submitDisabled = true;
    }

    if ((!milestones || milestones.length < 1 
      || milestones.length < proposals.wpsconfig.min_milestones
      || milestones.length > proposals.wpsconfig.max_milestones) && !submitDisabled && !proposal_id && stage === 3) {
      formErrors.milestones = 'invalid_proposal_milestones';
      submitDisabled = true;
    } else if (milestones.length > 1 && !proposal_id && stage === 3) {
      let milestonesTotal = 0;
      milestones.map((milestone) => {
        milestonesTotal += parseFloat(milestone.amount);
      });
      if (Decimal(milestonesTotal.toFixed(settings.tokenPrecision)).equals(total_requested) == false) {
        formErrors.milestones = 'invalid_proposal_milestones_amount';
        submitDisabled = true;
      }
    }

    return { formErrors, submitDisabled };
  }

  onStageSelect = (stage) => {
    this.setState({ stage, submitDisabled: true });
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
      addWorksMilestones,
      createWorksProposal,
      editWorksMilestones
    } = actions;

    const {
      category,
      content,
      description,
      editing,
      milestones,
      proposal_name,
      title,
      total_requested
    } = this.state;
    
    // save proposal to IPFS, return its hash#, and submit contract to chain
    let amountFormatted = parseFloat(total_requested).toFixed(settings.tokenPrecision);
    if (editing) {
        // submit WP
        editWorksMilestones(proposal_name, milestones);
        
      this.setState({
        ipfsHash: content
      });
      this.setState({ipfsing: false});
    } else {
      await ipfs(settings.ipfsNode, settings.ipfsPort, settings.ipfsProtocol).add(this.state.fileBuffer, (error, ipfsHash) => {
        if (error) {
          console.log('IPFS error occurred...', error)
          this.setState({ ipfsError:error });
        }
        
        // now we can finally add the proposal to the blockchain
        if (ipfsHash) {
          const hashPath = "/ipfs/" + ipfsHash[0].hash + "/";
          const ipfsLocation = settings.ipfsProtocol + "://" + settings.ipfsNode + hashPath;
          
          // submit WP
          var prop_name = this.getUniqueProposalName(); 
          (async () => {
            await createWorksProposal(title, description, ipfsLocation, prop_name, 
              category, amountFormatted, milestones.length);
            editWorksMilestones(prop_name, milestones);
          })();
  
          this.setState({
            ipfsHash: hashPath,
            content: ipfsLocation
          });
        }
  
        this.setState({ipfsing: false});
      });
    }
  }

  getUniqueProposalName() {
    const {
      proposals
    } = this.props;
    
    var unique = false;
    var prop_name;

    while (!unique) {
      var randomChars = 'abcdefghijklmnopqrstuvwxyz12345';
      prop_name = '';
      for ( var i = 0; i < 12; i++ ) {
        prop_name += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      prop_name = prop_name.toLowerCase();

      const name = proposals.submissions.filter((s)=>s.proposal_name==prop_name);
      if (!name || name.length < 1) unique = true;
    }
    return prop_name;
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
      proposal_id,
      proposals,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    const {
      category,
      content,
      confirming,
      description,
      editing,
      fileInfo,
      formErrors,
      ipfsing,
      ipfsError,
      ipfsHash,
      milestones,
      proposal_name,
      stage,
      title,
      total_requested
    } = this.state;
    let {
      submitDisabled
    } = this.state;

    const amountLabel = "Requested Amount (Min/Max: " + 
      proposals.wpsconfig.min_requested + "/" + proposals.wpsconfig.max_requested + ")";
    const milestonesLabel = t('proposal_label_milestones') + " (Min/Max: " + 
      proposals.wpsconfig.min_milestones + "/" + proposals.wpsconfig.max_milestones + ")";

    const formErrorKeys = Object.keys(formErrors);
    const hasError = ipfsError.message && ipfsError.message.length > 0;

    const feePercent = parseFloat(proposals.wpsconfig.fee_percent).toFixed(settings.tokenPrecision);
    const feeMin = parseFloat(proposals.wpsconfig.min_fee.split(' ')[0]);
    const minYesRefundThreshold = parseFloat(proposals.wpsconfig.yes_refund_threshold).toFixed(settings.tokenPrecision) + '%';
    let feeAmount = parseFloat(total_requested * feePercent / 100);
    if (feeAmount < feeMin || isNaN(feeAmount))
      feeAmount = feeMin;

    const categoryOptions = [
        {
          key: 'apps',
          text: 'Apps - applications being built on Telos.',
          value: 'apps',
        },
        {
          key: 'developers',
          text: 'Development - tools, libraries, modules, etc.',
          value: 'developers',
        },
        {
          key: 'education',
          text: 'Education - tutorials, guides, workshops, etc',
          value: 'education',
        },
        {
          key: 'marketing',
          text: 'Marketing - audio, video, articles, etc',
          value: 'marketing',
        }
      ];

    let confirmText = 'Next';
    if (stage === 3)
      confirmText = 'Confirm';

    return (
      <Form
        warning
        loading={ipfsing === true || 
          system.GOVERNANCE_CREATEWORKSPROPOSAL === 'PENDING' ||
          system.GOVERNANCE_EDITWORKSMILESTONE === 'PENDING'}
        onKeyPress={this.onKeyPress}
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
                    color="red"
                    block
                    size="medium"
                  >
                  {title}
                  <Header.Subheader>
                    {t('proposal_header_instructions', {tokenSymbol:settings.blockchain.tokenSymbol,feePercent:feePercent,feeMin:feeMin,feeAmount: feeAmount.toFixed(settings.tokenPrecision)})}
                  </Header.Subheader>
                  <Header.Content>
                    {t('proposal_header_instructions_fee', {minYesRefundThreshold:minYesRefundThreshold})}
                  </Header.Content>
                </Header>
                }
              <Step.Group fluid>
                <Step active={stage === 1} completed={stage > 1}>
                  <Icon name="info circle" />
                  <Step.Content>
                    <Step.Title>{t('proposal_step_1_title')}</Step.Title>
                    <Step.Description>{t('proposal_step_1_desc')}</Step.Description>
                  </Step.Content>
                </Step>
                <Step active={stage === 2} completed={stage > 2}>
                  <Icon name="file pdf outline" />
                  <Step.Content>
                    <Step.Title>{t('proposal_step_2_title')}</Step.Title>
                    <Step.Description>{t('proposal_step_2_desc')}</Step.Description>
                  </Step.Content>
                </Step>
                <Step active={stage === 3} completed={stage > 3}>
                  <Icon name="dollar" />
                  <Step.Content>
                    <Step.Title>{t('proposal_step_3_title')}</Step.Title>
                    <Step.Description>{t('proposal_step_3_desc')}</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>

              {(stage === 1) ?
              <GlobalFormFieldGeneric
                autoFocus
                label={t('proposal_label_title')}
                name="title"
                onChange={this.onChange}
                style={{marginTop:'10px'}}
                value={title} 
              />
              :''}
              {(stage === 1) ?
              <GlobalFormFieldTextArea
                label={t('proposal_label_description')}
                name="description"
                onChange={this.onChange}
                value={description} 
              />
              :''}
              {(stage === 1) ?
              <Select
                placeholder={t('proposal_label_category')}
                name="category"
                onChange={(e, { value }) => this.onChange(e,{ name:'category', value })}
                options={categoryOptions}
                selection
                defaultValue={category}
              />
              :''}
              {(stage === 2) ?
              <Message
                header={t('proposal_step_2_note')}
                size="tiny"
              />:''}
              {(stage === 2) ?
              <input 
                type = "file"
                onChange = {this.uploadWorkerProposal}
              />
              :''}
              {(stage === 3) ?
              <Message
                header={t('proposal_step_3_note')}
                size="tiny"
              />:''}
              {(stage === 3) ?
              <GlobalFormFieldGeneric
                label={amountLabel}
                name="total_requested"
                onChange={this.onChange}
                value={total_requested}
                width={6}
              />
              :''}
              {(stage === 3) ?
              <GlobalFormFieldGeneric
              label={milestonesLabel}
                name="milestones"
                onChange={this.onChange}
                value={milestones.length}
              />
              :''}
              {(stage === 3) ?
              <Table columns={3}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Milestone #
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Approx. Closing Date
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Funding Amount
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {milestones.map((milestone) => {
                    return (
                      <Table.Row>
                          <Table.Cell collapsing>
                            {milestone.number}
                          </Table.Cell>
                          <Table.Cell collapsing>
                            <Moment>{milestone.days}</Moment>
                          </Table.Cell>
                          <Table.Cell>
                            <Input labelPosition='right' type='text' placeholder='Amount' style={{width:'150px'}}>
                              <input defaultValue={parseFloat(milestone.amount).toFixed(settings.tokenPrecision)}
                                name={milestone.number}
                                onChange={(e)=>this.onMilestoneChange(e)}/>
                              <Label basic>{settings.blockchain.tokenSymbol}</Label>
                            </Input>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
              :''}
              <Divider />
              <FormMessageError
                style={{ marginBottom: 10 }}
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
              {(stage === 3) ?
              <Button
                content={confirmText}
                floated="right"
                disabled={submitDisabled}
                onClick={()=>this.onSubmit()}
                primary
              />:<Button
              content={confirmText}
              disabled={submitDisabled}
              onClick={()=>this.onStageSelect(stage+1)}
              floated="right"
              primary
            />}
            {(stage === 2 || stage === 3) ?
              <Button
                content={'Previous'}
                disabled={editing}
                onClick={()=>this.onStageSelect(stage-1)}
                floated="right"
                primary
              />:''}
            </Segment>
          ) : ''}
        {(confirming)
          ? (
            <GovernanceProposalsFormProposalConfirming
              actions={actions}
              category={category}
              content={content}
              description={description}
              editing={editing}
              fileInfo={fileInfo}
              ipfsHash={ipfsHash}
              milestones={milestones}
              onBack={this.onBack}
              onClose={this.onClose}
              onConfirm={this.onConfirm}
              proposal_id={proposal_id}
              proposal_name={proposal_name}
              settings={settings}
              system={system}
              title={title}
              total_requested={parseFloat(total_requested).toFixed(settings.tokenPrecision)}
              validate={validate}
              wallet={wallet}
            />
          ) : ''
        }
      </Form>
    );
  }
}

export default translate('global')(GovernanceProposalsFormProposal);
