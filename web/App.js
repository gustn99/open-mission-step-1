import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import PurchaseSummaryOutputView from "./views/output/PurchaseSummaryOutputView.js";
import WinningResultOutputView from "./views/output/WinningResultOutputView.js";

class App {
  #consumer;
  #winningNumbers;

  constructor() {
    this.#consumer = undefined;
    this.#winningNumbers = undefined;
  }

  run() {
    const purchaseForm = document.querySelector("#purchase-form");
    purchaseForm.addEventListener("submit", this.#handlePurchaseAmountSubmit);

    const winningNumbersForm = document.querySelector("#winning-numbers-form");
    winningNumbersForm.addEventListener(
      "submit",
      this.#handleWinningNumbersSubmit
    );

    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", this.#handleRestartButtonClick);
  }

  #handlePurchaseAmountSubmit = (event) => {
    event.preventDefault();

    const purchaseAmountInput = document.querySelector(
      "#purchase-amount-input"
    );
    const inputValue = purchaseAmountInput.value;
    const purchaseAmount = Number(inputValue);

    try {
      this.#consumer = new Consumer(purchaseAmount, []);
      this.#paintPurchaseSummary();
      this.#setPurchaseFormButtonDisabled(true);
      this.#setWinningNumbersFormButtonDisabled(false);
    } catch (error) {
      alert(error.message);
    }
  };

  #handleWinningNumbersSubmit = (event) => {
    event.preventDefault();

    const winningNumbersInput = document.querySelector(
      "#winning-numbers-input"
    );
    const bonusNumberInput = document.querySelector("#bonus-number-input");

    const winningNumbersInputValue = winningNumbersInput.value;
    const winningNumberArray = winningNumbersInputValue.split(",").map(Number);
    const bonusNumberInputValue = bonusNumberInput.value;
    const bonusNumber = Number(bonusNumberInputValue);

    try {
      this.#winningNumbers = new WinningNumbers(
        winningNumberArray,
        bonusNumber
      );
      this.#paintWinningResult();
      this.#setWinningNumbersFormButtonDisabled(true);
    } catch (error) {
      alert(error.message);
    }
  };

  #handleRestartButtonClick = () => {
    window.location.reload();
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

  #setPurchaseFormButtonDisabled(state) {
    const purchaseFormButton = document.querySelector("#purchase-form button");
    purchaseFormButton.disabled = state;
  }

  #setWinningNumbersFormButtonDisabled(state) {
    const winningNumbersFormButton = document.querySelector(
      "#winning-numbers-form button"
    );
    winningNumbersFormButton.disabled = state;
  }
}

export default App;
