export const BankStorage = class extends EventTarget {
  constructor(storageKey) {
    super();
    this.storageKey = storageKey;
    this._fetchStorage();
    this.identifier = "BankStorage";

    if (!window.localStorage.getItem(this.storageKey)) {
      const storage = {
        balance: 0,
        loan: 0,
        loanOffer: 0,
        earnings: 0,
        laptops: {},
      };
      window.localStorage.setItem(this.storageKey, JSON.stringify(storage));
    }

    this.getData = () => {
      return this.storage;
    };

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

  _store() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    this.dispatchEvent(new CustomEvent(this.identifier));
  }

  _fetchStorage() {
    this.storage = JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  deposit(depositAmount) {
    this.storage.balance = this.getBalance() + depositAmount;
    this._store();
  }

  updateLoanOffer(offer) {
    this.storage.loanOffer = offer;
    this._store();
  }
};
