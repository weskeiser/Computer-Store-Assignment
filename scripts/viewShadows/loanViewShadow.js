import { newStyleSheetLink, qs } from "../utils.js";

export const loanViewShadow = (bankController) => {
  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();

        this.sheet = newStyleSheetLink("./css/loan-view/loan-view.css");

        const applyTemplate = qs(
          bankController.mainView.shadowRoot,
          '[data-loan="apply-template"]'
        ).content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.prepend(this.sheet);
        shadowRoot.appendChild(applyTemplate.cloneNode(true));
      }
    }
  );
};
