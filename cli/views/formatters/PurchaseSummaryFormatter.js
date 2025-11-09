class PurchaseSummaryFormatter {
  static formatPurchaseCount(purchaseCount) {
    return `${purchaseCount}개를 구매했습니다.`;
  }

  static formatLottos(lottoArray) {
    const numbersArray = lottoArray.map((lotto) => lotto.getNumbers());
    const formattedLottos = numbersArray.map((numbers) =>
      this.#formatLottoNumbers(numbers)
    );
    return formattedLottos.join("\n");
  }

  static #formatLottoNumbers(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    return `[${sortedNumbers.join(", ")}]`;
  }
}

export default PurchaseSummaryFormatter;
