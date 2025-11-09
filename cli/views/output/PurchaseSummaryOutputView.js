import Formatter from "../formatters/Formatter.js";
import OutputView from "./OutputView.js";

class PurchaseSummaryOutputView {
  static print(purchaseCount, lottos) {
    this.#printPurchaseCount(purchaseCount);
    this.#printLottos(lottos);
  }

  static #printPurchaseCount(purchaseCount) {
    const formattedPurchaseCount = Formatter.formatPurchaseCount(purchaseCount);
    OutputView.print(formattedPurchaseCount);
  }

  static #printLottos(lottos) {
    const formattedLottos = Formatter.formatLottos(lottos);
    OutputView.print(formattedLottos);
  }
}

export default PurchaseSummaryOutputView;
