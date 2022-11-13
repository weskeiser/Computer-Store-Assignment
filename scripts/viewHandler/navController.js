import { qs, qsA } from "../utils.js";

const initialViewName = "bank";

const $ = {
  nav: qs(document, '[data-view="nav"]'),
  initialView: qs(document, `[data-template=${initialViewName}]`).content,
  allViews: qsA(
    document,
    '[data-template="bank"], [data-template="work"], [data-template="laptops"]'
  ),
};

export const navController = (...viewClasses) => {
  customElements.define(
    "main-view",
    class extends HTMLElement {
      constructor() {
        super();
        this.mainSheet = this.newStyleSheetLink("./css/main.css");

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.prepend(this.mainSheet);
        shadowRoot.appendChild($.initialView.cloneNode(true));

        this.render(initialViewName, viewClasses);

        $.nav.addEventListener("pointerup", ({ target: { name } }) => {
          this.replaceView(name);
          this.render(name, viewClasses);
        });
      }

      newStyleSheetLink(url) {
        const mainSheet = document.createElement("link");
        mainSheet.setAttribute("rel", "stylesheet");
        mainSheet.setAttribute("href", url);

        return mainSheet;
      }

      replaceView(selectedViewName) {
        $.allViews.forEach((view) => {
          if (view.dataset.template === selectedViewName) {
            this.shadowRoot.replaceChildren(this.mainSheet);
            this.shadowRoot.appendChild(view.content.cloneNode(true));
          }
        });
      }

      render(selectedViewName, viewClasses) {
        const viewClassObj = viewClasses.find((viewClassObj) => {
          return viewClassObj[selectedViewName];
        });

        const viewClass = viewClassObj[selectedViewName];

        viewClass.previouslyRendered
          ? viewClass.render()
          : viewClass.initialRender();
      }
    }
  );
};
