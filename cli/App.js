import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import LottosInputView from "./views/input/LottosInputView.js";
import PurchaseInputView from "./views/input/PurchaseInputView.js";
import WinningNumbersInputView from "./views/input/WinningNumbersInputView.js";
import PurchaseSummaryOutputView from "./views/output/PurchaseSummaryOutputView.js";
import WinningResultOutputView from "./views/output/WinningResultOutputView.js";
import OutputView from "./views/output/OutputView.js";

class App {
  constructor() {}

  async run() {
    let consumer;
    try {
      const purchaseAmount = await PurchaseInputView.read();
      const lottos = await LottosInputView.read();
      consumer = new Consumer(purchaseAmount, lottos);
      this.#printInputResult(consumer);
    } catch (error) {
      OutputView.print(error.message);
    }

    let winningNumbers;
    try {
      const { winningNumbers: rawWinningNumbers, bonusNumber } =
        await WinningNumbersInputView.read();
      winningNumbers = new WinningNumbers(rawWinningNumbers, bonusNumber);
    } catch (error) {
      OutputView.print(error.message);
    }

    consumer.checkWinningResult(winningNumbers);
    this.#printWinningResult(consumer);
  }

  #printInputResult(consumer) {
    const purchaseCount = consumer.getPurchaseCount();
    const lottos = consumer.getLottos();
    PurchaseSummaryOutputView.print(purchaseCount, lottos);
  }

  #printWinningResult(consumer) {
    const winningResult = consumer.getWinningResult();
    const returnRate = consumer.getReturnRate();
    WinningResultOutputView.print(winningResult, returnRate);
  }
}

export default App;
