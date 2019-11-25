import { get } from 'dot-prop-immutable';

import * as types from '../actions/types';

const initialState = {
  // If the active session has accepted the EOSIO Constitution/Network Operating Agreement
  acceptedConstitution: false,
  // If the wallet has ackknowledged understanding the smart contract tool
  acceptedContractInterface: false,
  // Enable advanced permissions management
  advancedPermissions: true,
  // The loaded account
  account: '',
  // The block explorer used
  blockExplorer: 'bloks.io',
  // The current blockchain
  blockchain: {},
  // Support multiple chains
  blockchains: [
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
    },
  ],
  // WAX chain
  autoRefreshVote: false,
  autoRefreshVoteDate: '',
  autoRefreshVoteDays: 7,
  claimGBMRewards: false,
  claimGBMRestake: false,
  claimGBMBuyRAM: false,
  // The loaded authorization
  authorization: undefined,
  // List of contacts
  contacts: [],
  // Custom tokens the wallet should be tracking
  customTokens: [
    // Always track the contract for the core system token
    // actual token symbol changes based on current chain
    // todo: move to github json format
    'eosio.token:'
  ],
  // Defaults to displaying resources remaining
  displayResourcesAvailable: true,
  // Default filter spam transfers to false
  filterSpamTransfersUnder: 0.0000,
  // Default to Ledger import process
  hardwareLedgerImport: false,
  // Enable hardware support for Ledger devices
  hardwareLedgerSupport: false,
  // Default Idle Timeout
  idleTimeout: 999999999,
  // default IPFS settings
  ipfsNode: 'ipfs.telos.miami',
  ipfsPort: '5002',
  ipfsProtocol: 'https',
  // Default language
  lang: '',
  // Mirror cast votes before voting on proposals/elections
  mirrorCastOnVote: true,
  // The node to connect to
  node: '',
  // Recent contracts the wallet has used
  recentContracts: [],
  // Recent referendum scopes the wallet has used
  recentProposalsScopes: [],
  // Show available network resources to user
  showResourcesInWallet: false,
  // Allows the UI to start with only a connected node
  skipImport: false,
  // Allows users to go to link directly (without passing through DangerLink) when set to true
  skipLinkModal: false,
  // Window State Management
  setupData: {},
  // Use SQRL tokens to pay for transactions
  useSQRLtoken: true,
  // Wallet Password Validity Hash
  walletHash: false,
  // Wallet Status
  walletInit: false,
  // Wallet Mode (hot/cold/watch)
  walletMode: 'hot',
  // Wallet is Temporary
  walletTemp: false
};

const validSettings = Object.keys(initialState);

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_WALLET_HASH: {
      return Object.assign({}, state, {
        walletHash: action.payload.hash
      });
    }
    case types.WALLET_REMOVE: {
      return Object.assign({}, state, {
        account: '',
        walletInit: false,
        walletMode: 'hot'
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS: {
      const recentProposalsScopes = [...state.recentProposalsScopes];
      const scopeName = get(action, 'payload.scope');
      if (!recentProposalsScopes.includes(scopeName)) {
        recentProposalsScopes.unshift(scopeName);
      }
      return Object.assign({}, state, {
        recentProposalsScopes: recentProposalsScopes.slice(0, 50)
      });
    }
    case types.SYSTEM_GETABI_SUCCESS: {
      const recentContracts = [...state.recentContracts];
      const contractName = get(action, 'payload.contract.account_name');
      if (!recentContracts.includes(contractName)) {
        recentContracts.unshift(contractName);
      }
      return Object.assign({}, state, {
        recentContracts: recentContracts.slice(0, 50)
      });
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case types.RESET_INVALID_SETTINGS: {
      return Object.assign({}, validSettings.reduce((o, setting) =>
        ({ ...o, [setting]: state[setting] }), {}));
    }
    default: {
      return state;
    }
  }
}
