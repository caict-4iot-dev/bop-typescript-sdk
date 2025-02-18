import { PermitService } from "./permit";
import { BaseService } from "./base";

export class Config {
  constructor(
    public readonly host: string,
    public readonly apiKey: string,
    public readonly apiSecret: string,
  ) {}
}

class ServiceFactory {
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  createPermitService(): PermitService {
    return new PermitService(this.config.host);
  }

  createBaseService(): BaseService {
    return new BaseService(
      this.config.host,
      this.config.apiKey,
      this.config.apiSecret,
    );
  }
}

export class BopInterface {
  private permitService: PermitService;
  private baseService: BaseService;

  constructor(config: Config) {
    const factory = new ServiceFactory(config);
    this.permitService = factory.createPermitService();
    this.baseService = factory.createBaseService();
  }

  public getPermitService(): PermitService {
    return this.permitService;
  }

  public getBaseService(): BaseService {
    return this.baseService;
  }

  // 调用服务方法
  public callService(methodName: string, ...args: any[]): any {
    const [prefix, functionName] = methodName.split("_", 2);

    switch (prefix) {
      case "permit":
        return this.callPermitService(functionName, ...args);
      case "base":
        return this.callBaseService(functionName, ...args);
      default:
        throw new Error(`Unknown service prefix: ${prefix}`);
    }
  }

  // 调用 PermitService 的方法
  private callPermitService(methodName: string, ...args: any[]): any {
    const method = this.permitService[methodName] as Function;
    if (!method) {
      throw new Error(`Method ${methodName} not found in PermitService`);
    }
    const boundMethod = method.bind(this.permitService);
    return boundMethod(...args);
  }

  // 调用 BaseService 的方法
  private callBaseService(methodName: string, ...args: any[]): any {
    const method = this.baseService[methodName] as Function;
    if (!method) {
      throw new Error(`Method ${methodName} not found in BaseService`);
    }
    const boundMethod = method.bind(this.baseService);
    return boundMethod(...args);
  }
}
