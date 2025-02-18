import {
  GetChainInfoResponse,
  GetNetworkIdResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { BopInterface } from "../../../bop/bop-base";
import { chain } from "../abstract-service/abstract-chain";
import * as trans from "./helper";

export class ChainByBop extends chain {
  readonly bopInterface: BopInterface;
  constructor(bop: BopInterface) {
    super();
    this.bopInterface = bop;
  }

  public async getChainInfo(): Promise<GetChainInfoResponse> {
    return trans.ChainHelloToChainInfo(
      await this.bopInterface.callService("base_hello"),
    );
  }

  public async getNetworkId(): Promise<GetNetworkIdResponse> {
    return trans.ChainHelloToNetworkId(
      await this.bopInterface.callService("base_hello"),
    );
  }
}
