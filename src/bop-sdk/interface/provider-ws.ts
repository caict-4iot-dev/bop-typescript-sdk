import { WsConfig, BopWsInterface } from "../../bop/bop-ws";

//未拓展新功能，直接接入Bop平台的ws
export class WsProviderByBop {
  public bop: BopWsInterface;

  constructor(config: WsConfig) {
    this.bop = new BopWsInterface(config.url, config.heartBeatInterval);
  }
}
