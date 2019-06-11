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

Current 1.0.6 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.6/win-Sqrl-1.0.6.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.6/mac-Sqrl-1.0.6.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.6.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.6-amd64.deb
91ad98f0216d93b7746c8e7d5e19b3ef1f7c622ee4a80bf2f27efc415d5436874c7a979323bdd9b54045d04bf1699c5c9f1379fbc77cdbcae464bb23618ca8fa *linux-Sqrl-1.0.6-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.6-amd64.snap
17e8dbe57c0562c429df5ec32c33a73d26bf32f8c6b43b364cb4f8c2fbbec3413de08e6cd8991911a9a55107b914b1804a954d7c938b2f8f970dc76c36bfcf53 *linux-Sqrl-1.0.6-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.6-arm64.deb
97dfb7eb0a00876cf5ffa37310ec6d8b21aba64d92dcfda67f087145b69656fe715a07979aac09712e2c8a5810da94fe17846200903819dcf7b4597c399c40c8 *linux-Sqrl-1.0.6-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.6-armv7l.deb
2eed65198f1f4c758ee52634580af4cddf3ec569f7b2ef2e622ad5683c84015a37ae5f47d3e3f32febfd45fb207d84ca2f83f93cb28a867bc27aedd9587776e3 *linux-Sqrl-1.0.6-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.6-i386.deb
28fc6fc8757aaa7a18da7e712baf7180ab1d5636ecf4812925a9569e4e9744282ad4e32bc60969d17e1f107fbde55264d3ce5c400b1084a0323544f02f0282c8 *linux-Sqrl-1.0.6-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.6-x86_64.AppImage
a9d12cb39dcd35ca2aeb7e6f03ea99f1005c601210b799de86da9365926e15325de34351634e333ae6dd7a58f74126817991b695bad1d2ec4b6ca2e542928241 *linux-Sqrl-1.0.6-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.6.dmg
008f7a5519fa07fe665ddf166457f43c3101162586aa83d8648fd0c3274ba1b45ec4b675290e8b0cc815a6fa1ea17bc2ce2db67ce41809418e6bd520d390251d *mac-Sqrl-1.0.6.dmg
shasum -b -a 512 mac-Sqrl-1.0.6.zip
d53880399aa0ede54da54b42e80bbbe11f9b6a95a0bdd80dfaf4fdba3c67f393d131e4734bff53a14aae03f600422d017f1d19b9a7b88cd7309a47e198096850 *mac-Sqrl-1.0.6.zip
shasum -b -a 512 win-Sqrl-1.0.6.exe
34eb26ab5d4fdc887baf48fc363b086d4c96bf5dedcc5ca87f4764d3249ad9899e6bb6e46c9a8af77e040912393107eab5259bbd58aebe8af399a0b2505377ce *win-Sqrl-1.0.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc/8rHAAoJEDT4ke1a0TzT8uAP/RdBPAQp3jy23tP/pQtCTIA0
CCptw1r93I2kAUzMJF4hbvHr4rJAVfg0uDiOdMVJc77UpQ+dA6VurIpfKuSmjvfM
T01rqsXmU7HGErh3QtYRkbAjC0z23hlxa4TK7t8SR1pWZZCwpiaAjrtKgoaU0Wk4
Fncsr+gaK5cEdpO8uZUycMTwbfhZ480bOYRZZ2k9wY/y/aSYlMksVVODYkhzWYSD
j2Y+bL6htKYh+bOhhwRhW2TMsUEeY5gjq3DeSJhcNfqacnFDXSBMdePxBwFSN9iA
SDTI+CzOb+axJ5j6lbHyotKhSgZlHQ2daeVb0ZKcW1o460P2lAgFJlM8SUTK1ili
D2Jl+9o6mo4S0c2VKahGs1K915gCCIbf7LiHY4ZWDC6NXqqpCPCp8sF+YLMPlEqG
GI0ZpKxa6V9hItzMjDHmVXSwggy4IxiRirV15W94eLmwWGDrGwzcFZN8cWds1bR6
s60WmCm9AwEg16R+fPcMGqicnxscFnvjXbO3MrPnLSNz9N+Zf9IhPsdzqqZvoKH1
mJIIbNZzSuNZBasdqKgMb4rJVkfqBo5bYz8pibNL/yJHxttJtfSEGCVhJ2QAX4kt
9xpB5vCoKHTKB9PYZA9CbrnhYRVe7rljffN/IEDA+zhAkQApXX3Gma+p8Zrfxa++
kevYSEvXikI6Kwn3by2o
=r8Lb
-----END PGP SIGNATURE-----
```