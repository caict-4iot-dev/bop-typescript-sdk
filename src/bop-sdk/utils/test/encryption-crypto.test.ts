// import { EncryptionCrypto } from "../encryption-crypto";
// import {
//   CheckKeyResponse,
//   GetChildBidAndKeyPairResponse,
//   GetKeyResponse,
//   GetKeyTypeResponse,
//   KeyType,
// } from "../../proto/bop-sdk-utils";
// import { expect } from "chai";

// describe("encryption-crypto-test", () => {
//   let crypto: EncryptionCrypto;
//   beforeEach(() => {
//     crypto = new EncryptionCrypto();
//   });

//   afterEach(() => {});
//   describe("api-test generateKeyStore", () => {
//     it("generateKeyStore with ed25519 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.generateKeyStore(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "123",
//       );
//       expect(response.errorCode).to.equal(0);
//     });

//     it("generateKeyStore with sm2 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.generateKeyStore(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "123",
//       );
//       expect(response.errorCode).to.equal(0);
//     });

//     it("generateKeyStore with empty encPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = crypto.generateKeyStore("", "123");
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privatekey");
//     });

//     it("generateKeyStore with empty passwd", async () => {
//       let response: GetKeyResponse;
//       response = crypto.generateKeyStore(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "",
//       );
//       expect(response.errorCode).to.equal(10003);
//       expect(response.errorDesc).to.equal("invalid password");
//     });
//   });

//   describe("api-test setSkeyStore", () => {
//     it("setSkeyStore with ed25519 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.setSkeyStore(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "123",
//       );
//       expect(response.errorCode).to.equal(0);
//     });

//     it("setSkeyStore with sm2 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.setSkeyStore(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "123",
//       );
//       expect(response.errorCode).to.equal(0);
//     });

//     it("setSkeyStore with empty encPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = crypto.setSkeyStore("", "123");
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privatekey");
//     });

//     it("setSkeyStore with empty passwd", async () => {
//       let response: GetKeyResponse;
//       response = crypto.setSkeyStore(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "",
//       );
//       expect(response.errorCode).to.equal(10003);
//       expect(response.errorDesc).to.equal("invalid password");
//     });
//   });

//   describe("api-test decipherKeyStore", () => {
//     it("decipherKeyStore with ed25519 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"cypher_text":"b5da35be6383c271cfa3527f01e70aac0b469cadfbc546fd1e8004ab24210efde698c12a60e8b9f0f7ecfd149185412a67d0","aesctr_iv":"c3020e443efdd9cf97530ac5c8ae6521","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"9af8e2e62eff7debae9c37755d276c07e25efc00471f49e0ffed3823b2d4691a"},"version":2,"address":"did:bid:zfFqez6uWDXzdmfqgmPPy2YYRnFDGtZh"}',
//         "123",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//       );
//     });

//     it("decipherKeyStore with ed25519 normal params with set", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"cypher_text":"b5da35be6383c271cfa3527f01e70aac0b469cadfbc546fd1e8004ab24210efde698c12a60e8b9f0f7ecfd149185412a67d0","aesctr_iv":"c3020e443efdd9cf97530ac5c8ae6521","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"9af8e2e62eff7debae9c37755d276c07e25efc00471f49e0ffed3823b2d4691a"},"version":2}',
//         "123",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(10004);
//     });

//     it("decipherKeyStore with sm2 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"cypher_text":"63d06403a5109eb390282378f18d49b3c99a9084fee2fc84b75ceb2efbad76b17a08adc4ea0621ed1ac4eab73f7afa1a20b4","aesctr_iv":"2c6489fa87d680bae851c201e50bd28c","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"d8cdb582b74653b02236461a841ea176efff4ff325f727e1cab07df981a27ea1"},"version":2,"address":"did:bid:efeXUvhpPNEfxNxgx1DvkHBAYon2xGjJ"}',
//         "123",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//       );
//     });

//     it("decipherKeyStore with invalid keystorecontent", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"63d06403a5109eb390282378f18d49b3c99a9084fee2fc84b75ceb2efbad76b17a08adc4ea0621ed1ac4eab73f7afa1a20b4","aesctr_iv":"2c6489fa87d680bae851c201e50bd28c","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"d8cdb582b74653b02236461a841ea176efff4ff325f727e1cab07df981a27ea1"},"version":2,"address":"did:bid:efeXUvhpPNEfxNxgx1DvkHBAYon2xGjJ"}',
//         "123",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(10004);
//       expect(response.errorDesc).to.equal("invalid keystoreContent");
//     });

//     it("decipherKeyStore with passwd was wrong", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"cypher_text":"63d06403a5109eb390282378f18d49b3c99a9084fee2fc84b75ceb2efbad76b17a08adc4ea0621ed1ac4eab73f7afa1a20b4","aesctr_iv":"2c6489fa87d680bae851c201e50bd28c","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"d8cdb582b74653b02236461a841ea176efff4ff325f727e1cab07df981a27ea1"},"version":2,"address":"did:bid:efeXUvhpPNEfxNxgx1DvkHBAYon2xGjJ"}',
//         "12345",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(10005);
//       expect(response.errorDesc).to.equal("The password was wrong");
//     });

//     it("decipherKeyStore with invalid passwd", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"cypher_text":"63d06403a5109eb390282378f18d49b3c99a9084fee2fc84b75ceb2efbad76b17a08adc4ea0621ed1ac4eab73f7afa1a20b4","aesctr_iv":"2c6489fa87d680bae851c201e50bd28c","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"d8cdb582b74653b02236461a841ea176efff4ff325f727e1cab07df981a27ea1"},"version":2,"address":"did:bid:efeXUvhpPNEfxNxgx1DvkHBAYon2xGjJ"}',
//         "",
//       );
//       console.log(response)
//       expect(response.errorCode).to.equal(10003);
//       expect(response.errorDesc).to.equal("invalid password");
//     });

//     it("decipherKeyStore with v3", async () => {
//       let response: GetKeyResponse;
//       response = crypto.decipherKeyStore(
//         '{"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"438e37846014addf112f0b4d1a0da978"},"ciphertext":"36ec9ecd8b6fe58c22bdd5c580956ddb879b4f61911b0fd2db5d49d9d159ef09","kdf":"scrypt","kdfparams":{"dklen":32,"n":8192,"r":8,"p":1,"salt":"a25d718a85b71f61b5d966d19aaf0a828112d35db25afa7a35410d32821d8206"},"mac":"f12a743a44da448c579115a010f828caaf1ecd4bc38fcbebabb79ae30a4d94de"},"version":3,"address":"did:bid:efJK58LVJMAYRahexkwwFoi383wFbNgx"}',
//         "Dc@06403052",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("decipherKeyStore with v3 invalid passwd", async () => {
//         let response: GetKeyResponse;
//         response = crypto.decipherKeyStore(
//           '{"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"438e37846014addf112f0b4d1a0da978"},"ciphertext":"36ec9ecd8b6fe58c22bdd5c580956ddb879b4f61911b0fd2db5d49d9d159ef09","kdf":"scrypt","kdfparams":{"dklen":32,"n":8192,"r":8,"p":1,"salt":"a25d718a85b71f61b5d966d19aaf0a828112d35db25afa7a35410d32821d8206"},"mac":"f12a743a44da448c579115a010f828caaf1ecd4bc38fcbebabb79ae30a4d94de"},"version":3,"address":"did:bid:efJK58LVJMAYRahexkwwFoi383wFbNgx"}',
//           "Dc@064030521",
//         );
//         console.log(response);
//         expect(response.errorCode).to.equal(10005);
//       });
//   });

//   describe("api-test generateChild", () => {
//     it("decipherKeyStore with sm2 missing privatekey", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild("", "test", "test", 0);
//       expect(response.errorCode).to.equal(10000);
//     });

//     it("decipherKeyStore with sm2 missing chaincode params", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "",
//         "test",
//         0,
//       );
//       expect(response.errorCode).to.equal(10011);
//     });

//     it("decipherKeyStore with sm2 missing serviceType params", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "test",
//         "",
//         0,
//       );
//       expect(response.errorCode).to.equal(10012);
//     });

//     it("decipherKeyStore with sm2 missing index params", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "test",
//         "test",
//         -1,
//       );
//       expect(response.errorCode).to.equal(10013);
//     });

//     it("decipherKeyStore with sm2 normal privatekey", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "abcd",
//         "abcd",
//         1,
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.privateKey).to.equal(
//         "priSrrs6x8LKfk5NPR6MaGxHSjNsnaSASpASb2gjgC9qFuU3zu",
//       );
//     });

//     it("decipherKeyStore with ed25519 normal params", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "test",
//         "test",
//         0,
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.privateKey).to.equal(
//         "priSPKtju2VvmKGAz28Fygm946YBFUySvf8XbVsFwUjgHG3X6F",
//       );
//     });

//     it("decipherKeyStore with invalid encPrivateKey", async () => {
//       let response: GetChildBidAndKeyPairResponse;
//       response = crypto.generateChild(
//         "SPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "",
//         "test",
//         0,
//       );
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });
//   });

//   describe("api-test sign", () => {
//     it("sign with sm2 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.sign(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//         "0x6080",
//       );
//       expect(response.errorCode).to.equal(0);
//     });

//     it("sign with ed25519 normal params", async () => {
//       let response: GetKeyResponse;
//       response = crypto.sign(
//         "priSPKiH6Z2J7fXwN3WvXSHUYrSnFr3VwTMe2s3nmvLp4osgi8",
//         "0x6080",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f",
//       );
//     });

//     it("sign with invalid privateKey", async () => {
//       let response: GetKeyResponse;
//       response = crypto.sign(
//         "SPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "0x6080",
//       );
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("sign with invalid message", async () => {
//       let response: GetKeyResponse;
//       response = crypto.sign(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//         "hello",
//       );
//       expect(response.errorCode).to.equal(10006);
//       expect(response.errorDesc).to.equal("invalid message");
//     });
//   });

//   describe("api-test verify", () => {
//     it("verify with ed25519 normal params", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//         "0x6080",
//         "5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f",
//       );

//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });

//     it("verify with ed25519 invalid message", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//         "",
//         "5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f",
//       );
//       expect(response.errorCode).to.equal(10006);
//       expect(response.errorDesc).to.equal("invalid message");
//     });

//     it("verify with ed25519 invalid signature", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//         "0x6080",
//         "X5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f",
//       );
//       expect(response.errorCode).to.equal(10007);
//       expect(response.errorDesc).to.equal("invalid signature");
//     });

//     it("verify with ed25519 wrong signature", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//         "0x608020",
//         "5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(false);
//     });

//     it("verify with sm2 normal params", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b07a66048d0283b897f59fd60db0410644e78eb38fd85e57f3e681a780ec807641e9dda4bed60055fc013d7362ba2e1654a5fac1b2b6d240dcc029dd146ed6d40daf9490",
//         "0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b10012236080122320a286469643a6269643a656678513967545a3351685669536a71547857734a7a57657a6a425573644d541a0608011a0208012a047465737430904e3801",
//         "d86f2f00048d76afc8d3b533761418cb1d690467ef4fda6e1fd9243ad23eb4cd8dc91dc08ed9f12fa34d01d4d3b9c31d236d62c6a445336b81c3676d06da5067",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });

//     it("verify with sm2 invalid message", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//         "",
//         "d327e035e765e83dc3f2d1b16d988a5a673cbfe1197f3cfe7c45b75cd0f5fb3647205ffdcb4f45059dd1d18321362d60d4cba13d7c0c5132e6459c68553f6221",
//       );
//       expect(response.errorCode).to.equal(10006);
//       expect(response.errorDesc).to.equal("invalid message");
//     });

//     it("verify with sm2 invalid signature", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//         "0x6080",
//         "Xd327e035e765e83dc3f2d1b16d988a5a673cbfe1197f3cfe7c45b75cd0f5fb3647205ffdcb4f45059dd1d18321362d60d4cba13d7c0c5132e6459c68553f6221",
//       );
//       expect(response.errorCode).to.equal(10007);
//       expect(response.errorDesc).to.equal("invalid signature");
//     });

//     it("verify with sm2 wrong signature", async () => {
//       let response: CheckKeyResponse;
//       response = crypto.verify(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//         "0x608020",
//         "d327e035e765e83dc3f2d1b16d988a5a673cbfe1197f3cfe7c45b75cd0f5fb3647205ffdcb4f45059dd1d18321362d60d4cba13d7c0c5132e6459c68553f6221",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(false);
//     });
//   });

//   describe("api-test getCryptoTypeFromPrivKey", () => {
//     it("getCryptoTypeFromPrivKey with sm2", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPrivKey(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//       );

//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(KeyType.SM2);
//     });

//     it("getCryptoTypeFromPrivKey with ed25519", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPrivKey(
//         "priSPKiH6Z2J7fXwN3WvXSHUYrSnFr3VwTMe2s3nmvLp4osgi8",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(KeyType.ED25519);
//     });

//     it("getCryptoTypeFromPrivKey with invalid encPrivateKey", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPrivKey(
//         "SPKiH6Z2J7fXwN3WvXSHUYrSnFr3VwTMe2s3nmvLp4osgi8",
//       );
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid encPrivateKey");
//     });

//     it("getCryptoTypeFromPrivKey with invalid encPrivateKey2", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPrivKey("prixxx");
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid encPrivateKey");
//     });
//   });

//   describe("api-test getCryptoTypeFromPubKey", () => {
//     it("getCryptoTypeFromPubKey with sm2", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPubKey(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//       );

//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(KeyType.SM2);
//     });

//     it("getCryptoTypeFromPubKey with ed25519", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPubKey(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(KeyType.ED25519);
//     });

//     it("getCryptoTypeFromPubKey with invalid encPublicKey", async () => {
//       let response: GetKeyTypeResponse;
//       response = crypto.getCryptoTypeFromPubKey(
//         "SPKiH6Z2J7fXwN3WvXSHUYrSnFr3VwTMe2s3nmvLp4osgi8",
//       );
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid encPublicKey");
//     });
//   });
// });
