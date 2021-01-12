// @flow
import React, { Component } from 'react';
import { Button, Divider, Header, Icon, Image, Segment, Table, Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WalletMessageContractTransfer from '../../../../../Global/Message/Contract/Transfer';

class WalletPanelFormTransferSwapConfirming extends Component<Props> {
  onConfirm = (e) => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
    e.preventDefault();
    return false;
  }

  render() {
    const {
      balance,
      fromAsset,
      fromLogo,
      toAsset,
      toLogo,
      confirming,
      formError,
      quantity,
      toQuantity,
      onBack,
      settings,
      t,
      waiting,
      waitingStarted,
      values
    } = this.props;

    const contract = null;//;balances.__contracts[asset.toUpperCase()].contract;

    const secondsElapsed = new Date() - waitingStarted;
    const secondsRemaining = parseInt((3000 - secondsElapsed) / 1000, 10) + 1;
    const cellStyle = {paddingLeft:'5px'};
    return (
      <Segment basic clearing vertical>
        <Header size="small">
          {t('transfer_swap_confirming_title')}
          <Header.Subheader>
            {t('transfer_swap_confirming_body')}
          </Header.Subheader>
        </Header>
        <Table basic="very">
          <Table.Row>
            <Table.Cell width="5" textAlign="center">
              <Image 
                bordered
                circular 
                src={fromLogo} 
                style={{margin:'auto', height:'80px',width:'80px'}}
              />
            </Table.Cell>
            <Table.Cell width="5" textAlign="center">
              <Icon 
                color='orange'
                name="exchange" 
                size="big" 
              />
              <p style={{fontWeight:'bold'}}>
                {quantity} = {values.destTotalAfterFee.toFixed(settings.tokenPrecision)} {toAsset}
              </p>
            </Table.Cell>
            <Table.Cell width="5" textAlign="center">
              <Image 
                bordered
                circular 
                src={toLogo} 
                style={{margin:'auto', height:'80px',width:'80px'}}
              />
            </Table.Cell>
          </Table.Row>
        </Table>
        <Table basic="very">
          <Table.Row>
            <Table.Cell>
              <Table compact definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={8} style={cellStyle}>1. {t('transfer_swap_amount_1')}</Table.Cell>
                    <Table.Cell>{values.sourceQuantity} {fromAsset}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={cellStyle}>2. {t('transfer_swap_fee_1')}</Table.Cell>
                    <Table.Cell>
                      {values.sourceFee.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={cellStyle}>3. {t('transfer_swap_estimate_1')}</Table.Cell>
                    <Table.Cell>{values.sourceTotalAfterFee.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Table.Cell>
            <Table.Cell>
            <Table compact definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={8} style={cellStyle}>4. {t('transfer_swap_amount_2')}</Table.Cell>
                  <Table.Cell>{values.sourceTotalAfterFee.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell style={cellStyle}>5. {t('transfer_swap_fee_2')}</Table.Cell>
                  <Table.Cell>
                    {values.destFee.toFixed(settings.tokenPrecision)} {values.destAsset}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell style={cellStyle}>6. {t('transfer_swap_estimate_2')}</Table.Cell>
                  <Table.Cell>{values.destTotalAfterFee.toFixed(settings.tokenPrecision)} {values.destAsset}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Table.Cell>
          </Table.Row>
        </Table>
        <WalletMessageContractTransfer
          data={{
            from:settings.account,
            quantity,
            to:settings.account,
            transaction: {
              delay: 60
            }
          }}
        />
        <Divider />
        <Button
          color="green"
          content={(waiting) ? `${t('Swap Now')} (${secondsRemaining})` : t('Swap Now')}
          disabled={waiting}
          floated="right"
          icon="refresh"
          onClick={this.onConfirm}
        />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('back')}
        </Button>
      </Segment>
    );
  }
}

export default translate('transfer')(WalletPanelFormTransferSwapConfirming);
