import { qs } from "../utils.js";

export const LoanView = (bankController) => {
  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();

        const applyTemplate = qs(
          bankController.mainView.shadowRoot,
          '[data-loan="apply-template"]'
        ).content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(applyTemplate.cloneNode(true));

        bankController.loanViewInit(this);
      }
    }
  );
};
