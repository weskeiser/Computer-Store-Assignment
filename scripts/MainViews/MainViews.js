import { qs } from "../utils.js";

export class MainViews {
  constructor(storage) {
    this.storage = storage;
    this.previouslyRendered = false;
    this.mainView = qs(document, "main-view");
  }

  initialRender() {
    this.previouslyRendered = true;

    // this.storage.addEventListener(this.storage.identifier, () => this.render());
    this.init ? this.init() : this.render();
  }
}
