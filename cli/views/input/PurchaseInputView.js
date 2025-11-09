import InputView from "./InputView.js";

class PurchaseInputView {
  static async read() {
    const purchaseAmountString = await InputView.read(
      "구매금액을 입력해 주세요."
    );
    const purchaseAmount = Number(purchaseAmountString);
    return purchaseAmount;
  }
}

export default PurchaseInputView;
