import { MainViews } from "../MainViews/MainViews.js";
import { multiQs, replaceHTML } from "../utils.js";

export class Bank extends MainViews {
  render() {
    console.log(22, "- Render-Begin-BANK -", 22);

    const [balanceEl, owedEl] = multiQs(
      this.mainView,
      '[data-bank="balance"]',
      '[data-loan="amount"]'
    );

    const { getBalance, getLoan } = this.storage;

    replaceHTML(balanceEl, getBalance());
    replaceHTML(owedEl, getLoan());

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

    console.log(22, "- Render-End-BANK -", 22);
  }
}
