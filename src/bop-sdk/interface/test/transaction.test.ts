import { TransactionByBop } from "../service/transaction";
import { expect } from "chai";
import * as sinon from "sinon";
import { BopInterface, Config } from "../../../bop/bop-base";
import {} from "../../../bop/bop-proto/bop";
import {
  TransactionEnv,
  GetTxPoolSizeResponse,
  GetTransactionCacheResponse,
  GetTransactionHistoryResponse,
  SubmitTransactionParams,
  SubmitTransactionResponse,
  OpCreateAccountParams,
  OpCreateContractParams,
  OpGasSendParams,
  OpContractInvokeParams,
  OpSetMetadataParams,
  OpSetPrivParams,
  OpBatchGasSend,
  OpBatchContractInvoke,
  TxType,
  OpGasSend,
  ContractType,
  OperationTypeThreshold_Type,
  OffLineTxResponse,
  TestTransactionRequest,
  TestTransactionResponse,
  TxBlob,
} from "../../proto/bop-sdk-interface";
import { SignerByBop } from "../signer";
import { ProviderByBop } from "../provider";

// 使用 Sinon 创建模拟对象
const sandbox = sinon.createSandbox();
const apiKey = "xxx";
const apiSecret = "xxx";

describe("provider-transaction-test", () => {
  let transaction: TransactionByBop;

  let bopInterface: BopInterface;
  let config: Config;

  let signer: SignerByBop;
  let signer2: SignerByBop;
  let provider: ProviderByBop;

  beforeEach(() => {
    config = new Config("https://bif-mainnet.bitfactory.cn", apiKey, apiSecret);
    bopInterface = new BopInterface(config);
    transaction = new TransactionByBop(bopInterface);

    signer = new SignerByBop("your encprivate key");

    signer2 = new SignerByBop("your encprivate key");
    provider = new ProviderByBop(bopInterface);
  });

  afterEach(() => {
    // 重置模拟对象
    sandbox.restore();
  });

  describe("transaction test", () => {
    it("transaction.getTxPoolSize", async () => {
      let response: GetTxPoolSizeResponse;
      response = await transaction.getTxPoolSize();
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
    });
    it("transaction.getTransactionHistory none params", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory();
      console.log(response);
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.totalCount).to.equal(100);
    });
    it("transaction.getTransactionHistory with exist hash", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        undefined,
        "b5cef0860f6000cdfb4fa0d2dc95a013632032a49764ade7c1d972a493307315",
      );
      console.log(response);
      console.log(
        JSON.stringify(GetTransactionHistoryResponse.toJSON(response)),
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.totalCount).to.equal(1);
      expect(
        response.result?.transactions[0]?.transaction?.operations[0]?.log
          ?.datas[0],
      ).to.equal(
        "080110641a286469643a6269643a65664765486467643141776d746755424b616333624771726d506f4e6841316b2a5618b1432802324f4661696c656420746f207375626d6974206c61796572322073746174652c206c617965723220736571283836323529206973206e6f7420657175616c206d617820736571283836323529202b20312e",
      );
    });
    it("transaction.getTransactionHistory with not exist hash", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        undefined,
        "xxx",
      );
      console.log(response);
      console.log(
        JSON.stringify(GetTransactionHistoryResponse.toJSON(response)),
      );
      expect(response.errorCode).to.equal(4);
    });
    it("transaction.getTransactionHistory with seq", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(5845093);
      console.log(response);
      console.log(
        JSON.stringify(GetTransactionHistoryResponse.toJSON(response)),
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.totalCount).to.equal(2);
    });
    it("transaction.getTransactionHistory with seq and start & limit", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(5845093, 0, 1);
      console.log(response);
      console.log(
        JSON.stringify(GetTransactionHistoryResponse.toJSON(response)),
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.totalCount).to.equal(2);
    });
    it("transaction.getTransactionHistory with seq and default start", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(5845093);
      console.log(response);
      console.log(
        JSON.stringify(GetTransactionHistoryResponse.toJSON(response)),
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.totalCount).to.equal(2);
    });
    it("transaction.getTransactionHistory with seq and hash", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        5845127,
        undefined,
        undefined,
        "7370f1759c37f09268d72019c006b6167392d21186e11b0bd098148ac8f34479",
      );
      console.log(response);
      console.log(
        JSON.stringify(GetTransactionHistoryResponse.toJSON(response)),
      );
      expect(response.errorCode).to.equal(0);
      expect(response.errorDesc).to.equal("ok");
      expect(response.result?.totalCount).to.equal(2);
    });
    it("transaction.getTransactionHistory with hash empty", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        undefined,
        "",
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTransactionHistory with hash invalid", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        undefined,
        "xxx",
      );
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });
    it("transaction.getTransactionHistory with ledgerseq 0", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(0);
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });
    it("transaction.getTransactionHistory with ledgerseq negative", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(-1);
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });
    it("transaction.getTransactionHistory with ledgerseq more than max", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(9999999999999);
      console.log(response);
      expect(response.errorCode).to.equal(4);
    });
    it("transaction.getTransactionHistory with start 0", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(undefined, 0);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTransactionHistory with start negative", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(undefined, -1);
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTransactionHistory with start more than max", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        9999999999999,
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTransactionHistory with limit 0", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        0,
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTransactionHistory with limit negative", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        -1,
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTransactionHistory with limit more than max", async () => {
      let response: GetTransactionHistoryResponse;
      response = await transaction.getTransactionHistory(
        undefined,
        undefined,
        9999999999999,
      );
      console.log(response);
      expect(response.errorCode).to.equal(0);
    });
    it("transaction.getTxPoolTransactions", async () => {
      {
        let request: OpGasSendParams = {
          params: {
            nonceType: TxType.INCREASE_NONCE,
            gasPrice: 1,
            feeLimit: 10000,
            remarks: "test",
          },
          destAddress: "did:bid:ef27sVwzEMTEUwC1E1ivQmzEccsphtac7",
          amount: 1,
        };
        let signerWithProvider = signer.connect(provider);
        let response: OffLineTxResponse;
        response = await transaction.buildGasSendTx(request, [
          signerWithProvider,
        ]);
        console.log(response);
        expect(response.errorCode).to.equal(0);
        let subresponse: SubmitTransactionResponse;
        subresponse = await transaction.submitTransaction({
          items: [response.result],
        });
        console.log(subresponse);
      }
      let response: GetTransactionCacheResponse;
      response = await transaction.getTxPoolTransactions(0);
      console.log(JSON.stringify(response));
      expect(response.errorCode).to.equal(4);
      expect(response.errorDesc).to.equal(
        "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
      );
    });
    it("transaction.buildAccountCreateTx", async () => {
      let request: OpCreateAccountParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 1000,
          remarks: "",
        },
        destAddress: "did:bid:ef26vF64vKMTGM2uCGERVXJNAobFTm7wY",
        amount: 1,
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildAccountCreateTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildGasSendTx", async () => {
      let request: OpGasSendParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        destAddress: "did:bid:ef27sVwzEMTEUwC1E1ivQmzEccsphtac7",
        amount: 1,
      };
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildGasSendTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildContractCreateTx solidity", async () => {
      let request: OpCreateContractParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000000,
          remarks: "test",
        },
        initBalance: 1,
        type: ContractType.EVM,
        payload:
          "608060405234801561000f575f80fd5b5061019a8061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80632e64cec1146100385780636057361d14610056575b5f80fd5b610040610072565b60405161004d91906100d2565b60405180910390f35b610070600480360381019061006b9190610119565b61007a565b005b5f8054905090565b805f819055507f23b3e9cfb15bae93d147362e55f22b745d66a37405bece55b6bfbdb35a0fb060816040516100af91906100d2565b60405180910390a150565b5f819050919050565b6100cc816100ba565b82525050565b5f6020820190506100e55f8301846100c3565b92915050565b5f80fd5b6100f8816100ba565b8114610102575f80fd5b50565b5f81359050610113816100ef565b92915050565b5f6020828403121561012e5761012d6100eb565b5b5f61013b84828501610105565b9150509291505056fea2646970667358221220bb054df7a684290d3dceeca77407e3f5a111ba0b1ef00e88956c5e4f2f970ca664736f6c637822302e382e32312d63692e323032342e332e312b636f6d6d69742e31383065353661320053",
        initInput: "",
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildContractCreateTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildContractCreateTx javascript", async () => {
      let request: OpCreateContractParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000000,
          remarks: "test",
        },
        initBalance: 1,
        type: ContractType.JAVASCRIPT,
        payload:
          "'use strict';function init(input){return;}function main(input){let para=JSON.parse(input);if(para.do_foo){let x={'hello':'world'};}}function query(input){return input;}",
        initInput: "",
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildContractCreateTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildContractInvokeTx solidity", async () => {
      let request: OpContractInvokeParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 100000,
          remarks: "test",
        },
        contractAddress: "did:bid:efhj9cgStGJckhLwHZefYS9Yje38NVuP",
        input: '{"function":"store(uint256)","args":"1"}',
        amount: 0,
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildContractInvokeTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildContractInvokeTx javascript", async () => {
      let request: OpContractInvokeParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        contractAddress: "did:bid:eftf3aqGEQE4ANLj6U13GKqu4pzUSj2U",
        input: '{"method":"getsuperlist"}',
        amount: 1,
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildContractInvokeTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildSetMetadataTx", async () => {
      let request: OpSetMetadataParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        key: "A",
        value: "C",
        version: 1,
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildSetMetadataTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildSetPrivilegeTx", async () => {
      let request: OpSetPrivParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        masterWeight: "1",
        signers: [
          {
            address: "did:bid:efsdhXX7bNYxeYYVasatAi7DPE4nM3Lb",
            weight: 1,
          },
        ],
        txThreshold: "1",
        typeThresholds: [
          {
            type: OperationTypeThreshold_Type.CREATE_ACCOUNT,
            threshold: 1,
          },
        ],
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildSetPrivilegeTx(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildBatchGasSend", async () => {
      let request: OpBatchGasSend = {
        base: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        params: [
          {
            destAddress: "did:bid:zfkeY37hHn2HGSeUpEdWuH76aJbkoX6H",
            amount: -1,
          },
          {
            destAddress: "did:bid:zfkeY37hHn2HGSeUpEdWuH76aJbkoX6H",
            amount: 1,
          },
        ],
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildBatchGasSend(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.buildBatchContractInvoke", async () => {
      let request: OpBatchContractInvoke = {
        base: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 1000000,
          remarks: "test",
        },
        params: [
          {
            contractAddress: "did:bid:efYzPhz9f3aFNAZZ42bhbLetBxPyYLdk",
            input: '{"function":"store(uint256)","args":"5"}',
            amount: 0,
          },
          {
            contractAddress: "did:bid:efYzPhz9f3aFNAZZ42bhbLetBxPyYLdk",
            input: '{"function":"store(uint256)","args":"6"}',
            amount: 0,
          },
        ],
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildBatchContractInvoke(request, [
        signerWithProvider,
      ]);
      console.log(response);
      expect(response.errorCode).to.equal(0);
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({
        items: [response.result],
      });
      console.log(subresponse);
    });
    it("transaction.submitTransaction", async () => {
      let request: OpSetMetadataParams = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        key: "A",
        value: "C",
        version: 2,
      };
      console.log(request);
      let signerWithProvider = signer.connect(provider);
      let response: OffLineTxResponse;
      response = await transaction.buildSetMetadataTx(request, [
        signerWithProvider,
      ]);
      console.log(JSON.stringify(response));
      expect(response.errorCode).to.equal(0);
      let tx: OffLineTxResponse = response;
      tx.result.signatures[0].signData =
        "52936dffa7ca865b592ea2d2ad5b3d0a679eb1524fdb61389018cfee0ad3b31a89dbb6ff2da9a2b228275850c2293cd20df71747a11e77769b04b090dc9d003d";
      let subresponse: SubmitTransactionResponse;
      subresponse = await transaction.submitTransaction({ items: [tx.result] });
      console.log(subresponse);
    });
    it("transaction.estimateGas", async () => {
      let request: TestTransactionRequest = {
        items: [
          {
            transactionJson: {
              feeLimit: 100000,
              sourceAddress: "did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK",
              gasPrice: 1,
              nonce: "58",
              operations: [
                //   {
                //     type: 1,
                //     createAccount: {
                //       destAddress: "did:bid:ef24McYxrgR5PJUPqw8Ldhsd8XUYx1sSN",
                //       initBalance: 1,
                //       priv: {
                //         masterWeight: 1,
                //         thresholds: {
                //           txThreshold: 1,
                //         },
                //       },
                //     },
                //   },
                //   {
                //     type: 1,
                //     createAccount: {
                //       initBalance: 0,
                //       contract: {
                //         type: 1,
                //         payload: "608060405234801561000f575f80fd5b506101638061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80632e64cec1146100385780636057361d14610056575b5f80fd5b610040610072565b60405161004d919061009b565b60405180910390f35b610070600480360381019061006b91906100e2565b61007a565b005b5f8054905090565b805f8190555050565b5f819050919050565b61009581610083565b82525050565b5f6020820190506100ae5f83018461008c565b92915050565b5f80fd5b6100c181610083565b81146100cb575f80fd5b50565b5f813590506100dc816100b8565b92915050565b5f602082840312156100f7576100f66100b4565b5b5f610104848285016100ce565b9150509291505056fea26469706673582212205e90a2a9da6608b7a94c2c5cf27906d85803927c0bd952e062893006d1814fd564736f6c637822302e382e32312d63692e323032342e332e312b636f6d6d69742e31383065353661320053"
                //       },
                //       initInput: "",
                //       priv: {
                //         masterWeight: 0,
                //         thresholds: {
                //           txThreshold: 1,
                //         },
                //       },
                //     },
                //   },
                //   {
                //     type: 1,
                //     createAccount: {
                //       initBalance: 0,
                //       contract: {
                //         type: 0,
                //         payload: "'use strict';function init(input){return;}function main(input){let para=JSON.parse(input);if(para.do_foo){let x={'hello':'world'};}}function query(input){return input;}"
                //       },
                //       initInput: "",
                //       priv: {
                //         masterWeight: 0,
                //         thresholds: {
                //           txThreshold: 1,
                //         },
                //       },
                //     },
                //   },
                //   {
                //     type: 7,
                //     payCoin: {
                //         destAddress: "did:bid:ef24McYxrgR5PJUPqw8Ldhsd8XUYx1sSN",
                //         amount: 1,
                //     }
                //   },
                // {
                //     type: 7,
                //     payCoin: {
                //         destAddress: "did:bid:ef8eHAyVVUJeZqCpJVZGi2todhibpASp",
                //         amount: 0,
                //         input: '{"function":"store(uint256)","args":"2"}'
                //     }
                //   },
                // {
                //     type: 7,
                //     payCoin: {
                //         destAddress: "did:bid:eftf3aqGEQE4ANLj6U13GKqu4pzUSj2U",
                //         amount: 0,
                //         input: '{"method":"getsuperlist"}'
                //     }
                //   },
                //   {
                //     type: 4,
                //     setMetadata: {
                //         key: "CCC",
                //         value: "C",
                //         version: 1,
                //     }
                //   },
                //   {
                //     type: 9,
                //     setPrivilege: {
                //         masterWeight: "1",
                //         typeThresholds: [
                //             {
                //                 type: 1,
                //                 threshold: 1,
                //             }
                //         ]
                //     }
                //   }
              ],
            },
            signatureNumber: 1,
          },
        ],
      };
      let response: TestTransactionResponse;
      response = await transaction.estimateGas(request);
      console.log(JSON.stringify(response));
      expect(response.errorCode).to.equal(0);
    });
  });
});
