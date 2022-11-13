import { MainStorage } from "../MainStorage.js";

export class BankStorage extends MainStorage {
  constructor(storageKey, identifier) {
    super(storageKey, identifier);

    this.getBalance = () => {
      return parseInt(this.storage.balance);
    };

    this.getLoan = () => {
      return parseInt(this.storage.loan);
    };

    this.getLoanOffer = () => {
      return parseInt(this.storage.loanOffer);
    };
  }

  deposit(depositAmount) {
    this.storage.balance = this.getBalance() + depositAmount;
    this._store();
  }

  updateLoanOffer(offer) {
    this.storage.loanOffer = offer;
    this._store();
  }
}
