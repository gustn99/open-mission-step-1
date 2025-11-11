import Formatter from "../formatters/WinningResultFormatter.js";
import OutputView from "./OutputView.js";

class WinningResultOutputView {
  static print(parent, winningResult, returnRate) {
    OutputView.print(parent, "당첨 통계");
    OutputView.print(parent, "---");
    this.#printWinningResult(parent, winningResult);
    this.#printReturnRate(parent, returnRate);
  }

  static #printWinningResult(parent, winningResult) {
    const formattedWinningResult = Formatter.formatWinningResult(winningResult);
    OutputView.print(parent, formattedWinningResult);
  }

  static #printReturnRate(parent, returnRate) {
    const formattedReturnRate = Formatter.formatReturnRate(returnRate);
    OutputView.print(parent, formattedReturnRate);
  }
}

export default WinningResultOutputView;
