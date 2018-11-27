// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import throttle from 'lodash/throttle';

import { Header, Segment, Table, Visibility } from 'semantic-ui-react';

import ContractInterfaceSelectorTable from '../Selector/Table';

class ContractInterfaceTabTables extends Component<Props> {
  state = {
    lastIndex: ''
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.contractTable !== prevProps.contractTable
      || this.props.contractTableScope !== prevProps.contractTableScope
    ) {
      this.load();
    }
  }
  lastIndex = throttle(() => {
    const {
      contract,
      contractTable,
      contractTableScope,
      tables
    } = this.props;
    const tableScope = contractTableScope || contract.account;
    const tableData = get(tables, `${contract.account}.${tableScope}.${contractTable}`)
    if (tableData) {
      const { rows } = tableData;
      const { key_names } = contract.getTable(contractTable);
      const [index] = key_names;
      if (rows && rows.length > 0) {
        const lastIndex = rows[rows.length - 1][index];
        this.setState({
          lastIndex
        });
      }
    }
  }, 500)
  load = throttle((refresh = false) => {
    // The selected contract
    const {
      actions,
      contract,
      contractTable,
      contractTableScope,
      tables
    } = this.props;
    const {
      lastIndex
    } = this.state;
    if (!contractTable) return;
    const { key_names } = contract.getTable(contractTable);
    const [index] = key_names;
    const tableScope = contractTableScope || contract.account;
    const tableData = get(tables, `${contract.account}.${tableScope}.${contractTable}`)
    let rows = false;
    let more = false;
    if (!refresh && tableData) {
      ({ more, rows } = tableData);
    }
    if (!rows || more || refresh) {
      actions.getTable(
        contract.account,
        tableScope,
        contractTable,
        100,
        index,
        rows
      );
    }
  }, 1000)
  onSet = (data) => this.props.onSet(data, () => this.load(true));
  render() {
    const {
      contract,
      contractTable,
      contractTableScope,
      onChange,
      onSet,
      t,
      tables
    } = this.props;
    let rows = [];
    let fields = [];
    if (contractTable) {
      const table = contract.getTable(contractTable);
      if (table) {
        const { type: dataType } = table;
        const tableScope = contractTableScope || contract.account;
        ({ fields } = contract.getStruct(dataType));
        const tableData = get(tables, `${contract.account}.${tableScope}.${contractTable}`)
        if (tableData) {
          ({ rows } = tableData);
        }
      }
    }

    if (rows && rows.length && fields && fields.length) {
      const fieldsName = fields.map((field) => field.name);

      rows = rows.map(row => {
        return fieldsName.reduce((currentRow, col) => {
          currentRow[col] = (typeof row[col] === 'string' || typeof row[col] === 'number' || typeof row[col] === 'boolean') ? row[col] : JSON.stringify(row[col]);
          return currentRow;
        }, {});
      });
    }

    // This can be used to make the horizontal scrollbar appear on top instead of bottom = helpful for big tables
    // const scrollStyle = {overflowX: 'auto', padding: '0em', transform:'scaleX(-1) rotate(180deg)' };
    // const rotateStyle = {transform:'scaleX(-1) rotate(180deg)'};

    const scrollStyle = {overflowX: 'auto', padding: '0em'};
    const rotateStyle = {};

    return (
      <React.Fragment>
        <ContractInterfaceSelectorTable
          contract={contract}
          contractTable={contractTable}
          contractTableScope={contractTableScope}
          onChange={onChange}
          onSet={this.onSet}
        />
        {(contractTable)
          ? (
            <Visibility
              continuous
              key="ContractTable"
              onBottomVisible={this.load}
              onBottomPassedReverse={this.lastIndex}
            >
              {(rows && rows.length > 0)
                ? (
                  <Segment basic style={scrollStyle}>
                    <Table style={rotateStyle}>
                      <Table.Header>
                        <Table.Row>
                          {fields.map((field, index) => (
                            <Table.HeaderCell key={'thc-'+index}>
                              {field.name}
                            </Table.HeaderCell>
                          ))}
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {rows.map((row, index) => (
                          <Table.Row key={'tr-'+index}>
                            {fields.map((field, idx) => (
                              <Table.Cell key={'tc-'+index+'-'+idx}>
                                {row[field.name]}
                              </Table.Cell>
                            ))}
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Segment>
                )
                : (
                  <Segment color="orange" secondary stacked>
                    <Header textAlign="center">
                      {t('interface_tables_no_records')}
                    </Header>
                  </Segment>
                )
              }
            </Visibility>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceTabTables);
