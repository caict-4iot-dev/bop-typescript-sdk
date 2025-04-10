import { ChainByBop } from "../service/chain";
import { expect } from "chai";
import * as sinon from "sinon";
import { BopInterface, Config } from "../../../bop/bop-base";
import {
  GetChainInfoResponse,
  GetNetworkIdResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();
const apiKey = "xxx";
const apiSecret = "xxx";
describe("provider-chain-test", () => {
  let chain: ChainByBop;

  let bopInterface: BopInterface;
  let config: Config;

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", apiKey, apiSecret);
    bopInterface = new BopInterface(config);

    chain = new ChainByBop(bopInterface);
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });

  describe("chain test", () => {
    it("chain.getChainInfo", async () => {
      let response: GetChainInfoResponse;
      response = await chain.getChainInfo();
      expect(response.errorCode).to.equal(0);
      expect(response.result?.networkId).to.equal("16234539267878");
    });

    it("chain.getNetworkId", async () => {
      let response: GetNetworkIdResponse;
      response = await chain.getNetworkId();
      expect(response.errorCode).to.equal(0);
      expect(response.result).to.equal("16234539267878");
    });
  });
});
