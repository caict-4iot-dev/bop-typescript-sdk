import * as bifEncryption from "@caict/bif-encryption";
import {
  CheckKeyResponse,
  GetAccountPublicKeyInfoResponse,
  GetBidAndKeyPairResponse,
  GetKeyResponse,
  KeyType,
} from "../proto/bop-sdk-utils";
import { SdkStatusCode } from "../proto/bop-sdk-common";
import base58, * as bs58 from "@bifproject/bs58";

export class EncryptionAddress {
  constructor() {}

  private rawKeyToHex(rawPrivateKey?: Uint8Array): string {
    if (rawPrivateKey === undefined) {
      return "";
    }
    let hexStr: string = "";
    hexStr += Array.from(rawPrivateKey)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hexStr;
  }

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

  private hexStringToNumberArray(hexStr: string): number[] | null {
    if (!this.isHexadecimalString(hexStr)) {
      return null;
    }
    const byteArray: number[] = [];
    for (let i = 0; i < hexStr.length; i += 2) {
      const byteHex = hexStr.slice(i, i + 2);
      byteArray.push(parseInt(byteHex, 16));
    }
    return byteArray;
  }

  private startsWithDidBid(identifier: string): boolean {
    const regex = /^(did:bid:ef|did:bid:zf)/;
    return regex.test(identifier);
  }

  private isValidChainCode(str: string): boolean {
    // 使用正则表达式来检查字符串是否仅包含数字和小写字母
    const regex = /^[a-z0-9]{4}$/;
    return regex.test(str);
  }

  public getBidAndKeyPair(chainCode?: string): GetBidAndKeyPairResponse {
    interface InternalAccountKeyInfo {
      encPrivateKey?: string | undefined;
      encPublicKey?: string | undefined;
      encAddress?: string | undefined;
      rawPrivateKey?: Uint8Array | undefined;
      rawPublicKey?: Uint8Array | undefined;
    }

    if (
      !this.isValidChainCode(chainCode) &&
      chainCode !== ""
    ) {
      const response: GetBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.INVALIDCHAINCODE,
        errorDesc: "invalid chain code",
      };
      return response;
    }

    let keypair = bifEncryption.getBidAndKeyPair(
    const response: GetBidAndKeyPairResponse = {
      errorCode: SdkStatusCode.SUCCESS,
      errorDesc: "",
      result: {
        keyType: KeyType.ED25519,
        encPrivateKey: keypair.encPrivateKey,
        encPublicKey: keypair.encPublicKey,
        encAddress: keypair.encAddress,
        rawPrivateKey: this.rawKeyToHex(keypair.rawPrivateKey),
        rawPublicKey: this.rawKeyToHex(keypair.rawPublicKey),
      },
    };
    return response;
  }

  public getBidAndKeyPairBySM2(chainCode?: string): GetBidAndKeyPairResponse {
    interface InternalAccountKeyInfo {
      encPrivateKey?: string | undefined;
      encPublicKey?: string | undefined;
      encAddress?: string | undefined;
      rawPrivateKey?: Uint8Array | undefined;
      rawPublicKey?: Uint8Array | undefined;
    }

    if (
      !this.isValidChainCode(chainCode) &&
      chainCode !== undefined &&
      chainCode !== ""
    ) {
      const response: GetBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.INVALIDCHAINCODE,
        errorDesc: "invalid chain code",
      };
      return response;
    }

    let keypair = bifEncryption.getBidAndKeyPairBySM2(
      chainCode,
    ) as InternalAccountKeyInfo;
    const response: GetBidAndKeyPairResponse = {
      errorCode: SdkStatusCode.SUCCESS,
      errorDesc: "",
      result: {
        keyType: KeyType.SM2,
        encPrivateKey: keypair.encPrivateKey,
        encPublicKey: keypair.encPublicKey,
        encAddress: keypair.encAddress,
        rawPrivateKey: this.rawKeyToHex(keypair.rawPrivateKey),
        rawPublicKey: this.rawKeyToHex(keypair.rawPublicKey),
      },
    };
    return response;
  }

  public privateKeyManager(
    type: KeyType,
    chainCode?: string,
  ): GetBidAndKeyPairResponse {
    interface InternalAccountKeyInfo {
      encPrivateKey?: string | undefined;
      encPublicKey?: string | undefined;
      encAddress?: string | undefined;
      rawPrivateKey?: Uint8Array | undefined;
      rawPublicKey?: Uint8Array | undefined;
    }

    if (type !== KeyType.ED25519 && type != KeyType.SM2) {
      const response: GetBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.UNSUPPORTKEYTYPE,
        errorDesc: "unsupport key type",
      };

      return response;
    }

    if (
      !this.isValidChainCode(chainCode) &&
      chainCode !== undefined &&
      chainCode !== ""
    ) {
      const response: GetBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.INVALIDCHAINCODE,
        errorDesc: "invalid chain code",
      };
      return response;
    }

    let keypair = bifEncryption.privateKeyManager(
      type === KeyType.ED25519 ? 0x65 : 0x7a,
      chainCode,
    ) as InternalAccountKeyInfo;
    const response: GetBidAndKeyPairResponse = {
      errorCode: SdkStatusCode.SUCCESS,
      errorDesc: "",
      result: {
        keyType: type,
        encPrivateKey: keypair.encPrivateKey,
        encPublicKey: keypair.encPublicKey,
        encAddress: keypair.encAddress,
        rawPrivateKey: this.rawKeyToHex(keypair.rawPrivateKey),
        rawPublicKey: this.rawKeyToHex(keypair.rawPublicKey),
      },
    };
    return response;
  }

  public privateKeyManagerByKey(priKey: string): GetBidAndKeyPairResponse {
    try {
      priKey = this.remove0xPrefix(priKey);
      interface InternalAccountKeyInfo {
        encPrivateKey?: string | undefined;
        encPublicKey?: string | undefined;
        encAddress?: string | undefined;
        rawPrivateKey?: Uint8Array | undefined;
        rawPublicKey?: Uint8Array | undefined;
      }
      let keypair = bifEncryption.privateKeyManagerByKey(
        priKey,
      ) as InternalAccountKeyInfo;
      const response: GetBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: {
          keyType:
            bifEncryption.getCryptoTypeFromPrivKey(priKey) === 0x65
              ? KeyType.ED25519
              : KeyType.SM2,
          encPrivateKey: keypair.encPrivateKey,
          encPublicKey: keypair.encPublicKey,
          encAddress: keypair.encAddress,
          rawPrivateKey: this.rawKeyToHex(keypair.rawPrivateKey),
          rawPublicKey: this.rawKeyToHex(keypair.rawPublicKey),
        },
      };
      return response;
    } catch (error: any) {
      const response: GetBidAndKeyPairResponse = {
        errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public publicKeyManager(pubKey: string): GetAccountPublicKeyInfoResponse {
    try {
      pubKey = this.remove0xPrefix(pubKey);
      interface InternalAccountPublicKeyInfo {
        keyType?: KeyType | undefined;
        encPublicKey?: string | undefined;
        rawPublicKey?: Uint8Array | undefined;
        encAddress?: string | undefined;
      }
      let keypair = bifEncryption.publicKeyManager(
        pubKey,
      ) as InternalAccountPublicKeyInfo;
      const response: GetAccountPublicKeyInfoResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: {
          keyType:
            bifEncryption.getCryptoTypeFromPubKey(pubKey) === 0x65
              ? KeyType.ED25519
              : KeyType.SM2,
          encPublicKey: pubKey,
          rawPublicKey: this.rawKeyToHex(keypair.rawPublicKey),
          encAddress: keypair.encAddress,
        },
      };
      return response;
    } catch (error: any) {
      const response: GetAccountPublicKeyInfoResponse = {
        errorCode: SdkStatusCode.INVALIDPUBLICKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public getEncPublicKey(priKey: string): GetKeyResponse {
    try {
      priKey = this.remove0xPrefix(priKey);
      let encPublicKey = bifEncryption.getEncPublicKey(priKey) as string;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: encPublicKey,
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public getEncPublicKeyByRaw(
    type: KeyType,
    rawPublicKey: string,
  ): GetKeyResponse {
    try {
      if (type !== KeyType.ED25519 && type != KeyType.SM2) {
        const response: GetKeyResponse = {
          errorCode: SdkStatusCode.UNSUPPORTKEYTYPE,
          errorDesc: "unsupport key type",
        };
        return response;
      }
      let encPublicKey = bifEncryption.getEncPublicKeyByRaw(
        this.hexStringToNumberArray(this.remove0xPrefix(rawPublicKey)),
        type === KeyType.ED25519 ? 0x65 : 0x7a,
      ) as string;

      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: encPublicKey,
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDPUBLICKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public getEncPrivateKeyByRaw(
    type: KeyType,
    rawPrivateKey: string,
  ): GetKeyResponse {
    try {
      if (type !== KeyType.ED25519 && type != KeyType.SM2) {
        const response: GetKeyResponse = {
          errorCode: SdkStatusCode.UNSUPPORTKEYTYPE,
          errorDesc: "unsupport key type",
        };
        return response;
      }

      let encPrivateKey = bifEncryption.getEncPrivateKeyByRaw(
        this.hexStringToNumberArray(this.remove0xPrefix(rawPrivateKey)),
        type === KeyType.ED25519 ? 0x65 : 0x7a,
      ) as string;

      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: encPrivateKey,
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public parsePrivateKey(encPrivateKey: string): GetKeyResponse {
    try {
      let rawPrivateKey = bifEncryption.parsePrivateKey(
        this.remove0xPrefix(encPrivateKey),
      ) as Uint8Array;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: this.rawKeyToHex(rawPrivateKey),
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDPRIVATEKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public parsePublicKey(encPublicKey: string): GetKeyResponse {
    try {
      let rawPublicKey = bifEncryption.parsePublicKey(
        this.remove0xPrefix(encPublicKey),
      ) as Uint8Array;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: this.rawKeyToHex(rawPublicKey),
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDPUBLICKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public publicToAddress(encPublicKey: string): GetKeyResponse {
    try {
      let rawPublicKey = bifEncryption.publicToAddress(
        this.remove0xPrefix(encPublicKey),
      ) as string;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: rawPublicKey,
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDPUBLICKEY,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public isPrivateKey(encPrivateKey: string): CheckKeyResponse {
    let isPri = bifEncryption.isPrivateKey(
      this.remove0xPrefix(encPrivateKey),
    ) as boolean;
    const response: CheckKeyResponse = {
      errorCode: SdkStatusCode.SUCCESS,
      errorDesc: "",
      result: isPri,
    };
    return response;
  }

  public isPublicKey(encPublicKey: string): CheckKeyResponse {
    let isPub = bifEncryption.isPublicKey(
      this.remove0xPrefix(encPublicKey),
    ) as boolean;
    const response: CheckKeyResponse = {
      errorCode: SdkStatusCode.SUCCESS,
      errorDesc: "",
      result: isPub,
    };
    return response;
  }

  public encAddressToHex(encAddress: string): GetKeyResponse {
    try {
      if (!this.startsWithDidBid(encAddress)) {
        throw new Error("invalid address");
      }
      // 截取掉did:bid:前缀
      const addressWithoutPrefix = encAddress.slice(8);
      let prefixCode: string;
      if (addressWithoutPrefix.startsWith("ef")) {
        prefixCode = "0x6566";
      } else {
        prefixCode = "0x7a66";
      }
      const base58Decoded = base58.decode(addressWithoutPrefix.slice(2));

      let hexStr = "";
      for (const byte of base58Decoded) {
        const hex = byte.toString(16).padStart(2, "0");
        hexStr += hex;
      }
      // 拼接字符串
      const result = prefixCode + hexStr;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: result,
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDADDRESS,
        errorDesc: error.message,
      };
      return response;
    }
  }

  public hexToEncAddress(hexAddress: string): GetKeyResponse {
    try {
      if (!this.isHexadecimalString(hexAddress)) {
        throw new Error("invalid address");
      }
      // 去除0x前缀（如果存在）
      let addressWithout0x = this.remove0xPrefix(hexAddress);
      // 截取前两个字节
      const prefixBytes = addressWithout0x.slice(0, 4);
      let prefix;
      if (prefixBytes === "6566") {
        prefix = "ef";
      } else if (prefixBytes === "7a66") {
        prefix = "zf";
      } else {
        throw new Error("invalid address");
      }
      // 对剩余数据进行Base58编码
      const dataToEncode = addressWithout0x.slice(4);
      const base58Encoded = bs58.encode(Buffer.from(dataToEncode, "hex"));
      // 拼接并返回最终的地址字符串
      const result = `did:bid:${prefix}${base58Encoded}`;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: result,
      };
      return response;
    } catch (error: any) {
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.INVALIDADDRESS,
        errorDesc: error.message,
      };
      return response;
    }
  }
}
