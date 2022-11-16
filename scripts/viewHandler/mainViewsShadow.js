import { newStyleSheetLink, qs, qsA } from "../utils.js";

const initialViewName = "bank";

const $ = {
  nav: qs(document, '[data-view="nav"]'),
  initialView: qs(document, `[data-template=${initialViewName}]`).content,
  allViews: qsA(document, "[data-template]"),
};

export const mainViewsShadow = (...viewClasses) => {
  customElements.define(
    "main-view",
    class extends HTMLElement {
      constructor() {
        super();
        this.mainSheet = newStyleSheetLink("./css/main-view/main-view.css");

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.prepend(this.mainSheet);
        shadowRoot.appendChild($.initialView.cloneNode(true));

        this.triggerRender(initialViewName, viewClasses);

        $.nav.addEventListener("pointerup", ({ target: { dataset } }) => {
          this.replaceView(dataset.navButton);
          this.triggerRender(dataset.navButton, viewClasses);
        });
      }

      replaceView(selectedViewName) {
        $.allViews.forEach((view) => {
          if (view.dataset.template === selectedViewName) {
            this.shadowRoot.replaceChildren(this.mainSheet);
            this.shadowRoot.appendChild(view.content.cloneNode(true));
          }
        });
      }

      triggerRender(selectedViewName, viewClasses) {
        const viewClassObj = viewClasses.find((viewClassObj) => {
          return viewClassObj[selectedViewName];
        });

        const viewClass = viewClassObj[selectedViewName];

        viewClass.storage._fetchStorage();

        const { previouslyRendered } = viewClass;

        if (!previouslyRendered) {
          viewClass.setFirstRenderDone();
          viewClass.init ? viewClass.init() : viewClass.render();
        } else {
          viewClass.bindEvents();
          viewClass.render();
        }
      }
    }
  );
};
