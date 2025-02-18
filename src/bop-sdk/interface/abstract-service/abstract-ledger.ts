import {
  LedgerResponse,
  LedgerNumberResponse,
  LedgerLeaderResponse,
  LedgerValidatorsResponse,
  LedgerTxHashesResponse,
} from "bop-sdk/proto/bop-sdk-interface";

export abstract class ledger {
  abstract getLedger(seq?: number): Promise<LedgerResponse>;
  abstract getLedgerNumber(): Promise<LedgerNumberResponse>;
  abstract getLedgerLeader(seq?: number): Promise<LedgerLeaderResponse>;
  abstract getLedgerValidators(seq?: number): Promise<LedgerValidatorsResponse>;
  abstract getLedgerTxHashes(seq?: number): Promise<LedgerTxHashesResponse>;
}
