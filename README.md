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
d3e311c274ebe893f35a78a5143b34c31f22d4069ca9deaa15a9dcbcf7ebcf828c39411e8398cb12c3a7fa6bce9ff4fbd5053b67b938abee32bf458e0fb76277 *linux-Sqrl-1.0.12-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-amd64.snap
89afdbbbea6675af576234dd896ccfdf3c5bfc76a4b9954b9f7dd1721bd02aee40fefa25d715f03ea2dced5043fe0a0df0e658e56079e5ef55c00038d4e76365 *linux-Sqrl-1.0.12-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.12-arm64.deb
a59d775e8d4e4c1fb615ab0b1d3071eb671612f2d4c1462d20419aa9c32e6d9956e9ea91f19b752baef7ba574f38007d8233f08d504342820ca68aaf2bc02825 *linux-Sqrl-1.0.12-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-armv7l.deb
6a77e4c22ae0fc2b23a4edf284d4bc794af86df3262fcf3bbdbd5970af4d4cadc314252724194d30ddf90fa49a4c267573d841588c93552cffaa16ccbdddd8eb *linux-Sqrl-1.0.12-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.12-i386.deb
a05d670491b0eea7b77ffad42278839cc4ce2edf7b4a69a5642603795d3a9e0b4260027c8ea670762d4bdc73697511c0c924206e5463b14ad9c8c1d0068a72fc *linux-Sqrl-1.0.12-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.12-x86_64.AppImage
ec45d8237110ccbce70d9dad3a1070255215714e69c9ee728426d82349f2e4bec25d83c10226f4f63f1514f2f586316f2874fa3a91f1ebb32d732180fc16b60d *linux-Sqrl-1.0.12-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.12.dmg
d8ed96aebb990fbc54f8bcc9c85834a727e292eb6cad71f9862ef5457fca325e8a195ad608c20a9cc4d36b88ecfb72b7d97eaa1f600fbd6c9f853e23f2be5418 *mac-Sqrl-1.0.12.dmg
shasum -b -a 512 mac-Sqrl-1.0.12.zip
bd610479c286850a7a2f9fef1b3b3b75bf9cd66d82c13fa118543999548aa5cb5cebfbd3b3140d5e5b0f0476b7aed2b5cee6bda595c3343c8b52820f9a15428a *mac-Sqrl-1.0.12.zip
shasum -b -a 512 win-Sqrl-1.0.12.exe
e10520d7d90f0e989502b49aa600a03ddcb807b908da100c24abf7448f47df2926ed4fa2f5444d58b8d1d8d9ecc3db1ce1e83b81b060d994a41faebcbb16d65c *win-Sqrl-1.0.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdJighAAoJEDT4ke1a0TzTkDkP/RliLVRo8TnTNVGYTgHRl7iA
QVc8x0XeEnvlM1hVCf0alCysH4q5VHPeNOVDatMYhU5vK2lXaq3q2jOiX+TrKdCM
DhA9LdVZk8XSLomDzIxS3gM7vuMWCzdBlb3TdRPchs9QdcXc21YmvEYvSDOCO7Yf
NqCYPCA4Gy8u/YMOsP1Fm+qD5N53e5n8MibbVdSHdUUGcMwgf+N5N/yr8mwF52Iu
kTG3wItSOFJXYbTGWcTNkw+Q+gxvAOg3LiqBztnah/h56xdZFwfUzI722DSPZwQq
2bAj8N5I2iCKjuHwGm1n3S19cX5zfOqX0BK3AuuRq2AL//qgv3J5MY0fRaRLEyfU
Vcd5ag7uS6MNHhuBZ7mx1DNqKJYhHNgpTrYFFCB8HApNTMQGaEC/9vVMCmqN8O1a
wTLgcM0tmZcWUvpD8xMzEWHKmiwvEFddfjWAvw/btTm2V08CcfK+3GN4tAl6uUac
w2snbP+DzJUGzeqYlfGsgHH+9U2XmAZBFmmTe/I9SS6sVGzCfOoe4YGrEyZ8qCWP
alEVBQ5iAF1jDStESsE8RmhfQRRnAuj/P1t+OjR3CYnX4I9MEjvFeCXuugDjD+dX
RJq8YnLOhwwX404gI4e/TmEFlJFNq/j+LEXK+szEx2CXiblfkStlI68owCDFDTDm
NyndNLy3yjz1TdPJ9/0L
=EppN
-----END PGP SIGNATURE-----
```