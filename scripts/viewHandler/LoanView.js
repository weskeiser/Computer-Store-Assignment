import { qs } from "../utils.js";

export const LoanView = (bankController) => {
  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();
        const mainView = qs(document, "main-view").shadowRoot;

        const applyTemplate = qs(
          mainView,
          '[data-loan="apply-template"]'
        ).content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(applyTemplate.cloneNode(true));

        bankController.handleView(this);
      }

      // slot.setAttribute("slot", "loan-slot");
      // dataStore.updateLoanOffer(requestAmount.value);
      //
      // const slot = this.querySelector('[data-loan="slot"]');
      // slot.setAttribute("slot", "loan-slot");
      //

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

      ///
      //
      // const slot = this.querySelector('[data-loan="slot"]');
      // slot.setAttribute("slot", "loan-slot");
    }
  );
};
