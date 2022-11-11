export class Bank {
  constructor(storage) {
    this.storage = storage;
    this.previouslyRendered = false;
  }

  initialRender() {
    this.previouslyRendered = true;

    this.mainView = document.querySelector("main-view").shadowRoot;

    this.storage.addEventListener("storeBank", (e) => this.render());

    this.render();
  }

  render() {
    console.log("Render-Begin-BANK");

    //-------------

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

    console.log("Render-End-BANK");
  }
}
