// import { LedgerByBop } from "../service/ledger";
// import { expect } from "chai";
// import * as sinon from "sinon";
// import { BopInterface, Config } from "../../../bop/bop-base";
// import {
//   LedgerLeaderResponse,
//   LedgerNumberResponse,
//   LedgerResponse,
//   LedgerTxHashesResponse,
//   LedgerValidatorsResponse,
// } from "../../proto/bop-sdk-interface";

// // 使用 Sinon 创建模拟对象
// const sandbox = sinon.createSandbox();
// describe("provider-ledger-test", () => {
//   let ledger: LedgerByBop;

//   let bopInterface: BopInterface;
//   let config: Config;

//   beforeEach(() => {
//     config = new Config(
//       "https://bif-testnet.bitfactory.cn",
//       "LDEDIXHWT2VOISUY1BC6VV1YH9QE4Q62",
//       "HV8YcumAAJpLI+Q7SV7BhpI5AFClArxtBZ9dJZnPCgY=",
//     );
//     bopInterface = new BopInterface(config);

//     ledger = new LedgerByBop(bopInterface);
//   });

//   afterEach(() => {
//     // 重置模拟对象
//     sandbox.restore();
//   });

//   describe("ledger test", () => {
//     it("ledger.getLedgerNumber", async () => {
//       let response: LedgerNumberResponse;
//       response = await ledger.getLedgerNumber();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.result).to.greaterThan(10000);
//     });

//     it("ledger.getLedger - latest", async () => {
//       let response: LedgerResponse;
//       response = await ledger.getLedger();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("ledger.getLedger - 1", async () => {
//       let response: LedgerResponse;
//       response = await ledger.getLedger(1);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("ledger.getLedger - 999999999", async () => {
//       let response: LedgerResponse;
//       response = await ledger.getLedger(999999999);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("ledger.getLedger - seq(-1)", async () => {
//       let response: LedgerResponse;
//       response = await ledger.getLedger(-1);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//       expect(response.errorDesc).to.equal(
//         "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
//       );
//     });

//     it("ledger.getLedger - seq(0)", async () => {
//       let response: LedgerResponse;
//       response = await ledger.getLedger(0);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//       expect(response.errorDesc).to.equal(
//         "The object does not exist, such as not being able to query accounts, TX, blocks, etc",
//       );
//     });

//     it("ledger.getLedgerLeader - seq(5774903)", async () => {
//       let response: LedgerLeaderResponse;
//       response = await ledger.getLedgerLeader(5774903);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result).to.equal(
//         "did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5",
//       );
//     });

//     it("ledger.getLedgerLeader - seq(latest)", async () => {
//       let response: LedgerLeaderResponse;
//       response = await ledger.getLedgerLeader();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("ledger.getLedgerLeader - seq(999999999)", async () => {
//       let response: LedgerLeaderResponse;
//       response = await ledger.getLedgerLeader(999999999);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("ledger.getLedgerValidators - seq(5774903)", async () => {
//       let response: LedgerValidatorsResponse;
//       response = await ledger.getLedgerValidators(5774903);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(JSON.stringify(response.result)).to.equal(
//         '["did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP","did:bid:efperBrbfFJrpRUebqDSmXjoLKoBiuGT","did:bid:ef16mauW9ukBbLqYpbZ8b7bavXTPeGMC","did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5"]',
//       );
//     });

//     it("ledger.getLedgerValidators - seq(latest)", async () => {
//       let response: LedgerValidatorsResponse;
//       response = await ledger.getLedgerValidators();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("ledger.getLedgerValidators - seq(999999999)", async () => {
//       let response: LedgerValidatorsResponse;
//       response = await ledger.getLedgerValidators(999999999);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("ledger.getLedgerTxHashes - seq(5774920)", async () => {
//       let response: LedgerTxHashesResponse;
//       response = await ledger.getLedgerTxHashes(5774920);
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result.length).to.equal(2);
//     });

//     it("ledger.getLedgerTxHashes - seq(-1)", async () => {
//       let response: LedgerTxHashesResponse;
//       response = await ledger.getLedgerTxHashes(-1);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("ledger.getLedgerTxHashes - seq(latest)", async () => {
//       let response: LedgerTxHashesResponse;
//       response = await ledger.getLedgerTxHashes();
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//     });

//     it("ledger.getLedgerTxHashes - seq(999999999)", async () => {
//       let response: LedgerTxHashesResponse;
//       response = await ledger.getLedgerTxHashes(999999999);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });
//   });
// });
