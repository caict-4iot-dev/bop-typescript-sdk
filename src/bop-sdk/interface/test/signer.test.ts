import { SignerByBop } from "../signer";
import { ProviderByBop } from "../provider";
import { expect } from "chai";
import * as sinon from "sinon";
import {
  CallContractResponse,
  GetAccountBalanceResponse,
  GetAccountIncreaseNonceResponse,
  SignerSignResponse,
  TestTransactionRequest,
  TestTransactionResponse,
  GetAccountResponse,
  LedgerNumberResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { BopInterface, Config } from "../../../bop/bop-base";

describe("signer-test", () => {
  let bopInterface: BopInterface;
  let config: Config;
  let signer: SignerByBop;
  let provider: ProviderByBop;
  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");
    bopInterface = new BopInterface(config);
    signer = new SignerByBop("your encprivate key");
    provider = new ProviderByBop(bopInterface);
  });

  afterEach(() => {});

  describe("signer test", () => {
    it("signer.constructor invalid privateKey", async () => {
      try {
        let signer: SignerByBop = new SignerByBop("xxx");
      } catch (error) {
        expect(error).to.equal("invalid privateKey");
      }
    });

    it("signer.constructor valid privateKey", async () => {
      expect(signer.getAddress()).to.equal(
        "did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK",
      );
      expect(signer.getAddress()).to.equal(signer.address);
      expect(signer.publicKey).to.equal(signer.publicKey);
    });

    it("signer.getBalance", async () => {
      let signerWithProvider = signer.connect(provider);

      let balance =
        (await signerWithProvider.getBalance()) as GetAccountBalanceResponse;
      console.log(balance);
      expect(balance.errorCode).to.equal(0);
    });

    it("signer.getIncreaseNonce", async () => {
      let signerWithProvider = signer.connect(provider);
      let nonce =
        (await signerWithProvider.getIncreaseNonce()) as GetAccountIncreaseNonceResponse;
      console.log(nonce);
      expect(nonce.errorCode).to.equal(0);
    });

    it("signer.getAccount", async () => {
      let signerWithProvider = signer.connect(provider);
      let account =
        (await signerWithProvider.getAccount()) as GetAccountResponse;
      console.log(account);
      expect(account.errorCode).to.equal(0);
    });

    it("signer.getLedgerNumber", async () => {
      let signerWithProvider = signer.connect(provider);
      let number =
        (await signerWithProvider.getLedgerNumber()) as LedgerNumberResponse;
      console.log(number);
      expect(number.errorCode).to.equal(0);
    });

    it("signer.signTransaction", async () => {
      let signerWithProvider = signer.connect(provider);
      let response = (await signerWithProvider.signTransaction(
        "0x010203",
      )) as SignerSignResponse;
      console.log(response);
      console.log(response.result?.publicKey);
      expect(response.errorCode).to.equal(0);
    });

    it("signer.callContract", async () => {
      let signerWithProvider = signer.connect(provider);
      let response = (await signerWithProvider.callContract(
        "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
        '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
      )) as CallContractResponse;
      console.log(response);
      console.log(response.result?.queryRets[0]);
      expect(response.errorCode).to.equal(0);
      expect(response.result?.queryRets[0]?.result).to.equal(
        '{"code":0,"data":"[0]","desc":"","evmcode":"0000000000000000000000000000000000000000000000000000000000000000","gasused":2767}',
      );
    });
  });
});
