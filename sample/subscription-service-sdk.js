// 引入所需的模块
import { WsConfig, WsProviderByBop, bopwsprotocol } from "@caict/bif-bop-sdk";

//订阅区块头
async function blockHeader() {
  try {
    const subscriptionBlockHeaderId = await bopWs.subscribe(
      bopwsprotocol.MessageType.BLOCK_HEADER,
      (data) => {
        let message = bopwsprotocol.LedgerHeaderMessage.fromJSON(data);
        console.log("dealBlockHeader ing...", message);
      },
    );
    console.log("Subscription BlockHeader ID:", subscriptionBlockHeaderId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//订阅指定bid交易
async function bidTransaction() {
  try {
    const subscriptionBidTransactionId = await bopWs.subscribe(
      bopwsprotocol.MessageType.BID_TRANSACTION,
      (data) => {
        let val = bopwsprotocol.TransactionEnvStoreMessage.fromJSON(data);
        console.log("dealtransaction ing...", val);
      },
      ["did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK"],
    );

    console.log("Subscription transaction ID:", subscriptionBidTransactionId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//订阅指定bid的丢弃交易
async function discardTransaction() {
  try {
    const subscriptionDiscardTransactionId = await bopWs.subscribe(
      bopwsprotocol.MessageType.DISCARD_TRANSACTION,
      (data) => {
        let val = bopwsprotocol.DropTxMessage.fromJSON(data);
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

//订阅指定bid的日志
async function tlogTransaction() {
  try {
    const subscriptionTlogTransactionId = await bopWs.subscribe(
      bopwsprotocol.MessageType.TLOG,
      (data) => {
        let val = bopwsprotocol.TransactionEnvStoreMessage.fromJSON(data);
        console.log("deal tlogTransaction ing...", val);
      },
      ["did:bid:efhj9cgStGJckhLwHZefYS9Yje38NVuP"],
    );
    console.log("Subscription transaction ID:", subscriptionTlogTransactionId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// 定义 main 异步函数，完整订阅调用示例，以block_header为例
async function main() {
  try {
    // 创建 WsConfig 实例
    const config = new WsConfig(
      "ws://international-mainnet.bitfactory.cn/bif/subscribe",
    );

    // 创建 WsProviderByBop 实例
    const bopWs = new WsProviderByBop(config);

    // 标志位，用于判断 BLOCK_HEADER 回调是否已经发生
    let blockHeaderCallbackTriggered = false;

    // 订阅 BLOCK_HEADER 消息类型
    const subscriptionBlockHeaderId = await bopWs.bop.subscribe(
      bopwsprotocol.MessageType.BLOCK_HEADER,
      (data) => {
        // 将接收到的数据转换为 LedgerHeaderMessage 实例
        let message = bopwsprotocol.LedgerHeaderMessage.fromJSON(data);
        console.log("dealBlockHeader ing...", message);

        // 设置标志位为 true，表示回调已经发生
        blockHeaderCallbackTriggered = true;
      },
    );

    console.log("Subscription BlockHeader ID:", subscriptionBlockHeaderId);

    if (subscriptionBlockHeaderId !== "-1") {
      // 等待 BLOCK_HEADER 回调发生
      await new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (blockHeaderCallbackTriggered) {
            clearInterval(intervalId);
            resolve();
          }
        }, 100); // 每 100 毫秒检查一次标志位
      });

      // 取消订阅
      await bopWs.bop.unsubscribe(
        bopwsprotocol.MessageType.BLOCK_HEADER,
        subscriptionBlockHeaderId,
      );
      console.log("Unsubscribed from BLOCK_HEADER");
    }

    // 断开连接
    await bopWs.bop.disconnect();
    console.log("Disconnected from WebSocket");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// 调用 main 函数
main();
