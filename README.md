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
cdb7ffbb50e12976c8a3a55f9f637b19cd3186b142230866bdf56fd8bd9605bf55b702e3c59307435e33b797e1ea8d3861267962a676611684319847d95abecd *linux-Sqrl-1.0.12-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-amd64.snap
b4e2f16cbebb249c276692b30a97e0ab596d90baae1ad66dd506f3658ea3c2c3f08b28d944a1ad54f7ab7829fd74ec199a4fcb625d0abcf5a571164532a8e090 *linux-Sqrl-1.0.12-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.12-arm64.deb
126cf23b7c247e6d1da2813f66aff68f0ea7f04506d56019ea73b2e4a1e808f588dd473a78064fa6f44f5db7ee727d48829fc8f6fbc9206a4b37df99bff1eab8 *linux-Sqrl-1.0.12-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.12-armv7l.deb
35f6c13aff8f315a655d6d0958982ff6fe770ac6520baf60ac6fd20265d1e033f75677fdef8cbe89910d196f6202a7fba98114caeeefda89e206d5153fffb049 *linux-Sqrl-1.0.12-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.12-i386.deb
ffd4b2ad5b220d62da8c0a228d06d4d0b182ad7805212a56b9cd9059f88da706f01d394f763ff86ab74a5cff22de997e85e1818c30630a170bd24099aade9101 *linux-Sqrl-1.0.12-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.12-x86_64.AppImage
079c49c1a011f5e7fca7b65e60cef80b277f3584e685f3625cba001f8033ffd6d6f37bfd9a5935cd7c25af7898b349be5b106745e5a8d6240d0698b3820b2c9f *linux-Sqrl-1.0.12-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.12.dmg
42ef0f4f166db4f75e54b4f00c716364160dee7627dea7a73b95806386f3fff2bd6448d3e60ce3588fe4b1402d9fb4ca7deab162686962a2b637da47908831ae *mac-Sqrl-1.0.12.dmg
shasum -b -a 512 mac-Sqrl-1.0.12.zip
be70b2ce0a29cc386bf9585e3bc6e11cbaa1693c2a76b5a699179f73ac4e82da99cb14c4901612793dbcae70eea69b8149a933a675905372a1ea2591244dd7ac *mac-Sqrl-1.0.12.zip
shasum -b -a 512 win-Sqrl-1.0.12.exe
82919a2c50ea14b09f5dc75d74e429f6744caf34d383dc87f6577c79e54f98ebc8dc217ee0c036e6efb5a0f401b10653edd8c3a530e22ad16c04624709bf76cb *win-Sqrl-1.0.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdJjhhAAoJEDT4ke1a0TzTKycP/0naDbLTPN/jj/f9pT253z25
EXgji/wWZwBM84CiKqwM0Mc/qEoapwhkqyeZuFn21U4l83gUlN0uZMET/Rl3roRX
GF/P7VJbkQPmb4KMwIBIkVDmH2aEKQF8OBj45YBwInGVxxBxcplL52Qp23EI3Ovz
8feVoqkw6LQF8pK0eJXeGyj+b72i97HbgSBklYGbR/nX2mestlNv8Hm02vYQ/bbu
FRwkcO4B/Ju6EULa1Tz1LaETBuYP0GonNEajtaLthYHj/WwketT4cxPdbmkb4CNE
8KOmT7EXF7qMiOZrUYHFcGgINgoxStLuBSKfOuIZ2RYWjpa+8kdIx8rqY7QUrL60
iM1VKqT0weE/Tey8ikZ7gBzJ8e7uhfWdRpcmclmrxBHdZCZbZc/H6GHP5o1/fUqH
aQyqN8WnVKpKO7Y/7nKmelq07CByzORmOBJwxBonXzkfs1gxuo4d4nxkzKxxXzWz
9oweM7yexFzmHMvrmVmBtK7K4JgUVho9SmPuHbM/5YrJzMtuueZDB99npjQHRcfL
YfMZWCD9LSqD2x+fjPlImPGqLouahCiqUzEre/5Z4OxzHlvEn5JrNatx+3IRWsFo
3DWfv/zxNvLqLY196zaBZEKX3NcC8IxkIIh6hlsBRsVIgP5Jfs27y15zNfDkGCy5
dKO6/YkUrMsNxVx6I2tU
=EaG5
-----END PGP SIGNATURE-----
```