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

Current 1.0.11 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.11/win-Sqrl-1.0.11.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.11/mac-Sqrl-1.0.11.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.11/linux-Sqrl-1.0.11-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.0.11-amd64.deb
0f8cedc4819bbf254917ab5dca3b3311cd63e6b1ce2123e72d1ea4fcf0eb5273f538ac8c6d8a63de9ca53ac9701996a1fb0f827619fd4605c5c680c8a952c1e9 *linux-Sqrl-1.0.11-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.11-amd64.snap
bbcc0d45567fbc83b709deb97f0894f0acc2ff8c71c00cea948687956905223fc521c167080a2284254e856f36ea2c5768e021de3e384d67ed896fad5732bc47 *linux-Sqrl-1.0.11-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.11-arm64.deb
fe5ad92116c1bc93170fe5c5909e9224511b5fe0dc643d044b684f946618588db66ced4eb0375595cb3e3d102743f16359578c21f663d5f94326e1a3580eee08 *linux-Sqrl-1.0.11-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.11-armv7l.deb
54c6e35b1e5f482c84bc592799b86c7f7c4626fd7827b26531f5ec0b32131ebecfecd913065807ffd47a763ae11234d73d1242a6f071a1c06aad98fc864d95e9 *linux-Sqrl-1.0.11-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.11-i386.deb
dc4e02d46f7311d309e7ba2292db24624a3d0f69e0aa44036cfe78eb8eace2d8f7b1d7c7bd5faa70bb4049a4bc93d7ee3bc3ac4eb66d3b0375728ffa21341dea *linux-Sqrl-1.0.11-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.11-x86_64.AppImage
c486efe18c74db934ba7ae9e196e27754bdf22ea8516577127816c57ee15ab424cbecfe66a8f98d94addaf17321896cb8fa576a7b5dead94c5351213d31c24f2 *linux-Sqrl-1.0.11-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.11.dmg
bd487e9cc2f2c3c90da1e6fab64a1c5f0e33fbf7c380d65c2dbdda84235da1a2a9665cfd64eddd5f55e744882755fbeeee0d7435ab2189c212f3e0ab504773a3 *mac-Sqrl-1.0.11.dmg
shasum -b -a 512 mac-Sqrl-1.0.11.zip
3b646ed074e0885600aed4e90cccea250f445a8f84ba36f38c82112e69074e1fe9bf306462b4120cc3573a0777ffbaefc2166a0b6936182bce2af1e176135a69 *mac-Sqrl-1.0.11.zip
shasum -b -a 512 win-Sqrl-1.0.11.exe
d12ea6dc7dd5ab434087183ff62c5bf1db81c046c03cd7b8ad39a41f87362d57c39fa739e8d7089159d56187f1c5f9c1499fed33724b5ef57fcf0939acdc18c4 *win-Sqrl-1.0.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdIA0EAAoJEDT4ke1a0TzT8XgP/ikyAsNRwfzD8RNcmZzGCpU+
O0yZYvKtFDQ9Ce8JrSa9HsNbB6zLFtSFuvlPdJ5VrInBGgfTqZ2a3923Jk/NF8fC
m89da2QdoSSc8WNQjGJwm58jKZqisItWMWD6J0yh728CVvtCKXujfnw9oUoYFXOP
UvlmQSh/cuxxCkNeb1m748LSm7hp4ABdFUX/jihfJ0cS4y6ebsnw/AZSa7RMJUHS
QQlV91c25SWthKXv9rkcqEflArjA7hNni14GyIMgjJBI28XSvSWFYWJxR0wGVnck
GPUwwZwly+KMT22At6285gTTWcZtQlaDl6dPdRREI9QD70RMIQtIVSpiFqA884mQ
5rAvkdxJFUNNpsQ951MiVSW6LFtDcxul4dYJSS+ldmaUY2o0SDIDri6aDuZADtiY
ul+j5F5dfKC92CLsA0eUa8RjP4jf+nN4ZuLz5oDvxyTwPTc1Cu9CKPOyNQQ1Cma3
fw4d1gWlvYpKWoRkgmF2bmmY8EQdyFyrDu63nqtY3w8R392Knpl0Nl+IMlD04pJo
8+nNktXDqZtMjcBByU2KhlbkZpEoHy87YWI8DOJFAD1iTxHpSl+YDlnB9Ka2R9A0
1jZq61Ydud+eJcRbYZMlNU/KH2QG1CXMp+q/M8me0BX/z277AabWry2FyJ6668zV
1YX3VUTUL5JrDo6oEdHn
=BsXF
-----END PGP SIGNATURE-----
```