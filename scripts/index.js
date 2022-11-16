import { Laptops } from "./Controllers/Laptops/Laptops.js";
import { Bank } from "./Controllers/Bank/Bank.js";
import { Work } from "./Controllers/Work/Work.js";

import { mainViewsShadow } from "./viewShadows/mainViewsShadow.js";

const laptops = new Laptops();
const bank = new Bank();
const work = new Work();

mainViewsShadow({ work }, { bank }, { laptops });
