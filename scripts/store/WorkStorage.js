export const WorkStorage = class extends EventTarget {
  constructor(storageKey) {
    super();
    this.storageKey = storageKey;
    this._fetchStorage();

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

    this.getEarnings = () => {
      return parseInt(this.storage.earnings);
    };
  }

  name() {
    return 2;
  }

  _store() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    this.dispatchEvent(new CustomEvent("storeWork"));
  }

  _fetchStorage() {
    this.storage = JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  increaseEarnings(earnings) {
    this.storage.earnings = this.getEarnings() + earnings;
    this._store();
  }
};
