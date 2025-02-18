import { WsConfig } from "..";
import { BopWsInterface } from "..";
import {
  DropTxMessage,
  LedgerHeaderMessage,
  TransactionEnvStoreMessage,
  MessageType,
} from "../../bop-proto/bop-ws";

const config = new WsConfig("https://bif-testnet.bitfactory.cn/bif/subscribe");
const bopWs = new BopWsInterface(config.url, config.heartBeatInterval);

async function blockHeader() {
  try {
    const subscriptionBlockHeaderId = await bopWs.subscribe(
      MessageType.BLOCK_HEADER,
      (data) => {
        let message: LedgerHeaderMessage = {};
        message = LedgerHeaderMessage.fromJSON(data);
        console.log("dealBlockHeader ing...", message);
      },
    );
    console.log("Subscription BlockHeader ID:", subscriptionBlockHeaderId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function bidTransaction() {
  try {
    const subscriptionBidTransactionId = await bopWs.subscribe(
      MessageType.BID_TRANSACTION,
      (data) => {
        let val = TransactionEnvStoreMessage.fromJSON(data);
        console.log("dealtransaction ing...", val);
      },
      ["did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK"],
    );

    console.log("Subscription transaction ID:", subscriptionBidTransactionId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function discardTransaction() {
  try {
    const subscriptionDiscardTransactionId = await bopWs.subscribe(
      MessageType.DISCARD_TRANSACTION,
      (data) => {
        let val = DropTxMessage.fromJSON(data);
        console.log("deal discardTransaction ing...", val);
      },
      ["did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK"],
    );
    console.log(
      "Subscription transaction ID:",
      subscriptionDiscardTransactionId,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function tlogTransaction() {
  try {
    const subscriptionTlogTransactionId = await bopWs.subscribe(
      MessageType.TLOG,
      (data) => {
        let val = TransactionEnvStoreMessage.fromJSON(data);
        console.log("deal tlogTransaction ing...", val);
      },
      ["did:bid:efhj9cgStGJckhLwHZefYS9Yje38NVuP"],
    );
    console.log("Subscription transaction ID:", subscriptionTlogTransactionId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function errorBidCheck() {
  try {
    const subscriptionTlogTransactionId = await bopWs.subscribe(
      MessageType.TLOG,
      (data) => {
        let val = TransactionEnvStoreMessage.fromJSON(data);
        console.log("deal tlogTransaction ing...", val);
      },
      ["xxx"],
    );

    if (subscriptionTlogTransactionId === "-1") {
      console.log("subscription bid address error");
      await bopWs.disconnect();
    } else {
      console.log(
        "Subscription transaction ID:",
        subscriptionTlogTransactionId,
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// 调用 main 函数
errorBidCheck();
