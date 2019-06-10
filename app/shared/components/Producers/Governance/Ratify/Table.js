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
              const selected = selectedProposal === proposal.submission_title;
              return (
                <React.Fragment key={proposal.submission_title}>
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
                    {proposal.submission_title} (#{proposal.submission_proposal_id})
                    </Table.Cell>
                    <Table.Cell style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}>
                    {proposal.document_title}
                    </Table.Cell>
                    <Table.Cell>
                      {proposal.submission_proposer}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        //disabled={proposal.attrIsExpired}
                        icon={selected ? 'x' : 'bars'}
                        onClick={() => {
                          this.setState({
                            selectedProposal: selected ? null : proposal.submission_title
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
                            key={proposal.prop_id}
                            ballots={ballots}
                            blockExplorers={blockExplorers}
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
