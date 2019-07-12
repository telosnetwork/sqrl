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
- **(T-)REX**: Sqrl allows you to participate in the Resource Exchange system, or REX, for any blockchain that supports it. REX allows you to lend your idle CPU and NET resources to the network for others to use while you earn interest for being a lender.
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

Current 1.0.12 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.12/win-Sqrl-1.0.12.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.12/mac-Sqrl-1.0.12.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.12/linux-Sqrl-1.0.12-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.0.12-amd64.deb
00890e6992f0ce0e674e436a401effd68ce0025b85fc503e1816197b30b3ffae40fea64dc317a656310d721c0821c466f6c71f55cb5e3347c06ce41c293306ff *linux-Sqrl-1.0.12-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-amd64.snap
d433e58e85f4ffe52d1ddc4e9bc558a6485226f127b57f7745d96a083cb4baf01c242c33f452ce21aae09260c4d8590f445d86eec105c76d1f15d1b9e28dc1d0 *linux-Sqrl-1.0.12-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.12-arm64.deb
7534c645d65986f4bc507fa9a02c1ae9eb8b87c31abb8369fac57d45d8a4fc5d9bb1afa10eac6da0b2dfb76c71965d2ef0894bc1f65d3063b7b6ceb844bea3c4 *linux-Sqrl-1.0.12-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-armv7l.deb
9c161c761970a9493e6d8c384c0b73d729a0545076b6eb0fbe03c72aff3ca723e434689376aafb708ef89ef211b8ac13745c2adfb53626aa35e2b75838bd544a *linux-Sqrl-1.0.12-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.12-i386.deb
836eb778a824a31ba0f7cb66d0ee4ae4b576632e644da800adf6d2299185501d5f5cf94e5b2c153d8c2a21ec1a0e63f6932ed1778cb2983fe7177095825d762e *linux-Sqrl-1.0.12-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.12-x86_64.AppImage
0d642d4f8cce97a8f26370c87fe73026b8649718d0339b63f1810b6a62a4e3a30ce07e5f70e62f5d99df93a6be00fb7fdc0ab3c35cbdc5a200b656342e4e29b3 *linux-Sqrl-1.0.12-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.12.dmg
cff51a6652f44ef537694b5e92e029b859809e8861087c66da5cfb859bd151fe38946af9ca4a2161a4f634a66c3fe0050bd5dbb4d2c6895947ed655295c16ab0 *mac-Sqrl-1.0.12.dmg
shasum -b -a 512 mac-Sqrl-1.0.12.zip
ca7e199cbc6b307913745afd04e094c79f3c2deeac58ca13fc017d84c62c4dbf8b4afc2497d3ce8312f22b67fa4514c49d868ea533628ede5603c5d74d7ab953 *mac-Sqrl-1.0.12.zip
shasum -b -a 512 win-Sqrl-1.0.12.exe
c57163c860a56d4311f0df34a9b019c19e9eb25677500e5d94bcbcf306fac3e9ec04a3f5ae10b9fea17ede48d1644fb9d15d5dd835e3fd94e0545dbfa4fff4ff *win-Sqrl-1.0.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdKPhEAAoJEDT4ke1a0TzTrWUQALAtls/IL82BRc9e7zufSSxc
w34ayohxG4t+cOyRNm9riSz4d3UmRivfJqIdynrP8ZKh4H4WHaoJjOcljZOHgOj/
21YuFbJKvL93wGSm/Xaphr6e2UGOpkxf+cVGeyvWgzgkPCFVjakbCV6uc7eH+a+M
EmZqgjM0ZcYUNMEgX5XjZ4Vos3lkHlIElfq0FQSgngBcmDCGA1iWFCwpa80ZTo5U
qD/FX7N/iF1XTK3Ex8lyw5R1innXxFpxjESMH6esfAGd6neJCIsT2COXTpnyr6il
4huSSR36AE944vIp2ZpIGi8awvh67vNBi32BNz74amsJPKV1tuZiir9f4zkYZEK6
nRM7o/X3kJWLQccLQXIBIit96X0sakDeqiswEnAvZY05NB/Ze8hLoERN0OgE/nfL
q0S2suCzUIc96YgUhsBztFLxYsE7qHx4BchmNLgqUDH2KweTsXScksPBvg+9w1QN
vaqJsmPj8SqeMlefnxPe9P/GqVn9swDByDTxnvNybLOIjZdcv3OYAQP1TZ6HIv/w
JfgAlk4XyQgdPrvF7NjHPUXKwzAI3xd+Qdehb9yp/LilUT2K7uwZvYOHdwNI/xIP
qhbxR8UqtRCrl3tJYQf4pSLnDnOXg4hPbW2DvBkfgLrpEhIvUkGhqLh4N3nA1Z6R
AxJT2XHiYBp7f+8l3HdR
=O4HD
-----END PGP SIGNATURE-----
```