import { MainViews } from "../MainViews/MainViews.js";
import { newDeepEvent, qs, replaceHTML } from "../utils.js";

export class Work extends MainViews {
  constructor(storage) {
    super(storage);
  }

  render() {
    console.log(1, "- Render-Begin-WORK -", 1);

    const earnings = this.storage.earnings;
    const earningsEl = qs(this.mainView.shadowRoot, '[data-work="earnings"]');

    replaceHTML(earningsEl, earnings);

    console.log(1, "- Render-End-WORK -", 1);
  }

  init() {
    newDeepEvent(
      this.mainView.shadowRoot,
      "pointerdown",
      '[data-work="work-button"]',
      () => {
        this.storage.increaseEarnings(100);
      }
    );
  }
}
