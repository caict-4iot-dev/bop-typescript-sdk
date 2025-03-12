import * as bifEncryption from "@caict/bif-encryption";
import {
  CheckKeyResponse,
  GetChildBidAndKeyPairResponse,
  GetKeyResponse,
  KeyType,
  ChildAccountKeyInfo,
  GetKeyTypeResponse,
} from "../proto/bop-sdk-utils";
import { SdkStatusCode } from "../proto/bop-sdk-common";

const keystore = require("@caict/bif-encryption/src/vendor/keystore");
const util = require("@caict/bif-encryption/src/common/util");
const sjcl = require("brdc-sjcl");

export class EncryptionCrypto {
  constructor() {}

  private remove0xPrefix(str: string): string {
    if (str.startsWith("0x")) {
      return str.substring(2);
    }
    return str;
  }

  private isHexadecimalString(str: string): boolean {
    const hexRegex = /^[0-9a-fA-F]+$/;
    return hexRegex.test(this.remove0xPrefix(str));
  }

  private isValidChainCode(str: string): boolean {
    // 使用正则表达式来检查字符串是否仅包含数字和小写字母
    const regex = /^[a-z0-9]{4}$/;
    return regex.test(str);
  }

  public generateKeyStore(
    encPrivateKey: string,
    passwd: string,
  ): GetKeyResponse {
    try {
      let result = bifEncryption.generateKeyStore(
        encPrivateKey,
        passwd,
      ) as JSON;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: JSON.stringify(result),
      };
      return response;
    } catch (error: any) {
      // 根据不同的错误消息设置相应的错误码和错误描述，构建并返回对应的错误响应对象
      let response: GetKeyResponse;
      if (error.message === "invalid privatekey") {
        response = {
          errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
          errorDesc: error.message,
        };
      } else if (error.message === "invalid password") {
        response = {
          errorCode: SdkStatusCode.INVALIDPASSWD,
          errorDesc: error.message,
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: error.message,
        };
      }
      return response;
    }
  }

  public setSkeyStore(encPrivateKey: string, passwd: string): GetKeyResponse {
    try {
      let result = bifEncryption.generateKeyStore(
        encPrivateKey,
        passwd,
      ) as JSON;
      const newObj: any = {};
      for (const key in result) {
        if (key !== "address") {
          newObj[key] = result[key];
        }
      }
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: JSON.stringify(newObj),
      };
      return response;
    } catch (error: any) {
      let response: GetKeyResponse;
      if (error.message === "invalid privatekey") {
        response = {
          errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
          errorDesc: error.message,
        };
      } else if (error.message === "invalid password") {
        response = {
          errorCode: SdkStatusCode.INVALIDPASSWD,
          errorDesc: error.message,
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: error.message,
        };
      }
      return response;
    }
  }

  private decipherKeyStoreForVersion(keystoreContent, password) {
    let regular = /[u4e00-u9fa5]/;
    try {
      if (typeof keystoreContent === "string") {
        keystoreContent = JSON.parse(keystoreContent);
      }
    } catch (e) {
      throw new Error("invalid keystoreContent");
    }
    if (!util._isString(password) || !regular.test(password)) {
      throw new Error("invalid password");
    }
    let rawKeyResult = keystore.decrypt(keystoreContent, password);
    let privateKey =
      rawKeyResult.privateKey === null ? "" : rawKeyResult.privateKey;
    if (privateKey == "") {
      throw new Error("The password was wrong");
    }
    if (rawKeyResult.version === 3) {
      let chainType = keystoreContent.address.substring(8, 10);
      let rowPrivateKey = rawKeyResult.privateKey;
      chainType = chainType === "ef" ? 0x65 : 0x7a;
      privateKey = bifEncryption.getEncPrivateKeyByRaw(
        Array.from(sjcl.codec.bytes.fromBits(rowPrivateKey)),
        chainType,
      );
    }
    const accountObj = bifEncryption.privateKeyManagerByKey(privateKey);
    if (
      accountObj.encAddress !== keystoreContent.address ||
      keystoreContent.address === undefined
    ) {
      throw new Error("Keystore address invalid");
    }
    return privateKey;
  }

  public decipherKeyStore(
    keyStoreJson: string,
    passwd: string,
  ): GetKeyResponse {
    try {
      let result = this.decipherKeyStoreForVersion(
        keyStoreJson,
        passwd,
      ) as string;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: result,
      };
      return response;
    } catch (error: any) {
      let response: GetKeyResponse;
      if (error.message === "invalid password") {
        response = {
          errorCode: SdkStatusCode.INVALIDPASSWD,
          errorDesc: error.message,
        };
      } else if (error.message === "The password was wrong") {
        response = {
          errorCode: SdkStatusCode.ERRORPASSWD,
          errorDesc: error.message,
        };
      } else if (
        error.message === "invalid keystoreContent" ||
        error.message === "Keystore address invalid"
      ) {
        response = {
          errorCode: SdkStatusCode.INVALIDKEYSTORE,
          errorDesc: error.message,
        };
      } else if (error.message === "invalid privateKey") {
        response = {
          errorCode: SdkStatusCode.INVALIDKEYSTORE,
          errorDesc: "Keystore generate invalid privateKey",
        };
      } else if (error.errorMessage === "The password is incorrect") {
        response = {
          errorCode: SdkStatusCode.ERRORPASSWD,
          errorDesc: "The password was wrong",
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: "unknow error",
        };
      }
      return response;
    }
  }

  public generateChild(
    encPrivateKey: string,
    chainCode: string,
    serviceType: string,
    index: number,
  ): GetChildBidAndKeyPairResponse {
    try {
      if (!bifEncryption.isPrivateKey(encPrivateKey)) {
        const response: GetChildBidAndKeyPairResponse = {
          errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
          errorDesc: "invalid privateKey",
        };
        return response;
      }

      if (!this.isValidChainCode(chainCode) || chainCode === "") {
        const response: GetChildBidAndKeyPairResponse = {
          errorCode: SdkStatusCode.INVALIDCHAINCODE,
          errorDesc: "invalid chain code",
        };
        return response;
      }

      if (serviceType === "") {
        const response: GetChildBidAndKeyPairResponse = {
          errorCode: SdkStatusCode.INVALIDSERVICETYPE,
          errorDesc: "invalid service type",
        };
        return response;
      }

      if (index < 0 || index > 1024) {
        const response: GetChildBidAndKeyPairResponse = {
          errorCode: SdkStatusCode.INVALIDINDEXVALUE,
          errorDesc: "invalid index value",
        };
        return response;
      }

      let accountInfo = bifEncryption.generateChild(
        encPrivateKey,
        chainCode !== undefined ? chainCode : "",
        serviceType !== undefined ? serviceType : "",
        index !== undefined ? index : 0,
      ) as ChildAccountKeyInfo;
      const response: GetChildBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: {
          privateKey: accountInfo.privateKey,
          publicKey: accountInfo.publicKey,
          address: accountInfo.address,
          path: accountInfo.path,
        },
      };
      return response;
    } catch (error: any) {
      const response: GetChildBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public sign(encPrivateKey: string, message: string): GetKeyResponse {
    try {
      if (!this.isHexadecimalString(message)) {
        throw new Error("invalid message");
      }

      let signature = bifEncryption.sign(
        this.remove0xPrefix(message),
        encPrivateKey,
      ) as string;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: signature,
      };
      return response;
    } catch (error: any) {
      let response: GetKeyResponse;
      if (error.message === "invalid privateKey") {
        response = {
          errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
          errorDesc: error.message,
        };
      } else if (error.message === "invalid message") {
        response = {
          errorCode: SdkStatusCode.INVALIDMESSAGE,
          errorDesc: error.message,
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: error.message,
        };
      }
      return response;
    }
  }

  public verify(
    encPublicKey: string,
    message: string,
    signature: string,
  ): CheckKeyResponse {
    try {
      if (!this.isHexadecimalString(message)) {
        throw new Error("invalid message");
      }

      if (!this.isHexadecimalString(signature)) {
        throw new Error("invalid signature");
      }

      let res = bifEncryption.verify(
        this.remove0xPrefix(message),
        this.remove0xPrefix(signature),
        encPublicKey,
      ) as boolean;
      const response: CheckKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: res,
      };
      return response;
    } catch (error: any) {
      let response: CheckKeyResponse;
      if (error.message === "invalid publicKey") {
        response = {
          errorCode: SdkStatusCode.INVALIDPUBLICKEY,
          errorDesc: error.message,
        };
      } else if (error.message === "invalid message") {
        response = {
          errorCode: SdkStatusCode.INVALIDMESSAGE,
          errorDesc: error.message,
        };
      } else if (error.message === "invalid signature") {
        response = {
          errorCode: SdkStatusCode.INVALIDSIGNATURE,
          errorDesc: error.message,
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: error.message,
        };
      }
      return response;
    }
  }

  public getCryptoTypeFromPrivKey(encPrivateKey: string): GetKeyTypeResponse {
    try {
      if (!bifEncryption.isPrivateKey(encPrivateKey)) {
        throw new Error("invalid encPrivateKey");
      }

      let res = bifEncryption.getCryptoTypeFromPrivKey(encPrivateKey) as number;
      if (res !== 0x65 && res !== 0x7a) {
        throw new Error("invalid encPrivateKey");
      }
      const response: GetKeyTypeResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: res === 0x65 ? KeyType.ED25519 : KeyType.SM2,
      };
      return response;
    } catch (error: any) {
      let response: GetKeyTypeResponse;
      if (error.message === "invalid encPrivateKey") {
        response = {
          errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
          errorDesc: error.message,
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: error.message,
        };
      }
      return response;
    }
  }

  public getCryptoTypeFromPubKey(encPublicKey: string): GetKeyTypeResponse {
    try {
      if (!bifEncryption.isPublicKey(encPublicKey)) {
        throw new Error("invalid encPublicKey");
      }

      let res = bifEncryption.getCryptoTypeFromPubKey(encPublicKey) as number;
      if (res !== 0x65 && res !== 0x7a) {
        throw new Error("invalid encPublicKey");
      }
      const response: GetKeyTypeResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: res === 0x65 ? KeyType.ED25519 : KeyType.SM2,
      };
      return response;
    } catch (error: any) {
      let response: GetKeyTypeResponse;
      if (error.message === "invalid encPublicKey") {
        response = {
          errorCode: SdkStatusCode.INVALIDPUBLICKEY,
          errorDesc: error.message,
        };
      } else {
        response = {
          errorCode: SdkStatusCode.UNRECOGNIZED,
          errorDesc: error.message,
        };
      }
      return response;
    }
  }
}
