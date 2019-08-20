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

Current 1.0.13 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.13/win-Sqrl-1.0.13.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.13/mac-Sqrl-1.0.13.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.13/linux-Sqrl-1.0.13-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.0.13-amd64.deb
b820b785b4a21502ef7fe43b7b5e9053c5aec57fc330c056c06e55610996b940faf44bee29256a43bec159d5b57fd5aac8f25245a654c0e0d3d863a55460ec59 *linux-Sqrl-1.0.13-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.13-amd64.snap
b1d5b40ca380858e3020d803f1905c86a045f5783ac0873d752339b67fbbe0c72c13f5ac9839b15c0f691c1481d12782dbdd9fccad306573185ff63fa0e03a40 *linux-Sqrl-1.0.13-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.13-arm64.deb
4da2e48523cdb35741cfdeb850c576db49de8646abaf9cbec20bad8fb807d5a463534a6fb1b4c34a7d00d08e394f5ea6d4762e2c272c8ec69b6bef1dbf779912 *linux-Sqrl-1.0.13-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.13-armv7l.deb
eabea159aa6cf221f8d73b0221e8eb7e876d453bfe222812523043c4cdba4c520652d12d9efead7944bb68226c1ab3cf2abaa60b4240ffdec882b057480acfb3 *linux-Sqrl-1.0.13-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.13-i386.deb
b167269948576b3118c5891f861d245a50c1221097ced972383a5b11ab599de2b12525bd965604273d4d4a37cf52250e1bee6ba9d2349777a465e5f76896e9f6 *linux-Sqrl-1.0.13-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.13-x86_64.AppImage
961ec8dbb2dd05461c91737cd5a3525a5d74abb748fff4794377994bad3dedc192894082ac244f9fdd096c1c152f8b63b106ce468d2a52a40f0404f14cb54af2 *linux-Sqrl-1.0.13-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.13.dmg
38dec1e1e57b09e6d11c8b35ab122aca1274c81c921dfc78c5a52a086ecd0528a5027a49358c58684aaa0ffdd196e3c4640b4d8925ef5210426b7333efce9031 *mac-Sqrl-1.0.13.dmg
shasum -b -a 512 mac-Sqrl-1.0.13.zip
0361ab88e89539a2b2e7bde9076ea7cfe2f033ce6258fc7788198a1cadcf411ef1198f201249760fe6b66297c298d5d1b3c39f9cc8a58df70ea287cd9a8d1216 *mac-Sqrl-1.0.13.zip
shasum -b -a 512 win-Sqrl-1.0.13.exe
f5e7919b8fb22c11949481477f4b592e6aa69bd06a406f15c3d0422b88d95cc019e13cd09c18f2e035921be012dc1bdbb46473646272a1e39c4d05121678faa8 *win-Sqrl-1.0.13.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdWy7XAAoJEDT4ke1a0TzTMzYP/jCELxE2qNoTMbt+5AG2pEye
nqn8oiw4d1xkJ1qwj6/xqJP6HMXBD1QeTYjdbpTaN3BJi7jCqWTbagNItmPPG0k/
504pmENFANbB9rR+WK9FzGKTuwXAzRVZqAy0KYAZyf2skQjJL+1owsIWZYBBWbsr
s37YgeY7XsAfjyXDDI2pnXqLqUEAi6Qz75//U/bhDh97yQGrqzByLAvSL/wmccTh
gSAeVKfolhZLp4Isr1DmalcsLSaM9ekiQwqpDhrb3GhRRh0mbYkV63FRwLCcOYLi
SLgjsDW2R43U4ADH3xR/FD70KIkG4McLtYn11V4oTL5iQxCj1fn7z2mkYHSzJysJ
eZwDOCF2Tcy8Jo2AIWRekBVj7Vx2jNEluqwdncHkc57KQxtWDnl38jFROy05XS2i
GIAAPDTVIXUH9/4lwUzV8Kh9ouyNg7haUka+L/2zNZ3mVglgLrOO7ijcJIv8mf58
f4Mb/yUCPJbDLlWS74hQ7duTHymKNYaWySZyrQTFO1gE+v7BTp1IR0rxPYyN5klf
lnwL4LgaZJlZu66ATdhtIS2X5icdNeTtewB8EdpD0rAzLI1esod+/HxOyAZte/gq
bzXiRBB7w96JcQPkG0Yc/Xl8y2uFoUXQih3zJclHzEZ0aSSfienXAzdypZgLQ1J6
HSGRZzx4OG8M86yXKzf5
=sAgv
-----END PGP SIGNATURE-----
```