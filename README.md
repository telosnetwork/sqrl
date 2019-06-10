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
7c019aa8f3a62e0f533a5d1c2c2c272dba2b84bc4696b2c43590b7cc60853072f4a3314adee133035cbdd9763b4f0cf9e0bb65f8efcb5222b83ef3d0268f0a5f *linux-Sqrl-1.0.6-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.6-amd64.snap
1e7c6875b66c2f3b855781705102500932ae6d60ca3d43169dce31117e0058970968855346aec6e583f18e715365e2a6fee340d21f807788d5888f6845045336 *linux-Sqrl-1.0.6-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.6-arm64.deb
9baf5acfe7be92ebab6f60f50b83804be25a89bad37030ea8066f19e9d9869824a07c1b66df17075bbe0079b5b5455f5b52f4dd17d25d0288a5acfde4687c0b5 *linux-Sqrl-1.0.6-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.6-armv7l.deb
ac793e93a8ff1e80e1889ec9a4a8b1428be1ffaeec0a21cd37c8b655ee736a13f50b63de832d2e329a9f81a6c123304b119487f09d8104b4f7c887357d1cd730 *linux-Sqrl-1.0.6-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.6-i386.deb
a4f7e9cae4a868541d50dae16979389d87b33c4b144d64afaff4c19c0814c6bf2746acde26a71cdc6e42076ffa48d08a44e50353160ea68a5100548ea1790eb2 *linux-Sqrl-1.0.6-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.6-x86_64.AppImage
707aac3b4e36c603020fd05cc73364b5386427856cd92dc10f2f012d02931283efea5d13c7db61085de4925ac5633c0715b6024da62cd82ee48fa3ca68becc51 *linux-Sqrl-1.0.6-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.6.dmg
c741c75fd6b6040164db845630750b46ad6918bd79ee8801f4251b534144890a0a3dda4d0dc9ed5d752e9a1d21e04d1442a8a38f3a9d4aabbb349a31528270a7 *mac-Sqrl-1.0.6.dmg
shasum -b -a 512 mac-Sqrl-1.0.6.zip
a7b073776fae020c39f48c63fcd2eac64f83815b8f239555d70f069802c16711ea2bcd1ca55bc8cf3992dab82cdbe25835ea137781ed594d131922ff2c0c4fb0 *mac-Sqrl-1.0.6.zip
shasum -b -a 512 win-Sqrl-1.0.6.exe
8b7e8a2b6ffc7a0ad4056a3f4b974edab89d1e5a26d1ad4a4fc286172843af892527e9c6da802699f37b0566076a8961dff1d320455bea1d3c6e8bc6aaf5ccbd *win-Sqrl-1.0.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc/tq6AAoJEDT4ke1a0TzTqK8QAJDkXt8OOjKYR0fKZ1lH7Btj
i33T1B5NLqUodAapwJNYjl6K2QhAjkFhjbS1iqtBdxDemUqdJTKpA45xSoeiYbxW
vveo+m1p/W61MFdtYEVXLfId/gyhRpp/ysmc+vSQ+y5pGsm4k/fq1frE8A4l9FU3
RdWXMy+l83iPbMa/64uGaB0+MOKY5qy0c1fgsrB1QaGCQsup1SoGfArPF7r2HcHJ
Q/7d+1bpv51cUhVN/tXDVmKijikexvQED9qj+86t91XfnXjSPQ6LV1206QhmYuIj
pszO/GJrPil6DYgZOspcJ2ij/ATN86DDgVeQpGQjAWjsOibrHbvn5kMCAEk1Rq4a
zngpXZEZDsdqzQGS/H1UT8QPdHi9oGGJ6Smh1NMf7jBEC1d/WdgOHWsTn6nYrNGX
z7zjvgJNicuv/PBtCm/ZDWoJMCPuqqAPWK3duWR08aZ9GSY5sjacwE4tV7WymCCi
5Hcr34aCMVDBb+razhKvTOKJPCsnBzS1szDYMH41bo4Kf+/AuqzcvxOIh75x7deW
EiloobfbT9AVh7Wg4/Ve0e/94aEj5wPYLwNWdf16KzT6tkYAO1vawvFSQDYImfvm
ivo1//gkbhEbKAllaRM4G4Jq2B6RANscj84k30CXUsy2jCsR6PrOSlBHas5qYI6Y
21582+z0vUgvIXztOP7b
=wKNy
-----END PGP SIGNATURE-----
```