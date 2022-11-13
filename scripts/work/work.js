import { MainViews } from "../MainViews/MainViews.js";
import { qs, replaceHTML } from "../utils.js";

export class Work extends MainViews {
  render() {
    console.log(1, "- Render-Begin-WORK -", 1);

    const earnings = this.storage.getEarnings();
    const earningsEl = qs(this.mainView, '[data-work="earnings"]');

    replaceHTML(earningsEl, earnings);

    console.log(1, "- Render-End-WORK -", 1);
  }
}
