import {
  HelloResponse,
  HelloResult,
  GetAccountRequest,
  GetAccountResponse,
  GetAccountBaseRequest,
  GetAccountBaseResponse,
  GetAccountMetadataRequest,
  GetAccountMetadataResponse,
  GetLedgerRequest,
  GetLedgerResponse,
  SubmitTransactionRequest,
  SubmitTransactionResponse,
  GetTransactionHistoryRequest,
  GetTransactionHistoryResponse,
  TestTransactionRequest,
  TestTransactionResponse,
  CallContractRequest,
  CallContractResponse,
  QueryReturn,
  QueryRequest,
  QueryResponse,
  QueryRequest_TxType,
  GetTransactionCacheRequest,
  GetTransactionCacheRequest_PoolType,
  GetTransactionCacheChainResponse,
  GetTransactionCachePlatResponse,
  DiscardRequest,
  DiscardResponse,
  GetTxCacheSizeResponse,
  GetTxCacheSizeResult,
  StatusCodes,
} from "../bop-proto/bop";

import JSONbig from "json-bigint";

export class BaseService {
  private readonly apiKey: string;
  private readonly host: string;
  private readonly apiSecret: string;
  private readonly baseUrl: string;

  private _hasApiSecret: boolean;

  constructor(host: string, apiKey: string, apiSecret: string) {
    this.host = host;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = `${this.host}/base/${this.apiKey}`;
    this._hasApiSecret = !(this.apiSecret === "");
  }

  private async fetchData(
    endpoint: string,
    params: any,
    method: "GET" | "POST" = "GET",
    timeout: number = 10000, // 默认超时时间为10秒
  ): Promise<any> {
    // 创建一个AbortController实例
    const controller = new AbortController();
    const { signal } = controller;
    // 设置一个超时
    const timeoutId = setTimeout(() => {
      controller.abort();
      throw new Error("Request timed out");
    }, timeout);
    try {
      let url = `${this.baseUrl}/${endpoint}`;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        throw new Error("URL must start with 'http://' or 'https://'");
      }
      const headers = {
        "Content-Type": "application/json",
        ...(this._hasApiSecret ? { "api-secret": this.apiSecret } : {}),
      };
      // 对params进行判断，如果是GET请求，则将params转为URL查询字符串并附加到URL上
      let queryString = "";
      if (method === "GET" && params) {
        queryString = new URLSearchParams(params).toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      // 创建body，仅在POST请求且params存在时创建
      let body: string | null = null;
      if (method === "POST" && params) {
        body = JSON.stringify(params);
      }

      //console.log(url);
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal, // 将signal传递给fetch
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${response.statusText}`,
        );
      }
      const responseText = await response.text();
      const data = JSONbig.parse(responseText);
      clearTimeout(timeoutId); // 请求成功，清除超时计时器
      return data;
    } catch (error) {
      clearTimeout(timeoutId); // 无论请求是否成功，都清除超时计时器
      let errorDesc = "invalid url";
      if (typeof error === "string") {
        errorDesc = error;
      } else if (error instanceof Error) {
        errorDesc = error.message;
      }

      const obj = {
        error_code: StatusCodes.URL_ERROR,
        error_desc: errorDesc,
      };
      return obj;
    }
  }

  public async hello(): Promise<HelloResponse> {
    let helloResponse: HelloResponse;
    helloResponse = HelloResponse.fromJSON(await this.fetchData("/hello", {}));
    if (helloResponse.errorCode === 0) {
      helloResponse.errorCode = 0;
      helloResponse.errorDesc = "ok";
      helloResponse.result = HelloResult.fromJSON(
        await this.fetchData("/hello", {}),
      );
      helloResponse.success = true;
    }

    return helloResponse;
  }

  public async getAccount(
    params: GetAccountRequest,
  ): Promise<GetAccountResponse> {
    return GetAccountResponse.fromJSON(
      await this.fetchData("/getAccount", params),
    );
  }

  public async getAccountBase(
    params: GetAccountBaseRequest,
  ): Promise<GetAccountBaseResponse> {
    return GetAccountBaseResponse.fromJSON(
      await this.fetchData("/getAccountBase", params),
    );
  }

  public async getAccountMetaData(
    params: GetAccountMetadataRequest,
  ): Promise<GetAccountMetadataResponse> {
    return GetAccountMetadataResponse.fromJSON(
      await this.fetchData("/getAccountMetaData", params),
    );
  }

  public async getLedger(params: GetLedgerRequest): Promise<GetLedgerResponse> {
    interface InternalGetLedgerRequest {
      seq?: number;
      with_validator?: boolean;
      with_leader?: boolean;
    }

    let request: InternalGetLedgerRequest = {};

    // 复制并转换 params 中的属性到 request 中
    if (params.seq !== undefined) request.seq = params.seq;
    if (params.withLeader !== undefined)
      request.with_leader = params.withLeader;
    if (params.withValidator !== undefined)
      request.with_validator = params.withValidator;

    return GetLedgerResponse.fromJSON(
      await this.fetchData("/getLedger", request),
    );
  }

  public async submitTransaction(
    params: SubmitTransactionRequest,
  ): Promise<SubmitTransactionResponse> {
    console.log(JSON.stringify(SubmitTransactionRequest.toJSON(params)));

    return SubmitTransactionResponse.fromJSON(
      await this.fetchData(
        "/submitTransaction",
        SubmitTransactionRequest.toJSON(params),
        "POST",
      ),
    );
  }

  public async getTransactionHistory(
    params: GetTransactionHistoryRequest,
  ): Promise<GetTransactionHistoryResponse> {
    interface InternalGetTransactionHistoryRequest {
      hash?: string | undefined;
      ledger_seq?: number | undefined;
      start?: number | undefined;
      limit?: number | undefined;
    }

    let request: InternalGetTransactionHistoryRequest = {};

    if (params.hash !== undefined) request.hash = params.hash;
    if (params.ledgerSeq !== undefined) request.ledger_seq = params.ledgerSeq;
    if (params.start !== undefined) request.start = params.start;
    if (params.limit !== undefined) request.limit = params.limit;

    return GetTransactionHistoryResponse.fromJSON(
      await this.fetchData("/getTransactionHistory", request),
    );
  }

  public async testTransaction(
    params: TestTransactionRequest,
  ): Promise<TestTransactionResponse> {
    console.log(JSON.stringify(TestTransactionRequest.toJSON(params)));
    return TestTransactionResponse.fromJSON(
      await this.fetchData(
        "/testTransaction",
        TestTransactionRequest.toJSON(params),
        "POST",
      ),
    );
  }

  public async callContract(
    params: CallContractRequest,
  ): Promise<CallContractResponse> {
    params.optType = 2; //query

    function parseCallContractResponse(data: any): CallContractResponse {
      const queryRets: QueryReturn[] = (data.result?.query_rets || []).map(
        (queryRet) => ({
          error: JSON.stringify(queryRet.error), // 将error对象转换为字符串
          result: queryRet.result ? JSON.stringify(queryRet.result) : undefined, // 将result对象转换为字符串（如果存在）
        }),
      );

      return {
        result: {
          queryRets: queryRets.length > 0 ? queryRets : undefined, // 如果queryRets数组为空，则不设置该字段
        },
        success: data.success,
        errorCode: data.error_code,
        errorDesc: data.error_desc,
        trace: data.trace,
      };
    }
    return parseCallContractResponse(
      await this.fetchData(
        "/callContract",
        CallContractRequest.toJSON(params),
        "POST",
      ),
    );
  }

  public async query(params: QueryRequest): Promise<QueryResponse> {
    interface InternalQueryRequest {
      bid?: string | undefined;
      hash?: string | undefined;
      tx_id?: string | undefined;
      start_time?: string | undefined;
      end_time?: string | undefined;
      tx_type?: QueryRequest_TxType | undefined;
      page?: number | undefined;
      page_size?: number | undefined;
      ledger_seq?: number | undefined;
    }

    let request: InternalQueryRequest = {};
    if (params.bid !== undefined) request.bid = params.bid;
    if (params.hash !== undefined) request.hash = params.hash;
    if (params.txId !== undefined) request.tx_id = params.txId;
    if (params.startTime !== undefined) request.start_time = params.startTime;
    if (params.endTime !== undefined) request.end_time = params.endTime;
    if (params.txType !== undefined) request.tx_type = params.txType;
    if (params.page !== undefined) request.page = params.page;
    if (params.pageSize !== undefined) request.page_size = params.pageSize;
    if (params.ledgerSeq !== undefined) request.ledger_seq = params.ledgerSeq;

    return QueryResponse.fromJSON(await this.fetchData("/query", request));
  }

  public async getTransactionCachePlat(
    params: GetTransactionCacheRequest,
  ): Promise<GetTransactionCachePlatResponse> {
    interface InternalGetTransactionCacheRequest {
      pool_type?: GetTransactionCacheRequest_PoolType | undefined;
      limit?: number | undefined;
      hash?: string | undefined;
      address?: string | undefined;
    }

    let request: InternalGetTransactionCacheRequest = {};
    if (params.limit !== undefined) request.limit = params.limit;
    if (params.hash !== undefined) request.hash = params.hash;
    if (params.address !== undefined) request.address = params.address;
    request.pool_type = GetTransactionCacheRequest_PoolType.PLATFORM;

    return GetTransactionCachePlatResponse.fromJSON(
      await this.fetchData("/getTransactionCache", request),
    );
  }

  public async getTransactionCacheChain(
    params: GetTransactionCacheRequest,
  ): Promise<GetTransactionCacheChainResponse> {
    interface InternalGetTransactionCacheRequest {
      pool_type?: GetTransactionCacheRequest_PoolType | undefined;
      limit?: number | undefined;
      hash?: string | undefined;
      address?: string | undefined;
    }

    let request: InternalGetTransactionCacheRequest = {};
    if (params.limit !== undefined) request.limit = params.limit;
    if (params.hash !== undefined) request.hash = params.hash;
    if (params.address !== undefined) request.address = params.address;
    request.pool_type = GetTransactionCacheRequest_PoolType.CHAIN;
    return GetTransactionCacheChainResponse.fromJSON(
      await this.fetchData("/getTransactionCache", request),
    );
  }

  public async discard(params: DiscardRequest): Promise<DiscardResponse> {
    interface InternalDiscardResponse {
      hash?: string | undefined;
      page?: number | undefined;
      page_size?: number | undefined;
    }

    let request: InternalDiscardResponse = {};
    if (params.hash !== undefined) request.hash = params.hash;
    if (params.page !== undefined) request.page = params.page;
    if (params.pageSize !== undefined) request.page_size = params.pageSize;
    return DiscardResponse.fromJSON(
      await this.fetchData("/query/discard", request),
    );
  }

  public async getTxCacheSize(): Promise<GetTxCacheSizeResponse> {
    let getTxCacheSizeResponse: GetTxCacheSizeResponse;
    getTxCacheSizeResponse = GetTxCacheSizeResponse.fromJSON(
      await this.fetchData("/getTxCacheSize", {}),
    );
    if (getTxCacheSizeResponse.errorCode === 0) {
      getTxCacheSizeResponse.errorCode = 0;
      getTxCacheSizeResponse.errorDesc = "ok";
      getTxCacheSizeResponse.result = GetTxCacheSizeResult.fromJSON(
        await this.fetchData("/getTxCacheSize", {}),
      );
      getTxCacheSizeResponse.success = true;
    }

    return getTxCacheSizeResponse;
  }
}
