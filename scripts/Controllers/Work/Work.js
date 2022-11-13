import { MainViews } from "../../MainViews/MainViews.js";
import { addDeepListener, qs, replaceHTML } from "../../utils.js";

export class Work extends MainViews {
  constructor(identifier) {
    super(identifier);
  }

  render() {
    console.log(1, "- Render-Begin-WORK -", 1);

    const earnings = this.storage.earnings;
    const earningsEl = qs(this.mainView.shadowRoot, '[data-work="earnings"]');

    replaceHTML(earningsEl, earnings);

    console.log(1, "- Render-End-WORK -", 1);
  }

  init() {
    this.storage.addEventListener(this.storage.identifier, () => this.render());

    addDeepListener(
      this.mainView.shadowRoot,
      "pointerdown",
      '[data-work="work-button"]',
      () => {
        this.storage.increaseEarnings(100);
      }
    );

    addDeepListener(
      this.mainView.shadowRoot,
      "pointerdown",
      '[data-work="deposit-button"]',
      () => {
        this.storage.depositSalary();
      }
    );

    addDeepListener(
      this.mainView.shadowRoot,
      "pointerdown",
      '[data-work="repay-button"]',
      () => {
        this.storage.repayLoan();
      }
    );
  }
}
