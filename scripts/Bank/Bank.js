import { MainViews } from "../MainViews/MainViews.js";
import { multiQs, newShadowEvent, qs, replaceHTML } from "../utils.js";
import { isEligible } from "./checkEligibility.js";

export class Bank extends MainViews {
  constructor(storage) {
    super(storage);
  }

  render() {
    console.log(22, "- Render-Begin-BANK -", 22);

    const { balance, loan } = this.storage;

    const [balanceEl, owedEl] = multiQs(
      this.mainView,
      '[data-bank="balance"]',
      '[data-loan="amount"]'
    );

    replaceHTML(balanceEl, balance);
    replaceHTML(owedEl, loan);

    console.log(22, "- Render-End-BANK -", 22);
  }

  handleView(customEl) {
    // - Show modal

    const mainView = qs(document, "main-view");

    newShadowEvent(
      customEl.shadowRoot,
      "pointerdown",
      '[data-loan="apply-btn"]',
      (e, btn) => {
        const modal = btn.nextElementSibling;
        e.button !== 0 ? null : modal.showModal();
      }
    );

    newShadowEvent(customEl.shadowRoot, "submit", "#loanApplication", (e) => {
      if (e.submitter.name === "cancel") return;

      const dataStore = this.storage;

      const { requestAmount } = e.target;

      const eligible = isEligible(
        dataStore.allData,
        parseInt(requestAmount.value)
      );

      // Template change

      const statusTemplate = qs(
        mainView.shadowRoot,
        '[data-loan="status-template"]'
      );
      customEl.shadowRoot.replaceChildren(
        statusTemplate.content.cloneNode(true)
      );

      // Handle form

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
    });

    newShadowEvent(
      customEl.shadowRoot,
      "submit",
      '[data-loan="confirmation"]',
      (e, el) => {
        e.preventDefault();
      }
    );
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
