import InputView from "./InputView.js";

class WinningNumbersInputView {
  static async read() {
    const winningNumbers = await this.#readWinningNumbers();
    const bonusNumber = await this.#readBonusNumber();
    return { winningNumbers, bonusNumber };
  }

  static async #readWinningNumbers() {
    const winningNumbersString = await InputView.read(
      "당첨 번호를 입력해 주세요."
    );
    const winningNumbers = winningNumbersString.split(",").map(Number);
    return winningNumbers;
  }

  static async #readBonusNumber() {
    const bonusNumberString = await InputView.read(
      "보너스 번호를 입력해 주세요."
    );
    const bonusNumber = Number(bonusNumberString);
    return bonusNumber;
  }
}

export default WinningNumbersInputView;
