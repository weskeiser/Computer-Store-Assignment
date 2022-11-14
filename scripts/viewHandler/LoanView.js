import { qs } from "../utils.js";

export const LoanView = (bankController) => {
  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();

        this.mainSheet = this.newStyleSheetLink(
          "./css/main-view/main-view.css"
        );

        const applyTemplate = qs(
          bankController.mainView.shadowRoot,
          '[data-loan="apply-template"]'
        ).content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.prepend(this.mainSheet);
        shadowRoot.appendChild(applyTemplate.cloneNode(true));

        bankController.loanViewInit(this);
      }
      newStyleSheetLink(url) {
        const mainSheet = document.createElement("link");
        mainSheet.setAttribute("rel", "stylesheet");
        mainSheet.setAttribute("href", url);

        return mainSheet;
      }
    }
  );
};
