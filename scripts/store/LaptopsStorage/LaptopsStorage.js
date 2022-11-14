import { MainStorage } from "../MainStorage.js";

export class LaptopsStorage extends MainStorage {
  constructor(identifier) {
    super(identifier);
  }

  getSelectedLaptopId() {
    const { selectedId } = this.storage.laptops;
    return selectedId ? selectedId : false;
  }

  setSelectedLaptop(id) {
    this.storage.laptops.selectedId = id;
    this._store();
  }

  getPurchasedById(id) {
    return this.storage.laptops.purchased.find((laptop) => laptop.id === id);
  }

  getStockFromPurchased(id) {
    const existing = this.getPurchasedById(id);
    if (existing) return existing.quantity;
    return 0;
  }

  handlePurchase(id, amount) {
    const { purchased } = this.storage.laptops;

    const alreadyPurchased = this.getPurchasedById(id);

    if (alreadyPurchased) {
      const idx = purchased.indexOf(alreadyPurchased);
      this.storage.laptops.purchased[idx].quantity += 1;
    } else {
      purchased.push({
        id,
        quantity: 1,
      });
    }

    this.storage.balance = this.storage.balance - amount;
    this._store();
  }
}
