[![version](https://img.shields.io/github/release/Telos-Foundation/Sqrl/all.svg)](https://github.com/Telos-Foundation/Sqrl/releases)
[![issues](https://img.shields.io/github/issues/Telos-Foundation/Sqrl.svg)](https://github.com/Telos-Foundation/Sqrl/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/Telos-Foundation/Sqrl/total.svg)

[English](https://github.com/Telos-Foundation/Sqrl/blob/master/README.md)

[![Sqrl screenshot](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/app/renderer/assets/images/sqrl.png)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/app/renderer/assets/images/sqrl.png)

# Sqrl - Telos Full Wallet & Governance dApp

`Sqrl` is a fully functional wallet created by [Telos Miami](https://eos.miami/) for the Telos blockchain that supports any EOS.IO blockchain. This application can be used to connect to a remote EOS.IO API endpoint to securely perform numerous wallet and governance functions.

[![Sqrl screenshot](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/Sqrl.png)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/Sqrl.png)

### Features

**NEW FEATURES**:
- **IPFS Storage for Key Documents**: All interactions with key documents in Sqrl, such as the Telos Blockchain Network Operating Agreement, are uploaded and retrieved from the InterPlanetary File System (IPFS).
- **Create Worker Proposals**: Sqrl allows you to create new worker proposal requests on the Telos blockchain. You can also participate in voting on existing worker proposals.
- **Register and Vote on Arbitration**: As the first EOS.IO chain with real on-chain governance support, Sqrl allows anyone to apply to be an arbitrator and voters to elect arbitrators. You can also submit claims and go through the arbitration process using Sqrl.
- **Ratify / Amend Governance Docs**: Sqrl allows you, the voter, to participate in ratifying and amending the Telos governance documents. Let your voice be heard!
- **Works Across Chains**: Sqrl is the first wallet to add support for managing any EOS.IO blockchain in a single interface, such as Telos or EOS.
- **Free User Account Creation**: Sqrl provides a simple wizard that allows new users to create their first Telos account on their own.
- **ScatterJS Core Support**: Version 1.0.0+ of Sqrl now allows users to sign transactions in web-based dApps using ScatterJS, called **Login with Sqrl**. Users of Sqrl no longer needs Scatter Desktop in order to authenticate and interact with their accounts for EOS.IO-based applications.

**CORE FEATURES**:
- **New Key Generation**: You can use Sqrl to generate new EOS.IO public and private key pairs.
- **Block Producer/Proxy Voting**: Select which block producers to support and cast your vote. You can also register/unregister your account as a Proxy.
- **Token Transfers**: Transfer TLOS, EOS or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your TLOS or EOS as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Buy/Sell RAM**: Use your TLOS or EOS tokens to buy or sell RAM at the then market price. RAM allows you to reserve or release storage space on the Telos blockchain.
- **Create Accounts**: Sqrl allows you to create new user accounts in Telos and allocate RAM, Bandwidth or CPU.
- **Simple Contact Management**: You can create a contact database for the Telos accounts you interact with frequently, simplifying the process of sending/receiving tokens on the network.
- **Interact w/ Smart Contracts**: If you would like to interact with smart contracts directly, Sqrl allows you to lookup contracts and call methods defined in the contract's abi.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Cold Wallet Mode**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get Sqrl

### Releases

Current 1.0.5 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.5/win-Sqrl-1.0.5.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.5/mac-Sqrl-1.0.5.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.5.tar.gz)

The latest release will always be available on the releases page of this repository:

[https://github.com/Telos-Foundation/Sqrl/releases](https://github.com/Telos-Foundation/Sqrl/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download the DMG (`Sqrl-***.dmg`) file.
- **Windows User**: Download the EXE (`Sqrl-***.exe`) file.
- **Linux User**: Download the Source (`***-.tar.gz`) file.

### Security: Private Keys

When using `Sqrl`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/Telos-Foundation/Sqrl/blob/master/app/shared/actions/wallet.js#L8).

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/Telos-Foundation/Sqrl/blob/master/nodes.md](https://github.com/Telos-Foundation/Sqrl/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/Telos-Foundation/Sqrl.git Sqrl
cd Sqrl
yarn install
```

Then either:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone https://github.com/Telos-Foundation/Sqrl.git Sqrl
cd Sqrl
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Telos Miami](https://eos.miami) team for the [Telos Foundation](https://telosfoundation.io) in an effort to let stakeholders securely manage their EOS.IO-based tokens (TLOS, EOS, etc) and participate in the governance of the Telos blockchain.

`Sqrl` naming credit goes to [Douglas Horn at Goodblock](https://goodblock.io/).

`SqrlJs` + `styling` support provided by [Amplified Telos](https://amplified.software/) development team.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [eosmiami on keybase](https://keybase.io/eosmiami)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-Sqrl-1.0.5-amd64.deb
6148ff364081d8d993d63eda742da51d3c0f8a62898376006b93be6021b4e4ab1b9c6d7df2d9e919765b885136b12d09be35fc97fe6516e88ad34eaf44cadff0 *linux-Sqrl-1.0.5-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.5-amd64.snap
d0daa46f06a094047ff413527baad4105b783fccb26d77fbce3af2081d3852cba38e737dde4de51b96010aa299a76655e7284a5c689c7b8266b80c6c80223650 *linux-Sqrl-1.0.5-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.5-arm64.deb
74b585423f633dd62aaece5a78fad52d53201565f745ea7f86e66e3ba2fdc9a9ca5911f3fbb4aa9673e0704c8a2dae4fe5765f556934ca1a576651ae20fac038 *linux-Sqrl-1.0.5-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.5-armv7l.deb
90168d9464743c76ab6d265b502e50efa45ceb37682ddc78aeb62e1bf1013e6d3ede9e315f7a9c0e99db7ff7d647496734582fe1f10d2c9202c2f1617e86ea07 *linux-Sqrl-1.0.5-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.5-i386.deb
1df4ece2d43fdb043f141c1ee265c14eeb7cfe8d024546a80def558080d3352623dd27426548e8332a3ff11f8fc94b57339faf33faa76d9f9669d492dfdebaae *linux-Sqrl-1.0.5-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.5-x86_64.AppImage
b2db7b18c5f66bd094f2ff4100195dabf045ad436a4b896e8c4f8a044c372c164ffd6e39e04a24f142de2d98909c959ac2a302b884f26312a2de4dd301949d90 *linux-Sqrl-1.0.5-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.5.dmg
05fd233ce8e60a34b5a53ba44ad5a8bae56ba67d7bdc623001c3113140edce78c68dd7c221dee8769db2a08d022067e7c07247e458ea2011b21425c413e3f0a0 *mac-Sqrl-1.0.5.dmg
shasum -b -a 512 mac-Sqrl-1.0.5.zip
c5fa082d276ca37ec991bacbfcff8c8f0e7b05a76aaa2140cfad40d53ebf5b37e3e8107d3c02215979169189732e236f43e22fe3211554a2a669cdeea441cfe8 *mac-Sqrl-1.0.5.zip
shasum -b -a 512 win-Sqrl-1.0.5.exe
835f85e5032eff9280e6d32d3ce0075ecc749c775f656a17ac0f7ceaaf4fb715315d7ee72d2f859c7e71cc1b050a47667a6489347f2a9d4b280def5323a3c435 *win-Sqrl-1.0.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJceZHzAAoJEDT4ke1a0TzTxtQQAItopmz6D+UOYkQaHtKtIAmU
VfoPEiaq3h6qpLIGn73SPmfmefeje9Y9uB6HO+uyWqSu5YsKy9uKSs/v0UYgmWsY
D2yfdyEWLDhTLV85Fhmom9INsgScXN68+JO5+BoGhKwHUq/NsEDmeqPDpIjZt7+u
zMhsyh8uGMMw+K1dLYqEe1a7dJnyW311eqxHIhFlRVeiGi+lSQhRRjG8vUlh8MLh
S0AVoIMuXtFzhqsUsnlzjDiSxV/P/QnfsrL7TtKXM8I+VzDjnT32zLE18hpr8pPj
HDYcNtkoMYYWjyUedM4xlRk8zYyXEqYXMv24SwpcwPh37B3pFltmGcBSSKhicEDR
0Axoos4budiDKH0a/mL+Ec3mEgSOKyJPBxM75wALCtsXIDMrKImZ1tmeFqlvQ9CW
zHwDkF4dHNziegbFhSNSilIyImFAIM/MzOb/DfRlUgSuwX7oHaw26Fnc67G8mnoW
JFSz1mxvUpeKvZqE0/g1tVReg7LHwBvz3k8GRp1Kuzkp4D3LiR+YnAT3dAnYsM1V
j3qVQIGlqW3NC5fSc/diQNrqL2a7WLmlWALzAGZ8u6CLnBZ7lxxHCg4hiMNRySY5
WuJWazUbBN321fXn3pPWITRKbYhRma2bE2Zdw0GU4DCnYjyf48NKTPxTnnbts/6L
7ozbSGGjNCNC8/DT+3xw
=Tjab
-----END PGP SIGNATURE-----
```