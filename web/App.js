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
      () => this.#setLottos([])
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

  #handleLottoButtonClick = (lotto) => {
    this.#setLottos([...this.#lottos, lotto]);
  };

  #handlePurchaseSubmit = (purchaseAmount) => {
    this.#setConsumer(new Consumer(purchaseAmount, this.#lottos));
    this.purchaseForm.setDisabled(true);
    this.winningNumbersForm.setDisabled(false);
  };

  #handleWinningNumbersSubmit = (winningNumberArray, bonusNumber) => {
    this.#setWinningNumbers(
      new WinningNumbers(winningNumberArray, bonusNumber)
    );
    this.winningNumbersForm.setDisabled(true);
  };

  #setLottos = (lottos) => {
    this.#lottos = lottos;
    this.#paintSavedLottos();
  };

  #setConsumer = (consumer) => {
    this.#consumer = consumer;
    this.#paintPurchaseSummary();
  };

  #setWinningNumbers = (winningNumbers) => {
    this.#winningNumbers = winningNumbers;
    this.#paintWinningResult();
  };

  #paintSavedLottos = () => {
    const container = document.querySelector("#saved-lottos-container");
    const lottos = this.#lottos.join("\n");
    OutputView.print(container, lottos);
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
