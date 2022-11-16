import { MainStorage } from "../MainStorage.js";

export class BankStorage extends MainStorage {
  constructor(identifier) {
    super(identifier);
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

  updateLoan(amount) {
    this.storage.loan += amount;
    this._store();
  }
}
