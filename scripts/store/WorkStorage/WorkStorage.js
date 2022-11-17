import { MainStorage } from "../MainStorage.js";

export class WorkStorage extends MainStorage {
  constructor(identifier) {
    super(identifier);
  }

  get earnings() {
    return parseInt(this.storage.earnings);
  }

  increaseEarnings(earnings) {
    this.storage.earnings += earnings;
    this._store();
    return;
  }

  salaryToBalance(earnings) {
    this.storage.balance += earnings;
    this._store();
  }

  depositSalary() {
    const { loan, earnings } = this.storage;

    this.storage.earnings = 0;

    if (!loan) {
      this.salaryToBalance(earnings);
      return;
    }

    const maxRepayment = earnings * 0.1;
    const loanAfterRepay = loan - maxRepayment;

    if (loanAfterRepay <= 0) {
      this.storage.loan = 0;
      this.storage.balance -= loanAfterRepay;
      this.storage.balance += earnings * 0.9;
    } else {
      this.storage.loan = loanAfterRepay;
      this.storage.balance += earnings * 0.9;
    }

    this._store();
  }

  repayLoan() {
    const { loan, earnings } = this.storage;

    this.storage.earnings = 0;

    if (!loan) {
      this.salaryToBalance(earnings);
      return;
    }

    const afterRepay = loan - earnings;

    if (afterRepay < 0) {
      this.storage.loan = 0;
      this.storage.balance -= afterRepay;
    } else {
      this.storage.loan = afterRepay;
    }

    this._store();
  }
}
