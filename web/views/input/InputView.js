class InputView {
  static async read(question = "") {
    return prompt(`${question}\n`);
  }
}

export default InputView;
