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

Current 1.0.2 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.2/win-Sqrl-1.0.2.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/1.0.2/mac-Sqrl-1.0.2.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/1.0.2.tar.gz)

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

shasum -b -a 512 linux-Sqrl-1.0.2-amd64.deb
da01f602e3dd413f6e4867da7fa1cbf4d8a6c47ec18ec9c61cff761eb2956eea4e0eaeee4f0186202f62b82a9ccec3907d6f5239501bfdf0052f7e89a1b8138a *linux-Sqrl-1.0.2-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.2-amd64.snap
9fc7de4f8af3ca708313ab51e90217957c587325f7dd2be0d27414b02b11c4421858047f425d0be57bb392774fe4c47bcea71847211de6efcb1fbb5383d905e9 *linux-Sqrl-1.0.2-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.2-arm64.deb
5bf21d2d05fa0839b5624a5e04371b6e0f696254963087fd3a719175f178ad7c61bb5afb799d16a9d4fd025578ed2551556622cf34e3a427fd345aec1528af65 *linux-Sqrl-1.0.2-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.2-armv7l.deb
0d2bd4a89211c7f66b8e95179397d2bb5fa50b664bbc8a6f631b7d73a83e3b67ad4000c1e1cf612b5a8ea240cd0bb336e0dee21b3c211533f9531fa0a9b6ec67 *linux-Sqrl-1.0.2-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.2-i386.deb
1b6f213a136c453ba79e0fe7bc7430c5797dfd7e719dfa069a7bbe26f7998d128d93617bf958e20554968de5a424a18506fc764cec0ce76bdfdef7c0935ec517 *linux-Sqrl-1.0.2-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.2-x86_64.AppImage
3c707c65e7cf1143ed2a1a366e03e9d7cf8efca705138f187be2dc31cafb1322e7f93219ed003c264b59caa473dd4e86b87a1be912c9b3e17cc8091bc5730901 *linux-Sqrl-1.0.2-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.2.dmg
45e488029751ffb343f1b603c9269cb6c0fb3d4db5547334084dc3dee4210fadec03c11d8cd85736a0b3bc2fe66fc657531658034935adc175a81feed39820b3 *mac-Sqrl-1.0.2.dmg
shasum -b -a 512 mac-Sqrl-1.0.2.zip
7654941205f17595b57cba7ca258ff6df845dd7f044064486945e34b6ce350b1857cc9039f6e44b0a771c0b5f61d68166044a8fba7da6fe132abbc99d3f43e5f *mac-Sqrl-1.0.2.zip
shasum -b -a 512 win-Sqrl-1.0.2.exe
51bbffb7f96d5de127c29fca5440795ded7ba9692a327dc559b40f067f81366a6dd04eff0326109119f4112d54579bef03c77ec8126c4072a8c3172da104f4a7 *win-Sqrl-1.0.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcXMK9AAoJEDT4ke1a0TzT63gP/A4/ifoBdbhL/IzQDHC0SAPk
fjjuXj8Ppyilh7sL7PGmJGH9XL2BJY4g5eVe5FAHXewHo3O6Ygs3jT8fgJ9Ob6ir
n8cr9Rm6jF13VUSm0LhoflBuv4Wg0CoWOaK94HsLgVNfnL2B89F0qXAm8Rb1R+98
ul84AxYrPgGIRJv952ppn4CVyWH+WUUqfGUUdAzj+VC+ZDYszXEENtJ614q8yxCj
fEz/tDZT4xyC4jTex05aClmJ97mS8sOdVwyIAFqupFgmMJ6RRsBgVsQ0wMdS+nWu
huFKhNC2Jw06jDpB4yZkHMekCqv5F44X5NyhbFA+MiDH3Yoe1wUwyETHsNDEe12r
jXoho3REOinaeh0I3ovQqKfxTj01QPko+hdERHYVkP5S+cOuURmMjd1joQ7xVTPK
sPBAny9X1DPe/tqzRLYvkHhtqrmO7uIHoLsaUtbEFSSooqbm1SGBnSSAO7xieuO2
kewhB6L6Voe6Ovcp/xm/a+83fDHG0nAW87FDBVBKYX4LePRwZHQ57TszQyQnPsgF
4jKOuwA5PBQzEap/Mv6evDFe87SZyWmVloQ4B1gRVf97b9TX/qLBNdnW99Tdlg3D
coEPv7gVy6UmgF+Unx7gqEuatSgnUIaq61cxocjTxbjplY7/N3ACWhe/B47cwnzz
vaPG7Ya8uKpTKSkACmMo
=b/Pr
-----END PGP SIGNATURE-----
```