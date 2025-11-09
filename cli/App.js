import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import Formatter from "./views/formatters/Formatter.js";
import InputView from "./views/input/InputView.js";
import LottosInputView from "./views/input/LottosInputView.js";
import PurchaseInputView from "./views/input/PurchaseInputView.js";
import WinningNumbersInputView from "./views/input/WinningNumbersInputView.js";
import OutputView from "./views/output/OutputView.js";

class App {
  constructor() {}

  async run() {
    const purchaseAmount = await PurchaseInputView.read();
    const lottos = await LottosInputView.read();

    const consumer = new Consumer(purchaseAmount, lottos);
    this.#printInputResult(consumer);

    const { winningNumbers: winningNumbersInput, bonusNumber } =
      await WinningNumbersInputView.read();
    const winningNumbers = new WinningNumbers(winningNumbersInput, bonusNumber);
    consumer.checkWinningResult(winningNumbers);
    this.#printWinningResult(consumer);
  }

  #printInputResult(consumer) {
    const purchaseCount = consumer.getPurchaseCount();
    const lottos = consumer.getLottos();

    const formattedPurchaseCount = Formatter.formatPurchaseCount(purchaseCount);
    const formattedLottos = Formatter.formatLottos(lottos);

    OutputView.print(formattedPurchaseCount);
    OutputView.print(formattedLottos);
  }

  #printWinningResult(consumer) {
    const winningResult = consumer.getWinningResult();
    const returnRate = consumer.getReturnRate();

    const formattedWinningResult = Formatter.formatWinningResult(winningResult);
    const formattedReturnRate = Formatter.formatReturnRate(returnRate);

    OutputView.print("당첨 통계");
    OutputView.print("---");
    OutputView.print(formattedWinningResult);
    OutputView.print(formattedReturnRate);
  }
}

export default App;
