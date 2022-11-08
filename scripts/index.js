import { DataStore } from "./store/DataStore.js";
import { isEligible } from "./bank/checkEligibility.js";
import { viewHandlers } from "./viewHandler/viewHandlers.js";

const dataStore = new DataStore("storage");

const App = {
  $: {
    views: {
      viewNav: document.querySelector('[data-view="nav"]'),
      viewContainer: document.querySelector('[data-view="container"]'),
      allViews: document.querySelectorAll(
        '[data-view="bank"], [data-view="work"], [data-view="laptops"]'
      ),
    },

    banking: {
      balance: document.querySelector('[data-bank="balance"]'),
      loanAmount: document.querySelector('[data-bank="loan-amount"]'),
      loanApplyModal: document.querySelector('[data-bank="loan_apply-modal"]'),
      loanApplyButton: document.querySelector(
        '[data-bank="loan-apply-button"]'
      ),
      loanConfirmation: document.querySelector(
        '[data-bank="loan-confirmation"]'
      ),

      loanStatus: document.querySelector('[data-bank="loan-status"]'),
    },

    work: {
      workButton: document.querySelector('[data-work="work-button"]'),
      earnings: document.querySelector('[data-work="earnings"]'),
    },
  },

  init() {
    // Storage
    dataStore.addEventListener("store", App.render);

    // View handlers
    viewHandlers(App.$.views);

    // Work
    App.$.work.workButton.addEventListener("click", () => {
      dataStore.increaseEarnings(100);
    });

    // Bank
    const loanApplyButton = App.$.banking.loanApplyButton;

    loanApplyButton.addEventListener("click", () => {
      const modal = App.$.banking.loanApplyModal;
      modal.showModal();

      const applicationForm = modal.firstElementChild;

      applicationForm.addEventListener("submit", (e) => {
        if (e.submitter.name === "cancel") return;

        const { requestAmount } = e.target;

        // if (!loanTerms.checked) {
        //   console.log("hi");
        // }

        const eligible = isEligible(
          dataStore.getData(),
          parseInt(requestAmount.value)
        );

        const { loanConfirmation, loanStatus } = App.$.banking;

        if (!eligible) {
          loanConfirmation.caption.textContent = "Ineligible";
          loanConfirmation.rows.statusText.firstElementChild.textContent =
            "You are not eligible for a You are not eligible for a loan";
          loanConfirmation.rows.statusAmount.firstElementChild.textContent = "";
        } else {
          loanConfirmation.caption.textContent = "Title";
          loanConfirmation.rows.statusText.firstElementChild.textContent =
            "text";
          loanConfirmation.rows.statusAmount.firstElementChild.textContent =
            requestAmount.value;
        }

        // Template change
        loanApplyButton.removeAttribute("slot");

        loanStatus.setAttribute("slot", "loan-slot");
      });
    });

    // Render
    App.render();
  },

  render() {
    console.log("RENDER-BEGIN");

    const balance = dataStore.getBalance();
    const balanceEl = App.$.banking.balance;
    balanceEl.textContent = balance;

    const earnings = dataStore.getEarnings();
    const earningsEl = App.$.work.earnings;
    earningsEl.textContent = earnings;

    console.log("RENDER-END");
  },
};

App.init();
