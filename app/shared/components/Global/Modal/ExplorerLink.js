// @flow
import React, { Component } from 'react';
import GlobalModalDangerLink from './DangerLink';
import blockexplorers from '../../../actions/blockexplorers';
import { type } from 'os';

export default class GlobalModalExplorerLink extends Component<Props> {
  render() {
    const {
      blockExplorers,
      content,
      linkData,
      linkType,
      settings
    } = this.props;
    // look for default block explorer based on token, else find compatible
    const blockExplorerKeys = Object.keys(blockExplorers);
    let blockExplorer = blockExplorers[settings.blockExplorer];
    if (!blockExplorer || blockExplorer.tokenSymbol != settings.blockchain.tokenSymbol) {
      blockExplorerKeys.forEach( (blockExplorerKey) => {
        const explorer = blockExplorers[blockExplorerKey];
        if (explorer.tokenSymbol == settings.blockchain.tokenSymbol && 
          blockExplorer.tokenSymbol != settings.blockchain.tokenSymbol) {
          blockExplorer = Object.assign({name: blockExplorerKey}, explorer);
          return;
        }
      });
    }

    let urlPartsWithoutVariable;
    let generatedLink;
    if (blockExplorer && blockExplorer[linkType]){
      urlPartsWithoutVariable = blockExplorer[linkType].split(`{${linkType}}`);
      generatedLink = `${urlPartsWithoutVariable[0]}${linkData}${urlPartsWithoutVariable[1]}`;
    }

    return (
      <GlobalModalDangerLink
        content={content}
        link={generatedLink}
        settings={settings}
      />
    );
  }
}
