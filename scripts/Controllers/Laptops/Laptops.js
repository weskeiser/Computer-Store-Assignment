import {
  insertHTML,
  multiQs,
  qs,
  replaceHTML,
  stringCutter,
} from "../../utils.js";
import { MainViews } from "../../MainViews/MainViews.js";
import { LaptopsStorage } from "../../store/LaptopsStorage/LaptopsStorage.js";
import { toggleSelected } from "./helpers.js";

const laptopsStorage = new LaptopsStorage("LaptopsStorage");

export class Laptops extends MainViews {
  constructor() {
    super(laptopsStorage);

    this.baseURL = "https://noroff-komputer-store-api.herokuapp.com/";

    this.fetchedLaptops = fetch(this.baseURL + "computers").then((res) =>
      res.json()
    );
  }

  async handleFetch(laptops) {
    this.laptops = await laptops;
    this.render();
  }

  init() {
    this.fetchedLaptops.then((laptops) => this.handleFetch(laptops));

    // const [selectForm, buyForm] = multiQs(
    //   this.mainView.shadowRoot,
    //   "#select-form",
    //   "#buy-form"
    // );

    // selectForm.addEventListener("change", (e) => this.onSelect(e));
    // buyForm.addEventListener("submit", (e) => this.buyLaptop(e));
  }

  bindEvents() {
    const [selectForm, buyForm] = multiQs(
      this.mainView.shadowRoot,
      "#select-form",
      "#buy-form"
    );

    selectForm.addEventListener("change", (e) => this.onSelect(e));
    buyForm.addEventListener("submit", (e) => this.buyLaptop(e));
  }

  render() {
    console.log(333, "- Render-Begin-LAPTOPS -", 333);

    this.renderLaptops();
    this.renderCheckout();

    console.log(333, "- Render-End-LAPTOPS -", 333);
  }

  renderLaptops() {
    const laptops = this.laptops;

    // Select
    const selectForm = qs(
      this.mainView.shadowRoot,
      '[data-laptops="select-form"]'
    );
    selectForm.replaceChildren();

    const select = document.createElement("select");
    select.setAttribute("name", "laptopsDropdown");
    select.setAttribute("id", "laptopsDropdown");

    laptops.forEach(({ id, title, image }, idx) => {
      const option = document.createElement("option");
      option.value = id;
      insertHTML(option, title);

      // Radio
      const imgURL = id !== 5 ? image : `${stringCutter(image, 3)}png`;

      const radioEl = document.createElement("div");
      radioEl.setAttribute("data-laptops", "radio");

      const selectedId = this.storage.getSelectedLaptopId();

      const firstOption = idx === 0;
      if (firstOption) {
        toggleSelected(true, option, radioEl);
      }

      if (selectedId === id && idx !== 0) {
        const first = qs(selectForm, '[selected="true"]');
        toggleSelected(false, first);
        toggleSelected(true, option, radioEl);
      }

      insertHTML(
        radioEl,
        `
          <input type="radio" for="select-form" name="laptopRadio" data-laptop-id="${id}" />    
          <img src="${this.baseURL}${imgURL}" alt="${title}" />
        `
      );

      select.insertAdjacentElement("beforeend", option);
      selectForm.insertAdjacentElement("beforeend", radioEl);
    });

    selectForm.insertAdjacentElement("afterbegin", select);
  }

  renderCheckout() {
    const [detailsTitleEl, detailsDescEl, specsEl, priceEl, stockEl] = multiQs(
      this.mainView.shadowRoot,
      '[data-laptops-details="title"]',
      '[data-laptops-details="desc"]',
      '[data-laptops="specs"]',
      '[data-laptops-checkout="price"]',
      '[data-laptops-checkout="stock"]'
    );

    const { title, description, price, specs, stock, id } =
      this.getSelectedLaptop();

    const specsList = specs.map((spec) => `<li>${spec}</li>`);
    const specsListJoined = specsList.join("");

    const quantityPurchased = this.storage.getStockFromPurchased(id);

    replaceHTML(specsEl, specsListJoined);
    replaceHTML(detailsTitleEl, title);
    replaceHTML(detailsDescEl, description);
    replaceHTML(priceEl, price);
    replaceHTML(stockEl, `Stock: ${stock - quantityPurchased}`);
  }

  getLaptop(id) {
    const { laptops } = this;
    return laptops.find((laptop) => laptop.id === id);
  }

  onSelect(e) {
    e.preventDefault();
    console.log(88);

    const idFromInput = parseInt(e.target.dataset.laptopId);
    const idFromOption = parseInt(e.target.value);

    const id = idFromInput ? idFromInput : idFromOption;

    this.storage.setSelectedLaptop(id);
  }

  getSelectedLaptop() {
    const { selectedId } = this.storage.storage.laptops;

    return this.getLaptop(selectedId);
  }

  buyLaptop(e) {
    e.preventDefault();

    const { id, price, stock } = this.getSelectedLaptop();
    const { balance } = this.storage;

    const quantityPurchased = this.storage.getStockFromPurchased(id);

    if (stock <= quantityPurchased) {
      // alert("insufficient balance");
      console.log("out of stock");
    }

    if (balance < price) {
      // alert("insufficient balance");
      console.log("insufficient balance");
      return;
    }

    this.storage.handlePurchase(id, price);

    console.log("congrats");
  }
}
