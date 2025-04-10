import { expect } from "chai";
import { promisify } from "util";
import * as sinon from "sinon";
import { Config } from "../index";
import { PermitService } from "../permit";
import {
  ApplyRequest,
  ApplyResponse,
  statusCodesToJSON,
  ApplyStatusRequest,
  ApplyStatusResponse,
  DetailRequest,
  DetailResponse,
} from "../../bop-proto/bop";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();
const apiKey = "xxx";
const apiSecret = "xxx";

describe("PermitService", () => {
  let config: Config;
  let permitService: PermitService;

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", apiKey, apiSecret);
    permitService = new PermitService(config.host);
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });

  describe("apply", () => {
    it("apply status 1 should return 0", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
        ],
      };
      let response: ApplyResponse;
      response = await permitService.apply(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("apply status 0 should return 0", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "0",
          },
        ],
      };
      let response: ApplyResponse;
      response = await permitService.apply(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("apply status 0 should return 1106", async () => {
      const request: ApplyRequest = {
        data: [
          {
            bid: "xxx",
            status: "0",
          },
        ],
      };
      let response: ApplyResponse;
      response = await permitService.apply(request);
      expect(statusCodesToJSON(response.errorCode)).to.equal(
        "REMOTE_CALL_FAILED",
      );
      expect(response.errorDesc).to.equal("Parameter format error");
    });
  });

  describe("status", () => {
    it("status return 0", async () => {
      const request: ApplyStatusRequest = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
      };
      let response: ApplyStatusResponse;
      response = await permitService.status(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("status invalid requestNo return 1106", async () => {
      const request: ApplyStatusRequest = {
        requestNo: "xxx",
      };
      let response: ApplyStatusResponse;
      response = await permitService.status(request);
      expect(response.errorCode).to.equal(1106);
      expect(response.errorDesc).to.equal("The data does not exist.");
    });
  });

  describe("detail", () => {
    it("detail return 0", async () => {
      const request: DetailRequest = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
      };
      let response: DetailResponse;
      response = await permitService.detail(request);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("detail invalid requestNo return 1106", async () => {
      const request: DetailRequest = {
        requestNo: "xxx",
      };
      let response: DetailResponse;
      response = await permitService.detail(request);
      expect(response.errorCode).to.equal(1106);
      expect(response.errorDesc).to.equal("The data does not exist.");
    });
  });
});
