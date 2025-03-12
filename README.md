# bop-typescript-sdk

[bop] sdk to develop with Xinghuo BIF Open Platform

## What

The current package is primarily designed to implement interfaces for the Xinghuo Open Platform. Up to now, it has already realized two major modules, namely, the [Basic Service API] and the [Message Subscription Service]. Through these modules, direct communication with the Xinghuo Open Platform is feasible. In addition, relevant protocol components are handled using Protocol Buffers (protobuf).

## Installation

First, you need to install the sdk by running

```bash
npm install @caict/bop-typescript-sdk
```

And add the following statement to your file:

```js
require("@caict/bop-typescript-sdk");
```

Or, if you are using TypeScript, add this to your file:

```ts
import "@caict/bop-typescript-sdk";
```

## Use example

### https service

```ts
import {
  Config,
  ProviderByBop,
  BopInterface,
  SignerByBop,
} from "@caict/bop-typescript-sdk";

(async () => {
  let config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");
  let provider = new ProviderByBop(new BopInterface(config));
  console.log(await provider.chain.getChainInfo());

  let signer = new SignerByBop("your enc private key");
  let signerWithProvider = signer.connect(provider);
  console.log(await signerWithProvider.getAccount());
})();
```

### ws service

```ts
import {
  WsProviderByBop,
  BopWsInterface,
  WsConfig,
  bopwsprotocol,
} from "@caict/bop-typescript-sdk";

async function main() {
  try {
    // 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
    const config = new WsConfig("ws://bif-mainnet.bitfactory.cn/bif/subscribe"); // 替换为实际的 WebSocket 地址
    const bopWs = new BopWsInterface(config.url, config.heartBeatInterval);

    // 标志位，用于判断 BLOCK_HEADER 回调是否已经发生
    let blockHeaderCallbackTriggered = false;

    const subscriptionBlockHeaderId = await bopWs.bop.subscribe(
      bopwsprotocol.MessageType.BLOCK_HEADER,
      (data) => {
        let message: LedgerHeaderMessage = {};
        message = LedgerHeaderMessage.fromJSON(data);
        console.log("dealBlockHeader ing...", message);

        // 设置标志位为 true，表示回调已经发生
        blockHeaderCallbackTriggered = true;
      },
    );
    console.log("Subscription BlockHeader ID:", subscriptionBlockHeaderId);

    if (subscriptionBlockHeaderId !== "-1") {
      // 等待 BLOCK_HEADER 回调发生
      await new Promise<void>((resolve) => {
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
```
