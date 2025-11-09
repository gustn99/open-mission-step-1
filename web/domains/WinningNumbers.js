import Lotto from "./Lotto.js";

class WinningNumbers {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = new Lotto(winningNumbers);
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber) {
    const isBelowMin = bonusNumber < 1;
    const isAboveMax = bonusNumber > 45;
    if (isBelowMin || isAboveMax) {
      throw new Error("[ERROR] 보너스 번호는 1에서 45 사이의 숫자여야 합니다.");
    }

    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 이미 당첨 번호에 포함된 번호입니다.");
    }
  }

  calculateRanking(lotto) {
    const matchingCount = lotto.matches(this.#winningNumbers);
    const hasBonus = lotto.includes(this.#bonusNumber);

    if (matchingCount === 6) return "first";
    if (matchingCount === 5 && hasBonus) return "second";
    if (matchingCount === 5) return "third";
    if (matchingCount === 4) return "fourth";
    if (matchingCount === 3) return "fifth";
    return "";
  }
}

export default WinningNumbers;
