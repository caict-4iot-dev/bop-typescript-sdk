// import * as abi from "../abi";
// import { expect } from "chai";

// describe("encryption-mnemonics-test", () => {
//   let coder: abi.AbiCoder;
//   beforeEach(() => {
//     coder = new abi.AbiCoder();
//   });

//   afterEach(() => {});

//   describe("abi.AbiCoder", () => {
//     it("abi.AbiCoder encode address", async () => {
//       let encodeStr = coder.encode(
//         ["address", "uint256"],
//         ["did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov", 10],
//       );
//       console.log(encodeStr);
//       expect(encodeStr).to.equal(
//         "0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a",
//       );
//     });

//     it("abi.AbiCoder decode address", async () => {
//       let decodeRes = coder.decode(
//         ["address", "uint256"],
//         "0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a",
//       );
//       expect(decodeRes[0].toString()).to.equal(
//         "did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov",
//       );
//       expect(decodeRes[1].toString()).to.equal("10");
//     });

//     it("abi.AbiCoder encode address array", async () => {
//       let encodeStr = coder.encode(
//         ["address[2]", "uint256"],
//         [
//           [
//             "did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov",
//             "did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov",
//           ],
//           10,
//         ],
//       );
//       expect(encodeStr).to.equal(
//         "0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a",
//       );
//     });

//     it("abi.AbiCoder decode address array", async () => {
//         try {
//             let decodeRes = coder.decode(
//               ["address[2]","uint256"],
//               "0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a",
//             );
//             console.log(decodeRes)
//             expect(decodeRes[0].toString()).to.equal(
//               "did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov,did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov",
//             );
//             expect(decodeRes[1].toString()).to.equal("10");
//         } catch (error) {
//             console.log(error)
//         }
//     });
//   });

//   describe("abi.Interface", () => {
//     it("abi.Interface function test", async () => {
//       //1 使用ABI初始化Interface接口
//       let inter = new abi.Interface(
//         '[{"inputs":[{"internalType":"address","name":"ad","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"old","type":"address"},{"internalType":"uint256","name":"newad","type":"uint256"}],"name":"AA","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]',
//       );
//       //2 调用Interface中getSighash接口
//       expect(inter.getSighash("changeOwner")).to.equal("0xa6f9dae1");
//       //3. 调用Interface中getEventTopic接口
//       expect(inter.getEventTopic("OwnerSet")).to.equal(
//         "0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735",
//       );
//       //4. static getSighash
//       expect(abi.Interface.getSighash(inter.getFunction("getOwner"))).to.equal(
//         "0x893d20e8",
//       );
//       //5. static getEventTopic
//       expect(abi.Interface.getEventTopic(inter.getEvent("OwnerSet"))).to.equal(
//         "0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735",
//       );
//       //6. static getAddress
//       //ed25519
//       expect(
//         abi.Interface.getAddress(
//           "0x65666b7aa1201508db005e986f892d760ff89f999f771ef4",
//         ),
//       ).to.equal("did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF");
//       //sm2
//       expect(
//         abi.Interface.getAddress(
//           "0x7a6624286133aa44ac2a24511a5f88131c3c8b11ed609350",
//         ),
//       ).to.equal("did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67");
//       expect(
//         abi.Interface.getAddress(
//           "7a6624286133aa44ac2a24511a5f88131c3c8b11ed609350",
//         ),
//       ).to.equal("did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67");
//       expect(
//         abi.Interface.getAddress("did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67"),
//       ).to.equal("did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67");
//       expect(abi.Interface.getAddress("xxx")).to.equal("");
//       //7. encodeDeploy 构建合约部署入参
//       expect(
//         inter.encodeDeploy(["did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF"]),
//       ).to.equal(
//         "0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//       );
//       //8. encodeFunctionData 构建合约调用入参
//       expect(
//         inter.encodeFunctionData("changeOwner", [
//           "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//         ]),
//       ).to.equal(
//         "0xa6f9dae1000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//       );
//       //9. decodeFunctionData 解析合约调用入参
//       expect(
//         inter
//           .decodeFunctionData(
//             "changeOwner",
//             "0xa6f9dae1000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//           )[0]
//           .toString(),
//       ).to.equal("did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF");
//       //10. decodeFunctionResult 解析合约调用结果
//       expect(
//         inter
//           .decodeFunctionResult(
//             "getOwner",
//             "0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//           )[0]
//           .toString(),
//       ).to.equal("did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF");
//       //11. encodeFunctionResult 构建合约调用结果
//       expect(
//         inter.encodeFunctionResult("getOwner", [
//           "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//         ]),
//       ).to.equal(
//         "0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//       );
//       //12. encodeEventLog 构建event日志数据
//       expect(
//         JSON.stringify(
//           inter.encodeEventLog("OwnerSet", [
//             "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//             "did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67",
//           ]),
//         ),
//       ).to.equal(
//         '{"data":"0x","topics":["0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735","0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4","0x00000000000000007a6624286133aa44ac2a24511a5f88131c3c8b11ed609350"]}',
//       );
//       //13. decodeEventLog 解析event日志数据
//       expect(
//         inter
//           .decodeEventLog("OwnerSet", "0x", [
//             "0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735",
//             "0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//             "0x00000000000000007a6624286133aa44ac2a24511a5f88131c3c8b11ed609350",
//           ])[0]
//           .toString(),
//       ).to.equal("did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF");
//       expect(
//         inter
//           .decodeEventLog("OwnerSet", "0x", [
//             "0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735",
//             "0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4",
//             "0x00000000000000007a6624286133aa44ac2a24511a5f88131c3c8b11ed609350",
//           ])[1]
//           .toString(),
//       ).to.equal("did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67");
//       //14. parseLog 解析event日志数据
//       const log = inter.parseLog(
//         JSON.parse(
//           '{"data":"0x","topics":["0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735","0x000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4","0x00000000000000007a6624286133aa44ac2a24511a5f88131c3c8b11ed609350"]}',
//         ),
//       );
//       expect(log.name).to.equal("OwnerSet");
//       expect(log.signature).to.equal("OwnerSet(address,address)");
//       expect(log.topic).to.equal(
//         "0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735",
//       );
//       expect(log.args.toString()).to.equal(
//         "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF,did:bid:zfApbyTGrcc3H8f2UoqgPpuZB786QR67",
//       );
//       //15. static isInterface
//       expect(abi.Interface.isInterface(inter)).to.equal(true);
//       expect(abi.Interface.isInterface("xxx")).to.equal(false);
//       //16. encodeErrorResult 构建错误数据
//       expect(
//         inter.encodeErrorResult("AA", [
//           "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF",
//           10,
//         ]),
//       ).to.equal(
//         "0x92aff2a5000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4000000000000000000000000000000000000000000000000000000000000000a",
//       );
//       //17. decodeErrorResult 解析错误数据
//       expect(
//         inter
//           .decodeErrorResult(
//             "AA",
//             "0x92aff2a5000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4000000000000000000000000000000000000000000000000000000000000000a",
//           )[0]
//           .toString(),
//       ).to.equal("did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF");
//       expect(
//         inter
//           .decodeErrorResult(
//             "AA",
//             "0x92aff2a5000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4000000000000000000000000000000000000000000000000000000000000000a",
//           )[1]
//           .toString(),
//       ).to.equal("10");
//       //18. parseError 解析错误数据
//       const error = inter.parseError(
//         "0x92aff2a5000000000000000065666b7aa1201508db005e986f892d760ff89f999f771ef4000000000000000000000000000000000000000000000000000000000000000a",
//       );
//       expect(error.name).to.equal("AA");
//       expect(error.signature).to.equal("AA(address,uint256)");
//       expect(error.sighash).to.equal("0x92aff2a5");
//       expect(error.args.toString()).to.equal(
//         "did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF,10",
//       );
//     });
//   });
// });
