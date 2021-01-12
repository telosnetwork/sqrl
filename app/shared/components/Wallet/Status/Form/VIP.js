// @flow
import React, { Component } from 'react';
import { Button, Label, Table, Segment, Rating, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

class WalletStatusVIPForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      submitDisabled: true
    };
  }

  onSubmit = (e) => {
    
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

  onUpgrade = async (level) => {
    console.log('user would like to upgrade to level:', level);
  }

  onBack = (e) => {
    e.preventDefault();
    return false;
  }

  onClose = (e) => {
    this.props.onClose();
  }

  render() {
    const {
      actions,
      profile,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    return (
      <Segment>
        <Message positive>
          Your current SQRL consumption is: <b>{profile.usage}</b>
        </Message>
        <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>VIP Level</Table.HeaderCell>
            <Table.HeaderCell>Label</Table.HeaderCell>
            <Table.HeaderCell singleLine>Usage Requirements</Table.HeaderCell>
            <Table.HeaderCell>Benefits</Table.HeaderCell>
            {(profile.vip_level < 5 && 0==1) ?
            <Table.HeaderCell />
            :false}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {(profile.vip_level == 1) ?
                <Label ribbon>Current Level {profile.vip_level}</Label>
              :<Header as='h2' textAlign='center'>
              <Rating icon='star' defaultRating={1} maxRating={1} />
            </Header>}
            </Table.Cell>
            <Table.Cell singleLine>Trader</Table.Cell>
            <Table.Cell singleLine>100 - 249 SQRL</Table.Cell>
            <Table.Cell>
            Obtain Level 1 after consuming between 100 - 249 tokens. This unlocks the Bancor token swap feature.
            </Table.Cell>
            {(profile.vip_level < 1 && 0==1) ?
            <Table.Cell collapsing>
              <Button primary content="Upgrade" icon="cart plus" labelPosition="right" onClick={()=>this.onUpgrade(1)} />
            </Table.Cell>
            :false}
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {(profile.vip_level == 2) ?
                <Label ribbon>Current Level {profile.vip_level}</Label>
              :<Header as='h2' textAlign='center'>
              <Rating icon='star' defaultRating={2} maxRating={2} />
            </Header>}
            </Table.Cell>
            <Table.Cell singleLine>Socializer</Table.Cell>
            <Table.Cell singleLine>250 - 499 SQRL</Table.Cell>
            <Table.Cell>
            Obtain Level 2 after consuming between 250 - 499 tokens. This unlocks all social features in Sqrl.
            </Table.Cell>
            {(profile.vip_level < 2 && 0==1) ?
            <Table.Cell collapsing>
              <Button primary content="Upgrade" icon="cart plus" labelPosition="right" onClick={()=>this.onUpgrade(2)} />
            </Table.Cell>
            :false}
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {(profile.vip_level == 3) ?
                <Label ribbon>Current Level {profile.vip_level}</Label>
              :<Header as='h2' textAlign='center'>
              <Rating icon='star' defaultRating={3} maxRating={3} />
            </Header>}
            </Table.Cell>
            <Table.Cell singleLine>Telosian</Table.Cell>
            <Table.Cell singleLine>500 - 999 SQRL</Table.Cell>
            <Table.Cell>
            Obtain Level 3 after consuming between 500 - 999 tokens. This unlocks a hidden, unannounced feature.
            </Table.Cell>
            {(profile.vip_level < 3 && 0==1) ?
            <Table.Cell collapsing>
              <Button primary content="Upgrade" icon="cart plus" labelPosition="right" onClick={()=>this.onUpgrade(3)} />
            </Table.Cell>
            :false}
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {(profile.vip_level == 4) ?
                <Label ribbon>Current Level {profile.vip_level}</Label>
              :<Header as='h2' textAlign='center'>
              <Rating icon='star' defaultRating={4} maxRating={4} />
            </Header>}
            </Table.Cell>
            <Table.Cell singleLine>Banker</Table.Cell>
            <Table.Cell singleLine>1,000 - 9,999 SQRL</Table.Cell>
            <Table.Cell>
            Obtain Level 4 after consuming between 1000 - 9999 tokens. This unlocks the bank ACH/wire withdrawal feature.
            </Table.Cell>
            {(profile.vip_level < 4 && 0==1) ?
            <Table.Cell collapsing>
              <Button primary content="Upgrade" icon="cart plus" labelPosition="right" onClick={()=>this.onUpgrade(4)} />
            </Table.Cell>
            :false}
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {(profile.vip_level == 5) ?
                <Label ribbon>Current Level {profile.vip_level}</Label>
              :<Header as='h2' textAlign='center'>
              <Rating icon='star' defaultRating={5} maxRating={5} />
            </Header>}
            </Table.Cell>
            <Table.Cell singleLine>Squirrel</Table.Cell>
            <Table.Cell singleLine>10,000+ SQRL</Table.Cell>
            <Table.Cell>
            Obtain Level 5 after consuming 10,000 or more tokens. This level automatically unlocks all wallet features.
            </Table.Cell>
            {(profile.vip_level < 5 && 0==1) ?
            <Table.Cell collapsing>
              <Button primary content="Upgrade" icon="cart plus" labelPosition="right" onClick={()=>this.onUpgrade(5)} />
            </Table.Cell>
            :false}
          </Table.Row>
        </Table.Body>
      </Table>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusVIPForm);
