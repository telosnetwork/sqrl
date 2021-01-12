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
      settings
    } = this.props;
    
    this.setState({loading: true});

    let docs = proposals && proposals.ratifydocuments;
    if (!docs) docs = [];

    const rdocuments = cloneDeep(docs);

    for (let index = 0; index < rdocuments.length; index++) {
      const doc_name = rdocuments[index].document_name;
      rdocuments[index].clauses = [];

      for (let sectionNumber = 0; sectionNumber < rdocuments[index].sections; sectionNumber++) {
          const section = proposals.ratifysections[doc_name][sectionNumber];
          let sectionURL = section && section.content;

          if (sectionURL && sectionURL.indexOf('http') == -1)
            sectionURL = settings.ipfsProtocol + "://" + settings.ipfsNode + "/ipfs/" + sectionURL;

          await fetch(sectionURL).then(response=>{
            return response.text();
          }).then(data =>{
            rdocuments[index].clauses = [
              ...rdocuments[index].clauses.slice(0, sectionNumber),
              data,
              ...rdocuments[index].clauses.slice(sectionNumber + 1)
            ];
          }).catch(error => {
            console.log("!!!DOCS ERROR!!!", error);
          });
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
                menuItem: document.title.match(/\b(\w)/g).join(''),
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
