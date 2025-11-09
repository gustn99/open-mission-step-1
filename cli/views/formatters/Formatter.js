import { MATCH_STRING, PRIZE } from "../../constants/lotto.js";
import { formatNumber } from "../../utils/numberUtils.js";

class Formatter {
  formatPurchaseCount(purchaseCount) {
    return `${purchaseCount}개를 구매했습니다.`;
  }

  formatLottos(lottoArray) {
    const numbersArray = lottoArray.map((lotto) => lotto.getNumbers());
    const formattedLottos = numbersArray.map((numbers) =>
      this.#formatLottoNumbers(numbers)
    );
    return formattedLottos.join("\n");
  }

  #formatLottoNumbers(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    return `[${sortedNumbers.join(", ")}]`;
  }

  formatWinningResult(winningResult) {
    const formattedWinningResult = Object.entries(PRIZE).map(
      ([ranking, prize]) =>
        `${MATCH_STRING[ranking]} (${prize.toLocaleString()}원) - ${
          winningResult[ranking]
        }개`
    );
    return formattedWinningResult.join("\n");
  }

  formatReturnRate(returnRate) {
    return `총 수익률은 ${formatNumber(returnRate)}%입니다.`;
  }
}

export default Formatter;
