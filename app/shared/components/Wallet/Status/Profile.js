// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Card, Icon, Image, Label, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import avatarPlaceholder from '../../../../renderer/assets/images/profile.png';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import WalletStatusProfileForm from './Form/Profile';
import WalletStatusVIPForm from './Form/VIP';
import WalletStatusReferralsForm from './Form/Referrals';

const WIN_CLOSED = -1;
const WIN_EDIT_PROFILE = 0;
const WIN_EDIT_VIP = 1;
const WIN_EDIT_REFER = 2;
class WalletStatusProfile extends Component<Props> {
  state = {
    open: WIN_CLOSED
  }
  onOpen = (window) => this.setState({ open: window });
  onClose = () => this.setState({ open: WIN_CLOSED });

  render() {
    const {
      actions,
      accounts,
      blockExplorers,
      globals,
      settings,
      system,
      t
    } = this.props;
    const {
      open
    } = this.state;

    const account = accounts[settings.account] || {};

    let profile;
    if (globals.profiles && globals.profiles.length > 0) {
      profile = globals.profiles.filter((p) => (p.account == settings.account))[0];
    }
    if (!profile) 
      profile = {
        referrals: 0,
        vip_level: 0,
        usage: '0.0000 SQRL'
      }
    if (!profile.avatar)
      profile.avatar = avatarPlaceholder;
    if (!profile.bio)
      profile.bio = 'Click image to customize avatar and bio.';

    return (
      <div>
        <Card style={{width:'100%',cursor:'hand'}}>
          <Card.Content>
            <Image src={profile.avatar} size="tiny" 
              floated="left" rounded onClick={() => this.onOpen(WIN_EDIT_PROFILE)} />
            <Card.Header>{settings.account}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined <Moment fromNow>{account.created}</Moment></span>
            </Card.Meta>
            <Card.Description>
              {profile.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button size="minion" as='div' labelPosition='right' 
              floated='left' onClick={() => this.onOpen(WIN_EDIT_VIP)}>
              <Button size="minion" color='orange'>
                <Icon name='star' />
              </Button>
              <Label as='a' basic color='orange' pointing='left'>
              VIP {profile.vip_level}
              </Label>
            </Button>
            <Button size="minion" as='div' labelPosition='right' 
              floated='right' onClick={() => this.onOpen(WIN_EDIT_REFER)}>
              <Button size="minion" color='orange'>
                <Icon name='users' />
              </Button>
              <Label as='a' basic color='orange' pointing='left'>
                {profile.referrals} referrals
              </Label>
            </Button>
          </Card.Content>
        </Card>

        <GlobalTransactionModal
          actionName="SET_PROFILEAVATAR"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletStatusProfileForm
              accounts={accounts}
              actions={actions}
              globals={globals}
              key="ProfileForm"
              profile={profile}
              settings={settings}
              system={system}
            />
          )}
          icon="user"
          onClose={this.onClose}
          openModal={open===WIN_EDIT_PROFILE}
          settings={settings}
          system={system}
          title="Edit Profile"
          />

      <GlobalTransactionModal
          actionName="SET_VIP"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletStatusVIPForm
              accounts={accounts}
              actions={actions}
              globals={globals}
              key="VIPForm"
              profile={profile}
              settings={settings}
              system={system}
            />
          )}
          icon="star"
          onClose={this.onClose}
          openModal={open===WIN_EDIT_VIP}
          settings={settings}
          size="medium"
          system={system}
          title="VIP Levels"
          />

        <GlobalTransactionModal
          actionName="SET_REFERRALS"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletStatusReferralsForm
              accounts={accounts}
              actions={actions}
              globals={globals}
              key="ReferralForm"
              profile={profile}
              settings={settings}
              system={system}
            />
          )}
          icon="users"
          onClose={this.onClose}
          openModal={open===WIN_EDIT_REFER}
          settings={settings}
          size="small"
          system={system}
          title="User Referrals"
          />
      </div>
    );
  }
}

export default translate('wallet')(WalletStatusProfile);
