import { MainViews } from "../../MainViews/MainViews.js";
import { multiQs, addDeepListener, qs, replaceHTML } from "../../utils.js";
import { LoanView } from "../../viewHandler/LoanView.js";
import { isEligible } from "./checkEligibility.js";

export class Bank extends MainViews {
  constructor(storage) {
    super(storage);
    LoanView(this);
  }

  render() {
    console.log(22, "- Render-Begin-BANK -", 22);

    const { balance, loan } = this.storage;

    const [balanceEl, owedEl] = multiQs(
      this.mainView.shadowRoot,
      '[data-bank="balance"]',
      '[data-loan="amount"]'
    );

    replaceHTML(balanceEl, balance);
    replaceHTML(owedEl, loan);

    console.log(22, "- Render-End-BANK -", 22);
  }

  loanViewInit(customEl) {
    addDeepListener(
      customEl.shadowRoot,
      "click",
      '[data-loan="apply-btn"]',
      this.showApplyModal
    );

    addDeepListener(customEl.shadowRoot, "submit", "#loanApplication", (e) =>
      this.handleLoanApplication(e, customEl)
    );

    addDeepListener(
      customEl.shadowRoot,
      "submit",
      '[data-loan="confirmation"]',
      (e, el) => {
        e.preventDefault();
        console.log(e);
        console.log(el);

        if (e.submitter.name === "decline") {
          // change view
          return;
        }

        const { loanOffer } = this.storage.storage.loanOffer;

        const eligible = isEligible(this.storage.storage, parseInt(loanOffer));
        console.log(eligible);
      }
    );
  }

  showApplyModal(e, btn) {
    const modal = btn.nextElementSibling;
    e.button !== 0 ? null : modal.showModal();
  }

  changeTemplate(customEl, selector) {
    const template = qs(this.mainView.shadowRoot, selector);

    customEl.shadowRoot.replaceChildren(template.content.cloneNode(true));
  }

  handleLoanApplication(e, customEl) {
    if (e.submitter.name === "cancel") return;

    this.changeTemplate(customEl, '[data-loan="status-template"]');

    this.handleLoanApplicationForm(customEl, e);
  }

  handleLoanApplicationForm(customEl, e) {
    const dataStore = this.storage;
    const { requestAmount } = e.target;
    const eligible = isEligible(
      dataStore.allData,
      parseInt(requestAmount.value)
    );

    const [form, termsSlot] = multiQs(
      customEl.shadowRoot,
      '[data-loan="confirmation"]',
      '[data-loan="terms-slot"]'
    );

    const table = qs(form, "table");
    const {
      caption,
      tHead,
      rows: { statusAmount },
    } = table;

    if (!eligible) {
      caption.insertAdjacentHTML("beforebegin", "Ineligible");
      tHead.insertAdjacentHTML(
        "beforebegin",
        "You are not eligible for a loan"
      );
      statusAmount.insertAdjacentHTML("beforebegin", "");
      termsSlot.removeAttribute("name", "terms-slot");
    } else {
      caption.insertAdjacentHTML("beforebegin", "Eligible");
      tHead.insertAdjacentHTML("beforebegin", "tHeadTextt");
      statusAmount.insertAdjacentHTML("beforebegin", requestAmount.value);
      termsSlot.setAttribute("name", "terms-slot");
    }
  }
}
