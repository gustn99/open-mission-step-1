import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import Formatter from "./formatters/Formatter.js";
import OutputView from "./views/OutputView.js";

class App {
  constructor() {
    this.outputView = new OutputView();
    this.formatter = new Formatter();
  }

  async run() {
    const consumer = new Consumer();
    consumer.purchaseLotto(4000);
    this.#printInputResult(consumer);

    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6], 7);
    consumer.checkWinningResult(winningNumbers);
    this.#printWinningResult(consumer);
  }

  #printInputResult(consumer) {
    const purchaseCount = consumer.getPurchaseCount();
    const lottos = consumer.getLottos();

    const formattedPurchaseCount =
      this.formatter.formatPurchaseCount(purchaseCount);
    const formattedLottos = this.formatter.formatLottos(lottos);

    this.outputView.print(formattedPurchaseCount);
    this.outputView.print(formattedLottos);
  }

  #printWinningResult(consumer) {
    const winningResult = consumer.getWinningResult();
    const returnRate = consumer.getReturnRate();

    const formattedWinningResult =
      this.formatter.formatWinningResult(winningResult);
    const formattedReturnRate = this.formatter.formatReturnRate(returnRate);

    this.outputView.print("당첨 통계");
    this.outputView.print("---");
    this.outputView.print(formattedWinningResult);
    this.outputView.print(formattedReturnRate);
  }
}

export default App;
