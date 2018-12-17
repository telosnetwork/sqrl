// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Container, Header, Message, Segment } from 'semantic-ui-react';

const { shell } = require('electron');
import GovernanceRatifyAmendRatify from './Governance/RatifyAmend/Ratify';

class GovernanceRatifyAmend extends Component<Props> {
  state = {
    scope: 'eosio.amend'
  }
  componentDidMount() {
    this.sync();
  }
  onChange = (e, { name, selection, value }) => {
    this.setState({ [name]: value }, () => {
      // If this is the dropdown, fire the submit
      if (selection) {
        this.sync();
      }
    });
  }
  openLink = (link) => {
    const { settings } = this.props;
    if (link.match(/^\/(ip(f|n)s)\/((\w+).*)/)) {
      shell.openExternal(settings.ipfsProtocol + "://" + settings.ipfsNode + "/" + link);
    } else {
      shell.openExternal(link);
    }
  }
  sync = () => {
    const { actions } = this.props;
    const { scope } = this.state;
    actions.getProposals(scope);
  }
  render() {
    const {
      actions,
      blockExplorers,
      proposals,
      settings,
      system,
      t
    } = this.props;
    const {
      scope
    } = this.state;
    const {
      list,
      votes
    } = proposals;
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }
    return (
      <Segment basic>
        <Header>
          Network Operating Agreements
        </Header>
        <Container>
        
        <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/Qmexc2Uejr2f5f8bCQxTkt5CfTAC9szXLpG6mu6No7pmVs")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >Qmexc2Uejr2f5f8bCQxTkt5CfTAC9szXLpG6mu6No7pmVs
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Blockchain Network Operating Agreement"
          />
        <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmWZEpPcudrAmQ9tzi8rCpdqAFfVjuAKc6vkpMRRa2hXsz")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmWZEpPcudrAmQ9tzi8rCpdqAFfVjuAKc6vkpMRRa2hXsz
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Blockchain Network Arbitration Rules and Procedures"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmSwzSPZf2xpvjKV6qWRodAVD8uYZpKZ1WfzTEA825RjfR")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmSwzSPZf2xpvjKV6qWRodAVD8uYZpKZ1WfzTEA825RjfR
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Regproducer Contract"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmWXmx9KAZZ6dcxT67Ap4WHivfJ5s1nFgMFXpHyriCkNCR")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmWXmx9KAZZ6dcxT67Ap4WHivfJ5s1nFgMFXpHyriCkNCR
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Regarb Contract"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmUvx45rtKr3H4SYf3Kei7AjEPEfKvxspBV4AXAEqWsyXU")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmUvx45rtKr3H4SYf3Kei7AjEPEfKvxspBV4AXAEqWsyXU
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Block Producer Minimum Requirements"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmfW8UGVUKLVsacy58eTmFLqLMaT1STxaycJFnCpNfhV82")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmfW8UGVUKLVsacy58eTmFLqLMaT1STxaycJFnCpNfhV82
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Arbitrator Minimum Requirements"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmeYV6f4B5S2z3CycASNVHSLtMzcJzWRyam4Q1WzFAtsLe")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmeYV6f4B5S2z3CycASNVHSLtMzcJzWRyam4Q1WzFAtsLe
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Telos Blockchain Network Data Protection Policy"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmTWZG5moSZbH63Hk5oH4KRYshMDwH7kjyktqHa65jZUvA")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmTWZG5moSZbH63Hk5oH4KRYshMDwH7kjyktqHa65jZUvA
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="查看中文版：Telos区块链网络运营协议（TBNOA"
          />
          <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink("https://web.ipfs.telosfoundation.io/QmVGMcfWsGqFi9TR1QEk6W8thRY4f9et9nX8WJLXQvWtqb")}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >QmVGMcfWsGqFi9TR1QEk6W8thRY4f9et9nX8WJLXQvWtqb
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="한국어 번역 버전은 여기에서 제공됩니다.: 텔로스 블록체인 네트워크 운영 계약서(TBNOA)"
          />
        </Container>
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceRatifyAmend);
