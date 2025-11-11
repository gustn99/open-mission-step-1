class PurchaseAmount {
  #value;

  constructor(purchaseAmout) {
    this.#validate(purchaseAmout);
    this.#value = purchaseAmout;
  }

  #validate(purchaseAmount) {
    if (Number.isNaN(purchaseAmount)) {
      throw new Error("[ERROR] 구매 금액은 숫자만 입력 가능합니다.");
    }

    if (purchaseAmount === 0) {
      throw new Error("[ERROR] 구매 금액을 입력해 주세요.");
    }

    if (purchaseAmount % 1000 !== 0) {
      throw new Error("[ERROR] 구매 금액은 1,000원 단위로 입력 가능합니다.");
    }
  }

  getValue() {
    return this.#value;
  }

  getPurchaseCount() {
    return this.#value / 1000;
  }
}
