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

Current 1.0.8 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.8/win-Sqrl-1.0.8.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.8/mac-Sqrl-1.0.8.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.8.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.8-amd64.deb
26e9e2def684bec39423fb2140051fcfb636c77de06e664440562c8addaab37e18b727fba10480d0d1effa14b712756d269d432887e59ac3e46722a0c1a502b2 *linux-Sqrl-1.0.8-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.8-amd64.snap
000b3701f779d38d5377fca8996297c888854e60376674fc26cf94bc1179d3517980e71f0a5555367157ae19654c1d2fc96b13952533b71d937268df32d68918 *linux-Sqrl-1.0.8-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.8-arm64.deb
3c27301396c795dc07f0c8283dcd95cb93c3cabaf60d1c3c4f95d782ef98d09771f636598c0ad28d19a3e85823652b1981a6459ee3cc4b3dda19a2b35ddd04c4 *linux-Sqrl-1.0.8-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.8-armv7l.deb
bcb36190204ad5c6897bb7f6d62c1e461afd8f1bbfa4617be856f6e22c6fbaff56f3dcf3bb5fc5ea95b61d44ce965c86421a1ce238a249effa9849629aabb0d5 *linux-Sqrl-1.0.8-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.8-i386.deb
aebfed3f5aaddbf0dc88d1394059cac3630ae856631ddd452a2af65f923789ff187673092c5dfe3c39bdc4f3a039b72cba680db11eda69cdacd37f4f1220ce7e *linux-Sqrl-1.0.8-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.8-x86_64.AppImage
1896f4185bff6c02b99fb3b7edbdd2450f5ecdead1b29b1c68fffa6b408dccfbe1a96b5920dcbf2fe34b84d7fb0a8b5774f78be38e5bda4e1ae8401e62a5457f *linux-Sqrl-1.0.8-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.8.dmg
f7610267622558e03beab83210e5847b339eabe16a37969c5d0bd14227351e539384b56070dd1b2cdd3702691d0433d0019004edcc4a7fab86e2fce07baeec59 *mac-Sqrl-1.0.8.dmg
shasum -b -a 512 mac-Sqrl-1.0.8.zip
6e42e50f421b1e0729ceecf62120410211846e33a10a02964cc8dc225d492e7d21f11bc24c405cefde6c65280496d0a9a7b75d825f0535f23b3d5742f9f5954f *mac-Sqrl-1.0.8.zip
shasum -b -a 512 win-Sqrl-1.0.8.exe
4a038025c105e458230ceeeffcec89e8e8013edadfe2915469f2705b1dd320bcc2f62873058a5c2f76b3a254de95efc4e631248b5aa1376ecb443fdd81929120 *win-Sqrl-1.0.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdFmJ1AAoJEDT4ke1a0TzTu3sP/2Huv5QLbe5lSzp7QRTU3BJg
4ANo5P7GEfiKB3GWeJiAYsjB6zkXHjg1we21+d2b5X8YaeprFT1TQvkVq/8G4BZO
SvB6NMA7mDuAsnFqpfixI4JRkJ+V4md63r0jWSQVQxyyfY2TJgX54d4WbL6Iw565
2fSwzULVzU4uneDooBNUIBSwghMy8osYGstyQsSB0uf4g4u+hhrpuV71a5gh3WIw
8H/iUflNUbFQ6ljF/huS4iHCoq/2/SNNYMYJszEUih6G6RWl4OOeFScnykwW1LXs
rikb86Dl7nCfRSUaJOc2xplPM4iVHHRmnBDzxniRWNFQGJaNR7FY/Pb60N3MmF2e
h9Z8Qz+AUuDV9bM9zjuO9okRaMZ2rR8pveIyK24Jwim0XRmP9lviVC6GmoRAjpvX
DC5TgLPp9qhMoC+pUEooBtzpuRYzMTO2vRL2Z6fOazC3IeRmrIsU7U7BgDKZVWvl
MUac5iJgzsQcH4s81HNIwtHoTPe8RZoxf/JLZbVZmtIRCWRHwv4ZXT36MTZRqqOq
onD+MPvGRCeLG9gD2pmjqfPV4eWeuiUXD+BtmonjgmYGYuBN0LHUdeBNQ7deC62L
V0nKfYelzpUuTanxE5llvZjGcNOP77T/kc7aJdU0oKPk4bUNYLEV/KnQYCj1RvDT
1dRunORQBamZKDaKJuGC
=CDwB
-----END PGP SIGNATURE-----
```