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
- **Free User Account Creation (coming to mainnet soon)**: Sqrl provides a simple wizard that allows new users to create their first Telos account on their own.
- **Works Across Chains**: Sqrl is the first wallet to add support for managing any EOS.IO blockchain in a single interface, such as Telos or EOS.

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

Current 0.5.4 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.4/win-Sqrl-0.5.4.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.4/mac-Sqrl-0.5.4.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/0.5.4.tar.gz)

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

shasum -b -a 512 linux-Sqrl-0.5.4-amd64.deb
02bdbab66f4f9b8c4a0f3147ac64d6c835c7142e2af91e3def9deacbed6535d6d02128829a33bccec4a34effcbe1d407acdecccb7f05729153ddc7c72c4a9c85 *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
b3980fd3ca045fa9f67b03ad5ae2ebdd61c20f87d03ec4e65c8daed0d9dc31fe725836c6484b7d823ed84a7bea2450dcf90bd39efba6d6db09ee3524c448c64c *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
a7cbee6f0f7f8b5de668947b028c312c09ad173de2b061807c3e22784421ed7b9a8c645eadf5cd8cb8953c6e2ce68b2319b1161ece3c4180f44a5dd8d04e9ce1 *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
d5b1e81a2eca8aa4d2fb4229448d19f854a5b62b8664a779c3b6ce4463b7d587b17cf199e1b48b4ad68e01320729f7ff93c525740d58c7319f0c0309a5d7839c *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
9011d3e9dd58ce00e78176a732f2204da0542ee5da8af645313b88b42e3c4d0c02f36d0cbde288268b6e947e7e161d8e9aaf05450dacbb00510e935d5cfe1bbf *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
7d2abc3c7f49687205e7daf33e15b8a44f22f3a77f759edd60bde8204c0994cbba563f886f41d6fa4e735bc0ff724f1eee3b816c67a4642d4cca52aaad70423c *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
cb1cea840ceb8b43cf80f2ac995702baeaec3cbb87075d330f12189e572f20f768e706a3ea9e3cb361b876c7870d4c90527a01c92e002dc10cbe1e25f5394386 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
568001c0997299c7849e0d7275524bbd72b1a92dc81d1ead68ba3a9b38558c911742c3a088c3131de6e10a8f22ab8de92d9cca37f3a8e0e427747ea0025f4cca *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
88163b4294799d9dd0e2923cd0bd3f79effb9b8c5b4bee7a2945c13eda0fd0f12a853ca63fbbf71c69eb507095f608abef793c89b9fec77df98ecda834578d55 *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcEbn/AAoJEDT4ke1a0TzTAwcQAIQcOtpPWyv1TWN/UCBU16st
w8eogsDOeYJFQjWpumPcVjBe/4YqAW8Bwovv1ujXdN9I8oiBwT+K/uLp8uzT3y2n
rSuXmz2o6Q8098YhmsfyBPGg/youXT9PdGCzOJ6sTtCgROz1Vh9DRGWBzwyRUS6I
y63PwZUE7AxG3RXwm/jiVEdiQEFNOQkN1UGO0BfbRVhYAp1WmMBRF61LExidDuJi
0NOtjGp3SKNKgN2bGO9IpNjBnkt0n4nmp9MiEbscBFLvld8kb9HIEhFihWOp8INw
5ItlbCYo/EM3aVJB7sr3KT0SOqj5aqQgvuWUqXARPlCmOvvBYtgWKk3YPNyNrUxJ
VA6GYF/Y15pFq7sK8xmeQB4Me3CfAxffbHNqJUD3G8tmNcZY8wtbxOGxZzU2R5IM
WCmnve5G2ML3HTSKvdAzI196ZyXeMSHNqeXq1mtIJMdb87iqUbhE0ked+gd4Kjpt
hOmV2+SIj5DCcz5klFZ/cMQs5YNfFOvGzGv9rndiJLh1LbsQQ7Iw/PTwFrUxDaHc
HMaWe2Q9x+3grREP4ZeHoVpmZhu9+WEb9lccbqxvIgv9Bma0LR7jq5Rx0+qpAC9A
7kGJlfHpg3eWY/9nijafiX1pSvRH5RnqrU0Vcxfrcko4SNy2l447fxybxGbKw+lX
x1J+imePhn2MtSIfx9Oy
=NuOj
-----END PGP SIGNATURE-----
```