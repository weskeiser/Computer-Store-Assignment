import { qs } from "../utils.js";

export class MainViews {
  constructor(storage) {
    this.storage = storage;
    this.mainView = qs(document, "main-view");
    this.previouslyRendered = false;

    this.storage.addEventListener(this.storage.identifier, () => this.render());
  }

  setFirstRenderDone() {
    this.previouslyRendered = true;
  }
}
