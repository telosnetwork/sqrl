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

Current 1.0.1 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.1/win-Sqrl-1.0.1.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.1/mac-Sqrl-1.0.1.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.1.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.1-amd64.deb
71c23fd41f2167c9aba5401317bd8f41212c10a29cd7b088c7bdc063394ee58aedaf9ebcf43de930fde251a99b3bd9ee429e66bb5c81b00ec14286d8101d1915 *linux-Sqrl-1.0.1-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.1-amd64.snap
1d80e667bab4e5795595484bf43dd6073a6e840a92dcc13adf7f564e7730782fbdfdc82f91d62b85c8b9664ad1e4685f4395fa27a5df392baee53c996ad4417f *linux-Sqrl-1.0.1-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.1-arm64.deb
fabfd96ff0603190080948030590992f3205ed0c615b2b70065c2b7c76c71a24cebd43b355e0bdb2c280aad9ad51a449f68ec6556a1ee63a989ccfafaa5c858a *linux-Sqrl-1.0.1-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.1-armv7l.deb
1a99a447379742e326c248e19bd1dbcd081e84bed9971d26002f59715bd2615e539f7ae13cfe087bf4ef4e4c286ca75f272f6ad4c4281b8ae3985598d30c7179 *linux-Sqrl-1.0.1-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.1-i386.deb
adca1b45b973017ace5617fa10fe133b7224161f2b55ed75673ab825e323e8694640ca89ba3dab9683488440fd03b79287e8762cec86c1d68a6d5d1b172daae3 *linux-Sqrl-1.0.1-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.1-x86_64.AppImage
d99a4768f965abe613310b1fee8b28b83a2e6f0db0d38636add9e17c396afde36d8c74622649314c4ab609c12d4dcbfdd79377443184b7a032e8bdc99e06278d *linux-Sqrl-1.0.1-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.1.dmg
931f04549cf9f68c804e65a7be3ecf6740e58f7f1dedd7ac8e6d009fde6a485496bfd4def63a630757725cc88f23b82d175477ba52c892114a4de38dd18051f7 *mac-Sqrl-1.0.1.dmg
shasum -b -a 512 mac-Sqrl-1.0.1.zip
85df935a16d8ec1bf1a5577dc2f8a5ef36b877c6a66136b41302f00acf14814e1cd244e6415e6cb1db0c5268492d61ac78c5677d2b505a7a137680d23ed10fac *mac-Sqrl-1.0.1.zip
shasum -b -a 512 win-Sqrl-1.0.1.exe
0a79afd67dd79779913a70e32cb6c193c7a2c2942c854bf4bcd210952647d005067e175d8cde5b5e7f6ca4bb1e59a09539a3ec49471c9a8bdd6f4b6c3483ed1a *win-Sqrl-1.0.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcVhYFAAoJEDT4ke1a0TzTwGEP/Rhf4jaOGqgf3z41fWCYUY4p
kjZdlNdLMPEYwkjTh/aD9b7SQqt/ZNyn89G/lKJZeQ7Cngu4zD1qp4qYk/RBGh9N
J3cdmfVWO+yDbO+GL8nskNlBNRtnB7c2AT3Kj6jwcjgrmuIDO3cL55IQti7nuv78
cffcA5GSwhCitEGFWjMH3RdVZDX0KG0CN7F+pozb/CjS/iWOqkcrYZgNOESjncEF
j4l92eOpI7tYaZ7jUgr7G3X6Adu/Ba6TfirV1PNY4GGGrGnqRD3y4aMYo4NL4NUP
wRvLJcQXth4EJen2eJpy90h0X8n+ihoevNEQt+TSNoX96yeuLK/nyVPy865yfTs7
ysJAk/xRUJSYj1Pao7mStoPFU6unHlZ83KW7t7DhDuyUu66TDcc0KVC3+GLxG84r
NzYnVdV5k7PZ8Ed72HZPQZSU3oRIMVw+SX40bmZj04VGo0W+72JGzBasVxd1AyPn
9k+h+UYBrrnY1G+ixbVpdiJQggUouOo527sS795AaFKjBE+uwqz4jFej4U94y/ja
37l8PQgjBaJJnYNScTzdYvuLTDNA4rP9m6CQzyIROOD5h2Hx7sU49iyPZ8k7oLw3
TjH+MokHqjmY70t1gAUL3SSPyX6j5R4LAAStVwLlngxFUT9B/9a2k6RqU2J8DSO+
9n4y8/TS/EaIiGklHOMG
=G1MA
-----END PGP SIGNATURE-----
```