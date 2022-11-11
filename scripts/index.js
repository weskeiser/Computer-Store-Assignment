import { BankStorage } from "./store/BankStorage.js";
import { WorkStorage } from "./store/WorkStorage.js";
import { viewHandlers } from "./viewHandler/viewHandlers.js";
import { Work } from "./work/work.js";
import { Bank } from "./bank/bank.js";

const bankStorage = new BankStorage("storage");
const workStorage = new WorkStorage("storage");

const work = new Work(workStorage);
const bank = new Bank(bankStorage);

const delegate = (el, selector, event, handler) => {
  el.addEventListener(event, (e) => {
    if (e.target.matches(selector)) handler(e, el);
  });
};

const App = {
  $: {
    allViews: document.querySelectorAll(
      '[data-test="bank"], [data-test="work"], [data-test="laptops"]'
    ),
    navButtons: document.querySelectorAll('[data-view="nav"] > button'),
  },

  $$: {
    mainView: document.querySelector("main-view").shadowRoot,
  },

  mainViewEvent(event, selector, handler) {
    const mainView = document.querySelector("main-view").shadowRoot;

    delegate(mainView, selector, event, (e) => {
      const $el = e.target.closest(selector);
      handler(mainView.querySelector("button"), $el, e);
    });
  },

  init() {
    viewHandlers({ work }, { bank });

    this.mainViewEvent("pointerdown", '[data-work="work-button"]', (e) => {
      workStorage.increaseEarnings(100);
    });

    bank.initialRender();
    // work.initialRender();
  },
};

App.init();
