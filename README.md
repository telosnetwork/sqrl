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
af48016d04f1170ae4d5c9d8c1bb9af9db733666d96179c30f6a653338b6acf4b54d29ad3e4f5cc034bfc1a7adb22f1982a734c46f388a8944b20a8544c8bea9 *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
4e12270113083087ecba63f60592a59fba62462852d1c3e137962ed1337ca3a5d5409924a36184ed7749a44a80ca71f33606b7cbb4c9a58f96f00993e3d3e4af *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
35ba81b14343496c36ffe77c419a2f12b88bb749336c5db23c14ddb77d7e18074441fb5c995f595274a6213e7ce64e62c798f6d67dab6afca271db411cbdddee *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
02d6865aa3684d61c4ecaa8b748b69bc0d4d45403994dc1b9018e13ea3af60fe2d91525f047107da820214e35cd63d294ec47f84e7db1271de8092a0e36fda85 *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
0f84397ac715ce534aa0f9cc713a636788da1d08e023f8982268909d3d8bb1cb729e4b9a92fc1f61fd2ce686b812c1e95634bad3fc9d8890c4fe6c706aeb8ab3 *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
b25b96d7004e586d985bf5b576f90a3774856b94091533e16d7598cd466e4419c0fe7782bf7b951b91c36cbc6b9561203d1bcd6ac033738ca79649192859b9b7 *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
8faa1d89838c44b4b8596d5bf30102dd019c5bd4e0b3a232c14408e91151eda2fa74b9920965df7ee0139fa9bd0195b7c010a81ebaa75db621b47c2b97327701 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
b9e4f8fb8d848311e8cfdfcf9fa386d9c9e514f23bdde6e7e8a64878ea5ce90cbf5bdf86968292275374af676f7a93a5e9d404544c2c297ef435330fe87a043f *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
dba1ab633392006a511b8050c5e65aa2649a7ccdda1d634b84168a00a976f626af98c8d2cd726ba40b36ea93d962ea60b007c0b4b9a2301d02f07b35424d6623 *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcGGbYAAoJEDT4ke1a0TzTNrUP/A/NHd7DSBLFLroc7td4D+0/
y39LSKklyDbcNMrn2C06HCpaZ6F91a1hYggdwfkdBti7aaAkXfxzKsqRS8Ppfy+I
aDrwVO5Q14x2sPizFgBfITe8qarGMzAu75SuacgkYmA3nzTwYFXRnmLpewxtO44R
VfoZmaQIOuEUKhnzxyLsptmIAw4MRrJdSB91RNSCafMgzvRq/FtRGNnSJQMmB7aP
n8ujEQykI+2zgKqxMQb61EUdcKi8gBAvBawtqVDAcSmGmicswWWL6yghmQqFCGDk
kV3tO5mCzbWl/sip/NQwvZ3aJ/Y4LzNm0WCMgSolCgVEKk4yrWtOhh9dVx3wJbf8
xM53RVbY0r6QDlk6tkNUzn0rJ+IeQAGx8kLfLvqbCcPRScrsfClDiIYj5Kkynn/+
itdIpeDalCW0kgvZ0nlBzy02mEOQ4T4hFrbRJbndqzqYt8IAXOrtYoe6/BvjQSPo
/+4aINvwtssorYMUMh4+aU5IgszSaJAjnXENFrZv3EpXBCxSQbyxEWdtCJsRo+DN
lSoDOz59+B5DzuO8PEE+QjurrRr9rll1VZkHO61jv2A7OvyfZWsIEbhnwjmG0w3V
p62TZWE7CSGCMeB/PN5o/AwbdIZxq4KnE4m2BKdhj0uZoXMHk/zL9GXq0AsPww6h
ETqu4FAHH2jzQqh6pKnG
=ZNU0
-----END PGP SIGNATURE-----
```