module.exports = {
  INVALID_SOURCEADDRESS_ERROR: {
    CODE: 11002,
    MSG: "Invalid sourceAddress",
  },
  INVALID_DESTADDRESS_ERROR: {
    CODE: 11003,
    MSG: "Invalid destAddress",
  },
  INVALID_INITBALANCE_ERROR: {
    CODE: 11004,
    MSG: "InitBalance must between 0 and Long.MAX_VALUE",
  },
  INVALID_ADDRESS_ERROR: {
    CODE: 11006,
    MSG: "Invalid address",
  },
  METADATA_NOT_HEX_STRING_ERROR: {
    CODE: 11008,
    MSG: "AssetAmount this will be issued mustbetween 1 and max(int64)",
  },
  INVALID_DATAKEY_ERROR: {
    CODE: 11011,
    MSG: "The length of key must between 1 and 1024",
  },
  INVALID_DATAVALUE_ERROR: {
    CODE: 11012,
    MSG: "The length of value must between 0 and 256000",
  },
  INVALID_DATAVERSION_ERROR: {
    CODE: 11013,
    MSG: "The version must be equal or bigger than 0",
  },
  INVALID_MASTERWEIGHT_ERROR: {
    CODE: 11015,
    MSG: "MasterWeight must between 0 and max(uint32)",
  },
  INVALID_SIGNER_ADDRESS_ERROR: {
    CODE: 11016,
    MSG: "Invalid signer address",
  },
  INVALID_SIGNER_WEIGHT_ERROR: {
    CODE: 11017,
    MSG: "Signer weight must between 0 and max(uint32)",
  },
  INVALID_TX_THRESHOLD_ERROR: {
    CODE: 11018,
    MSG: "TxThreshold must between 0 and max(int64)",
  },
  INVALID_OPERATION_TYPE_ERROR: {
    CODE: 11019,
    MSG: "Type of typeThreshold is invalid",
  },
  INVALID_TYPE_THRESHOLD_ERROR: {
    CODE: 11020,
    MSG: "TypeThreshold must between 0 and max(int64)",
  },
  INVALID_AMOUNT_ERROR: {
    CODE: 11024,
    MSG: "Amount must between 0 and max(int64)",
  },
  INVALID_CONTRACTADDRESS_ERROR: {
    CODE: 11037,
    MSG: "Invalid contract address",
  },
  CONTRACTADDRESS_NOT_CONTRACTACCOUNT_ERROR: {
    CODE: 11038,
    MSG: "ContractAddress is not a contract account",
  },
  INVALID_FROMADDRESS_ERROR: {
    CODE: 11041,
    MSG: "Invalid fromAddress",
  },
  PAYLOAD_EMPTY_ERROR: {
    CODE: 11044,
    MSG: "Payload must be a non-empty string",
  },
  INVALID_CONTRACT_TYPE_ERROR: {
    CODE: 11047,
    MSG: "Invalid contract type",
  },
  INVALID_NONCE_ERROR: {
    CODE: 11048,
    MSG: "Nonce must between 1 and max(int64)",
  },
  INVALID_GASPRICE_ERROR: {
    CODE: 11049,
    MSG: "GasPrice must be between 0 and Long.MAX_VALUE",
  },
  INVALID_FEELIMIT_ERROR: {
    CODE: 11050,
    MSG: "FeeLimit must be between 0 and Long.MAX_VALUE",
  },
  OPERATIONS_EMPTY_ERROR: {
    CODE: 11051,
    MSG: "Operations cannot be empty",
  },
  INVALID_CEILLEDGERSEQ_ERROR: {
    CODE: 11052,
    MSG: "CeilLedgerSeq must be equal to or greater than 0",
  },
  INVALID_NONCE_TYPE_ERROR: {
    CODE: 12008,
    MSG: "nonceType must be equal to 0 or 1",
  },
};
