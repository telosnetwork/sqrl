// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Table, Icon, Popup } from 'semantic-ui-react';
const { shell } = require('electron');

import GovernanceProposalsRatify from './Ratify';

class GovernanceProposalsRatifyTable extends Component<Props> {
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
      scope,
      settings,
      ratifysubmissions,
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
      <Table style={{ marginTop: 20 }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>
              Proposal Title
            </Table.HeaderCell>
            <Table.HeaderCell>
              Document Title
            </Table.HeaderCell>
            <Table.HeaderCell>
              Proposed By
            </Table.HeaderCell>
            <Table.HeaderCell>
              Details
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {([].concat(list)
            .map((proposal) => {
              const selected = selectedProposal === proposal.ballot_name;
              return (
                <React.Fragment key={proposal.ballot_name}>
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
                    {proposal.submission_title} (#{proposal.ballot_name})
                    </Table.Cell>
                    <Table.Cell style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}>
                    {proposal.title}
                    </Table.Cell>
                    <Table.Cell>
                      {proposal.proposer}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        //disabled={proposal.attrIsExpired}
                        icon={selected ? 'x' : 'bars'}
                        onClick={() => {
                          this.setState({
                            selectedProposal: selected ? null : proposal.ballot_name
                          });
                        }}
                        color={selected ? 'grey' : 'blue'}
                      />
                    </Table.Cell>
                  </Table.Row>
                  {selected &&
                    (
                      <Table.Row>
                        <Table.Cell colSpan="5">
                          <GovernanceProposalsRatify
                            actions={actions}
                            key={proposal.ballot_name}
                            ballots={ballots}
                            blockExplorers={blockExplorers}
                            globals={globals}
                            proposal={proposal}
                            scope={scope}
                            settings={settings}
                            ratifysubmissions={ratifysubmissions}
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
    );
  }
}

export default translate('tools')(GovernanceProposalsRatifyTable);
