export const DataStore = class extends EventTarget {
  constructor(storageKey) {
    super();
    this.storageKey = storageKey;
    this._readStorage();

    if (!window.localStorage.getItem(this.storageKey)) {
      const storage = {
        balance: 0,
        loan: 0,
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

    this.getEarnings = () => {
      return parseInt(this.storage.earnings);
    };
  }

  _store() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    this.dispatchEvent(new CustomEvent("store"));
  }

  _readStorage() {
    this.storage = JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  deposit(depositAmount) {
    this.storage.balance = this.getBalance() + depositAmount;
    this._store();
  }

  increaseEarnings(earnings) {
    this.storage.earnings = this.getEarnings() + earnings;
    this._store();
  }
};
