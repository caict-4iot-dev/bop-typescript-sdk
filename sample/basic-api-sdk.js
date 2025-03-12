import {
  Config,
  ProviderByBop,
  BopInterface,
  SignerByBop,
} from "@caict/bif-bop-sdk";

// 初始化配置
const config = new Config("https://bif-mainnet.bitfactory.cn", "xxx", "xxx");

// 创建 Provider 实例
const provider = new ProviderByBop(new BopInterface(config));

// 创建 Signer 实例
const signer = new SignerByBop("your encprivate key");
const signerWithProvider = signer.connect(provider);

// 封装一个通用的日志记录函数，用于记录每个接口调用的结果
const logResult = (methodName, result) => {
  console.log(`${methodName} 结果:`, result);
};

const signerT = {
  getAddress: () => {
    const response = signerWithProvider.getAddress();
    logResult("getAddress", response);
    return response;
  },
  signTransaction: (params) => {
    const response = signerWithProvider.signTransaction(params);
    logResult("signTransaction", response);
    return response;
  },
  getBalance: async () => {
    const response = await signerWithProvider.getBalance();
    logResult("getBalance", response);
    return response;
  },
  getIncreaseNonce: async () => {
    const response = await signerWithProvider.getIncreaseNonce();
    logResult("getIncreaseNonce", response);
    return response;
  },
  callContract: async (contractAddress, input) => {
    const response = await signerWithProvider.callContract(
      contractAddress,
      input,
    );
    logResult("callContract", response);
    return response;
  },
  getAccount: async (address) => {
    const response = await signerWithProvider.getAccount(address);
    logResult("getAccount", response);
    return response;
  },
  getLedgerNumber: async () => {
    const response = await signerWithProvider.getLedgerNumber();
    logResult("getLedgerNumber", response);
    return response;
  },
};

const chainProvider = {
  getChainInfo: async () => {
    const response = await provider.chain.getChainInfo();
    logResult("getChainInfo", response);
    return response;
  },
  getNetworkId: async () => {
    const response = await provider.chain.getNetworkId();
    logResult("getNetworkId", response);
    return response;
  },
};

const ledgerProvider = {
  getLedger: async (params) => {
    const response = await provider.ledger.getLedger(params);
    logResult("getLedger", response);
    return response;
  },
  getLedgerNumber: async () => {
    const response = await provider.ledger.getLedgerNumber();
    logResult("getLedgerNumber", response);
    return response;
  },
  getLedgerLeader: async (params) => {
    const response = await provider.ledger.getLedgerLeader(params);
    logResult("getLedgerLeader", response);
    return response;
  },
  getLedgerValidators: async (params) => {
    const response = await provider.ledger.getLedgerValidators(params);
    logResult("getLedgerValidators", response);
    return response;
  },
  getLedgerTxHashes: async (params) => {
    const response = await provider.ledger.getLedgerTxHashes(params);
    logResult("getLedgerTxHashes", response);
    return response;
  },
};

const accountProvider = {
  getAccount: async (params) => {
    const response = await provider.account.getAccount(params);
    logResult("getAccount", response);
    return response;
  },
  getAccountMetadata: async (params) => {
    const response = await provider.account.getAccountMetadata(params);
    logResult("getAccountMetadata", response);
    return response;
  },
  getAccountIncreaseNonce: async (params) => {
    const response = await provider.account.getAccountIncreaseNonce(params);
    logResult("getAccountIncreaseNonce", response);
    return response;
  },
  getAccountBalance: async (params) => {
    const response = await provider.account.getAccountBalance(params);
    logResult("getAccountBalance", response);
    return response;
  },
  getAccountPriv: async (params) => {
    const response = await provider.account.getAccountPriv(params);
    logResult("getAccountPriv", response);
    return response;
  },
};

const transactionProvider = {
  getTxPoolSize: async () => {
    const response = await provider.transaction.getTxPoolSize();
    logResult("getTxPoolSize", response);
    return response;
  },
  getTxPoolTransactions: async (limit, address, hash) => {
    const response = await provider.transaction.getTxPoolTransactions(
      limit,
      address,
      hash,
    );
    logResult("getTxPoolTransactions", response);
    return response;
  },
  getTransactionHistory: async (seq, start, limit, hash) => {
    const response = await provider.transaction.getTransactionHistory(
      seq,
      start,
      limit,
      hash,
    );
    logResult("getTransactionHistory", response);
    return response;
  },
  buildAccountCreateTx: async (params, signer) => {
    const response = await provider.transaction.buildAccountCreateTx(params, [
      signer,
    ]);
    logResult("buildAccountCreateTx", response);
    return response;
  },
  buildContractCreateTx: async (params, signer) => {
    const response = await provider.transaction.buildContractCreateTx(params, [
      signer,
    ]);
    logResult("buildContractCreateTx", response);
    return response;
  },
  buildGasSendTx: async (params, signer) => {
    const response = await provider.transaction.buildGasSendTx(params, [
      signer,
    ]);
    logResult("buildGasSendTx", response);
    return response;
  },
  buildContractInvokeTx: async (params, signer) => {
    const response = await provider.transaction.buildContractInvokeTx(params, [
      signer,
    ]);
    logResult("buildContractInvokeTx", response);
    return response;
  },
  buildSetMetadataTx: async (params, signer) => {
    const response = await provider.transaction.buildSetMetadataTx(params, [
      signer,
    ]);
    logResult("buildSetMetadataTx", response);
    return response;
  },
  buildSetPrivilegeTx: async (params, signer) => {
    const response = await provider.transaction.buildSetPrivilegeTx(params, [
      signer,
    ]);
    logResult("buildSetPrivilegeTx", response);
    return response;
  },
  buildBatchGasSend: async (params, signer) => {
    const response = await provider.transaction.buildBatchGasSend(params, [
      signer,
    ]);
    logResult("buildBatchGasSend", response);
    return response;
  },
  buildBatchContractInvoke: async (params, signer) => {
    const response = await provider.transaction.buildBatchContractInvoke(
      params,
      [signer],
    );
    logResult("buildBatchContractInvoke", response);
    return response;
  },
  submitTransaction: async (params) => {
    const response = await provider.transaction.submitTransaction(params);
    logResult("submitTransaction", response);
    return response;
  },
  estimateGas: async (params) => {
    const response = await provider.transaction.estimateGas(params);
    logResult("estimateGas", response);
    return response;
  },
};

const contractProvider = {
  checkContractAccount: async (params) => {
    const response = await provider.contract.checkContractAccount(params);
    logResult("checkContractAccount", response);
    return response;
  },
  getContractInfo: async (params) => {
    const response = await provider.contract.getContractInfo(params);
    logResult("getContractInfo", response);
    return response;
  },
  callContract: async (params) => {
    const response = await provider.contract.callContract(params);
    logResult("callContract", response);
    return response;
  },
};
const signerSignTransaction = "0x0102030405";
const signerContractAddress = "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS";
const signerInput = '{"method":"getsuperlist"}';

const ledgerSeq = 100;
const accountAddress = "did:bid:efEnXEGWYjHRw1CzK4KpWTdusnaRokk8";
const transactionBuildAccountCreateTxRequest = {
  params: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 1000,
    remarks: "",
  },
  destAddress: "did:bid:ef26vF64vKMTGM2uCGERVXJNAobFTm7wY",
  amount: 1,
};
const transactionBuildContractCreateTxRequest = {
  params: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 10000000,
    remarks: "test",
  },
  initBalance: 1,
  type: 1,
  payload:
    "608060405234801561000f575f80fd5b5061019a8061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80632e64cec1146100385780636057361d14610056575b5f80fd5b610040610072565b60405161004d91906100d2565b60405180910390f35b610070600480360381019061006b9190610119565b61007a565b005b5f8054905090565b805f819055507f23b3e9cfb15bae93d147362e55f22b745d66a37405bece55b6bfbdb35a0fb060816040516100af91906100d2565b60405180910390a150565b5f819050919050565b6100cc816100ba565b82525050565b5f6020820190506100e55f8301846100c3565b92915050565b5f80fd5b6100f8816100ba565b8114610102575f80fd5b50565b5f81359050610113816100ef565b92915050565b5f6020828403121561012e5761012d6100eb565b5b5f61013b84828501610105565b9150509291505056fea2646970667358221220bb054df7a684290d3dceeca77407e3f5a111ba0b1ef00e88956c5e4f2f970ca664736f6c637822302e382e32312d63692e323032342e332e312b636f6d6d69742e31383065353661320053",
  initInput: "",
};
const transactionBuildGasSendTxRequest = {
  params: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 10000,
    remarks: "test",
  },
  destAddress: "did:bid:ef27sVwzEMTEUwC1E1ivQmzEccsphtac7",
  amount: 1,
};
const buildContractInvokeTxRequest = {
  params: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 100000,
    remarks: "test",
  },
  contractAddress: "did:bid:efhj9cgStGJckhLwHZefYS9Yje38NVuP",
  input: '{"function":"store(uint256)","args":"1"}',
  amount: 0,
};
const buildSetMetadataTxRequest = {
  params: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 10000,
    remarks: "test",
  },
  key: "A",
  value: "C",
  version: 1,
};
const buildSetPrivilegeTxRequest = {
  params: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 10000,
    remarks: "test",
  },
  masterWeight: "1",
  signers: [
    {
      address: "did:bid:efsdhXX7bNYxeYYVasatAi7DPE4nM3Lb",
      weight: 1,
    },
  ],
  txThreshold: "1",
  typeThresholds: [
    {
      type: 1,
      threshold: 1,
    },
  ],
};

const buildBatchGasSendRequest = {
  base: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 10000,
    remarks: "test",
  },
  params: [
    {
      destAddress: "did:bid:zfkeY37hHn2HGSeUpEdWuH76aJbkoX6H",
      amount: 1,
    },
    {
      destAddress: "did:bid:zfkeY37hHn2HGSeUpEdWuH76aJbkoX6H",
      amount: 1,
    },
  ],
};
const buildBatchContractInvokeRequest = {
  base: {
    nonceType: 0,
    gasPrice: 1,
    feeLimit: 1000000,
    remarks: "test",
  },
  params: [
    {
      contractAddress: "did:bid:efYzPhz9f3aFNAZZ42bhbLetBxPyYLdk",
      input: '{"function":"store(uint256)","args":"5"}',
      amount: 0,
    },
    {
      contractAddress: "did:bid:efYzPhz9f3aFNAZZ42bhbLetBxPyYLdk",
      input: '{"function":"store(uint256)","args":"6"}',
      amount: 0,
    },
  ],
};
const estimateGasRequest = {
  items: [
    {
      transactionJson: {
        feeLimit: 100000,
        sourceAddress: "did:bid:zfVHJnop875UMPmskam4JC4kLW4tAaDK",
        gasPrice: 1,
        nonce: "95",
        operations: [
          {
            type: 7,
            payCoin: {
              destAddress: "did:bid:ef24McYxrgR5PJUPqw8Ldhsd8XUYx1sSN",
              amount: 1,
            },
          },
        ],
      },
      signatureNumber: 1,
    },
  ],
};
const contractAddress = "did:bid:efhj9cgStGJckhLwHZefYS9Yje38NVuP";
const contractCallContractRequest = {
  contractAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
  sourceAddress: "did:bid:efRH1Lbsuqwc6jRw3hK4H5Hp2RhHnryS",
  input: '{"method":"getsuperlist"}',
};
(async () => {
  try {
    //signer相关接口
    signerT.getAddress();
    signerT.signTransaction(signerSignTransaction);
    await signerT.getBalance();
    await signerT.getIncreaseNonce();
    await signerT.callContract(signerContractAddress, signerInput);
    await signerT.getAccount();
    await signerT.getLedgerNumber();

    //链相关接口
    await chainProvider.getChainInfo();
    await chainProvider.getNetworkId();
    //账本相关
    await ledgerProvider.getLedger(ledgerSeq);
    await ledgerProvider.getLedgerNumber();
    await ledgerProvider.getLedgerLeader(ledgerSeq);
    await ledgerProvider.getLedgerValidators(ledgerSeq);
    await ledgerProvider.getLedgerTxHashes(ledgerSeq);
    //账户相关
    await accountProvider.getAccount(accountAddress);
    await accountProvider.getAccountMetadata(accountAddress);
    await accountProvider.getAccountIncreaseNonce(accountAddress);
    await accountProvider.getAccountBalance(accountAddress);
    await accountProvider.getAccountPriv(accountAddress);
    //交易相关
    await transactionProvider.getTxPoolSize();
    await transactionProvider.getTxPoolTransactions();
    await transactionProvider.getTransactionHistory();
    await transactionProvider.buildAccountCreateTx(
      transactionBuildAccountCreateTxRequest,
      signerWithProvider,
    );
    await transactionProvider.buildContractCreateTx(
      transactionBuildContractCreateTxRequest,
      signerWithProvider,
    );
    await transactionProvider.buildGasSendTx(
      transactionBuildGasSendTxRequest,
      signerWithProvider,
    );
    await transactionProvider.buildContractInvokeTx(
      buildContractInvokeTxRequest,
      signerWithProvider,
    );
    await transactionProvider.buildSetMetadataTx(
      buildSetMetadataTxRequest,
      signerWithProvider,
    );
    await transactionProvider.buildSetPrivilegeTx(
      buildSetPrivilegeTxRequest,
      signerWithProvider,
    );
    await transactionProvider.buildBatchGasSend(
      buildBatchGasSendRequest,
      signerWithProvider,
    );
    const tx = await transactionProvider.buildBatchContractInvoke(
      buildBatchContractInvokeRequest,
      signerWithProvider,
    );
    await transactionProvider.submitTransaction({ items: [tx.result] });
    await transactionProvider.estimateGas(estimateGasRequest);
    //合约相关
    await contractProvider.checkContractAccount(contractAddress);
    await contractProvider.getContractInfo(contractAddress);
    await contractProvider.callContract(contractCallContractRequest);
  } catch (error) {
    console.error("出错:", error);
  }
})();
