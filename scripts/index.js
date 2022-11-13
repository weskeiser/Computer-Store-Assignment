import { LaptopsStorage } from "./store/LaptopsStorage/LaptopsStorage.js";
import { BankStorage } from "./store/BankStorage/BankStorage.js";
import { WorkStorage } from "./store/WorkStorage/WorkStorage.js";
import { Laptops } from "./Laptops/Laptops.js";
import { Bank } from "./Bank/Bank.js";
import { Work } from "./Work/Work.js";

import { navController } from "./viewHandler/navController.js";

import { delegate } from "./utils.js";
import { LoanView } from "./viewHandler/LoanView.js";

const laptopsStorage = new LaptopsStorage("LaptopsStorage");
const laptops = new Laptops(laptopsStorage);
const bankStorage = new BankStorage("BankStorage");
const bank = new Bank(bankStorage);
const workStorage = new WorkStorage("WorkStorage");
const work = new Work(workStorage);

const App = {
  init() {
    navController({ work }, { bank }, { laptops });
    LoanView(bank);

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
