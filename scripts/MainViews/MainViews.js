import { qs } from "../utils.js";

export class MainViews {
  constructor(storage) {
    this.storage = storage;
    this.previouslyRendered = false;
  }

  initialRender() {
    this.previouslyRendered = true;

    this.mainView = qs(document, "main-view").shadowRoot;

    this.storage.addEventListener(this.storage.identifier, () => this.render());

    this.render();
  }
}
