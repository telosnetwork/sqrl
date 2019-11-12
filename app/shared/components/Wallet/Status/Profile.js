// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Card, Icon, Image, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import avatarPlaceholder from '../../../../renderer/assets/images/profile.png';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import WalletStatusProfileForm from './Form/Profile';

class WalletStatusProfile extends Component<Props> {
  state = {
    open: false
  }
  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  editProfile = () => {
    this.onOpen();
  }
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

    let avatar = avatarPlaceholder;
    let bio = 'Click image to customize avatar and bio.';
    if (globals.profiles && globals.profiles.length > 0) {
      const profile = globals.profiles.filter((p) => (p.account == settings.account))[0];
      if (profile) {
        if (profile.avatar) avatar = profile.avatar;
        if (profile.bio) bio = profile.bio;
      }
    }

    return (
      <div>
        <Card style={{width:'100%',marginBottom:'15px',cursor:'hand'}}>
        <Card.Content>
          <Image src={avatar} size="tiny" 
            floated="left" rounded onClick={() => this.editProfile()} />
          <Card.Header>{settings.account}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined <Moment fromNow>{account.created}</Moment></span>
          </Card.Meta>
          <Card.Description>
            {bio}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='users' />
            2 Followers
          </a>
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
              key="ProfileForm"
              settings={settings}
              system={system}
            />
          )}
          icon="inbox"
          onClose={this.onClose}
          openModal={open}
          settings={settings}
          system={system}
          />
      </div>
    );
  }
}

export default translate('wallet')(WalletStatusProfile);
