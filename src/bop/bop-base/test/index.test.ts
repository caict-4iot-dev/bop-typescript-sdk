import { expect } from "chai";
import { promisify } from "util";
import * as sinon from "sinon";
import { Config, BopInterface } from "../index";
import { ApplyRequest } from "../../bop-proto/bop";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();
const apiKey = "xxx";
const apiSecret = "xxx";

describe("BopInterface", () => {
  let bopInterface: BopInterface;
  let config: Config;
  let permitServiceMock: sinon.SinonMock; // 假设 PermitService 有一些方法需要模拟

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", apiKey, apiSecret);
    bopInterface = new BopInterface(config);

    // 模拟 PermitService
    permitServiceMock = sandbox.mock(bopInterface.getPermitService());
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });

  describe("callService", () => {
    it("should call the correct service and method", async () => {
      // 设置模拟对象的行为
      permitServiceMock
        .expects("apply")
        .withArgs(sinon.match.any)
        .resolves({ status: "success", data: {} });

      const applyRequest: ApplyRequest = {
        data: [],
      };

      const response = await bopInterface.callService(
        "permit_apply",
        applyRequest,
      );

      expect(response).to.deep.equal({ status: "success", data: {} });

      // 验证模拟对象的方法调用
      permitServiceMock.verify();
    });

    it("should throw an error for unknown method", async () => {
      // 设置模拟对象的行为以抛出错误
      permitServiceMock
        .expects("apply")
        .throws(new Error("Method not implemented"));

      const applyRequest: ApplyRequest = {
        data: [],
      };
      try {
        await bopInterface.callService("permit_apply", applyRequest);
      } catch (err) {
        expect(err.message).to.equal("Method not implemented");
      }

      permitServiceMock.verify();
    });
  });
});
