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

Current 1.1.0 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.1.0/win-Sqrl-1.1.0.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.1.0/mac-Sqrl-1.1.0.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.1.0/linux-Sqrl-1.1.0-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.1.0-amd64.deb
64210780036b2f39d040b72266f90ec9ce8c3c35ce74e5cd6a8c4b2e69174a7d7d4a668c2e1cd4b8310ba1d1d932520ba3dd0405a891a68c2d367ed039d84771 *linux-Sqrl-1.1.0-amd64.deb
shasum -b -a 512 linux-Sqrl-1.1.0-amd64.snap
069fa7091b46785237a5bb7cf693a37923855726ee931979d531414f688cd87504ddf1226181feec54b3fc9a435ab0fa2bb118db0cbe6134a9bad7c17fe241e6 *linux-Sqrl-1.1.0-amd64.snap
shasum -b -a 512 linux-Sqrl-1.1.0-arm64.deb
6c30b7a0190ec589fd09f3bc4a8efba46c11f965a455c8dc8d5b54db87eaf04b95e211c42d94bd4f1de0a21e0ab8d3e77bacc10ff2b4f40f82812dec8b311cc2 *linux-Sqrl-1.1.0-arm64.deb
shasum -b -a 512 linux-Sqrl-1.1.0-armv7l.deb
512836da970262260d27711b30e36521e446ac3dce31b4733bd26b2d5be2549ec01fecb08aa0f6c8996996caad39a6955be16f7281b973d1016c1cedebae82b8 *linux-Sqrl-1.1.0-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.1.0-i386.deb
2761bb3f2e230650231556092764d74f486401d7b6c96880e3c21a27d50ca0cf5760ba186abfd6ac19c6a53b47192b7a5a4f54eba66da47f939389f3453a029c *linux-Sqrl-1.1.0-i386.deb
shasum -b -a 512 linux-Sqrl-1.1.0-x86_64.AppImage
cbab9bef59d73d867c74761cd29741f9626d460a2ad058a68aba05086cdef10566bc085c49a2696f8ecb67a639696f826ea727aae911a52128fc0fba42984783 *linux-Sqrl-1.1.0-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.1.0.dmg
b0515d6490a9507fe2b15b19880bd47b4b578c3663f75d50319e58e6381d3a1c42e029ab9a312022ea3831023dffe457e14407d754cda326451ac601737046a1 *mac-Sqrl-1.1.0.dmg
shasum -b -a 512 mac-Sqrl-1.1.0.zip
25f699aa24f3625c64d7601e508922be9387e7ecc361b73714079f10c3dc06256a780058f7c384ad702289d5aca77f8acea94bbd10caef343a03a32b30489722 *mac-Sqrl-1.1.0.zip
shasum -b -a 512 win-Sqrl-1.1.0.exe
1edfd2d2141ffe5edd865a3c9d2ebd34e1f82473af4bdbfda848b85d937d2dea507d3ee8b665b0ffdd2801d93319272c912b7a0f7af9dbef894a157540f2be77 *win-Sqrl-1.1.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJddWGbAAoJEDT4ke1a0TzTT/EP/0RcsHMisl49Eg5KTrIzoKIN
KKH5hbhXgeLS9Ul09Qg9dG4IashtPgpJ+C48QMVD0h9jFyZ27VZ+HN6iE7nj6rqC
dZQildWCiwnZyN7EEoAXy68luKfYqSIQX8eRvJlrhprvqRipN5KLKAlFRXd5+Hu+
b4LUceTL3H3cykeF2KCBaqb9ZIyb/Pdoyv/xj4ONavRg8MdlEqe35XarF7Y19UqR
uxfII/GeU1nDipG6oXRdDlRHww7Dc8/1P3MBiJZRso8z+nwDS/w51DQNGGOI7Kwi
ww2+pJRhQltSe4odqMLn2rxk1fPeDuYzHu3l0DHAkAVBdVyDdnqgMaqZPpSGVRnG
8kApJ+cGkPS9HwKaY7C065nlVvyTqDFvm9u/qxVxKg+jAY2D2yInX82Ft0USBLTu
l6tLEG7AWJwJOuUdq2K2bRsJLY1OxFg1CZ5q0VgzkUjdxjaEoj1Lz3o0DUViSUkl
k7xFXZK58Sj+dA9GZKtyrDYiEeT2SlCsGZY+r5UD4Az6I4Nep72q5bc0sjHbOnBK
ntVM+nhhVsxZldkZSGzwafie/W/HOSp1kdXiJXplneK7f1FuKBnPJpgCSbjfXzPW
T84kp8dJhnPl1hnCTL36q2PyxhWf4MVQihcRM4tgE8VqvVg70hkKeJkyXCuiNXyc
pG91elKDf3h0CeuIJ+rT
=MN4h
-----END PGP SIGNATURE-----
```