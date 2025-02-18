import { BopInterface } from "../../../bop/bop-base";
import {
  ApplyRequest,
  ApplyResponse,
  ApplyStatusRequest,
  ApplyStatusResponse,
  DetailRequest,
  DetailResponse,
  GetTransactionCacheRequest,
  GetTransactionCachePlatResponse,
  DiscardRequest,
  DiscardResponse,
  QueryRequest,
  QueryResponse,
} from "../../../bop/bop-proto/bop";

export class BopByBop {
  readonly bopInterface: BopInterface;

  constructor(bop: BopInterface) {
    this.bopInterface = bop;
  }

  public async apply(params: ApplyRequest): Promise<ApplyResponse> {
    return this.bopInterface.callService("permit_apply", params);
  }

  public async status(
    params: ApplyStatusRequest,
  ): Promise<ApplyStatusResponse> {
    return this.bopInterface.callService("permit_status", params);
  }

  public async detail(params: DetailRequest): Promise<DetailResponse> {
    return this.bopInterface.callService("permit_detail", params);
  }

  public async getTransactionCache(
    params: GetTransactionCacheRequest,
  ): Promise<GetTransactionCachePlatResponse> {
    return this.bopInterface.callService(
      "base_getTransactionCachePlat",
      params,
    );
  }

  public async discard(params: DiscardRequest): Promise<DiscardResponse> {
    return this.bopInterface.callService("base_discard", params);
  }

  public async query(params: QueryRequest): Promise<QueryResponse> {
    return this.bopInterface.callService("base_query", params);
  }
}
