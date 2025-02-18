import {
  CallContractRequest,
  CallContractResponse,
  GetAccountBalanceResponse,
  GetAccountIncreaseNonceResponse,
  SignerSignResponse,
  TestTransactionRequest,
  TestTransactionResponse,
  LedgerNumberResponse,
  GetAccountResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { Provider } from "./abstract-provider";
import { SdkStatusCode } from "../../../bop-sdk/proto/bop-sdk-common";

function defineReadOnly<T, K extends keyof T>(
  object: T,
  name: K,
  value: T[K],
): void {
  Object.defineProperty(object, name, {
    enumerable: true,
    value: value,
    writable: false,
  });
}

export abstract class Signer {
  public provider?: Provider;

  readonly _isSigner: boolean;

  constructor() {
    defineReadOnly(this, "_isSigner", true);
  }

  _checkProvider(operation?: string): string {
    if (!this.provider) {
      if (operation === undefined) return "unconnected provider";
      else return operation + " unconnected provider";
    }
    return "ok";
  }

  abstract connect(provider: Provider): Signer;

  static isSigner(value: any): value is Signer {
    return !!(value && value._isSigner);
  }

  abstract getAddress(): string;

  abstract signTransaction(message: string): Promise<SignerSignResponse>;

  async getAccount(address?: string): Promise<GetAccountResponse> {
    if (this._checkProvider("getAccount") !== "ok") {
      const response: GetAccountResponse = {
        errorCode: SdkStatusCode.UNCONNECTED_PROVIDER,
        errorDesc: this._checkProvider("getAccount"),
      };
      return response;
    }

    if (address === undefined)
      return (await this.provider.account.getAccount(
        this.getAddress(),
      )) as GetAccountResponse;
    else
      return (await this.provider.account.getAccount(
        address,
      )) as GetAccountResponse;
  }

  async getLedgerNumber(): Promise<LedgerNumberResponse> {
    if (this._checkProvider("getLedgerNumber") !== "ok") {
      const response: LedgerNumberResponse = {
        errorCode: SdkStatusCode.UNCONNECTED_PROVIDER,
        errorDesc: this._checkProvider("getLedgerNumber"),
      };
      return response;
    }
    return (await this.provider.ledger.getLedgerNumber()) as LedgerNumberResponse;
  }

  async getBalance(): Promise<GetAccountBalanceResponse> {
    if (this._checkProvider("getBalance") !== "ok") {
      const response: GetAccountBalanceResponse = {
        errorCode: SdkStatusCode.UNCONNECTED_PROVIDER,
        errorDesc: this._checkProvider("getBalance"),
      };
      return response;
    }
    return (await this.provider.account.getAccountBalance(
      this.getAddress(),
    )) as GetAccountBalanceResponse;
  }

  async getIncreaseNonce(): Promise<GetAccountIncreaseNonceResponse> {
    if (this._checkProvider("getIncreaseNonce") !== "ok") {
      const response: GetAccountIncreaseNonceResponse = {
        errorCode: SdkStatusCode.UNCONNECTED_PROVIDER,
        errorDesc: this._checkProvider("getIncreaseNonce"),
      };
      return response;
    }
    return (await this.provider.account.getAccountIncreaseNonce(
      this.getAddress(),
    )) as GetAccountIncreaseNonceResponse;
  }

  async callContract(
    sourceAddress: string,
    input: string,
  ): Promise<CallContractResponse> {
    if (this._checkProvider("callContract") !== "ok") {
      const response: CallContractResponse = {
        errorCode: SdkStatusCode.UNCONNECTED_PROVIDER,
        errorDesc: this._checkProvider("callContract"),
      };
      return response;
    }

    const transaction: CallContractRequest = {
      contractAddress: sourceAddress,
      input: input,
      gasPrice: 1,
      sourceAddress: this.getAddress(),
      optType: 2, //query
    };
    return (await this.provider.contract.callContract(
      transaction,
    )) as CallContractResponse;
  }
}
