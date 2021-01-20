// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Table, Image, Card, Button, Icon, Label, Segment, Header, Checkbox, Modal, Popup } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';
import { Decimal } from 'decimal.js';
import NumberFormat from 'react-number-format';
import eos from '../../../actions/helpers/eos';
import Moment from 'react-moment';

import GlobalDataBytes from '../../Global/Data/Bytes';
import GlobalFormFieldMemo from '../../Global/Form/Field/Memo';
import FormFieldMultiToken from '../../Global/Form/Field/MultiToken';
import { now } from 'moment';

class WalletStatusTBonds extends Component<Props> {
  constructor(props) {
    super(props);
    
    this.state = {
        page: 1,
        limit: 10,
        order: "desc",
        sort: "asset_id",

        showOnlyOwned: false,
        showOnlyMatured: false,
        currentPBTCBalance: 0,
        withdrawDestAddr: '',
        openDetailsModal: false,
        openBTCModal: false,
        currentBond: {},
        sellSymbol: 'PBTC',
        quantity: '0.0000 PBTC',
    }
}

toggleBTCModal = () => {
  this.setState((prevState) => ({
    openBTCModal : !prevState.openBTCModal
  }));
}

hideDetailsModal = () => {
  this.setState({
    openDetailsModal : false,
    currentBond: {}
  });
}

showDetailsModal = (serial, owned) => {
  const {
    globals
  } = this.props;
  let bond = globals.tbonds && globals.tbonds.filter(a=>a.serial == serial);
  if (owned) bond = globals.tbondsowned && globals.tbondsowned.filter(a=>a.serial == serial);
  if (bond) {
    this.setState({
      openDetailsModal : true,
      currentBond: bond[0]
    });
  }
}

handleShowOnlyMatured = () => {
  this.setState((prevState) => ({
    showOnlyMatured : !prevState.showOnlyMatured
  }));
}

handleShowOnlyOwned = () => {
  this.setState((prevState) => ({
    showOnlyOwned : !prevState.showOnlyOwned
  }));
}

onChange = (e, { name, value, valid }) => {
  console.log('name,value', name, value);

  const newState = { [name]: value };
  if (name === 'quantity') {
    const [quantity, asset] = value.split(' ');
    newState.sellSymbol = asset;
  }

  this.setState(newState);
}

getPBTCBalance = async () => {
  const {
    connection,
    settings
  } = this.props;

  let pBTCBalance = await eos(connection).getCurrencyBalance("btc.ptokens", settings.account, "PBTC");
  if (pBTCBalance[0]) {
    this.setState({
      currentPBTCBalance : pBTCBalance[0].split(' ')[0]
    });
  }
}

withdrawPBTC = (withdrawDestAddr) => {
  this.props.actions.withdrawPBTC(Decimal(this.state.currentPBTCBalance).toFixed(8), withdrawDestAddr);
}
buyTBond = (serial, amount) => {
  this.props.actions.buyTBond(serial, amount);
}
sellTBond = (serial, amount) => {
  //this.props.actions.sellTBond(serial, amount);
  console.log('serial, amount', serial, amount)
}
releaseTBond = (serial) => {
  this.props.actions.releaseTBond(serial);
}

componentDidMount() {
    this.getPBTCBalance();
    this.props.actions.getTBondsForSale();
    this.props.actions.getTBondsByOwner();

    this.tick();
    this.interval = setInterval(this.tick.bind(this), 45000);
}

tick() {
  this.getPBTCBalance();
  //this.props.actions.getTBondsForSale();
}

render() {
    const {
      balances,
      connection,
      globals,
      settings,
      system 
    } = this.props;

    const balance = balances[settings.account];

    if (globals.tbonds && globals.tbonds.length === 0) {
        return <div>No T-Bonds Found in Market</div>
    }
    let tbonds = globals.tbonds && globals.tbonds.map((tbond) => {
      let bond = tbond;

      const bondInfo = globals.tbondsBondInfo[tbond.serial] && globals.tbondsBondInfo[tbond.serial][0];
      if (bondInfo) {
        bond.backed_amount = bondInfo.backed_amount;
        bond.locked = bondInfo.locked;
        bond.release_event = bondInfo.release_event;
      }
      
      const eventInfo = globals.tbondsEventInfo[tbond.serial] && globals.tbondsEventInfo[tbond.serial][0];
      if (eventInfo) {
        bond.event_name = eventInfo.event_name;
        bond.event_time = eventInfo.event_time;
        bond.expired = (new Date(eventInfo.event_time) < now());
        bond.matured_text = bond.expired ? "Matured" : "Matures";
      }

      const tagInfo = globals.tbondsTagInfo && globals.tbondsTagInfo[tbond.serial];
      if (tagInfo) {
        const tagImage = tagInfo.filter(t=>t.tag_name=='image')[0];
        const tagTitle = tagInfo.filter(t=>t.tag_name=='title')[0];
        bond.title = tagTitle && tagTitle.content;
        bond.image_url = (tagImage && tagImage.content) || 'https://sqrlwallet.io/wp-content/uploads/2021/01/tbond-front.jpeg';
      }
      return bond;
    });

    let tbondsOwned = globals.tbondsowned && globals.tbondsowned.filter(t=>t.owner==settings.account).map((tbond) => {
      let bond = tbond;

      const bondInfo = globals.tbondsBondInfo[tbond.serial] && globals.tbondsBondInfo[tbond.serial][0];
      if (bondInfo) {
        bond.backed_amount = bondInfo.backed_amount;
        bond.locked = bondInfo.locked;
        bond.release_event = bondInfo.release_event;
      }
      
      const eventInfo = globals.tbondsEventInfo[tbond.serial] && globals.tbondsEventInfo[tbond.serial][0];
      if (eventInfo) {
        bond.event_name = eventInfo.event_name;
        bond.event_time = eventInfo.event_time;
        bond.expired = (new Date(eventInfo.event_time) < now());
        bond.matured_text = bond.expired ? "Matured" : "Matures";
      }

      const tagInfo = globals.tbondsTagInfo && globals.tbondsTagInfo[tbond.serial];
      if (tagInfo) {
        const tagImage = tagInfo.filter(t=>t.tag_name=='image')[0];
        const tagTitle = tagInfo.filter(t=>t.tag_name=='title')[0];
        bond.title = tagTitle && tagTitle.content;
        bond.image_url = (tagImage && tagImage.content) || 'https://sqrlwallet.io/wp-content/uploads/2021/01/tbond-front.jpeg';
        bond.owned = true;
      }

      return bond;
    });

    if (this.state.showOnlyMatured) {
      tbondsOwned = tbondsOwned.filter(t=>t.expired == true);
      tbonds = tbonds.filter(t=>t.expired == true);
    }

    const TBonds = tbonds && tbonds.map((bond) => (
      <Card key={`tbond-${bond.serial}`} style={{width:'28%'}}>
          <Card.Content>
            <Image 
              src={bond.image_url} 
              style={{marginBottom:'15px', width:'150px', height:'150px'}} />
            <Card.Header>{bond.title}</Card.Header>
            <Card.Meta>
              <div>{bond.owner}</div>
              <div><strong>{bond.price}</strong></div>
            </Card.Meta>
            <Card.Description>
              {bond.matured_text} <Moment fromNow>{bond.event_time}</Moment>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {bond.expired ?
            <Popup content="This T-Bond's maturity date has expired. Tokens can be released" trigger={<Icon floated="left" color="blue" name="hourglass end" size="big" />} />
            :<Popup content="Maturity date has not yet expired. Tokens are locked until then" trigger={<Icon floated="left" color="blue" name="hourglass half" size="big" />} />
            }
            <Button size="tiny" basic color='orange' floated="right" onClick={() => this.showDetailsModal(bond.serial, false)}>Details</Button>
          </Card.Content>
      </Card>))

    const TBondsOwned = tbondsOwned && tbondsOwned.map((bond) => (
    <Card key={`tbond-${bond.serial}`} style={{width:'28%'}}>
        <Card.Content>
          <Image 
            src={bond.image_url} 
            style={{marginBottom:'15px', width:'150px', height:'150px'}} />
          <Card.Header>{bond.title}</Card.Header>
          <Card.Meta>
            <div>{bond.owner}</div>
            <div><strong>{bond.price}</strong></div>
          </Card.Meta>
          <Card.Description>
            {bond.matured_text} <Moment fromNow>{bond.event_time}</Moment>
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
        <Popup content="This certificate of authenticity confirms your ownership of this T-Bond" trigger={<Icon floated="left" color="blue" name="certificate" size="big" />} />
          {bond.expired ?
          <Button size="tiny" basic color='orange' floated="right" onClick={() => this.showDetailsModal(bond.serial, true)}>Sell</Button>
          :false}
          <Button size="tiny" basic color='orange' floated="right" onClick={() => this.releaseTBond(bond.serial)}>Unlock</Button>
        </Card.Content>
    </Card>))

    return (<div>
    <Segment vertical basic loading={system.GETBONDS === 'PENDING'}>
      <Header>
        T-Bonds Market
        <Header.Subheader>
          <Table basic="very">
            <Table.Row>
              <Table.Cell>
                  <strong>Your pBTC Address:</strong> {settings[settings.account + "-pbtc"]}
              </Table.Cell>
              <Table.Cell width={5}>
              <strong>Your pBTC Balance:</strong>{" "}
                <span style={{textDecoration:"underline", cursor:"pointer", color:"#571bff"}} 
                  onClick={() => this.toggleBTCModal()}>
                    {Decimal(this.state.currentPBTCBalance).toFixed(8)}
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Checkbox toggle label="Only show my T-Bonds" onChange={this.handleShowOnlyOwned} />
              </Table.Cell>
              <Table.Cell width={5}>
                <Checkbox toggle label="Only show matured" onChange={this.handleShowOnlyMatured} />
              </Table.Cell>
            </Table.Row>
          </Table>
        </Header.Subheader>
      </Header>
      <Card.Group itemsPerRow={3}>
        {!this.state.showOnlyOwned ? TBonds: false}
        {TBondsOwned}
      </Card.Group>
    </Segment>
    <Modal open={this.state.openDetailsModal} size="fullscreen">
      <Modal.Header>T-Bond Details</Modal.Header>
      <Modal.Content image>
        <Image src={this.state.currentBond && this.state.currentBond.image_url} wrapped size="big" />
        <Modal.Description>
          <Header>{this.state.currentBond && this.state.currentBond.title}</Header>
          <p><strong>Serial:</strong> {this.state.currentBond && this.state.currentBond.serial}</p>
          <p><strong>Owner:</strong> {this.state.currentBond && this.state.currentBond.owner}</p>
          <p><strong>Backed Amount:</strong> {this.state.currentBond && this.state.currentBond.backed_amount}</p>
          <p><strong>{this.state.currentBond.matured_text}:</strong> <Moment>{this.state.currentBond.event_time}</Moment></p>
          {this.state.currentBond && this.state.currentBond.owned==false ?
          <p><strong>Price:</strong> {this.state.currentBond && this.state.currentBond.price}</p>
          :false}
          {this.state.currentBond && this.state.currentBond.owned ?
          <FormFieldMultiToken
            balances={balances}
            globals={globals}
            icon="x"
            label={"Sell Price:"}
            loading={false}
            maximum={balance[this.state.sellSymbol]}
            name="quantity"
            onChange={this.onChange}
            settings={settings}
            value={this.state.quantity}
            dropdownStyle={{minWidth:'75px'}}
            connection={connection}
          />:false}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.hideDetailsModal()}>Close</Button>
        {this.state.currentBond && this.state.currentBond.owned==true ?
        <Button onClick={() => this.sellTBond(this.state.currentBond.serial,this.state.quantity)} positive
        loading={system.SELLBONDS === 'PENDING'}>
          Sell Now
        </Button>
        :
        <Button onClick={() => this.buyTBond(this.state.currentBond.serial,this.state.currentBond.price)} positive
        loading={system.BUYBONDS === 'PENDING'}>
          Buy Now
        </Button>
        }
      </Modal.Actions>
    </Modal>
    <Modal open={this.state.openBTCModal} size="small">
      <Modal.Header>pBTC Info</Modal.Header>
      <Modal.Content image>
        <Image src={`https://sqrlwallet.io/wp-content/uploads/2021/01/btc.png`} wrapped size="small" />
        <Modal.Description>
          <strong>pBTC Balance:</strong> {Decimal(this.state.currentPBTCBalance).toFixed(8)}
          <br /><br />
          <p>Completed your purchases of T-Bonds and are ready to withdraw your pBTC balance back into Bitcoin? Just click "Withdraw" below</p>
          <GlobalFormFieldMemo
            value={this.state.withdrawDestAddr || ''}
            label={"Receiving BTC Address:"}
            name="withdrawDestAddr"
            onChange={this.onChange}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.toggleBTCModal()}>Cancel</Button>
        <Button positive disabled={this.state.currentPBTCBalance == 0}
          onClick={() => this.withdrawPBTC()}>
          Withdraw
        </Button>
      </Modal.Actions>
    </Modal>
    </div>)
  }
}

export default translate('wallet')(WalletStatusTBonds);
