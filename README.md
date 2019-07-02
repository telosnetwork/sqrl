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

Current 1.0.9 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.9/win-Sqrl-1.0.9.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.9/mac-Sqrl-1.0.9.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.9.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.9-amd64.deb
325307442c4557181d4835ff910c1762653722f3469938c3969a0733dcaabda724faa74f345c63b8623c1d256f803b801dd9ba00c30fe6405fb0bfe44011e503 *linux-Sqrl-1.0.9-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.9-amd64.snap
e331132d54a702622c2216324ac63a737740b5b25c7ca7424deb8e821418b1f818c06771ff95ff8771bc6deb1438b358067a473d176d3384271166eccb6282d7 *linux-Sqrl-1.0.9-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.9-arm64.deb
ece1ea16bfdba30903dc1ee0f8b56b984131e2ec4906bf010d071fe310322f837bbf4f3d23cd88f832641c0defd6c852babb06625fc5507b59b94ffb41cca2c1 *linux-Sqrl-1.0.9-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.9-armv7l.deb
18dae88a50f410c0e788c7c9dc781a4f1e82723a28c57e10fab87843012e400591433992e019441ed62ff86894275ec44dd76864da3a0cb736de4393a929176c *linux-Sqrl-1.0.9-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.9-i386.deb
f4f0a3d0edb800933ed949fa8e2dd3d2e118333b15e96b251015586b7e681d2dac3349c7c184a0ad395c13282389b9e0ff8cfc8773cc0f597eba44fef12e70c4 *linux-Sqrl-1.0.9-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.9-x86_64.AppImage
892391e10af915be1812a745ead8cc9b3229db1f5d34d5a4d8c51998aadfd442adb47e6d8f93b95830e43e511b77073079267b31a1d042a5374cbcbef577fe8e *linux-Sqrl-1.0.9-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.9.dmg
255ed58e27e5078a2c4a6e500a24b0235cf9a1349b2d9abe5c0d84064adb953445bc02c4569a243196328149ba9aed8c83ca4c06786a9b7d4936683ccb820204 *mac-Sqrl-1.0.9.dmg
shasum -b -a 512 mac-Sqrl-1.0.9.zip
a8e550e8f6dbecd94987eb232e8d7c8015251151a2ff33e4f773e22181e53d58e9d70000ebe35a51b08fab32076299458402a393c607bc6945510d54d8c0ea25 *mac-Sqrl-1.0.9.zip
shasum -b -a 512 win-Sqrl-1.0.9.exe
7139e97db2671e62e7e0ea02d1cbeb62d91a49cb57efe9a8760be60ea557a37077e9f86f0638258c9bc59b38963c11db8ab346df39b9e45414216ef199add64e *win-Sqrl-1.0.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdG7qkAAoJEDT4ke1a0TzTRlQQAIIx0z3Ad+dpLZH56ZJSsnmE
kwIwz0hthLB9NI5EkzKRqkyT8d9vobYKTxx+oVbZFZqQXMvUstweX0nZQi0Md6bN
7i6r31/0B2BxzejOWZ+YOFCvOk0RNRh3M9gpsEnWj3XP99oRSb1D+Dx4bO/t/ugb
mjyt0+iedla2tDhJrumJKyrA0Nw047kDm4ii5VTOdjBYbPhizV76PSPYMjwDeiMf
lbO7Qe2ANERL3aq/xCY9yOHXxHAQ6aigAJyz2UDJskcxGKVsKzFsxrnwtvbNxtQk
4EdHfIgF27k/sVQUawJP+9CpF+W94c0Ve5jRGqR9IMKfMRRT5KI3U86xo+XC38nZ
yUxokXLkUr5/HhD91tQlhifjmxayJTQO00Pb+f4j8o8Oc0d8BmwHDBNKjSCakIDf
ci+5M32UNMgmz7Q8026+TyU6e6uKXVaZmcsYzYE8UDOp6zD6wuv8IiolL2GVFvjJ
ilcxBybBK6IgmNSPCQVECIiZUqDP/1aU2eHdX0rvNoFlcytDh2l2xmy4XW4axzvI
Obu9geUz/qeXYREXCktIChNLhwcC6Z3q+R8bEfTsLmzH2vMoTqpfBqCDRe1KbjfK
/G9FHrfc9WKCN8pfa8Ebi75ZdBIZES5PvNkVRqduh//m2c8Pl5vYSVGZ5aTHgfkH
z0vP/KcblSDsA8Fcz8y5
=gqWn
-----END PGP SIGNATURE-----
```