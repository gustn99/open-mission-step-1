import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import PurchaseInputView from "./views/input/PurchaseInputView.js";
import WinningNumbersInputView from "./views/input/WinningNumbersInputView.js";
import OutputView from "./views/output/OutputView.js";
import PurchaseSummaryOutputView from "./views/output/PurchaseSummaryOutputView.js";
import WinningResultOutputView from "./views/output/WinningResultOutputView.js";

class App {
  #lottos;
  #consumer;
  #winningNumbers;

  constructor() {
    this.#lottos = [];
    this.#consumer = undefined;
    this.#winningNumbers = undefined;

    this.purchaseForm = new PurchaseInputView(
      this.#handlePurchaseSubmit,
      this.#handleLottoButtonClick,
      this.#handlePurchaseInputError
    );
    this.winningNumbersForm = new WinningNumbersInputView(
      this.#handleWinningNumbersSubmit
    );
  }

  run() {
    this.#renderPurchaseForm();
    this.#renderWinningNumbersForm();
  }

  #renderPurchaseForm = () => {
    const purchaseFormContainer = document.querySelector(
      "#purchase-form-container"
    );
    this.purchaseForm.render(purchaseFormContainer);
  };

  #renderWinningNumbersForm = () => {
    const winningNumbersFormContainer = document.querySelector(
      "#winning-numbers-form-container"
    );
    this.winningNumbersForm.render(winningNumbersFormContainer);
  };

  #handleLottoButtonClick = (parent, lotto) => {
    this.#lottos.push(lotto);
    OutputView.print(parent, lotto);
  };

  #handlePurchaseSubmit = (purchaseAmount) => {
    this.#consumer = new Consumer(purchaseAmount, this.#lottos);
    this.#paintPurchaseSummary();
    this.purchaseForm.setDisabled(true);
    this.winningNumbersForm.setDisabled(false);
  };

  #handlePurchaseInputError = () => {
    this.#lottos = [];
  };

  #handleWinningNumbersSubmit = (winningNumberArray, bonusNumber) => {
    this.#winningNumbers = new WinningNumbers(winningNumberArray, bonusNumber);
    this.#paintWinningResult();
    this.winningNumbersForm.setDisabled(true);
  };

  #paintPurchaseSummary = () => {
    const container = document.querySelector("#purchase-summary-container");
    const purchaseCount = this.#consumer.getPurchaseCount();
    const lottos = this.#consumer.getLottos();
    PurchaseSummaryOutputView.print(container, purchaseCount, lottos);
  };

  #paintWinningResult = () => {
    this.#consumer.checkWinningResult(this.#winningNumbers);

    const container = document.querySelector("#winning-result-container");
    const winningResult = this.#consumer.getWinningResult();
    const returnRate = this.#consumer.getReturnRate();
    WinningResultOutputView.print(container, winningResult, returnRate);
  };
}

export default App;
