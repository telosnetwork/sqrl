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
- **Free User Account Creation**: Sqrl provides a simple wizard that allows new users to create their first Telos account on their own.
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

Current 0.5.3 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.3/win-Sqrl-0.5.3.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.3/mac-Sqrl-0.5.3.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/0.5.3.tar.gz)

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

shasum -b -a 512 linux-Sqrl-0.5.3-amd64.deb
9be57abcfbd4a50198269258e4c595055fa287a4863e2b9164f9f1c5fa72d76ac37b3ddf1f979d71cdb32b67e468f5b8f3c61ae9fc553fb84353cdcd23507764 *linux-Sqrl-0.5.3-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.3-amd64.snap
841b424819381c884374e6f56ac2a696bd1cb6e4ed452c2739ec520e2e2b870f13326c036d17f93dfaee04b7ca2d2666850e007f93a7eba742b46f687ff7af1f *linux-Sqrl-0.5.3-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.3-arm64.deb
026ad43496bf8b207c82e85eb547721dba9b9e98ec427c866a582ffd842138347dfc48a6fc2922216455574e48caf3de88b02360a216e0ccc98782d15219b761 *linux-Sqrl-0.5.3-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.3-armv7l.deb
c97164b9b62a0a44954541b79d139e81e81942115325c7770c91a8531cd152e02765cac6b1f3940e1f3c435cf74ca48269d64923f45c0620040b19dcd858d501 *linux-Sqrl-0.5.3-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.3-i386.deb
6cd597f018c59b617287da89b5ccaf31d5300644970fe2a0a6c4be18130bf84c5986aa3c48e30c67c3657abbb34591c6b36e5bce5794be625f506b018030261f *linux-Sqrl-0.5.3-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.3-x86_64.AppImage
ca2fce8e72ad657fb94b2c2c07e24576ac8244bab1e494fa754f3740bac4a8662c1e8437f6d580155fb25ec04474e1c0e6ddc301cd954a684909a35076b7f7e3 *linux-Sqrl-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.3.dmg
60080660efaf163315732e9c3395a8f3c82c5b9d0e7471ced83e3ea4fa8b226dfe1b52a3381759ed6069d235a6959b6cf2bf731d38931fa605ed7ecc48a26b37 *mac-Sqrl-0.5.3.dmg
shasum -b -a 512 mac-Sqrl-0.5.3.zip
5714ccd90b39408f6c8d9abe44b63fe9f3ca3b0e65f966dcfa1211c4f5ac2149a0b5b9a5f8391c51c3f44438ba9d6eb5992f8671b4395dc6ddf6c25a1a08836c *mac-Sqrl-0.5.3.zip
shasum -b -a 512 win-Sqrl-0.5.3.exe
938e1cc73669aba72b55ea21e06eaa6f4c6792ee14fdc3b3fba874a960fa5bfdbf8e43a2aeb7183a44d027fbc8dbe284253e007566c7d0d8210f1d9875e84c1c *win-Sqrl-0.5.3.exe

-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb4h72AAoJEDT4ke1a0TzTylsP/1U31dWVUR/T2uiB/h/TiuzE
6HXZZBLdnAS/OmnnlF/oN4MWgUhrBV96Z4t3w/Upr1jQ/IbsLC3wI+lov0yG5B4C
Nl79D5Uq2+TTwFO8RwBDvdRK3R+Oom7vbx8tuxj6fABwNcSySxKTcjgBemYtLdl5
yPzJY8UAFnbpMkBu6M9AgU8PJiGOkSyxJOH5tfipirHaMWShjJYkQMThH4o89bbR
SH7LruECCozmjt53GPMSvlNKG32Rp8COOioOgtZrJkuwzunzAI5UFFVFTR7XdIie
mSOZOEpJOcpyodfjVdWknkYGaJnyMe8Hsh/hbLm5alTJ2DhedUM14jHiCubO8hXT
aYm8blY6yjq9y51fFZUZWqRXPjZv3AWRnuTvnYbe7jqC2CL7oHr4dYPzv9ruAi4n
psMrxWgmpQf0LbKwBcEQczgRGt8BKBfpyixj2a92+kp00dqbfRWv5kWLZ5SNNeGV
RLMfNQY/juVCDEdYnFjJOLLq0oFQDnS7vE/UgD0/8MrrWyHRsyHN/0FVWW1TCCcV
P/NM+GUh7PlzAP08sly4NldbBDt8Q74fNtxDuXT9BqPpXWoNdtK58DR/5bP7JmdZ
YfupBpqvb8O1Vljli+CKosj2D6Pmm7yR/j2t1wredtYbOucBZgGUdyahKEVCK55+
JWafGutrh5ICOXdlejGD
=+rvo
-----END PGP SIGNATURE-----
```