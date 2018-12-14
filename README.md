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
b4fa2bf5d46be2f8c8a08c2933a3a79670010e9ae9dd10df79a89f5ce95715fc14c6f9e3b7fac22bde954ef17edfa7029cee089a20a72bbc62a8a8112689e0ea *linux-Sqrl-0.5.4-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-amd64.snap
717b26a529e1b685145a6459fe256d8bfb682ff3985842772531102baa9b182b1faa324da9d8b2e6307f25cc670f718c72347956e6cff98aa3a4fbc3c2fc0bf6 *linux-Sqrl-0.5.4-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.4-arm64.deb
2765c32afac1421e202b71ee6fe084b6ddd72ec0a8e85f0c310b8130c00d181437320da9d4e4d3aa17063c015e8f143971f148a749e37159b335e40e92ea3c75 *linux-Sqrl-0.5.4-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.4-armv7l.deb
319e8aa047d836a2277de9b4645004822567ccce475ffcf115bac108e28767f5e0b49901368d421db9bc24d41a37b9a2d568610cf4f500614fddd8aaa1cc89be *linux-Sqrl-0.5.4-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.4-i386.deb
ef6999028ffd732aa018f10ed7e2b4384209a132ee3fe94d77ef98d48b1300d8cf318e8054ce98ebae46a44d33b76b0272b9d2057b2bf16b43bcf735d1c6f0ea *linux-Sqrl-0.5.4-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.4-x86_64.AppImage
ba85b748253f3a8f068fa194db3ffdbfa71759487ddcc79c6081a0a749e3e3e7c208ec3b40a1eb3e3f60a266441973e2a25523d2ad1e5c6e71f5c0305de15ff2 *linux-Sqrl-0.5.4-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.4.dmg
91cb7ce48911c4ffc064db50507aa54e15a012f3c6026caa448a029b220cbc8e3f6a1c098d9abf793f6637e6eca6b61a5a5d16360fe9f3a2cbd0c20d49e29da4 *mac-Sqrl-0.5.4.dmg
shasum -b -a 512 mac-Sqrl-0.5.4.zip
27897c942bc8f3f53fc98663b25b295df928ff9a234c4e58022ab78c67164d6dc196f8eee56a282d704e8a12e5e1967fb9606e63c06b1d9eedf2d6ccf1e3d6c6 *mac-Sqrl-0.5.4.zip
shasum -b -a 512 win-Sqrl-0.5.4.exe
31bbd22289e5ae4f29a6f6d8f10f97e6b60791c6ac07d5566aae8a2734bcb32d6e5f977c9259e299dfbb6a9fa20d39a444ac87093f43c74728b74fcc158cab0b *win-Sqrl-0.5.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFDoSAAoJEDT4ke1a0TzTi+QP/AlFe+vdZ0RHTHN5UbeoSVzV
7iUThPrgzKLTxUaCWLFuQKg85SuNtqcQholKL+Jn+U8frhKrFmXTbvrWsI6+mMJf
RCwh+NbBQ5bC8jvbeeyGAOt4bPBQ0nPw4BMmyxS3Ivp9fXca9fT1yVMsY30A4MqT
558QQmKQCwxd7/uhlUc9U268XiZoNpSINBknpA5/r+qG5LodLHJXnKBpkfMjard7
g1ZLcvkKj/A9BljjBuR0MXr+7973WVL5yAupzqMR7YGsGVYEfkmc0Fq8SZC7wu3Q
0ixB8aIyN6osZfBw5rG5L7JoDdzPfyBVbLEmW7gbH5zuMIoM3At6/WK5TKUb2HlT
g8KIuQN5xYO+0Q959tuuo844He+7NyHTl1AMG/si4MeL7my0eokjX4o/FimU4adO
DnvyM2zlYaz9y46YD5y0OFKsygtHFjKJB71xFzLH29bxekB4kmS06CG1SJ8qo9a2
HC83r3cmR5iCA7rwUBupBQF2cM27E/G5rnJRI2qa86OrugbZgb/pNqSzOkLUKNJI
Uz0DXlWC7K8Wp9ZfkFFVSvBhsO2KMe3e2JSWXoSrETI+I3Pw/tcahcizsrooctYF
d767mcQhLDu6ssN3qzi56rTYyXBrmMUlBxgazvzpA1CHjZeaHUZNylJ7rfh0M+tI
FNCd1iFumXNy5sim7J3j
=uDwY
-----END PGP SIGNATURE-----
```