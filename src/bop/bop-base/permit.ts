import {
  ApplyRequest,
  ApplyResponse,
  ApplyStatusRequest,
  ApplyStatusResponse,
  DetailRequest,
  DetailResponse,
  StatusCodes,
} from "../bop-proto/bop";

import JSONbig from "json-bigint";

export class PermitService {
  private readonly host: string;
  private readonly baseUrl: string;

  private readonly _hasApiSecret: boolean;

  constructor(host: string) {
    this.host = host;
    this.baseUrl = `${this.host}/permit`;
    this._hasApiSecret = false;
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

  public async apply(params: ApplyRequest): Promise<ApplyResponse> {
    return ApplyResponse.fromJSON(
      await this.fetchData("/data/apply", params, "POST"),
    );
  }

  public async status(
    params: ApplyStatusRequest,
  ): Promise<ApplyStatusResponse> {
    return ApplyStatusResponse.fromJSON(
      await this.fetchData("/data/query/status", params, "POST"),
    );
  }

  public async detail(params: DetailRequest): Promise<DetailResponse> {
    return DetailResponse.fromJSON(
      await this.fetchData("/data/query/detail", params, "POST"),
    );
  }
}
