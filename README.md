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
d3ebc92c5140a48885165b9b832101da0e58cf38d5ed66c2f0a315640e37cecdd8b0419c27ade029ae64587898f343e2447245f640571c30da0d0b33af186afd *linux-Sqrl-1.0.5-amd64.deb
shasum -b -a 512 linux-Sqrl-1.0.5-amd64.snap
d981d3e819353b436b162bb33b26f7f5f5d048c347cfa19e7a5bc483fdca973fa82b5d94f38626444877b283cfed91ebbec9b4ed6a25bab6e3192dfd461682b5 *linux-Sqrl-1.0.5-amd64.snap
shasum -b -a 512 linux-Sqrl-1.0.5-arm64.deb
d646333906b93d77a97a02d44faf1221e172fab9f389ee41657b0fe5a6e119fc24845de6b89851ef882713950c5956876332884488823932d255b46ee8ee968a *linux-Sqrl-1.0.5-arm64.deb
shasum -b -a 512 linux-Sqrl-1.0.5-armv7l.deb
5aff789df9a0136354a7f058403f05cff747572c68c5a03ce909cb3c251433eb04b6a6c6965738c84760a15eb36ebce983508cc14fbfae4c40e0e0b7e9f1f09b *linux-Sqrl-1.0.5-armv7l.deb
shasum -b -a 512 linux-Sqrl-1.0.5-i386.deb
757614fdd5254c5cd32f4bfcbccf11017eae975dfc48e885592b054be80ec93100bd8c23e9a3317d36b47b8e0af81cefa6863da0e68bed71349573bb291de9d5 *linux-Sqrl-1.0.5-i386.deb
shasum -b -a 512 linux-Sqrl-1.0.5-x86_64.AppImage
8ae43dd14db998acd60b9f12405d1e02bc7799fd7ed141f465acf3fdd25b64f3229b4145f0490ffe33525d9e3de1ccc9f0b51cdc21043a6d489692118428e099 *linux-Sqrl-1.0.5-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-1.0.5.dmg
70eef0decd1f3a3ed91dad5ad11e10748cfdb6eb2a813ae0b807cafec8b60eebdeb63b8ecf223f10b23ed6def9ff9fdd8f15924ad6518b8bb952ac56fc2356ba *mac-Sqrl-1.0.5.dmg
shasum -b -a 512 mac-Sqrl-1.0.5.zip
15901e0d53a4ef7c488b70be879cf43a2ee10b79f7155896c44be6b1baefb34b41bac1d7ac784867bf021bad2ad7caaedf11f1d09612836d50e291ae9ad7819b *mac-Sqrl-1.0.5.zip
shasum -b -a 512 win-Sqrl-1.0.5.exe
9afd73757475acc766be6608e8bc062113b02012b7bcd2f107336390ece604aceafb891afe60b1a2b667af0e46e4460eb584d7ffc62c63fcdec0ce1d46303c28 *win-Sqrl-1.0.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJceYboAAoJEDT4ke1a0TzTlKgQALPwUiqqM9oRAqxxV7vvxpe/
GZX5GIK+gUEaxWb7vbeq2zuFBWCF5+YmMJ+TyE30e7XMesIxy8it1c1W31tpkF5B
faNHosHU9k0nm7SNs367RpA07cqPpEo4LSjTzKuLl2sUm9SsPKbZqkWGVHm+oDTl
W9gDDniwOwxaUQN4Awa3D0bcJ/LHpRPWpyzpMbrzflBuI/9EbiYWG8tatilP8ruv
oOyVXxEF0tqbIddrrEDVkFI58skCxTsqbXFl4XwJee+aBkdVjb50/7Svkpq10TFA
flyXUdutbVKhbmhkuEs9Re6vqr6FjD0Lf6sAU6oe28g1ItSpi3l+wXRhgLKcd6vJ
PF7WrB4MkcovaJ6PcFFNHbZ6ZvKETxE6X240BPZRmw5qJTyNDn0zkXuuU9q4bxPB
UFTr178/E9DGBEJCJVzUEldYhyozC09+Bmh2pSjlPQxVnVoU/gD+tPzwmrk7wF5y
FgIPdanOCwipp2Wmey/BayF864PhVv+wjs28S3dNGBrn/aI59B3WcHT4ibBK9mBF
jW0gF0IiTXkxVFMUT1niXjNYhDuYKgPMxrWEqU9VbT7wcv1V9OcnEqF8njxp2xpr
YBLT2M/NndN3bcdPgcQVYINIMZKy46WMLQKpKpPw3Mp/v2BOI+eKa7dFkZmsyV4/
Tc+UqjQmWsnTShT10V0J
=SYdb
-----END PGP SIGNATURE-----
```