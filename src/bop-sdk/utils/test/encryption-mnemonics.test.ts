// import { EncryptionMnemonics } from "../encryption-mnemonics";
// import { EncryptionAddress } from "../encryption-address";
// import {
//   CheckKeyResponse,
//   GetChildBidAndKeyPairResponse,
//   GetKeyResponse,
//   GetKeyTypeResponse,
//   KeyType,
//   GetBidAndKeyPairResponse,
// } from "../../proto/bop-sdk-utils";
// import { expect } from "chai";

// describe("encryption-mnemonics-test", () => {
//   let mnemonics: EncryptionMnemonics;
//   let address: EncryptionAddress;
//   beforeEach(() => {
//     mnemonics = new EncryptionMnemonics();
//     address = new EncryptionAddress();
//   });

//   afterEach(() => {});
//   describe("api-test generateMnemonicCode", () => {
//     it("generateMnemonicCode with hex string & ed25519 & english", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.generateMnemonicCode(
//         KeyType.ED25519,
//         "10000010060000000020000000001000",
//         "english",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "avoid abandon advice army abandon abandon above abandon abandon abandon advice achieve",
//       );
//     });

//     it("generateMnemonicCode with hex string & ed25519 & chinese", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.generateMnemonicCode(
//         KeyType.ED25519,
//         "0x10000010060000000020000000001000",
//         "chinese",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal("表 的 对 点 的 的 不 的 的 的 对 个");
//     });

//     it("generateMnemonicCode with 0x hex string & sm2 & english", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.generateMnemonicCode(
//         KeyType.SM2,
//         "0x10000010060000000020000000001000",
//         "english",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "avoid abandon advice army abandon abandon above abandon abandon abandon advice achieve",
//       );
//     });

//     it("generateMnemonicCode with 0x hex string & sm2 & chinese", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.generateMnemonicCode(
//         KeyType.SM2,
//         "0x10000010060000000020000000001000",
//         "chinese",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal("表 的 对 点 的 的 不 的 的 的 对 个");
//     });

//     it("generateMnemonicCode with invalid entropy & sm2 & chinese", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.generateMnemonicCode(KeyType.SM2, "xxx", "chinese");
//       expect(response.errorCode).to.equal(10008);
//       expect(response.errorDesc).to.equal("invalid entropy");
//     });
//   });

//   describe("api-test privKeyFromMCodeAndCrypto", () => {
//     it("privKeyFromMCodeAndCrypto with english and ed25519", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.privKeyFromMCodeAndCrypto(
//         KeyType.ED25519,
//         "avoid abandon advice army abandon abandon above abandon abandon abandon advice achieve",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSPKojwffpRgQQuCRjpsP2zy9bsvW6KqSoVpG7T8WFGqEYVm",
//       );
//     });

//     it("privKeyFromMCodeAndCrypto with chinese and ed25519", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.privKeyFromMCodeAndCrypto(
//         KeyType.ED25519,
//         "表 的 对 点 的 的 不 的 的 的 对 个",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSPKhV7Ht1LXahP2e84CJsmxAJsAbzc1tmwGQke99TsnNsQj",
//       );
//     });

//     it("privKeyFromMCodeAndCrypto with english and sm2", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.privKeyFromMCodeAndCrypto(
//         KeyType.SM2,
//         "avoid abandon advice army abandon abandon above abandon abandon abandon advice achieve",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSrroTRWYpRPQT8QQKsWnUsNtDBunb2qkzo3amT3v6dyA6U1",
//       );
//     });

//     it("privKeyFromMCodeAndCrypto with chinese and sm2", async () => {
//       let response: GetKeyResponse;
//       response = mnemonics.privKeyFromMCodeAndCrypto(
//         KeyType.SM2,
//         "表 的 对 点 的 的 不 的 的 的 对 个",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSrrmBSHVbm6QYmhF8fg2bthn5e4XzjfaMbpDtphdWQ9uprr",
//       );
//     });

//     it("privKeyFromMCodeAndCrypto with chinese and sm2", async () => {
//         let response: GetKeyResponse;
//         response = mnemonics.privKeyFromMCodeAndCrypto(
//           KeyType.ED25519,
//           "young actual glove horn fitness alert noodle tuna peanut avocado abstract ranch",
//         );
//         console.log(response);
//         expect(response.errorCode).to.equal(0);
//         expect(response.result).to.equal(
//           "priSPKgY8oYQHeRJpQLpfVanqaNEBTn3JNjiDRsscfWQcio5jD",
//         );
//       });

//       it("privKeyFromMCodeAndCrypto with chinese and ed25519", async () => {
//         let response: GetKeyResponse;
//         response = mnemonics.privKeyFromMCodeAndCrypto(
//           KeyType.SM2,
//           "weasel picture globe cattle dismiss army resource exist enroll smart focus pudding",
//         );
//         console.log(response);
//         expect(response.errorCode).to.equal(0);

//         expect(response.result).to.equal(
//           "priSrrpX66PdtTnME1CYM5Q3sY4QDEUndgbB41WuCQtxwScQMW",
//         );
//       });

//       it("privKeyFromMCodeAndCrypto with 星火通", async () => {
//         let response: GetKeyResponse;
//         response = mnemonics.privKeyFromMCodeAndCrypto(
//           KeyType.SM2,
//           "disorder cluster crunch hood desk west double bind bomb salmon identify rate",
//         );
//         console.log(response);
//         expect(response.errorCode).to.equal(0);
//         const res = address.privateKeyManagerByKey(response.result) as GetBidAndKeyPairResponse;
//         console.log(res)
//         expect(res.result?.encAddress).to.equal(
//           "did:bid:zfNLeBzdvDKqKm8QEYrwpMj8cqPvFBbT",
//         );
//       });

//       it("privKeyFromMCodeAndCrypto with 账户一新版助记词", async () => {
//         let response: GetKeyResponse;
//         response = mnemonics.privKeyFromMCodeAndCrypto(
//           KeyType.ED25519,
//           "denial unhappy job crew small mansion play clip aspect series boil cloth",
//         );
//         console.log(response);
//         expect(response.errorCode).to.equal(0);
//         const res = address.privateKeyManagerByKey(response.result) as GetBidAndKeyPairResponse;
//         console.log(res)
//         expect(res.result?.encAddress).to.equal(
//           "did:bid:efB1kfkMXCfzDZL24s8zfSGgVtarRepr",
//         );
//       });
//   });
// });
