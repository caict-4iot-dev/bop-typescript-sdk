import {
  GetLedgerRequest,
  GetTransactionHistoryRequest,
} from "../../../bop/bop-proto/bop";
import {
  LedgerResponse,
  LedgerNumberResponse,
  LedgerLeaderResponse,
  LedgerValidatorsResponse,
  LedgerTxHashesResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { BopInterface } from "../../../bop/bop-base";
import { ledger } from "../abstract-service/abstract-ledger";
import * as trans from "./helper";

export class LedgerByBop extends ledger {
  readonly bopInterface: BopInterface;
  constructor(bop: BopInterface) {
    super();
    this.bopInterface = bop;
  }

  public async getLedgerNumber(): Promise<LedgerNumberResponse> {
    const request: GetLedgerRequest = {};
    return trans.LedgerHeaderToLedgerNumber(
      await this.bopInterface.callService("base_getLedger", request),
    );
  }

  public async getLedger(seq?: number): Promise<LedgerResponse> {
    const request: GetLedgerRequest = {};
    if (seq !== undefined) request.seq = seq;
    return trans.LedgerHeaderToHeader(
      await this.bopInterface.callService("base_getLedger", request),
    );
  }

  public async getLedgerLeader(seq?: number): Promise<LedgerLeaderResponse> {
    const request: GetLedgerRequest = {
      withLeader: true,
    };
    if (seq !== undefined) request.seq = seq;
    return trans.LedgerHeaderToLedgerLeader(
      await this.bopInterface.callService("base_getLedger", request),
    );
  }

  public async getLedgerValidators(
    seq?: number,
  ): Promise<LedgerValidatorsResponse> {
    const request: GetLedgerRequest = {
      withValidator: true,
    };
    if (seq !== undefined) request.seq = seq;
    return trans.LedgerHeaderToLedgerValidators(
      await this.bopInterface.callService("base_getLedger", request),
    );
  }

  public async getLedgerTxHashes(
    seq?: number,
  ): Promise<LedgerTxHashesResponse> {
    const request: GetTransactionHistoryRequest = {
      limit: 1000,
    };
    if (seq !== undefined) request.ledgerSeq = seq;

    return trans.LedgerHeaderToLedgerTxHashes(
      await this.bopInterface.callService(
        "base_getTransactionHistory",
        request,
      ),
    );
  }
}
