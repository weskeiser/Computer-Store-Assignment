import { BankStorage } from "./store/BankStorage/BankStorage.js";
import { WorkStorage } from "./store/WorkStorage/WorkStorage.js";
import { Work } from "./work/work.js";
import { Bank } from "./bank/bank.js";
import { viewHandlers } from "./viewHandler/viewHandlers.js";
import { delegate } from "./utils.js";
import { Laptops } from "./laptops/laptops.js";
import { LaptopsStorage } from "./store/LaptopsStorage/LaptopsStorage.js";

const workStorage = new WorkStorage("storage", "WorkStorage");
const work = new Work(workStorage);

const bankStorage = new BankStorage("storage", "BankStorage");
const bank = new Bank(bankStorage);

const laptopsStorage = new LaptopsStorage("storage");
const laptops = new Laptops(laptopsStorage);

const App = {
  init() {
    viewHandlers({ work }, { bank }, { laptops });

    this.newShadowEvent("pointerdown", '[data-work="work-button"]', () => {
      workStorage.increaseEarnings(100);
    });
  },

  newShadowEvent(event, selector, handler) {
    const mainView = document.querySelector("main-view").shadowRoot;

    delegate(mainView, selector, event, (e) => {
      const $el = e.target.closest(selector);
      handler(e, $el);
    });
  },
};

App.init();
