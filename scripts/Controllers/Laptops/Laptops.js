import { MainViews } from "../../MainViews/MainViews.js";
import { addDeepListener, insertHTML, qs, stringCutter } from "../../utils.js";

export class Laptops extends MainViews {
  constructor(storage) {
    super(storage);

    this.baseURL = "https://noroff-komputer-store-api.herokuapp.com/";

    this.fetchedLaptops = fetch(this.baseURL + "computers").then((res) =>
      res.json()
    );
  }

  getLaptop(id) {
    const { laptops } = this;
    return laptops.find((laptop) => laptop.id === id);
  }

  populateDropdown(laptops) {
    this.laptops = laptops;

    const dropdown = qs(this.mainView.shadowRoot, "#laptopsDropdown");

    const options = laptops.map(({ id, title, price }) => {
      const option = document.createElement("option");
      option.value = id;
      insertHTML(option, title);

      return option;
    });

    dropdown.replaceChildren(...options);
  }

  onSelect(e, el) {
    const selectedLaptop = this.getLaptop(parseInt(el.value));

    console.log(selectedLaptop);

    // <img src="${this.baseURL}${imgURL}" alt="${laptop.title}" />
    // const imgURL =
    //   laptop.id !== 5
    //     ? laptop.image
    //     : `${stringCutter(laptop.image, 3)}png`;
  }

  buyLaptop(e, { laptopsDropdown }) {
    e.preventDefault();
    const selectedLaptop = this.getLaptop(parseInt(laptopsDropdown.value));

    const { price } = selectedLaptop;

    const balance = this.storage.storage.balance;

    if (balance < price) return;

    // buy laptop
  }

  render() {
    console.log(333, "- Render-Begin-LAPTOPS -", 333);

    this.fetchedLaptops.then((laptops) => this.populateDropdown(laptops));

    addDeepListener(
      this.mainView.shadowRoot,
      "change",
      "#laptopsDropdown",
      (e, el) => this.onSelect(e, el)
    );

    addDeepListener(
      this.mainView.shadowRoot,
      "submit",
      '[data-laptops="buy-now"]',
      (e, el) => this.buyLaptop(e, el)
    );

    console.log(333, "- Render-End-LAPTOPS -", 333);
  }
}
