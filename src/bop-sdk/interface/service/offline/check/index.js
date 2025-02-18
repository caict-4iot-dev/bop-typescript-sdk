const util = require("../common/util");
const keyPair = require("@caict/bif-encryption");
const errors = require("../exception");
const config = require("../common/constant");
const is = require("is-type-of");

function validateType(request) {
  // 检测参数是否是数组或者不是对象
  if (
    is.array(request) ||
    !is.object(request) ||
    JSON.stringify(request) === "{}"
  ) {
    return util._responseError(errors.REQUEST_NULL_ERROR);
  }
  return request;
}

// 参数校验
function validateObject(object) {
  let request = validateType(object);
  if (request.errorCode) {
    return request;
  }
  let {
    amount,
    operations,
    senderAddress,
    contractAddress,
    sourceAddress,
    feeLimit,
    gasPrice,
    ceilLedgerSeq,
    nonceType,
    initBalance,
    type,
  } = request;
  // 检测ceilLedgerSeq、feeLimit、gasPrice、domainId、nonceType、sourceAddress是否是有效的
  if (
    ceilLedgerSeq != null &&
    ceilLedgerSeq !== "" &&
    !util._isAvailableValue(ceilLedgerSeq)
  ) {
    return util._responseError(errors.INVALID_CEILLEDGERSEQ_ERROR);
  }
  if (
    feeLimit != null &&
    feeLimit !== "" &&
    !util._isAvailableValue(feeLimit)
  ) {
    return util._responseError(errors.INVALID_FEELIMIT_ERROR);
  }
  if (
    gasPrice != null &&
    gasPrice !== "" &&
    !util._isAvailableValue(gasPrice)
  ) {
    return util._responseError(errors.INVALID_GASPRICE_ERROR);
  }
  if (nonceType == null || nonceType === "") {
    nonceType = config.INIT_ZERO;
  } else if (!(nonceType == "0" || nonceType == "1")) {
    return util._responseError(errors.INVALID_NONCE_TYPE_ERROR);
  }

  if (amount !== undefined) {
    if (amount == null || amount === "" || !util._isAvailableValue(amount)) {
      return util._responseError(errors.INVALID_AMOUNT_ERROR);
    }
  }
  if (type !== undefined) {
    if (type != null && type !== "" && !(type === 0 || type === 1)) {
      return util._responseError(errors.INVALID_CONTRACT_TYPE_ERROR);
    }
    if (type == null || type === "") {
      type = 0;
    }
  }
  if (operations !== undefined) {
    if (is.array(operations)) {
      if (operations.length == 0) {
        return util._responseError(errors.OPERATIONS_EMPTY_ERROR);
      }
    }
    if (!is.object(operations) || operations == null || operations === "") {
      return util._responseError(errors.OPERATIONS_EMPTY_ERROR);
    }
  }
  if (sourceAddress !== undefined) {
    if (
      sourceAddress != null &&
      sourceAddress !== "" &&
      !keyPair.isAddress(sourceAddress)
    ) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }
    if (sourceAddress == null || sourceAddress == "") {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }
  }
  if (contractAddress !== undefined) {
    if (
      contractAddress != null &&
      contractAddress !== "" &&
      !keyPair.isAddress(contractAddress)
    ) {
      return util._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }
    if (contractAddress == null || contractAddress == "") {
      return util._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }
  }
  if (initBalance !== undefined) {
    if (!util._verifyIInitBalancelValue(initBalance)) {
      return util._responseError(errors.INVALID_INITBALANCE_ERROR);
    }
  }
  if (senderAddress !== undefined) {
    if (!keyPair.isAddress(senderAddress)) {
      return util._responseError(errors.INVALID_ADDRESS_ERROR);
    }
  }
  // 如果没有feeLimit、gasPrice、domainId传递值则赋给默认值
  if (feeLimit == null || feeLimit === "") {
    request.feeLimit = config.feeLimit;
  }
  if (gasPrice == null || gasPrice === "") {
    request.gasPrice = config.gasPrice;
  }
  return request;
}

module.exports = {
  // 参数校验
  validateObject: validateObject,
  // 参数类型校验
  validateType: validateType,
};
