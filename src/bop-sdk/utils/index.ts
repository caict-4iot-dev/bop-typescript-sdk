import { EncryptionAddress } from "./encryption-address";
import { EncryptionCrypto } from "./encryption-crypto";
import { EncryptionMnemonics } from "./encryption-mnemonics";
import { AbiCoder, defaultAbiCoder, Interface } from "./abi";

class DefaultUtils {
  public address: EncryptionAddress;
  public crypto: EncryptionCrypto;
  public mnemonics: EncryptionMnemonics;
  public abi: AbiCoder;
  constructor() {
    this.address = new EncryptionAddress();
    this.crypto = new EncryptionCrypto();
    this.mnemonics = new EncryptionMnemonics();
    this.abi = defaultAbiCoder;
  }
}

export const defaultUtils = new DefaultUtils();

export {
  AbiCoder,
  Interface,
  EncryptionAddress,
  EncryptionCrypto,
  EncryptionMnemonics,
};
