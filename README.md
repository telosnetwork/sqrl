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
df2dc897ea834975bca4ab3de20aedbdca0a2090495480ddd2b9968c22bfaa300b35463c7cb4e401aead21fa2078889cbdfc037ceb8f25b901cfa1f25a15453d *linux-Sqrl-1.0.4-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.4-amd64.snap
978b90907b6e1345a756aca95212541e93ed12e5917eb9384316551c663a0e0f74368a4fd315a8b6fac57031c24d4604b4b6f0b9140a7e0e8f1f5b2298df474d *linux-Sqrl-1.0.4-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.4-arm64.deb
73e2c5e2d4d233ac0e6af8e0acb464e65ff2dc304595cdc7282849c1cd9cd191e940812882abbfb1fd20f1c325bdc538865c2d3baa211e2a6f3f0f205b5ed282 *linux-Sqrl-1.0.4-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.4-armv7l.deb
051d863e1fe143912dd85f1fc6b4e8823dc685c4281a632bb3e96472c18e043a6d5583818ef3dbc3119cc6fd07ac435c18e9ee5b7ea091da3b1ba5061d7c63ef *linux-Sqrl-1.0.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.4-i386.deb
241c2f9a6320c84aefe1ffbbb49145c9656671481b53f67d38d47e9fc270f76078c912ce3318ed839baa51c5224e581ef597c7da7689acb2e1a63fb865714b44 *linux-Sqrl-1.0.4-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.4-x86_64.AppImage
42ad0e552a9a6a0c00815ded45888fb74ff29cd8ff18c9e9da7297c260a7741bf6de713f1c4f3ea5596186f31187c22fbf4a71b1ef3571f6679ca7086b3c6495 *linux-Sqrl-1.0.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.4.dmg
e7d95948d99653fd9ab9654d0e91125c3481e1c5f634cde257b4a5d3250da88cead63f64dd79e514d5231495f3986fd895cbbdab752a9a03b75f84cdf307c2b7 *mac-Sqrl-1.0.4.dmg
shasum -b -a 512 mac-Sqrl-1.0.4.zip
93501e8788972e6972c6f7f98e48e7430aa2bb13d7ffa7c91759a622545b539c97ebdea3e188321b6b20e09eaeee8aeeb252c716cb18f80b43e6431b1546ad5b *mac-Sqrl-1.0.4.zip
shasum -b -a 512 win-Sqrl-1.0.4.exe
6d7e02570790bb3d5d13325b715f61bbfb88a972f3b9a7e6341cd279551726148d24c8520093f326d7c4fbfe836c60d42d0b4af52c959bfbba17f367829efc10 *win-Sqrl-1.0.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJccICQAAoJEDT4ke1a0TzTDjoP/jfXSZWuIpozJMDmiRgOsJzV
QsvQxKb0GdJ4QGOwHlc4tqMrnUpGeP9mN78e0k+xPWz6ZgEBnAciwOJmVCaiw3JA
NHfYIKL2b/lRTzNl030L8pDYY2Oj7YLW6RTmLZDcJv9MEsehA4KmJEff3Ykzof66
ONLs6kou9SmmTYuEzxGhVCMLo0DzsMBmBJfHTI+Chxp6rGrA7yY9SjRs/gQ8FUSl
QnlQP98qmIUZ5osx2Vj0DwMpv2EwzNzEt/EZovhL/9le0xAgSg5ToOTn4o7GQofb
VX6kNe2rcnzRYH2hZM7mTwMFqtWphdXZuOVW31zI6WxjsVSaNQz4sfrYJtEy7aUt
4uE8Ad960FxU9thXudgxtOZSUty01xOqg+jg7dwlbJa/waWnIiiqz0QK/26PmZZw
NZVo/5SjlPj3GkGswSneqIMJRuvmhQlwaBbXfQvUJO/8vedy42JuOY3ikGTIAifV
mLhW+pOyAUao+DXFsoN9h62NlyzHrg6PyKFXM8CzELyBMFVmVSZ3NZ4gEvT1m7Dh
cZRingBOXoSQeN7xCYc0bdGUrHM5IdzNZLxAQSzFqtbmdwMwtLpV9EFgtgbJpT5g
M8jPHpcsSOOjSLswjtLH8pjLPdF5dfn97LbxzeZyUZ59FP9qRj9mKtkbDCqUtLNZ
xlwOhaVOo7vm4AgXrieh
=eU0W
-----END PGP SIGNATURE-----
```