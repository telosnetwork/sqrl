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

Current 1.0.10 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.10/win-Sqrl-1.0.10.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.10/mac-Sqrl-1.0.10.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.10/linux-Sqrl-1.0.10-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.0.10-amd64.deb
3ab561b99b14c57a81077b7a27709ab09b7b92d701c882c723920a07828191293f9095ef16b5cc0ea9cbb6114e3eff0fd652dbf0b45d44607044fdf0e04e6323 *linux-Sqrl-1.0.10-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.10-amd64.snap
13500402343b829d99382a6e478a9fa547b1d95693c5560bd111137986c09b21b971e03526a26033663d09cb5c06643b2fa6771731e7e4f893da84203739f2d3 *linux-Sqrl-1.0.10-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.10-arm64.deb
4b2a737e1697296598244d5a8d0142380534790a8a72a821def5ecc6850e4264aafe6e01bf627b80de018cc7e0f4702dbcf5fdf1aa078566e4b2f82aedbfc822 *linux-Sqrl-1.0.10-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.10-armv7l.deb
fbe2b7bb3bd38ded0dac6ee621ea0ccbf3199cd01da0347f59ebf5951688778687ff2300b6a65d869a4f45d6bc64d41f1631449b6624f85d8afb771fd25272a9 *linux-Sqrl-1.0.10-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.10-i386.deb
3c0d113e4f0412ae3f1680b65e260f09bc0ffa0f3dfb14df7e472087ee4a2912c7d6f13917727ae8f1ae53f45a272f097c35d9756be081220a46418b2f9958cb *linux-Sqrl-1.0.10-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.10-x86_64.AppImage
2308fac64f8dd4021f527b6a98dd133ea647577e0e842984d78fcfc3d11ae4a61555af3b5514a2a7b7b2b9eca2e07730ce577a11b681852b82fe914fd26ddb3c *linux-Sqrl-1.0.10-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.10.dmg
a4c694cbc7ca118f63262324de0d52d58a11a7b4b7fa3473e5d006479dd0376e63e0577ac8f147ea8512260d3bf575845fcc397d903259843108d84d9cc37d57 *mac-Sqrl-1.0.10.dmg
shasum -b -a 512 mac-Sqrl-1.0.10.zip
7c29e7b47cfce63671bc28f6d914960641d197297ecf4c23f97b644fbd28680e927a729f08e17e18b43e9dcfa82298a70404f16ef39acfc2dcfd234e15a94779 *mac-Sqrl-1.0.10.zip
shasum -b -a 512 win-Sqrl-1.0.10.exe
b55d182cbf9ee8ee25601ef6dadf00b0d521d76f1d21c95667bfd6d9b605b81b842b60de7c3e054592cf2d88e65c0c0baec20fc5be0e72362245cb8aeab23055 *win-Sqrl-1.0.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdHNbaAAoJEDT4ke1a0TzT/JIP/2VjAMNPqle1XR/sNHTHcEx+
Tn5Xm/0vFUmktfF1k0CRolIrAESXPC/RRD2GYGQoB59Vqzq1bXfyfU2iqI2KYp2L
eSGhBRGISshpKMk0w/eJv1mWeU6mU+Taa2iNrt+zbo7Yn+sxQNWxDUw3ELVN9omD
Tpf1hRGlyb9dgRU679fa5TbjQ4VXlyv6YmQvIUaPdVb4tNe4BlKWVvZvth7ZuKCb
knE+9UaxizkEy1SU/V4tIK10Sy51x9x6S+kF45j/Y7ctYPe/mZts67y1DTBswmCW
GfoPBeQz7E1cVigILJkUzz88tMVqRgX7xFH7xLr7Z1ZxD7i5NaFzcnXCp9mwroIa
tj94VTXT8d7gR3aPzpxHCXPzVdHPhbOh8zEgX/urjoG10Hiw+Eq25bEL6LVqxZm4
TBDdTm4Sabdnvd4erirlURZEmy/d7BSIH+kICMGwWY6wh11WtQcXVGEBwr+hRD8a
XgwDxItAk/a8aTb2uT+4Iol6FVYRjyReTf8vnKPwsp3qKmaYlmWcUbsdXvJ2fqG5
IZlFP24mDBPK9vTBXrrNZZ7EYf+h5iiHR0+/NkJiDYT1xnTl4Vhp9JZlfXfe/roh
WPAXBI7bN8YZXBc/XJ8b4pWjzhWuyrQTjmYKcDl9C/S+AdV7FoarYurzPK506VC3
mUnNMn1SULkBYTfEQZXk
=hy1Q
-----END PGP SIGNATURE-----
```