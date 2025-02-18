// import { expect } from "chai";
// import * as sinon from "sinon";
// import { ProviderByBop } from "../provider";
// import { BopInterface, Config } from "../../../bop/bop-base";
// import {
//   GetChainInfoResponse,
//   GetNetworkIdResponse,
//   LedgerResponse,
//   LedgerNumberResponse,
//   LedgerLeaderResponse,
//   LedgerValidatorsResponse,
//   LedgerTxHashesResponse,
//   GetAccountResponse,
//   GetAccountMetadataResponse,
//   GetAccountIncreaseNonceResponse,
//   GetAccountBalanceResponse,
//   GetAccountPrivResponse,
//   CheckContractAccountResponse,
//   GetContractInfoResponse,
//   TestTransactionRequest,
//   TestTransactionResponse,
//   CallContractRequest,
//   CallContractResponse,
//   GetTxPoolSizeResponse,
//   GetTransactionCacheResponse,
//   GetTransactionHistoryResponse,
//   SignerSignResponse,
//   OpCreateAccountParams,
//   OpCreateContractParams,
//   OpGasSendParams,
//   OpContractInvokeParams,
//   OpSetMetadataParams,
//   OpSetPrivParams,
//   OpBatchGasSend,
//   OpBatchContractInvoke,
//   SubmitTransactionParams,
//   SubmitTransactionResponse,
// } from "bop-sdk/proto/bop-sdk-interface";
// import {
//   ApplyRequest,
//   ApplyResponse,
//   ApplyStatusRequest,
//   ApplyStatusResponse,
//   DetailRequest,
//   DetailResponse,
//   DiscardRequest,
//   DiscardResponse,
//   GetTransactionCachePlatResponse,
//   GetTransactionCacheRequest,
//   QueryRequest,
//   QueryResponse,
// } from "bop/bop-proto/bop";

// describe("provider-test", () => {
//   //normal
//   let provider: ProviderByBop;

//   let bopInterface: BopInterface;
//   let config: Config;

//   //abnormal
//   let provider2: ProviderByBop;

//   let bopInterface2: BopInterface;
//   let config2: Config;

//   beforeEach(() => {
//     config = new Config(
//       "https://bif-testnet.bitfactory.cn",
//       "LDEDIXHWT2VOISUY1BC6VV1YH9QE4Q62",
//       "HV8YcumAAJpLI+Q7SV7BhpI5AFClArxtBZ9dJZnPCgY=",
//     );
//     bopInterface = new BopInterface(config);
//     provider = new ProviderByBop(bopInterface);

//     config2 = new Config("ht://xxx", "xx", "xx");
//     bopInterface2 = new BopInterface(config2);
//     provider2 = new ProviderByBop(bopInterface2);
//   });

//   describe("abnormal provider test", () => {
//     it("provider2.chain.getChainInfo", async () => {
//         let response =
//           (await provider2.chain.getChainInfo()) as GetChainInfoResponse;
//         console.log(response);
//         expect(response.errorCode).to.equal(9999);
//     });
//   });

//   describe("provider test", () => {
//     it("provider.chain.getChainInfo", async () => {
//       let response =
//         (await provider.chain.getChainInfo()) as GetChainInfoResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.networkId).to.equal("16234539267878");
//     });

//     it("provider.chain.getNetworkId", async () => {
//       let response =
//         (await provider.chain.getNetworkId()) as GetNetworkIdResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal("16234539267878");
//     });

//     it("provider.ledger.getLedgerNumber", async () => {
//       let response =
//         (await provider.ledger.getLedgerNumber()) as LedgerNumberResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.greaterThan(10000);
//     });

//     it("provider.ledger.getLedger", async () => {
//       let response = (await provider.ledger.getLedger()) as LedgerResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("provider.ledger.getLedgerLeader", async () => {
//       let response = (await provider.ledger.getLedgerLeader(
//         5777886,
//       )) as LedgerLeaderResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(
//         "did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5",
//       );
//     });

//     it("provider.ledger.getLedgerValidators", async () => {
//       let response = (await provider.ledger.getLedgerValidators(
//         5777886,
//       )) as LedgerValidatorsResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(JSON.stringify(response.result)).to.equal(
//         '["did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP","did:bid:efperBrbfFJrpRUebqDSmXjoLKoBiuGT","did:bid:ef16mauW9ukBbLqYpbZ8b7bavXTPeGMC","did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5"]',
//       );
//     });

//     it("provider.ledger.getLedgerTxHashes", async () => {
//       let response =
//         (await provider.ledger.getLedgerTxHashes()) as LedgerTxHashesResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("provider.account.getAccount", async () => {
//       let response = (await provider.account.getAccount(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       )) as GetAccountResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.address).to.equal(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       );
//     });

//     it("provider.account.getAccountMetadata", async () => {
//       let response = (await provider.account.getAccountMetadata(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//         "latest",
//         "layer_2_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
//       )) as GetAccountMetadataResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result[0].key).to.equal(
//         "layer_2_confirm_seq_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k4254791",
//       );
//     });

//     it("provider.account.getAccountIncreaseNonce", async () => {
//       let response = (await provider.account.getAccountIncreaseNonce(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       )) as GetAccountIncreaseNonceResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.greaterThan(79685);
//     });

//     it("provider.account.getAccountBalance", async () => {
//       let response = (await provider.account.getAccountBalance(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       )) as GetAccountBalanceResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(0);
//     });

//     it("provider.account.getAccountPriv", async () => {
//       let response = (await provider.account.getAccountPriv(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       )) as GetAccountPrivResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("provider.contract.checkContractAccount", async () => {
//       let response = (await provider.contract.checkContractAccount(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       )) as CheckContractAccountResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.equal(true);
//     });

//     it("provider.contract.getContractInfo", async () => {
//       let response = (await provider.contract.getContractInfo(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       )) as GetContractInfoResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.payload).to.equal(
//         '{"params":{},"codeData":{"slogan":"this is config-manager contract"}}',
//       );
//     });

//     it("provider.contract.estimateGas", async () => {
//       let request: TestTransactionRequest = {
//         items: [
//           {
//             transactionJson: {
//               feeLimit: 100000,
//               sourceAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
//               gasPrice: 1,
//               nonce: 173,
//               operations: [
//                 {
//                   type: 1,
//                   sourceAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
//                   createAccount: {
//                     destAddress: "did:bid:efY72a55qY47gj2gSbvjLaLwdC439p4n",
//                     initBalance: 1,
//                     priv: {
//                       masterWeight: 1,
//                       thresholds: {
//                         txThreshold: 1,
//                       },
//                     },
//                   },
//                 },
//               ],
//             },
//             signatureNumber: 1,
//           },
//         ],
//       };

//       let response = (await provider.transaction.estimateGas(
//         request,
//       )) as TestTransactionResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.hash).to.equal(
//         "225a74cca66c4ca2a9ecfa61d2419734c7386c2cf86f90da3dd2a800c085d491",
//       );
//     });

//     it("provider.contract.callContract", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
//         input:
//           '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
//       };
//       let response = (await provider.contract.callContract(
//         request,
//       )) as CallContractResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result?.queryRets[0]?.result).to.equal(
//         '{"code":0,"data":"[0]","desc":"","evmcode":"0000000000000000000000000000000000000000000000000000000000000000","gasused":2767}',
//       );
//     });

//     it("provider.bop.apply", async () => {
//       const request: ApplyRequest = {
//         data: [
//           {
//             bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
//             status: "1",
//           },
//         ],
//       };
//       let response = (await provider.bop.apply(request)) as ApplyResponse;
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("provider.bop.status", async () => {
//       const request: ApplyStatusRequest = {
//         requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
//       };
//       let response: ApplyStatusResponse;
//       response = await provider.bop.status(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("provider.bop.detail", async () => {
//       const request: DetailRequest = {
//         requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
//       };
//       let response: DetailResponse;
//       response = await provider.bop.detail(request);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("provider.bop.discard", async () => {
//       const request: DiscardRequest = {
//         hash: "6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575",
//       };
//       let response: DiscardResponse;
//       response = await provider.bop.discard(request);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.success).to.equal(true);
//       expect(response.result?.count).to.equal(1);
//       expect(response.result?.transactionBases[0]?.hash).to.equal(
//         "6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575",
//       );
//     });

//     it("provider.bop.query", async () => {
//       const request: QueryRequest = {
//         hash: "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
//       };
//       let response: QueryResponse;
//       response = await provider.bop.query(request);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.success).to.equal(true);
//       expect(response.result?.count).to.equal(1);
//       expect(response.result?.totalPage).to.equal(1);
//       expect(response.result?.transactionBases[0]?.hash).to.equal(
//         "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
//       );
//     });

//     it("provider.transaction.getTxPoolSize", async () => {
//       let response: GetTxPoolSizeResponse;
//       response = await provider.transaction.getTxPoolSize();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("provider.transaction.getTransactionHistory none params", async () => {
//       let response: GetTransactionHistoryResponse;
//       response = await provider.transaction.getTransactionHistory();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.totalCount).to.equal(100);
//     });

//     it("provider.transaction.getTransactionHistory with hash", async () => {
//       let response: GetTransactionHistoryResponse;
//       response = await provider.transaction.getTransactionHistory(
//         undefined,
//         undefined,
//         undefined,
//         "b5cef0860f6000cdfb4fa0d2dc95a013632032a49764ade7c1d972a493307315",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.totalCount).to.equal(1);
//       expect(
//         response.result?.transactions[0]?.transaction?.operations[0]?.log
//           ?.datas[0],
//       ).to.equal(
//         "080110641a286469643a6269643a65664765486467643141776d746755424b616333624771726d506f4e6841316b2a5618b1432802324f4661696c656420746f207375626d6974206c61796572322073746174652c206c617965723220736571283836323529206973206e6f7420657175616c206d617820736571283836323529202b20312e",
//       );
//     });

//     it("provider.transaction.getTransactionHistory with hash", async () => {
//       let response: GetTransactionHistoryResponse;
//       response = await provider.transaction.getTransactionHistory(5775638);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.totalCount).to.equal(2);
//     });

//     it("provider.transaction.submitTransaction", async () => {
//       const request: SubmitTransactionParams = {
//         items: [
//           {
//             signatures: [
//               {
//                 publicKey:
//                   "b065665b6fa23dc1c00b17b8d2cd86093c86bbae4c011247310f9160351bd64bc580cc",
//                 signData:
//                   "F62BA0BD3CC98EFBBA20DB540C6660BD4547390625AD4FF6CEB7B216985F6EFB3092E3F9E36299068D668D52CA92ABAD944D28342E0DD4D1ACEE06D700350702",
//               },
//             ],
//             transactionBlob:
//               "0A286469643A6269643A6566433552456946657361427575315558624D4A577645737146526B514B6971103022D605080122D10512C305080112BE053630383036303430353233343830313536313030313035373630303038306664356235303631303133663830363130303230363030303339363030306633303036303830363034303532363030343336313036313030343135373630303033353763303130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303930303436336666666666666666313638303633303331313533633231343631303034363537356236303030383066643562333438303135363130303532353736303030383066643562353036313030356236313030643635363562363034303531383038303630323030313832383130333832353238333831383135313831353236303230303139313530383035313930363032303031393038303833383336303030356238333831313031353631303039623537383038323031353138313834303135323630323038313031393035303631303038303536356235303530353035303930353039303831303139303630316631363830313536313030633835373830383230333830353136303031383336303230303336313031303030613033313931363831353236303230303139313530356235303932353035303530363034303531383039313033393066333562363036303630343038303531393038313031363034303532383036303062383135323630323030313766363836353663366336663230373736663732366336343030303030303030303030303030303030303030303030303030303030303030303030303030303030303831353235303930353039303536303061313635363237613761373233303538323033336431366230663863613362323334646363396233336139623533303063333630313561383838373732633761656565633965353733613537316437346338303032391A041A0208012880C2D72F2A0F63726561746520636F6E747261637430AC87E32F3864",
//           },
//         ],
//       };
//       let response: SubmitTransactionResponse;
//       response = await provider.transaction.submitTransaction(request);
//       console.log(response);
//     });

//     it("provider.transaction.getTxPoolTransactions", async () => {
//       let response: GetTransactionCacheResponse;
//       response = await provider.transaction.getTxPoolTransactions();
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//       expect(response.errorDesc).to.equal(
//         "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
//       );
//     });
//   });
// });
