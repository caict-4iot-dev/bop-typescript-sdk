import {
  GetAccountResponse,
  GetAccountMetadataResponse,
  GetAccountIncreaseNonceResponse,
  GetAccountBalanceResponse,
  GetAccountPrivResponse,
} from "bop-sdk/proto/bop-sdk-interface";

export abstract class account {
  abstract getAccount(address: string): Promise<GetAccountResponse>;
  abstract getAccountMetadata(
    address: string,
    seq?: number | "latest",
    key?: string,
  ): Promise<GetAccountMetadataResponse>;
  abstract getAccountIncreaseNonce(
    address: string,
  ): Promise<GetAccountIncreaseNonceResponse>;
  abstract getAccountBalance(
    address: string,
  ): Promise<GetAccountBalanceResponse>;
  abstract getAccountPriv(address: string): Promise<GetAccountPrivResponse>;
}
