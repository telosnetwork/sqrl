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
0a051f65f0d451d6526451f2b3c16c1d6e23ea638e961538ea2de3c189d052a69a8b81e6b052f53bfc48ef80f4c88652e0087f441cc0cc7176eaf85254aabe67 *linux-Sqrl-0.5.5-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.5-amd64.snap
59dcdbc756a4daef6f9cab215f6585aeb6d2f48054c82a4a0fc91e66e1020eb46f7e84066813e73f93c417bec7bf1f600b31e3b6822fc11023deb3ffff005160 *linux-Sqrl-0.5.5-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.5-arm64.deb
da65f247983d406d2de92a63323c447e794d2253f59cf0afb2d1511852a5456224d04cca705ecfd22582f12ab40a532dfff70454ca4b7e83b83f91a90eae6d1b *linux-Sqrl-0.5.5-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.5-armv7l.deb
39d5e5b318dcc1e3ca2deff5108685ae86392162595642ad3a144778eb8acc543887ee6363160e280fa84a173d2e1f10ed8ee1e1b0cc477ee77881eca6120110 *linux-Sqrl-0.5.5-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.5-i386.deb
1a8f6756dd45ce08acaef6c848070cffebb3d0ea67bf12f4b214b82ea3f48bfbec3a4fc8af3e9398ef0b2dd0a01e0c156990fb3060b0e70019ea65dd403a4199 *linux-Sqrl-0.5.5-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.5-x86_64.AppImage
26e3a9190cb9fb7914e06e183e4067aee3c60cb50552b198940201a6102c2a0db7253ea65f1fb0e5be11189ed879c2b4e3be2481898f99c08c80e9b0fd9d33ba *linux-Sqrl-0.5.5-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.5.dmg
34f67da294706931370ff8a82bd62c1a071bb2dd1e11c7b425a43239de3e67369c9081b63876f1d66a001084bd76502ec2bc9256478dc62532e51f3ceb08a5f4 *mac-Sqrl-0.5.5.dmg
shasum -b -a 512 mac-Sqrl-0.5.5.zip
eb105592db586f637a75ff8adc8a1afa1fb2135874ffd4bb33ea959af2d6e0a2f8bcdf34cd54c8bdd10b51a2a765c39e0e323bd11c15ea3e1fb7b5709daa7613 *mac-Sqrl-0.5.5.zip
shasum -b -a 512 win-Sqrl-0.5.5.exe
3b7ba89ec0c2c77c5cfe9f10d93d23e2f9af9c540b2d7d6ffea16bd046b55e3d0f55c894e0118a8b970f4362eb6d80b52193f9c208a94c4d5398091bd5529146 *win-Sqrl-0.5.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIDvTAAoJEDT4ke1a0TzTOrkP/1/DzJELkb8MwecuIN2vy22j
o1N1rcG+J7fjnbAEmQK8LtCzTwzHqNtCU+N8M3MdE+ERB4e6hlmSQVA7UsXGAYNB
klhVDaygV1dTNN7fgN8j0MZHaPacW5azRkiS7YMUE1k+6NphztIf8XRBvFlPuY55
nIUMpo8jSI97YsQ+4lHkCWMHf+MZQ2upJD9JaJbQB3BBFhPQyb/XG2Krx7g+nLIJ
uZhQBkeFk9u6APTDsY6Pdopt1cGsBqcoCzzAHaRXGtgQQJ30/asO72RzDO20AIiT
EVxCkmOwep1BMOjkGgcyxyIgKKyi6LICSnD/DgqdHYsTBlx7f07qqqXfpxHmNcAq
yDerF+e5yhnNS8KBBk1rQ4Ih1QuzY3n/KXACMS515l28XEKdjtNQsWGDMPbBMapy
edkY9ax4BFRLeBjh0KpB1XZrBggiAQNCwhxrHda8denYEc14CaQRbrE+82c+yXE4
VDB+JWx14eKgvEcxOWQ7CyxbwhcbNi4YfjBJhtIKz9Kl15/P7IHmEWaeWfXuyRlY
Q62FiXh/zWaml0+r9CaDtnVGmO8sXSYWHajZb7j8n5UwMNaruhBdLHQr6sHTcKxm
4GzXuTcscent52MrxNBGlntQWSp+3nSF1rClcXANft+LR4qavwH5aeJWbjpe7k9R
Q5H1GRIqENEIfLoiagSF
=D8Jc
-----END PGP SIGNATURE-----
```