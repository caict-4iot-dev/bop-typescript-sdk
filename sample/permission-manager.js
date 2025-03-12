import { Config, ProviderByBop, BopInterface } from "@caict/bif-bop-sdk";

// 初始化配置
const config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");

// 创建 Provider 实例
const provider = new ProviderByBop(new BopInterface(config));

// 封装一个通用的日志记录函数，用于记录每个接口调用的结果
const logResult = (methodName, result) => {
  console.log(`${methodName} 结果:`, result);
};

const permitProvider = {
  apply: async (params) => {
    const response = await provider.bop.apply(params);
    logResult("apply", response);
    return response;
  },
  status: async (params) => {
    const response = await provider.bop.status(params);
    logResult("status", response);
    return response;
  },
  detail: async (params) => {
    const response = await provider.bop.detail(params);
    logResult("detail", response);
    return response;
  },
  getTransactionCache: async (params) => {
    const response = await provider.bop.getTransactionCache(params);
    logResult("getTransactionCache", response);
    return response;
  },
  discard: async (params) => {
    const response = await provider.bop.discard(params);
    logResult("discard", response);
    return response;
  },
  query: async (params) => {
    const response = await provider.bop.query(params);
    logResult("query", response);
    return response;
  },
};

// 异步调用 apply 方法
const applyRequest = {
  data: [
    {
      bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
      status: "1",
    },
  ],
};

const statusRequest = {
  requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
};

const detailRequest = {
  requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
};

const getTransactionCacheRequest = {};

const discardRequest = {
  hash: "18c9c9af526d2fa884e7e9def698bdf346c39e95566bfe68a5eff600dcd9ef28",
};

const queryRequest = {
  hash: "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
};

(async () => {
  try {
    await permitProvider.apply(applyRequest);
    await permitProvider.status(statusRequest);
    await permitProvider.detail(detailRequest);
    await permitProvider.getTransactionCache(getTransactionCacheRequest);
    await permitProvider.discard(discardRequest);
    await permitProvider.query(queryRequest);
  } catch (error) {
    console.error("出错:", error);
  }
})();
