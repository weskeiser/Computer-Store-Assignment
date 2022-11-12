import { BankStorage } from "./store/BankStorage.js";
import { WorkStorage } from "./store/WorkStorage.js";
import { viewHandlers } from "./viewHandler/viewHandlers.js";
import { Work } from "./work/work.js";
import { Bank } from "./bank/bank.js";

const workStorage = new WorkStorage("storage");
const work = new Work(workStorage);

const bankStorage = new BankStorage("storage");
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

  init() {
    viewHandlers({ work }, { bank });

    this.newShadowEvent("pointerdown", '[data-work="work-button"]', () => {
      workStorage.increaseEarnings(100);
    });
  },

  newShadowEvent(event, selector, handler) {
    const mainView = document.querySelector("main-view").shadowRoot;

    delegate(mainView, selector, event, (e) => {
      const $el = e.target.closest(selector);
      handler($el, e);
    });
  },
};

App.init();
