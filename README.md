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
- **ScatterJS Core Support**: Version 1.0.0 of Sqrl now allows users to sign transactions in web-based dApps using ScatterJS, called **Login with Sqrl**. Users of Sqrl no longer needs Scatter Desktop in order to authenticate and interact with their accounts for EOS.IO-based applications.

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
0dda75e73e518dbb75d0334b802450c376c6fd199515b99f0b491b4563927f9ad3cf291f5402525eb0e6ba3c15c15ca4c7c2339bad3b0b8368bffaf9f201c98c *linux-Sqrl-1.0.0-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.0-amd64.snap
14cb21b0979f4acd6771b302194f1d62862c41dc52f80ccb344f2228619267765442daf399eb30016954ef0e5aa5f664886928082fddfab007e22fdac0a7396b *linux-Sqrl-1.0.0-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.0-arm64.deb
1bb04d5a098385bf9ffe60520ef086aa867d47c7844ec580ca54abc341b083f7e4992b1dc1e115a407af66339e97f13f5bc606c5e8746534c329a29ffdc22568 *linux-Sqrl-1.0.0-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.0-armv7l.deb
4b7e94d8440c15e3f7d4bfcae973b450f6c44b72b46519e9fbcc5394a302870782b0cfd179037af369ff96c0ca1680505dca9586ac75597d5af8e9c0730a7bd2 *linux-Sqrl-1.0.0-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.0-i386.deb
0539442998bcd9b638e5ce83a47fcb4db81ea3bacc83fcbb9f547a5c4ffa6e9cf8739bf459bbdcac0bda57282fb2c9bf9d85788b6bc367fe1b45528f196f012b *linux-Sqrl-1.0.0-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.0-x86_64.AppImage
2b36719baa737d16382b792a4fbbd58b34f9ff3f69bb1324ae01cf080eb7fe95d4f0faf6e377b285ddcdba87f4ef6cfa770dffcbd73bc807c7af893989393c2a *linux-Sqrl-1.0.0-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.0.dmg
dc9979a6d119cd025ce4db5fdb7a3811c337c13e178fac44939785b9ab94c0574137d452a676445d661d36f4c05b423d093a0c9e152bb55f7c3eb4394b21a84a *mac-Sqrl-1.0.0.dmg
shasum -b -a 512 mac-Sqrl-1.0.0.zip
3689aec234f88589a7059175505a1d346fbd79bcdbbe1feaa13d1b02d1939f34f5c5a153910affb73b95cff51b09b3b89a1797dc40c183185d6acbd61632f841 *mac-Sqrl-1.0.0.zip
shasum -b -a 512 win-Sqrl-1.0.0.exe
e0ed2cfeba77e2b63886aaeb30fd991012f82c446fc8f9a92244d19afc5614060215873f39fa06e0a9f65982ba14513e1a397a807a0ee622b1700c7c67ad272d *win-Sqrl-1.0.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcOABAAAoJEDT4ke1a0TzTE1kQAKPPfsjvvo3QZrl0Y+Hg7e+K
I6NB/mms4sZE7O2jcIX5YKwc9gTKHjxKmh8Dk76UKEO7mn+CKWAck28AzjcRhrnk
8Q/AncfjFcA1+PZnSKpRGwCpvZHrAjz4CupIohluiR3clHrUnnPC8xQ9zMNDmw3T
Mekh359YKk1C9bNivIVzgSWcuTV455eb4mxUctgv03N8OeK6FKENSFCr/ldoEujE
t2H1iu/zn29W7ntSdiPC64avLvFMNMCmsn8BgD02MAFeatfHs3btmReWutcScX0A
8HCakhZ1UHIVH7tkdy2OCt9l9fLJxfzsePsk4BSEt7If4eSnXxGib4Rh1HQKKIlT
O4yKfchyxm2LDlkhL/a/w3DfQrqVi0DjgLa1L/3N/kXL7H9u8dxcgCrGT7BXt9TK
TZCjgAw8beSvFgcYrcguPZIuqrJmSdM5fhSqt3h4j1SVId4vAodxi+Q2UKk97GvO
3IyT8VJYjFdE95vgmakFqDI2TokwKOQdQYfz080J5VQEPxVLYR09Sw6//3VXxl4a
u0YWmZKpBpNH2NxKJW4PYDFZtlJtph7l/9eZJhWpr6zDpk6835F1A5TCRRm8njGD
DsYpUZbJDyr5K8cI1eWB4vZo2J6/nw5xetExoFTatIPCKk/jucT+JV6CIbfx5ZqE
SHHu1vuCKsSidDzBD+pH
=TNUq
-----END PGP SIGNATURE-----
```