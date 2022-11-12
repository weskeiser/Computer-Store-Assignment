const initialViewName = "bank";

const delegate = (el, selector, event, handler) => {
  el.addEventListener(event, (e) => {
    if (e.target.matches(selector)) handler(e, el);
  });
};

const $$ = {
  banking: {
    balance: document.querySelector('[data-bank="balance"]'),
    loanAmount: document.querySelector('[data-loan="amount"]'),
    loanApplyModal: document.querySelector('[data-loan="application-modal"]'),
    loanApplyButton: document.querySelector('[data-loan="init-button"]'),
    loanConfirmation: document.querySelector('[data-loan="confirmation"]'),
    loanConfirmationStatus: document.querySelector(
      '[data-loan="confirmation-status"]'
    ),
    loanTerms: document.querySelector('[data-loan="terms"]'),
    loanStatus: document.querySelector('[data-loan="confirmation"]'),
  },
};

const $ = {
  nav: document.querySelector('[data-view="nav"]'),
  initialView: document.querySelector(`[data-template=${initialViewName}]`)
    .content,
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
        this.mainSheet = this.newStyleSheetLink("./css/main.css");

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.prepend(this.mainSheet);
        shadowRoot.appendChild($.initialView.cloneNode(true));

        this.render(initialViewName, viewClasses);

        $.nav.addEventListener("pointerup", ({ target: { name } }) => {
          this.replaceView(name);
          this.render(name, viewClasses);
        });
      }

      newStyleSheetLink(url) {
        const mainSheet = document.createElement("link");
        mainSheet.setAttribute("rel", "stylesheet");
        mainSheet.setAttribute("href", url);

        return mainSheet;
      }

      replaceView(selectedViewName) {
        $.allViews.forEach((view) => {
          if (view.dataset.template === selectedViewName) {
            this.shadowRoot.replaceChildren(this.mainSheet);
            this.shadowRoot.appendChild(view.content.cloneNode(true));
          }
        });
      }

      render(selectedViewName, viewClasses) {
        const viewClassObj = viewClasses.find((viewClassObj) => {
          return viewClassObj[selectedViewName];
        });

        console.log(selectedViewName);
        const viewClass = viewClassObj[selectedViewName];

        viewClass.previouslyRendered
          ? viewClass.render()
          : viewClass.initialRender();
      }

      // connectedCallback() {}
    }
  );

  customElements.define(
    "loan-view",
    class extends HTMLElement {
      constructor() {
        super();
        const mainView = document.querySelector("main-view").shadowRoot;

        const applyTemplate = mainView.querySelector(
          '[data-loan="apply-template"]'
        ).content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(applyTemplate.cloneNode(true));

        const applyButton = applyTemplate.querySelector(
          '[data-loan="apply-btn"]'
        );

        // - Show modal
        const loanApplyModal = applyTemplate.querySelector(
          '[data-loan="application-modal"]'
        );

        console.log(applyButton);
        this.newShadowEvent(
          "pointerdown",
          '[data-loan="apply-btn"]',
          (btn, e) => {
            e.button !== 0 ? null : loanApplyModal.showModal();
          }
        );

        ///
        //
        // const slot = this.querySelector('[data-loan="slot"]');
        // slot.setAttribute("slot", "loan-slot");
      }

      newShadowEvent(event, selector, handler) {
        delegate(this.shadowRoot, selector, event, (e) => {
          const $el = e.target.closest(selector);
          handler($el, e);
        });
      }
    }
  );
};
