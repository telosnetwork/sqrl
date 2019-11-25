// @flow
import React, { Component } from 'react';
import { Dropdown, Image, Input } from 'semantic-ui-react';
import { debounce, find } from 'lodash';

export default class GlobalFormFieldMultiToken extends Component<Props> {
  constructor(props) {
    super(props);
    const [quantity, asset] = props.value.split(' ');
    const { settings } = this.props;
    this.state = {
      asset: asset || settings.blockchain.tokenSymbol,
      logo: '',
      quantity
    };
  }
  componentDidMount () {
    this.setTokenLogo(this.state.asset);
  }
  setTokenLogo (asset) {
    const { balances, globals, hideIcon } = this.props;
    if (!hideIcon) {
      const { contract } = balances.__contracts[asset];
      const tokenInfo = globals && globals.remotetokens 
        && globals.remotetokens.filter((token) => token.account==contract && token.symbol==asset)[0];
      if (tokenInfo && tokenInfo.logo) {
        this.setState({logo: tokenInfo.logo});
      }
    }
  }
  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { asset, quantity } = this.state;
      const { balances } = this.props;
      const { contract, precision } = balances.__contracts[asset];
      const parsed = (quantity > 0)
        ? `${parseFloat(quantity).toFixed(precision[asset])} ${asset}`
        : `${parseFloat(0).toFixed(precision[asset])} ${asset}`;
      this.setTokenLogo(asset);
      this.props.onChange(e, { name: this.props.name, value: parsed });
    });
  }, 300)
  
  render() {
    const {
      autoFocus,
      balances,
      bancorOnly,
      dropdownStyle,
      globals,
      label,
      loading,
      name,
      noInput,
      reverseInputs,
      settings,
      showAll,
      style
    } = this.props;
    const assets = Object.keys(balances[settings.account]);
    const { customTokens } = settings;
    // Determine which tokens are being tracked
    const trackedTokens = (customTokens) ? customTokens.map((tokenName) => {
      const [contract, symbol] = tokenName.split(':');

      // find logo
      const tokenInfo = globals && globals.remotetokens 
        && globals.remotetokens.filter((token) => token.account==contract && token.symbol==symbol)[0];
      
        if (bancorOnly === true && tokenInfo && tokenInfo.bancor_enabled === 0)
          return;

      return { 
        contract, 
        symbol, 
        logo: tokenInfo ? tokenInfo.logo : null 
      };
    }) : [{
      contract: 'eosio',
      symbol: settings.blockchain.tokenSymbol,
      logo: null
    }];
    const options = [];
    // Iterate assets and build the options list based on tracked tokens
    assets.forEach((asset) => {
      const assetDetails = find(trackedTokens, { symbol: asset });
      if (assetDetails) {
        const { contract, symbol, logo } = find(trackedTokens, { symbol: asset });
        if (
          (contract && symbol)
          && (balances[settings.account] && balances[settings.account][asset] > 0 || showAll === true)
        ) {
          options.push({
            key: asset,
            image: logo,
            text: `${symbol}`,
            value: asset
          });
        }
      }
    });
    return (
      <div className="field">
        <label htmlFor={name}>
          {label}
        </label>
        <Input
          autoFocus={autoFocus}
          control={Input}
          defaultValue={this.state.quantity}
          loading={loading}
          name={name}
          onChange={this.onChange}
          placeholder={'0.'.padEnd(settings.tokenPrecision + 2, '0')}
          style={style}
        >
          {(reverseInputs === true && noInput !== true) ? 
            <input />
          :false}
          {(bancorOnly !== true) ?
          <Image src={this.state.logo} 
            style={{
              width:'42px',
              height:'42px',
              marginLeft:'5px',
              marginRight:'5px', 
              borderRadius:'20px',
              border:'1px solid #eee'}} />
          :false}
          <Dropdown
            defaultValue={this.state.asset || settings.blockchain.tokenSymbol}
            name="asset"
            onChange={this.onChange}
            options={options}
            selection
            style={dropdownStyle}
          />
          {(!reverseInputs && noInput !== true) ? 
            <input />
          :false}
        </Input>
      </div>
    );
  }
}
