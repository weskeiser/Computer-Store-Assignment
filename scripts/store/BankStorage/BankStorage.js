import { MainStorage } from "../MainStorage.js";

export class BankStorage extends MainStorage {
  constructor(identifier) {
    super(identifier);
  }

  get balance() {
    return parseInt(this.storage.balance);
  }

  get loan() {
    return parseInt(this.storage.loan);
  }

  get loanOffer() {
    return parseInt(this.storage.loanOffer);
  }

  updateLoanOffer(offer) {
    this.storage.loanOffer = offer;
    this._store();
  }
}
