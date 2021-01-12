// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Image, Popup, Segment, Table, Header } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import DangerLink from '../../../Global/Modal/DangerLink';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';

class ProducersTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.proxy.owner, nextProps.proxy.owner)
    || !isEqual(this.props.isValidUser, nextProps.isValidUser)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  
  deleteRegProxy = () => {
    const { actions } = this.props;
    actions.removeregproxyinfo();
    actions.unregproxy();
  }

    
  render() {
    const {
      actions,
      addProxy,
      blockExplorers,
      getProxyInfo,
      isSelected,
      isValidUser,
      proxy,
      removeProxy,
      settings,
      system,
      t
    } = this.props;

    return (
      <Table.Row key={proxy.owner}>
        <Table.Cell
          singleLine
          textAlign="center"
        >
          <Button
            color="purple"
            icon="magnify"
            onClick={() => getProxyInfo(proxy.owner)}
            size="small"
          />

          {
            ( proxy.owner == settings.account) ?
            <GlobalTransactionModal
                actionName="REMOVE_REGPROXYINFO"
                actions={actions}
                blockExplorers={blockExplorers}
                button={{
                  color: 'red',
                  icon: 'trash'
                }}
                content={(
                  <Segment basic clearing>
                    <p>
                    This will delete your account <strong>{proxy.owner}</strong> as a voting proxy on the network. Are you sure you would like to continue?
                    <Button
                      color='red'
                      content="Delete Registration"
                      floated="right"
                      icon="trash"
                      loading={system.REMOVE_REGPROXYINFO === 'PENDING'}
                      style={{ marginTop: 20 }}
                      onClick={() => this.deleteRegProxy(proxy.owner)}
                      primary
                    />
                    </p> 
                  </Segment>
                )}
                icon="share square"
                settings={settings}
                system={system}
                title="Delete Proxy Registration"
              />
            : ''
          }

          <Popup
            content={t('producers_proxies_popup_content', { proxy: proxy.owner })}
            header={t('producers_proxies_popup_header')}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'blue' : 'grey'}
                icon={isSelected ? 'circle' : 'circle outline'}
                disabled={!isValidUser}
                onClick={
                  (isSelected)
                  ? () => removeProxy(proxy.owner)
                  : () => addProxy(proxy.owner)
                }
                size="small"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell singleLine>
          <Image size="mini" src={proxy.logo_256} />
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <Header size="small">
            <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
              {proxy.name}
            </span>
            <Header.Subheader>
              <DangerLink
                content={proxy.website.substring(0, 30).replace(/(^\w+:|^)\/\//, '')}
                link={proxy.website}
                settings={settings}
              />
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <b>{ proxy.owner }</b>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('producers')(ProducersTableRow);
