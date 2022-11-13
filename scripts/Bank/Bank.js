import { MainViews } from "../MainViews/MainViews.js";
import { multiQs, newDeepEvent, qs, replaceHTML } from "../utils.js";
import { LoanView } from "../viewHandler/LoanView.js";
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
    // - Show modal
    newDeepEvent(
      customEl.shadowRoot,
      "pointerdown",
      '[data-loan="apply-btn"]',
      this.showModal
    );

    newDeepEvent(customEl.shadowRoot, "submit", "#loanApplication", (e) =>
      this.handleLoanApplication(e, customEl)
    );
  }

  showModal(e, btn) {
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

    this.handleForm(customEl, e);
  }

  handleForm(customEl, e) {
    const dataStore = this.storage;
    const { requestAmount } = e.target;
    const eligible = isEligible(
      dataStore.allData,
      parseInt(requestAmount.value)
    );

    const form = qs(customEl.shadowRoot, '[data-loan="confirmation"]');
    const table = qs(form, "table");
    const { caption, tHead, rows } = table;
    const { statusAmount } = rows;

    if (!eligible) {
      caption.insertAdjacentHTML("beforebegin", "Ineligible");
      tHead.insertAdjacentHTML(
        "beforebegin",
        "You are not eligible for a loan"
      );
      statusAmount.insertAdjacentHTML("beforebegin", "");
      // loanTerms.classList.add("hidden");
    } else {
      caption.insertAdjacentHTML("beforebegin", "Eligible");
      tHead.insertAdjacentHTML("beforebegin", "tHeadTextt");
      statusAmount.insertAdjacentHTML("beforebegin", requestAmount.value);
      // loanTerms.classList.remove("hidden");
    }
  }
}

// // - Handle loan confirmation
// loanConfirmation.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (e.submitter.name === "decline") {
//     loanStatus.removeAttribute("slot");
//     loanApplyButton.setAttribute("slot", "loan-slot");
//     return;
//   }

//   const {loanOffer} = dataStore;
//   const eligible = isEligible(dataStore.allData, parseInt(loanOffer));
// });
