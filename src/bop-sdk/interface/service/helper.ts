import {
  SdkStatusCode,
  sdkStatusCodeFromJSON,
} from "../../../bop-sdk/proto/bop-sdk-common";
import {
  GetChainInfoResponse,
  GetNetworkIdResponse,
  LedgerResponse,
  LedgerNumberResponse,
  LedgerLeaderResponse,
  LedgerValidatorsResponse,
  LedgerTxHashesResponse,
  GetAccountBalanceResponse,
  GetAccountIncreaseNonceResponse,
  GetAccountMetadataResponse,
  GetAccountPrivResponse,
  GetAccountResponse,
  contractTypeFromJSON,
  CheckContractAccountResponse,
  GetContractInfoResponse,
  GetTxPoolSizeResponse,
  GetTransactionCacheResponse,
  GetTransactionHistoryResponse,
  GetTxResponse,
  SubmitTransactionResponse,
  TransactionCacheChain,
  TransactionHistory,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import {
  GetTransactionHistoryResponse as GetTransactionHistoryBopResponse,
  GetLedgerResponse,
  HelloResponse,
  StatusCodes,
  GetAccountBaseResponse,
  GetAccountResponse as GetAccountBopResponse,
  GetTxCacheSizeResponse,
  GetTransactionCacheChainResponse,
  GetTransactionCacheChainResult,
  GetTransactionHistoryResult,
  SubmitTransactionResponse as SubmitTransactionBopResponse,
} from "../../../bop/bop-proto/bop";

export function ChainHelloToChainInfo(
  from: HelloResponse,
): GetChainInfoResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    const response: GetChainInfoResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: {
        licenseVersion: from.result?.licenseVersion,
        websocketPort: from.result?.websocketPort,
        chainVersion: from.result?.chainVersion,
        currentTime: from.result?.currentTime,
        hashType: from.result?.hashType,
        ledgerVersion: from.result?.ledgerVersion,
        networkId: from.result?.networkId,
      },
    };
    return response;
  } else {
    const response: GetChainInfoResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function ChainHelloToNetworkId(
  from: HelloResponse,
): GetNetworkIdResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    const response: GetNetworkIdResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.networkId,
    };
    return response;
  } else {
    const response: GetNetworkIdResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function LedgerHeaderToHeader(from: GetLedgerResponse): LedgerResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    const response: LedgerResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: {
        seq: from.result?.header?.seq,
        hash: from.result?.header?.hash,
        previousHash: from.result?.header?.previousHash,
        accountTreeHash: from.result?.header?.accountTreeHash,
        closeTime: from.result?.header?.closeTime,
        consensusValueHash: from.result?.header?.consensusValueHash,
        version: from.result?.header?.version,
        txCount: from.result?.header?.txCount,
        validatorsHash: from.result?.header?.validatorsHash,
        feesHash: from.result?.header?.feesHash,
      },
    };
    return response;
  } else {
    const response: LedgerResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function LedgerHeaderToLedgerNumber(
  from: GetLedgerResponse,
): LedgerNumberResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    const response: LedgerNumberResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.header?.seq,
    };
    return response;
  } else {
    const response: LedgerNumberResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function LedgerHeaderToLedgerLeader(
  from: GetLedgerResponse,
): LedgerLeaderResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    const response: LedgerLeaderResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.leader,
    };
    return response;
  } else {
    const response: LedgerLeaderResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function LedgerHeaderToLedgerValidators(
  from: GetLedgerResponse,
): LedgerValidatorsResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    const response: LedgerValidatorsResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.validators,
    };
    return response;
  } else {
    const response: LedgerValidatorsResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function LedgerHeaderToLedgerTxHashes(
  from: GetTransactionHistoryBopResponse,
): LedgerTxHashesResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: LedgerTxHashesResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: [],
    };

    for (let element of from.result?.transactions) {
      response.result.push(element?.hash);
    }
    return response;
  } else {
    const response: LedgerTxHashesResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function AccountAccountResultToAccountInfo(
  from: GetAccountBaseResponse,
): GetAccountResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetAccountResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: {
        address: from.result?.address,
        balance: from.result?.balance,
        nonce: from.result?.nonce,
        authTransfer: from.result?.authTransfer,
        metadatasHash: from.result?.metadatasHash,
        contract: {
          type: contractTypeFromJSON(from.result?.contract?.type),
          payload: from.result?.contract?.payload,
        },
        priv: from.result?.priv,
      },
    };
    return response;
  } else {
    const response: GetAccountResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function AccountAccountToAccountMetadatas(
  from: GetAccountBopResponse,
): GetAccountMetadataResponse {
  console.log(from);
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetAccountMetadataResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: [],
    };
    for (let element of from.result?.metadatas) {
      response.result.push(element);
    }
    return response;
  } else {
    const response: GetAccountMetadataResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function AccountAccountResultToIncreaseNonce(
  from: GetAccountBaseResponse,
): GetAccountIncreaseNonceResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetAccountIncreaseNonceResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.nonce === undefined ? 0 : from.result?.nonce,
    };
    return response;
  } else {
    const response: GetAccountIncreaseNonceResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function AccountAccountResultToBalance(
  from: GetAccountBaseResponse,
): GetAccountBalanceResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetAccountBalanceResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.balance,
    };
    return response;
  } else {
    const response: GetAccountBalanceResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function AccountAccountResultToPriv(
  from: GetAccountBaseResponse,
): GetAccountPrivResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetAccountPrivResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.priv,
    };
    return response;
  } else {
    const response: GetAccountPrivResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function ContractAccountResultToCheckContractAccount(
  from: GetAccountBaseResponse,
): CheckContractAccountResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: CheckContractAccountResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result:
        from.result?.contract !== undefined &&
        from.result?.contract?.payload !== "",
    };
    return response;
  } else {
    const response: CheckContractAccountResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function ContractAccountResultToGetContractInfo(
  from: GetAccountBaseResponse,
): GetContractInfoResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    if (from.result?.contract === undefined) {
      let response: GetContractInfoResponse = {
        errorCode: SdkStatusCode.CONTRACTADDRESS_NOT_CONTRACTACCOUNT_ERROR,
        errorDesc: "address not contract account",
      };
      return response;
    } else {
      let response: GetContractInfoResponse = {
        errorCode: sdkStatusCodeFromJSON(from.errorCode),
        errorDesc: from.errorDesc,
        result: {
          type: contractTypeFromJSON(from.result?.contract?.type),
          payload: from.result?.contract?.payload,
        },
      };
      return response;
    }
  } else {
    const response: GetContractInfoResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function TxTxCacheSizeToTxPoolSizeResponse(
  from: GetTxCacheSizeResponse,
): GetTxPoolSizeResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetTxPoolSizeResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: from.result?.queueSize,
    };
    return response;
  } else {
    const response: GetTxPoolSizeResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function TxTxCacheChainToTxCacheResponse(
  from: GetTransactionCacheChainResponse,
): GetTransactionCacheResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetTransactionCacheResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: TransactionCacheChain.fromJSON(
        GetTransactionCacheChainResult.toJSON(from.result),
      ),
    };
    return response;
  } else {
    const response: GetTransactionCacheResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function TxTxHistoryToTxHistoryResponse(
  from: GetTransactionHistoryBopResponse,
): GetTransactionHistoryResponse {
  if (from.errorCode === StatusCodes.SUCCESS) {
    let response: GetTransactionHistoryResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
      result: TransactionHistory.fromJSON(
        GetTransactionHistoryResult.toJSON(from.result),
      ),
    };
    return response;
  } else {
    const response: GetTransactionHistoryResponse = {
      errorCode: sdkStatusCodeFromJSON(from.errorCode),
      errorDesc: from.errorDesc,
    };
    return response;
  }
}

export function TxSubmitTxToSubmitTransactionResponse(
  from: SubmitTransactionBopResponse,
): SubmitTransactionResponse {
  let response: SubmitTransactionResponse = SubmitTransactionResponse.fromJSON(
    SubmitTransactionBopResponse.toJSON(from),
  );
  return response;
}
