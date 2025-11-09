import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import Formatter from "./views/formatters/Formatter.js";
import InputView from "./views/input/InputView.js";
import OutputView from "./views/output/OutputView.js";

class App {
  constructor() {}

  async run() {
    const purchaseAmount = await this.#readPurchaseAmount();
    const lottos = await this.#readLottos();

    const consumer = new Consumer(purchaseAmount, lottos);
    this.#printInputResult(consumer);

    const { winningNumbers: winningNumbersInput, bonusNumber } =
      await this.#readWinningNumbers();
    const winningNumbers = new WinningNumbers(winningNumbersInput, bonusNumber);
    consumer.checkWinningResult(winningNumbers);
    this.#printWinningResult(consumer);
  }

  async #readPurchaseAmount() {
    const purchaseAmountString = await InputView.read(
      "구매금액을 입력해 주세요."
    );
    const purchaseAmount = Number(purchaseAmountString);
    return purchaseAmount;
  }

  async #readLottos() {
    const lottos = [];
    let input = await InputView.read("로또 번호를 입력해 주세요.");

    while (input !== "") {
      const numbers = input.split(",").map(Number);
      lottos.push(numbers);
      input = await InputView.read("로또 번호를 입력해 주세요.");
    }

    return lottos;
  }

  async #readWinningNumbers() {
    const winningNumbersString = await InputView.read(
      "당첨 번호를 입력해 주세요."
    );
    const winningNumbers = winningNumbersString.split(",").map(Number);

    const bonusNumberString = await InputView.read(
      "보너스 번호를 입력해 주세요."
    );
    const bonusNumber = Number(bonusNumberString);

    return { winningNumbers, bonusNumber };
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
