export class Work {
  constructor(workStorage) {
    this.workStorage = workStorage;
    this.previouslyRendered = false;
  }

  initialRender() {
    this.previouslyRendered = true;

    this.mainView = document.querySelector("main-view").shadowRoot;

    this.workStorage.addEventListener("storeWork", (e) => this.render());

    this.render();
  }

  render() {
    console.log("Render-Begin-WORK");

    const earnings = this.workStorage.getEarnings();
    const earningsEl = this.mainView.querySelector('[data-work="earnings"]');

    earningsEl.textContent = earnings;

    console.log("Render-End-WORK");
  }
}
