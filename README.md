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

Current 1.0.3 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.3/win-Sqrl-1.0.3.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.3/mac-Sqrl-1.0.3.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.3.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.3-amd64.deb
88c9d17e067b7636fa8b077b0e16e2da7d12ef65a129860d2590b53f0e80ad1d694c653823c8cf8b3fbc72a377eade81d091c29000c0b9ef3e882978891c4d07 *linux-Sqrl-1.0.3-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.3-amd64.snap
cacd6b843c58c3be4b320b5ad1d60410dd9a90213a59af435d2eb9a9b57bf5e15df89837fdb13a0a814e886612839effb654f4192234d7623c097bef149762e4 *linux-Sqrl-1.0.3-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.3-arm64.deb
cbc6633217d8b0147b0f5ca91d9c1bd15a4341b783ccd55f251dfc5c82d98bcc91e090dc909bec392e47b68473204f16b0f28d87f7097bb0bc763d2cd55cd2e9 *linux-Sqrl-1.0.3-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.3-armv7l.deb
b54f10931cc27f2f59e0d6a94a5daf568f1e6315cab8b8af00ebee842d57b54995a36b09bf39a01a3979a174d9713413c8a2ee0056b69b745d8b57430644a029 *linux-Sqrl-1.0.3-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.3-i386.deb
1e3ab006e334a3b892dac8907d4e9a9e92deb570b53e7edc9a574f9177095c7373509708cb4c60436359189f67d9f12d142130214fe5f2870226045601884fa4 *linux-Sqrl-1.0.3-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.3-x86_64.AppImage
7cea2055a55f86b586745022281e9b536e02fb4b2d3c30cd31df86177d79e1092b0c6bc0a5ba3d359282c16b9a11950a42662be2e295b5afdbc699eecd979c0d *linux-Sqrl-1.0.3-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.3.dmg
198435ea5d68a24b72cee1243a9176891af06f49d9c66cba935155d15c28fde8cdd9e9db2e0c85a094173a845dd5b3d3d97f2aeb141996d2222d4435147df641 *mac-Sqrl-1.0.3.dmg
shasum -b -a 512 mac-Sqrl-1.0.3.zip
29a8c03a94255a0e5c171ace3ee527d10cce9b09236ab2d71e57aabc5e8b07d88e71c16816f3d3b3a4cb2f09f23485cca4b7bc4d6e6f0727a7b8d759ffcf2841 *mac-Sqrl-1.0.3.zip
shasum -b -a 512 win-Sqrl-1.0.3.exe
a984633844dd69a8234d722f57212322effd236c1a30bc134703481381ad1a5ccaccd47d2b4dd8c704b146e1bfd387265690068765070dc1729675e100ad1ced *win-Sqrl-1.0.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcY0pKAAoJEDT4ke1a0TzTQi8QAKvC3owDtpA+d1A0H7hcgItW
KzVLsuKwi4fdhl/uH6FRLWJwcpRfozcGsMXEKuauTxEtXdDu/I7ruYNR1cR2kFhU
Y5sROe97wcW7MewzMyNBcTdN3lS4KioTfsFAB3PanNBz0gMVUVBehFUXBTB2SJ6n
BhwjWHGyvu8U2K1wY5U5idLLI7iM+bCieybXeh7CTCw4bsZFwgh2uF2h56B5Gu85
LVaZ7cyk8si4hqyeBla/WYbClswjOooipYwYc2q/s0g7i7VfPaFsKybtP/9sWWta
a3L8In0BlieqpC4p15GfmWcKvxUFxg7L032/o49rCrLdFXfkOgs7HWNoeoJvAlmZ
0SPMvu0lekUEH2+k1NZGCnSHP+6FODotzz2VnEv+zHs0Fe78QuD0/lFsPcZichX+
Svq+Snso+eVGd7l/xY/XIqcdOEJbAKNTJpirI1Kd6knSB5Jx33wgcZPwdg9vOyIa
AQgWne9WG2TQsU/sDIX9+rMYyXg+8W0pcJowAQbSRwWC+c2B08UkfVt9OSwVlrnP
M0qthWpDtfPbdPXFEUglOxRl7qkbZt7RrISpluBLiPUrHVj3Fip51DKUKCcTYa+r
quj53ffRFAP4rf7/75q3LkxChuFQ6Nt4ao9nDLAyicoT6OLvMZwU9MsuUIA5pluH
V42LREW4WgzcE1rbf7m1
=PxEt
-----END PGP SIGNATURE-----
```