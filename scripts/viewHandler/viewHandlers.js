import { isEligible } from "../bank/checkEligibility.js";
import { qs, qsA } from "../utils.js";

const initialViewName = "bank";

const delegate = (el, selector, event, handler) => {
  el.addEventListener(event, (e) => {
    if (e.target.matches(selector)) handler(e, el);
  });
};

const $ = {
  nav: qs(document, '[data-view="nav"]'),
  initialView: qs(document, `[data-template=${initialViewName}]`).content,
  allViews: qsA(
    document,
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

        const viewClass = viewClassObj[selectedViewName];

        viewClass.previouslyRendered
          ? viewClass.render()
          : viewClass.initialRender();
      }
    }
  );

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

        // - Show modal

        this.newShadowEvent(
          "pointerdown",
          '[data-loan="apply-btn"]',
          (btn, e) => {
            const modal = btn.nextElementSibling;
            e.button !== 0 ? null : modal.showModal();
          }
        );

        this.newShadowEvent("submit", "#loanApplication", (frm, e) => {
          if (e.submitter.name === "cancel") return;

          const viewClassObj = viewClasses.find((viewClassObj) => {
            return viewClassObj["bank"];
          });
          const viewClass = viewClassObj["bank"];
          const dataStore = viewClass.storage;

          const { requestAmount } = e.target;

          const eligible = isEligible(
            dataStore.allData,
            parseInt(requestAmount.value)
          );

          // Template change

          const statusTemplate = qs(mainView, '[data-loan="status-template"]');
          this.shadowRoot.replaceChildren(
            statusTemplate.content.cloneNode(true)
          );

          // Handle form

          const form = qs(this.shadowRoot, '[data-loan="confirmation"]');

          const table = qs(form, "table");
          const { caption, tHead, rows } = table;
          const { statusAmount } = rows;

          if (!eligible) {
            caption.textContent = "Ineligible";
            tHead.textContent = "You are not eligible for a loan";
            statusAmount.textContent = "";
            // loanTerms.classList.add("hidden");
          } else {
            caption.insertAdjacentHTML("beforebegin", "Eligible");
            tHead.insertAdjacentHTML("beforebegin", "tHeadTextt");
            statusAmount.insertAdjacentHTML("beforebegin", requestAmount.value);
            // loanTerms.classList.remove("hidden");
          }
        });

        this.newShadowEvent("submit", '[data-loan="confirmation"]', (el, e) => {
          e.preventDefault();
          console.log(5);
        });
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

      //   const loanOffer = dataStore.getLoanOffer();
      //   const eligible = isEligible(dataStore.allData, parseInt(loanOffer));

      ///
      //
      // const slot = this.querySelector('[data-loan="slot"]');
      // slot.setAttribute("slot", "loan-slot");

      newShadowEvent(event, selector, handler) {
        delegate(this.shadowRoot, selector, event, (e) => {
          const $el = e.target.closest(selector);
          handler($el, e);
        });
      }
    }
  );
};
