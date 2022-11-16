import {
  multiQs,
  addDeepListener,
  qs,
  replaceHTML,
  newStyleSheetLink,
} from "../../utils.js";
import { MainViews } from "../../MainViews/MainViews.js";
import { BankStorage } from "../../store/BankStorage/BankStorage.js";
import { loanViewShadow } from "../../viewShadows/loanViewShadow.js";

const bankStorage = new BankStorage("BankStorage");

export class Bank extends MainViews {
  constructor() {
    super(bankStorage);
    loanViewShadow(this);
  }

  init() {
    const viewShadow = qs(this.mainView.shadowRoot, "loan-view");
    this.bindEvents(viewShadow);
    this.render();
  }

  render() {
    const { balance, loan } = this.storage;

    const [balanceEl, owedEl, owedAmountEl] = multiQs(
      this.mainView.shadowRoot,
      '[data-bank="balance"]',
      '[data-loan="amount"]',
      "#bankLoan"
    );

    if (loan) {
      owedEl.classList.remove("hidden");
      owedAmountEl.classList.remove("hidden");
    } else {
      owedEl.classList.add("hidden");
      owedAmountEl.classList.add("hidden");
    }

    replaceHTML(balanceEl, balance);
    replaceHTML(owedEl, loan);
  }

  bindEvents() {
    const viewShadow = qs(this.mainView.shadowRoot, "loan-view");

    const [applyBtn, loanApplicationForm] = multiQs(
      viewShadow.shadowRoot,
      '[data-loan="apply-btn"]',
      "#loanApplication",
      '[data-loan="confirmation"]'
    );

    applyBtn.addEventListener("click", (e) => this.showApplyModal(e, applyBtn));

    loanApplicationForm.addEventListener("submit", (e) => {
      this.handleLoanApplication(e, viewShadow);
    });
  }

  handleLoanApplication(e, viewShadow) {
    if (e.submitter.name === "cancel") return;

    this.changeLoanTemplate(viewShadow, '[data-loan="status-template"]');

    addDeepListener(
      viewShadow.shadowRoot,
      "submit",
      '[data-loan="confirmation"]',
      (e) => {
        e.preventDefault();

        if (e.submitter.name === "decline") {
          this.changeLoanTemplate(viewShadow, '[data-loan="apply-template"]');
          this.loanViewInit(viewShadow);
          return;
        }

        if (e.submitter.name === "return") {
          this.changeLoanTemplate(viewShadow, '[data-loan="apply-template"]');
          this.loanViewInit(viewShadow);
          return;
        }

        const { loanOffer } = this.storage;

        const inEligible = this.inEligible(parseInt(loanOffer));

        if (inEligible) {
          this.storage.storage.loanOffer = 0;

          return;
        }

        this.storage.updateLoan(loanOffer);
        this.storage.updateLoanOffer(0);
        this.changeLoanTemplate(viewShadow, '[data-loan="apply-template"]');
        this.loanViewInit(viewShadow);
      }
    );

    this.handleConfirmationForm(viewShadow, e);
  }

  handleConfirmationForm(viewShadow, e) {
    const {
      requestAmount: { value: requestAmountValue },
    } = e.target;

    const requestAmount = parseInt(requestAmountValue);

    const inEligible = this.inEligible(parseInt(requestAmount));

    const form = qs(viewShadow.shadowRoot, '[data-loan="confirmation"]');

    const confirmationTable = qs(form, '[data-loan="confirmation-status"]');
    const buttonsField = confirmationTable.nextElementSibling;

    const {
      caption,
      tHead,
      rows: { statusAmount },
    } = confirmationTable;

    if (inEligible) {
      replaceHTML(
        buttonsField,
        ' <button type="submit" name="return" >Take me back.</button>'
      );
      replaceHTML(caption, "Ineligible");
      replaceHTML(tHead, "You are not eligible for a loan");
      replaceHTML(
        statusAmount,
        `
      <td>${inEligible}</td>
    `
      );
      return;
    }

    replaceHTML(caption, "Eligible");
    replaceHTML(tHead, "You are eligible for a loan!");
    replaceHTML(
      statusAmount,
      `
      <td>${requestAmount}</td>
    `
    );

    this.storage.updateLoanOffer(requestAmount);
  }

  inEligible(loanRequestAmount) {
    const hasLoan = this.storage.loan > 0;
    if (hasLoan) return "Maximum loans exceeded.";

    const insufficientBalance = this.storage.balance * 2 < loanRequestAmount;
    if (insufficientBalance) return "Insufficient balance.";

    return false;
  }

  loanViewInit(viewShadow) {
    this.bindEvents(viewShadow);
  }

  showApplyModal(e, btn) {
    const modal = btn.nextElementSibling;
    e.button !== 0 ? null : modal.showModal();
  }

  changeLoanTemplate(viewShadow, templateSelector) {
    const template = qs(this.mainView.shadowRoot, templateSelector);
    const sheet = newStyleSheetLink("./css/loan-view/loan-view.css");

    viewShadow.shadowRoot.replaceChildren(
      sheet,
      template.content.cloneNode(true)
    );
  }
}
