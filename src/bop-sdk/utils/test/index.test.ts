// import {
//   EncryptionAddress,
//   AbiCoder,
//   Interface,
//   EncryptionCrypto,
//   EncryptionMnemonics,
// } from "../";
// import { expect } from "chai";
// import { KeyType } from "../../proto/bop-sdk-utils";

// describe("utils-test", () => {
//   let address: EncryptionAddress;
//   let crypto: EncryptionCrypto;
//   let mnemonics: EncryptionMnemonics;
//   let abi: AbiCoder;
//   let inter: Interface;
//   beforeEach(() => {
//     address = new EncryptionAddress();
//     crypto = new EncryptionCrypto();
//     mnemonics = new EncryptionMnemonics();
//     abi = new AbiCoder();
//     inter = new Interface(
//       '[{"inputs":[{"internalType":"address","name":"ad","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"old","type":"address"},{"internalType":"uint256","name":"newad","type":"uint256"}],"name":"AA","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]',
//     );
//   });

//   afterEach(() => {});

//   describe("EncryptionAddress test", () => {
//     it("address.getBidAndKeyPair", async () => {
//       console.log(address.getBidAndKeyPair());
//     });
//   });

//   describe("EncryptionCrypto test", () => {
//     it("crypto.generateKeyStore", async () => {
//       console.log(
//         crypto.generateKeyStore(
//           "priSPKvNh6dYcTjv8JFddVJXrHR2HwrgBTd2GdKmDHC9kU3B1U",
//           "12345",
//         ),
//       );
//     });
//   });

//   describe("EncryptionMnemonics test", () => {
//     it("mnemonics.generateMnemonicCode", async () => {
//       console.log(
//         mnemonics.generateMnemonicCode(
//           KeyType.ED25519,
//           "10000010060000000020000000001000",
//           "english",
//         ),
//       );
//     });
//   });

//   describe("AbiCoder test", () => {
//     it("AbiCoder", async () => {
//       console.log(
//         abi.encode(
//           ["address", "uint256"],
//           ["did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov", 10],
//         ),
//       );
//     });
//   });

//   describe("Interface test", () => {
//     it("Interface", async () => {
//       console.log(
//         inter._abiCoder.encode(
//           ["address", "uint256"],
//           ["did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov", 10],
//         ),
//       );
//     });
//   });
// });
