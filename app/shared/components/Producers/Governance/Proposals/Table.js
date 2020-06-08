// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Table, Segment, Icon, Popup } from 'semantic-ui-react';
const { shell } = require('electron');
import { Decimal } from 'decimal.js';
import NumberFormat from 'react-number-format';

import GovernanceProposalsProposal from './Proposal';

class GovernanceProposalsProposalTable extends Component<Props> {
  state= { selectedProposal: null };
  openLink = (link) => {
    const { settings } = this.props;
    if (link.match(/^\/(ip(f|n)s)\/((\w+).*)/)) {
      shell.openExternal(settings.ipfsProtocol + "://" + settings.ipfsNode + "/" + link);
    } else {
      shell.openExternal(link);
    }
  }
  render() {
    const {
      actions,
      ballots,
      blockExplorers,
      contracts,
      globals,
      isLocked,
      list,
      proposals,
      scope,
      settings,
      submissions,
      system,
      t,
      validate,
      votes,
      wallet
    } = this.props;
    const {
      selectedProposal
    } = this.state;
    return (
      <Segment
          loading={system.GOVERNANCE_GET_SUBMISSIONS === 'PENDING'}
        >
          <Table style={{ marginTop: 20 }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>
                  Proposal Title
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Proposer
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Amount
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Milestones
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Details
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {([].concat(list)
                .map((proposal) => {
                  const selected = selectedProposal === proposal.proposal_name;
                  let amount = 0;
                  if (proposal && proposal.total_requested && proposal.total_requested.indexOf('TLOS') != -1) {
                    amount = Decimal(proposal.total_requested.split(' ')[0]).toFixed(settings.tokenPrecision);
                  }
                  return (
                    <React.Fragment key={proposal.proposal_name}>
                      <Table.Row>
                        <Table.Cell collapsing>
                          <Popup
                            content={proposal.attrVotedYes ? 'You voted YES' : proposal.attrVotedNo ? 'You voted NO' : proposal.attrVotedAbstain ? 'You voted to ABSTAIN' : 'You have not voted'}
                            inverted
                            position="top center"
                            style={{ textAlign: 'center' }}
                            trigger={(
                              <Icon
                                disabled={!proposal.attrVoted}
                                size="large"
                                color={proposal.attrVotedYes ? 'green' : proposal.attrVotedNo ? 'red' : proposal.attrVotedAbstain ? 'yellow' : 'grey'}
                                name={proposal.attrVotedYes ? 'checkmark' : proposal.attrVotedNo ? 'x' : proposal.attrVotedAbstain ? 'minus' : 'question'}
                              />
                            )}
                          />
                        </Table.Cell>
                        <Table.Cell style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word"
                        }}>
                        {proposal.title} ({proposal.proposal_name})
                          <p>
                            <small>
                              <a
                                onClick={() => this.openLink(proposal.content)}
                                role="link"
                                style={{ cursor: 'pointer', fontSize:'10pt' }}
                                tabIndex={0}
                              > View Proposal Details </a>
                            </small>
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          {proposal.proposer}
                        </Table.Cell>
                        <Table.Cell singleLine>
                        <NumberFormat value={amount}
                          displayType={'text'}
                          thousandSeparator={true}
                        /> {settings.blockchain.tokenSymbol}
                        </Table.Cell>
                        <Table.Cell>
                          {proposal.milestones.length}
                        </Table.Cell>
                        <Table.Cell>
                          {proposal.status}
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            //disabled={proposal.attrIsExpired}
                            icon={selected ? 'x' : 'bars'}
                            onClick={() => {
                              this.setState({
                                selectedProposal: selected ? null : proposal.proposal_name
                              });
                            }}
                            color={selected ? 'grey' : 'blue'}
                          />
                        </Table.Cell>
                      </Table.Row>
                      {selected &&
                        (
                          <Table.Row>
                            <Table.Cell colSpan="7">
                              <GovernanceProposalsProposal
                                actions={actions}
                                key={proposal.prop_id}
                                ballots={ballots}
                                blockExplorers={blockExplorers}
                                globals={globals}
                                proposal={proposal}
                                proposals={proposals}
                                scope={scope}
                                settings={settings}
                                submissions={submissions}
                                system={system}
                                votes={votes}
                              />
                            </Table.Cell>
                          </Table.Row>
                        )}
                    </React.Fragment>
                  );
                }))}
            </Table.Body>
          </Table>
        </Segment>
    );
  }
}

export default translate('tools')(GovernanceProposalsProposalTable);
