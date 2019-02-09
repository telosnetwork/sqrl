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

Current 1.0.3 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.3/win-Sqrl-1.0.3.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.3/mac-Sqrl-1.0.3.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.3.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.3-amd64.deb
78dc532264fa2aed889d7a0cab0cddb878910b2f1f6f6fbade563a8c9034fa6d9e11f8ba3352315be08056761b2ebd77eba9ff7df8c58a88154736e5e6ebdea3 *linux-Sqrl-1.0.3-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.3-amd64.snap
dc6ca381115b65ecaa1e7148385f320630608df377f09fc4745ba7158ab4833fd23930474fc3f310209386e0a31683efbd260b88799a0c013f0b56348ecd3d9c *linux-Sqrl-1.0.3-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.3-arm64.deb
b7f619e09bf7816a07a4690621bbc8a3fd3411def43aad9cdbbebdf9f23f74e1355be8279ba152b01cdaee752ade33453e3102136b48e60e3935024b22a36cd5 *linux-Sqrl-1.0.3-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.3-armv7l.deb
b02a397c658b6b1bd48098f4c81ea05559033b9a10935c232739aa4dbc3b639b7d5beb4ca8e90eb520305ba0a0573a734d95cd77f5c6912e3db65d63d6110a43 *linux-Sqrl-1.0.3-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.3-i386.deb
3a5a0106077e55300acbdd561df397de6b0997c55da77b2fa61a6184481388a734813ed3594f2517008178d47cc1344d9e0b7559fcf0f855aa7303b38a6a584e *linux-Sqrl-1.0.3-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.3-x86_64.AppImage
8e5272c79a716912ca5e44487bf4103a6ccbf66e089b458ab6687b887254ce5db14a8b4825c49a56996efd46827855c3244fafbd4d1a26e136285746730e7a68 *linux-Sqrl-1.0.3-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.3.dmg
49649000917ab9faca0ae778f7641a61a7c85ddcbf1a9495cd00a0b0254e1caa34cbfe67ea82844490756d98f1bf89d9886a0843bc0257c1dac045e4586e929d *mac-Sqrl-1.0.3.dmg
shasum -b -a 512 mac-Sqrl-1.0.3.zip
da8c6fe4a877b426e1e4e36849d63ffea9e1c2dd6f2be8b3fb06ec2ea4efadacb23a2c8be347bde56f5df09055a1f6b36dd29feb0093ef7f1c606937ba3cfbcb *mac-Sqrl-1.0.3.zip
shasum -b -a 512 win-Sqrl-1.0.3.exe
cec1cf3fce3e459ed5978140e96597f2ae98db3c89ae7679d2ea32740cc6c334475c233cd978259b01b28a6455a2151a4d12dd1f97640688df9e29cd6664ff10 *win-Sqrl-1.0.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcX0z3AAoJEDT4ke1a0TzT9XYP/2vFiCk2Amie3NL+y358Pvhf
K5ndQL0J6T5P5ocZNOE8PedT9C4q2KBDWDe2ujn9IVBKdICGr3KY55L0yi2oAVHb
5Gfp6Up5SiwEK47U9eIdW/R+3ZQ90kKmTZsnmU5U8ODHYDvCR3pCHf6nGwCfrdmz
U3I0vlnZOnmKqbQ3pJv/BXu/TMwOi7wgwS+UVBaIbCuEhRfvNDp3MWjZmZ/VqN+8
q5N6mQWXaYZc6ere3n1++dvHFXChL8JG3XEXCHemKeS2AgcDgaDOCxK93Uef4NDx
kb2qG1TLucCKc2hZx8PuRc0qzbDZbdOVJy4CgA+fWGP1GXy3/uULPnpyC2dFcv30
7mZG9SGPeqtOlKjzXhLJoIYvsxXfCqjJ0KBG4nKGiZwD8PW64L8+2LMzIJBLUhZQ
eky/JN9A1Hcip7/ZrvPL0CZThcCJLKKHY2VR80Jc2hBGlAlAESJFxi3yxYmiB8rS
vilOAX/njp3XfxnV1+4Ub/tJqvLe+RDMZ5ROpZLu9saZCXeNSvlnK0eh7ck9gW5G
p4evlbNI0q4e73JndS8GX781izUx/J0l8dFA++3G4bgNBLTaohygYrC8N4yKAlFj
9Ee+/7J4fhUexKMZLuCHQdZ7zPz1uUu2uFO/jJkJLeuJjwxrrjnBjqqrKAW2Y1jm
SQ0V2pBcyeSzFH7jzwdG
=/fCw
-----END PGP SIGNATURE-----
```