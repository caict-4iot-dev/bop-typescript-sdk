// import { ContractByBop } from "../service/contract";
// import { expect } from "chai";
// import * as sinon from "sinon";
// import { BopInterface, Config } from "../../../bop/bop-base";
// import {
//   CheckContractAccountResponse,
//   GetContractInfoResponse,
//   CallContractRequest,
//   CallContractResponse,
// } from "../../proto/bop-sdk-interface";

// // 使用 Sinon 创建模拟对象
// const sandbox = sinon.createSandbox();
// describe("provider-contract-test", () => {
//   let contract: ContractByBop;

//   let bopInterface: BopInterface;
//   let config: Config;

//   beforeEach(() => {
//     config = new Config(
//       "https://bif-testnet.bitfactory.cn",
//       "LDEDIXHWT2VOISUY1BC6VV1YH9QE4Q62",
//       "HV8YcumAAJpLI+Q7SV7BhpI5AFClArxtBZ9dJZnPCgY=",
//     );
//     bopInterface = new BopInterface(config);

//     contract = new ContractByBop(bopInterface);
//   });

//   afterEach(() => {
//     // 重置模拟对象
//     sandbox.restore();
//   });

//   describe("contract test", () => {
//     it("contract.checkContractAccount account exist and not contract address", async () => {
//       let response: CheckContractAccountResponse;
//       response = await contract.checkContractAccount(
//         "did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result).to.equal(false);
//     });

//     it("contract.checkContractAccount account exist and is contract address", async () => {
//       let response: CheckContractAccountResponse;
//       response = await contract.checkContractAccount(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result).to.equal(true);
//     });

//     it("contract.checkContractAccount account not exist", async () => {
//       let response: CheckContractAccountResponse;
//       response = await contract.checkContractAccount(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.checkContractAccount empty", async () => {
//       let response: CheckContractAccountResponse;
//       response = await contract.checkContractAccount("");
//       console.log(response);
//       expect(response.errorCode).to.equal(-9);
//       expect(response.errorDesc).to.equal(
//         "The account address is a required field",
//       );
//     });

//     it("contract.checkContractAccount invalid address", async () => {
//       let response: CheckContractAccountResponse;
//       response = await contract.checkContractAccount("xxx");
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.getContractInfo is contract address", async () => {
//       let response: GetContractInfoResponse;
//       response = await contract.getContractInfo(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.type).to.equal(2);
//       expect(response.result?.payload).to.equal(
//         '{"params":{},"codeData":{"slogan":"this is config-manager contract"}}',
//       );
//     });

//     it("contract.getContractInfo not contract address", async () => {
//       let response: GetContractInfoResponse;
//       response = await contract.getContractInfo(
//         "did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(11038);
//       expect(response.errorDesc).to.equal("address not contract account");
//     });

//     it("contract.getContractInfo account not exist", async () => {
//       let response: GetContractInfoResponse;
//       response = await contract.getContractInfo(
//         "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk9",
//       );
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.getContractInfo account empty", async () => {
//       let response: GetContractInfoResponse;
//       response = await contract.getContractInfo("");
//       console.log(response);
//       expect(response.errorCode).to.equal(-9);
//     });

//     it("contract.getContractInfo account invalid", async () => {
//       let response: GetContractInfoResponse;
//       response = await contract.getContractInfo("xxx");
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.callContract system", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
//         input: '{"method":"getsuperlist"}',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       console.log(response.result?.queryRets[0].result);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.queryRets[0].result).to.equal(
//         '{"data":{"superList":[["did:bid:efuwxbp8mzDt2MyPxXo4fmyYahQVtyMk","0","did:bid:efuwxbp8mzDt2MyPxXo4fmyYahQVtyMk"],["did:bid:efSspDxRFNe2QpeyYJvr2CMxZ35gVvXb","0","did:bid:efSspDxRFNe2QpeyYJvr2CMxZ35gVvXb"],["did:bid:efUZLM7v2FW72eMUiB3zYUKFrYcPmKQE","0","did:bid:efUZLM7v2FW72eMUiB3zYUKFrYcPmKQE"],["did:bid:efyxHe3UrF1PSSHDDrqVygxf8NYHZVuz","0","did:bid:efyxHe3UrF1PSSHDDrqVygxf8NYHZVuz"],["did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP","0","did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP"],["did:bid:efperBrbfFJrpRUebqDSmXjoLKoBiuGT","0","did:bid:efperBrbfFJrpRUebqDSmXjoLKoBiuGT"],["did:bid:ef16mauW9ukBbLqYpbZ8b7bavXTPeGMC","0","did:bid:ef16mauW9ukBbLqYpbZ8b7bavXTPeGMC"],["did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5","0","did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5"]]}}',
//       );
//     });

//     it("contract.callContract js", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:ef2AAQSLB2YAuWJE8mHdUXncGWRVPkoJT",
//         input:
//           '{"method":"queryBid", "params":"did:bid:ef2AAQSLB2YAuWJE8mHdUXncGWRVPkoJT"}',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       console.log(response.result?.queryRets[0]?.error);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.queryRets[0]?.error).to.equal(
//         '{"data":{"contract":"did:bid:ef2AAQSLB2YAuWJE8mHdUXncGWRVPkoJT","exception":"10706,The bid document is not existed","linenum":1}}',
//       );
//     });

//     it("contract.callContract evm", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
//         input:
//           '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       console.log(response.result?.queryRets[0]?.result);
//       expect(response.errorCode).to.equal(0);
//       expect(response.errorDesc).to.equal("ok");
//       expect(response.result?.queryRets[0]?.result).to.equal(
//         '{"code":0,"data":"[0]","desc":"","evmcode":"0000000000000000000000000000000000000000000000000000000000000000","gasused":2767}',
//       );
//     });

//     it("contract.callContract with account not exist", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzx",
//         input:
//           '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.callContract with account not contract address", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
//         input:
//           '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"}',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.callContract with empty input", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(-9);
//     });

//     it("contract.callContract with account empty", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "",
//         input:
//           '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"}',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(-9);
//     });

//     it("contract.callContract with invalid account address", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "xxx",
//         input:
//           '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"}',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(4);
//     });

//     it("contract.callContract with sourceAddress equal contractAddress", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
//         sourceAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
//         input: '{"method":"getsuperlist"}',
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       console.log(response.result?.queryRets[0].result);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("contract.callContract gasPrice negative", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
//         input: '{"method":"getsuperlist"}',
//         gasPrice: -1,
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       console.log(response.result?.queryRets[0].result);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("contract.callContract gasPrice decimal", async () => {
//       let request: CallContractRequest = {
//         contractAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
//         input: '{"method":"getsuperlist"}',
//         gasPrice: 1.6,
//       };
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       console.log(response.result?.queryRets[0].result);
//       expect(response.errorCode).to.equal(0);
//     });

//     it("contract.callContract null request", async () => {
//       let request: CallContractRequest = {};
//       let response: CallContractResponse;
//       response = await contract.callContract(request);
//       console.log(response);
//       expect(response.errorCode).to.equal(-9);
//     });
//   });
// });
