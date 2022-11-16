import {
  multiQs,
  addDeepListener,
  qs,
  replaceHTML,
  newStyleSheetLink,
} from "../../utils.js";
import { MainViews } from "../../MainViews/MainViews.js";
import { BankStorage } from "../../store/BankStorage/BankStorage.js";
import { loanViewShadow } from "../../viewHandler/loanViewShadow.js";

const bankStorage = new BankStorage("BankStorage");

export class Bank extends MainViews {
  constructor() {
    super(bankStorage);
    loanViewShadow(this);
  }

  render() {
    console.log(22, "- Render-Begin-BANK -", 22);

    const { balance, loan } = this.storage;

    const [balanceEl, owedEl] = multiQs(
      this.mainView.shadowRoot,
      '[data-bank="balance"]',
      '[data-loan="amount"]'
    );

    replaceHTML(balanceEl, balance);
    replaceHTML(owedEl, loan);

    console.log(22, "- Render-End-BANK -", 22);
  }

  init() {
    this.render();
  }

  bindEvents() {}

  loanViewInit(viewShadow) {
    addDeepListener(
      viewShadow.shadowRoot,
      "click",
      '[data-loan="apply-btn"]',
      this.showApplyModal
    );

    addDeepListener(viewShadow.shadowRoot, "submit", "#loanApplication", (e) =>
      this.handleLoanApplication(e, viewShadow)
    );

    addDeepListener(
      viewShadow.shadowRoot,
      "submit",
      '[data-loan="confirmation"]',
      (e, el) => {
        e.preventDefault();
        console.log(e);
        console.log(this.storage.allData);
        console.log(e.target);
        console.log(el);

        if (e.submitter.name === "decline") {
          this.changeLoanTemplate(viewShadow, '[data-loan="apply-template"]');
          return;
        }

        const { loanOffer } = this.storage;

        const eligible = this.isEligible(parseInt(loanOffer));

        if (!eligible) return;

        this.storage.updateLoan(loanOffer);
        this.changeLoanTemplate(viewShadow, '[data-loan="apply-template"]');
      }
    );
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

  handleLoanApplication(e, viewShadow) {
    if (e.submitter.name === "cancel") return;

    this.changeLoanTemplate(viewShadow, '[data-loan="status-template"]');

    this.handleLoanApplicationForm(viewShadow, e);
  }

  isEligible(loanRequestAmount) {
    const hasLoan = this.storage.loan > 0;
    if (hasLoan) return false;

    const insufficientBalance = this.balance * 2 < loanRequestAmount;
    if (insufficientBalance) return false;

    return true;
  }

  handleLoanApplicationForm(viewShadow, e) {
    const dataStore = this.storage;
    const {
      requestAmount: { value: requestAmountValue },
    } = e.target;

    const requestAmount = parseInt(requestAmountValue);

    const eligible = this.isEligible(parseInt(requestAmount));

    const [form, termsSlot] = multiQs(
      viewShadow.shadowRoot,
      '[data-loan="confirmation"]',
      '[data-loan="terms-slot"]'
    );

    const confirmationTable = qs(form, '[data-loan="confirmation-status"]');

    const {
      caption,
      tHead,
      rows: { statusAmount },
    } = confirmationTable;

    if (!eligible) {
      replaceHTML(caption, "Ineligible");
      replaceHTML(tHead, "You are not eligible for a loan");
      replaceHTML(statusAmount, "");
      termsSlot.removeAttribute("name", "terms-slot");
      return;
    }

    replaceHTML(caption, "Eligible");
    replaceHTML(tHead, "tHeadTexttttt");
    replaceHTML(statusAmount, requestAmount);
    termsSlot.setAttribute("name", "terms-slot");

    this.storage.updateLoanOffer(requestAmount);
  }
}
