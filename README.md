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

Current 1.0.12 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.12/win-Sqrl-1.0.12.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.12/mac-Sqrl-1.0.12.dmg)
- [Linux (AppImage)](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.12/linux-Sqrl-1.0.12-x86_64.AppImage)

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

shasum -b -a 512 linux-Sqrl-1.0.12-amd64.deb
a9468f020081bdb0f8d37009860ef847c3edb90783e167c836104f3f73c1b8449dbd67bcb0a256aee56a8a2f354c9fc3c364d24ca263aa9e24bea462d275931c *linux-Sqrl-1.0.12-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-amd64.snap
7e3026bbb260a14ed3f796307ba6814c2e427c6b4b745c7c560a7f18e256139b299d9320e885490916abd7a0fbde24cddf5fa6548c40e4ed191b463ac237ced5 *linux-Sqrl-1.0.12-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.12-arm64.deb
45407a1c4d9c1d993b0b952b67a786edcf50faa85587d89884d5b5c48b44c2d9899208bd2daca280a58a0c9f528b1ce526542e4df88c3a5cb1fe40d302327ba1 *linux-Sqrl-1.0.12-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-armv7l.deb
0806e665aac4ef8b3c321cfc856198dfa37f9bc12e4c05b10cfbff4ff5cdde50688a707184d3cf6e4d412be8a5dfc4d1f4680ddbcff978fc1e68bb9cee1a0178 *linux-Sqrl-1.0.12-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.12-i386.deb
8032b73906336b31eeedc1239f520525a557c51d01f7da3abdb1a9349f3efc535b846c44237e55d6c06d79e6ba2f374fc13ae73bd9a3e21cf435d1df1322fe42 *linux-Sqrl-1.0.12-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.12-x86_64.AppImage
090b4e5b7737ced3d745d4a8b022d23832f38ea40efec72b79a4b5bfeab7ae793e9213622bdc794c738f559465f164dd1b51f5e37e9f7b291d09b2f9623f6836 *linux-Sqrl-1.0.12-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.12.dmg
d8f8f9108188352169d088eafc6ff41db8edba8d153c461f39eec862b948f854d7e2935c0f9828ad5f0c3512581427c7e6625edb9e1a9d143081aef0a2db01e1 *mac-Sqrl-1.0.12.dmg
shasum -b -a 512 mac-Sqrl-1.0.12.zip
abe86dd6e65a6a0c4cacb5bc313f54182211c63e647a416de592eccbfcb7a3b84ac050ff5932667005effffd5a60a36eac1c544a27d8bd05e6a395d60c7afd77 *mac-Sqrl-1.0.12.zip
shasum -b -a 512 win-Sqrl-1.0.12.exe
61b02a53e4d2b6d7fd6b051228a06640382c8d83200d8a0da5ff4bd8116608f8f7bacc3e635587bf13935272b48097aba8dee3263d22a99e95b45856cb80560f *win-Sqrl-1.0.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdJhK1AAoJEDT4ke1a0TzTjHUP/R7H5KeUH/pAyaZXngKHRWl7
j38LHkWMwjNQ+hwAYZ6zUVhugnwiCyRT0s91ttnyn+hsI6KqtJW3giPMicyT1DMa
JoCAjTxZlZIfREoIs0MGG8kB2BMJ57BOUsPkQyVcGx9oDfHcbtIr1MU9H08qjCAF
8xNgIjaV3im2dWNcFd8b5WnUBaQd8LDpJEHWXm2f6MEFsv20pipJANSb5ustlgqL
nre+r6Xv487tSogihfi7bsyEg/L5Z2HVU19XTMVaR3q9TJFykG0FWp4CovoOJl9q
AMDWM65Kmm/m8pQ11tlWrscJfMR6Cx81A0q6kKw0f50GxYdO6LFmsTn2upQ8H4Kh
+I+G8Y1XwX6ja4dwqiFzsIhWtaN1Hu3uUUJVObYiGvoKLqnqs4eGJPdIcW+ddmN3
Xvgj+cC0Fc6AxqiVAM0rNVGKWHZPeHFeriLxLuVXin/Rw3w67P9PSb/p8d7FSEBR
LI5qcwYNZXUfISwNl6xk8+ltsHVocdx1WRr0NbH6oXuWinP0ujmPoF+J+R1lZdQj
1+n2Iwbbihini0GU+i4IBUuOCdsodxmIYFnmFnREUL3KX0Rba3I8cYOm6eW+qZq/
EyXP3S0/IX/tkR6LuN3r2JGBMVNoBBkzQ6m0EfIVQKu9fRs5ASmdx8roNrx4nKxU
V4XJGalyvVVd0X8OiH9p
=WB8O
-----END PGP SIGNATURE-----
```