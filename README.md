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

Current 1.0.10 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.10/win-Sqrl-1.0.10.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.10/mac-Sqrl-1.0.10.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.10/linux-Sqrl-1.0.10-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.0.10-amd64.deb
5e1e72f6871f9af081ebf36cd7c2dcae9c4cdf07311268fcc6a7efaa359ec5bbb9b8f5c6ca6858cbe6adf2ad77be598f463599da7060dbd73bc0a03da7474e8c *linux-Sqrl-1.0.10-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.10-amd64.snap
2a6d4a5c7871420babc1b312140c91e022df50e0c29f4ba565be577a2d0e6b7b26b39a6a32643d373963700e4b7fa08b39f14f759fa211c69fd49084c3c0be31 *linux-Sqrl-1.0.10-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.10-arm64.deb
21ec945a0e1e3ffa08d9098b8ce9ad8f27718ed000cdbf9c6e587e2ed7ce1b6164ee49061e972c3821ee974fcb7ecc0f91c4bf61120a99a1a5849939033dd39b *linux-Sqrl-1.0.10-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.10-armv7l.deb
ffb1c9f7757453b2434baf589db7d621754bfa36dfb4961faf4effb8f2889445ab9fc1200b1aa3674374e0b6155c6f756743903ec5840c988fc3f2151651d474 *linux-Sqrl-1.0.10-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.10-i386.deb
eb60e2dfaef3e95b6164bfc0deaf1c13900692c53d6946ad213720950bdcce65c714ed176e01947204b441f2b05cb79962980672be3deb1dfe944648b7fc8008 *linux-Sqrl-1.0.10-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.10-x86_64.AppImage
a9ca6021535b566a160fd6dec064c8ba47d6c8e195e9882c85534b9b1500affb70c188a681c6dbeb1c1619c396a5a3617c2ed4d8fc696567d052894f5a1afbc4 *linux-Sqrl-1.0.10-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.10.dmg
528b5baa047064b024e1df14c7e1fa652c76d1278d4474705b17e8f7183b60177f750087ea588d1affdf6b9ac6b86c225a87659bf70efe817383832901581582 *mac-Sqrl-1.0.10.dmg
shasum -b -a 512 mac-Sqrl-1.0.10.zip
a1dd356bfd18a68ea975b5c6471b6f24e8f4e8b7219681531f678ddcd51801c8bbb441c835f6ec6deca8b42e0ff9dd025a2659de0b09a33bc785bbbf4e5f788b *mac-Sqrl-1.0.10.zip
shasum -b -a 512 win-Sqrl-1.0.10.exe
3067212e47d3526d6286846c51a68674cfeac9879a8c6e56952ccbc3aea30996c92fcbfab28e8e07a260370a0737efe94839f0a9ce2a5a6846210220f14b2400 *win-Sqrl-1.0.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdHDsyAAoJEDT4ke1a0TzT7LIP/AztNvK1j9j+iSGG/r2oroMq
9qia7r+8aY2wDWdFs/9W364FKIaEFVYJFippJ0SzrhbHGB4sfo4x+Daizo8bVUES
9r+tAKQjPqd+PZMANlPkgBj71nCHds7VIE//ToHzAmdhZEsAefWzsciayde9ZNTE
pULvdmiPDrPk/Yil4x7k85dCfWVD57eJeWRNiwignyN77rvdGKW8dJtSwKA+5d7w
2w/bK0nL6AFO8l0EwUG6F8wNAz7vKNPRgRj35r1HbnOZRicdHg7XTa93PdetQuti
mfojFtS++NxZNi2CL7Zrl4+Qq5dy2Oj1U1U3EjJuJ1YLvG+oafHGb1XmdLBPbl/z
xo+wvafeTlnKnPlek3rpx4GBotV6Zire8ApcgfZjE4cUtxsJhUTgm3/6xrwHB4DX
sVzYK7AE80w77XIUZatQaQdgOYzXPk13479bUnW6KSK60UgYmGT/z8RNBUVGPNee
9bLMyTC9DgFkks01V9zXnAh4+II7GDfHSH7gxDwDUoQQzgC+TugEPMSgFWS1R5sJ
Fh0atGFzIqEnjGqBonVs+LrbZGGCe6P2NeVyARIRoZs9DNxmsjdcrCXLJAZXrhlC
xakm7PwfTBxRq0nmqRF3OC1NhgWIFwFK/lQ7ga2OMpJeGp9Qa+a+e6h6V7mH2eUR
re4cyRXGsh7M4r1WvKYs
=BJfQ
-----END PGP SIGNATURE-----
```