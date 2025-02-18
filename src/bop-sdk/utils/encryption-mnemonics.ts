import * as bifEncryption from "@caict/bif-encryption";
import { GetKeyResponse, KeyType } from "../proto/bop-sdk-utils";
import { SdkStatusCode } from "../proto/bop-sdk-common";

export class EncryptionMnemonics {
  constructor() {}

  private remove0xPrefix(str: string): string {
    if (str.startsWith("0x")) {
      return str.substring(2);
    }
    return str;
  }

  public generateMnemonicCode(
    type: KeyType,
    entropy: string,
    language: "chinese" | "english",
  ): GetKeyResponse {
    try {
      if (type !== KeyType.ED25519 && type !== KeyType.SM2) {
        throw new Error("unsupport key type");
      }
      let hdPaths: string;
      if (type === KeyType.ED25519) {
        hdPaths = "m/44'/2022'/0'/0'/0'";
      } else {
        hdPaths = "m/44'/2022'/0'/0/0";
      }

      let res = bifEncryption.generateMnemonicCode(
        this.remove0xPrefix(entropy),
        language,
        hdPaths,
      ) as string;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: res,
      };
      return response;
    } catch (error: any) {
      let response: GetKeyResponse;
      if (
        error.message === "Invalid entropy" ||
        error.message === "invalid entropy"
      ) {
        response = {
          errorCode: SdkStatusCode.INVALIDENTROPY,
          errorDesc: "invalid entropy",
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

  public privKeyFromMCodeAndCrypto(
    type: KeyType,
    mnemonics: string,
  ): GetKeyResponse {
    try {
      if (type !== KeyType.ED25519 && type !== KeyType.SM2) {
        throw new Error("unsupport key type");
      }
      let hdPaths: string;
      if (type === KeyType.ED25519) {
        hdPaths = "m/44'/2022'/0'/0'/0'";
      } else {
        hdPaths = "m/44'/2022'/0'/0/0";
      }

      let privateKey = bifEncryption.privKeyFromMCodeAndCrypto(
        type === KeyType.ED25519 ? 0x65 : 0x7a,
        mnemonics,
        hdPaths,
      ) as string;
      const response: GetKeyResponse = {
        errorCode: SdkStatusCode.SUCCESS,
        errorDesc: "",
        result: privateKey,
      };
      return response;
    } catch (error: any) {
      let response: GetKeyResponse;
      if (
        error.message ===
        "The size of mnemonicCodes must be bigger than or equal to 0"
      ) {
        response = {
          errorCode: SdkStatusCode.INVALIDMNEMONICS,
          errorDesc: error.message,
        };
      } else if (
        error.message ===
        "The size of hdPaths must be bigger than or equal to 0"
      ) {
        response = {
          errorCode: SdkStatusCode.INVALIDMNEMONICS,
          errorDesc: error.message,
        };
      } else if (error.message === "unsupport key type") {
        response = {
          errorCode: SdkStatusCode.UNSUPPORTKEYTYPE,
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
