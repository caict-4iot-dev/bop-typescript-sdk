import { account as Account } from "./abstract-account";
import { chain as Chain } from "./abstract-chain";
import { contract as Contract } from "./abstract-contract";
import { ledger as Ledger } from "./abstract-ledger";
import { transaction as Transaction } from "./abstract-transaction";

export abstract class Provider {
  public chain: Chain;
  public ledger: Ledger;
  public account: Account;
  public transaction: Transaction;
  public contract: Contract;
}
