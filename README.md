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
d8e1f2dda829e879bd9c19a88d62e84dbd417578f1d231f7dbe4f330ac3f66c86b755911d21c5e2d07abb76ab516d3d28f158d7c75b031c5592d7d149b0663dc *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
7ba09d6945cb2d643aa66617710dc2067d079204d55b713414985141d8a4908e219258a3cc975f0cb5a8ae5b95daae91bf7ee76f4db911618292f3d14cb88e0b *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
4c7567b4c35dd2c67ee50f10d72275d5855b02fba14195fb57b6d0431a3c079a1ae3a86de1794251ed81a0ca2c255c78e418d15480a9997b239e82a29a280d6e *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
e2485c5fc35d58fb83f535a6890842105e621ca241c7aa04c45eef38a422874fc95a222cb1451bb12c3d9b843c0dc5fb47252a443b46572ce76b2c362c974eaa *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
d4ce3bf2d504d23a3a7363f56e51c3e4ccc66c7d47ea2a93d23fbf78415aa0a29a0855d068bdfde636aabba8b66cf76cee84b1d0f3a72ebc99fe4c38ee55ab06 *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
e507a94e566562a3a2431e066dead0c7133d1612341480fc15e6058fd01cd083a1e1a73bd42a6d2191649b03ee7bc952af25a39972111a958d1afc08e68e3250 *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
d223edf13718a7d68e079d857593745e6e7a5b997a9af6204fb74b8e6675a8e21d6db432a19225f246494471c661d3163e037e7edf671746a35f552b12048ca4 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
99e4c837dd717d2a1ba7cd32d12cb98d51b9c5d0600a3377f3ab9b9b4894e6e8dfd48d8d2734c53ad03be14d27110855b5ad1a3e31ba1299f8b7e1f65ca032be *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
8ee01a69236eae0b23d68c960372e88e48766cd7ba55de3cd39aa4d1592c5b53d9eea97fedef9ff51129c879fafa23761c68c907fa4349bd95419fd47493e291 *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcE3NHAAoJEDT4ke1a0TzTkYAP/09VX3IIWtHSyR99gHP3Mkb2
/gx/qREJklmpKGGGcOrv3UEAQCHJYuRz5Ft/UeVDYcrOa255VMRtVJehPhjKUlr6
DOW/EtjtmkeS4S8QoAiavvaP+w5L+Qsj0R2bbk30VjD+wBUSdjTNdYhsaPx2qy4M
mricwUy3RihHAST7j+ujWxqChyk5zRWLit9iTZdA7ET9/TdW1peP25IEUUBAc5ol
THl9k3FIbape1o/ObBM60q9EST8BZ1voCDtfNU6YFsX4OhwoY71bnYY1tfay1XaA
7NADy2d9KAa5Y+4XZfZ08vsmA4Kez7y2UmvS04jLmIC3q1JG3wz29uxVmKUYlF9Q
ojU5q2bmyDJLIKPm7erU3IKEKWObKFIGt39z01IJXarvTfzwZLxsdhwuH6LO3HtN
hD0KrfK2tyvdUusoNR8l5PBe5HXwrDOfIjsszPnJ8sMQaIj7uRcSo096xKIqD5e1
Izo9WP9iZDxsYpxIdEilGb4xV/Z9crwS0QFAN8Kr6J2qCi4XsWHjc9tQnl8Qhzt5
TvcLdXaugOPLXwsTve1HOEQNb+33ttd1x7QHfDQ46CBzKAzvfUBjlq3l2megV7S4
fWgj0ipsmeg7ckYpxYChMZtwOrd1n9ZHrdTRwzJhblJEMCVcOcBv/Cei7dBlelGi
XI09mAcujZ2xSy7ErjJ7
=6x6M
-----END PGP SIGNATURE-----
```