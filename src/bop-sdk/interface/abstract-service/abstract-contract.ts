import {
  CheckContractAccountResponse,
  GetContractInfoResponse,
  CallContractRequest,
  CallContractResponse,
} from "bop-sdk/proto/bop-sdk-interface";

export abstract class contract {
  abstract checkContractAccount(
    address: string,
  ): Promise<CheckContractAccountResponse>;
  abstract getContractInfo(address: string): Promise<GetContractInfoResponse>;
  abstract callContract(
    transaction: CallContractRequest,
  ): Promise<CallContractResponse>;
}
