import {
  GetTransactionCacheRequest,
  GetTransactionHistoryRequest,
  StatusCodes,
} from "bop/bop-proto/bop";
import {
  GetTxPoolSizeResponse,
  GetTransactionCacheResponse,
  GetTransactionHistoryResponse,
  OffLineTxResponse,
  SignerSignResponse,
  SubmitTransactionParams,
  SubmitTransactionResponse,
  OpCreateAccountParams,
  OpCreateContractParams,
  OpGasSendParams,
  OpContractInvokeParams,
  OpSetMetadataParams,
  OpSetPrivParams,
  OpBatchGasSend,
  OpBatchContractInvoke,
  TestTransactionRequest,
  TestTransactionResponse,
} from "../../../bop-sdk/proto/bop-sdk-interface";
import { Signer } from "../abstract-service/abstract-signer";
import { BopInterface } from "../../../bop/bop-base";
import { transaction } from "../abstract-service/abstract-transaction";
import * as trans from "./helper";
import {
  SdkStatusCode,
  sdkStatusCodeFromJSON,
} from "../../../bop-sdk/proto/bop-sdk-common";

const Transaction = require("./offline/transaction");

export class TransactionByBop extends transaction {
  readonly bopInterface: BopInterface;
  constructor(bop: BopInterface) {
    super();
    this.bopInterface = bop;
  }

  public async getTxPoolSize(): Promise<GetTxPoolSizeResponse> {
    return trans.TxTxCacheSizeToTxPoolSizeResponse(
      await this.bopInterface.callService("base_getTxCacheSize"),
    );
  }

  public async getTxPoolTransactions(
    limit?: number,
    address?: string,
    hash?: string,
  ): Promise<GetTransactionCacheResponse> {
    const request: GetTransactionCacheRequest = {};
    if (limit !== undefined) request.limit = limit;
    if (hash !== undefined) request.hash = hash;
    if (address !== undefined) request.address = address;
    return trans.TxTxCacheChainToTxCacheResponse(
      await this.bopInterface.callService(
        "base_getTransactionCacheChain",
        request,
      ),
    );
  }

  public async getTransactionHistory(
    seq?: number,
    start?: number,
    limit?: number,
    hash?: string,
  ): Promise<GetTransactionHistoryResponse> {
    const request: GetTransactionHistoryRequest = {};
    if (hash !== undefined) request.hash = hash;
    if (seq !== undefined) request.ledgerSeq = seq;
    if (start !== undefined) request.start = start;
    if (limit !== undefined) request.limit = limit;

    return trans.TxTxHistoryToTxHistoryResponse(
      await this.bopInterface.callService(
        "base_getTransactionHistory",
        request,
      ),
    );
  }

  public async submitTransaction(
    params: SubmitTransactionParams,
  ): Promise<SubmitTransactionResponse> {
    return trans.TxSubmitTxToSubmitTransactionResponse(
      await this.bopInterface.callService("base_submitTransaction", params),
    );
  }

  public async estimateGas(
    transaction: TestTransactionRequest,
  ): Promise<TestTransactionResponse> {
    return await this.bopInterface.callService(
      "base_testTransaction",
      transaction,
    );
  }

  //离线接口
  public async buildAccountCreateTx(
    params: OpCreateAccountParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    const response: OffLineTxResponse = {};
    //sourceAddress, ceilLedgerSeq, remarks, destAddress, initBalance, feeLimit, gasPrice, nonceType
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }

    let obj = {
      sourceAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      destAddress: params.destAddress === undefined ? "" : params.destAddress,
      initBalance: params.amount === undefined ? "0" : params.amount.toString(),
      remarks:
        params.params?.remarks === undefined ? "" : params.params?.remarks,
      feeLimit:
        params.params?.feeLimit === undefined
          ? "0"
          : params.params?.feeLimit.toString(),
      gasPrice:
        params.params?.gasPrice === undefined
          ? "0"
          : params.params?.gasPrice.toString(),
      ceilLedgerSeq:
        params.params?.ceilLedgerSeq === undefined
          ? ""
          : params.params?.ceilLedgerSeq.toString(),
      nonceType:
        params.params?.nonceType === undefined
          ? "0"
          : Number(params.params?.nonceType).toString(),
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.createAccount(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }
    return response;
  }

  public async buildContractCreateTx(
    params: OpCreateContractParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    const response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }
    //sourceAddress, payload, initBalance, remarks, type, feeLimit, gasPrice, ceilLedgerSeq, initInput, nonceType
    let obj = {
      sourceAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      payload: params.payload === undefined ? "" : params.payload,
      initBalance:
        params.initBalance === undefined ? "0" : params.initBalance.toString(),
      remarks:
        params.params?.remarks === undefined ? "" : params.params?.remarks,
      type: params.type === undefined ? "" : Number(params.type),
      feeLimit:
        params.params?.feeLimit === undefined
          ? "0"
          : params.params?.feeLimit.toString(),
      gasPrice:
        params.params?.gasPrice === undefined
          ? "0"
          : params.params?.gasPrice.toString(),
      ceilLedgerSeq:
        params.params?.ceilLedgerSeq === undefined
          ? ""
          : params.params?.ceilLedgerSeq.toString(),
      initInput: params.initInput === undefined ? "" : params.initInput,
      nonceType:
        params.params?.nonceType === undefined
          ? "0"
          : Number(params.params?.nonceType).toString(),
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.createContract(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }

    return response;
  }

  public async buildGasSendTx(
    params: OpGasSendParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    let response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }
    // sourceAddress, destAddress, remarks, amount, ceilLedgerSeq, gasPrice, feeLimit, nonceType
    let obj = {
      sourceAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      destAddress: params.destAddress === undefined ? "" : params.destAddress,
      remarks:
        params.params?.remarks === undefined ? "" : params.params?.remarks,
      amount: params.amount === undefined ? "0" : params.amount.toString(),
      ceilLedgerSeq:
        params.params?.ceilLedgerSeq === undefined
          ? ""
          : params.params?.ceilLedgerSeq.toString(),
      gasPrice:
        params.params?.gasPrice === undefined
          ? "0"
          : params.params?.gasPrice.toString(),
      feeLimit:
        params.params?.feeLimit === undefined
          ? "0"
          : params.params?.feeLimit.toString(),
      nonceType:
        params.params?.nonceType === undefined
          ? "0"
          : Number(params.params?.nonceType).toString(),
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.gasSend(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }

    return response;
  }

  public async buildContractInvokeTx(
    params: OpContractInvokeParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    const response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }
    //sourceAddress, feeLimit, gasPrice, contractAddress, remarks, amount, ceilLedgerSeq, input, nonceType
    let obj = {
      sourceAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      feeLimit:
        params.params?.feeLimit === undefined
          ? "0"
          : params.params?.feeLimit.toString(),
      gasPrice:
        params.params?.gasPrice === undefined
          ? "0"
          : params.params?.gasPrice.toString(),
      contractAddress:
        params.contractAddress === undefined ? "0" : params.contractAddress,
      remarks:
        params.params?.remarks === undefined ? "" : params.params?.remarks,
      amount: params.amount === undefined ? "0" : params.amount.toString(),
      ceilLedgerSeq:
        params.params?.ceilLedgerSeq === undefined
          ? ""
          : params.params?.ceilLedgerSeq.toString(),
      input: params.input === undefined ? "" : params.input,
      nonceType:
        params.params?.nonceType === undefined
          ? "0"
          : Number(params.params?.nonceType).toString(),
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.contractInvoke(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }
    return response;
  }

  public async buildSetMetadataTx(
    params: OpSetMetadataParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    const response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }
    //sourceAddress, remarks, key, value, version, deleteFlag, feeLimit, gasPrice, ceilLedgerSeq, nonceType
    let obj = {
      sourceAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      key: params.key === undefined ? "" : params.key,
      value: params.value === undefined ? "" : params.value,
      version: params.version === undefined ? "1" : params.version.toString(),
      deleteFlag: params.deleteFlag === undefined ? false : params.deleteFlag,
      remarks:
        params.params?.remarks === undefined ? "" : params.params?.remarks,
      feeLimit:
        params.params?.feeLimit === undefined
          ? "0"
          : params.params?.feeLimit.toString(),
      gasPrice:
        params.params?.gasPrice === undefined
          ? "0"
          : params.params?.gasPrice.toString(),
      ceilLedgerSeq:
        params.params?.ceilLedgerSeq === undefined
          ? ""
          : params.params?.ceilLedgerSeq.toString(),
      nonceType:
        params.params?.nonceType === undefined
          ? "0"
          : Number(params.params?.nonceType).toString(),
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.setMetadatas(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }
    return response;
  }

  public async buildSetPrivilegeTx(
    params: OpSetPrivParams,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    const response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }
    //sourceAddress, txThreshold, signers, typeThresholds, feeLimit, gasPrice, ceilLedgerSeq, remarks, masterWeight, nonceType

    let signers = [];
    if (params?.signers !== undefined) {
      for (let element of params?.signers) {
        let sign = {
          address: element.address === undefined ? "" : element.address,
          weight:
            element.weight === undefined ? "0" : element.weight.toString(),
        };
        console.log(sign);
        signers.push(sign);
      }
    }

    let typeThresholds = [];
    if (params?.typeThresholds !== undefined) {
      for (let element of params?.typeThresholds) {
        let threshold = {
          type:
            element.type === undefined ? "0" : Number(element.type).toString(),
          threshold:
            element.threshold === undefined
              ? "0"
              : Number(element.threshold).toString(),
        };
        console.log(threshold);
        typeThresholds.push(threshold);
      }
    }
    let obj = {
      sourceAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      txThreshold: params.txThreshold,
      masterWeight: params.masterWeight,
      signers: signers,
      typeThresholds: typeThresholds,
      remarks:
        params.params?.remarks === undefined ? "" : params.params?.remarks,
      feeLimit:
        params.params?.feeLimit === undefined
          ? "0"
          : params.params?.feeLimit.toString(),
      gasPrice:
        params.params?.gasPrice === undefined
          ? "0"
          : params.params?.gasPrice.toString(),
      ceilLedgerSeq:
        params.params?.ceilLedgerSeq === undefined
          ? ""
          : params.params?.ceilLedgerSeq.toString(),
      nonceType:
        params.params?.nonceType === undefined
          ? "0"
          : Number(params.params?.nonceType).toString(),
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.setPrivilege(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }
    return response;
  }

  public async buildBatchGasSend(
    params: OpBatchGasSend,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    let response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }

    //协议转换，转换为js JSON格式结构
    let operations = [];
    if (params.params !== undefined) {
      for (let element of params?.params) {
        let gassend = {
          destAddress:
            element.destAddress === undefined ? "" : element.destAddress,
          amount:
            element.amount === undefined ? "0" : element.amount.toString(),
        };
        console.log(gassend);
        operations.push(gassend);
      }
    }
    let obj = {
      senderAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      remarks: params.base?.remarks === undefined ? "" : params.base?.remarks,
      ceilLedgerSeq:
        params.base?.ceilLedgerSeq === undefined
          ? ""
          : params.base?.ceilLedgerSeq.toString(),
      gasPrice:
        params.base?.gasPrice === undefined
          ? "0"
          : params.base?.gasPrice.toString(),
      feeLimit:
        params.base?.feeLimit === undefined
          ? "0"
          : params.base?.feeLimit.toString(),
      nonceType:
        params.base?.nonceType === undefined
          ? "0"
          : Number(params.base?.nonceType).toString(),
      operations: operations,
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.batchGasSend(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }

    return response;
  }

  public async buildBatchContractInvoke(
    params: OpBatchContractInvoke,
    signer: Signer[],
    sourceAddress?: string,
  ): Promise<OffLineTxResponse> {
    const response: OffLineTxResponse = {};
    if (signer.length === 0) {
      response.errorCode = SdkStatusCode.NO_PROVIDER_SET;
      response.errorDesc = "please set provider";
      return response;
    }
    let operations = [];
    if (params.params !== undefined) {
      for (let element of params?.params) {
        let invoke = {
          contractAddress:
            element.contractAddress === undefined
              ? ""
              : element.contractAddress,
          input: element.input === undefined ? "" : element.input,
          amount:
            element.amount === undefined ? "0" : element.amount.toString(),
        };
        console.log(invoke);
        operations.push(invoke);
      }
    }
    //senderAddress, feeLimit, gasPrice, remarks, ceilLedgerSeq, operations, nonceType
    let obj = {
      senderAddress:
        sourceAddress === undefined ? signer[0].getAddress() : sourceAddress,
      remarks: params.base?.remarks === undefined ? "" : params.base?.remarks,
      ceilLedgerSeq:
        params.base?.ceilLedgerSeq === undefined
          ? ""
          : params.base?.ceilLedgerSeq.toString(),
      gasPrice:
        params.base?.gasPrice === undefined
          ? "0"
          : params.base?.gasPrice.toString(),
      feeLimit:
        params.base?.feeLimit === undefined
          ? "0"
          : params.base?.feeLimit.toString(),
      nonceType:
        params.base?.nonceType === undefined
          ? "0"
          : Number(params.base?.nonceType).toString(),
      operations: operations,
    };

    let offlineTx = new Transaction();
    let tx = (await offlineTx.batchContractInvoke(obj, signer[0])) as {
      errorCode;
      errorDesc;
    };
    if (tx.errorCode !== 0) {
      response.errorCode = sdkStatusCodeFromJSON(tx.errorCode);
      response.errorDesc = tx.errorDesc;
    } else {
      response.result = {
        transactionBlob: "",
        signatures: [],
      };
      for (let element of signer) {
        let signResponse = (await element.signTransaction(
          offlineTx.getBlob(),
        )) as SignerSignResponse;

        if (signResponse.errorCode !== SdkStatusCode.SUCCESS) {
          response.errorCode = signResponse.errorCode;
          response.errorDesc = signResponse.errorDesc;
          response.result = undefined;
          break;
        }
        response.result.signatures.push(signResponse.result);
      }
      response.errorCode = SdkStatusCode.SUCCESS;
      response.errorDesc = "ok";
      response.result.transactionBlob = offlineTx.getBlob();
    }
    return response;
  }
}
