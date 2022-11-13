import { MainStorage } from "../MainStorage.js";

export class WorkStorage extends MainStorage {
  constructor(identifier) {
    super(identifier);
  }

  get earnings() {
    return parseInt(this.storage.earnings);
  }

  increaseEarnings(earnings) {
    this.storage.earnings = this.earnings + earnings;
    this._store();
  }
}
