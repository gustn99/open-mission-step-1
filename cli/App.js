import Consumer from "./domains/Consumer.js";
import WinningNumbers from "./domains/WinningNumbers.js";
import Formatter from "./formatters/Formatter.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
    this.formatter = new Formatter();
  }

  async run() {
    const purchaseAmount = await this.#readPurchaseAmount();
    const lottos = await this.#readLottos();

    const consumer = new Consumer();
    consumer.purchaseLotto(purchaseAmount, lottos);
    this.#printInputResult(consumer);

    const { winningNumbers: winningNumbersInput, bonusNumber } =
      await this.#readWinningNumbers();
    const winningNumbers = new WinningNumbers(winningNumbersInput, bonusNumber);
    consumer.checkWinningResult(winningNumbers);
    this.#printWinningResult(consumer);
  }

  async #readPurchaseAmount() {
    const purchaseAmountString = await this.inputView.read(
      "구매금액을 입력해 주세요."
    );
    const purchaseAmount = Number(purchaseAmountString);
    return purchaseAmount;
  }

  async #readLottos() {
    const lottos = [];
    let input = await this.inputView.read("로또 번호를 입력해 주세요.");

    while (input !== "") {
      const numbers = input.split(",").map(Number);
      lottos.push(numbers);
      input = await this.inputView.read("로또 번호를 입력해 주세요.");
    }

    return lottos;
  }

  async #readWinningNumbers() {
    const winningNumbersString = await this.inputView.read(
      "당첨 번호를 입력해 주세요."
    );
    const winningNumbers = winningNumbersString.split(",").map(Number);

    const bonusNumberString = await this.inputView.read(
      "보너스 번호를 입력해 주세요."
    );
    const bonusNumber = Number(bonusNumberString);

    return { winningNumbers, bonusNumber };
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
