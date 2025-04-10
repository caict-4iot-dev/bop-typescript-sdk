import { AccountByBop } from "../service/account";
import { expect } from "chai";
import * as sinon from "sinon";
import { BopInterface, Config } from "../../../bop/bop-base";
import {
  GetAccountBalanceResponse,
  GetAccountIncreaseNonceResponse,
  GetAccountMetadataResponse,
  GetAccountPrivResponse,
  GetAccountResponse,
} from "../../proto/bop-sdk-interface";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();
const apiKey = "xxx";
const apiSecret = "xxx";

describe("provider-account-test", () => {
  let account: AccountByBop;

  let bopInterface: BopInterface;
  let config: Config;

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", apiKey, apiSecret);
    bopInterface = new BopInterface(config);

    account = new AccountByBop(bopInterface);
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });

  describe("account test", () => {
    it("account.getAccount", async () => {
      let response: GetAccountResponse;
      response = await account.getAccount(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.address).to.equal(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      );
    });

    it("account.getAccount", async () => {
      let response: GetAccountResponse;
      response = await account.getAccount("");
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("account.getAccount", async () => {
      let response: GetAccountResponse;
      response = await account.getAccount("adfad$@");
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountMetadata", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response?.result).to.be.an("array").that.is.not.empty;
    });

    it("account.getAccountMetadata key exist", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        undefined,
        "layer_2_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result[0].key).to.equal(
        "layer_2_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
    });

    it("account.getAccountMetadata key not exist", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        undefined,
        "layer_3_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("account.getAccountMetadata account not exist", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountMetadata account not have metadata", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:effvm1wrsYv4NHtyjvMGcPg1CWX9TW2a",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("account.getAccountMetadata account with seq and exist key", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        5000000,
        "layer_2_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });

    it("account.getAccountMetadata account with seq and not exist key", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        1,
        "layer_3_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountMetadata account empty", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "",
        1,
        "layer_3_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("account.getAccountMetadata account invalid", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "xxx",
        1,
        "layer_3_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountMetadata account normal and seq(9999999)", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        9999999,
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountMetadata account normal and seq(-1)", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        -1,
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountMetadata account normal and key length more 1024", async () => {
      let response: GetAccountMetadataResponse;
      response = await account.getAccountMetadata(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
        undefined,
        "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
      );
      console.log(response);
      expect(response.errorCode).to.equal(11011);
    });

    it("account.getAccountIncreaseNonce", async () => {
      let response: GetAccountIncreaseNonceResponse;
      response = await account.getAccountIncreaseNonce(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result).to.greaterThan(79685);
    });

    it("account.getAccountIncreaseNonce account not exist", async () => {
      let response: GetAccountIncreaseNonceResponse;
      response = await account.getAccountIncreaseNonce(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountIncreaseNonce account empty", async () => {
      let response: GetAccountIncreaseNonceResponse;
      response = await account.getAccountIncreaseNonce("");
      console.log(response);
      expect(response.errorCode).to.equal(-9);
    });

    it("account.getAccountIncreaseNonce account invalid", async () => {
      let response: GetAccountIncreaseNonceResponse;
      response = await account.getAccountIncreaseNonce("xxxx");
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountBalance", async () => {
      let response: GetAccountBalanceResponse;
      response = await account.getAccountBalance(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result).to.equal(0);
    });

    it("account.getAccountBalance account not exist", async () => {
      let response: GetAccountBalanceResponse;
      response = await account.getAccountBalance(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
      );
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountBalance account empty", async () => {
      let response: GetAccountBalanceResponse;
      response = await account.getAccountBalance("");
      expect(response.errorCode).to.equal(-9);
    });

    it("account.getAccountBalance account invalid", async () => {
      let response: GetAccountBalanceResponse;
      response = await account.getAccountBalance("xxxx");
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountPriv", async () => {
      let response: GetAccountPrivResponse;
      response = await account.getAccountPriv(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });

    it("account.getAccountPriv account not exist", async () => {
      let response: GetAccountPrivResponse;
      response = await account.getAccountPriv(
        "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
      );
      expect(response.errorCode).to.equal(4);
    });

    it("account.getAccountPriv account empty", async () => {
      let response: GetAccountPrivResponse;
      response = await account.getAccountPriv("");
      expect(response.errorCode).to.equal(-9);
    });

    it("account.getAccountPriv account invalid", async () => {
      let response: GetAccountPrivResponse;
      response = await account.getAccountPriv("xxx");
      expect(response.errorCode).to.equal(4);
    });
  });
});
