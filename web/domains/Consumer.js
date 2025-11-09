import { Random } from "../utils/Random.js";
import Lotto from "./Lotto.js";
import { PRIZE } from "../constants/lotto.js";

class Consumer {
  #purchaseAmount;
  #lottos;
  #winningResult;
  #totalPrize;

  constructor(purchaseAmount, lottos) {
    this.#validatePurchaseAmount(purchaseAmount);
    this.#purchaseAmount = purchaseAmount;

    const purchaseCount = this.getPurchaseCount();
    this.#validateLottos(purchaseCount, lottos);
    this.#lottos = this.#createLottos(purchaseCount, lottos);

    this.#winningResult = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    this.#totalPrize = 0;
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

  #validateLottos(purchaseCount, lottos) {
    if (lottos.length === 0) return;

    const manualLottoCount = lottos.length;
    if (purchaseCount < manualLottoCount) {
      throw new Error("[ERROR] 구매 금액보다 더 많은 로또가 입력되었습니다.");
    }
  }

  #createLottos(purchaseCount, lottos) {
    const manualLottoCount = lottos.length;
    const autoLottoCount = purchaseCount - manualLottoCount;
    const createdLottos = [];

    if (autoLottoCount > 0) {
      createdLottos.push(...this.#generateAutoLottos(autoLottoCount));
    }
    createdLottos.push(...lottos.map((numbers) => new Lotto(numbers)));

    return createdLottos;
  }

  #generateAutoLottos(count) {
    return Array.from(
      { length: count },
      () => new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6))
    );
  }

  checkWinningResult(winningNumbers) {
    this.#updateRanking(winningNumbers);
    this.#calculateTotalPrize();
  }

  #updateRanking(winningNumbers) {
    this.#lottos.forEach((lotto) => {
      const ranking = winningNumbers.calculateRanking(lotto);
      if (ranking) this.#winningResult[ranking] += 1;
    });
  }

  #calculateTotalPrize() {
    Object.entries(this.#winningResult).forEach(([ranking, count]) => {
      this.#totalPrize += PRIZE[ranking] * count;
    });
  }

  getPurchaseCount() {
    return this.#purchaseAmount / 1000;
  }

  getLottos() {
    return [...this.#lottos];
  }

  getWinningResult() {
    return { ...this.#winningResult };
  }

  getReturnRate() {
    return (this.#totalPrize / this.#purchaseAmount) * 100;
  }
}

export default Consumer;
