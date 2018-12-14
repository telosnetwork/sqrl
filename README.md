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
b3772febf228fe69ba47b3144a20ec61d7183e3e32456ac05d7edb859f1132f8292aed72fc208531c4819d3b64cf892d581817f2b34549066443b6ac410a4d78 *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
b51aec9a61a0ea8578f60bbe1d8599c2b6cab76f6dfa47b83841c2f2059c90893d7e0454535ff46935d22807359fe4b719186e1d8715081e018c3f680735f4c8 *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
646c0960c4af7f7336a861dca76ccb8be68754ae9724bbadfa39161c5768c019e69730c362e048fda86258af96db6507b536e2b4f79be3f66ea200c9f06b305b *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
6ca5c780d1c21d030ecb4fb588ac026f7f4eaf38aede48ca986932d6ddb4d0d10d9d4e36626d8c8d3272365e7626dfb0796963a8f7a1489e8936cf00664c4f1f *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
8e4fff9506c21902b6f50847f4a49f703513c4ad9f2d0ceb8424d561a8e891fa1bcbd29389a71401cbbfc9de1aa31e2c2caf824c45fe28e03eeb164be955b711 *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
97e15f57dc24833724961eb648a744942c1a0d8918d776f64b6d80dc918b4a60ea2b24c31c8570039de081dba02fef54992efcb62e823790c3ff827d5981824c *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
bd541a7b83725afc1a635612bc5e5d6ccf43cd62fa930bfb532a4339e63573512c0f77570d8d7de66e90e3d55c1188cd2bb34b92dc726384fd366a652c170ee4 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
917445692bb387c5ca84ff8339b363efdc447eac3ce4be1bcfa80f7b6588fdc6f2dd59c7dac46d04ba24c0a05dcff63084cb6498ad5decd2eb8d75bc0254e66f *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
0f7b17783c805414e0ca30285b449a4ccac2a120c3fd9d0355fac2cc930619f81150f9713f4ee846487bb02d8621a934154e6352e0306a0a649a90b607d36198 *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcEebyAAoJEDT4ke1a0TzToyAP/0X+I5w109qF5y2YFa7Br2UD
Uw/bCePAsmMeULt//afQM2LP2Q6mLeTB/u9+h70K3LxtVgsnDqWg6FwOD1GgD1jb
CaLpdmemMfyH8jZUwuashkO/iZ5QfRbr0R/aKW2NejRbUuwO0SBXKF4ROzQC9BT7
V5JI0m6eo18pI28KKFASvysMC2HdOnv7yexEPFtVoFkmC2CPzmQpwKKvbgWQHPuR
eZidWvEfVc+Xw1/J4VkxYWzr9/M9Mmu/4Q5NGBLhMuD5aBkusYhLb9I6H55lIGw7
/CTroHlqdE/rXD/Ig17MoSbxpL8biUm067EoDx6FIe4BX97DwvN/MI9otSSS+bGN
ONiLM9Egh5HtLcR7W0e0FTXuJjZfsgy1dMB+b07eLzQq5PTknZI7jdtzv6UV+4yw
ZQZQieQ2muWImjQssfTP+2LPbxOkfQsSRJ+hEb0r+pg3dr02ZP6SOxbgwLaG5wlH
WlBFIf6bcd5bBK5LSVVMbcb3H/3cnRijAE4yfx1b4EsXMZfosgG6Cgf3a9g1pFhw
tuHZaxonfAKH5LSeGg9o4cTvuROMR6oHLLmPA7nPIGc+xK1cfTbtLg6gdMUDSD5i
VIQXVgtiuueXDmdI7/QYbGtIh8+RfO6uCd4GZqGUdyx1lTqidHsb1EpQlvdEXHy2
xt2SU3Z2f9yF8rgCLwP4
=EDTR
-----END PGP SIGNATURE-----
```