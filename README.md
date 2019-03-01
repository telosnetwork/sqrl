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

Current 1.0.5 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.5/win-Sqrl-1.0.5.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.5/mac-Sqrl-1.0.5.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.5.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.5-amd64.deb
188964204049246d089cdff7c489034b5513d259567adae7e4b3ea6760cf41a9789e7079dfde3c2c945da33b05939be80f52c4d7fc990ca5a4da773212979f12 *linux-Sqrl-1.0.5-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.5-amd64.snap
3daa52b93cfcc1e723a63fd403a25fe6f02eb1191f02480179655f9da07d66ce93c44b6733992a57ecf008b2112eae934b47eed1fb9685a54a54511ba3101009 *linux-Sqrl-1.0.5-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.5-arm64.deb
4d59556494501415fed9c74358cc8d566bc7bea7b91145c3122ee4d2b1a4646dae631e6d99e15af202d346a7255861dad487c4b7164ec8b2c0f1f6ba76abd953 *linux-Sqrl-1.0.5-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.5-armv7l.deb
0223b20a58fe5ddf9a4416fb9856822e4e5a8b390fd1df932908c3e7a95f38dd2fa522a5e6ee03eafd83bc881f743d935990c5356baa6efbc45f0c79cebdeb9a *linux-Sqrl-1.0.5-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.5-i386.deb
e4d7a6377722ca52f45c27fd9c3a3e9f828ac3de893a177e3f7c0089b62d82f5c0ace116db042d735292685ad169bd43547da22a0fd28585b80d6df4bd083955 *linux-Sqrl-1.0.5-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.5-x86_64.AppImage
4c25a90e2e46da0c09041c873cd165dcca918b6e26204af561c4f6fe1ff9a9fee8adbde1fc77759c30c358a53dbf9362919b5bc10b9dfc9540c11f59c563cb58 *linux-Sqrl-1.0.5-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.5.dmg
eade9b8fe609317ca4f6be0124c09577d9f6d3179d39c4278d12b169d20097290beaee99a370e74236a1eff0a502021e35bb0abfa3f72bc548e048ace61a6114 *mac-Sqrl-1.0.5.dmg
shasum -b -a 512 mac-Sqrl-1.0.5.zip
ce15c9d81715b36f324dfb5093c85630ac1e0159e721f8a3da191779657ed2a9347bfed0cfe1e4a72899d553bd7438c07c1022716086b773444b9e73f61eff44 *mac-Sqrl-1.0.5.zip
shasum -b -a 512 win-Sqrl-1.0.5.exe
a0f691caa0f964bcbd105d05dd65a35fb744434abcb1c29645246468dd6d4cf2cd85274bd69c5b5c433287ea678815d3de7aa4be4ecb39178aac6a4816c233e1 *win-Sqrl-1.0.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcebePAAoJEDT4ke1a0TzTCdcP/0Y1KzzjFM+3iIext/GN2nNm
07alLQWrp87cZv4VCg84pizbjMOUhpeI1+JbTIytv0jiLaX/24k8eWd3HqOUuen3
sGTgLl8C5NCnziJjl4jsG3H+bjsjPlJ3E4pL69Kug3By/QuhbjwMvlu26qYqiByY
M9cnJ4pU4UmAR915/nb0VTijSH+OKqkRD1SzUWuDwsC73toJZ7FNNKmcDftKoIC9
Q7bpjtDcEJVqVQAaKHfu6jLnym3w9nqKWAyGcWhoACtEDn3PX7165sHyk0UITZL/
1M98eWW+A8l2NbAf0s3dGYpEbfCEMg0HxHRbuG/5pm4HKj0pgnZYtVr+TwlzVA/c
a0tMWXI/6p/GBkkBzpi/Dn/RHtF328qdz5V2B1qhL7K9mQBf0If6qrsX91nKSVpm
0Riiz+zEmBnJa/Pd+DZKQstwVrUdoJiFXrAbAYsJk+uKWYBQq7Il9bg/gK1Mz9OJ
NeNdke4uy0M+Hkl/To2Qg8IpiZ+tqqSRv9IT1j/20iEc1HW7XNzw72seVnjRtM/+
QMrhgjnpAxoeDHeew1dIXrX2SN2QxvlSyAfFJ7j/Cixx2FXqGmftny0KymV7wv6o
gbvZfOQAVQli0ItZkqNbktvCmdpWzTYXymJUa7Biq26hJfFeaa46FPoR4XTnundA
N/F0nM4BSUMYHUtH0JrV
=R0qK
-----END PGP SIGNATURE-----
```