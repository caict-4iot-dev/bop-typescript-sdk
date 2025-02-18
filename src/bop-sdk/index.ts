import { SignerByBop } from "./interface/signer";
import { ProviderByBop } from "./interface/provider";
import { WsProviderByBop } from "./interface/provider-ws";
import { defaultUtils, Interface } from "./utils";
import * as sdkProtocolCommon from "./proto/bop-sdk-common";
import * as sdkProtocolInterface from "./proto/bop-sdk-interface";
import * as sdkProtocolUtils from "./proto/bop-sdk-utils";

const sdkprotocol = {
  common: sdkProtocolCommon,
  interface: sdkProtocolInterface,
  utils: sdkProtocolUtils,
};

export {
  SignerByBop,
  ProviderByBop,
  defaultUtils,
  Interface,
  sdkprotocol,
  WsProviderByBop,
};
