import { defaultUtils } from "@caict/bif-bop-sdk";

// 封装一个通用的日志记录函数，用于记录每个接口调用的结果
const logResult = (methodName, result) => {
  console.log(`${methodName} 结果:`, result);
};

// 封装 address 模块的接口调用
const addressUtils = {
  getBidAndKeyPair: (chainCode) => {
    const response = defaultUtils.address.getBidAndKeyPair(chainCode);
    logResult("getBidAndKeyPair", response);
    return response;
  },
  getBidAndKeyPairBySM2: (chainCode) => {
    const response = defaultUtils.address.getBidAndKeyPairBySM2(chainCode);
    logResult("getBidAndKeyPairBySM2", response);
    return response;
  },
  privateKeyManager: (keyType, chainCode) => {
    const response = defaultUtils.address.privateKeyManager(keyType, chainCode);
    logResult("privateKeyManager", response);
    return response;
  },
  privateKeyManagerByKey: (priKey) => {
    const response = defaultUtils.address.privateKeyManagerByKey(priKey);
    logResult("privateKeyManagerByKey", response);
    return response;
  },
  publicKeyManager: (pubKey) => {
    const response = defaultUtils.address.publicKeyManager(pubKey);
    logResult("publicKeyManager", response);
    return response;
  },
  getEncPublicKey: (priKey) => {
    const response = defaultUtils.address.getEncPublicKey(priKey);
    logResult("getEncPublicKey", response);
    return response;
  },
  getEncPublicKeyByRaw: (keyType, rawPublicKey) => {
    const response = defaultUtils.address.getEncPublicKeyByRaw(
      keyType,
      rawPublicKey,
    );
    logResult("getEncPublicKeyByRaw", response);
    return response;
  },
  getEncPrivateKeyByRaw: (keyType, rawPrivateKeyStr) => {
    const response = defaultUtils.address.getEncPrivateKeyByRaw(
      keyType,
      rawPrivateKeyStr,
    );
    logResult("getEncPrivateKeyByRaw", response);
    return response;
  },
  parsePrivateKey: (encPrivateKey) => {
    const response = defaultUtils.address.parsePrivateKey(encPrivateKey);
    logResult("parsePrivateKey", response);
    return response;
  },
  parsePublicKey: (encPublicKey) => {
    const response = defaultUtils.address.parsePublicKey(encPublicKey);
    logResult("parsePublicKey", response);
    return response;
  },
  publicToAddress: (encPublicKey) => {
    const response = defaultUtils.address.publicToAddress(encPublicKey);
    logResult("publicToAddress", response);
    return response;
  },
  isPrivateKey: (encPrivateKey) => {
    const response = defaultUtils.address.isPrivateKey(encPrivateKey);
    logResult("isPrivateKey", response);
    return response;
  },
  isPublicKey: (encPublicKey) => {
    const response = defaultUtils.address.isPublicKey(encPublicKey);
    logResult("isPublicKey", response);
    return response;
  },
  encAddressToHex: (encAddress) => {
    const response = defaultUtils.address.encAddressToHex(encAddress);
    logResult("encAddressToHex", response);
    return response;
  },
  hexToEncAddress: (hexAddress) => {
    const response = defaultUtils.address.hexToEncAddress(hexAddress);
    logResult("hexToEncAddress", response);
    return response;
  },
};

// 封装 crypto 模块的接口调用
const cryptoUtils = {
  generateKeyStore: (encPrivateKeyCode, passwd) => {
    const response = defaultUtils.crypto.generateKeyStore(
      encPrivateKeyCode,
      passwd,
    );
    logResult("generateKeyStore", response);
    return response;
  },
  setSkeyStore: (encPrivateKeyCode, passwd) => {
    const response = defaultUtils.crypto.setSkeyStore(
      encPrivateKeyCode,
      passwd,
    );
    logResult("setSkeyStore", response);
    return response;
  },
  decipherKeyStore: (keyStoreJson, decipherPasswd) => {
    const response = defaultUtils.crypto.decipherKeyStore(
      keyStoreJson,
      decipherPasswd,
    );
    logResult("decipherKeyStore", response);
    return response;
  },
  generateChild: (childEncPrivateKey, chainCodeRec, serviceType, index) => {
    const response = defaultUtils.crypto.generateChild(
      childEncPrivateKey,
      chainCodeRec,
      serviceType,
      index,
    );
    logResult("generateChild", response);
    return response;
  },
  sign: (signEncPrivateKey, message) => {
    const response = defaultUtils.crypto.sign(signEncPrivateKey, message);
    logResult("sign", response);
    return response;
  },
  verify: (encPublicKeyCode, verifyMessage, signature) => {
    const response = defaultUtils.crypto.verify(
      encPublicKeyCode,
      verifyMessage,
      signature,
    );
    logResult("verify", response);
    return response;
  },
  getCryptoTypeFromPrivKey: (privKeyEncPrivateKey) => {
    const response =
      defaultUtils.crypto.getCryptoTypeFromPrivKey(privKeyEncPrivateKey);
    logResult("getCryptoTypeFromPrivKey", response);
    return response;
  },
  getCryptoTypeFromPubKey: (pubKeyEncPublicKey) => {
    const response =
      defaultUtils.crypto.getCryptoTypeFromPubKey(pubKeyEncPublicKey);
    logResult("getCryptoTypeFromPubKey", response);
    return response;
  },
};

// 封装 mnemonics 模块的接口调用
const mnemonicsUtils = {
  generateMnemonicCode: (keyTypeCode, entropy, language) => {
    const response = defaultUtils.mnemonics.generateMnemonicCode(
      keyTypeCode,
      entropy,
      language,
    );
    logResult("generateMnemonicCode", response);
    return response;
  },
  privKeyFromMCodeAndCrypto: (privKeyType, mnemonics) => {
    const response = defaultUtils.mnemonics.privKeyFromMCodeAndCrypto(
      privKeyType,
      mnemonics,
    );
    logResult("privKeyFromMCodeAndCrypto", response);
    return response;
  },
};

//封装 abi 模块的接口调用
const abiUtils = {
  encode: (types, values) => {
    const response = defaultUtils.abi.encode(types, values);
    logResult("encode", response);
    return response;
  },
  decode: (types, values) => {
    const response = defaultUtils.abi.decode(types, values);
    logResult("decode", response);
    return response;
  },
};

// 定义通用的测试数据
const chainCode = "abcd";
const keyType = 0; // ED25519
const priKey = "your encprivate key";
const pubKey = "your encpublic key";
const rawPublicKey = "your raw public key";
const rawPrivateKeyStr = "your raw private key";
const encPrivateKey = "your encprivate key";
const encPublicKey = "your encpublic key";
const encAddress = "did:bid:ef26vF64vKMTGM2uCGERVXJNAobFTm7wY";
const hexAddress = "0x6566eb80a6375298928ff04db6d88b523460205b4b90bcf3";
const passwd = "123";
const keyStoreJson =
  '{"cypher_text":"xxx","aesctr_iv":"xxx","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"xxx"},"version":2,"address":"did:bid:ef26vF64vKMTGM2uCGERVXJNAobFTm7wY"}';
const decipherPasswd = "123";
const serviceType = "caict";
const index = 1;
const message = "0x0102";
const signature = "your signature";
const entropy = "0x10000010060000000020000000001000";
const language = "english";
const mnemonics = "your mnemonics";
const types = ["address", "uint256"];
const values = ["did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov", 10];
const valuesEncode =
  "0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a";

// 调用封装后的函数进行测试
addressUtils.getBidAndKeyPair(chainCode);
addressUtils.getBidAndKeyPairBySM2(chainCode);
addressUtils.privateKeyManager(keyType, chainCode);
addressUtils.privateKeyManagerByKey(priKey);
addressUtils.publicKeyManager(pubKey);
addressUtils.getEncPublicKey(priKey);
addressUtils.getEncPublicKeyByRaw(keyType, rawPublicKey);
addressUtils.getEncPrivateKeyByRaw(keyType, rawPrivateKeyStr);
addressUtils.parsePrivateKey(encPrivateKey);
addressUtils.parsePublicKey(encPublicKey);
addressUtils.publicToAddress(encPublicKey);
addressUtils.isPrivateKey(encPrivateKey);
addressUtils.isPublicKey(encPublicKey);
addressUtils.encAddressToHex(encAddress);
addressUtils.hexToEncAddress(hexAddress);

cryptoUtils.generateKeyStore(encPrivateKey, passwd);
cryptoUtils.setSkeyStore(encPrivateKey, passwd);
cryptoUtils.decipherKeyStore(keyStoreJson, decipherPasswd);
cryptoUtils.generateChild(encPrivateKey, chainCode, serviceType, index);
cryptoUtils.sign(encPrivateKey, message);
cryptoUtils.verify(encPublicKey, message, signature);
cryptoUtils.getCryptoTypeFromPrivKey(encPrivateKey);
cryptoUtils.getCryptoTypeFromPubKey(encPublicKey);

mnemonicsUtils.generateMnemonicCode(keyType, entropy, language);
mnemonicsUtils.privKeyFromMCodeAndCrypto(keyType, mnemonics);

abiUtils.encode(types, values);
abiUtils.decode(types, valuesEncode);
