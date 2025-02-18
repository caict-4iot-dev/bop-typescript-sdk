# bif-bop-sdk

[bop] sdk to develop with Xinghuo BIF Open Platform

## What

The current package is primarily designed to implement interfaces for the Xinghuo Open Platform. Up to now, it has already realized two major modules, namely, the [Basic Service API] and the [Message Subscription Service]. Through these modules, direct communication with the Xinghuo Open Platform is feasible. In addition, relevant protocol components are handled using Protocol Buffers (protobuf).

## Installation

First, you need to install the sdk by running

```bash
npm install @bifproject/bif-bop-sdk
```

And add the following statement to your file:

```js
require("@bifproject/bif-bop-sdk");
```

Or, if you are using TypeScript, add this to your file:

```ts
import "@bifproject/bif-bop-sdk";
```

## Use example

### https service

```ts
import {
  Config,
  ProviderByBop,
  BopInterface,
  SignerByBop,
} from "@bifproject/bif-bop-sdk";

(async () => {
  let config = new Config(
    "https://bif-testnet.bitfactory.cn",
    "LDEDIXHWT2VOISUY1BC6VV1YH9QE4Q62",
    "HV8YcumAAJpLI+Q7SV7BhpI5AFClArxtBZ9dJZnPCgY=",
  );
  let provider = new ProviderByBop(new BopInterface(config));
  console.log(await provider.chain.getChainInfo());

  let signer = new SignerByBop(
    "priSrroXTmScmv9EmCcZMGKp155u5zxp6vxFvRRjVXZdATiS7a",
  );
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
} from "@bifproject/bif-bop-sdk";

async function main() {
  try {
    // 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
    const config = new WsConfig(
      "https://bif-testnet.bitfactory.cn/bif/subscribe",
    ); // 替换为实际的 WebSocket 地址
    const bopWs = new BopWsInterface(config.url, config.heartBeatInterval);

    // 标志位，用于判断 BLOCK_HEADER 回调是否已经发生
    let blockHeaderCallbackTriggered = false;

    const subscriptionBlockHeaderId = await bopWs.subscribe(
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
      await bopWs.unsubscribe(
        bopwsprotocol.MessageType.BLOCK_HEADER,
        subscriptionBlockHeaderId,
      );
      console.log("Unsubscribed from BLOCK_HEADER");
    }

    // 断开连接
    await bopWs.disconnect();
    console.log("Disconnected from WebSocket");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// 调用 main 函数
main();
```
