import { GetAccountBaseRequest } from "bop/bop-proto/bop";
import {
  CheckContractAccountResponse,
  GetContractInfoResponse,
  CallContractRequest,
  CallContractResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { BopInterface } from "../../../bop/bop-base";
import { contract } from "../abstract-service/abstract-contract";
import * as trans from "./helper";

export class ContractByBop extends contract {
  readonly bopInterface: BopInterface;
  constructor(bop: BopInterface) {
    super();
    this.bopInterface = bop;
  }

  public async checkContractAccount(
    address: string,
  ): Promise<CheckContractAccountResponse> {
    const request: GetAccountBaseRequest = {
      address: address,
    };
    return trans.ContractAccountResultToCheckContractAccount(
      await this.bopInterface.callService("base_getAccountBase", request),
    );
  }

  public async getContractInfo(
    address: string,
  ): Promise<GetContractInfoResponse> {
    const request: GetAccountBaseRequest = {
      address: address,
    };
    return trans.ContractAccountResultToGetContractInfo(
      await this.bopInterface.callService("base_getAccountBase", request),
    );
  }

  public async callContract(
    transaction: CallContractRequest,
  ): Promise<CallContractResponse> {
    transaction.optType = 2;

    return await this.bopInterface.callService(
      "base_callContract",
      transaction,
    );
  }
}
