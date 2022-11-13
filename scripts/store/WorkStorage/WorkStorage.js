import { MainStorage } from "../MainStorage.js";

export class WorkStorage extends MainStorage {
  constructor(storageKey, identifier) {
    super(storageKey, identifier);
  }

  get earnings() {
    return parseInt(this.storage.earnings);
  }

  _store() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    this.dispatchEvent(new CustomEvent(this.identifier));
  }

  _fetchStorage() {
    this.storage = JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  increaseEarnings(earnings) {
    this.storage.earnings = this.earnings + earnings;
    this._store();
  }
}
