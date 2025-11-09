import InputView from "./InputView.js";

class LottosInputView {
  static async read() {
    const lottos = [];

    let input = await InputView.read("로또 번호를 입력해 주세요.");
    while (input !== "") {
      const numbers = input.split(",").map(Number);
      lottos.push(numbers);
      input = await InputView.read("로또 번호를 입력해 주세요.");
    }

    return lottos;
  }
}

export default LottosInputView;
