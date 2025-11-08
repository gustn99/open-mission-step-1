import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class Consumer {
  #purchaseAmount;
  #lottos;

  constructor() {
    this.#purchaseAmount = 0;
    this.#lottos = [];
  }

  purchaseLotto(purchaseAmount, lottos = []) {
    this.#validatePurchaseAmount(purchaseAmount);
    this.#purchaseAmount = purchaseAmount;
    this.#lottos = this.#createLottos(purchaseAmount, lottos);
  }

  #validatePurchaseAmount(purchaseAmount) {
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

  #createLottos(purchaseAmount, lottos) {
    if (lottos.length === 0) {
      return this.#generateAutoLottos(purchaseAmount);
    }

    return lottos.map((lotto) => new Lotto(lotto));
  }

  #generateAutoLottos(purchaseAmount) {
    const count = purchaseAmount / 1000;
    return Array.from(
      { length: count },
      () => new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6))
    );
  }

  getPurchaseCount() {
    return this.#purchaseAmount / 1000;
  }
}

export default Consumer;
