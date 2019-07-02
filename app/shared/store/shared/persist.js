import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

const migrations = {
  /*
    2 - Wallet Migration

      - Creating a new `wallets` parameter that contains all wallets you can swap between.
      - Migrating the `walletMode` from the settings/current wallet into each individual wallet.

  */
  2: (state) => {
    const {
      settings,
      wallet
    } = state;
    // Create a copy of the existing wallet
    const existingWallet = Object.assign({}, wallet);
    // Replicate the wallet account and mode from settings onto the wallet
    existingWallet.account = settings.account;
    existingWallet.mode = settings.walletMode;
    // Update this individual wallets version
    existingWallet.version = 2;
    return {
      // Update the existing settings + wallet state
      settings: state.settings,
      wallet: existingWallet,
      // Create the new wallets state and inject the first wallet
      wallets: [existingWallet]
    };
  },
  /*
    3 - Wallet Migration

      - Ensure the customTokens field is set with the base token 
        contract. Will set base token dynamically based on selected blockchain
      - Configure default blockchains

  */
  3: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.customTokens
      || !newSettings.customTokens.length
    ) {
      newSettings.customTokens = ['eosio.token:'];
    }
    if (
      newSettings.customTokens
      && newSettings.customTokens.indexOf('eosio.token:') === -1
    ) {
      newSettings.customTokens.push('eosio.token:');
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  4 - Wallet Migration

    - Correct format of all customTokens

  */
  4: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      newSettings.customTokens
      && newSettings.customTokens.length > 0
    ) {
      newSettings.customTokens.forEach((token, idx) => {
        const [contract, symbol] = token.split(':');
        newSettings.customTokens[idx] = [contract.toLowerCase(), symbol.toUpperCase()].join(':');
      });
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  5 - Settings Migration

    - Add recentContracts array to existing settings

  */
  5: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.recentContracts
    ) {
      newSettings.recentContracts = [];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  6 - Settings Migration

    - Add contacts array to existing settings
    - Add recentProposalsScopes array to existing settings

  */
  6: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.recentProposalsScopes
    ) {
      newSettings.recentProposalsScopes = [];
    }
    if (
      !newSettings.contacts
    ) {
      newSettings.contacts = [];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
    7 - Chain Migration

      - Support for multi blockchains

  */
  7: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.blockchains
      || !newSettings.blockchains.length
    ) {
      newSettings.blockchains = [
        {
          blockchain:'Telos Mainnet', 
          tokenSymbol:'TLOS',
          node:'https://api.eos.miami',
          chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11'
        },{
          blockchain:'Telos Testnet', 
          tokenSymbol:'TLOS',
          node:'https://testnet.eos.miami',
          chainId: 'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3'
        },
        {
          blockchain:'EOS Mainnet', 
          tokenSymbol:'EOS',
          node:'https://eos.greymass.com',
          chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        },
        {
          blockchain:'Jungle Testnet',
          tokenSymbol:'EOS',
          node:'https://jungle2.cryptolions.io',
          chainId:'038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
        },
        {
          blockchain:'WAX Mainnet', 
          tokenSymbol:'WAX',
          node:'https://chain.wax.io',
          chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
        }
      ];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
    8 - Chain Migration

      - Support for multi blockchains/ipfs

  */
 8: (state) => {
    const {
      settings,
      wallet
    } = state;
    const newSettings = Object.assign({}, settings);

    if (!newSettings.blockchain || !newSettings.blockchain.node) {
      // The current blockchain
      newSettings.blockchain = {};
    }

    /*if (
      !newSettings.blockchains
      || !newSettings.blockchains.length
      || newSettings.blockchains.filter(b => b.node==='https://api.eos.miami:17441').length > 0
    ) {*/
      // Support multiple chains
      newSettings.blockchains = [
        {
          blockchain:'Telos Mainnet', 
          tokenSymbol:'TLOS',
          node:'https://api.eos.miami',
          chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11'
        },{
          blockchain:'Telos Testnet', 
          tokenSymbol:'TLOS',
          node:'https://testnet.eos.miami',
          chainId: 'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3'
        },
        {
          blockchain:'EOS Mainnet', 
          tokenSymbol:'EOS',
          node:'https://eos.greymass.com',
          chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        },
        {
          blockchain:'EOS Testnet',
          tokenSymbol:'EOS',
          node:'https://jungle2.cryptolions.io',
          chainId:'038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
        },
        {
          blockchain:'WAX Mainnet', 
          tokenSymbol:'WAX',
          node:'https://chain.wax.io',
          chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
        }
      ];
    //}
    
    newSettings.ipfsNode = 'ipfs.telos.miami';
    if (!newSettings.ipfsPort) {
      // default IPFS settings
      newSettings.ipfsPort = '5002';
      newSettings.ipfsProtocol = 'https';
    }

    // Create a copy of the existing wallet
    const existingWallet = Object.assign({}, wallet);
    // Replicate the wallet account and mode from settings onto the wallet
    existingWallet.account = settings.account;
    existingWallet.mode = settings.walletMode;
    // Update this individual wallets version
    existingWallet.version = 2;

    return Object.assign({}, state, {
      settings: newSettings,
      wallet: existingWallet,
      // Create the new wallets state and inject the first wallet
      wallets: [existingWallet]
    });
  },
  /*
    8 - Chain Migration

      - Support for multi blockchains/ipfs

  */
 9: (state) => {
    const {
      settings,
      wallet
    } = state;
    const newSettings = Object.assign({}, settings);

    if (!newSettings.blockchain || !newSettings.blockchain.node) {
      // The current blockchain
      newSettings.blockchain = {};
    }

    if (
      !newSettings.blockchains
      || !newSettings.blockchains.length
      || newSettings.blockchains.filter(b => b.node==='https://api.eos.miami:17441').length > 0
    ) {
      // Support multiple chains
      newSettings.blockchains = [
        {
          blockchain:'Telos Mainnet', 
          tokenSymbol:'TLOS',
          node:'https://api.eos.miami',
          chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11'
        },{
          blockchain:'Telos Testnet', 
          tokenSymbol:'TLOS',
          node:'https://testnet.eos.miami',
          chainId: 'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3'
        },
        {
          blockchain:'EOS Mainnet', 
          tokenSymbol:'EOS',
          node:'https://eos.greymass.com',
          chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        },
        {
          blockchain:'EOS Testnet',
          tokenSymbol:'EOS',
          node:'https://jungle2.cryptolions.io',
          chainId:'038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
        },
        {
          blockchain:'WAX Mainnet', 
          tokenSymbol:'WAX',
          node:'https://chain.wax.io',
          chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
        }
      ];
    }
    
    newSettings.ipfsNode = 'ipfs.telos.miami';
    if (!newSettings.ipfsPort) {
      // default IPFS settings
      newSettings.ipfsPort = '5002';
      newSettings.ipfsProtocol = 'https';
    }

    // Create a copy of the existing wallet
    const existingWallet = Object.assign({}, wallet);
    // Replicate the wallet account and mode from settings onto the wallet
    existingWallet.account = settings.account;
    existingWallet.mode = settings.walletMode;
    // Update this individual wallets version
    existingWallet.version = 2;

    return Object.assign({}, state, {
      settings: newSettings,
      wallet: existingWallet,
      // Create the new wallets state and inject the first wallet
      wallets: [existingWallet]
    });
  }
};

const persistConfig = {
  key: 'Sqrl-config',
  version: 10,
  migrate: createMigrate(migrations, { debug: true }),
  storage: createElectronStorage(),
  whitelist: [
    'settings',
    'wallet',
    'wallets'
  ]
};

export default persistConfig;
