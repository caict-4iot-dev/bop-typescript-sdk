import {
  GetChainInfoResponse,
  GetNetworkIdResponse,
} from "bop-sdk/proto/bop-sdk-interface";

export abstract class chain {
  abstract getChainInfo(): Promise<GetChainInfoResponse>;
  abstract getNetworkId(): Promise<GetNetworkIdResponse>;
}
