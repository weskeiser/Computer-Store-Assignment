export const MainStorage = class extends EventTarget {
  constructor(storageKey, identifier) {
    super();
    this.storageKey = storageKey;
    this._fetchStorage();
    this.identifier = identifier;

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
  }

  _store() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    this.dispatchEvent(new CustomEvent(this.identifier));
  }

  _fetchStorage() {
    this.storage = JSON.parse(window.localStorage.getItem(this.storageKey));
  }
};
