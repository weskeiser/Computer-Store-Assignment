export class MainStorage extends EventTarget {
  constructor(identifier) {
    super();
    this.identifier = identifier;
    this.storageKey = "storage";
    this._fetchStorage();

    if (!window.localStorage.getItem(this.storageKey)) {
      const storage = {
        balance: 0,
        loan: 0,
        loanOffer: 0,
        earnings: 0,
        laptops: {
          selectedId: 1,
          purchased: [],
        },
      };

      window.localStorage.setItem(this.storageKey, JSON.stringify(storage));
    }

    window.addEventListener(
      "storage",
      () => {
        this._fetchStorage();
        this._store();
      },
      false
    );
  }

  get allData() {
    return this.storage;
  }

  _fetchStorage() {
    this.storage = JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  _store() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    this.dispatchEvent(new CustomEvent(this.identifier));
  }
}
