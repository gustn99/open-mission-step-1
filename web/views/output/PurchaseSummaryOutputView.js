import Formatter from "../formatters/PurchaseSummaryFormatter.js";
import OutputView from "./OutputView.js";

class PurchaseSummaryOutputView {
  static print(parent, purchaseCount, lottos) {
    this.#printPurchaseCount(parent, purchaseCount);
    this.#printLottos(parent, lottos);
  }

  static #printPurchaseCount(parent, purchaseCount) {
    const formattedPurchaseCount = Formatter.formatPurchaseCount(purchaseCount);
    OutputView.append(parent, formattedPurchaseCount);
  }

  static #printLottos(parent, lottos) {
    const formattedLottos = Formatter.formatLottos(lottos);
    OutputView.append(parent, formattedLottos);
  }
}

export default PurchaseSummaryOutputView;
