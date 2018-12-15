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
- **Free User Account Creation (coming to mainnet soon)**: Sqrl provides a simple wizard that allows new users to create their first Telos account on their own.
- **Works Across Chains**: Sqrl is the first wallet to add support for managing any EOS.IO blockchain in a single interface, such as Telos or EOS.

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

Current 0.5.4 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.4/win-Sqrl-0.5.4.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.4/mac-Sqrl-0.5.4.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/0.5.4.tar.gz)

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

shasum -b -a 512 linux-Sqrl-0.5.4-amd64.deb
8c44f7188968aa4c93d5e414590605ae3f29a202a3b8feaa258d885b59929c85a17a4caec2e8ddc24feb390943711a7fc5f853cb1d71af58ccd26b2824f73604 *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
2b55afda7d91583d6b783630baca9e900f96e0805f223bc27b9a649005ac874099766a83aa92d941f9b21f93e9149d4b22d2ca4a4e0aaebf478c0a881eecfa66 *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
8389f88553360cdb3c527c090bb1f4dd05f656b7479e5f5f8c7ad6df3f7f278df75bb8a69e90a31d64a6d4c77ced0f7f2a5843f957a4b0187665a69fd9144d23 *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
6530a8831cac2731ac5688226d626ed404e867a4ef2839ad31f7e09285f1dd87cbf62092d7fd9edda97ca56352b3df986cea6faa2d20da8f466b59b9d2f11034 *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
9e46b4bd8fc719baa6496c6913de9229ccf1238bda4e66c1291c21b6624e6cbe25531ea74f6dc56a26a8616771e077d0e1231a5e32ff4db40d20f784c2f82002 *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
9af2a4013a57b2419359fe6b75a8eea5ae202f9ad59168e0396b7a086e588b6ea9563765bcc0f2a2a510e01b9ab10e1cdfa2a8020b5146b696e1fd381664e2a6 *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
fbf28641719a981a2255f89ef30ff444c96b87485001042389e0459f37fe046bb7f2b3a68bcbb0bc236cc4221cd537e4995c2129c13125c34fa9739e9acf8114 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
f76967f8cc2e991ef47d312680ca7ca74949a271d7c2af0b5f5e2e1c98b7918704255bbae2ef2ef4807f93d837a0c9c14162f0365dd3911d86492de5f9ceb319 *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
41c388c9c50dcebd9c5c9032238deb0f998b950121c646284bce1df0df902d1ecfa111910a825d06070cffad4ace22df6c4c4dbbb76eb3cbd768b11bc270f3d7 *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFFrhAAoJEDT4ke1a0TzTZRUP/3Gnmgp93BIBdqeI7g8dNWGD
yMQsMe/ozgR3bn0aFgrLkqWNe0TimISOfX4lIov2A7hXa+YuCkq+e1Ao85tqp6QE
yT6UqvXx2atcuyZ8LYlkcREhVjkBbIAmEutq4q8AXrhZyOnNUi+GiRw3nDCIEQLM
VXrJWiGnasMmw2X18xtRiiPqhzHe1tyeex2je9zCweCShFLWW5xjn+dRZcbpbEol
RHFgglpeDy96ILzk9Atv6T1sm3caNk/kEYAh/SmyFm03kXW0U5XFA+np3BskZV7o
SSyRtq30YUl9nwoohn3mCVclCMWjZd7nN4PufM0/bwBsVkfHc3BE6TmBZNvHrAW1
Fs2gsIIv3B/vhB+FYVFJLEEgM1P7TONmIAyFOYmIpLy8pG5a11dYnAI9fMa/gKHL
EpV6L2QcX+EvG0fmlVXxHJKxT5/3v2MsYuvbWAJiW29yIJXFjW3nulcWfZrIwfk/
nlkTBaPC3F3I5O020HvpCCntwcXFZ7Y19dCg3CX/OsUw4q6pASBbEGYAUli4P7cx
6zFbuKU8kLps/z7xDjMqaZz3py4EyR/PUx7fsddYE1c4BjN3Im8bKslaGAX1CmtC
sXBpKPdzoB2BvSxwC/A1x4j1HJVCbM8PM/m8Sunxts8pI+18M18aJ7HTeqUbHuRy
IXRpZqtp5osu8fa6gIte
=F10O
-----END PGP SIGNATURE-----
```