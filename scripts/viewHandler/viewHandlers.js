const $ = {
  navButtons: document.querySelectorAll('[data-view="nav"] > button'),
  initialView: document.querySelector('[data-template="bank"]').content,
  allViews: document.querySelectorAll(
    '[data-template="bank"], [data-template="work"], [data-template="laptops"]'
  ),
};

export const viewHandlers = (...viewClasses) => {
  customElements.define(
    "main-view",
    class extends HTMLElement {
      constructor() {
        super();

        const mainSheet = document.createElement("link");
        mainSheet.setAttribute("rel", "stylesheet");
        mainSheet.setAttribute("href", "./css/main.css");

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(mainSheet);
        shadowRoot.appendChild($.initialView.cloneNode(true));

        //--------------
        //sha
        $.navButtons.forEach((btn) =>
          btn.addEventListener("pointerup", () => {
            $.allViews.forEach((view) => {
              if (view.dataset.template === btn.name) {
                shadowRoot.replaceChildren(mainSheet);
                shadowRoot.appendChild(view.content.cloneNode(true));
              }
            });

            const viewClassObj = viewClasses.find((viewClass) => {
              const viewName = Object.keys(viewClass)[0];
              return viewName === btn.name;
            });

            const viewClass = Object.values(viewClassObj)[0];

            viewClass.previouslyRendered
              ? viewClass.render()
              : viewClass.initialRender();
          })
        );
      }
    }
  );

  // customElements.define(
  //   "loan-view",
  //   class extends HTMLElement {
  //     constructor() {
  //       super();

  //       const template = document.querySelector(
  //         '[data-loan="loan-template"]'
  //       ).content;
  //       const shadowRoot = this.attachShadow({ mode: "open" });
  //       shadowRoot.appendChild(template.cloneNode(true));

  //       const applyButton = this.querySelector('[data-loan="init-button"]');
  //       applyButton.setAttribute("slot", "loan-slot");
  //     }
  //   }
  // );
};
