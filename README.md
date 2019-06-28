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

Current 1.0.8 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.8/win-Sqrl-1.0.8.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.8/mac-Sqrl-1.0.8.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.8.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.8-amd64.deb
200b9a1b491323e4ff10d4d4bdf26bf0b88c47d329fdb86670a0bf1098979f26e8557ad9b66c0c2bc79592a91241650f74825ac0523996965490bb572cf27e9d *linux-Sqrl-1.0.8-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.8-amd64.snap
da4f4dca6ad92776adae0b79df71384af244fe2582c12c11cb03649acbf7f3a0fb62963064cc226366c85d7471cb7d993cd1f524f89e9107c1f3827ac80ba88e *linux-Sqrl-1.0.8-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.8-arm64.deb
bf521957f022e9dffe8e49718ee30c08de755d449c20415437f06269be58428592dcb3b2c55983ba04fc97e680fe56eb285c10c9bef235041baf8bf668aa21fe *linux-Sqrl-1.0.8-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.8-armv7l.deb
db1ece84d768a9a72696926c6d699554f7aab282c376cc9796fa917d9dd2c3c735b89e3a8a0f460d03cc4540a9c01162c30e44a5dcb2d37be26857fa36a0dc3f *linux-Sqrl-1.0.8-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.8-i386.deb
3d7c6a871eceea0f704a3c72c2f34034a1e89fed2bd5875668c248a5753c14ea888f052b8b7484042d24dc595b6d54aa3ca61e983ca05b8e3dd10291134b40fa *linux-Sqrl-1.0.8-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.8-x86_64.AppImage
20db6e9643d95004d9009a5ed786a4b62115c36042d238b3eef415bbc7ff78c38839e9d634f70acae5bc3e911599d51569d99ee683e42a4c0fb37d2150e33be6 *linux-Sqrl-1.0.8-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.8.dmg
0f943fd908a4114c5dcad0717210998b2b5d367848612e5d61c5e9c07bd9ee4dc376533ce7bd315cbc964941d792a98ea0c03a6bfd4f5c95de6d403d6b090f2b *mac-Sqrl-1.0.8.dmg
shasum -b -a 512 mac-Sqrl-1.0.8.zip
0ee4b016908c806563384240d36dee6344d7ded114c5b589e09e128d4e81845905d9b25dc9f4a2e56d78503f9a03f4cdb37253ac943976a33d5c97b66622c852 *mac-Sqrl-1.0.8.zip
shasum -b -a 512 win-Sqrl-1.0.8.exe
674677534ebdce7bb290b726df8b4121e2134f34287079b847d5a0f2a50f53ac609e16cff31fc1f8127820c42574fc212a14cff1e931f561fa4c9af0b33ccb4a *win-Sqrl-1.0.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdFkWuAAoJEDT4ke1a0TzTDNgP/30jBXp2zM6dfOMJQIVd6DvY
iSZPFB+aSHipHl8S0ohtcnj5ZKi9oSP8ckCzu+TvYMELBSGJ4HRzyWN17yZp6Is3
C+kgqGmc89XSUuoiCRnJ8oVrdh8Lu/Tn2jdKACnb7s5i/i4+cPe25MYyKUFpAU5r
TZpinWtQPoqR+2sIyycoAZrsAVhDNrC4t7T0W8g9ckGHv2/c48/B12JXnjYTqC83
zz8vIOibCgYbYjMV6IMsNsNVbADMnrpxAITrLECcXIXXJqHFGX6cBWQLp67+Pjz4
/fjSB+LfaNK2tAJOtWhzcEo3f5CGGViRkxCUCtqxUyr1UtEX74kNPjvuwRKGTD83
M6LbS17KCCSmfNs5240EC3EZUcyeksIhSAp/GoByp/A+yPxyPU/y+FB73BAOZjAs
/VrV8SghiPTBIFEy2E1LQnQqtgf1cowkXmZzA8WG4Zipi68wYIsBKBqwRiqJBvZb
dLDLDR50osWmPPcLKPMr/isK/92aRGCGpD1iqfD2Vx0CtIz//ZFCNSPE8zSEt9he
YYGsDAohSh6A4+TeNK2qADD8fWSGOGKQKuypcg7h8c/uQMCet+3GAV7cY/A/xUSu
on7hUTuAT6ILKxVVdPxNNXrJMIHks/U6oG+26Zy8Y008fRV8B8MZlpIOJMCCVN9P
ah3VheR22UCQErWhu2jI
=McRj
-----END PGP SIGNATURE-----
```