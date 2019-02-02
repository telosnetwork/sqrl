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

Current 1.0.1 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.1/win-Sqrl-1.0.1.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.1/mac-Sqrl-1.0.1.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.1.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.1-amd64.deb
96cfab43a7c3e2700ad5baa910a4410fb48d6e2dd6ebec4952a6f8ce4f66ab9e2e956fb7faa0d242725ab62d094f7d860232497442c413f86ae7004cab896ebf *linux-Sqrl-1.0.1-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.1-amd64.snap
6315d423385b1f236f5852366619bdaea91c1541f2aa9b8b2242a274fa2e44ae1159170eea31a590e25ff362a3613f420ac4c40aba2dd570c87ea6cfc9ebe543 *linux-Sqrl-1.0.1-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.1-arm64.deb
a7bd810f1e459d5293aae8a81ff4206ac3ed7f3dfafe46bd7592762c04273370778446f42d59ebcf839a4a821b083cf899ebc3cfcc32670ab8cb30f5b48c5982 *linux-Sqrl-1.0.1-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.1-armv7l.deb
520c03c81fb73ec9d9ad3992b267ebd9843b131c53f68ba0a778c25fffa66df5a34c4d66ddc11ee0eb4c5b46f7292546c524ffe77f20ec58c1fd55987e94c581 *linux-Sqrl-1.0.1-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.1-i386.deb
7e01b8e625618f5831df62c507ac997460e418330cbc838ba7ab5a05558f769eb36f8ca3be27522b7c83fd01bdc88981b1867d0dc4002e82f9b2a4ae38d7d568 *linux-Sqrl-1.0.1-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.1-x86_64.AppImage
0fa74a5fe6a261146beeaf711e3f2c43104fe4651fdc9cf34610b4218f6ab1fb00b4f74746e0097aa35b1ebc46c5379c864c07470e4bf49b54ba59aa59254fe4 *linux-Sqrl-1.0.1-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.1.dmg
0e8a904eae572a1d37645ef8a41e26bf46ef7a336e2f1d18fc302d9866c636c50b82219e5410ef78dc55a50871dfb3af25d37e962a552dfe17db64248c50c3b9 *mac-Sqrl-1.0.1.dmg
shasum -b -a 512 mac-Sqrl-1.0.1.zip
8ee3035c081bbb671b3a681ccd711e61d5685aadc71f74073853ccf74968f4139216ab0840ac2c0216fc26c6aac2e98fef0289908ef314e829a3906ba25a447a *mac-Sqrl-1.0.1.zip
shasum -b -a 512 win-Sqrl-1.0.1.exe
966921a4dc604716a608d5fd34a6ec20dad6a479ed9848524bd05d79bfa3ebf77cfcc614e67cbbde481264a227513e23bee5a4e28dd5ffbb71b6d2b7ebd5fa46 *win-Sqrl-1.0.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcVfaBAAoJEDT4ke1a0TzTrbEP/1FmX+lX/RNnwig0C8/cGbHf
1Qxc8uz0yKPDvXLiQxIDl+pBSkbiPoQFlfs2XJebNAncCbk60F92Q86Nd6gMnT4/
R2IOKSVJScyDvbZpI+YMLwhVqRZqfomI97gqkD/0D7WyuEhTkNh7aqH/vaL02QYk
InJ8zmQYSlccVcqLXrISmxSvCS4VM5AMVnd/KfiBR5BRZ1dgXUfVgM58+vri3mT+
H9Mmk/NCJfxGhpm+XB9ysylrNseqj1PTgWbIhCQ349r7lEEJmng1s0y3Gqtq9O61
r7Q4VoWEv4gLh5+lKRq2UtDJg/9myCLA8bT3RgjUo2wuK46r6KTUXYwitp1oa95B
TIMyLPQIYkTbJM9CKJteGGVdNg3dyn7R5f46204nW6II+6gYZatroYb4C6WtXHOX
GrnlAVAFqlZOBgskL0t3gIfkFpJKsGfzBYcdQZTtPFMUOn4H79lbCwGvutDE/8Id
j6eprCwgMBV0YgyNDBZSrNdmyROf11SAxiMTzRWQ7LatEFSdnqI8+ol0YbTXLp4+
mDz+j6OSiVUHciV2Yfp+vUT8nbCc4shd5+s6woPrepnlq18MoTOwUzJh3OpKPTyY
J9FF2fdFCUAiqdQpqovRHJLq0UDAEyV6wlZVIELqOdkWvkWJHMwctBdOVNs6rkxH
9s7mMK02CQVeQr8+txBq
=1gde
-----END PGP SIGNATURE-----
```