import { addDeepListener, multiQs, qs, replaceHTML } from "../../utils.js";
import { MainViews } from "../../MainViews/MainViews.js";
import { WorkStorage } from "../../store/WorkStorage/WorkStorage.js";

const workStorage = new WorkStorage("WorkStorage");

export class Work extends MainViews {
  constructor() {
    super(workStorage);
  }

  render() {
    console.log(1, "- Render-Begin-WORK -", 1);

    const earnings = this.storage.earnings;
    const earningsEl = qs(this.mainView.shadowRoot, '[data-work="earnings"]');

    replaceHTML(earningsEl, earnings);

    console.log(1, "- Render-End-WORK -", 1);
  }

  bindEvents() {
    const [workButton, depositButton, repayButton] = multiQs(
      this.mainView.shadowRoot,
      '[data-work="work-button"]',
      '[data-work="deposit-button"]',
      '[data-work="repay-button"]'
    );

    workButton.addEventListener("pointerdown", () => {
      this.storage.increaseEarnings(100);
    });

    depositButton.addEventListener("pointerdown", () => {
      this.storage.depositSalary();
    });

    repayButton.addEventListener("pointerdown", () => {
      this.storage.repayLoan();
    });
  }

  init() {
    this.bindEvents();
    this.render();
  }
}
