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
- **ScatterJS Core Support**: Version 1.0.0 of Sqrl now allows users to sign transactions in web-based dApps using ScatterJS, called SqrlJS. Users of Sqrl no longer needs Scatter Desktop in order to authenticate and interact with their accounts for EOS.IO-based applications.

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

Current 1.0.0 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.0/win-Sqrl-1.0.0.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.0/mac-Sqrl-1.0.0.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.0.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.0-amd64.deb
18b2ea9390e802148af28d1c03114a8388b9a55eba4ef55580deea0eb4149351fe21fdfae919040b291003ba0faaf7d0a5ce0a361a10087177fab6d34fb0a022 *linux-Sqrl-1.0.0-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.0-amd64.snap
ac9809b32507c5a8c8fb039f5b4c4e2a7fea744b5e210b976960e8d1377680ec2b7cfaba0327335c9fe0eaadb089f24e0abd3bcdb44bb3fb1643974ca715c9c4 *linux-Sqrl-1.0.0-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.0-arm64.deb
4d546a4d4f7a78aa8393cbd1be2a95d0c7d2af63ad795d47283294f51745e536789535e73de449036972363c8caf21119f10b9a967617d433517ae1fc618d307 *linux-Sqrl-1.0.0-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.0-armv7l.deb
a9ddf571af8eb7bebae3fc8b6b6c766da8371fd5d388237fe5d6c1b749cb68f6d16977dd01f2a7bf24e4e479bc2833426413abd5bb9481ffbb58ef80ff3de200 *linux-Sqrl-1.0.0-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.0-i386.deb
efa7272ec46097f21ac207ddf9241ac9eebead9b855f05e5169b3c35a6707d827541c3c18475604130596a40c7dde57db3cf18a88612c8f26cb923b21d08d148 *linux-Sqrl-1.0.0-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.0-x86_64.AppImage
db9b6828459e91632786099264bd6da073f1118f3ed64abb29981c0dd6e1495df667c7df5c6b0b1024d089a585c4315a527fa1d6a360ec862622710a1a93c15e *linux-Sqrl-1.0.0-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.0.dmg
70b1ca0cb9a647aef6daee087fcd36ed7b7d852a65cdc982f19368779bdeb0f24bc3d08b717f820c04d13e621ad6ab6c4514c259088d8922b4bafbfead1cafc3 *mac-Sqrl-1.0.0.dmg
shasum -b -a 512 mac-Sqrl-1.0.0.zip
96176dbef9375859bf49f9694f907f26533f3ca169a859d519912ec9d3a166095a19522453e5e6cac15439e19544ca8c049499e834e475889830659927b562aa *mac-Sqrl-1.0.0.zip
shasum -b -a 512 win-Sqrl-1.0.0.exe
08d6e4836b54e3c520d93bbf56a4cbeebdeb2e463060bda9faffe8b1a7fc2d5a27e52e407ee1afe2d77b26d64959b4733240d436b1a13eb5837c014dcc2d93f8 *win-Sqrl-1.0.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcN/CdAAoJEDT4ke1a0TzTkMUP/jDprbi0YkoMBkwbhe5/qPNX
0IShtQjLY/9az8QM2/SENczQhE2SbdKWaRHnaDxOM2REfSq0D4DzTr+2CxIDStsZ
XAiCSKI0ExqMbQYLw/mxpGRmcl2v/ZZRBuZ/fPzN2VAY4AiGm/XgSiSZQsFY72pN
6vAPr3krnM28M2v3jzKzghxSTq7FTcXYLQEHOXMZsriF6Zgl3UOEvsKY0Mhn2RZA
M/dyiKKwcmNOsYZ/jnBbO+U+tfx/huTH3Vkc/nvJQ+DOa0SijokUoHvZgUk2l4Nr
l4H+e3MJaFRo5RvGSfa8M5gKsj75Ez40swiIB6A0cY+Zbx/rM30x7BGWnOlnu0vl
TMT/a/8Wl+bh4bwx7LVqQby97SuVs38tr1TFqDmziNn/RFLMmV91ddGwJog/IB8Z
YKp712iyQN3B6W8kryYUNzFvLPxE+dN6kpNHMl+/MET3O1xuvdRjI7DXrLrv6vIZ
opv5EYUFcKqcqK+6W6SRcMbYVFVQ1iIx2RYxx3//6anL1YBmcuO9O0VO8QsnAyw7
bu7V8mvkRd3UzI7Ey8dEcK3qraPpbCegsbKzjD0dJtxyVkKhHBCEgRB69S7j1O8O
8Ut7XD8V0nt/YMaIfpWZ2a2y9HGVtrA1lCxDjZvLyJmAjO74CfAzR0ylioojm2Vr
GefTy086WwYYgcaxOsKh
=f54n
-----END PGP SIGNATURE-----
```