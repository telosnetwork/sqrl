// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import cloneDeep from 'lodash.clonedeep';

import { Header, Segment, Tab } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

class GovernanceRatifyAmend extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      documents: [],
      loading: false
    };
  }
  componentDidMount = async () => {
    const {
      proposals,
    } = this.props;
    
    this.setState({loading: true});

    let docs = proposals && proposals.ratifydocuments;
    if (!docs) docs = [];

    const rdocuments = cloneDeep(docs);

    for (let index = 0; index < rdocuments.length; index++) {
      for (let clauseIndex = 0; clauseIndex < rdocuments[index].clauses.length; clauseIndex++) {
          let clauseData = await (await fetch(rdocuments[index].clauses[clauseIndex])).text();
          rdocuments[index].clauses = [
            ...rdocuments[index].clauses.slice(0, clauseIndex),
            clauseData,
            ...rdocuments[index].clauses.slice(clauseIndex + 1)
          ];
      }
    }

    this.setState({
      loading: false, 
      documents: rdocuments
    });
  }

  render() {
    const {
      documents,
      loading
    } = this.state;
    return (
      <Segment basic>
        <Header>
          Network Operating Agreements
        </Header>
        <Tab menu={{ pointing: true }}
          panes={(documents.map((document) => {
            return (
              {
                menuItem: document.document_title.match(/\b(\w)/g).join(''),
                render: () => <Tab.Pane attached={false} loading={loading}>
                  {
                  document.clauses.map((clause) => {
                    return (
                      <ReactMarkdown source={clause} />
                    );
                })}</Tab.Pane>,
              }
            );
          }))}>
        </Tab>
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceRatifyAmend);
