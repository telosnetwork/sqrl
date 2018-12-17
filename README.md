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
- **Free User Account Creation (coming to mainnet soon)**: Sqrl provides a simple wizard that allows new users to create their first Telos account on their own.
- **Works Across Chains**: Sqrl is the first wallet to add support for managing any EOS.IO blockchain in a single interface, such as Telos or EOS.

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

Current 0.5.4 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.4/win-Sqrl-0.5.4.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.4/mac-Sqrl-0.5.4.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/0.5.4.tar.gz)

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

shasum -b -a 512 linux-Sqrl-0.5.4-amd64.deb
e56fc9d00f851da2fc8e1a1080bfeefa7f02ca97fc14c1eb97cef47f12dd0f5fe8c53f9ff097a43baebc929703f2f7b38007fe182050cfe76646b680dbe49c73 *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
6ddb2fa8aa9533bb61b69a105e4fd93b627c70fb95006525b6e158501ffe49305afc02024d9d6bfb1c55c286eefb9535174a5ae46efbb74ae87be9fe8e1b1866 *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
6f7dc76970825a6f6821529f790bed118cfd16a2055fe6034ba842f143561d3bc9a796b9c0cfdfc5b0068137cdc19944f744d16e1020ba46b7205fc406323f3b *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
afd520b17982d81faf01d332336daaa52bb5191307598212b774ad53fa1b83beccc0919712cb85bcb0a4f25d713ba804729b2b4c6501fa1f648d8bd10e7cde4b *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
4c76d10fd8f68de728f39e710ca7cd7c679ba6785d1a4150e017b81e6b62e61f9e2fafdcee2114188a0533fc57935ccbe4df9ad885f3c4746f6ae1541115e325 *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
b572d42f747813dca3851a0d845c6afa5e35353b7c22e449bab0b97ddc7f828cf89c222e0cfd4569c45c4e5109f6fb4d247d8f78010dee8b9074a83e28f7492a *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
39b723f652e595ce873c45f3061a6dcaa3e23fcfa3bdb44e767c0ae39ddb69603ac0ac9f6c57c0d1d53a9993a970044c777f9543894369dd7d58221ab8205bb4 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
ee9381ee15d5da5f83440ada8866c7e310def794943a9526c45f2b5c90841b56b0398e1d3159edcd658a9473766d1ffbf135a1831db327e10764110945c1c860 *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
ca82786f05b981d531d2e192f64dce8328bac338565fc16e90358d35a2d14e5df2bb3a2f1192f791b6902173c596735bf43efb19c0e6f370b0af1abda10103a4 *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcF/NjAAoJEDT4ke1a0TzT4IYQAI75B2ipOPEXsSY1DLRChkUW
OetmIvC2jbhiHsHr8rhN7+HvHm5sYbpTZuqxXcJTht7b6Zhp6H6R19lxPz0e+jKK
wF6Fq3VJue6I0nP3o/bidtOcJhR0/aCc0Mg4g7v9r1IhtOpYYQMVtnirb8bE2NBH
J/dpTRyTiCofSt6BK/OVd4vJ8AzJRRU27zdhAAwcnrf8B6AiTRFMTP6J2Fsopc9j
FQM6WnaQ8yiRKYFvBVKcE92VTKQH/UqZ5sJrJoQ9WtwvnETPoXm8Awr01rXhYDTF
isGKn9FShD+PlC5q5xQsJutWJh9aVlS9sB1bTVoZFADGVM4pKI8ekmhI3bntaTuB
eNzQ/FAyjv08GLZ3ptSQkM61pGJjeyKmryAjyOgFKfdWO2PT57zJ7uqjIk3+X1RY
jtbBWszjFhStGI8zNTa1fe3rwXWwgYaNh2N1FpLcCHYxpdjNWpG36IL7rboI3oYm
bydpMF43RgMXhoFUa2Qzz6FjXCcVBRvISzYSUo7/e9WtYta+AxhS3AToPRXx6uHI
/KB1rA2+8oK+XJeolBiPjdrzQrJO/o71Tjghlfw4IRqrjhrvmTGdGs1kzhQ+8zPj
oM0gTJnGwhbnHcU3Bh7wV1Nc6M5jkrApM9/61UhewvOUPiKIcWgikWuDC811JQ/g
KyPrOL4BPmrFo4Fs/jiz
=98mt
-----END PGP SIGNATURE-----
```