import { Provider } from "./abstract-service/abstract-provider";
import { BopInterface } from "../../bop/bop-base";
import { ChainByBop } from "./service/chain";
import { LedgerByBop } from "./service/ledger";
import { AccountByBop } from "./service/account";
import { TransactionByBop } from "./service/transaction";
import { ContractByBop } from "./service/contract";
import { BopByBop } from "./service/3rd";

export class ProviderByBop extends Provider {
  public bop: BopByBop;

  constructor(bop: BopInterface) {
    super();
    this.chain = new ChainByBop(bop);
    this.ledger = new LedgerByBop(bop);
    this.account = new AccountByBop(bop);
    this.transaction = new TransactionByBop(bop);
    this.contract = new ContractByBop(bop);
    this.bop = new BopByBop(bop);
  }
}
