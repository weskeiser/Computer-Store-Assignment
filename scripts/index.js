import { LaptopsStorage } from "./store/LaptopsStorage/LaptopsStorage.js";
import { BankStorage } from "./store/BankStorage/BankStorage.js";
import { WorkStorage } from "./store/WorkStorage/WorkStorage.js";
import { Laptops } from "./Laptops/Laptops.js";
import { Bank } from "./Bank/Bank.js";
import { Work } from "./Work/Work.js";

import { navController } from "./viewHandler/navController.js";

const laptopsStorage = new LaptopsStorage("LaptopsStorage");
const laptops = new Laptops(laptopsStorage);
const bankStorage = new BankStorage("BankStorage");
const bank = new Bank(bankStorage);
const workStorage = new WorkStorage("WorkStorage");
const work = new Work(workStorage);

const App = {
  init() {
    navController({ work }, { bank }, { laptops });

    work.init();
  },
};

App.init();
