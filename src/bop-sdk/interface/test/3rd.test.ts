import { BopByBop } from "../service/3rd";
import { expect } from "chai";
import * as sinon from "sinon";
import { BopInterface, Config } from "../../../bop/bop-base";
import {
  ApplyRequest,
  ApplyResponse,
  ApplyStatusRequest,
  ApplyStatusResponse,
  DetailRequest,
  DetailResponse,
  DiscardRequest,
  DiscardResponse,
  GetTransactionCachePlatResponse,
  GetTransactionCacheRequest,
  QueryRequest,
  QueryResponse,
  QueryRequest_TxType,
} from "../../../bop/bop-proto/bop";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();
const apiKey = "xxx";
const apiSecret = "xxx";

describe("provider-bop-test", () => {
  let bop: BopByBop;
  let baseServiceMock: sinon.SinonMock;

  let bopInterface: BopInterface;
  let config: Config;

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", apiKey, apiSecret);
    bopInterface = new BopInterface(config);

    bop = new BopByBop(bopInterface);
    baseServiceMock = sandbox.mock(bopInterface.getBaseService());
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });

  describe("bop test", () => {
    it("bop.apply", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("bop.apply more than 100", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("bop.apply less than 100", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("bop.apply bid empty", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "",
            status: "1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.apply bid invalid", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "xxx",
            status: "1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.apply status empty", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.apply status negative", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "-1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.apply status more then 1", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "2",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.apply status invalid", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "xx",
          },
        ],
      };
      let response: ApplyResponse;
      response = await bop.apply(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.status", async () => {
      const request: ApplyStatusRequest = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
      };
      let response: ApplyStatusResponse;
      response = await bop.status(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("bop.status requestNo empty", async () => {
      const request: ApplyStatusRequest = {
        requestNo: "",
      };
      let response: ApplyStatusResponse;
      response = await bop.status(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.status requestNo not exist", async () => {
      const request: ApplyStatusRequest = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf86",
      };
      let response: ApplyStatusResponse;
      response = await bop.status(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.status requestNo invalid", async () => {
      const request: ApplyStatusRequest = {
        requestNo: "xxx",
      };
      let response: ApplyStatusResponse;
      response = await bop.status(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.detail", async () => {
      const request: DetailRequest = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
      };
      let response: DetailResponse;
      response = await bop.detail(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("bop.detail requestNo empty", async () => {
      const request: DetailRequest = {
        requestNo: "",
      };
      let response: DetailResponse;
      response = await bop.detail(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.detail requestNo invalid", async () => {
      const request: DetailRequest = {
        requestNo: "xxx",
      };
      let response: DetailResponse;
      response = await bop.detail(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.detail requestNo not exist", async () => {
      const request: DetailRequest = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf86",
      };
      let response: DetailResponse;
      response = await bop.detail(request);
      console.log(response);
      expect(response.errorCode).to.equal(1106);
    });

    it("bop.getTransactionCache", async () => {
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

      // 设置模拟对象的行为
      baseServiceMock
        .expects("getTransactionCachePlat")
        .withArgs(sinon.match.any)
        .resolves(GetTransactionCachePlatResponse.fromJSON(platResponseJson));
      let request: GetTransactionCacheRequest;
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
      console.log(response.result?.transactions[0]);
      expect(response.result?.transactions[0].hash).to.equal(
        "e6366d3ae7231e8f59d44b710521dce671abd9d1c37c2e2b23736b12665e6547",
      );
      expect(response.result?.totalCount).to.equal(1);

      // 验证模拟对象的方法调用
      baseServiceMock.verify();
    });

    it("bop.getTransactionCache address empty", async () => {
      let request: GetTransactionCacheRequest = {
        address: "",
      };
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
    });

    it("bop.getTransactionCache address invalid", async () => {
      let request: GetTransactionCacheRequest = {
        address: "xxx",
      };
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("bop.getTransactionCache hash invalid", async () => {
      let request: GetTransactionCacheRequest = {
        hash: "xxx",
      };
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
    });

    it("bop.getTransactionCache limit negative", async () => {
      let request: GetTransactionCacheRequest = {
        limit: -1,
      };
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("bop.getTransactionCache limit 0", async () => {
      let request: GetTransactionCacheRequest = {
        limit: 0,
      };
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("bop.getTransactionCache request null", async () => {
      let request: GetTransactionCacheRequest = {};
      let response: GetTransactionCachePlatResponse;
      response = await bop.getTransactionCache(request);
      console.log(response);
    });

    it("bop.discard default", async () => {
      const request: DiscardRequest = {};
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.discard with hash", async () => {
      const request: DiscardRequest = {
        hash: "18c9c9af526d2fa884e7e9def698bdf346c39e95566bfe68a5eff600dcd9ef28",
      };
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      console.log(response.result?.transactionBases[0]);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "18c9c9af526d2fa884e7e9def698bdf346c39e95566bfe68a5eff600dcd9ef28",
      );
    });

    it("bop.discard with page and pagesize", async () => {
      const request: DiscardRequest = {
        page: 2,
        pageSize: 1,
      };
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.discard with invalid hash", async () => {
      const request: DiscardRequest = {
        hash: "xx",
      };
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.discard with empty hash", async () => {
      const request: DiscardRequest = {
        hash: "",
      };
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      console.log(response.result?.transactionBases[0]);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.discard page negative", async () => {
      const request: DiscardRequest = {
        page: -1,
      };
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("bop.discard pagesize negative", async () => {
      const request: DiscardRequest = {
        pageSize: -1,
      };
      let response: DiscardResponse;
      response = await bop.discard(request);
      console.log(response);
      expect(response.errorCode).to.equal(-6);
    });

    it("bop.query default", async () => {
      const request: QueryRequest = {};
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query with hash", async () => {
      const request: QueryRequest = {
        hash: "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      console.log(response.result?.transactionBases[0]);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.totalPage).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
      );
    });

    it("bop.query tx_type and hash", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        hash: "6e12c6b6dfec2bd743e07d93467cad5c7b9810593ea42de1fcb4d7481921d311",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      console.log(response.result?.transactionBases[0]);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.success).to.equal(true);
      expect(response.result?.count).to.equal(1);
      expect(response.result?.totalPage).to.equal(1);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "6e12c6b6dfec2bd743e07d93467cad5c7b9810593ea42de1fcb4d7481921d311",
      );
    });

    it("bop.query tx_type and page & pagesize", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        page: 1,
        pageSize: 1,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and bid", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        bid: "did:bid:zfDzx5mNsB5JREptjkcGz8h4TCsAPniD",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and starttime & endtime", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        startTime: "2025-02-11 15:07:46",
        endTime: "2025-02-11 15:09:35",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "17b5fc65f69599452f63dd13a1ae04c494ba5fb5232e5d6e7a9ace47b56fb2ba",
      );
    });

    it("bop.query tx_type and ledgerseq", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        ledgerSeq: 5844781,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.result?.transactionBases[0]?.hash).to.equal(
        "17b5fc65f69599452f63dd13a1ae04c494ba5fb5232e5d6e7a9ace47b56fb2ba",
      );
    });

    it("bop.query tx_type and bid invalid", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        bid: "xxx",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and bid empty", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        bid: "",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and ledgerseq 0", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        ledgerSeq: 0,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and ledgerseq negative", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        ledgerSeq: -1,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and ledgerseq more than max", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        ledgerSeq: 9999999999999,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and hash invalid", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        hash: "xxx",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and hash empty", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        hash: "",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and txid invalid", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        txId: "xxx",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and txid empty", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        txId: "",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and endtime > starttime", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        startTime: "2025-02-11 15:07:46",
        endTime: "2025-02-11 15:06:46",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and starttime & endtime invalid", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        startTime: "xxx",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(-1);
    });

    it("bop.query tx_type and starttime & endtime empty", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        startTime: "",
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("bop.query tx_type and txtype UNRECOGNIZED", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.UNRECOGNIZED,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(1105);
    });

    it("bop.query tx_type and page negative", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        page: -1,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("bop.query tx_type and page more than max", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        page: 99999999,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(-1);
    });

    it("bop.query tx_type and pagesize more than max", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        pageSize: 99999999,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("bop.query tx_type and pagesize zero", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        pageSize: 0,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(-6);
    });

    it("bop.query tx_type and pagesize negative", async () => {
      const request: QueryRequest = {
        txType: QueryRequest_TxType.BASE_TX,
        pageSize: -1,
      };
      let response: QueryResponse;
      response = await bop.query(request);
      console.log(response);
      expect(response.errorCode).to.equal(-6);
    });
  });
});
