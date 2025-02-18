import {
  GetTxPoolSizeResponse,
  GetTransactionCacheResponse,
  GetTransactionHistoryResponse,
  OffLineTxResponse,
  OpCreateAccountParams,
  OpCreateContractParams,
  OpGasSendParams,
  OpContractInvokeParams,
  OpSetMetadataParams,
  OpSetPrivParams,
  OpBatchGasSend,
  OpBatchContractInvoke,
  SubmitTransactionParams,
  SubmitTransactionResponse,
  TestTransactionRequest,
  TestTransactionResponse,
} from "bop-sdk/proto/bop-sdk-interface";
import { Signer } from "./abstract-signer";

export abstract class transaction {
  abstract getTxPoolSize(): Promise<GetTxPoolSizeResponse>;
  abstract getTxPoolTransactions(
    limit?: number,
    address?: string,
    hash?: string,
  ): Promise<GetTransactionCacheResponse>;
  abstract getTransactionHistory(
    seq?: number,
    start?: number,
    limit?: number,
    hash?: string,
  ): Promise<GetTransactionHistoryResponse>;
  //构建离线交易数据
  abstract buildAccountCreateTx(
    params: OpCreateAccountParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;
  abstract buildContractCreateTx(
    params: OpCreateContractParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;
  abstract buildGasSendTx(
    params: OpGasSendParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;
  abstract buildContractInvokeTx(
    params: OpContractInvokeParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;
  abstract buildSetMetadataTx(
    params: OpSetMetadataParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;
  abstract buildSetPrivilegeTx(
    params: OpSetPrivParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;

  //构建离线批量交易数据
  abstract buildBatchGasSend(
    params: OpBatchGasSend,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;

  abstract buildBatchContractInvoke(
    params: OpBatchContractInvoke,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse>;

  abstract submitTransaction(
    params: SubmitTransactionParams,
  ): Promise<SubmitTransactionResponse>;

  abstract estimateGas(
    transaction: TestTransactionRequest,
  ): Promise<TestTransactionResponse>;
}
