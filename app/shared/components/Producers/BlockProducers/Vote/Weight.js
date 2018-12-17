// @flow
import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';

const notation = [
  { value: 1, symbol: '' },
  { value: 1E3, symbol: ' Kilovotes' },
  { value: 1E6, symbol: ' Megavotes' },
  { value: 1E9, symbol: ' Gigavotes' },
  { value: 1E12, symbol: ' Teravotes' },
  { value: 1E15, symbol: ' Petavotes' },
  { value: 1E18, symbol: ' Exavotes' },
  { value: 1E21, symbol: ' Zettavotes' },
  { value: 1E24, symbol: ' Yottavotes' },
  { value: 1E27, symbol: ' Nv' },
  { value: 1E30, symbol: ' Xv' },
];

export default class ProducersVoteWeight extends Component<Props> {
  nFormatter = (num, digits) => {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = notation.length - 1; i > 0; i -= 1) {
      if (num >= notation[i].value) {
        break;
      }
    }
    return (num / notation[i].value).toFixed(digits).replace(rx, '$1') + notation[i].symbol;
  }

  render() {
    const {
      weight
    } = this.props;
    return (
      <Popup
        content={parseInt(weight, 10).toLocaleString()}
        inverted
        position="top center"
        trigger={<span>{this.nFormatter(weight, 3)}</span>}
      />
    );
  }
}
