import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import { formatNumber } from "./utils/numberUtils.js";

class App {
  constructor() {}

  async run() {
    const consumer = new Consumer();
    consumer.purchaseLotto(1000, [[1, 2, 3, 4, 5, 6]]);

    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6], 7);
    consumer.checkWinningResult(winningNumbers);

    const returnRate = formatNumber(consumer.getReturnRate());
  }
}

export default App;
