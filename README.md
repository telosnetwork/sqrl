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

Current 1.0.4 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.4/win-Sqrl-1.0.4.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.4/mac-Sqrl-1.0.4.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.4.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.4-amd64.deb
8d427ae09c440a2e74612b37a9c11a6612202df133815f4924ec5ff2609590609ee1080bbdca7cd153f69ca230f4d9f4ab2b81a715328e8b02b5055ac68e214e *linux-Sqrl-1.0.4-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.4-amd64.snap
9fadd092f0250c8ad20f5e5233bf9874971cc3f75d4d1b128e2d9449dc556e364f5e97ccfbac28a243e46988ca341d4669a6943c570bceccdbc1c5e26b95d1b9 *linux-Sqrl-1.0.4-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.4-arm64.deb
b1c40fea16b03f9f0f327c48914a9769f7a5a2a7ee54bce4ae0cc6ebbb0efcdd71ceb4660af226521a47a86e4c28c8dba8033ca0776ae786acd4b6677f518456 *linux-Sqrl-1.0.4-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.4-armv7l.deb
17882ad184a1c05eddb4910d46b161986bee5f537d957a4d1d8677bdf92462b50f77bfb44730ea5991440b2f15ac82e65cc5e52cabf445d15f4bdb8a66208ef2 *linux-Sqrl-1.0.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.4-i386.deb
2cbf06a39964a97df908d498e69904f9b135cd202c59978d4c7815bbb646d5052cf4c70f86ab9876159b65fc6aa44c68dfe69e3066521ed9cc17dddea65e8e7e *linux-Sqrl-1.0.4-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.4-x86_64.AppImage
ba24b96e5fa5c49d1d537db0c59ed8bd9795d60ff6ad45bdab292a9c95fb104c0f3e279160f9e4406307b2bf469831b168e5044c65cb1a545560793513c76d89 *linux-Sqrl-1.0.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.4.dmg
23b3e1a0840ea535bf042869f937681dd7138d992750c58c0c69ea26ed02d028a0ef008b91afb65f45dfbdedd593f97a887c67aa34e6592602d5772a60e642be *mac-Sqrl-1.0.4.dmg
shasum -b -a 512 mac-Sqrl-1.0.4.zip
eea921ece6ffff10a2ae69c610b474ab7d83a809f5f2b42e30776c3783c9988290fb2b5ac3417eec8fd08e8366513ff13278f746f952c223808bcd12436957f1 *mac-Sqrl-1.0.4.zip
shasum -b -a 512 win-Sqrl-1.0.4.exe
05db072b52d852d743e9f529460b46e49ab776366f87e3617570bb80dc5d7e68f146a6a7bf8d833832a01b77ddfc93f07640c461f788aad4bc2de5283e233a7d *win-Sqrl-1.0.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcZjC0AAoJEDT4ke1a0TzTDwUP/3fisZKsFlb592k8j2zGDSZ2
D8u2cURTlWQ4pNi9t5ZTYs7LNNkpTdl+goC/oi87FK3Ysas+RWY/mxTUe+QHPwSv
UTGfV49adF11j+ui65uOG/USd3ffL8GV9iqQ6ufvML8T4RpV/Tj86rHv0xLrVxJh
l/HXB80lOyE8ozi1SQ5aUhOgrvaaUrtZ9X37YiUjuGvfW0GK+7vsZq5XIYHGVY96
sjDmEDdg+LHpCKRuxg0WxCe9HBglT8Fil3i66QOJLmvGE205EfdsaR/Ss+3V9oq6
IKq8ghqTOYyV5+YDgKsIFMddfBNUCAdRwkLOXom49PaLE4mu8utiTVGZWMv6TH+P
jDZkMosvGxc47LcY2qczDBVi/pH3iujO69OVS/4gzeGb3LyUfdbcGF75NKJNvCWj
P//FWPOWedxHR4l57+Bj+BrCRmRhXNwVPPtxiL+qFbDQLi9a443xDRl9aOveJrIR
akRLFm+CvhC54rkCedmk9qaUS3krrPM9EFhOkisxBO5hqUOucPMkZo7OuyxkC9S0
fTiGa35PjEcIEJr2fSDQzFKycKvhsKBu6pPnABGsdAkRLpXtpa+4jrQH+E5YOzwC
gNuNAPPidAMrDQti2J2yoBJSAxB1sCWe7qhEpafBa/YK9kSM37+t7IAZhYs7NORm
qRKPVWfEtB44MBeIP29r
=sQJU
-----END PGP SIGNATURE-----
```