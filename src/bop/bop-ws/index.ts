import {
  DropTxMessage,
  LedgerHeaderMessage,
  MessageType,
  SubscribeRequest,
  TransactionEnvStoreMessage,
  messageTypeFromJSON,
} from "../bop-proto/bop-ws";

import ReconnectingWebSocket from "reconnecting-websocket";
import WS from "ws";
import crypto from "crypto";

export class WsConfig {
  constructor(
    public readonly url: string,
    public readonly heartBeatInterval: number = 5000, // 默认值为5000毫秒（5秒）
  ) {}
}

interface Callback {
  (data: any): void;
}

// 排除心跳和错误消息的 MessageType
type SubscribableMessageType = Exclude<
  MessageType,
  MessageType.HEARTBEAT | MessageType.ERROR
>;

// 订阅信息结构
interface Subscription {
  id: string;
  callback: Callback;
  accounts?: string[]; // 合并 message 和 sourceAccounts 为 accounts
  type: SubscribableMessageType;
}

export class BopWsInterface {
  private readonly interval: number;
  private heartbeatInterval?: NodeJS.Timeout; // 用于存储心跳定时器的ID
  private wsUrl: string;

  private socket: ReconnectingWebSocket | null;

  // 调整 subscriptions 结构为 Map，key 为 id
  private subscriptions: Map<string, Subscription> = new Map();

  private readyPromise: Promise<void>;
  private readyResolve: () => void;

  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectWaitTime = 5000; // 重连等待时间，单位：毫秒
  private connectionTimeout = 10000; // 连接超时时间，单位：毫秒

  // 新增标志位，用于区分主动断开和异常断开
  private isManuallyDisconnected = false;

  constructor(url: string, interval: number) {
    this.wsUrl = url;
    this.interval = interval;

    this.resetReadyState();

    this.createWebSocket();
  }

  public async waitForReady(): Promise<void> {
    await this.readyPromise;
  }

  private setupEventListeners(): void {
    if (this.socket) {
      this.socket.addEventListener("open", (event: Event) => {
        console.log("WebSocket connection opened");
        this.readyResolve(); // 解决 Promise
        this.reconnectAttempts = 0; // 重置重连次数
        this.startHeartbeat();
        this.resubscribeAfterReconnect(); // 重连成功后重新订阅
        this.isManuallyDisconnected = false; // 连接成功后重置标志位
      });

      this.socket.addEventListener("message", (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as {
            type: MessageType;
            message: any;
          };
          console.log(
            "ws: type:",
            data.type,
            ",message:",
            JSON.stringify(data.message),
          );
          for (const [_, subscription] of this.subscriptions) {
            if (subscription.type === data.type) {
              if (
                MessageType.BLOCK_HEADER !== data.type &&
                subscription.accounts &&
                subscription.accounts.length !== 0
              ) {
                // 解析交易结构，这里假设交易结构中有一个字段叫 sourceAccount 表示源账户地址
                let sourceAccount = "";
                if (
                  data.type === MessageType.BID_TRANSACTION ||
                  data.type === MessageType.TLOG
                ) {
                  sourceAccount =
                    data.message.transaction_env.transaction.source_address;
                }
                if (data.type === MessageType.DISCARD_TRANSACTION) {
                  const tx = JSON.parse(data.message.tx);
                  sourceAccount = tx.transaction.source_address;
                }
                console.log("ws type:", data.type, "source:", sourceAccount);

                if (subscription.accounts.includes(sourceAccount)) {
                  console.log(
                    "ws include source_address:",
                    sourceAccount,
                    "id:",
                    subscription.id,
                  );
                  subscription.callback(data.message);
                }
              } else {
                //不包含accounts的订阅全部返回
                subscription.callback(data.message);
              }
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });

      this.socket.addEventListener("close", (event: CloseEvent) => {
        console.log("WebSocket connection closed");
        this.stopHeartbeat();
        if (!this.isManuallyDisconnected) {
          this.handleConnectionClose();
        }
      });

      this.socket.addEventListener("error", (event: ErrorEvent) => {
        console.error("WebSocket error:", event.message);
        if (!this.isManuallyDisconnected) {
          this.handleConnectionClose();
        }
      });
    }
  }

  private handleConnectionClose() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      console.log(
        `Attempting to reconnect (attempt ${this.reconnectAttempts + 1}) in ${this.reconnectWaitTime / 1000} seconds...`,
      );
      setTimeout(() => {
        this.reconnectAttempts++;
        this.resetReadyState();
        this.closeWebSocket();
        this.createWebSocket();
      }, this.reconnectWaitTime);
    } else {
      console.log("Max reconnect attempts reached. Exiting.");
    }
  }

  // 开始发送心跳消息
  private startHeartbeat(): void {
    console.log("start heart beat");
    if (this.heartbeatInterval === undefined) {
      this.heartbeatInterval = setInterval(() => {
        this.sendHeartbeat();
      }, this.interval);
    }
  }

  // 停止发送心跳消息
  private stopHeartbeat(): void {
    if (this.heartbeatInterval !== undefined) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  private sendHeartbeat(): void {
    if (this.socket && this.socket.readyState === ReconnectingWebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({ type: MessageType.HEARTBEAT, message: "ping" }),
      );
    }
  }

  private startsWithDidBid(identifier: string): boolean {
    const regex = /^(did:bid:ef|did:bid:zf)/;
    return regex.test(identifier);
  }

  private async sendMessage(
    type: MessageType,
    accounts?: string[],
  ): Promise<void> {
    await this.waitForReady(); // 等待连接就绪
    // 如果连接仍然不是开放的（尽管我们刚刚尝试连接），则抛出异常
    if (!this.socket || this.socket.readyState !== ReconnectingWebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    const payload = { type, message: accounts || [] };
    this.socket.send(JSON.stringify(payload));
  }

  public async subscribe(
    type: SubscribableMessageType,
    callback: Callback,
    accounts?: string[], // 合并参数
  ): Promise<string> {
    await this.waitForReady(); // 等待连接就绪
    const subscriptionId = this.generateSubscriptionId();
    const subscription: Subscription = {
      id: subscriptionId,
      callback,
      accounts,
      type,
    };
    if (accounts && accounts.length !== 0) {
      for (const account of accounts) {
        if (!this.startsWithDidBid(account)) {
          return "-1";
        }
      }
    }

    this.subscriptions.set(subscriptionId, subscription);
    await this.sendMessage(type, accounts);
    return subscriptionId;
  }

  public async unsubscribe(
    type: SubscribableMessageType,
    subscriptionId: string,
  ): Promise<void> {
    await this.waitForReady(); // 等待连接就绪
    if (this.subscriptions.has(subscriptionId)) {
      const subscription = this.subscriptions.get(subscriptionId)!;
      if (subscription.type === type) {
        this.subscriptions.delete(subscriptionId);
      }
    }
  }

  public async unsubscribeAll(): Promise<void> {
    console.log("unsubscribeAll");
    await this.waitForReady(); // 等待连接就绪
    this.subscriptions.clear();
  }

  public async disconnect(): Promise<void> {
    this.isManuallyDisconnected = true; // 标记为主动断开
    await this.unsubscribeAll(); // 客户端主动退出前，取消所有订阅
    this.closeWebSocket();
    this.socket = null;
    // 清除心跳定时器
    this.stopHeartbeat();
  }

  private generateSubscriptionId(): string {
    // 获取当前时间戳
    const timestamp = Date.now().toString();
    // 生成随机数
    const randomValue = Math.random().toString();
    // 组合时间戳和随机数
    const input = timestamp + randomValue;
    // 创建 sha256 哈希对象
    const hash = crypto.createHash("sha256");
    // 更新哈希对象的输入
    hash.update(input);
    // 计算哈希值并转换为十六进制字符串
    const hashValue = hash.digest("hex");
    // 截取前 9 位作为订阅 ID
    return hashValue.substr(0, 9);
  }

  private resetReadyState() {
    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });
  }

  private createWebSocket() {
    const options = {
      WebSocket: WS, // custom WebSocket constructor
      connectionTimeout: this.connectionTimeout,
      maxRetries: 10,
    };
    this.socket = new ReconnectingWebSocket(this.wsUrl, [], options);
    this.setupEventListeners();
  }

  private closeWebSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }

  private async resubscribeAfterReconnect() {
    console.log("resubscribeAfterReconnect", this.subscriptions.size);
    for (const [_, subscription] of this.subscriptions) {
      console.log("resubscribeAfterReconnect ID:", subscription.id);
      await this.sendMessage(subscription.type, subscription.accounts);
    }
  }
}
