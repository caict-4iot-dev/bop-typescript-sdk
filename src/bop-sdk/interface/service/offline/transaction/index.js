const long = require("long");
const chain_pb = require("../proto/chain_pb");
const operations = require("./operations");
const Operation = require("../validate");
const crypto = require("crypto");
const BigNumber = require("bignumber.js");
const errors = require("../exception");
const util = require("../common/util");
const keyPair = require("@caict/bif-encryption");
const Snowflake = require("../common/snowFlakeUtils");
const check = require("../check/index");

const Operaction = require("../operation");
const OperactionType = new Operaction();
const GasSendRequestOperation = require("../operation/gasSendRequestOperation");
const signer = require("../../../abstract-service/abstract-signer");
const {
  SubmitTransactionParams,
} = require("../../../../proto/bop-sdk-interface");
class Transaction {
  constructor() {
    this.operations = [];
    this.blob = "";
    this.hash = "";
  }

  getBlob() {
    return this.blob;
  }

  getHash() {
    return this.hash;
  }

  /**
   * Add operation
   *
   * @param {String} type
   * @param {Object} options
   */
  addOperation(type, params = {}) {
    for (let i = 0; i < params.length; i++) {
      const args = params[i];
      switch (type) {
        case "payCoin":
          this.operations.push(operations.payCoin(args));
          break;
        case "setMetadata":
          this.operations.push(operations.setMetadata(args));
          break;
        case "activateAccount":
          this.operations.push(operations.activateAccount(args));
          break;
        case "setPrivilegeOperation":
          this.operations.push(operations.accountSetPrivilegeOperation(args));
          break;
        case "createContract":
          this.operations.push(operations.createContract(args));
          break;
        default:
          throw new Error("unknown operation");
      }
    }
  }

  /**
   * Build transaction
   *
   * @param {Object} args
   * @param {String} args.sourceAddress
   * @param {String} args.nonce
   * @param {String} [args.feeLimit]
   * @param {String} [args.gasPrice]
   * @param {String} [args.seq]
   * @param {String} [args.metadata]
   * @returns {string}
   */
  buildTransaction(args = {}) {
    if (this.operations.length === 0) {
      throw new Error("must add operation first");
    }
    const {
      sourceAddress,
      nonce,
      feeLimit,
      gasPrice,
      seqOffset,
      metadata,
      nonceType,
      maxLedgerSeq,
    } = args;
    const tx = new chain_pb.Transaction();
    tx.setSourceAddress(sourceAddress);
    if (nonce !== 0 && nonce !== "0") {
      tx.setNonce(long.fromValue(nonce));
    }
    if (feeLimit !== 0 && feeLimit !== "0") {
      tx.setFeeLimit(long.fromValue(feeLimit));
    }
    if (gasPrice !== 0 && gasPrice !== "0") {
      tx.setGasPrice(long.fromValue(gasPrice));
    }
    if (seqOffset) {
      tx.setCeilLedgerSeq(long.fromValue(seqOffset));
    }
    if (metadata) {
      tx.setMetadata(Uint8Array.from(Buffer.from(metadata, "utf8")));
    }
    if (nonceType && nonceType != "0") {
      tx.setNonceType(nonceType);
    }
    if (maxLedgerSeq) {
      tx.setMaxLedgerSeq(Number(maxLedgerSeq));
    }
    tx.setOperationsList(this.operations);

    const blob = Buffer.from(tx.serializeBinary()).toString("hex");

    const buffer = Buffer.from(blob, "hex");
    const hash = crypto.createHash("sha256");
    hash.update(buffer);

    this.blob = blob;
    this.hash = hash.digest("hex");
  }

  async buildOperation(type, option = {}) {
    let param = option;
    for (let i = 0; i < param.length; i++) {
      let option = param[i];
      let operation, item;
      switch (type) {
        case "ACCOUNT_ACTIVATE": {
          operation = OperactionType.accountCreateOperation;
          operation = option;
          item = {
            create_account: {
              dest_address: operation.getDestAddress(),
              init_balance: operation.getInitBalance(),
              priv: {
                master_weight: 1,
                thresholds: {
                  tx_threshold: 1,
                },
              },
            },
            type: operation.getActionType(),
          };
          break;
        }
        case "ACCOUNT_SET_METADATA": {
          operation = OperactionType.accountSetMetadataOperation;
          operation = option;
          item = {
            set_metadata: {
              key: operation.getKey(),
              value: operation.getValue(),
              version: operation.getVersion(),
            },
            type: operation.getActionType(),
          };
          break;
        }
        case "ACCOUNT_SET_PRIVILEGE": {
          operation = OperactionType.accountSetPrivilegeOperation;
          operation = option;
          item = {
            set_privilege: {
              master_weight: operation.getMasterWeight(),
              signers: operation.getSigners(),
              tx_threshold: operation.getTxThreshold(),
              type_thresholds: operation.getTypeThresholds(),
            },
            type: operation.getActionType(),
          };
          break;
        }
        case "GAS_SEND": {
          operation = OperactionType.gasSendOperation;
          operation = option;
          item = {
            pay_coin: {
              dest_address: operation.getDestAddress(),
              amount: operation.getAmount(),
            },
            type: operation.getActionType(),
          };
          break;
        }
        case "CONTRACT_CREATE": {
          operation = OperactionType.contractCreateOperation;
          operation = option;
          item = {
            create_account: {
              contract: {
                payload: operation.getPayload(),
              },
              init_balance: operation.getInitBalance(),
              init_input: operation.getInitInput(),
              priv: {
                master_weight: 0,
                thresholds: {
                  tx_threshold: 1,
                },
              },
            },
            type: operation.getActionType(),
          };
          break;
        }
        case "CONTRACT_INVOKE": {
          operation = OperactionType.contractInvokeOperation;
          operation = option;
          item = {
            pay_coin: {
              dest_address: operation.getContractAddress(),
              amount: operation.getAmount(),
              input: operation.getInput(),
            },
            type: operation.getActionType(),
          };
          break;
        }
        default: {
          throw new Error("unknown operation");
        }
      }
      return item;
    }
  }

  /**
   * gasSend
   * @param request
   * @returns {Promise<{header: *}|{errorDesc: *, errorCode: *}>}
   */
  async gasSend(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      sourceAddress,
      destAddress,
      remarks,
      amount,
      ceilLedgerSeq,
      gasPrice,
      feeLimit,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(sourceAddress) || !keyPair.isAddress(destAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }

    // 参数校验
    let operation = new Operation();
    let data = operation.SendOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    let gasSend = {
      to: destAddress,
      amount: amount,
    };
    let operations = [gasSend];
    this.addOperation("payCoin", operations);

    let nonce;
    let maxLedgerSeq;
    let blockNumberFind;
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }

    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      if (blockNumberFind) {
        ceilLedgerSeq =
          Number(ceilLedgerSeq) + Number(blockNumberFind.header.blockNumber);
      } else {
        let blockNumber = await signer.getLedgerNumber();
        ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
      }
    }
    let tranactionParameter = {
      sourceAddress: sourceAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      metadata: remarks,
      seqOffset: ceilLedgerSeq,
      nonceType: nonceType,
      maxLedgerSeq: maxLedgerSeq,
    };
    console.log(tranactionParameter);
    this.buildTransaction(tranactionParameter);
    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  /**
   * batchGasSend
   * @param request
   * @returns {Promise<{header: *}|{errorDesc: *, errorCode: *}>}
   */
  async batchGasSend(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      senderAddress,
      feeLimit,
      gasPrice,
      remarks,
      ceilLedgerSeq,
      operations,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(senderAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }
    // 参数校验
    let operation = new Operation();
    let data = operation.GasSendRequestOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    // 参数验证及合约账号校验
    let operationsArr = [];
    let map = new Map();
    for (let key in operations) {
      let { destAddress } = operations[key];
      if (!map.has(destAddress)) {
        if (!keyPair.isAddress(destAddress)) {
          return util._responseError(errors.INVALID_ADDRESS_ERROR);
        }
        map.set(destAddress, 1);
      }
      let { amount } = operations[key];
      if (amount == null || amount === "" || !util._isAvailableValue(amount)) {
        return util._responseError(errors.INVALID_AMOUNT_ERROR);
      }
      let gasSendParam = {
        to: destAddress,
        amount: amount,
      };
      operationsArr.push(gasSendParam);
    }

    this.addOperation("payCoin", operationsArr);

    // 随机nonce
    let nonce;
    let maxLedgerSeq;
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }

    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }
    let tranactionParameter = {
      sourceAddress: senderAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      metadata: remarks,
      seqOffset: ceilLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);

    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  async createContract(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      sourceAddress,
      payload,
      initBalance,
      remarks,
      type,
      feeLimit,
      gasPrice,
      ceilLedgerSeq,
      initInput,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(sourceAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }

    // 参数校验
    let operation = new Operation();
    let data = operation.contractCreateOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    let createContractOperation = {
      initBalance: initBalance,
      payload: payload,
      initInput: initInput,
      type: type,
    };
    let operations = [createContractOperation];
    this.addOperation("createContract", operations);
    // 随机nonce
    let nonce;
    let maxLedgerSeq;
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }

    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }
    let tranactionParameter = {
      sourceAddress: sourceAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      seqOffset: ceilLedgerSeq,
      metadata: remarks,
      nonceType: nonceType,
      maxLedgerSeq: maxLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);

    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  /**
   * contract Invoke
   * @param request
   * @returns {Promise<{header: *}|{errorDesc: *, errorCode: *}>}
   */
  async contractInvoke(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      sourceAddress,
      feeLimit,
      gasPrice,
      contractAddress,
      remarks,
      amount,
      ceilLedgerSeq,
      input,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(contractAddress)) {
      return util._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }
    if (!keyPair.isAddress(sourceAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }
    // 参数校验
    let operation = new Operation();
    let data = operation.contractInvokeOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    // 调用合约账户接口判断是否为合约账户
    let contractAccount = await signer.getAccount(contractAddress);
    if (contractAccount.errorCode != 0) {
      return util._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }
    console.log(contractAccount);
    if (contractAccount.result.contract.payload === undefined) {
      return util._responseError(
        errors.CONTRACTADDRESS_NOT_CONTRACTACCOUNT_ERROR,
      );
    }
    let contractInvoke = {
      to: contractAddress,
      amount: amount,
      input: input,
    };
    let operations = [contractInvoke];
    this.addOperation("payCoin", operations);
    // 随机nonce
    let nonce;
    let maxLedgerSeq;
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce(sourceAddress);
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }

    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }
    let tranactionParameter = {
      sourceAddress: sourceAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      metadata: remarks,
      seqOffset: ceilLedgerSeq,
      nonceType: nonceType,
      maxLedgerSeq: maxLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);

    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  /**
   * contract Invoke
   * @param request
   * @returns {Promise<{header: *}|{errorDesc: *, errorCode: *}>}
   */
  async batchContractInvoke(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      senderAddress,
      feeLimit,
      gasPrice,
      remarks,
      ceilLedgerSeq,
      operations,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(senderAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }
    // 参数校验
    let operation = new Operation();
    let data = operation.contractInvokeRequestOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    // 参数验证及合约账号校验
    let operationsArr = [];
    let map = new Map();
    for (let key in operations) {
      let { contractAddress } = operations[key];
      if (map.has(contractAddress)) {
        map.set(contractAddress, operations[key]);
      } else {
        let tmpList = [];
        tmpList.push(operations[key]);
        if (!keyPair.isAddress(contractAddress)) {
          return util._responseError(errors.INVALID_ADDRESS_ERROR);
        }
        // 调用合约账户接口判断是否为合约账户
        let contractAccount = await signer.getAccount(contractAddress);
        if (contractAccount.errorCode != 0) {
          return util._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
        }
        if (contractAccount.result.contract.payload === undefined) {
          return util._responseError(
            errors.CONTRACTADDRESS_NOT_CONTRACTACCOUNT_ERROR,
          );
        }
        map.set(contractAddress, tmpList);
      }
      let { amount } = operations[key];
      if (amount == null || amount === "" || !util._isAvailableValue(amount)) {
        return util._responseError(errors.INVALID_AMOUNT_ERROR);
      }
      let contractInvokeParam = {
        to: contractAddress,
        amount: amount,
        input: operations[key].input,
      };
      operationsArr.push(contractInvokeParam);
    }
    this.addOperation("payCoin", operationsArr);
    // 随机nonce
    let nonce;
    let maxLedgerSeq;
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }
    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }
    let tranactionParameter = {
      sourceAddress: senderAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      metadata: remarks,
      seqOffset: ceilLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);

    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  /**
   * create account
   * @param request
   * @returns {Promise<{errorDesc: *, errorCode: *}>}
   */
  async createAccount(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      sourceAddress,
      ceilLedgerSeq,
      remarks,
      destAddress,
      initBalance,
      feeLimit,
      gasPrice,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(sourceAddress) || !keyPair.isAddress(destAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }

    let operation = new Operation();
    let data = operation.accountActivateOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    let createAccOperation = {
      to: destAddress,
      initBalance: initBalance,
    };
    let operations = [createAccOperation];
    this.addOperation("activateAccount", operations);
    let nonce;
    let maxLedgerSeq;
    // 判断获取blockNumber是否需要接口获取 (目前版本不需要这块业务逻辑调整)
    // 随机nonce
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }
    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }
    let tranactionParameter = {
      sourceAddress: sourceAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      seqOffset: ceilLedgerSeq,
      metadata: remarks,
      nonceType: nonceType,
      maxLedgerSeq: maxLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);
    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  /**
   * set account metadatas
   * @param request
   * @returns {Promise<{errorDesc: *, errorCode: *}>}
   */
  async setMetadatas(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }
    let {
      sourceAddress,
      remarks,
      key,
      value,
      version,
      deleteFlag,
      feeLimit,
      gasPrice,
      ceilLedgerSeq,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(sourceAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }

    if (key.trim().length > 1024 || key.trim().length < 1) {
      return util._responseError(errors.INVALID_DATAKEY_ERROR);
    }

    if (value.trim().length > 256000 || value.trim().length < 1) {
      return util._responseError(errors.INVALID_DATAVALUE_ERROR);
    }

    // 参数校验
    let operation = new Operation();
    let data = operation.accountSetMetadataOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    let setMetadatas = {
      key: key,
      value: value,
      version: version,
      deleteFlag: deleteFlag,
    };
    let operations = [setMetadatas];
    this.addOperation("setMetadata", operations);
    let nonce;
    let maxLedgerSeq;
    // 随机nonce
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }

    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }
    let tranactionParameter = {
      sourceAddress: sourceAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      metadata: remarks,
      seqOffset: ceilLedgerSeq,
      nonceType: nonceType,
      maxLedgerSeq: maxLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);

    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }

  /**
   * set account privilege
   * @param request
   * @returns {Promise<{errorDesc: *, errorCode: *}>}
   */
  async setPrivilege(object = {}, signer) {
    // 校验参数
    let request = check.validateObject(object);
    if (request.errorCode) {
      return request;
    }

    let {
      sourceAddress,
      txThreshold,
      signers,
      typeThresholds,
      feeLimit,
      gasPrice,
      ceilLedgerSeq,
      remarks,
      masterWeight,
      nonceType,
    } = request;
    // 必传校验
    if (!keyPair.isAddress(sourceAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }

    // 参数校验
    let operation = new Operation();
    let data = operation.accountSetPrivilegeOperation(request);
    if (data.errorCode !== 0) {
      return data;
    }

    let setPrivilege = {
      txThreshold: txThreshold,
      signers: signers,
      typeThresholds: typeThresholds,
      masterWeight: masterWeight,
    };
    let operations = [setPrivilege];
    this.addOperation("setPrivilegeOperation", operations);
    // 随机nonce
    let nonce;
    let maxLedgerSeq;
    if (nonceType == "1") {
      let res = await signer.getLedgerNumber();
      if (res.errorCode !== 0) {
        return res;
      }
      maxLedgerSeq =
        Number(res.result) + Number(Snowflake.getDefaultRangeRandom());
      nonce = Snowflake.randomLenNum().toString();
    } else {
      let nonceResult = await signer.getIncreaseNonce();
      if (nonceResult.errorCode !== 0) {
        return nonceResult;
      }
      nonce = nonceResult.result;
      nonce = new BigNumber(nonce).plus(1).toString(10);
    }

    // 获取blockNumber
    if (ceilLedgerSeq != null && ceilLedgerSeq !== "") {
      let blockNumber = await signer.getLedgerNumber();
      ceilLedgerSeq = Number(ceilLedgerSeq) + Number(blockNumber.result);
    }

    let tranactionParameter = {
      sourceAddress: sourceAddress,
      nonce: nonce,
      feeLimit: feeLimit,
      gasPrice: gasPrice,
      metadata: remarks,
      seqOffset: ceilLedgerSeq,
      nonceType: nonceType,
      maxLedgerSeq: maxLedgerSeq,
    };
    this.buildTransaction(tranactionParameter);
    let response = {
      errorCode: 0,
      errorDesc: "ok",
      result: this.blob,
    };

    return util._response(response);
  }
}

module.exports = Transaction;
