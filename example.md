# 星火开放平台JS-SDK接口文档

# 一 signer

作为账户在SDK中的实体，用于离线交易签名并发送交易等操作。signer构建时，需将星火私钥作为参数传入，示例如下。

```javascript
//调用代码
import { SignerByBop } from "@caict/bop-typescript-sdk";

//当星火私钥存在异常时，SignerByBop构建失败，注意捕获异常
try {
  const signer = new SignerByBop("your encprivate key");
} catch (error) {
  console.log("please check your privateKey");
}
```

### 1.1 获取当前账户地址

```
signer.getAddress()
```

#### 请求参数

无

#### 响应参数

| 类型   | 类型                           |
| ------ | ------------------------------ |
| string | 当前Signer中私钥对应的星火地址 |

#### 示例代码

```javascript
//调用代码
import { SignerByBop } from "@caict/bop-typescript-sdk";

const signer = new SignerByBop("your encprivate key");
const address = signer.getAddress();
console.log(address);
```

### 1.2 连接provider获取signer实例

```
signer.connect(provider: Provider)
```

#### 请求参数

| 参数     | 类型     | 是否必填 | 备注                                         |
| -------- | -------- | -------- | -------------------------------------------- |
| provider | Provider | 是       | Provider类对象实例，管理与外部数据源交互接口 |

#### 响应参数

| 类型   | 备注                               |
| ------ | ---------------------------------- |
| Signer | Signer类对象实例，管理账户相关接口 |

#### 示例代码

```javascript
//调用代码
import {
  SignerByBop,
  Config,
  ProviderByBop,
  BopInterface,
} from "@caict/bop-typescript-sdk";
const apiKey = "xxx";
const apiSecret = "xxx";

const config = new Config(
  "https://bif-mainnet.bitfactory.cn",
  apiKey,
  apiSecret,
);
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");

const signerWithProvider = signer.connect(provider);
```

###

### 1.3 对交易请求数据进行签名

```
signer.signTransaction(message : string)
```

#### 请求参数

| 参数    | 类型   | 是否必填 | 备注                        |
| ------- | ------ | -------- | --------------------------- |
| message | string | 是       | 待签名数据，必须为hex字符串 |

#### 响应参数

| 类型      | 类型                       | 备注             |
| --------- | -------------------------- | ---------------- |
| errorCode | SdkStatusCode              | 接口调用错误码   |
| errorDesc | string                     | 接口调用描述信息 |
| result    | Signature 详见通用数据结构 | 签名数组         |

#### 示例代码

```javascript
//调用代码
import { SignerByBop } from '@caict/bop-typescript-sdk';

const signer = new SignerByBop("your encprivate key");
const address = signer.signTransaction(”0x010203“);
console.log(address);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
  publicKey: 'b07a66048d0283b897f59fd60db0410644e78eb38fd85e57f3e681a780ec807641e9dda4bed60055fc013d7362ba2e1654a5fac1b2b6d240dcc029dd146ed6d40daf9490',
  signData: 'c1eb1025ebddc5bc2d307682357614258172e75ce1571b2f0f8c907889d2253a7c4341079ff7d1e1f84f6e3279b6b7aaafcb847a07274624e7c4e26d1f19406d'
}
}
```

### 1.4 获取当前账户余额

```
signer.getBalance()
```

#### 请求参数

无（必须保证signer已完成provider连接，即完成1.2操作）

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | number        | 当前账户余额     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");

const signerWithProvider = signer.connect(provider);
const balance = await signerWithProvider.getBalance();
console.log(balance);
//响应代码
{ errorCode: 0, errorDesc: 'ok', result: 11000000000 }
```

### 1.5 获取当前账户递增nonce值

```
signer.getIncreaseNonce()
```

#### 请求参数

无（必须保证signer已完成provider连接，即完成1.2操作）

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | number        | 当前账户nonce值  |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");

const signerWithProvider = signer.connect(provider);
const nonce = await signerWithProvider.getIncreaseNonce();
console.log(nonce);
//响应代码
{ errorCode: 0, errorDesc: 'ok', result: 0 }
```

### 1.6 查询合约结果

```
signer.callContract(contractAddress: string, input: string)
```

#### 请求参数

（必须保证signer已完成provider连接，即完成1.2操作）

| 参数            | 类型   | 是否必填 | 备注         |
| --------------- | ------ | -------- | ------------ |
| contractAddress | string | 是       | 合约地址     |
| input           | string | 是       | 合约调用数据 |

#### 响应参数

| 类型                       | 类型          | 备注             |
| -------------------------- | ------------- | ---------------- |
| errorCode                  | SdkStatusCode | 接口调用错误码   |
| errorDesc                  | string        | 接口调用描述信息 |
| result.queryRets           | array         | 调用返回信息     |
| result.queryRets[0].error  | object        | 错误描述         |
| result.queryRets[0].result | object        | 合约返回结果数据 |

##### result格式说明

Evm 合约

```
"result":{
 "code":0,
 "data":"[abc]",
 "desc": "",
 "eumcode": "",
 "gasused":9985
}
```

JS合约

```
"result": {
        "type": "string",//还包括bool类型
        "value":"publicKeyHex:b0656666283ff5db4f08b3e2e0e46ed270d0e17d72c89e26ace7f91d9930f20ff4dfdf"
}
```

系统合约

```
"result": {
        "data": [ //data为Json对象或Json数组对象，内容由合约自定义
                   {
                      "domainId": 0,
                      "status": true
                    }
                ]
}

"result": {
       "data": {  //data为Json对象或Json数组对象，内容由合约自定义
                  "nodeInfo": {}
               }
}
```

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");

const signerWithProvider = signer.connect(provider);
const response = await signerWithProvider.callContract("did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",'{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',);
console.log(response);
{
  result: { queryRets: [ {
  error: '{}',
  result: '{"code":0,"data":"[0]","desc":"","evmcode":"0000000000000000000000000000000000000000000000000000000000000000","gasused":2767}'
} ] },
  errorCode: 0,
  errorDesc: 'ok'
}
```

### 1.7 查询账户信息

```
signer.getAccount(address ?: string)
```

#### 请求参数

（必须保证signer已完成provider连接，即完成1.2操作）

| 参数    | 类型   | 是否必填 | 备注                                                     |
| ------- | ------ | -------- | -------------------------------------------------------- |
| address | string | 否       | 待查询账户地址（如未定义，则查询signer绑定私钥对应地址） |

#### 响应参数

| 类型                 | 类型          | 备注                              |
| -------------------- | ------------- | --------------------------------- |
| errorCode            | SdkStatusCode | 接口调用错误码                    |
| errorDesc            | string        | 接口调用描述信息                  |
| result.address       | string        | 账户地址                          |
| result.balance       | number        | 账户余额                          |
| result.nonce         | number        | 账户nonce                         |
| result.authTransfer  | bool          | 可信转账                          |
| result.metadatasHash | string        | metadata hash                     |
| result.contract      | object        | Contract 详见通用结构定义         |
| result.priv          | object        | AccountPrivilege 详见通用结构定义 |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");

const signerWithProvider = signer.connect(provider);
const response = await signerWithProvider.getAccount();
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: {
    address: 'did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK',
    balance: 11000000000,
    nonce: 0,
    authTransfer: false,
    metadatasHash: 'ad67d57ae19de8068dbcd47282146bd553fe9f684c57c8c114453863ee41abc3',
    contract: { type: -1, payload: undefined },
    priv: { masterWeight: 1, signers: [], thresholds: [Object] }
  }
}
```

### 1.8 查询区块高度信息

```
signer.getLedgerNumber()
```

#### 请求参数

无（必须保证signer已完成provider连接，即完成1.2操作）

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | number        | 区块链账本高度   |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");

const signerWithProvider = signer.connect(provider);
const response = await signerWithProvider.getLedgerNumber();
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: 5793626 }
```

# 二 provider

provider作为SDK数据提供源，直接对外提供操作接口。provider构建时，需指定开放平台相关信息数据，示例如下：

```javascript
//调用代码
import { ProviderByBop, BopInterface } from "@caict/bop-typescript-sdk";

const config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");
const provider = new ProviderByBop(new BopInterface(config));
```

### 2.1 链相关接口

#### 2.1.1 获取链基本信息

```
provider.chain.getChainInfo()
```

##### 请求参数

无

##### 响应参数

| 类型                  | 类型          | 备注                                     |
| --------------------- | ------------- | ---------------------------------------- |
| errorCode             | SdkStatusCode | 接口调用错误码                           |
| errorDesc             | string        | 接口调用描述信息                         |
| result.licenseVersion | string        | 许可版本                                 |
| result.websocketPort  | number        | 链websocket端口信息                      |
| result.chainVersion   | string        | 链版本                                   |
| result.currentTime    | string        | 当前时间                                 |
| result.hashType       | number        | 区块链使用摘要算法：【0：sha256; 1:sm3】 |
| result.ledgerVersion  | string        | 账本版本                                 |
| result.networkId      | string        | 网络ID                                   |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.chain.getChainInfo();
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: {
    licenseVersion: '1.1.0',
    websocketPort: 7053,
    chainVersion: '1.9.9',
    currentTime: '2025-01-21 11:24:23.125130',
    hashType: '0',
    ledgerVersion: '1011',
    networkId: '16234539267878'
  }
}
```

#### 2.1.2 获取区块链networkid

```
provider.chain.getNetworkId()
```

##### 请求参数

无

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 网络ID           |

##### 示例代码

```javascript
//调用代码
import { Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.chain.getNetworkId();
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: '16234539267878' }
```

### 2.2 账本相关接口

#### 2.2.1 获取指定高度区块头信息

```
provider.ledger.getLedger(seq ?: number)
```

##### 请求参数

| 参数 | 类型   | 是否必填 | 备注                                         |
| ---- | ------ | -------- | -------------------------------------------- |
| seq  | number | 否       | 区块高度，如不填写，默认按照当前最新高度查询 |

##### 响应参数

| 类型                      | 类型          | 备注                                     |
| ------------------------- | ------------- | ---------------------------------------- |
| errorCode                 | SdkStatusCode | 接口调用错误码                           |
| errorDesc                 | string        | 接口调用描述信息                         |
| result.seq                | number        | 区块高度                                 |
| result.hash               | string        | 当前区块hash                             |
| result.previousHash       | string        | 前一个区块hash                           |
| result.accountTreeHash    | string        | 当前区块中包含交易涉及到的账户增量树hash |
| result.closeTime          | number        | 当前区块生成时间                         |
| result.consensusValueHash | string        | 当前区块共识结构hash                     |
| result.version            | number        | 当前区块版本                             |
| result.txCount            | number        | 截止当前区块，当前链上所有交易数         |
| result.validatorsHash     | string        | 当前区块验证者列表hash                   |
| result.feesHash           | string        | 当前区块费率配置hash                     |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.ledger.getLedger();
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: {
    seq: 5793921,
    hash: '6cb473833fb2eff7af78fc3d31d37c9647f8ea633440c65f8ec23f33a701cbba',
    previousHash: 'c931249d40e83573cd845340774fe8003a2f69dbb913c0dbbb0cfe94dd2c7079',
    accountTreeHash: '40f7ee239da32f597684b7aa503304650091a0a7dcb847bd70b7fa155c44bef1',
    closeTime: 1737438174201126,
    consensusValueHash: 'e2a9bcd65f4be5552af0884bb76eb14339999a5220d7384c89f5114ae03bc668',
    version: 1011,
    txCount: 9032160,
    validatorsHash: 'b8ebfb79b0aed24cd9122c4545c88b8f9c7c6c7b01d1f0f55f2d3c036064eefd',
    feesHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  }
}
```

#### 2.2.2 获取区块链最新区块高度

```
provider.ledger.getLedgerNumber()
```

##### 请求参数

无

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | number        | 区块高度         |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.ledger.getLedgerNumber();
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: 5793921 }
```

#### 2.2.3 获取指定高度区块leader

```
provider.ledger.getLedgerLeader(seq?:number)
```

##### 请求参数

| 参数 | 类型   | 是否必填 | 备注                                         |
| ---- | ------ | -------- | -------------------------------------------- |
| seq  | number | 否       | 区块高度，如不填写，默认按照当前最新高度查询 |

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 出块节点地址     |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.ledger.getLedgerLeader();
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: 'did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5'
}
```

#### 2.2.4 获取指定高度区块验证者列表

```
provider.ledger.getLedgerValidators(seq?:number)
```

##### 请求参数

| 参数 | 类型   | 是否必填 | 备注                                         |
| ---- | ------ | -------- | -------------------------------------------- |
| seq  | number | 否       | 区块高度，如不填写，默认按照当前最新高度查询 |

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | array         | 出块节点地址列表 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.ledger.getLedgerValidators();
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: [
    'did:bid:efuDacbAeXdwBENVkPCYNQQVE7KvYVkP',
    'did:bid:efperBrbfFJrpRUebqDSmXjoLKoBiuGT',
    'did:bid:ef16mauW9ukBbLqYpbZ8b7bavXTPeGMC',
    'did:bid:efk8iXFgo533n7waZAym6WVeZNPKKyX5'
  ]
}
```

#### 2.2.5 获取指定高度区块下交易hash列表

```
provider.ledger.getLedgerTxHashes(seq?:number)
```

##### 请求参数

| 参数 | 类型   | 是否必填 | 备注                                                                |
| ---- | ------ | -------- | ------------------------------------------------------------------- |
| seq  | number | 否       | 区块高度，如不填写，默认按照当前最新高度查询(最大返回100条交易hash) |

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | array         | 出块节点地址列表 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.ledger.getLedgerTxHashes();
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: [
    '2bb39b83f884fc38216f62773fe5154cba4803e8241712d8ff895edddf823221',
    '9758556be37b4ee51ed8144e415060e06dd92bd534adee0e06545b69f5a066b8'
  ]
}
```

### 2.3 账户相关接口

#### 2.3.1 获取指定账户地址的账户数据

```
provider.account.getAccount(address:string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |

##### 响应参数

| 类型                 | 类型          | 备注                              |
| -------------------- | ------------- | --------------------------------- |
| errorCode            | SdkStatusCode | 接口调用错误码                    |
| errorDesc            | string        | 接口调用描述信息                  |
| result.address       | string        | 账户地址                          |
| result.balance       | number        | 账户余额                          |
| result.nonce         | number        | 账户nonce                         |
| result.authTransfer  | bool          | 可信转账                          |
| result.metadatasHash | string        | metadata hash                     |
| result.contract      | object        | Contract 详见通用结构定义         |
| result.priv          | object        | AccountPrivilege 详见通用结构定义 |

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.account.getAccount("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: {
    address: 'did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8',
    balance: 0,
    nonce: 89691,
    authTransfer: false,
    metadatasHash: '1fea94960dab90a2c23f8a8ce9dda04d1068dad89fe1ce887cfa45d0e8e83b44',
    contract: {
      type: 2,
      payload: '{"params":{},"codeData":{"slogan":"this is config-manager contract"}}'
    },
    priv: { masterWeight: 0, signers: [], thresholds: [Object] }
  }
}
```

#### 2.3.2 获取指定账户及高度下的metadata信息

```
provider.account.getAccountMetadata(address: string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |
| seq     | number | 否       | 区块高度 |
| key     | string | 否       | key      |

##### 响应参数

| 类型      | 类型           | 备注                     |
| --------- | -------------- | ------------------------ |
| errorCode | SdkStatusCode  | 接口调用错误码           |
| errorDesc | string         | 接口调用描述信息         |
| result    | array<KeyPair> | keypair 详见通用结构定义 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.account.getAccountMetadata("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: [
    {
      key: 'layer_1_agent_did:bid:effvm1wrsYv4NHtyjvMGcPg1CWX9TW2a',
      value: '{"l1_agent_bid":"did:bid:effvm1wrsYv4NHtyjvMGcPg1CWX9TW2a","l2_agent_bid":"did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k","l2_agent_freezed":false,"l2_agent_id":100,"l2_agent_period":201600,"l2_agent_public_key":"b06566fd3041f2b30e13d5b19b333909918c62ccfbece6f861d5884e584250db703eab","l2_agent_status":true}',
      version: 1
    },
    {
      key: 'layer_2_agent_did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k',
      value: '{"l1_agent_bid":"did:bid:effvm1wrsYv4NHtyjvMGcPg1CWX9TW2a","l2_agent_bid":"did:bid:efGeHdgd1AwmtgUBKac3bGqrmPoNhA1k","l2_agent_freezed":false,"l2_agent_id":100,"l2_agent_period":201600,"l2_agent_public_key":"b06566fd3041f2b30e13d5b19b333909918c62ccfbece6f861d5884e584250db703eab","l2_agent_status":true}',
      version: 1
    }
  ]
}
```

#### 2.3.3 获取指定账户下递增nonce值

```
provider.account.getAccountIncreaseNonce(address: string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | number        | nonce值          |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.account.getAccountIncreaseNonce("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: 89701 }
```

#### 2.3.4 获取指定账户balance值

```
provider.account.getAccountBalance(address:string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |

##### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | number        | 账户balance      |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.account.getAccountBalance("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: 0 }
```

#### 2.3.5 获取指定账户的priv权限信息

```
provider.account.getAccountPriv(address : string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |

##### 响应参数

| 类型      | 类型          | 备注                              |
| --------- | ------------- | --------------------------------- |
| errorCode | SdkStatusCode | 接口调用错误码                    |
| errorDesc | string        | 接口调用描述信息                  |
| result    | object        | AccountPrivilege 详见通用结构定义 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.account.getAccountPriv("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: {
    masterWeight: 0,
    signers: [],
    thresholds: { txThreshold: 1, typeThresholds: [] }
  }
}
```

### 2.4 交易相关接口

#### 2.4.1 获取链上交易缓存池交易数量

```
provider.transaction.getTxPoolSize()
```

##### 请求参数

无

##### 响应参数

| 类型      | 类型          | 备注               |
| --------- | ------------- | ------------------ |
| errorCode | SdkStatusCode | 接口调用错误码     |
| errorDesc | string        | 接口调用描述信息   |
| result    | number        | 链上交易池交易数量 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.transaction.getTxPoolSize();
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: 0 }
```

#### 2.4.2 获取链上交易缓存池交易列表

```
provider.transaction.getTxPoolTransactions(limit?:number, address?:string, hash?:string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注                                               |
| ------- | ------ | -------- | -------------------------------------------------- |
| limit   | number | 否       | 默认100，最小1，最大1000，结果中最多返回的交易数量 |
| hash    | string | 否       | 交易哈希，不填时默认返回交易池内所有交易           |
| address | string | 否       | 交易源账户地址                                     |

##### 响应参数

| 类型                                                           | 类型             | 备注                                                                                                                         |
| -------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| errorCode                                                      | SdkStatusCode    | 接口调用错误码                                                                                                               |
| errorDesc                                                      | string           | 接口调用描述信息                                                                                                             |
| result.totalCount                                              | number           | 交易条数                                                                                                                     |
| result.transactions                                            | array            |                                                                                                                              |
| result.transactions[x].status                                  | string           | 状态                                                                                                                         |
| result.transactions[x].incomingTime                            | string           | 交易进入交易池时间                                                                                                           |
| result.transactions[x].hash                                    | string           | 交易hash                                                                                                                     |
| result.transactions[x].signatures                              | array<Signature> | 交易签名 Signature结构详见 通用结构定义                                                                                      |
| result.transactions[x].transaction                             | object           |                                                                                                                              |
| result.transactions[x].transaction.sourceAddress               | string           | 交易源账户地址                                                                                                               |
| result.transactions[x].transaction.feeLimit                    | number           | feeLimit                                                                                                                     |
| result.transactions[x].transaction.gasPrice                    | number           | gasPrice                                                                                                                     |
| result.transactions[x].transaction.nonce                       | number           | nonce                                                                                                                        |
| result.transactions[x].transaction.metadata                    | string           | metadata                                                                                                                     |
| result.transactions[x].transaction.nonceType                   | number           | 0：递增nonce; 1:随机nonce                                                                                                    |
| result.transactions[x].transaction.maxLedgerSeq                | number           | 交易最大处理区块高度，与随机Nonce一起使用                                                                                    |
| result.transactions[x].transaction.operations                  | array            |                                                                                                                              |
| result.transactions[x].transaction.operations[x].type          | number           | 交易类型(交易池仅可能出现以下类型)：<br />1：create_account<br />4：set_metadata<br />7：pay_coin<br />9：set_privilege<br / |
| result.transactions[x].transaction.operations[x].sourceAddress | string           | 当前操作源账户地址                                                                                                           |
| result.transactions[x].transaction.operations[x].metadata      | string           | 当前操作metadata                                                                                                             |
| result.transactions[x].transaction.operations[x].createAccount | object           | OperationCreateAccount 详见通用结构定义                                                                                      |
| result.transactions[x].transaction.operations[x].setMetadata   | object           | OperationSetMetadata 详见通用结构定义                                                                                        |
| result.transactions[x].transaction.operations[x].payCoin       | object           | OperationPayCoin 详见通用结构定义                                                                                            |
| result.transactions[x].transaction.operations[x].setPrivilege  | object           | OperationSetPriviledge 详见通用结构定义                                                                                      |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.transaction.getTxPoolTransactions();
console.log(response);
//响应数据 - 交易池无交易
{
  errorCode: 4,
  errorDesc: 'The object does not exist, such as not being able to query accounts, TX, blocks, etc'
}
```

#### 2.4.3 获取历史交易信息

```
provider.transaction.getTransactionHistory(seq?:number, start?:number, limit?:number, hash?:string)
```

##### 请求参数

| 参数  | 类型   | 是否必填 | 备注                                 |
| ----- | ------ | -------- | ------------------------------------ |
| seq   | number | 否       | 区块高度，不填时默认使用最新区块高度 |
| start | number | 否       | 起始条数，默认0                      |
| limit | number | 否       | 查询记录数，默认10                   |
| hash  | string | 否       | 交易hash                             |

##### 响应参数

| 类型                                                | 类型             | 备注                                                                                                                                                                                                                                                  |
| --------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| errorCode                                           | SdkStatusCode    | 接口调用错误码                                                                                                                                                                                                                                        |
| errorDesc                                           | string           | 接口调用描述信息                                                                                                                                                                                                                                      |
| result.totalCount                                   | number           | 交易条数                                                                                                                                                                                                                                              |
| result.transactions                                 | array            |                                                                                                                                                                                                                                                       |
| result.transactions[x].hash                         | string           | 交易hash                                                                                                                                                                                                                                              |
| result.transactions[x].actualFee                    | number           | 交易费用                                                                                                                                                                                                                                              |
| result.transactions[x].closeTime                    | number           | 交易执行时间                                                                                                                                                                                                                                          |
| result.transactions[x].contractTxHashes             | array<string>    | 当前交易触发交易列表                                                                                                                                                                                                                                  |
| result.transactions[x].errorCode                    | SdkStatusCode    | 交易处理错误码                                                                                                                                                                                                                                        |
| result.transactions[x].errorDesc                    | string           | 交易处理错误描述信息                                                                                                                                                                                                                                  |
| result.transactions[x].ledgerSeq                    | number           | 交易处理区块高度                                                                                                                                                                                                                                      |
| result.transactions[x].signatures                   | array<Signature> | Signature详见通用结构定义                                                                                                                                                                                                                             |
| result.transactions[x].txSize                       | number           | 交易大小                                                                                                                                                                                                                                              |
| result.transactions[x].blob                         | string           | 交易序列化hex字符串                                                                                                                                                                                                                                   |
| result.transactions[x].transaction                  | object           |                                                                                                                                                                                                                                                       |
| result.transactions[x].transaction[x].sourceAddress | string           | 交易源账户地址                                                                                                                                                                                                                                        |
| result.transactions[x].transaction[x].feeLimit      | number           | feeLimit                                                                                                                                                                                                                                              |
| result.transactions[x].transaction[x].gasPrice      | number           | gasPrice                                                                                                                                                                                                                                              |
| result.transactions[x].transaction[x].nonce         | number           |                                                                                                                                                                                                                                                       |
| result.transactions[x].transaction[x].metadata      | string           |                                                                                                                                                                                                                                                       |
| result.transactions[x].transaction[x].nonceType     | number           |                                                                                                                                                                                                                                                       |
| result.transactions[x].transaction[x].maxLedgerSeq  | number           |                                                                                                                                                                                                                                                       |
| result.transactions[x].transaction[x].operations    | array            | 具体Operation结构详见通用结构定义：<br />OperationCreateAccount<br />OperationPayCoin<br />OperationSetMetadata<br />OperationSetPriviledger<br />OperationUpgradeContract<br />OperationSetSignerWeight<br />OperationSetThreshold<br />OperationLog |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.transaction.getTransactionHistory(undefined, undefined, undefined, "b5cef0860f6000cdfb4fa0d2dc95a013632032a49764ade7c1d972a493307315",);
console.log(response);
//响应数据
{
	errorCode: 0,
	errorDesc: 'ok',
	result: {
		totalCount: 1,
		transactions: [{
				hash: 'b5cef0860f6000cdfb4fa0d2dc95a013632032a49764ade7c1d972a493307315',
				actualFee: 0,
				closeTime: 1736850378824454,
				contractTxHashes: [],
				errorCode: 0,
				errorDesc: '',
				ledgerSeq: 5775638,
				signatures: [],
				transaction: {
					sourceAddress: 'did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8',
					feeLimit: 0,
					gasPrice: 0,
					nonce: 79902,
					metadata: '',
					nonceType: 0,
					maxLedgerSeq: 0,
					operations: [{
						sourceAddress: 'did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8',
						feeLimit: 0,
						gasPrice: 0,
						nonce: 79902,
						metadata: '',
						nonceType: 0,
						maxLedgerSeq: 0,
						operations: [{
							type: 8,
							sourceAddress: '',
							metadata: '',
							createAccount: undefined,
							setMetadata: undefined,
							setSignerWeight: undefined,
							setThreshold: undefined,
							payCoin: undefined,
							log: [Object],
							setPrivilege: undefined,
							upgradeContract: undefined,
							setControlledArea: undefined,
							authorizeTransfer: undefined
						}]
					}]
				},
				txSize: 378,
				blob: ''
			}
		}
	}
```

#### 2.4.4 构建特定交易类型数据，并序列化交易数据

##### 2.4.4.1 账号激活

```
provider.transaction.buildAccountCreateTx(op: OpCreateAccountParams, signer: Signer)
```

###### 请求参数

| 参数                    | 类型   | 是否必填 | 备注                                     |
| ----------------------- | ------ | -------- | ---------------------------------------- |
| op.params               | object | 是       |                                          |
| op.params.nonceType     | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.params.ceilLedgerSeq | number | 否       |                                          |
| op.params.gasPrice      | number | 否       | 默认为1                                  |
| op.params.feeLimit      | number | 否       | 默认为10000000                           |
| op.params.remarks       | string | 否       | metadata                                 |
| op.destAddress          | string | 是       | 待激活目的账户地址                       |
| op.amount               | number | 否       | 默认为0                                  |
| signer                  | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
        params: {},
        destAddress: "did:bid:efsdhXX7bNYxeYYVasatAi7DPE4nM3Lb",
        amount: 1,
      };
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const response = await provider.transaction.buildAccountCreateTx(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b10012238080122340a286469643a6269643a6566736468585837624e59786559595661736174416937445045346e4d334c621a0608011a0208012801',
    signatures: [ [Object] ]
  }
}
```

##### 2.4.4.2 合约创建

```
provider.transaction.buildContractCreateTx(op: OpCreateContractParams, signer: Signer)
```

###### 请求参数

| 参数                    | 类型   | 是否必填 | 备注                                     |
| ----------------------- | ------ | -------- | ---------------------------------------- |
| op.params               | object | 是       |                                          |
| op.params.nonceType     | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.params.ceilLedgerSeq | number | 否       |                                          |
| op.params.gasPrice      | number | 否       | 默认为1                                  |
| op.params.feeLimit      | number | 否       | 默认为10000000                           |
| op.params.remarks       | string | 否       | metadata                                 |
| op.initBalance          | number | 否       | 合约部署初始余额，默认为0                |
| op.type                 | number | 是       | 0: javascript 1: evm                     |
| op.payload              | string | 是       | 合约代码                                 |
| op.initInput            | string | 否       | 合约代码初始化输入                       |
| signer                  | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        initBalance: 0,
        type: ContractType.EVM,
        payload:
          "6080xxxx",
        initInput: "",
      };
const response = await provider.transaction.buildContractCreateTx(request, signerWithProvider,);
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: 'xxxxxxx',
    signatures: [ [Object] ]
  }
}
```

##### 2.4.4.3 gasSend 转账

```
provider.transaction.buildGasSendTx(op: opGasSendParams, signer: Signer)
```

###### 请求参数

| 参数                    | 类型   | 是否必填 | 备注                                     |
| ----------------------- | ------ | -------- | ---------------------------------------- |
| op.params               | object | 是       |                                          |
| op.params.nonceType     | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.params.ceilLedgerSeq | number | 否       |                                          |
| op.params.gasPrice      | number | 否       | 默认为1                                  |
| op.params.feeLimit      | number | 否       | 默认为10000000                           |
| op.params.remarks       | string | 否       | metadata                                 |
| op.destAddress          | string | 是       | 转账目的账户地址                         |
| op.amount               | string | 是       | 转账余额                                 |
| signer                  | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        destAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
        amount: 1,
      };
const response = await provider.transaction.buildGasSendTx(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b100122300807522c0a286469643a6269643a65666d4877736f617666325357446b6d347677554a46777a5a4257516e56563710012a047465737430904e3801',
    signatures: [ [Object] ]
  }
}
```

##### 2.4.4.4 合约调用

```
provider.transaction.buildContractInvokeTx(op: opContractInvokeParams, signer: Signer)
```

###### 请求参数

| 参数                    | 类型   | 是否必填 | 备注                                     |
| ----------------------- | ------ | -------- | ---------------------------------------- |
| op.params               | object | 是       |                                          |
| op.params.nonceType     | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.params.ceilLedgerSeq | number | 否       |                                          |
| op.params.gasPrice      | number | 否       | 默认为1                                  |
| op.params.feeLimit      | number | 否       | 默认为10000000                           |
| op.params.remarks       | string | 否       | metadata                                 |
| op.contractAddress      | string | 是       | 待调用合约账户地址                       |
| op.input                | string | 是       | 待调用合约参数                           |
| op.amount               | number | 否       | 转账金额                                 |
| signer                  | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
        input:
          '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
        amount: 0,
      };
const response = await provider.transaction.buildContractInvokeTx(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b1001229f010807529a010a286469643a6269643a6566426341756d77525972455362705256546f344a3476597158586671427a751a6e7b2266756e6374696f6e223a2262616c616e63654f66286164647265737329222c2261726773223a226469643a6269643a6566426341756d77525972455362705256546f344a3476597158586671427a75222c2272657475726e223a2272657475726e732875696e7432353629222a047465737430904e3801',
    signatures: [ [Object] ]
  }
}
```

##### 2.4.5 设置账户metadata

```
provider.transaction.buildSetMetadataTx(op: opSetMetadataParams, signer: Signer)
```

###### 请求参数

| 参数                    | 类型   | 是否必填 | 备注                                     |
| ----------------------- | ------ | -------- | ---------------------------------------- |
| op.params               | object | 是       |                                          |
| op.params.nonceType     | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.params.ceilLedgerSeq | number | 否       |                                          |
| op.params.gasPrice      | number | 否       | 默认为1                                  |
| op.params.feeLimit      | number | 否       | 默认为10000000                           |
| op.params.remarks       | string | 否       | metadata                                 |
| op.key                  | string | 是       | key                                      |
| op.value                | string | 是       | value                                    |
| op.version              | number | 否       | version                                  |
| signer                  | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        key: "A",
        value: "B",
        version: 1,
      };
const response = await provider.transaction.buildSetMetadataTx(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b1001220c08043a080a014112014218012a047465737430904e3801',
    signatures: [ [Object] ]
  }
}
```

##### 2.4.6 设置账户权限

```
provider.transaction.buildSetPrivilegeTx(op: opSetPrivParams, signer: Signer)
```

###### 请求参数

| 参数                           | 类型          | 是否必填 | 备注                                                                                              |
| ------------------------------ | ------------- | -------- | ------------------------------------------------------------------------------------------------- |
| op.params                      | object        | 是       |                                                                                                   |
| op.params.nonceType            | number        | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0                                                          |
| op.params.ceilLedgerSeq        | number        | 否       |                                                                                                   |
| op.params.gasPrice             | number        | 否       | 默认为1                                                                                           |
| op.params.feeLimit             | number        | 否       | 默认为10000000                                                                                    |
| op.params.remarks              | string        | 否       | metadata                                                                                          |
| op.masterWeight                | string        | 是       |                                                                                                   |
| op.signers                     | array<Signer> | 否       | Signer详见通用结构定义                                                                            |
| op.txThreshold                 | number        | 否       |                                                                                                   |
| op.typeThresholds              | array         | 否       |                                                                                                   |
| op.typeThresholds[x].type      | number        | 是       | 操作类型：<br />1: create_account; <br />4:set_metadata; <br />7:pay_coin; <br />9:set_privilege; |
| op.typeThresholds[x].threshold | number        | 是       |                                                                                                   |
| signer                         | Signer        | 是       | Signer 详见第一章                                                                                 |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        params: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        signers: [
          {
            address: "did:bid:efsdhXX7bNYxeYYVasatAi7DPE4nM3Lb",
            weight: 1,
          },
        ],
        typeThresholds: [
          {
            type: OperationTypeThreshold_Type.CREATE_ACCOUNT,
            threshold: 1,
          },
        ],
      };
const response = await provider.transaction.buildSetPrivilegeTx(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b1001223808096234122c0a286469643a6269643a6566736468585837624e59786559595661736174416937445045346e4d334c6210012204080110012a047465737430904e3801',
    signatures: [ [Object] ]
  }
}
```

#### 2.4.7 批量处理交易

##### 2.4.7.1 批量转账

```
provider.transaction.buildBatchGasSend(op: OpBatchGasSend, signer: Signer)
```

###### 请求参数

| 参数                     | 类型   | 是否必填 | 备注                                     |
| ------------------------ | ------ | -------- | ---------------------------------------- |
| op.base                  | object | 是       |                                          |
| op.base.nonceType        | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.base.ceilLedgerSeq    | number | 否       |                                          |
| op.base.gasPrice         | number | 否       | 默认为1                                  |
| op.base.feeLimit         | number | 否       | 默认为10000000                           |
| op.base.remarks          | string | 否       | metadata                                 |
| op.params                | array  | 是       |                                          |
| op.params[x].destAddress | string | 是       | 目的账户地址                             |
| op.params[x].amount      | number | 是       | 转账金额                                 |
| signer                   | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        base: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        params: [{
        destAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
        amount: 1,
      },
                {
        destAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
        amount: 1,
      }],
      };
const response = await provider.transaction.buildBatchGasSend(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b100122300807522c0a286469643a6269643a65666d4877736f617666325357446b6d347677554a46777a5a4257516e565637100122300807522c0a286469643a6269643a65666d4877736f617666325357446b6d347677554a46777a5a4257516e56563710012a047465737430904e3801',
    signatures: [ [Object] ]
  }
}
```

##### 2.4.7.2 批量合约调用

```
provider.transaction.buildBatchContractInvoke(params: OpBatchContractInvoke, signer: Signer)
```

###### 请求参数

| 参数                         | 类型   | 是否必填 | 备注                                     |
| ---------------------------- | ------ | -------- | ---------------------------------------- |
| op.base                      | object | 是       |                                          |
| op.base.nonceType            | number | 否       | 0：递增nonce; 1:随机nonce，不填时默认为0 |
| op.base.ceilLedgerSeq        | number | 否       |                                          |
| op.base.gasPrice             | number | 否       | 默认为1                                  |
| op.base.feeLimit             | number | 否       | 默认为10000000                           |
| op.base.remarks              | string | 否       | metadata                                 |
| op.params                    | array  | 是       |                                          |
| op.params[x].contractAddress | string | 是       | 待调用合约账户地址                       |
| op.params[x].input           | string | 是       | 待合约调用参数                           |
| op.params[x].amount          | number | 否       | 转账金额                                 |
| signer                       | Signer | 是       | Signer 详见第一章                        |

###### 响应参数

| 类型                   | 类型             | 备注                          |
| ---------------------- | ---------------- | ----------------------------- |
| errorCode              | SdkStatusCode    | 接口调用错误码                |
| errorDesc              | string           | 接口调用描述信息              |
| result                 | object           |                               |
| result.transactionBlob | string           | 交易结构hex字符串             |
| result.signatures      | array<Signature> | Signature结构详见通用结构定义 |

###### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);
const request = {
        base: {
          nonceType: TxType.INCREASE_NONCE,
          gasPrice: 1,
          feeLimit: 10000,
          remarks: "test",
        },
        params: [
          {
            contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
            input:
              '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
            amount: 0,
          },
          {
            contractAddress: "did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu",
            input:
              '{"function":"balanceOf(address)","args":"did:bid:efBcAumwRYrESbpRVTo4J4vYqXXfqBzu","return":"returns(uint256)"',
            amount: 0,
          },
        ],
      };
const response = await provider.transaction.buildBatchContractInvoke(request, signerWithProvider, );
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    transactionBlob: '0a286469643a6269643a7a6656484a6e6f70383735554d506d736b616d344a43346b4c5734744161444b1001229f010807529a010a286469643a6269643a6566426341756d77525972455362705256546f344a3476597158586671427a751a6e7b2266756e6374696f6e223a2262616c616e63654f66286164647265737329222c2261726773223a226469643a6269643a6566426341756d77525972455362705256546f344a3476597158586671427a75222c2272657475726e223a2272657475726e732875696e743235362922229f010807529a010a286469643a6269643a6566426341756d77525972455362705256546f344a3476597158586671427a751a6e7b2266756e6374696f6e223a2262616c616e63654f66286164647265737329222c2261726773223a226469643a6269643a6566426341756d77525972455362705256546f344a3476597158586671427a75222c2272657475726e223a2272657475726e732875696e7432353629222a047465737430904e3801',
    signatures: [ [Object] ]
  }
}
```

#### 2.4.8 提交交易

```
provider.transaction.submitTransaction(params: SubmitTransactionParams)
```

##### 请求参数

| 参数                            | 类型             | 是否必填 | 备注                          |
| ------------------------------- | ---------------- | -------- | ----------------------------- |
| params.items                    | array            | 是       |                               |
| params.items[x].transactionBlob | string           | 是       | 签名数据                      |
| params.items[x].signatures      | array<Signature> | 是       | Signature结构详见通用结构定义 |

##### 响应参数

| 类型                 | 类型          | 备注             |
| -------------------- | ------------- | ---------------- |
| successCount         | number        | 成功提交交易条数 |
| results              | array<Object> |                  |
| results[x].hash      | string        | 交易hash         |
| results[x].errorCode | number        | 交易提交错误码   |
| results[x].errorDesc | string        | 交易提交错误描述 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
        items: [
          {
            signatures: [
              {
                publicKey:
                  "b065665b6fa23dc1c00b17b8d2cd86093c86bbae4c011247310f9160351bd64bc580cc",
                signData:
                  "F62BA0BD3CC98EFBBA20DB540C6660BD4547390625AD4FF6CEB7B216985F6EFB3092E3F9E36299068D668D52CA92ABAD944D28342E0DD4D1ACEE06D700350702",
              },
            ],
            transactionBlob:
              "0A286469643A6269643A6566433552456946657361427575315558624D4A577645737146526B514B6971103022D605080122D10512C305080112BE053630383036303430353233343830313536313030313035373630303038306664356235303631303133663830363130303230363030303339363030306633303036303830363034303532363030343336313036313030343135373630303033353763303130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303930303436336666666666666666313638303633303331313533633231343631303034363537356236303030383066643562333438303135363130303532353736303030383066643562353036313030356236313030643635363562363034303531383038303630323030313832383130333832353238333831383135313831353236303230303139313530383035313930363032303031393038303833383336303030356238333831313031353631303039623537383038323031353138313834303135323630323038313031393035303631303038303536356235303530353035303930353039303831303139303630316631363830313536313030633835373830383230333830353136303031383336303230303336313031303030613033313931363831353236303230303139313530356235303932353035303530363034303531383039313033393066333562363036303630343038303531393038313031363034303532383036303062383135323630323030313766363836353663366336663230373736663732366336343030303030303030303030303030303030303030303030303030303030303030303030303030303030303831353235303930353039303536303061313635363237613761373233303538323033336431366230663863613362323334646363396233336139623533303063333630313561383838373732633761656565633965353733613537316437346338303032391A041A0208012880C2D72F2A0F63726561746520636F6E747261637430AC87E32F3864",
          },
        ],
      };
const response = await provider.transaction.submitTransaction(request);
console.log(response);
//响应数据
{
  successCount: 1,
  results: [
    {
      hash: 'd4c9eb33750d66dc471cfb276807c0f1b61ace6dd969fce9cc7ab2c49c69e40a',
      errorCode: 0,
      errorDesc: ''
    }
  ]
}
```

#### 2.4.9 交易费用评估

```
provider.transaction.estimateGas(params: TestTransactionRequest)
```

##### 请求参数

| 参数                                | 类型   | 是否必填 | 备注                                     |
| ----------------------------------- | ------ | -------- | ---------------------------------------- |
| items                               | array  | 是       | 交易数据                                 |
| items.transactionJson               | object | 是       | 交易数据                                 |
| items.transactionJson.sourceAddress | string | 是       | 交易源账号，即交易的发起方               |
| items.transactionJson.feeLimit      | number | 是       | feelimit                                 |
| items.transactionJson.gasPrice      | number | 是       | gas                                      |
| items.transactionJson.ceilLedgerSeq | number | 否       | 可选，区块高度限制                       |
| items.transactionJson.nonce         | string | 是       | nonce                                    |
| items.transactionJson.nonceType     | number | 否       | nonce类型 0-自增nonce 1-随机nonce，默认0 |
| items.transactionJson.maxLedgerSeq  | number | 否       | 最大区块高度，默认0                      |
| items.transactionJson.metadata      | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| items.transactionJson.operations    | array  | 是       | 交易数据（不同的交易类型参考如下参数）   |

###### 生成主链数字身份

| 参数                                      | 类型   | 是否必填 | 备注                                     |
| ----------------------------------------- | ------ | -------- | ---------------------------------------- |
| type                                      | number | 是       | 1: CREATE_ACCOUNT-创建主链数字身份       |
| sourceAddress                             | string | 是       | 可选，操作源账户，即操作的执行方         |
| metadata                                  | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| createAccount                             | object | 是       | 创建账户信息                             |
| createAccount.destAddress                 | string | 是       | 待创建的目标账户地址                     |
| createAccount.initBalance                 | number | 是       | 目标账户的初始化余额                     |
| createAccount.priv                        | object | 否       | 权限                                     |
| createAccount.priv.masterWeight           | number | 否       | 目标账户拥有的权力值                     |
| createAccount.priv.thresholds             | number | 否       | 权限                                     |
| createAccount.priv.thresholds.txThreshold | number | 否       | 发起交易需要的权力值                     |

###### 创建合约

| 参数                                      | 类型   | 是否必填 | 备注                                     |
| ----------------------------------------- | ------ | -------- | ---------------------------------------- |
| type                                      | number | 是       | 1: CREATE_ACCOUNT                        |
| sourceAddress                             | string | 是       | 可选，操作源账户，即操作的执行方         |
| metadata                                  | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| createAccount                             | object | 是       |                                          |
| createAccount.contract                    | object | 是       | 合约                                     |
| createAccount.contract.payload            | string | 是       | 合约内容                                 |
| createAccount.contract.type               | object | 否       | 合约类型，0-js，1-Evm，2-system          |
| createAccount.initBalance                 | number | 否       | 合约账户初始化资产                       |
| createAccount.initBalance                 | string | 否       | 可选，合约代码init函数的入参             |
| createAccount.priv                        | string | 否       | 权限                                     |
| createAccount.priv.masterWeight           | string | 否       | 待创建的合约账户拥有的权力值             |
| createAccount.priv.thresholds             | array  | 否       |                                          |
| createAccount.priv.thresholds.txThreshold | number | 否       | 发起交易需要的权力值                     |

###### 合约调用

| 参数                | 类型   | 是否必填 | 备注                                     |
| ------------------- | ------ | -------- | ---------------------------------------- |
| type                | number | 是       | 7: PAY_COIN-合约调用                     |
| sourceAddress       | string | 是       | 可选，操作源账户，即操作的执行方         |
| metadata            | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| payCoin             | object | 是       |                                          |
| payCoin.destAddress | string | 是       | 合约地址                                 |
| payCoin.input       | string | 是       | 合约调用方法                             |

###### 星火链转移

| 参数                | 类型   | 是否必填 | 备注                                     |
| ------------------- | ------ | -------- | ---------------------------------------- |
| type                | number | 是       | 7: PAY_COIN-交易操作                     |
| sourceAddress       | string | 是       | 可选，操作源账户，即操作的执行方         |
| metadata            | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| payCoin             | object | 是       |                                          |
| payCoin.destAddress | string | 是       | 目的地址                                 |
| payCoin.amount      | number | 是       | 转账金额                                 |

###### 设置metadata信息

| 参数                | 类型   | 是否必填 | 备注                                     |
| ------------------- | ------ | -------- | ---------------------------------------- |
| type                | number | 是       | 4: SET_METADATA-设置 metadata            |
| sourceAddress       | string | 是       | 可选，操作源账户，即操作的执行方         |
| metadata            | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| setMetadata         | object | 是       | metadata信息                             |
| setMetadata.key     | string | 是       | key 键值                                 |
| setMetadata.value   | string | 是       | value 数据                               |
| setMetadata.version | number | 否       | 可选，metadata版本号                     |

###### 设置权限

| 参数                                  | 类型   | 是否必填 | 备注                                     |
| ------------------------------------- | ------ | -------- | ---------------------------------------- |
| type                                  | number | 是       | 9: SET_PRIVILEGE-设置权限操作            |
| sourceAddress                         | string | 是       | 可选，操作源账户，即操作的执行方         |
| metadata                              | string | 否       | 可选，用户自定义给交易的备注，16进制格式 |
| setPrivilege                          | object | 是       | 权限信息                                 |
| setPrivilege.masterWeight             | string | 否       | 可选，当前账户的自身权力值               |
| setPrivilege.signers                  | array  | 是       | 需要操作的签名者列表                     |
| setPrivilege.signers.address          | string | 是       | 需要操作的签名者地址                     |
| setPrivilege.signers.weight           | number | 是       | 可选，签名者的权力值                     |
| setPrivilege.txThreshold              | string | 否       | 可选，发起交易需要权力值                 |
| setPrivilege.typeThresholds           | array  | 否       | 可选，不同操作需要的权力值               |
| setPrivilege.typeThresholds.type      | object | 是       | 1-创建账户操作类型 7-调用合约需要权限值  |
| setPrivilege.typeThresholds.threshold | number | 否       | 可选，该操作需要的权力值                 |

#### 响应参数

| 类型                                                   | 类型          | 备注                                                                                                                    |
| ------------------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| errorCode                                              | SdkStatusCode | 接口调用错误码                                                                                                          |
| errorDesc                                              | string        | 接口调用描述信息                                                                                                        |
| result.stat                                            | object        | 执行状态                                                                                                                |
| result.hash                                            | string        | 交易hash                                                                                                                |
| result.txs                                             | array         | 交易数组                                                                                                                |
| result.txs[x].gas                                      | number        | 交易消耗gas                                                                                                             |
| result.txs[x].transactionEnv                           | object        | 交易结构                                                                                                                |
| result.txs[x].actualFee                                | number        | 交易消耗费用                                                                                                            |
| result.txs[x].transactionEnv.transaction               | object        | 交易结构                                                                                                                |
| result.txs[x].transactionEnv.transaction.sourceAddress | string        | 交易源账户地址                                                                                                          |
| result.txs[x].transactionEnv.transaction.feeLimit      | number        | feeLimit限制                                                                                                            |
| result.txs[x].transactionEnv.transaction.gasPrice      | number        | gasPrice                                                                                                                |
| result.txs[x].transactionEnv.transaction.nonce         | string        | 交易源递增账户nonce值                                                                                                   |
| result.txs[x].transactionEnv.transaction.metadata      | string        | 交易元数据                                                                                                              |
| result.txs[x].transactionEnv.transaction.nonceType     | number        | 0:递增nonce;1:随机nonce                                                                                                 |
| result.txs[x].transactionEnv.transaction.maxLedgerSeq  | number        | 交易最大处理高度，与随机nonce一期使用                                                                                   |
| result.txs[x].transactionEnv.transaction.operations    | array         | 详见通用结构定义<br />OperationCreateAccount<br />OperationPayCoin<br />OperationSetMetadata<br />OperationSetPrivilege |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
        items: [
            {
              transactionJson: {
                feeLimit: 100000,
                sourceAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
                gasPrice: 1,
                nonce: 173,
                operations: [
                  {
                    type: 1,
                    sourceAddress: "did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7",
                    createAccount: {
                      destAddress: "did:bid:efY72a55qY47gj2gSbvjLaLwdC439p4n",
                      initBalance: 1,
                      priv: {
                        masterWeight: 1,
                        thresholds: {
                          txThreshold: 1,
                        },
                      },
                    },
                  },
                ],
              },
              signatureNumber: 1,
            },
          ],
      };
const response = await provider.transaction.estimateGas(request);
console.log(response);
//响应数据
{
  trace: 'd97755e88d8d4b41949fca0350c143a3',
  result: {
    stat: { applyTime: 0, memoryUsage: 0, stackUsage: 0, step: 0 },
    hash: '225a74cca66c4ca2a9ecfa61d2419734c7386c2cf86f90da3dd2a800c085d491',
    txs: [ {
  gas: 644,
  transactionEnv: {
    transaction: {
      sourceAddress: 'did:bid:efmHwsoavf2SWDkm4vwUJFwzZBWQnVV7',
      feeLimit: 56151612001,
      gasPrice: 1,
      nonce: 173,
      metadata: '',
      nonceType: 0,
      maxLedgerSeq: 0,
      operations: [Array]
    }
  },
  actualFee: 644
} ]
  },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

### 2.5 合约调用相关接口

#### 2.5.1 判断指定账户是否为合约账户

```
provider.contract.checkContractAccount(address:string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |

##### 响应参数

| 类型      | 类型          | 备注               |
| --------- | ------------- | ------------------ |
| errorCode | SdkStatusCode | 接口调用错误码     |
| errorDesc | string        | 接口调用描述信息   |
| result    | bool          | 标识是否为合约账户 |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.contract.checkContractAccount("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: 'ok', result: true }
```

#### 2.5.2 获取指定合约账户信息

```
provider.contract.getContractInfo(address:string)
```

##### 请求参数

| 参数    | 类型   | 是否必填 | 备注     |
| ------- | ------ | -------- | -------- |
| address | string | 是       | 账户地址 |

##### 响应参数

| 类型      | 类型             | 备注                     |
| --------- | ---------------- | ------------------------ |
| errorCode | SdkStatusCode    | 接口调用错误码           |
| errorDesc | string           | 接口调用描述信息         |
| result    | object<Contract> | Contract详见通用结构定义 |

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.contract.checkContractAccount("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: 'ok',
  result: {
    type: 2,
    payload: '{"params":{},"codeData":{"slogan":"this is config-manager contract"}}'
  }
}
```

#### 2.5.3 合约查询

```
provider.contract.callContract(transaction: CallContractRequest)
```

##### 请求参数

| 参数                        | 类型   | 是否必填 | 备注                                           |
| --------------------------- | ------ | -------- | ---------------------------------------------- |
| transaction.contractAddress | string | 是       | 合约地址                                       |
| transaction.input           | string | 是       | 合约调用参数                                   |
| transaction.gasPrice        | number | 否       | 默认为1                                        |
| transaction.feeLimit        | number | 否       |                                                |
| transaction.sourceAddress   | string | 否       | 源账户地址（确认该账户地址有权限进行合约查询） |

##### 响应参数

同1.7 章节 响应参数

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = await provider.contract.checkContractAccount("did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8");
console.log(response);
//响应数据
{
  result: { queryRets: [ {
  error: '{}',
  result: '{"code":0,"data":"[0]","desc":"","evmcode":"0000000000000000000000000000000000000000000000000000000000000000","gasused":2767}'
} ] },
  errorCode: 0,
  errorDesc: 'ok'
}
```

###

### 2.6 三方平台相关接口

#### 2.6.1 账号备案上报

```
provider.bop.apply(params: ApplyRequest)
```

##### 请求参数

| 参数                  | 类型          | 是否必填 | 备注                                     |
| --------------------- | ------------- | -------- | ---------------------------------------- |
| params.data           | array<object> | 是       | 申请备案、取消备案bid集合，上限100条     |
| params.data[x].bid    | string        | 是       | 账号地址                                 |
| params.data[x].status | number        | 是       | 账号状态，0：取消许可，1:许可（长度为1） |

##### 响应参数

| 类型             | 类型          | 备注             |
| ---------------- | ------------- | ---------------- |
| errorCode        | SdkStatusCode | 接口调用错误码   |
| errorDesc        | string        | 接口调用描述信息 |
| success          | bool          | 是否成功         |
| trace            | string        | 请求ID           |
| result           | object        |                  |
| result.requestNo | string        | 请求序号         |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
        data: [
          {
            bid: "did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq",
            status: "1",
          },
        ],
      };
const response = await provider.bop.apply(request);
console.log(response);
//响应数据
{
  trace: '7c96bb30cfae406ab4e411110630be1a',
  result: { requestNo: 'df8f5d55-5bea-4cfe-8b0b-bd8a9792dd67' },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

#### 2.6.2 数据上链状态查询

```
provider.bop.status(params: ApplyStatusRequest)
```

##### 请求参数

| 参数             | 类型   | 是否必填 | 备注                                   |
| ---------------- | ------ | -------- | -------------------------------------- |
| params.requestNo | string | 是       | 请求序号（数据上报返回，长度不超过64） |

##### 响应参数

| 类型             | 类型          | 备注                                                       |
| ---------------- | ------------- | ---------------------------------------------------------- |
| errorCode        | SdkStatusCode | 接口调用错误码                                             |
| errorDesc        | string        | 接口调用描述信息                                           |
| success          | bool          | 是否成功                                                   |
| trace            | string        | 请求ID                                                     |
| result           | object        |                                                            |
| result.requestNo | string        | 请求序号                                                   |
| result.status    | string        | 存储状态（0：待处理，1：处理中，2：处理成功，3：处理失败） |
| result.txHash    | string        | 数据上链交易hash                                           |
| result.errorDesc | string        | 错误描述                                                   |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
      };
const response = await provider.bop.status(request);
console.log(response);
//响应数据
{
  trace: '703b5af9f5c9450d83b07bd90e056e43',
  result: { requestNo: '', status: '2', txHash: '', errorDesc: '' },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

#### 2.6.3 获取平台存储数据

```
provider.bop.detail(params: DetailRequest)
```

##### 请求参数

| 参数             | 类型   | 是否必填 | 备注                                   |
| ---------------- | ------ | -------- | -------------------------------------- |
| params.requestNo | string | 是       | 请求序号（数据上报返回，长度不超过64） |

##### 响应参数

| 类型             | 类型          | 备注             |
| ---------------- | ------------- | ---------------- |
| errorCode        | SdkStatusCode | 接口调用错误码   |
| errorDesc        | string        | 接口调用描述信息 |
| success          | bool          | 是否成功         |
| trace            | string        | 请求ID           |
| result           | object        |                  |
| result.requestNo | string        | 请求序号         |
| result.txHash    | string        | 数据上链交易hash |
| result.bidList   | string        | bid集合          |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
        requestNo: "ca3d2fa2-28ab-4322-b9f7-b018667acf87",
      };
const response = await provider.bop.detail(request);
console.log(response);
//响应数据
{
  trace: 'cb191f3f425a40ef885de86205550e30',
  result: {
    requestNo: 'ca3d2fa2-28ab-4322-b9f7-b018667acf87',
    txHash: '',
    bidList: '{"data":[{"bid":"did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq","status":"0"}],"netWorkType":0}'
  },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

#### 2.6.4 查询平台交易缓存池

```
provider.bop.getTransactionCache(params: GetTransactionCacheRequest)
```

##### 请求参数

| 参数           | 类型   | 是否必填 | 备注                                               |
| -------------- | ------ | -------- | -------------------------------------------------- |
| params.limit   | number | 否       | 默认100，最小1，最大1000，结果中最多返回的交易数量 |
| params.hash    | string | 否       | 交易哈希，不填时默认返回交易池内所有交易           |
| params.address | string | 否       | 交易的源地址                                       |

##### 响应参数

同章节 2.4.3 响应参数

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {};
const response = await provider.bop.getTransactionCache(request);
console.log(response);
//响应数据
{
  trace: '9d1450d34aac419b887b84567300050f',
  result: { totalCount: 1, transactions: [
    {
  hash: 'e6366d3ae7231e8f59d44b710521dce671abd9d1c37c2e2b23736b12665e6547',
  actualFee: 0,
  closeTime: 0,
  contractTxHashes: [],
  errorCode: 1311,
  errorDesc: '',
  ledgerSeq: 0,
  signatures: [
    {
      publicKey: 'b065665b6fa23dc1c00b17b8d2cd86093c86bbae4c011247310f9160351bd64bc580cc',
      signData: '4BAC56FCF51A90CDD9DC30D7E13072FCFD3181BB861FA34457FD47E4515AC168013E17A8887F1A8EAE8DD42D42447B0644043DAFCF5C007DECF62D05033B1B03'
    }
  ],
  transaction: {
    sourceAddress: 'did:bid:efC5REiFesaBuu1UXbMJWvEsqFRkQKiq',
    feeLimit: 0,
    gasPrice: 0,
    nonce: 50294,
    metadata: '',
    nonceType: 0,
    maxLedgerSeq: 0,
    operations: [ [Object] ]
  },
  txSize: 0,
  blob: '0A286469643A6269643A6566433552456946657361427575315558624D4A577645737146526B514B697110F6880322330807522F0A296469643A6269643A65663262374A386141375044326D77535243754B4B4276423873726A4A7A32596F1080B51830C0843D3801'
}
  ]
  },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

#### 2.6.5 查询平台丢弃交易数据

```
provider.bop.discard(params: DiscardRequest)
```

##### 请求参数

| 参数             | 类型   | 是否必填 | 备注              |
| ---------------- | ------ | -------- | ----------------- |
| params.hash      | string | 否       | 交易hash          |
| params.page      | number | 否       | 页码 默认1        |
| params.page_size | number | 否       | 每页记录数 默认10 |

##### 响应参数

| 类型                                                                 | 类型             | 备注                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| errorCode                                                            | SdkStatusCode    | 接口调用错误码                                                                                                                                                                                                                                        |
| errorDesc                                                            | string           | 接口调用描述信息                                                                                                                                                                                                                                      |
| success                                                              | bool             | 是否成功                                                                                                                                                                                                                                              |
| trace                                                                | string           | 请求ID                                                                                                                                                                                                                                                |
| result                                                               | object           |                                                                                                                                                                                                                                                       |
| result.count                                                         | number           | 交易数量                                                                                                                                                                                                                                              |
| result.totalPage                                                     | number           | 页码数                                                                                                                                                                                                                                                |
| result.transactionBases                                              | array<object>    |                                                                                                                                                                                                                                                       |
| result.transactionBases[x].id                                        | string           | id                                                                                                                                                                                                                                                    |
| result.transactionBases[x].txId                                      | string           | txId                                                                                                                                                                                                                                                  |
| result.transactionBases[x].hash                                      | string           | 交易hash                                                                                                                                                                                                                                              |
| result.transactionBases[x].apiKey                                    | string           | apiKey                                                                                                                                                                                                                                                |
| result.transactionBases[x].txType                                    | number           | 交易类型 0- 基础交易 1- 增强交易; 目前仅支持0                                                                                                                                                                                                         |
| result.transactionBases[x].createTime                                | string           | 创建时间                                                                                                                                                                                                                                              |
| result.transactionBases[x].ledgerSeq                                 | number           | 区块高度                                                                                                                                                                                                                                              |
| result.transactionBases[x].sourceAddress                             | string           | 交易源账户地址                                                                                                                                                                                                                                        |
| result.transactionBases[x].actualFee                                 | number           | 交易实际花费费用                                                                                                                                                                                                                                      |
| result.transactionBases[x].status                                    | SdkStatusCode    | 交易错误码                                                                                                                                                                                                                                            |
| result.transactionBases[x].statusDesc                                | string           | 接口调用描述信息                                                                                                                                                                                                                                      |
| result.transactionBases[x].baseTransaction                           | object           | 交易体                                                                                                                                                                                                                                                |
| result.transactionBases[x].baseTransaction.hash                      | string           | 交易hash                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.actualFee                 | number           | 交易执行费用                                                                                                                                                                                                                                          |
| result.transactionBases[x].baseTransaction.closeTime                 | number           | 交易执行完成时间                                                                                                                                                                                                                                      |
| result.transactionBases[x].baseTransaction.contractTxHashes          | array<string>    | 交易触发的新交易列表                                                                                                                                                                                                                                  |
| result.transactionBases[x].baseTransaction.errorCode                 | StatusCodes      | 错误码                                                                                                                                                                                                                                                |
| result.transactionBases[x].baseTransaction.errorDesc                 | string           | 错误描述信息                                                                                                                                                                                                                                          |
| result.transactionBases[x].baseTransaction.ledgerSeq                 | number           | 区块高度                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.signatures                | array<Signature> | Signature结构详见通用结构定义                                                                                                                                                                                                                         |
| result.transactionBases[x].baseTransaction.txSize                    | number           | 交易大小                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.blob                      | string           | 序列化后交易hex字符串                                                                                                                                                                                                                                 |
| result.transactionBases[x].baseTransaction.transaction               | object           |                                                                                                                                                                                                                                                       |
| result.transactionBases[x].baseTransaction.transaction.sourceAddress | string           | 交易源账户                                                                                                                                                                                                                                            |
| result.transactionBases[x].baseTransaction.transaction.feeLimit      | number           | feeLimit                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.transaction.gasPrice      | number           | gasPrice                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.transaction.nonce         | number           | nonce                                                                                                                                                                                                                                                 |
| result.transactionBases[x].baseTransaction.transaction.metadata      | string           | metadata                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.transaction.nonceType     | number           | 0: 递增nonce; 1:随机nonce                                                                                                                                                                                                                             |
| result.transactionBases[x].baseTransaction.transaction.maxLedgerSeq  | number           | 最大交易处理高度，与随机Nonce一起使用                                                                                                                                                                                                                 |
| result.transactionBases[x].baseTransaction.transaction.operations    | array            | 具体Operation结构详见通用结构定义：<br />OperationCreateAccount<br />OperationPayCoin<br />OperationSetMetadata<br />OperationSetPriviledger<br />OperationUpgradeContract<br />OperationSetSignerWeight<br />OperationSetThreshold<br />OperationLog |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
    hash: "6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575",
};
const response = await provider.bop.discard(request);
console.log(response);
//响应数据
{
  trace: '731aaaab040e491394d1ec1daea0cc22',
  result: { count: 1, totalPage: 1, transactionBases: [
    {
  id: '845f53a6bdf5468a8808884b80fdaeb9',
  txId: '',
  hash: '6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575',
  apiKey: 'IXJM7LG5S33EHYQSSD30926SYEI9L0WA',
  txType: 0,
  createTime: '2024-12-06 01:00:14',
  ledgerSeq: 0,
  sourceAddress: 'did:bid:efCzB6hporiLttbtaex8mZdGUo7hBA67',
  actualFee: 0,
  status: 1316,
  statusDesc: 'Xinghuo BIF is timed out.',
  baseTransaction: {
    hash: '6eff3a70b7794578641ab7a5e56e3e14347a37b857174f3f92112e769b32f575',
    actualFee: 0,
    closeTime: 0,
    contractTxHashes: [],
    errorCode: 1316,
    errorDesc: 'Xinghuo BIF is timed out.',
    ledgerSeq: 0,
    signatures: [ [Object] ],
    transaction: {
      sourceAddress: 'did:bid:efCzB6hporiLttbtaex8mZdGUo7hBA67',
      feeLimit: 0,
      gasPrice: 0,
      nonce: 652554911354073100,
      metadata: '',
      nonceType: 1,
      maxLedgerSeq: 5123408,
      operations: [Array]
    },
    txSize: 0,
    blob: 'xxxxx'
  }
}
  },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

#### 2.6.6 查询平台交易数据列表

```
provider.bop.query(params: QueryRequest)
```

##### 请求参数

| 参数             | 类型   | 是否必填 | 备注                                                                                   |
| ---------------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| params.bid       | string | 否       | 交易hash                                                                               |
| params.hash      | string | 否       | 页码 默认1                                                                             |
| params.txId      | string | 否       | 每页记录数 默认10                                                                      |
| params.startTime | string | 否       | 开始时间 yyyy-MM-dd HH:mm:ss 例：2023-09-14 21:21:41                                   |
| params.endTime   | string | 否       | 结束时间 yyyy-MM-dd HH:mm:ss 例：2023-09-14 21:21:41                                   |
| params.txType    | number | 否       | 交易类型 0- 基础交易 1- 增强交易，当bid或tx_id不为空时，此参数必填，目前不支持增强交易 |
| params.page      | number | 是       | 页码                                                                                   |
| params.pageSize  | number | 是       | 每页记录数                                                                             |
| params.ledgerSeq | number | 否       | 块高度                                                                                 |

##### 响应参数

| 类型                                                                 | 类型             | 备注                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| errorCode                                                            | SdkStatusCode    | 接口调用错误码                                                                                                                                                                                                                                        |
| errorDesc                                                            | string           | 接口调用描述信息                                                                                                                                                                                                                                      |
| success                                                              | bool             | 是否成功                                                                                                                                                                                                                                              |
| trace                                                                | string           | 请求ID                                                                                                                                                                                                                                                |
| result                                                               | object           |                                                                                                                                                                                                                                                       |
| result.count                                                         | number           | 交易数量                                                                                                                                                                                                                                              |
| result.totalPage                                                     | number           | 页码数                                                                                                                                                                                                                                                |
| result.transactionBases                                              | array<object>    |                                                                                                                                                                                                                                                       |
| result.transactionBases[x].id                                        | string           | id                                                                                                                                                                                                                                                    |
| result.transactionBases[x].txId                                      | string           | txId                                                                                                                                                                                                                                                  |
| result.transactionBases[x].hash                                      | string           | 交易hash                                                                                                                                                                                                                                              |
| result.transactionBases[x].apiKey                                    | string           | apiKey                                                                                                                                                                                                                                                |
| result.transactionBases[x].txType                                    | number           | 交易类型 0- 基础交易 1- 增强交易; 目前仅支持0                                                                                                                                                                                                         |
| result.transactionBases[x].createTime                                | string           | 创建时间                                                                                                                                                                                                                                              |
| result.transactionBases[x].ledgerSeq                                 | number           | 区块高度                                                                                                                                                                                                                                              |
| result.transactionBases[x].sourceAddress                             | string           | 交易源账户地址                                                                                                                                                                                                                                        |
| result.transactionBases[x].actualFee                                 | number           | 交易实际花费费用                                                                                                                                                                                                                                      |
| result.transactionBases[x].status                                    | SdkStatusCode    | 交易错误码                                                                                                                                                                                                                                            |
| result.transactionBases[x].statusDesc                                | string           | 接口调用描述信息                                                                                                                                                                                                                                      |
| result.transactionBases[x].baseTransaction                           | object           | base 交易体                                                                                                                                                                                                                                           |
| result.transactionBases[x].baseTransaction.hash                      | string           | 交易hash                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.actualFee                 | number           | 交易执行费用                                                                                                                                                                                                                                          |
| result.transactionBases[x].baseTransaction.closeTime                 | number           | 交易执行完成时间                                                                                                                                                                                                                                      |
| result.transactionBases[x].baseTransaction.contractTxHashes          | array<string>    | 交易触发的新交易列表                                                                                                                                                                                                                                  |
| result.transactionBases[x].baseTransaction.errorCode                 | StatusCodes      | 错误码                                                                                                                                                                                                                                                |
| result.transactionBases[x].baseTransaction.errorDesc                 | string           | 错误描述信息                                                                                                                                                                                                                                          |
| result.transactionBases[x].baseTransaction.ledgerSeq                 | number           | 区块高度                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.signatures                | array<Signature> | Signature结构详见通用结构定义                                                                                                                                                                                                                         |
| result.transactionBases[x].baseTransaction.txSize                    | number           | 交易大小                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.blob                      | string           | 序列化后交易hex字符串                                                                                                                                                                                                                                 |
| result.transactionBases[x].baseTransaction.transaction               | object           |                                                                                                                                                                                                                                                       |
| result.transactionBases[x].baseTransaction.transaction.sourceAddress | string           | 交易源账户                                                                                                                                                                                                                                            |
| result.transactionBases[x].baseTransaction.transaction.feeLimit      | number           | feeLimit                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.transaction.gasPrice      | number           | gasPrice                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.transaction.nonce         | number           | nonce                                                                                                                                                                                                                                                 |
| result.transactionBases[x].baseTransaction.transaction.metadata      | string           | metadata                                                                                                                                                                                                                                              |
| result.transactionBases[x].baseTransaction.transaction.nonceType     | number           | 0: 递增nonce; 1:随机nonce                                                                                                                                                                                                                             |
| result.transactionBases[x].baseTransaction.transaction.maxLedgerSeq  | number           | 最大交易处理高度，与随机Nonce一起使用                                                                                                                                                                                                                 |
| result.transactionBases[x].baseTransaction.transaction.operations    | array            | 具体Operation结构详见通用结构定义：<br />OperationCreateAccount<br />OperationPayCoin<br />OperationSetMetadata<br />OperationSetPriviledger<br />OperationUpgradeContract<br />OperationSetSignerWeight<br />OperationSetThreshold<br />OperationLog |

##### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const request = {
    hash: "1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48",
};
const response = await provider.bop.query(request);
console.log(response);
//响应数据
{
  trace: '45addbff6f8c4d44957c5b3df8002459',
  result: { count: 1, totalPage: 1, transactionBases: [
    {
  id: '94c9a2e728774d138fddd47e3ef36da6',
  txId: '',
  hash: '1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48',
  apiKey: 'CT7WJWZJZW7QSLSOU4NUFZFZZMM3JP6Y',
  txType: 0,
  createTime: '2024-12-26 14:52:10',
  ledgerSeq: 5722974,
  sourceAddress: 'did:bid:efU9VvMvSydLUY5h1eEPDKJSWSXKVtKG',
  actualFee: 88502,
  status: 0,
  statusDesc: 'Transaction successful.',
  baseTransaction: {
    hash: '1b96779dab06c39c5a4d173bf0033000bd25076c7007dd03623a764ae60c9b48',
    actualFee: 88502,
    closeTime: 1735195942437857,
    contractTxHashes: [
      '4a076114e245fc8dbbe084c111d613e291c3602580c4d134c41bdfec30185f5a'
    ],
    errorCode: 0,
    errorDesc: '',
    ledgerSeq: 5722974,
    signatures: [ [Object] ],
    transaction: {
      sourceAddress: 'did:bid:efU9VvMvSydLUY5h1eEPDKJSWSXKVtKG',
      feeLimit: 3000000,
      gasPrice: 1,
      nonce: 664271928076406800,
      metadata: '636f6e7472616374496e766f6b65',
      nonceType: 1,
      maxLedgerSeq: 5724563,
      operations: [Array]
    },
    txSize: 1506,
    blob: '0a286469643a6269643a6566553956764d765379644c5559356831654550444b4a535753584b56744b471080a0889ac9f9fd9b0922fd09080752f8090a296469643a6269643a656632373366554a4a6557317171475a6247456261484c63373146774a6254694a1aca0930786237643963653762303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303065303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303031323030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030313630303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303161303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303031653030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030313664303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303232303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303836343635373636393633363533303331303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303031316536393562306536386561376536396362616535386662303330333165353866623730303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303066653662663830653538353839653538383837653538396232653639636261303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030306365356239626665356237396565363935623065363865613730303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030393533346533303330333033303330333033313030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303034333333383330353630303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030302a0e636f6e7472616374496e766f6b6530c08db701380168017093b3dd02'
  }
}
  ] },
  success: true,
  errorCode: 0,
  errorDesc: 'ok'
}
```

# 三 utils工具包

## 3.1 星火地址处理

### 3.1.1 离线创建账户 ed25519

```
utils.address.getBidAndKeyPair(chainCode? : string)
```

#### 请求参数

| 参数      | 类型   | 是否必填 | 备注               |
| --------- | ------ | -------- | ------------------ |
| chainCode | string | 否       | 指定待生成子链链码 |

#### 响应参数

| 类型                 | 类型                                             | 备注             |
| -------------------- | ------------------------------------------------ | ---------------- |
| errorCode            | SdkStatusCode                                    | 接口调用错误码   |
| errorDesc            | string                                           | 接口调用描述信息 |
| result.keyType       | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 账户类型         |
| result.encPrivateKey | string                                           | 星火格式私钥     |
| result.encPublicKey  | string                                           | 星火格式公钥     |
| result.rawPrivateKey | string                                           | hex 原生私钥     |
| result.rawPublicKey  | string                                           | hex 原生公钥     |
| result.encAddress    | string                                           | 星火格式地址     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.getBidAndKeyPair("hello");
console.log(response);

//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    keyType: 0,
    encPrivateKey: 'your encprivate key',
    encPublicKey: 'b0656675feebec04c0d4f6d7c738be18d45086a2a275401403590190dc60b1306fb5fc',
    encAddress: 'did:bid:hello:ef29NdnwpPPXX5jnv6Uob4PJUM39bK162',
    rawPrivateKey: 'xxx',
    rawPublicKey: '75feebec04c0d4f6d7c738be18d45086a2a275401403590190dc60b1306fb5fc'
  }
}
```

### 3.1.2 离线创建账户 sm2

```
utils.address.getBidAndKeyPairBySM2(chainCode ?: string)
```

#### 请求参数

| 参数      | 类型   | 是否必填 | 备注               |
| --------- | ------ | -------- | ------------------ |
| chainCode | string | 否       | 指定待生成子链链码 |

#### 响应参数

| 类型                 | 类型                                             | 备注             |
| -------------------- | ------------------------------------------------ | ---------------- |
| errorCode            | SdkStatusCode                                    | 接口调用错误码   |
| errorDesc            | string                                           | 接口调用描述信息 |
| result.keyType       | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 账户类型         |
| result.encPrivateKey | string                                           | 星火格式私钥     |
| result.encPublicKey  | string                                           | 星火格式公钥     |
| result.rawPrivateKey | string                                           | hex 原生私钥     |
| result.rawPublicKey  | string                                           | hex 原生公钥     |
| result.encAddress    | string                                           | 星火格式地址     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.getBidAndKeyPairBySM2("hello");
console.log(response);

//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    keyType: 1,
    encPrivateKey: 'your encprivate key',
    encPublicKey: 'b07a6604142fbed0957a988b4a7158b16528f9268a0f1ad3cdba3e73d3af1fd4917f1f467c87995b0bf2495851e2c3ef2caf66cfd6ee024d6f334b62fdf517886bb56a1d',
    encAddress: 'did:bid:hello:zfWuBBH1qH4mY8Vg5WBGMbRGg9xwjQKR',
    rawPrivateKey: 'xxx',
    rawPublicKey: '04142fbed0957a988b4a7158b16528f9268a0f1ad3cdba3e73d3af1fd4917f1f467c87995b0bf2495851e2c3ef2caf66cfd6ee024d6f334b62fdf517886bb56a1d'
  }
}
```

### 3.1.3 离线创建指定类型的账户

```
utils.address.privateKeyManager(type: KeyType, chainCode ?: string)
```

#### 请求参数

| 参数      | 类型                                             | 是否必填 | 备注               |
| --------- | ------------------------------------------------ | -------- | ------------------ |
| keyType   | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 是       | 账户类型           |
| chainCode | string                                           | 否       | 指定待生成子链链码 |

#### 响应参数

| 类型                 | 类型                                             | 备注                                                                 |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| errorCode            | SdkStatusCode                                    | 接口调用错误码，当调用时type为KeyType.UNRECOGNIZED，errorCode返回100 |
| errorDesc            | string                                           | 接口调用描述信息                                                     |
| result.keyType       | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 账户类型                                                             |
| result.encPrivateKey | string                                           | 星火格式私钥                                                         |
| result.encPublicKey  | string                                           | 星火格式公钥                                                         |
| result.rawPrivateKey | string                                           | hex 原生私钥                                                         |
| result.rawPublicKey  | string                                           | hex 原生公钥                                                         |
| result.encAddress    | string                                           | 星火格式地址                                                         |

#### 示例代码

```javascript
//调用代码-正确
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.privateKeyManager(KeyType.ED25519, "hello");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    keyType: 1,
    encPrivateKey: 'your encprivate key',
    encPublicKey: 'b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14',
    encAddress: 'did:bid:hello:efVTedjtJgt3FnqdfnVSE2dTdnGvviov',
    rawPrivateKey: 'xxx',
    rawPublicKey: '3bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14'
  }
}
//调用代码-错误
const response = provider.utils.address.privateKeyManager(KeyType.UNRECOGNIZED);
console.log(response);
//响应数据
{ errorCode: 100, errorDesc: 'unsupport key type' }
```

### 3.1.4 根据给定的星火格式私钥，生成星火相关参数

```
utils.address.privateKeyManagerByKey(encPrivatekey : string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivatekey | string | 是       | 星火格式私钥 |

#### 响应参数

| 类型                 | 类型                                             | 备注             |
| -------------------- | ------------------------------------------------ | ---------------- |
| errorCode            | SdkStatusCode                                    | 接口调用错误码   |
| errorDesc            | string                                           | 接口调用描述信息 |
| result.keyType       | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 账户类型         |
| result.encPrivateKey | string                                           | 星火格式私钥     |
| result.encPublicKey  | string                                           | 星火格式公钥     |
| result.rawPrivateKey | string                                           | hex 原生私钥     |
| result.rawPublicKey  | string                                           | hex 原生公钥     |
| result.encAddress    | string                                           | 星火格式地址     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.privateKeyManagerByKey("your encprivate key");
console.log(response);
//响应数据 - 正确
{
  errorCode: 0,
  errorDesc: '',
  result: {
    keyType: 0,
    encPrivateKey: 'your encprivate key',
    encPublicKey: 'b0xxx',
    encAddress: 'did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov',
    rawPrivateKey: 'xxx',
    rawPublicKey: '3bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14'
  }
}

//响应数据 - 错误
{ errorCode: 10000, errorDesc: 'invalid privateKey' }
```

### 3.1.5 根据给定的星火格式公钥，生成星火相关参数

```
utils.address.publicKeyManager(encPublickey : string)
```

#### 请求参数

| 参数         | 类型   | 是否必填 | 备注         |
| ------------ | ------ | -------- | ------------ |
| encPublickey | string | 是       | 星火格式公钥 |

#### 响应参数

| 类型                | 类型                                             | 备注             |
| ------------------- | ------------------------------------------------ | ---------------- |
| errorCode           | SdkStatusCode                                    | 接口调用错误码   |
| errorDesc           | string                                           | 接口调用描述信息 |
| result.keyType      | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 账户类型         |
| result.encPublicKey | string                                           | 星火格式公钥     |
| result.rawPublicKey | string                                           | hex 原生公钥     |
| result.encAddress   | string                                           | 星火格式地址     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.publicKeyManager("b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    keyType: 0,
    encPublicKey: 'b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14',
    rawPublicKey: '3bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14',
    encAddress: 'did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov'
  }
}
```

### 3.1.6 根据给定的星火格式私钥，生成星火格式公钥

```
utils.address.getEncPublicKey(encPrivatekey : string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivatekey | string | 是       | 星火格式私钥 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式公钥     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.getEncPublicKey("your encprivate key");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14'
}
```

### 3.1.7 根据给定的原生公钥及公钥类型生成星火格式公钥

```
utils.address.getEncPublicKeyByRaw(type: KeyType, rawPublicKey: string)
```

#### 请求参数

| 参数         | 类型                                             | 是否必填 | 备注         |
| ------------ | ------------------------------------------------ | -------- | ------------ |
| type         | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 是       | 账户类型     |
| rawPublicKey | string                                           | 是       | hex 原生公钥 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式公钥     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.getEncPublicKeyByRaw(KeyType.ED25519,
        "3bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14'
}
```

### 3.1.8 根据给定的原生私钥及私钥类型生成星火格式私钥

```
utils.address.getEncPrivateKeyByRaw(type: KeyType, rawPrivateKey: string)
```

#### 请求参数

| 参数          | 类型                                             | 是否必填 | 备注         |
| ------------- | ------------------------------------------------ | -------- | ------------ |
| type          | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 是       | 账户类型     |
| rawPrivateKey | string                                           | 是       | hex 原生私钥 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式私钥     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.getEncPrivateKeyByRaw(KeyType.ED25519,
        "c9dc8442d3aa85b718a3ffd79902a4d2595f140880ec53e5f17bb9f9c8c6e7d2");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'your encprivate key'
}
```

### 3.1.9 根据给定的星火私钥生成原生私钥

```
utils.address.parsePrivateKey(encPrivateKey: string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivateKey | string | 是       | 星火格式私钥 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | hex 原生私钥     |

#### 代码示例

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.parsePrivateKey("your encprivate key");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'c9dc8442d3aa85b718a3ffd79902a4d2595f140880ec53e5f17bb9f9c8c6e7d2'
}
```

### 3.1.10 根据给定的星火公钥生成原生公钥

```
utils.address.parsePublicKey(encPublicKey: string)
```

#### 请求参数

| 参数         | 类型   | 是否必填 | 备注         |
| ------------ | ------ | -------- | ------------ |
| encPublicKey | string | 是       | 星火格式公钥 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | hex 原生公钥     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.parsePublicKey("b0xxx");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: '5f61ee0d776e4b139d109abf7af2f12199bd21bf44121952affdb83d2b310ecb'
}
```

### 3.1.11 根据给定的星火公钥生成星火地址

```
utils.address.publicToAddress(encPublicKey: string)
```

#### 请求参数

| 参数         | 类型   | 是否必填 | 备注         |
| ------------ | ------ | -------- | ------------ |
| encPublicKey | string | 是       | 星火格式公钥 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式地址     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.publicToAddress("b0xxx");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF'
}
```

### 3.1.12 判断给定的星火格式私钥是否合法

```
utils.address.isPrivateKey(encPrivateKey: string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivateKey | string | 是       | 星火格式私钥 |

#### 响应参数

| 类型      | 类型          | 备注                                            |
| --------- | ------------- | ----------------------------------------------- |
| errorCode | SdkStatusCode | 接口调用错误码                                  |
| errorDesc | string        | 接口调用描述信息                                |
| result    | bool          | 星火格式私钥是否合法（true:合法；false:不合法） |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.isPrivateKey("your encprivate key");
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: '', result: true }
```

### 3.1.13 判断给定的星火格式公钥是否合法

```
utils.address.isPublicKey(encPublicKey: string)
```

#### 请求参数

| 参数         | 类型   | 是否必填 | 备注         |
| ------------ | ------ | -------- | ------------ |
| encPublicKey | string | 是       | 星火格式公钥 |

#### 响应参数

| 类型      | 类型          | 备注                                            |
| --------- | ------------- | ----------------------------------------------- |
| errorCode | SdkStatusCode | 接口调用错误码                                  |
| errorDesc | string        | 接口调用描述信息                                |
| result    | bool          | 星火格式公钥是否合法（true:合法；false:不合法） |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.isPublicKey("b0xxx");
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: '', result: true }
```

### 3.1.14 星火地址转换为hex格式地址

```
utils.address.encAddressToHex(encAddress: string)
```

#### 请求参数

| 参数       | 类型   | 是否必填 | 备注         |
| ---------- | ------ | -------- | ------------ |
| encAddress | string | 是       | 星火格式地址 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | hex原生地址      |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.encAddressToHex("b0xxx");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: '0x65666b7aa1201508db005e986f892d760ff89f999f771ef4'
}
```

### 3.1.14 hex地址转换为星火格式地址

```
utils.address.hexToEncAddress(hexAddress: string)
```

#### 请求参数

| 参数       | 类型   | 是否必填 | 备注        |
| ---------- | ------ | -------- | ----------- |
| hexAddress | string | 是       | hex原生地址 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式地址     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.address.hexToEncAddress("0x7a6624286133aa44ac2a24511a5f88131c3c8b11ed609350");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'did:bid:efWAvD6cJWqAPNBy5r8hd4YcGtDto3CF'
}
```

## 3.2 星火加解密

### 3.2.1 根据给定的星火私钥及密码生成keystore字符串

```
utils.crypto.generateKeyStore(encPrivateKey:string, passwd:string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivateKey | string | 是       | 星火格式私钥 |
| passwd        | string | 是       | keystore密码 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | keystore字符串   |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.generateKeyStore("your encprivate key", "123");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: '{"cypher_text":"xxx","aesctr_iv":"xxx","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"xxx"},"version":2,"address":"did:bid:efeXUvhpPNEfxNxgx1DvkHBAYon2xGjJ"}'
}
```

### 3.2.2 根据给定的星火私钥及密码生成keystore字符串

```
utils.crypto.setSkeyStore(encPrivateKey:string, passwd:string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivateKey | string | 是       | 星火格式私钥 |
| passwd        | string | 是       | keystore密码 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | keystore字符串   |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.setSkeyStore("your encprivate key", "123");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: '{"cypher_text":"xxx","aesctr_iv":"xxx","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"xxx"},"version":2}'
}
```

### 3.2.3 根据给定的keystore内容及密钥解析星火私钥

```
utils.crypto.decipherKeyStore(keystoreContent:string, passwd:string)
```

#### 请求参数

| 参数            | 类型   | 是否必填 | 备注                |
| --------------- | ------ | -------- | ------------------- |
| keystoreContent | string | 是       | 星火keystore 字符串 |
| passwd          | string | 是       | keystore密码        |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式私钥     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.decipherKeyStore('{"cypher_text":"xxx","aesctr_iv":"xxx","scrypt_params":{"n":16384,"p":1,"r":8,"salt":"xxx"},"version":2,"address":"did:bid:zfFqez6uWDXzdmfqgmPPy2YYRnFDGtZh"}',
        "123");
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'xxx'
}
```

### 3.2.4 根据指定星火私钥及相关信息离线创建子星火账户

```
utils.crypto.generateChild(encPrivateKey:string, chainCode:string, serviceType:string, index:number)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注               |
| ------------- | ------ | -------- | ------------------ |
| encPrivateKey | string | 是       | 星火格式私钥       |
| chainCode     | string | 否       | 链码，默认为""     |
| serviceType   | string | 否       | 服务类型，默认为"" |
| index         | number | 否       | 索引，默认为0      |

#### 响应参数

| 类型              | 类型          | 备注             |
| ----------------- | ------------- | ---------------- |
| errorCode         | SdkStatusCode | 接口调用错误码   |
| errorDesc         | string        | 接口调用描述信息 |
| result.privateKey | string        | 星火格式私钥     |
| result.publicKey  | string        | 星火格式公钥     |
| result.address    | string        | 星火格式地址     |
| result.path       | string        | 子星火账户盐值   |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.generateChild("xxx",
        "",
        "test",
        0,);
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: {
    privateKey: 'your encprivate key',
    publicKey: 'b07a66049b5112d102c83f43b3494f410271a69559d823d2b0ee9467d7679fdb766f4977d2c25f1b9d9e4553b88fcf918588741c178cb18dbdcc914f70a79795b7b40d18',
    address: 'did:bid:zfVuGTBmr5VNvwfqwBRVkmSkCRGiMoFJ',
    path: '/0//test/0'
  }
}
```

### 3.2.5 使用给定的星火私钥对数据进行签名

```
utils.crypto.sign(encPrivateKey:string, message:string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注                      |
| ------------- | ------ | -------- | ------------------------- |
| encPrivateKey | string | 是       | 星火格式私钥              |
| message       | string | 是       | 待签名消息，需为hex字符串 |

#### 响应参数

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火私钥签名数据 |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.sign("xxx",
        "0x6080",);
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: '5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f'
}
```

### 3.2.6 根据给定的消息、签名及星火公钥验证签名数据

```
utils.crypto.verify(encPublicKey:string, message:string, signature:string)
```

#### 请求参数

| 参数         | 类型   | 是否必填 | 备注                      |
| ------------ | ------ | -------- | ------------------------- |
| encPublicKey | string | 是       | 星火格式公钥              |
| message      | string | 是       | 待签名消息，需为hex字符串 |
| signature    | string | 是       | 星火私钥签名数据          |

#### 响应参数

| 类型      | 类型          | 备注                                        |
| --------- | ------------- | ------------------------------------------- |
| errorCode | SdkStatusCode | 接口调用错误码                              |
| errorDesc | string        | 接口调用描述信息                            |
| result    | bool          | 星火验签是否合法（true:合法；false:不合法） |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.verify("b065663bbce79ee9ca5b6e3933f4aa3909832f225dc63ac52415d110c49ddad2c20d14",
        "0x6080",
   "5835bdb2fbedb0dbacbfcb2fc040794a8ea05bdf1149903898401063a6d94fa9973a8a9fa3cec2df8e7b3435e5879fb83cd0621d39c68f3e829287118fee0b0f",);
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: '', result: true }
```

### 3.2.7 根据给定的星火私钥获取私钥类型

```
utils.crypto.getCryptoTypeFromPrivKey(encPrivateKey:string)
```

#### 请求参数

| 参数          | 类型   | 是否必填 | 备注         |
| ------------- | ------ | -------- | ------------ |
| encPrivateKey | string | 是       | 星火格式私钥 |

#### 响应参数

| 类型      | 类型                                             | 备注             |
| --------- | ------------------------------------------------ | ---------------- |
| errorCode | SdkStatusCode                                    | 接口调用错误码   |
| errorDesc | string                                           | 接口调用描述信息 |
| result    | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 星火私钥账户类型 |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.getCryptoTypeFromPrivKey("xxx",);
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: '', result: 1 }
```

### 3.2.8 根据给定的星火公钥获取公钥类型

```
utils.crypto.getCryptoTypeFromPubKey(encPublicKey:string)
```

#### 请求参数

| 参数         | 类型   | 是否必填 | 备注         |
| ------------ | ------ | -------- | ------------ |
| encPublicKey | string | 是       | 星火格式公钥 |

#### 响应参数

| 类型      | 类型                                             | 备注             |
| --------- | ------------------------------------------------ | ---------------- |
| errorCode | SdkStatusCode                                    | 接口调用错误码   |
| errorDesc | string                                           | 接口调用描述信息 |
| result    | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 星火公钥账户类型 |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.getCryptoTypeFromPubKey("b07a6604d964f18cc1ac9bc73189c46a80934f3e94cc011af1907ede771f61b2c0ae0e55e23e05a2fd00b341afd2eb0927d7588189fdace4b1327e6bb22bc232a772d723",);
console.log(response);
//响应数据
{ errorCode: 0, errorDesc: '', result: 1 }
```

## 3.3 助记词

### 3.3.1 根据给定的星火账户类型、助记词解析出星火格式私钥

```
utils.mnemonics.privKeyFromMCodeAndCrypto(type: KeyType, mnemonics: string)
```

#### 请求参数

| 参数      | 类型                                             | 是否必填 | 备注         |
| --------- | ------------------------------------------------ | -------- | ------------ |
| type      | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 是       | 账户类型     |
| mnemonics | string                                           | 是       | 助记词字符串 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 星火格式私钥     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.privKeyFromMCodeAndCrypto(KeyType.SM2,
        "avoid abandon advice army abandon abandon above abandon abandon abandon advice achieve",);
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'your encprivate key'
}
```

### 3.3.2 根据给定的星火账户类型、熵值及语言类型生成助记词

```
utils.mnemonics.generateMnemonicCode(type: KeyType, entropy: string, language: string)
```

#### 请求参数

| 参数     | 类型                                             | 是否必填 | 备注                             |
| -------- | ------------------------------------------------ | -------- | -------------------------------- |
| type     | KeyType(ED25519 = 0, SM2 = 1, UNRECOGNIZED = -1) | 是       | 账户类型                         |
| entropy  | string                                           | 是       | 熵值                             |
| language | string（"chinese" "english"）                    | 是       | 支持的语言类型，仅支持中文和英文 |

#### 响应参数

| 类型      | 类型          | 备注             |
| --------- | ------------- | ---------------- |
| errorCode | SdkStatusCode | 接口调用错误码   |
| errorDesc | string        | 接口调用描述信息 |
| result    | string        | 助记词字符串     |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
const response = provider.utils.crypto.generateMnemonicCode(KeyType.ED25519,
        "10000010060000000020000000001000",
        "english",);
console.log(response);
//响应数据
{
  errorCode: 0,
  errorDesc: '',
  result: 'avoid abandon advice army abandon abandon above abandon abandon abandon advice achieve'
}
```

## 3.4 ABI编解码 （ABI编解码直接使用以太坊相关代码，测试正常功能+address可正常编解码即可）

### 3.4.1 ABI编码

```
utils.abi.encode(types: ReadonlyArray<string>, values: ReadonlyArray<any>)
```

#### 请求参数

| 参数   | 类型                  | 是否必填 | 备注         |
| ------ | --------------------- | -------- | ------------ |
| types  | ReadonlyArray<string> | 是       | 参数类型数组 |
| values | ReadonlyArray<any>    | 是       | 参数值数组   |

#### 响应参数

| 类型   | 备注                                            |
| ------ | ----------------------------------------------- |
| string | ABI编码hex字符串 (异常场景需通过try catch 捕获) |

#### 示例代码

```javascript
//调用代码
import {
  SignerByBop,
  Config,
  ProviderByBop,
  BopInterface,
} from "@caict/bop-typescript-sdk";

const config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");
const provider = new ProviderByBop(new BopInterface(config));
try {
  const response = provider.utils.abi.encode(
    ["address", "uint256"],
    ["did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov", 10],
  );
  console.log(response);
} catch (error) {
  console.log(error.code);
}

//响应代码 - 成功
0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a;
//响应代码 - 失败
INVALID_ARGUMENT;
```

### 3.4.2 ABI解码

```
utils.abi.decode(types: ReadonlyArray<string>, values: ReadonlyArray<any>)
```

#### 请求参数

| 参数  | 类型                  | 是否必填 | 备注                        |
| ----- | --------------------- | -------- | --------------------------- |
| types | ReadonlyArray<string> | 是       | 参数类型数组                |
| data  | string                | 是       | abi 编码后字符串，hex字符串 |

#### 响应参数

| 类型                | 备注    |
| ------------------- | ------- |
| [key: string] : any | 数据map |

#### 示例代码

```javascript
//调用代码
import { SignerByBop, Config, ProviderByBop, BopInterface } from '@caict/bop-typescript-sdk';
const apiKey = "xxx";
const apiSecret = "xxx";
const config = new Config(
    "https://bif-mainnet.bitfactory.cn",
      apiKey,
      apiSecret,
    );
const provider = new ProviderByBop(new BopInterface(config));
try {
    const response = provider.utils.abi.decode(["address", "uint256"],0x0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d0000000000000000656668db810f448b4119c8e1dad481fdbf352f74f4e5199d000000000000000000000000000000000000000000000000000000000000000a,);
    console.log(response);
} catch (error) {
    console.log(error.code)
}

//响应代码 - 成功
[
  [
    'did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov',
    'did:bid:efVTedjtJgt3FnqdfnVSE2dTdnGvviov'
  ],
  BigNumber { _hex: '0x0a', _isBigNumber: true }
]
```

# 四 消息订阅

SDK通过开放平台提供的接口提供订阅功能，目前支持四种数据类型订阅，分别为：

1. 区块头订阅
2. 指定BID交易订阅
3. TLOG订阅
4. 丢弃交易订阅

后续订阅方法均通过回调函数进行处理，具体方法如下：

```
interface Callback {
  (data: any): void;
}
```

## 4.1 订阅实例构建

SDK通过WsConfig，加载开放平台ws url数据；通过WsProviderByBop构建ws实例。构建完成后，通过waitForReady等待ws连接完成。

```javascript
import {
  WsConfig,
  WsProviderByBop,
  bopwsprotocol,
} from "@caict/bop-typescript-sdk";

// 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
const config = new WsConfig("https://bif-mainnet.bitfactory.cn/bif/subscribe"); // 替换为实际的 WebSocket 地址
const bopWs = new BopWsInterface(config.url, config.heartBeatInterval);
```

## 4.2 订阅区块头

```
provider.bop.subscribe(type: bopwsprotocol.MessageType, callback: Callback)
```

### 示例代码

```javascript
import {
  WsConfig,
  WsProviderByBop,
  bopwsprotocol,
} from "@caict/bop-typescript-sdk";

// 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
const config = new WsConfig("ws://bif-mainnet.bitfactory.cn/bif/subscribe"); // 替换为实际的 WebSocket 地址
const bopWs = new WsProviderByBop(config);
const subscriptionBlockHeaderId = await bopWs.bop.subscribe(
  bopwsprotocol.MessageType.BLOCK_HEADER,
  (data) => {
    let message = LedgerHeaderMessage.fromJSON(data);
    console.log("dealBlockHeader ing...", message);
  },
);
console.log("Subscription BlockHeader ID:", subscriptionBlockHeaderId);
```

## 4.3 订阅BID

```
provider.bop.subscribe(type: bopwsprotocol.MessageType, callback: Callback, accounts: string[])
```

### 示例代码

```javascript
import {
  WsConfig,
  WsProviderByBop,
  bopwsprotocol,
} from "@caict/bop-typescript-sdk";

// 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
const config = new WsConfig("ws://bif-mainnet.bitfactory.cn/bif/subscribe"); // 替换为实际的 WebSocket 地址
const bopWs = new WsProviderByBop(config);
const subscriptionBidTransactionId = await bopWs.bop.subscribe(
  MessageType.BID_TRANSACTION,
  (data) => {
    let val = bopwsprotocol.TransactionEnvStoreMessage.fromJSON(data);
    console.log("dealtransaction ing...", val);
  },
  ["did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK"],
);

console.log("Subscription transaction ID:", subscriptionBidTransactionId);
```

## 4.4 订阅TLOG

```
provider.bop.subscribe(type: bopwsprotocol.MessageType, callback: Callback, accounts: string[])
```

### 示例代码

```javascript
import {
  WsConfig,
  WsProviderByBop,
  bopwsprotocol,
} from "@caict/bop-typescript-sdk";

// 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
const config = new WsConfig("ws://bif-mainnet.bitfactory.cn/bif/subscribe"); // 替换为实际的 WebSocket 地址
const bopWs = new WsProviderByBop(config);
const subscriptionTlogTransactionId = await bopWs.bop.subscribe(
  MessageType.TLOG,
  (data) => {
    let val = bopwsprotocol.TransactionEnvStoreMessage.fromJSON(data);
    console.log("deal tlogTransaction ing...", val);
  },
  ["did:bid:efhj9cgStGJckhLwHZefYS9Yje38NVuP"],
);
console.log("Subscription transaction ID:", subscriptionTlogTransactionId);
```

## 4.5 订阅丢弃交易

```
provider.bop.subscribe(type: bopwsprotocol.MessageType, callback: Callback, accounts: string[])
```

### 示例代码

```javascript
import {
  WsConfig,
  WsProviderByBop,
  bopwsprotocol,
} from "@caict/bop-typescript-sdk";

// 创建 BopWsInterface 实例，这里假设已经有 bopWs 实例化代码，可根据实际情况修改
const config = new WsConfig("ws://bif-mainnet.bitfactory.cn/bif/subscribe"); // 替换为实际的 WebSocket 地址
const bopWs = new WsProviderByBop(config);
const subscriptionDiscardTransactionId = await bopWs.bop.subscribe(
  MessageType.DISCARD_TRANSACTION,
  (data) => {
    let val = bopwsprotocol.DropTxMessage.fromJSON(data);
    console.log("deal discardTransaction ing...", val);
  },
  ["did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK"],
);
console.log("Subscription transaction ID:", subscriptionDiscardTransactionId);
```

# 五 全局定义

## 5.1 错误码定义-SdkStatusCode

| 错误码 | 描述                                                                  | 备注            |                            |
| ------ | --------------------------------------------------------------------- | --------------- | -------------------------- |
| 0      | 操作成功                                                              |                 | 通用                       |
| -1     | 未知错误                                                              |                 |                            |
| 10000  | 私钥格式异常                                                          |                 | utils 错误码               |
| 10001  | 公钥格式异常                                                          |                 |                            |
| 10002  | 地址格式异常                                                          |                 |                            |
| 10003  | 密码格式异常                                                          |                 |                            |
| 10004  | keyStore格式异常                                                      |                 |                            |
| 10005  | 密码与keyStore文件不匹配                                              |                 |                            |
| 10006  | 消息格式异常                                                          |                 |                            |
| 10007  | 签名不合法                                                            |                 |                            |
| 10008  | 熵值格式异常                                                          |                 |                            |
| 10009  | 助记词格式异常                                                        |                 |                            |
| 10010  | 不支持该账户类型                                                      |                 |                            |
| 10011  | 非法chaincode                                                         |                 |                            |
| 10012  | 非法serviceType                                                       |                 |                            |
| 10013  | 非法index                                                             |                 |                            |
| 20000  | Signer未连接Provider                                                  |                 | signer错误码               |
| 20001  | 未设置provider                                                        |                 |                            |
| 11002  | 源地址无效错误                                                        |                 | provider构建离线交易错误码 |
| 11003  | 目标地址无效错误                                                      |                 |                            |
| 11004  | 初始余额无效错误                                                      |                 |                            |
| 11006  | 地址格式错误                                                          |                 |                            |
| 11008  | 元数据不是16进制字符串错误                                            |                 |                            |
| 11011  | 数据键无效错误                                                        |                 |                            |
| 11012  | 数据值无效错误                                                        |                 |                            |
| 11013  | 数据版本无效错误                                                      |                 |                            |
| 11015  | 主权重无效错误                                                        |                 |                            |
| 11016  | 签名者地址无效错误                                                    |                 |                            |
| 11017  | 签名者权重无效错误                                                    |                 |                            |
| 11018  | 交易阈值无效错误                                                      |                 |                            |
| 11019  | 操作类型无效错误                                                      |                 |                            |
| 11020  | 类型阈值无效错误                                                      |                 |                            |
| 11024  | amount值非法                                                          |                 |                            |
| 11037  | 合约地址无效错误                                                      |                 |                            |
| 11038  | 目的地址不是合约账户错误                                              |                 |                            |
| 11041  | 发送者地址无效错误                                                    |                 |                            |
| 11044  | payload为空                                                           |                 |                            |
| 11047  | 合约类型无效错误                                                      | contract_type   |                            |
| 11048  | nonce无效错误                                                         | nonce值非法     |                            |
| 11049  | 气体价格无效错误                                                      | gasprice        |                            |
| 11050  | 费用限制无效错误                                                      | feelimit        |                            |
| 11051  | 操作不能为空错误                                                      | operations      |                            |
| 11052  | 最高账本序列号无效错误                                                | ceil_ledger_seq |                            |
| 12008  | 随机数类型无效错误                                                    | nonce_type 异常 |                            |
| 1      | 开放平台内部错误                                                      |                 | 底层链相关错误码           |
| 2      | 参数异常                                                              |                 |                            |
| 3      | 对象已存在                                                            |                 |                            |
| 4      | 对象不存在                                                            |                 |                            |
| 5      | 交易超时                                                              |                 |                            |
| 6      | 账户禁止使用                                                          |                 |                            |
| 7      | 数学计算溢出                                                          |                 |                            |
| 90     | 公钥非法                                                              |                 |                            |
| 91     | 私钥非法                                                              |                 |                            |
| 93     | 签名权重不足，达不到操作门限                                          |                 |                            |
| 94     | 地址非法                                                              |                 |                            |
| 97     | 交易确实操作                                                          |                 |                            |
| 98     | 单比交易超过100个操作                                                 |                 |                            |
| 99     | nonce异常                                                             |                 |                            |
| 100    | 余额不足                                                              |                 |                            |
| 101    | 源和目的账户相等                                                      |                 |                            |
| 102    | 创建账户操作，目的账户已存在                                          |                 |                            |
| 103    | 账户不存在                                                            |                 |                            |
| 106    | 创建账号初始化资产小于配置文件中最小费用                              |                 |                            |
| 111    | 费用不足                                                              |                 |                            |
| 120    | 权重值不在有效范围                                                    |                 |                            |
| 121    | 门限值不在有效范围                                                    |                 |                            |
| 144    | metadata的version版本号不与已有的匹配                                 |                 |                            |
| 146    | 交易数据大小超出上限                                                  |                 |                            |
| 151    | 合约执行失败                                                          |                 |                            |
| 152    | 合约语法分析失败                                                      |                 |                            |
| 153    | 合约递归深度超出上限                                                  |                 |                            |
| 154    | 合约产生的交易超出上限                                                |                 |                            |
| 155    | 合约执行超时                                                          |                 |                            |
| 156    | 目标地址非合约账户                                                    |                 |                            |
| 160    | 插入交易缓存队列失败                                                  |                 |                            |
| 161    | 禁止转移星火令                                                        |                 |                            |
| 183    | 交易nonce重复，nonce在缓存中 (需重新发送交易)                         |                 |                            |
| 184    | 交易最大区块数错误，小于当前区块高度 (需要重新获取区块高度序列化接口) |                 |                            |
| -3     | 参数类型解析异常                                                      |                 | 开放平台错误码             |
| -6     | 无效参数异常                                                          |                 |                            |
| -7     | 请求类型异常                                                          |                 |                            |
| -9     | 统一验证参数异常                                                      |                 |                            |
| 405    | 不支持当前请求类型                                                    |                 |                            |
| 1013   | 请求的API不存在                                                       |                 |                            |
| 1015   | 请求的API已停用                                                       |                 |                            |
| 1016   | timeout                                                               |                 |                            |
| 1101   | 交易数据中包含敏感词汇                                                |                 |                            |
| 1102   | 您的合约地址未在项目合约白名单                                        |                 |                            |
| 1103   | 请检查交易数据是否合规                                                |                 |                            |
| 1105   | 交易类型不存在                                                        |                 |                            |
| 1106   | 远程调用失败                                                          |                 |                            |
| 1107   | 交易池类型不存在                                                      |                 |                            |
| 1108   | 参数超出限制                                                          |                 |                            |
| 1109   | 非法参数                                                              |                 |                            |
| 1110   | 当bid 或 tx_id为不为空时，tx_type为必填                               |                 |                            |
| 1111   | 业务参数不能为空                                                      |                 |                            |
| 1122   | API Key不存在                                                         |                 |                            |
| 1200   | 每秒请求频次超出限制                                                  |                 |                            |
| 1201   | 每日请求频次超出限制                                                  |                 |                            |
| 1202   | 您已无资源可用                                                        |                 |                            |
| 1203   | 项目已被删除                                                          |                 |                            |
| 1204   | 项目已禁用                                                            |                 |                            |
| 1205   | 项目被拉入黑名单                                                      |                 |                            |
| 1206   | 账户被拉入黑名单                                                      |                 |                            |
| 1207   | 请在Header中传入API Secret                                            |                 |                            |
| 1208   | 传入的API Secret与项目不匹配                                          |                 |                            |
| 1209   | 增强交易服务未开启                                                    |                 |                            |
| 1210   | 项目类型与API类型不一致                                               |                 |                            |
| 1211   | 当前项目还没有主网权限                                                |                 |                            |
| 1311   | 平台队列中                                                            |                 |                            |
| 1312   | 交易已提交到星火链                                                    |                 |                            |
| 1313   | 平台交易池超时丢弃                                                    |                 |                            |
| 1314   | 项目暂无交易池(增强交易)                                              |                 |                            |
| 1315   | 交易已存在                                                            |                 |                            |
| 1316   | 星火链超时丢弃                                                        |                 |                            |
| 1317   | 交易操作频繁                                                          |                 |                            |
| 9999   | url 连接异常                                                          |                 |                            |

## 5.2 通用结构定义

### 5.2.1 Signature

| 参数      | 类型   | 备注       |
| --------- | ------ | ---------- |
| publicKey | string | 签名者公钥 |
| signData  | string | 签名数据   |

### 5.2.2 Contract

| 参数    | 类型   | 备注                                                  |
| ------- | ------ | ----------------------------------------------------- |
| type    | number | 合约类型：<br />0:javascript<br />1:evm<br />2:system |
| payload | string | 合约代码                                              |

### 5.2.3 AccountPrivilege

| 参数                                   | 类型   | 备注                                                                                              |
| -------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| masterWeight                           | number | 本地址私钥拥有的权限值                                                                            |
| signers                                | array  | Signer                                                                                            |
| signers[x].address                     | string | 可操作当前账户的地址                                                                              |
| signers[x].weight                      | number | 对应地址可操作的权重                                                                              |
| thresholds                             | object |                                                                                                   |
| thresholds.txThreshold                 | number | 发起交易需要的权限值                                                                              |
| thresholds.typeThresholds              | array  |                                                                                                   |
| thresholds.typeThresholds[x].type      | number | 操作类型：<br />1: create_account; <br />4:set_metadata; <br />7:pay_coin; <br />9:set_privilege; |
| thresholds.typeThresholds[x].threshold | number | 可选该操作需要的权重值                                                                            |

### 5.2.4 KeyPair

| 参数    | 类型   | 备注    |
| ------- | ------ | ------- |
| key     | string | key     |
| value   | string | value   |
| version | number | version |

### OperationCreateAccount

| 参数        | 类型   | 备注             |
| ----------- | ------ | ---------------- |
| destAddress | string | 目的合约地址     |
| contract    | object | Contract         |
| priv        | object | AccountPrivilege |
| metadatas   | array  | KeyPair          |
| initBalance | number | 初始余额         |
| initInput   | string | 初始输入         |

### 5.2.5 OperationPayCoin

| 参数        | 类型   | 备注         |
| ----------- | ------ | ------------ |
| destAddress | string | 目的账户地址 |
| amount      | number | 转账金额     |
| input       | string | 合约调用参数 |

### 5.2.6 OperationSetMetadata

| 参数       | 类型   | 备注     |
| ---------- | ------ | -------- |
| key        | string | key      |
| value      | string | value    |
| version    | number | version  |
| deleteFlag | bool   | 是否删除 |

### 5.2.7 OperationUpgradeContract

| 参数        | 类型   | 备注                                                  |
| ----------- | ------ | ----------------------------------------------------- |
| destAddress | string | 目的账户地址                                          |
| payload     | string | 待更新的合约代码                                      |
| type        | number | 合约类型：<br />0:javascript<br />1:evm<br />2:system |

### 5.2.8 OperationSetSignerWeight

| 参数               | 类型   | 备注                   |
| ------------------ | ------ | ---------------------- |
| masterWeight       | number | 本地址私钥拥有的权限值 |
| signers            | array  | Signer                 |
| signers[x].address | string | 可操作当前账户的地址   |
| signers[x].weight  | number | 对应地址可操作的权重   |

### 5.2.9 OperationSetThreshold

| 参数                        | 类型   | 备注                                                                                              |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| txThreshold                 | number | 发起交易需要的权限值                                                                              |
| typeThresholds              | array  |                                                                                                   |
| typeThresholds[x].type      | number | 操作类型：<br />1: create_account; <br />4:set_metadata; <br />7:pay_coin; <br />9:set_privilege; |
| typeThresholds[x].threshold | number | 可选该操作需要的权重值                                                                            |

### 5.2.10 OperationLog

| 参数   | 类型          | 备注      |
| ------ | ------------- | --------- |
| topic  | string        | 日志topic |
| datas  | array<string> | 日志数据  |
| topics | array<string> | topic数据 |

### 5.2.11 OperationSetPrivilege

| 参数                        | 类型          | 备注                                                                                              |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| masterWeight                | string        | 本地址私钥拥有的权限值                                                                            |
| signers                     | array<Signer> |                                                                                                   |
| txThreshold                 | string        | 发起交易需要的权限值                                                                              |
| typeThresholds              | array         |                                                                                                   |
| typeThresholds[x].type      | number        | 操作类型：<br />1: create_account; <br />4:set_metadata; <br />7:pay_coin; <br />9:set_privilege; |
| typeThresholds[x].threshold | number        | 可选该操作需要的权重值                                                                            |

#
