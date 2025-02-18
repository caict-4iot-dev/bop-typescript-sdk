// import { EncryptionAddress } from "../encryption-address";
// import {
//   CheckKeyResponse,
//   GetAccountPublicKeyInfoResponse,
//   GetBidAndKeyPairResponse,
//   GetKeyResponse,
//   KeyType,
// } from "../../proto/bop-sdk-utils";
// import { expect } from "chai";

// describe("encryption-address-test", () => {
//   let address: EncryptionAddress;
//   beforeEach(() => {
//     address = new EncryptionAddress();
//   });

//   afterEach(() => {});
//   describe("api-test getBidAndKeyPair", () => {
//     it("getBidAndKeyPair with empty chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPair("");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("getBidAndKeyPair with none chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPair();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("getBidAndKeyPair with invalid chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPair("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10011);
//     });

//     it("getBidAndKeyPair with valid chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPair("abcd");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });
//   });

//   describe("api-test getBidAndKeyPairBySM2", () => {
//     it("getBidAndKeyPairBySM2 with empty chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPairBySM2("");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("getBidAndKeyPairBySM2 with none chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPairBySM2();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("getBidAndKeyPairBySM2 with invalid chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPairBySM2("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10011);
//     });

//     it("getBidAndKeyPairBySM2 with valid chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.getBidAndKeyPairBySM2("abcd");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });
//   });

//   describe("api-test privateKeyManager", () => {
//     it("privateKeyManager with invalid chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManager(KeyType.ED25519, "hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10011);
//     });

//     it("privateKeyManager with valid chainCode", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManager(KeyType.ED25519, "abcd");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("privateKeyManager with ed25519", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManager(KeyType.ED25519);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("privateKeyManager with sm2", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManager(KeyType.SM2);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("privateKeyManager with unsupport key type", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManager(KeyType.UNRECOGNIZED);
//       console.log(response);
//       expect(response.errorCode).to.equal(10010);
//       expect(response.errorDesc).to.equal("unsupport key type");
//     });
//   });

//   describe("api-test privateKeyManagerByKey", () => {
//     it("privateKeyManager with empty privatekey", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManagerByKey("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("privateKeyManager with invalid privatekey", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManagerByKey("abc");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("privateKeyManager with ed25519 prikey", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManagerByKey(
//         "priSPKiH6Z2J7fXwN3WvXSHUYrSnFr3VwTMe2s3nmvLp4osgi8",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("");
//       expect(response.result?.keyType).to.equal(KeyType.ED25519);
//     });

//     it("privateKeyManager with sm2 prikey", async () => {
//       let response: GetBidAndKeyPairResponse;
//       response = address.privateKeyManagerByKey(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("");
//       expect(response.result?.keyType).to.equal(KeyType.SM2);
//     });
//   });

//   describe("api-test publicKeyManager", () => {
//     it("publicKeyManager with empty publickey", async () => {
//       let response: GetAccountPublicKeyInfoResponse;
//       response = address.publicKeyManager("");
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("publicKeyManager with invalid publickey", async () => {
//       let response: GetAccountPublicKeyInfoResponse;
//       response = address.publicKeyManager("hello");
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("publicKeyManager with invalid publickey", async () => {
//       let response: GetAccountPublicKeyInfoResponse;
//       response = address.publicKeyManager("0x6566");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("publicKeyManager with ed25519 publickey", async () => {
//       let response: GetAccountPublicKeyInfoResponse;
//       response = address.publicKeyManager(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.keyType).to.equal(KeyType.ED25519);
//       expect(response.result?.encAddress).to.equal(
//         "did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov",
//       );
//     });

//     it("publicKeyManager with sm2 publickey", async () => {
//       let response: GetAccountPublicKeyInfoResponse;
//       response = address.publicKeyManager(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.keyType).to.equal(KeyType.SM2);
//       expect(response.result?.encAddress).to.equal(
//         "did:bid:zfFqez6uWDXzdmfqgmPPy2YYRnFDGtZh",
//       );
//     });
//   });

//   describe("api-test getEncPublicKey", () => {
//     it("getEncPublicKey with empty privateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKey("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("getEncPublicKey with invalid privateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKey("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("getEncPublicKey with invalid privateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKey("0x6566");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("getEncPublicKey with ed25519 publickey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKey(
//         "priSPKiH6Z2J7fXwN3WvXSHUYrSnFr3VwTMe2s3nmvLp4osgi8",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//       );
//     });

//     it("getEncPublicKey with sm2 publickey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKey(
//         "priSrrn11eaTMRNwtNPv57DnnoaEKVbQAmPAaXsuBMBKLLGqui",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//       );
//     });

//     it("getEncPublicKey with special sm2 publickey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKey(
//         "priSrrgL1JPpgKBCdjoyf8E4dRfaF2NYTKmqnSWKfTfhj8ngLc",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "b07a6604669e8659fbc2b56f6bf1b76864e37ccf3404f0795ec2448587486194fcd475140030bba13024188f760093ad51afc6bc5ec0b616da2b14729dde4be48aae59e5",
//       );
//     });
//   });

//   describe("api-test getEncPublicKeyByRaw", () => {
//     it("getEncPublicKeyByRaw with empty encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKeyByRaw(KeyType.ED25519, "");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid rawPublicKey");
//     });

//     it("getEncPublicKeyByRaw with invalid encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKeyByRaw(KeyType.ED25519, "hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid rawPublicKey");
//     });

//     it("getEncPublicKeyByRaw with ed25519 encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKeyByRaw(
//         KeyType.ED25519,
//         "3bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
//       );
//     });

//     it("getEncPublicKeyByRaw with sm2 encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPublicKeyByRaw(
//         KeyType.SM2,
//         "04d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",
//       );
//     });
//   });

//   describe("api-test getEncPrivateKeyByRaw", () => {
//     it("getEncPrivateKeyByRaw with empty rawPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPrivateKeyByRaw(KeyType.ED25519, "");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid rawPrivateKey");
//     });

//     it("getEncPrivateKeyByRaw with invalid rawPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPrivateKeyByRaw(KeyType.ED25519, "hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid rawPrivateKey");
//     });

//     it("getEncPrivateKeyByRaw with ed25519 rawPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPrivateKeyByRaw(
//         KeyType.ED25519,
//         "c9dc8442d3aa85b718a3ffd79902a4d2595f140880ec53e5f17bb9f9c8c6e7d2",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//       );
//     });

//     it("getEncPrivateKeyByRaw with sm2 rawPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.getEncPrivateKeyByRaw(
//         KeyType.SM2,
//         "91ff45ac88521b45a159601a4e2c5503825ea588dbb6d682de203c3d7ac4ffa9",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "priSrroXTmScmv9EmCcZMGKp155u5zxp6vxFvRRjVXZdATiS7a",
//       );
//     });
//   });

//   describe("api-test parsePrivateKey", () => {
//     it("parsePrivateKey with empty encPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePrivateKey("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("parsePrivateKey with invalid encPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePrivateKey("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10000);
//       expect(response.errorDesc).to.equal("invalid privateKey");
//     });

//     it("parsePrivateKey with ed25519 encPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePrivateKey(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "c9dc8442d3aa85b718a3ffd79902a4d2595f140880ec53e5f17bb9f9c8c6e7d2",
//       );
//     });

//     it("parsePrivateKey with sm2 encPrivateKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePrivateKey(
//         "priSrroXTmScmv9EmCcZMGKp155u5zxp6vxFvRRjVXZdATiS7a",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "91ff45ac88521b45a159601a4e2c5503825ea588dbb6d682de203c3d7ac4ffa9",
//       );
//     });
//   });

//   describe("api-test parsePublicKey", () => {
//     it("parsePublicKey with invalid encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePublicKey("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("parsePublicKey with invalid encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePublicKey("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("parsePublicKey with ed25519 encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePublicKey(
//         "b065665f61ee0d776e4b139d109abf7af2f12199bd21bf44121952affdb83d2b310ecb",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "5f61ee0d776e4b139d109abf7af2f12199bd21bf44121952affdb83d2b310ecb",
//       );
//     });

//     it("parsePublicKey with sm2 encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.parsePublicKey(
//         "b07a6604aaf82b11f06eddbd6e53d0e1b67f926dafc895ad444a157084cfdd72b714e29077d487be1bf16e718b4b645d60ccb35e0573e457304b7a205552e775cac75b22",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "04aaf82b11f06eddbd6e53d0e1b67f926dafc895ad444a157084cfdd72b714e29077d487be1bf16e718b4b645d60ccb35e0573e457304b7a205552e775cac75b22",
//       );
//     });
//   });

//   describe("api-test publicToAddress", () => {
//     it("publicToAddress with empty encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.publicToAddress("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("publicToAddress with invalid encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.publicToAddress("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10001);
//       expect(response.errorDesc).to.equal("invalid publicKey");
//     });

//     it("publicToAddress with ed25519 encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.publicToAddress(
//         "b065665f61ee0d776e4b139d109abf7af2f12199bd21bf44121952affdb83d2b310ecb",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//       );
//     });

//     it("publicToAddress with sm2 encPublicKey", async () => {
//       let response: GetKeyResponse;
//       response = address.publicToAddress(
//         "b07a6604aaf82b11f06eddbd6e53d0e1b67f926dafc895ad444a157084cfdd72b714e29077d487be1bf16e718b4b645d60ccb35e0573e457304b7a205552e775cac75b22",
//       );
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67",
//       );
//     });
//   });

//   describe("api-test isPrivateKey", () => {
//     it("isPrivateKey with empty encPrivateKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPrivateKey("");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("");
//       expect(response.result).to.equal(false);
//     });

//     it("isPrivateKey with invalid encPrivateKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPrivateKey("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("");
//       expect(response.result).to.equal(false);
//     });

//     it("isPrivateKey with ed25519 encPrivateKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPrivateKey(
//         "priSPKrxmNR9p5aBjH1kxyXdRrvoksRSkbTTwsrVKb9A1HbcEd",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });

//     it("isPrivateKey with sm2 encPrivateKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPrivateKey(
//         "priSrroXTmScmv9EmCcZMGKp155u5zxp6vxFvRRjVXZdATiS7a",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });
//   });

//   describe("api-test isPublicKey", () => {
//     it("isPublicKey with empty encPublicKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPublicKey("");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("");
//       expect(response.result).to.equal(false);
//     });

//     it("isPublicKey with invalid encPublicKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPublicKey("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("");
//       expect(response.result).to.equal(false);
//     });

//     it("isPublicKey with ed25519 encPublicKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPublicKey(
//         "b065665f61ee0d776e4b139d109abf7af2f12199bd21bf44121952affdb83d2b310ecb",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });

//     it("isPublicKey with sm2 encPublicKey", async () => {
//       let response: CheckKeyResponse;
//       response = address.isPublicKey(
//         "b07a6604aaf82b11f06eddbd6e53d0e1b67f926dafc895ad444a157084cfdd72b714e29077d487be1bf16e718b4b645d60ccb35e0573e457304b7a205552e775cac75b22",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });
//   });

//   describe("api-test encAddressToHex", () => {
//     it("encAddressToHex with empty address", async () => {
//       let response: GetKeyResponse;
//       response = address.encAddressToHex("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10002);
//       expect(response.errorDesc).to.equal("invalid address");
//     });

//     it("encAddressToHex with invalid address", async () => {
//       let response: GetKeyResponse;
//       response = address.encAddressToHex("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10002);
//       expect(response.errorDesc).to.equal("invalid address");
//     });

//     it("isPublicKey with ed25519 encAddress", async () => {
//       let response: GetKeyResponse;
//       response = address.encAddressToHex(
//         "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "0x65666b7aa1201508db005e986f892d760ff89f999f771ef4",
//       );
//     });

//     it("isPublicKey with sm2 encAddress", async () => {
//       let response: GetKeyResponse;
//       response = address.encAddressToHex(
//         "did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "0x7a6624286133aa44ac2a24511a5f88131c3c8b11ed609350",
//       );
//     });
//   });

//   describe("api-test hexToEncAddress", () => {
//     it("hexToEncAddress with empty address", async () => {
//       let response: GetKeyResponse;
//       response = address.hexToEncAddress("");
//       console.log(response);
//       expect(response.errorCode).to.equal(10002);
//       expect(response.errorDesc).to.equal("invalid address");
//     });

//     it("hexToEncAddress with invalid address", async () => {
//       let response: GetKeyResponse;
//       response = address.hexToEncAddress("hello");
//       console.log(response);
//       expect(response.errorCode).to.equal(10002);
//       expect(response.errorDesc).to.equal("invalid address");
//     });

//     it("hexToEncAddress with ed25519 rawAddress", async () => {
//       let response: GetKeyResponse;
//       response = address.hexToEncAddress(
//         "0x65666b7aa1201508db005e986f892d760ff89f999f771ef4",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//       );
//     });

//     it("hexToEncAddress with sm2 rawAddress", async () => {
//       let response: GetKeyResponse;
//       response = address.hexToEncAddress(
//         "0x7a6624286133aa44ac2a24511a5f88131c3c8b11ed609350",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67",
//       );
//     });
//   });
// });
