import { Signer } from "./abstract-service/abstract-signer";
import { Provider } from "./abstract-service/abstract-provider";
import { SignerSignResponse } from "../../bop-sdk/proto/bop-sdk-interface";
import { defaultUtils } from "../../bop-sdk/utils";
import { SdkStatusCode } from "../../bop-sdk/proto/bop-sdk-common";

export class SignerByBop extends Signer {
  private privateKey: string;
  readonly address: string;
  readonly publicKey: string;

  constructor(privateKey: string) {
    super();
    const response = defaultUtils.address.privateKeyManagerByKey(privateKey);
    if (response.errorCode !== SdkStatusCode.SUCCESS) {
      throw response.errorDesc;
    }
    this.address = response.result?.encAddress;
    this.publicKey = response.result?.encPublicKey;
    this.privateKey = privateKey;
  }

  public getAddress(): string {
    return this.address;
  }

  public connect(provider: Provider): Signer {
    this.provider = provider;
    return this;
  }

  public async signTransaction(message: string): Promise<SignerSignResponse> {
    const signResponse = defaultUtils.crypto.sign(this.privateKey, message);
    let response: SignerSignResponse = {
      errorCode: signResponse.errorCode,
      errorDesc: signResponse.errorDesc,
    };
    if (signResponse.errorCode === SdkStatusCode.SUCCESS) {
      response.result = {
        publicKey: this.publicKey,
        signData: signResponse.result,
      };
    }
    return response;
  }
}
