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
- **ScatterJS Core Support**: Version 0.5.5 of Sqrl now allows users to sign transactions in web-based dApps using ScatterJS. Users of Sqrl no longer needs Scatter Desktop in order to authenticate and interact with their accounts for EOS.IO-based applications.

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

Current 0.5.5 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.5/win-Sqrl-0.5.5.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.5/mac-Sqrl-0.5.5.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/0.5.5.tar.gz)

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

shasum -b -a 512 linux-Sqrl-0.5.5-amd64.deb
abaabf6a6a18223277344d4be9a99e31a4b750486410d4b03b940ef043b81930ed028017c1bb415a73b420db4153a658a177d8ff0be8d562401d71e995259213 *linux-Sqrl-0.5.5-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.5-amd64.snap
2e9ec9a73f404c04ce7aa9d10d28194497d82d72d5abd6feca1f1c66eed1158c241e9df02621ca88b76c3f865ad5dda8a1c80133c41b214a061b0261411a8c19 *linux-Sqrl-0.5.5-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.5-arm64.deb
2bcaa6c0f7ebddb2111e76ec2391844d34502c476bc47cb45691f72c7660e266b04ae60299d5faaf23205a79730e4627e8b58e8458de41f90e24c0ce8624d8eb *linux-Sqrl-0.5.5-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.5-armv7l.deb
13f3202155c6794bbe05bf9c07b2aeec30fcaca404f4d4e6c2dc87beba7b545147cb5cee80e2ceb4795025250c04e48adb82688d13ba18ef7d454895b19fadf5 *linux-Sqrl-0.5.5-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.5-i386.deb
11247129b8c6616a6a373fb5f2bea7324726a1db2dd480ce330f23642ade424bc2cd3951055eaf71bbdebb3a6475d6ab5c0a977f449e92316137f5ad4e5e2177 *linux-Sqrl-0.5.5-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.5-x86_64.AppImage
c5560c7f644f698b185d2857a12a333d6e3995386a86b240c1c837f53b5858269558d856fce5016bb16a7d6d776fe5c275b20250a99a33d40d97691bd373c646 *linux-Sqrl-0.5.5-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.5.dmg
65dc1fd3e46e6448e1c487587abb7de4d6c27e85ee76efadcaf6ead05bcbad5d6d80a5b695a722c4b3dfd071921999ecbc225cdfa4a4dfb04e2d0376cecb82ec *mac-Sqrl-0.5.5.dmg
shasum -b -a 512 mac-Sqrl-0.5.5.zip
80ddb5871ed2e9a6393c237c7064eb4c16494fa1fbccf560adb3aa0f59960dd7e3711f5768a67b1333cca833b6b1cfe23f46d717d4c5bc51412e13bd61af4c30 *mac-Sqrl-0.5.5.zip
shasum -b -a 512 win-Sqrl-0.5.5.exe
c9b307e6cb6a0437e111d5499ab229f2104f8cbd2f97e82e6ba7e05ab997707721be309c1162db649ee53431fe9a7d299307040ade2c25d2b11d19f32e9e0e85 *win-Sqrl-0.5.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIHQhAAoJEDT4ke1a0TzTnZMP/2VvC+GzMNEh9Jbhs1PCAERs
uPScIw5yBfq3hC+bm/sokUs8EN4j+KR+yv39UwC5JumLZRe2jGyddvy1HruszdPG
uJ7gVBqMQBO0tDMjQMRXpO0mm9Xbu4xg57lAEeuTYB9tU3OZjjhrYSi6icI6h5Uu
QlVi7nwespVlYpU9ZL1B0XzFhqjgbQS592wEfw8G2GbvxwXO7Nw9klw/m3k6EV9R
mMisTdV1oYY8OfGnL6nsg/xL9N4LLD0LGf2nyu8F+M6do1biaLQaHt8oM8LF6jVJ
HXlp+e7nxTx6KGvMfE8Uj9Rd9oALG3RZe/whe1BltCIKKypQMDxtgd6RzvgMlO4o
ahlgfgHO7T5W4iM9axj7/wpphvt5ZD8MmmMV57qom5B5DWMu6ppNMeyxrdxYhGF8
OU76xzTgJz5kTbVWTCA0adIbqSVCyGGwC5MNe48NHh9RQjB+S388Xfn+cevr4OS0
JaQpz3krp4uZ9cXAYBec7MfHCk+Ipj0x2oiK7iJ/fGVTuRAu5qVx0JZeN6qel8kH
hs2Xsm+jZzxfPiEhnIWoU/MmCgkAFQKFM4Nc5z0RdPcouf5tJUOKw0pBiVyf+0Ex
/KcXSaYE5C+golg1l0+IuGnCE1BbusPY0FmDrp2fkts7UIEg+GEAila34WaXJWp8
6MWNuGcSnUENthwAbePz
=74MU
-----END PGP SIGNATURE-----
```