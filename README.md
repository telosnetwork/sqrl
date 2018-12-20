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
e409eee42e239c0a87a9bc7d175ae0b5680a4297349433d742b24f1106a11005595be6150dc1015a0fbfdfdacde5176e68e26aa1c34d3b94b4ed4cbbaf488b21 *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
079ae8c3087af1d1288cc005d430c2858ad9c939bd7c1cda4381021b3f81d464c7d4b426bb0cc2007af908b599693c454460bc30fc3fc8c9e18d0cbda73e32ba *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
9544bc7d9138f2302a4016fd2450c959048f1774e7cb4a66b33d3c2d9f883c5975ea79a4a39b271f834595111a8ef412d98eec5f583b8cebdf1fbfc4fc3057c4 *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
0b3385345291260474e97a73867e0b6a15b861f94b45cc599f0cf1df9dc3705822aec243d8d7835c58631bfaa6f71cdbb0938a9bbd9c36f220e38b31d8d09340 *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
292f55b15c9660cf8963e35dd66a7003cfc9f8f57d5418bab2702ae3d5b25916af12d1f8724ecb5d5b7262ae035781c3095a4c68320287efa6f6c3aa079306bc *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
efd52beb67d7823914fb96abcaef808ee01559e3661b436698dd7376bf26367437a738b8a81c91140804e0652f40f536797687a9fcd7733f5e799bf44672498c *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
00a454cb4d7ee5e3b9556ea0f8cad05dc33a2e1b55e5ab68471d8f24af9e013c45d98179b477f5a5ed15663131bf9e3d0d4c11d4e2d49aa24eab486dc0ad06e7 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
dc00d2b04cd98fef0e3b1c3d7432c0df833b464dc788572d77cdfd379fbe2a24fe3a9653e0105f294628248bc87d63d1176646ce412da4ab0d22c7a0bf76b013 *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
800f0fff6d29621d802573a33bfe1196c41ff9c90d64f8da982fa444e8cd9a0b14e29e14027e8948d39187a96a39e1e37e674e27ba38b3629a194184cb71f4ff *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcGuVLAAoJEDT4ke1a0TzTWp0P/RMQW3HLMY/ijh7YZgX7bGDi
9GawAPUHG8tD7Yumpn5sj8mxklWSOIpWbq4fUM+p2MoZQ+C2WVkUgQlCRVRlXrmU
fA6KyrwphJMjexh0HktsNuVAS5bf82l9FZLDQa1Iu2Ue9x4etAukFCUuPpWyw87q
MMGbuhFivGKQ7sLHLoic7BZ/xJrgQQ26t7TMGw0ffKoMPgZZAR0KZwb0S5KYwwyh
qvziB06QFNiKIMrUbllrf32pTi4ZHfV/2CnZCRsbLSkjF+jQizqm5wE95WW0u0+Z
sVcISfdUaDoDEugr2tVh2QTe3TJyDTmfdHOEgehPr/N3VH2EpNHL/z8YD8CYVh5P
nxoY9j0IHIA2bqtbPKwCbqpVh4atHFfek4onmcezF4sb41bR441y0ZD6AR3vAJXe
zO7L3dMf1Xnd3HhFnlQgnvAreNkpwzREDeSpL/NOoiHUd16RSuw0yPpg5UNOq1lX
ypXLiEpoP8R8xirPFoGedEsUUz4+7E5Uz6dEdytcdTMPoK8ZGx+zThl/U54PUBUi
cOvX9aDAH+z7+3HxDjh+LCIpb9iot4wPShFGJ9v3q3Ur7VP4xYmrTbae4bTFL+RE
ZOR5rle6sGqOLzAyTfJbOlboVkPeg7boCdPosT5kkViWebaKg/xjILq8CW/fVwVX
Xyo/lOKU02I9mE6yD4/6
=XgzQ
-----END PGP SIGNATURE-----
```