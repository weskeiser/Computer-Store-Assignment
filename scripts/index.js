import { isEligible } from "./bank/checkEligibility.js";
import { DataStore } from "./store/DataStore.js";

const storageKey = "storage";
const dataStore = new DataStore(storageKey);

const App = {
  $: {
    views: {
      viewContainer: document.querySelector('[data-view="container"]'),
      allViews: document.querySelectorAll(
        '[data-view="bank"], [data-view="work"], [data-view="laptops"]'
      ),
      viewToggles: document.querySelector('[data-view-toggle="all"]'),
    },
    banking: {
      balance: document.querySelector('[data-bank="balance"]'),
      outstanding: document.querySelector('[data-balance="outstanding"]'),
      applyButton: document.querySelector('[data-bank="apply-button"]'),
    },
    work: {
      workButton: document.querySelector('[data-work="work-button"]'),
      earnings: document.querySelector('[data-work="earnings"]'),
    },
  },

  defineViews() {
    customElements.define(
      "view-container",
      class extends HTMLElement {
        constructor() {
          super();

          const template = document.querySelector(
            '[data-view="template"]'
          ).content;

          const shadowRoot = this.attachShadow({ mode: "open" });
          shadowRoot.appendChild(template.cloneNode(true));

          const bank = this.querySelector('[data-view="work"]');
          bank.setAttribute("slot", "current-view");

          App.$.views.viewToggles.addEventListener("change", (e) => {
            const input = e.target;
            const viewName = input.dataset.viewToggle;
            const label = input.nextElementSibling;

            const viewContainer = App.$.views.viewContainer;
            const views = App.$.views.allViews;

            viewContainer.dataset.viewDisplayed = viewName;

            views.forEach((view) => {
              view.dataset.view !== viewName
                ? view.removeAttribute("slot")
                : view.setAttribute("slot", "current-view");
            });

            label.className = "pink";
          });
        }
      }
    );
  },

  init() {
    App.defineViews();
    dataStore.addEventListener("store", App.render);

    App.$.banking.applyButton.addEventListener("click", () => {
      const eligible = isEligible(dataStore.getData(), 62000);

      dataStore.deposit(100);
    });

    App.$.work.workButton.addEventListener("click", () => {
      dataStore.increaseEarnings(100);
    });
    App.render();
  },

  render() {
    console.log("RENDER-BEGIN");

    const balance = dataStore.getBalance();
    const balanceEl = App.$.banking.balance;
    balanceEl.textContent = balance;

    const earnings = dataStore.getEarnings();
    const earningsEl = App.$.work.earnings;
    earningsEl.textContent = earnings;

    console.log("RENDER-END");
  },
};

App.init();
