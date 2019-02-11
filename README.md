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
7c7d20930a2026edc79e21e0c4f54b32623b6abc3575a1f5c9227b1069645b3702a3f63f8f6f6a235a1d939e91c86b5d5c6d45afc10d71c79f8b123c8bd12f7f *linux-Sqrl-1.0.3-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.3-amd64.snap
5df3a0c4dbd45d1eb62a90c33d3d34668d68452365379d9f79489ed12f050561fd9c574173edd00d30facfbbcd54862f7719166f5770aa489341511a593fc7c6 *linux-Sqrl-1.0.3-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.3-arm64.deb
eee0b296d72e0eedae6ff50bb1078a95187cf06b16cf14b1a0ee16567a6917d440c4afa9f6b16882774aa262bdc150fcee6d11886214a28a31183128e3c26966 *linux-Sqrl-1.0.3-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.3-armv7l.deb
d2980266c356d94c32a4786a5ec3f7d1275bea1385e0db8b622d2a09cc89edd4e98218883101a108082539e4a5ad8f6bf6d229f91801e9a2ba663e777e76ec29 *linux-Sqrl-1.0.3-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.3-i386.deb
72efcf496af553132f0e00b3aed147baf8504123c91abf23e4616cd389b01357fafd6c90023a15d82eee250c4441db6354418fac688ea3abe621970168b965fb *linux-Sqrl-1.0.3-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.3-x86_64.AppImage
2b45c8116e2c1f4b4b78b9f5df27fa211883704e625e62017e7e7f0e8a00206b5f55b1f7c63dcf0b972ae986544521d0ce28cbda4d575a2e47ac8842d60a03ae *linux-Sqrl-1.0.3-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.3.dmg
e060ff0ecc9c3965e11f8292ca8f0f8d484ff200984112a5c4b63b9ec076adde23363bb1b6f2d28bdbe97c1ef03559e09063424d828e88e92eb130f32798ca47 *mac-Sqrl-1.0.3.dmg
shasum -b -a 512 mac-Sqrl-1.0.3.zip
f600c4708a3562fa3d15af3f136e52019631a91e5ab231452cd6d597676f711b7e67b12c47e8f1ee0261a5bba7d1381587b70a2025f7c2cc39dd9539bf0e1ca0 *mac-Sqrl-1.0.3.zip
shasum -b -a 512 win-Sqrl-1.0.3.exe
c6f79d07aa767decc6730a2f8aa578bea41dd107829e4b3c96c6219d843ca9930a21d6f26c8d9ddbc4eb72795b724ab8ad7af9e785da77ebc22a8521e700746b *win-Sqrl-1.0.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcYNtXAAoJEDT4ke1a0TzT9YEP/ibxUuYKiayA+2xlNRoCKcGS
nQAV82BrZmXar5iqOQ9V+Xy/nNDMQP/YrJH6fhtUiuF2i14H4UBkvdPjZoOPf2Qb
LNfS9QZkAsbeo+DdM8sQTQhHPam89oEKwP0ggQGqPpwo/Ix/Ikwa8W2x1d51E7KM
Hu2g9DWZTlQZwfQSBH7ygUn2fhHcW8+SFu/Jlg7vZ+hlMRg7VORo/mdN1Mc4n4Xh
CHJg9Vv3vNWNnGFSf1w4n2XGy/jdlZi+ZKR4WJ/emtbeKtjOsk2bEDamTdIwsIKZ
/ovsumF2Gz3zqKpGTmTZw/OF1GKqFCDNCx+mKRuvmJnODBhhYwgTXavShCEQ6T1Y
b+6fHi142LCvNa1eIAu1gX9N+2QulY3zrwpVA7fTiu3vux+Nc7G0hDl/osx7mxVK
lNWX7kbxR4Obu/RpK7BO+uxD+o85s2UDz9x1iIWW4EH0BzbU3sirYu6KxYBsM6w2
J9F4XwIAprVL19nQKxu9gpkwfBEo1gZFMzdY0C1XJiilylWG+1ynbHNXJGB1IUOz
/g5+EmGJ9PMwpQAclJa/b8pN/WdeYHszTA+athY4wkU8kotkPs5D/bGa4jabism1
tkVSH36TtX+nKr98i2Ifw2Urz4ks2+eSL+z6Ck85hJoI5siNvnYq+T4/Ik/UlQBI
bZPlMxymYBpAHhCR2U1t
=J/sD
-----END PGP SIGNATURE-----
```