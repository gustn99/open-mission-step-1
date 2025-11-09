import Formatter from "../formatters/WinningResultFormatter.js";
import OutputView from "./OutputView.js";

class WinningResultOutputView {
  static print(winningResult, returnRate) {
    OutputView.print();
    OutputView.print("당첨 통계");
    OutputView.print("---");
    this.#printWinningResult(winningResult);
    this.#printReturnRate(returnRate);
  }

  static #printWinningResult(winningResult) {
    const formattedWinningResult = Formatter.formatWinningResult(winningResult);
    OutputView.print(formattedWinningResult);
  }

  static #printReturnRate(returnRate) {
    const formattedReturnRate = Formatter.formatReturnRate(returnRate);
    OutputView.print(formattedReturnRate);
  }
}

export default WinningResultOutputView;
