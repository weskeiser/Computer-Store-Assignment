import { DataStore } from "./store/DataStore.js";
import { isEligible } from "./bank/checkEligibility.js";
import { viewHandlers } from "./viewHandler/viewHandlers.js";

const dataStore = new DataStore("storage");

const App = {
  $: {
    views: {
      navButtons: document.querySelectorAll('[data-view="nav"] > button'),
      viewContainer: document.querySelector('[data-view="container"]'),
      allViews: document.querySelectorAll(
        '[data-view="bank"], [data-view="work"], [data-view="laptops"]'
      ),
    },

    banking: {
      balance: document.querySelector('[data-bank="balance"]'),
      loanAmount: document.querySelector('[data-loan="amount"]'),
      loanApplyModal: document.querySelector('[data-loan="application-modal"]'),
      loanApplyButton: document.querySelector('[data-loan="init-button"]'),
      loanConfirmation: document.querySelector('[data-loan="confirmation"]'),
      loanConfirmationStatus: document.querySelector(
        '[data-loan="confirmation-status"]'
      ),
      loanTerms: document.querySelector('[data-loan="terms"]'),
      loanStatus: document.querySelector('[data-loan="confirmation"]'),
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
    viewHandlers(App.$.views, dataStore);

    // // Bank
    // const { loanApplyButton, loanApplyModal, loanConfirmation, loanStatus } =
    //   App.$.banking;

    // // - Show modal
    // loanApplyButton.addEventListener("pointerdown", (e) => {
    //   e.button !== 0 ? null : loanApplyModal.showModal();
    // });

    // // - Handle application
    // const applicationForm = loanApplyModal.firstElementChild;

    // applicationForm.addEventListener("submit", (e) => {
    //   if (e.submitter.name === "cancel") return;

    //   const {
    //     loanConfirmationStatus: {
    //       caption,
    //       tHead,
    //       rows: { statusAmount },
    //     },
    //     loanTerms,
    //   } = App.$.banking;

    //   const { requestAmount } = e.target;

    //   const eligible = isEligible(
    //     dataStore.getData(),
    //     parseInt(requestAmount.value)
    //   );

    //   if (!eligible) {
    //     console.log(App.$.banking.loanConfirmationStatus);
    //     caption.textContent = "Ineligible";
    //     tHead.textContent = "You are not eligible for a loan";
    //     statusAmount.textContent = "";
    //     loanTerms.classList.add("hidden");
    //   } else {
    //     caption.textContent = "Eligible";
    //     tHead.textContent = "text";
    //     statusAmount.textContent = requestAmount.value;
    //     loanTerms.classList.remove("hidden");

    //     dataStore.updateLoanOffer(requestAmount.value);
    //     // update again when spending money
    //   }

    //   // Template change
    //   loanApplyButton.removeAttribute("slot");
    //   loanStatus.setAttribute("slot", "loan-slot");
    // });

    // // - Handle loan confirmation
    // loanConfirmation.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   if (e.submitter.name === "decline") {
    //     loanStatus.removeAttribute("slot");
    //     loanApplyButton.setAttribute("slot", "loan-slot");
    //     return;
    //   }

    //   const loanOffer = dataStore.getLoanOffer();
    //   const eligible = isEligible(dataStore.getData(), parseInt(loanOffer));
    // });

    // Render
    // App.render();
  },

  render() {
    console.log("RENDER-BEGIN");

    // const balance = dataStore.getBalance();
    // const balanceEl = App.$.banking.balance;
    // console.log(balanceEl);
    // balanceEl.textContent = balance;

    // const earnings = dataStore.getEarnings();
    // const earningsEl = App.$.work.earnings;
    // earningsEl.textContent = earnings;

    console.log("RENDER-END");
  },
};

App.init();
