import { Console } from "@woowacourse/mission-utils";

class InputView {
  static async read(question = "") {
    return await Console.readLineAsync(`${question}\n`);
  }
}

export default InputView;
