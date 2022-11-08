export const viewHandlers = (views) => {
  customElements.define(
    "main-view",
    class extends HTMLElement {
      constructor() {
        super();

        const template = document.querySelector(
          '[data-view="template"]'
        ).content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));

        const initialView = this.querySelector('[data-view="bank"]');
        initialView.setAttribute("slot", "current-view");

        views.viewNav.addEventListener("change", (e) => {
          const input = e.target;
          const viewName = input.dataset.nav;
          const label = input.nextElementSibling;

          const { viewContainer, allViews } = views;

          viewContainer.dataset.viewDisplayed = viewName;

          allViews.forEach((view) => {
            view.dataset.view !== viewName
              ? view.removeAttribute("slot")
              : view.setAttribute("slot", "current-view");
          });

          label.className = "pink";
        });
      }
    }
  );

  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();

        const template = document.querySelector(
          '[data-bank="loan-template"]'
        ).content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));

        const applyButton = this.querySelector(
          '[data-bank="loan-apply-button"]'
        );
        applyButton.setAttribute("slot", "loan-slot");
      }
    }
  );
};
