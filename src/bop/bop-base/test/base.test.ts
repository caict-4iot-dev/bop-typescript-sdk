import { expect } from "chai";
import { promisify } from "util";
import * as sinon from "sinon";
import { Config } from "../index";
import { BaseService } from "../base";
import {
  HelloResponse,
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
  QueryRequest,
  QueryResponse,
  GetTransactionCacheRequest,
  GetTransactionCacheChainResponse,
  GetTransactionCachePlatResponse,
  DiscardRequest,
  DiscardResponse,
  GetTxCacheSizeResponse,
  GetTransactionCachePlatResult,
} from "../../bop-proto/bop";
import { success } from "io-ts";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();

describe("BaseService", () => {
  let config: Config;
  let baseService: BaseService;
  let baseServiceInvalidApiKey: BaseService;
  let baseServiceInvalidApiSecret: BaseService;
  let baseServiceMock: sinon.SinonMock;

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");
    baseService = new BaseService(config.host, config.apiKey, config.apiSecret);
    baseServiceInvalidApiKey = new BaseService(
      config.host,
      "xxxx",
      config.apiSecret,
    );
    baseServiceInvalidApiSecret = new BaseService(
      config.host,
      config.apiKey,
      "xxxx",
    );
    baseServiceMock = sandbox.mock(
      new BaseService(config.host, config.apiKey, config.apiSecret),
    );
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });
  describe("invalid test", () => {
    it("invalid api-key", async () => {
      let response: HelloResponse;
      response = await baseServiceInvalidApiKey.hello();
      expect(response.errorCode).to.equal(1122);
      expect(response.errorDesc).to.equal("API Key does not exist.");
    });

    it("invalid api-secret", async () => {
      let response: HelloResponse;
      response = await baseServiceInvalidApiSecret.hello();
      expect(response.errorCode).to.equal(1208);
      expect(response.errorDesc).to.equal(
        "The provided API Secret does not match the project",
      );
    });
  });
  describe("api-test hello", () => {
    //hello
    it("normal hello", async () => {
      let response: HelloResponse;
      response = await baseService.hello();
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });
  });
  //getAccount
  describe("api-test getAccount", () => {
    it("getAccount only address true", async () => {
      const request: GetAccountRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("getAccount address true with exist key", async () => {
      const request: GetAccountRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        key: "layer_1_agent_did:bid:effvm1wrsYv4NHtyjvMGcPg1CWX9TW2a",
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response?.result?.metadatas[0]?.key).to.equal(
        "layer_1_agent_did:bid:effvm1wrsYv4NHtyjvMGcPg1CWX9TW2a",
      );
    });

    it("getAccount address true with not exist key", async () => {
      const request: GetAccountRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        key: "1",
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response?.result?.metadatas).to.empty;
    });

    it("getAccount only address and account not exist", async () => {
      const request: GetAccountRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk",
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getAccount only address and account invalid", async () => {
      const request: GetAccountRequest = {
        address: "xxx",
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getAccount address true with height(account not exist)", async () => {
      const request: GetAccountRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        height: 1,
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
    });

    it("getAccount address true with height(account exist)", async () => {
      const request: GetAccountRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        height: 5000000,
      };
      let response: GetAccountResponse;
      response = await baseService.getAccount(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response?.result?.metadatas).to.be.an("array").that.is.not.empty;
    });
  });

  //getAccountBase
  describe("api-test getAccountBase", () => {
    it("getAccountBase address true", async () => {
      const request: GetAccountBaseRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      };
      let response: GetAccountBaseResponse;
      response = await baseService.getAccountBase(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("getAccountBase address with invalid address", async () => {
      const request: GetAccountBaseRequest = {
        address: "xxx",
      };
      let response: GetAccountBaseResponse;
      response = await baseService.getAccountBase(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getAccountBase address with not exist address", async () => {
      const request: GetAccountBaseRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
      };
      let response: GetAccountBaseResponse;
      response = await baseService.getAccountBase(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });
  });

  //getAccountMetaData
  describe("api-test getAccountMetaData", () => {
    it("getAccountMetaData address with no key", async () => {
      const request: GetAccountMetadataRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      };
      let response: GetAccountMetadataResponse;
      response = await baseService.getAccountMetaData(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(Object.keys(response.result!).length).to.be.greaterThan(0);
    });

    it("getAccountMetaData address with exist key", async () => {
      const request: GetAccountMetadataRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        key: "layer_2_agent_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k",
      };
      let response: GetAccountMetadataResponse;
      response = await baseService.getAccountMetaData(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(Object.keys(response.result!).length).to.be.greaterThan(0);
    });

    it("getAccountMetaData address with not exist key", async () => {
      const request: GetAccountMetadataRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        key: "1",
      };
      let response: GetAccountMetadataResponse;
      response = await baseService.getAccountMetaData(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result).to.be.empty;
    });

    it("getAccountMetaData with invalid address", async () => {
      const request: GetAccountMetadataRequest = {
        address: "xxx",
      };
      let response: GetAccountMetadataResponse;
      response = await baseService.getAccountMetaData(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
      expect(response.result).to.be.empty;
    });

    it("getAccountMetaData with not exist address", async () => {
      const request: GetAccountMetadataRequest = {
        address: "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
      };
      let response: GetAccountMetadataResponse;
      response = await baseService.getAccountMetaData(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
      expect(response.result).to.be.empty;
    });
  });

  //getLedger
  describe("api-test getLedger", () => {
    it("getLedger with no params", async () => {
      const request: GetLedgerRequest = {};
      let response: GetLedgerResponse;
      response = await baseService.getLedger(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("getLedger with normal seq", async () => {
      const request: GetLedgerRequest = {
        seq: 1,
      };
      let response: GetLedgerResponse;
      response = await baseService.getLedger(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.header?.seq).to.equal(1);
    });

    it("getLedger with abnormal seq", async () => {
      const request: GetLedgerRequest = {
        seq: 0,
      };
      let response: GetLedgerResponse;
      response = await baseService.getLedger(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getLedger with leader", async () => {
      const request: GetLedgerRequest = {
        withLeader: true,
      };
      let response: GetLedgerResponse;
      response = await baseService.getLedger(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.leader.length).to.be.greaterThan(0);
    });

    it("getLedger with validators", async () => {
      const request: GetLedgerRequest = {
        withValidator: true,
      };
      let response: GetLedgerResponse;
      response = await baseService.getLedger(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.validators.length).to.be.greaterThan(0);
    });
  });

  //submitTransaction
  describe("api-test submitTransaction", () => {
    it("submitTransaction normal", async () => {
      const request: SubmitTransactionRequest = {
        items: [
          {
            signatures: [
              {
                publicKey:
                  "b065665b6fa23dc1c00b17b8d2cd86093c86bbae4c011247310f9160351bd64bc580cc",
                signData:
                  "F62BA0BD3CC98EFBBA20DB540C6660BD4547390625AD4FF6CEB7B216985F6EFB3092E3F9E36299068D668D52CA92ABAD944D28342E0DD4D1ACEE06D700350702",
              },
            ],
            transactionBlob:
              "0A286469643A6269643A6566433552456946657361427575315558624D4A577645737146526B514B6971103022D605080122D10512C305080112BE053630383036303430353233343830313536313030313035373630303038306664356235303631303133663830363130303230363030303339363030306633303036303830363034303532363030343336313036313030343135373630303033353763303130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303930303436336666666666666666313638303633303331313533633231343631303034363537356236303030383066643562333438303135363130303532353736303030383066643562353036313030356236313030643635363562363034303531383038303630323030313832383130333832353238333831383135313831353236303230303139313530383035313930363032303031393038303833383336303030356238333831313031353631303039623537383038323031353138313834303135323630323038313031393035303631303038303536356235303530353035303930353039303831303139303630316631363830313536313030633835373830383230333830353136303031383336303230303336313031303030613033313931363831353236303230303139313530356235303932353035303530363034303531383039313033393066333562363036303630343038303531393038313031363034303532383036303062383135323630323030313766363836353663366336663230373736663732366336343030303030303030303030303030303030303030303030303030303030303030303030303030303030303831353235303930353039303536303061313635363237613761373233303538323033336431366230663863613362323334646363396233336139623533303063333630313561383838373732633761656565633965353733613537316437346338303032391A041A0208012880C2D72F2A0F63726561746520636F6E747261637430AC87E32F3864",
          },
        ],
      };
      let response: SubmitTransactionResponse;
      response = await baseService.submitTransaction(request);
      expect(response.successCount).to.equal(1);
      expect(response.results[0]?.hash).to.equal(
        "d4c9eb33750d66dc471cfb276807c0f1b61ace6dd969fce9cc7ab2c49c69e40a",
      );
      expect(response.results[0]?.errorCode).to.equal(0);
    });

    it("submitTransaction empty transaction", async () => {
      const request: SubmitTransactionRequest = {
        items: [],
      };
      let response: SubmitTransactionResponse;
      response = await baseService.submitTransaction(request);
      expect(response.successCount).to.equal(0);
      expect(response.results[0]?.hash).to.equal("");
      expect(response.results[0]?.errorCode).to.equal(-9);
      expect(response.results[0]?.errorDesc).to.equal("交易数据不能为空");
    });

    it("submitTransaction empty request", async () => {
      const request: SubmitTransactionRequest = {};
      let response: SubmitTransactionResponse;
      response = await baseService.submitTransaction(request);
      expect(response.successCount).to.equal(0);
      expect(response.results[0]?.hash).to.equal("");
      expect(response.results[0]?.errorCode).to.equal(-9);
      expect(response.results[0]?.errorDesc).to.equal("交易数据不能为空");
    });

    it("submitTransaction missing transactionBlob", async () => {
      const request: SubmitTransactionRequest = {
        items: [
          {
            signatures: [
              {
                publicKey:
                  "b065665b6fa23dc1c00b17b8d2cd86093c86bbae4c011247310f9160351bd64bc580cc",
                signData:
                  "F62BA0BD3CC98EFBBA20DB540C6660BD4547390625AD4FF6CEB7B216985F6EFB3092E3F9E36299068D668D52CA92ABAD944D28342E0DD4D1ACEE06D700350702",
              },
            ],
          },
        ],
      };
      let response: SubmitTransactionResponse;
      response = await baseService.submitTransaction(request);
      expect(response.successCount).to.equal(0);
      expect(response.results[0]?.hash).to.equal("");
      expect(response.results[0]?.errorCode).to.equal(-9);
      expect(response.results[0]?.errorDesc).to.equal(
        "Transaction blob cannot be empty",
      );
    });

    it("submitTransaction missing signatures", async () => {
      const request: SubmitTransactionRequest = {
        items: [
          {
            transactionBlob:
              "0A286469643A6269643A6566433552456946657361427575315558624D4A577645737146526B514B6971103022D605080122D10512C305080112BE053630383036303430353233343830313536313030313035373630303038306664356235303631303133663830363130303230363030303339363030306633303036303830363034303532363030343336313036313030343135373630303033353763303130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303930303436336666666666666666313638303633303331313533633231343631303034363537356236303030383066643562333438303135363130303532353736303030383066643562353036313030356236313030643635363562363034303531383038303630323030313832383130333832353238333831383135313831353236303230303139313530383035313930363032303031393038303833383336303030356238333831313031353631303039623537383038323031353138313834303135323630323038313031393035303631303038303536356235303530353035303930353039303831303139303630316631363830313536313030633835373830383230333830353136303031383336303230303336313031303030613033313931363831353236303230303139313530356235303932353035303530363034303531383039313033393066333562363036303630343038303531393038313031363034303532383036303062383135323630323030313766363836353663366336663230373736663732366336343030303030303030303030303030303030303030303030303030303030303030303030303030303030303831353235303930353039303536303061313635363237613761373233303538323033336431366230663863613362323334646363396233336139623533303063333630313561383838373732633761656565633965353733613537316437346338303032391A041A0208012880C2D72F2A0F63726561746520636F6E747261637430AC87E32F3864",
          },
        ],
      };
      let response: SubmitTransactionResponse;
      response = await baseService.submitTransaction(request);
      expect(response.successCount).to.equal(0);
      expect(response.results[0]?.hash).to.equal("");
      expect(response.results[0]?.errorCode).to.equal(-9);
      expect(response.results[0]?.errorDesc).to.equal(
        "Operation list cannot be empty",
      );
    });
  });
  //getTransactionHistory
  describe("api-test getTransactionHistory", () => {
    it("getTransactionHistory with no params", async () => {
      const request: GetTransactionHistoryRequest = {};
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("getTransactionHistory with exist hash(log)", async () => {
      const request: GetTransactionHistoryRequest = {
        hash: "170761ce1ff9028d2855d6b0a1fd30e4324abe7847c8ff138b9aa770402c1fa8",
      };
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.totalCount).to.equal(1);
      expect(response.result?.transactions[0]?.hash).to.equal(
        "170761ce1ff9028d2855d6b0a1fd30e4324abe7847c8ff138b9aa770402c1fa8",
      );
    });

    it("getTransactionHistory with exist hash(pay_coin)", async () => {
      const request: GetTransactionHistoryRequest = {
        hash: "5b677393143a29d92e6ef5fb551e839cd0833db2a695b0f0361873576728051d",
      };
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.totalCount).to.equal(1);
      expect(response.result?.transactions[0]?.hash).to.equal(
        "5b677393143a29d92e6ef5fb551e839cd0833db2a695b0f0361873576728051d",
      );
    });

    it("getTransactionHistory with not exist hash", async () => {
      const request: GetTransactionHistoryRequest = {
        hash: "170761ce1ff9028d2855d6b0a1fd30e4324abe7847c8ff138b9aa770402c1fa1",
      };
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getTransactionHistory with ledger seq", async () => {
      const request: GetTransactionHistoryRequest = {
        ledgerSeq: 1,
      };
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.totalCount).to.equal(1);
    });

    it("getTransactionHistory with start", async () => {
      const request: GetTransactionHistoryRequest = {
        ledgerSeq: 5722198,
        start: 1,
      };
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.totalCount).to.equal(2);
      expect(response.result?.transactions[0]?.hash).to.equal(
        "2fcb276718da653f063f703f58ef4feac32a354de85442763e53e1a07ee7b115",
      );
    });

    it("getTransactionHistory with limit", async () => {
      const request: GetTransactionHistoryRequest = {
        ledgerSeq: 5722198,
        limit: 1,
      };
      let response: GetTransactionHistoryResponse;
      response = await baseService.getTransactionHistory(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.totalCount).to.equal(2);
      expect(response.result?.transactions[0]?.hash).to.equal(
        "7355af35bf1a841f75ef54edef160600cfbcaa3173a0024a1da8181348d54900",
      );
    });
  });

  //testTransaction
  describe("api-test testTransaction", () => {
    it("testTransaction ", async () => {
      const request: TestTransactionRequest = {
        items: [
          {
            transactionJson: {
              feeLimit: 100000,
              sourceAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
              gasPrice: 1,
              nonce: "173",
              operations: [
                {
                  type: 1,
                  sourceAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
                  createAccount: {
                    destAddress: "did:bid:efY72a55qY47gj2gSbvjLaLwdC439p4n",
                    initBalance: 1,
                    priv: {
                      masterWeight: 1,
                      thresholds: {
                        txThreshold: 1,
                      },
                    },
                  },
                },
              ],
            },
            signatureNumber: 1,
          },
        ],
      };
      let response: TestTransactionResponse;
      response = await baseService.testTransaction(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.hash).to.equal(
        "0abe44d70d64a9147d60745dff4ecd51d2dc7ede960b6018329debbe70b697a9",
      );
    });
  });

  //callContract
  describe("api-test callContract", () => {
    it("callContract contract address not exist", async () => {
      const request: CallContractRequest = {
        contractAddress: "",
        feeLimit: 10000,
        gasPrice: 1,
        input: '{"method":"getsuperlist"}',
        sourceAddress: "did:bid:ef56JqCtiFNBU7z8Y8Nd47QsNPVNbTu3",
      };
      let response: CallContractResponse;
      response = await baseService.callContract(request);
      expect(response.errorCode).to.equal(-9);
      expect(response.errorDesc).to.equal("Contract address cannot be empty");
      expect(response.success).to.equal(false);
    });

    it("callContract systemContract dpos", async () => {
      const request: CallContractRequest = {
        contractAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
        feeLimit: 10000,
        gasPrice: 1,
        input: '{"method":"getsuperlist"}',
        sourceAddress: "did:bid:ef56JqCtiFNBU7z8Y8Nd47QsNPVNbTu3",
      };
      let response: CallContractResponse;
      response = await baseService.callContract(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("callContract jsContract", async () => {
      const request: CallContractRequest = {
        contractAddress: "did:bid:ef2AAQSLB2YAuWJE8mHdUXncGWRVPkoJT",
        feeLimit: 10000,
        gasPrice: 1,
        input:
          '{"method":"queryBid", "params":"did:bid:ef2AAQSLB2YAuWJE8mHdUXncGWRVPkoJT"}',
        sourceAddress: "did:bid:ef56JqCtiFNBU7z8Y8Nd47QsNPVNbTu3",
      };
      let response: CallContractResponse;
      response = await baseService.callContract(request);
      expect(response.result?.queryRets[0]?.error).to.equal(
        '{"data":{"contract":"did:bid:ef2AAQSLB2YAuWJE8mHdUXncGWRVPkoJT","exception":"10706,The bid document is not existed","linenum":1}}',
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("callContract evmContract", async () => {
      const request: CallContractRequest = {
        contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
        feeLimit: 10000,
        gasPrice: 1,
        input:
          '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
        sourceAddress: "did:bid:ef56JqCtiFNBU7z8Y8Nd47QsNPVNbTu3",
      };
      let response: CallContractResponse;
      response = await baseService.callContract(request);
      expect(response.result?.queryRets[0]?.result).to.equal(
        '{"code":0,"data":"[0]","desc":"","evmcode":"0000000000000000000000000000000000000000000000000000000000000000","gasused":2767}',
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });
  });

  //query
  describe("api-test query", () => {
    it("query with no params", async () => {
      const request: QueryRequest = {};
      let response: QueryResponse;
      response = await baseService.query(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });

    it("query with hash", async () => {
      const request: QueryRequest = {
        hash: "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      };
      let response: QueryResponse;
      response = await baseService.query(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.totalPage).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      );
    });

    it("query with bid and txtype", async () => {
      const request: QueryRequest = {
        bid: "did:bid:efU9VvMvSydLUY5h1eEPDKJSWSXKVtKG",
        txType: 0,
      };
      let response: QueryResponse;
      response = await baseService.query(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(16);
      expect(response.result?.totalPage).to.equal(2);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      );
    });

    it("query with ledger_seq", async () => {
      const request: QueryRequest = {
        ledgerSeq: 5722974,
      };
      let response: QueryResponse;
      response = await baseService.query(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.totalPage).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      );
    });

    it("query with start_time and end_time", async () => {
      const request: QueryRequest = {
        startTime: "2024-12-26 14:52:09",
        endTime: "2024-12-26 14:52:11",
      };
      let response: QueryResponse;
      response = await baseService.query(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.totalPage).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      );
    });
  });
  //getTransactionCache
  describe("api-test getTransactionCache", () => {
    it("getTransactionCacheChain with not exist hash", async () => {
      const request: GetTransactionCacheRequest = {
        hash: "6eaaf19b9d73f646c051af7175a3c175410d2edfc1dad988cb6a6e171c4f902a",
      };
      let response: GetTransactionCacheChainResponse;
      response = await baseService.getTransactionCacheChain(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getTransactionCachePlat with not exist hash", async () => {
      const request: GetTransactionCacheRequest = {
        hash: "6eaaf19b9d73f646c051af7175a3c175410d2edfc1dad988cb6a6e171c4f902a",
      };
      let response: GetTransactionCachePlatResponse;
      response = await baseService.getTransactionCachePlat(request);
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
      expect(response.success).to.equal(false);
    });

    it("getTransactionCachePlat hash", async () => {
      let platResponseJson = {
        trace: "9d1450d34aac419b887b84567300050f",
        result: {
          total_count: 1,
          transactions: [
            {
              blob: "0A286469643A6269643A6566433552456946657361427575315558624D4A577645737146526B514B697110F6880322330807522F0A296469643A6269643A65663262374A386141375044326D77535243754B4B4276423873726A4A7A32596F1080B51830C0843D3801",
              hash: "e6366d3ae7231e8f59d44b710521dce671abd9d1c37c2e2b23736b12665e6547",
              error_code: 1311,
              signatures: [
                {
                  sign_data:
                    "4BAC56FCF51A90CDD9DC30D7E13072FCFD3181BB861FA34457FD47E4515AC168013E17A8887F1A8EAE8DD42D42447B0644043DAFCF5C007DECF62D05033B1B03",
                  public_key:
                    "b065665b6fa23dc1c00b17b8d2cd86093c86bbae4c011247310f9160351bd64bc580cc",
                },
              ],
              transaction: {
                operations: [
                  {
                    type: 7,
                    pay_coin: {
                      dest_address: "did:bid:ef2b7J8aA7PD2mwSRCuKKBvB8srjJz2Yo",
                      amount: 400000,
                    },
                  },
                ],
                source_address: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
                nonce: 50294,
              },
            },
          ],
        },
        success: true,
        error_code: 0,
        error_desc: "ok",
      };

      let response: GetTransactionCachePlatResponse;
      response = GetTransactionCachePlatResponse.fromJSON(platResponseJson);
      expect(response.result?.transactions[0].hash).to.equal(
        "e6366d3ae7231e8f59d44b710521dce671abd9d1c37c2e2b23736b12665e6547",
      );
      expect(response.result?.totalCount).to.equal(1);
    });
  });
  //query/discard
  describe("api-test query/discard", () => {
    it("query/discard with no params", async () => {
      const request: DiscardRequest = {};
      let response: DiscardResponse;
      response = await baseService.discard(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.be.greaterThan(0);
    });

    it("query/discard with hash", async () => {
      const request: DiscardRequest = {
        hash: "6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575",
      };
      let response: DiscardResponse;
      response = await baseService.discard(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575",
      );
    });

    it("query/discard with not exist hash", async () => {
      const request: DiscardRequest = {
        hash: "6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f576",
      };
      let response: DiscardResponse;
      response = await baseService.discard(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });
  });

  //query/discard
  describe("api-test getTxCacheSize", () => {
    it("getTxCacheSize", async () => {
      let response: GetTxCacheSizeResponse;
      response = await baseService.getTxCacheSize();
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
    });
  });
});
