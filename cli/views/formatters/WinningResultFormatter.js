import { MATCH_STRING, PRIZE } from "../../constants/lotto.js";
import { formatNumber } from "../../utils/numberUtils.js";

class WinningResultFormatter {
  static formatWinningResult(winningResult) {
    const formattedWinningResult = Object.entries(PRIZE).map(
      ([ranking, prize]) =>
        `${MATCH_STRING[ranking]} (${formatNumber(prize)}원) - ${
          winningResult[ranking]
        }개`
    );
    return formattedWinningResult.join("\n");
  }

  static formatReturnRate(returnRate) {
    return `총 수익률은 ${formatNumber(returnRate, 1)}%입니다.`;
  }
}

export default WinningResultFormatter;
