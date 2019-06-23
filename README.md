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

Current 1.0.7 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.7/win-Sqrl-1.0.7.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.7/mac-Sqrl-1.0.7.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.7.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.7-amd64.deb
3d9fd88470a642038cbf4f1d3fdbbf68c7f5d163110b8acce71410220afaf8f45130e3b27a65c01b8d8fd19d5e1ea0406a97dc98f9683c383aa1ad138f158148 *linux-Sqrl-1.0.7-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.7-amd64.snap
185e35eaa9fb80dd4f2d8538381751bd6ee347630e612a81c35151b0f83acf74d137ac7095dd84307b24adf72787f6eee4f206c43a13365cec12b87de4344ee7 *linux-Sqrl-1.0.7-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.7-arm64.deb
16c923f3a08f00d543ce2146eca3f51cf65666837f4addbd26c127a3a25c2058e40795f4db09319e6e0bedbd568e141cc080901626930b7b1475e30b9d2d2e64 *linux-Sqrl-1.0.7-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.7-armv7l.deb
8be48c8b3e2073de5308cf0c0b30d141557a5e96686d19bd6309a1b7551af9e6c0c1170a9de8025df9a72228d3af9082c364b4a975eebf0c48763fe6d812bd39 *linux-Sqrl-1.0.7-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.7-i386.deb
29fc14d6e8adb5fa549ee4ab43d0b1daea5fd95c813700240d8ffce11ef8b1066aa286781eb619470f57adde75a79155101b71d54cf5b98774649d12ffa7b147 *linux-Sqrl-1.0.7-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.7-x86_64.AppImage
42dd39728c9b853dc64b42a44e59af52325a5de4e7fc24ceebf97c8fca627ca1ed0701e86aaeaac476eb3f84be1856bc672bc21997a86cb12265abec95c866df *linux-Sqrl-1.0.7-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.7.dmg
1d1006d0e395061fd53d38b74852f73552879a241a18fa22359d500047c5fa0aa0988519d63064b58f488111af5976a2fd42f07e14f3b0428301b2364a1f8643 *mac-Sqrl-1.0.7.dmg
shasum -b -a 512 mac-Sqrl-1.0.7.zip
556beee367d5eb736810ae29a07ce67b5be6b83dd0548b41790a4ca27239e3ceb1181f343166f0fea04d3a119556f0bbbd4839145b93bc27cc48c97da08d3434 *mac-Sqrl-1.0.7.zip
shasum -b -a 512 win-Sqrl-1.0.7.exe
a767b0339d801b019cb8cc739158109a906b7ece9d177e1546262d89699fb4e16205fe97f1d6f4b2ebbf3d5a3da21439da05d618ac7f8ae99ae81de9ecb929cd *win-Sqrl-1.0.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdDt0yAAoJEDT4ke1a0TzTOMAQAINgX0lyieiroTiuBpzHnKuc
yQ2h+2afsVakfkEAOKadNIcXV+MNS0aDPPhvlrlYg3ROGzg9V1kjveG2kcEc1Ok0
5vvwXkUNbZdOznzMJZTGcD6iPUBZV8Qhme4R+tpbF1/WnTBTHpr0p7rHS0S+xV+d
Xf6afGW3ksgRkXkVHVwxlBSW141bbuo6ZL7ORDH31h8hLUX4wgIA3d/yFg26XVvm
2/Uf/3X23JaFSv/NURMhcRsQSSEj+BjPoG9iQ0lhgTYHkglAPg18YtCvyc6+2Gt4
5d8JPBCX14vAbwHWMgRIHpFFX+EhaghVm1OON/i4MhkX6jEQv1ZrODPL0PsAgXfm
t/wUb4s1WsecT29fX07hQD+18KNb46noHSHG8oZuFPIo9Xx4wPhtJ7u6XM0jDy2p
DxKSLuwzNY6NjKB2cU+twqDSswQoQdTjfr3t4+EG4F/2nW/gW/42HZeilxIrWZdr
3H/uBPu9BNTLd9GiMrJILebBZC4ib/E7apc9k2eDGwzKZbEcxAdYZ5b89aVSeeu6
yluIHbMOdJy/cW+LHL9cETZUWFF0V3GVvA5cPF99GvPPfpaTNUeYFrdoCTTmHhV4
2SZnZ84UjNqWNobnQYwzWIR+bEo8k69ZXveOhx9yXGSePvSn1RbBIjefWipMV+aS
WjZ2ZIp+QvKCy/JQGEvQ
=5w25
-----END PGP SIGNATURE-----
```