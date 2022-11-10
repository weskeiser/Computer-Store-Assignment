export const viewHandlers = (views) => {
  customElements.define(
    "main-view",
    class extends HTMLElement {
      constructor() {
        super();

        // const mainView = document.querySelector(
        //   '[data-view="container"]'
        // ).content;

        const initialView =
          document.querySelector('[data-test="work"]').content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(initialView.cloneNode(true));

        // const workButton = initialView.querySelector(
        //   '[data-work="work-button"]'
        // );

        // workButton.addEventListener("click", () => {
        //   console.log(3);
        //   dataStore.increaseEarnings(100);
        // });

        // console.log(initialView);
        // const workView = document.querySelector('[data-view="work"]');
        // console.log(workView);

        // initialView.setAttribute("slot", "current-view");

        // console.log(shadowRoot);

        // const { navButtons, allViews } = views;

        // navButtons.forEach((btn) =>
        //   btn.addEventListener("pointerup", () => {
        //     allViews.forEach((view) => {
        //       view.dataset.view !== btn.name
        //         ? view.removeAttribute("slot")
        //         : view.setAttribute("slot", "current-view");
        //     });
        //   })
        // );
      }
    }
  );

  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();

        const template = document.querySelector(
          '[data-loan="loan-template"]'
        ).content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));

        const applyButton = this.querySelector('[data-loan="init-button"]');
        applyButton.setAttribute("slot", "loan-slot");
      }
    }
  );
};
