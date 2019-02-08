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

Current 1.0.2 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.2/win-Sqrl-1.0.2.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.2/mac-Sqrl-1.0.2.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.2.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.2-amd64.deb
1744d501d78d630bcd6cf2721a2e6c9206956e54ac51390726918c2e5034b8ecf48bf2e69d051511346fdf2d9d5b6335e3d0ed111e6143ec75a89b57f824f02d *linux-Sqrl-1.0.2-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.2-amd64.snap
f68e531618036710af4866de7a240ae53cde960507e10a5802f9a0f81184f4c7e15da7e0f729ad66f1b2f06d52c2070525fc3fc9fd99c3baacd6386c1693e8a0 *linux-Sqrl-1.0.2-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.2-arm64.deb
835e5f262afb8b630a467cc452ef6ae199d9cafd29fed05bb384744b55ac6e59abbc62a303207c95ea0e5d12f0119656b9587b5effaf64f0ef4eea9f9fa967bf *linux-Sqrl-1.0.2-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.2-armv7l.deb
51e38736b8f9a0bc86c9f5bf6340d22e9dcddac8ec518770bc510e31950388f52f8372aaf17ac82fd8502fee978eec380a056cd50790dc1c7b35e1666d7bf12a *linux-Sqrl-1.0.2-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.2-i386.deb
a9d357a13496be1bd23d01e4e235dc29692400b11df9f3ed1ac87b45449b20a9f97d7704020b50ff341347c708628a7f06c018a185614faa91770abddc5e1322 *linux-Sqrl-1.0.2-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.2-x86_64.AppImage
fd8acfdeb0ca1ced2094dc8fab3367338c4713be43b8a793645c6a7c595d47403640efa189ea20472541b55fee16f44b2b7cbe7b915890a3064674713957d44d *linux-Sqrl-1.0.2-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.2.dmg
8e4c952e9700e1d15c88705d8bf0d05700a11c7227da2fe1b5fdcdc92f1e13d303194e5279de9570baf7647402a460793c22072e44242189804113fcecd82a4d *mac-Sqrl-1.0.2.dmg
shasum -b -a 512 mac-Sqrl-1.0.2.zip
b340476e329043028f03b8fb9bc8d5b7ba527cb423f2fd87305f820a0f98648dfd651abf5292dba6682171f255f6c60a9d28f0be84d5790ab0cd28a376b3b7b6 *mac-Sqrl-1.0.2.zip
shasum -b -a 512 win-Sqrl-1.0.2.exe
fdd85de2fa1f2c464c16a7767b2983565a79d1f618cfb525b6d99f7e75277c3074675925df5de3022ef8fa2bbc7c4de3455b8b60ea174ad997e127614db3ba56 *win-Sqrl-1.0.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFbBAABCgAGBQJcXNQjAAoJEDT4ke1a0TzT3R8P92788V0Rlk7AlCd6BS+JWoy2
2rRwO1fwX0mkiheCD6x0Cs7ep3yiIaIdHkea5Z2jHRdjX0cuC3XDGTFHDgFacSvZ
Dw28cvKXcvqTYiaHxX6QiMu/RdVeLIeeTbM2v3hUuD0mtZP5Dn7OgcxuR2ZFYYxt
MK8ImaOqmMCqM/GlFH9Mg7MIqkHIhPG6Fy+WHsdKTlHuFcY92+vdq+jvy1b+pzsk
8oQ/Y4M27W/Cxz0khwa4cO0xf4+3Hv9tkpM/XeLRK07ylAvztW90/Pq+424pnM3j
klyOQULjNbKlAAs8BqIVA9DWwmMMvTcSW56wvNWSk0GZZGfGHTgKKcyLnZRbIwZt
manwM40Y8qwFkfV9YYM/Tm03v5uWWQoJaT+cjQwJd2wUNlZf3M9NrgUjQGaRmkC5
XlFIpJyiz5Tuv5eEz4j5PnBrLGLOKBhrZAMCUMWXYK7+Jb9/Jb37cf+Pzc3muF77
Lz27YeriuD4nafNxzbe/Xo3Vnbl/8kyEXIwP5+L3841XTFtTk/IviY9UjXv1Md0U
HRC1doElTbQhoq76agi8BPq0Pff7182mMRwaz1K+3BVBA7aOZUVE7YTaPBNJN8Rs
qYTwY28mKYM9MNl9n7138HSX1LpJKo7H1lny7cn9YW/Q5PbRfJS+Z6E7VEh7s6D0
/DrHUEPuAwzyctW51Y0=
=JHzJ
-----END PGP SIGNATURE-----
```