import { GetAccountBaseRequest, GetAccountRequest } from "bop/bop-proto/bop";
import {
  GetAccountBalanceResponse,
  GetAccountIncreaseNonceResponse,
  GetAccountMetadataResponse,
  GetAccountPrivResponse,
  GetAccountResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { BopInterface } from "../../../bop/bop-base";
import { account } from "../abstract-service/abstract-account";
import * as trans from "./helper";
import { SdkStatusCode } from "../../../bop-sdk/proto/bop-sdk-common";

export class AccountByBop extends account {
  readonly bopInterface: BopInterface;
  constructor(bop: BopInterface) {
    super();
    this.bopInterface = bop;
  }

  public async getAccount(address: string): Promise<GetAccountResponse> {
    const request: GetAccountBaseRequest = {
      address: address,
    };
    return trans.AccountAccountResultToAccountInfo(
      await this.bopInterface.callService("base_getAccountBase", request),
    );
  }

  public async getAccountMetadata(
    address: string,
    seq?: number,
    key?: string,
  ): Promise<GetAccountMetadataResponse> {
    let request: GetAccountRequest = {
      address: address,
    };
    if (seq !== undefined) request.height = seq;
    if (key !== undefined) {
      request.key = key;
      if (key.length < 1 || key.length > 1024) {
        let response: GetAccountMetadataResponse = {
          errorCode: SdkStatusCode.INVALID_DATAKEY_ERROR,
          errorDesc: "The length of key must be between 1 and 1024",
        };
        return response;
      }
    }
    return trans.AccountAccountToAccountMetadatas(
      await this.bopInterface.callService("base_getAccount", request),
    );
  }

  public async getAccountIncreaseNonce(
    address: string,
  ): Promise<GetAccountIncreaseNonceResponse> {
    const request: GetAccountBaseRequest = {
      address: address,
    };
    return trans.AccountAccountResultToIncreaseNonce(
      await this.bopInterface.callService("base_getAccountBase", request),
    );
  }

  public async getAccountBalance(
    address: string,
  ): Promise<GetAccountBalanceResponse> {
    const request: GetAccountBaseRequest = {
      address: address,
    };
    return trans.AccountAccountResultToBalance(
      await this.bopInterface.callService("base_getAccountBase", request),
    );
  }

  public async getAccountPriv(
    address: string,
  ): Promise<GetAccountPrivResponse> {
    const request: GetAccountBaseRequest = {
      address: address,
    };
    return trans.AccountAccountResultToPriv(
      await this.bopInterface.callService("base_getAccountBase", request),
    );
  }
}
