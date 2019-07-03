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

Current 1.0.9 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.9/win-Sqrl-1.0.9.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.9/mac-Sqrl-1.0.9.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.9.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.9-amd64.deb
5ca625dbe0cc5e6348c7b35cfb80e479da19a0a262be576673e59bcd70d9822e5ee16979a21cee5a45be85a80c6da4cb638b5152c5457ea4e4eb616416e38a99 *linux-Sqrl-1.0.9-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.9-amd64.snap
1474203e18f01bfe2b57cd8e5c88561d8823e726dc6e7620daac2232967af89d612712059ab3306cef59fd2267b0a04663db35cdd11ed3cef6c1a726fee04a3e *linux-Sqrl-1.0.9-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.9-arm64.deb
25b816a3d486cb11e52a6a8610823a77b21e0ae5c44a63fd968f0356f7e6b6537c118639cca361554b9253dca176df701304517a342a977d72fb8e8a5e087c6c *linux-Sqrl-1.0.9-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.9-armv7l.deb
299356c911cb7644a44b43b7aa1a5c5bb9ba6d93d9b0a85e770ea833e5d46f040b45b597cfd5f5065379935de6f557f467932d4ffc91acb7bc5a65dec2e4a12b *linux-Sqrl-1.0.9-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.9-i386.deb
152736924b74c552e3c936957011f4ef411f21896ada86b5a01bace595dca8cda736dd69ebf62436a4533f602014f82f66822354ae5c10ca526051328b259aec *linux-Sqrl-1.0.9-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.9-x86_64.AppImage
62470ac375ecdd762dc28882a96735a7da366611aae4c8abc8c90c8dda6e01dfc248cb9e731001864204a35cd8bc79412a5c5dfec31df019f9f5937408347d1d *linux-Sqrl-1.0.9-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.9.dmg
36bf84815cc017529ea39e8190bfc0bafcf9cb0d02ff0ded6fd5f4a32d54c844e939d8a07ab17e7735bad85a9e31eb00956507a29f62e49616128303a6e10ef2 *mac-Sqrl-1.0.9.dmg
shasum -b -a 512 mac-Sqrl-1.0.9.zip
7ebfeae619a6404e862a4fe09918a4eca905677881734fcdcb3909a482f3ddcaa8d309f663dc114dce8329a4ea379ee8068dc84630698dbb2fcb804e474225c6 *mac-Sqrl-1.0.9.zip
shasum -b -a 512 win-Sqrl-1.0.9.exe
a0436443851d89a1257cc3e03bb4fe387152d69de4acc783d71bf9dff85e7c5a6b5b3f45f8546c6ad35257c9326602e7a005adef8c1b6ed3bf49ad935a69820a *win-Sqrl-1.0.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdG/egAAoJEDT4ke1a0TzTTh4QAKuDiaupd2DFOLnWSwPYZT3c
ZXFsB6lu4Lm7LqTHYyiHT+u1J7Qfuclep2KkVHIou5pQa/ByXWR8vkIqIVp9R4/D
FQwNB9VjHFASswNcXs3DWCGP7zQ6I03ZpDBIUj0XIsO5K1kGqdBQ7tMfppqVc8kY
0QMLJ0DQGhrXQ56K3eS/P22MHme/wfGquZCLkY5DWx/kxj9QipB3kEwVVneCeiSn
cocvO5Xx8LFK4AZxreGbnzaBoy9/ehJ0OAUVQLx7RRX3au+7sy8JoOrzAm5RjdH+
BbrONy+1V84K2M9ZjoChPks+YuSkfCsH25m/0nuRdTFZcri6i+hikTNekCclNHyO
ltEdM1ZVG5ZBfLiu+1m0c4RMqi1/MfSMuysqUrABYzS0jWOnHeIFtQMmH5W5Odws
6CY6dIk2W8GjmqqAWSyeT1XlrdA2g/U6DjZjEWkXBJFnftE854sskAvZkW/lFV4u
cn/s2H/Dc7MRjxFYFm/XCOtfZERCn1KpagSh3rhRj8XrYfduqiZxNc5SOkazkSG8
nxw72QL0CvdWXUEysd/cUcuXKMiS8P3JCoIcw6E9KLLc6LpUXFurhshrQ1QXXjsZ
XxloxOCNE3xNkXH6V+ejTL6bevPCmvxqKS4F+BhtPmlvrGYxyWCRwotLq+XYYPJo
xCrDsxhTWJfV0ZQOURA5
=zCmQ
-----END PGP SIGNATURE-----
```