import InputView from "./InputView";

class WinningNumbersInputView {
  #onSubmit;

  constructor(onSubmit) {
    this.formEl = document.createElement("form");

    this.winningNumbersView = new InputView({
      id: "winning-numbers-input",
      label: "당첨 번호",
      required: true,
    });

    this.bonusNumberView = new InputView({
      id: "bonus-number-input",
      label: "보너스 번호",
      required: true,
    });

    this.buttonEl = document.createElement("button");

    this.#onSubmit = onSubmit;
  }

  render(parent) {
    this.#createSubmitButton();

    this.formEl.id = "purchase-form";
    this.formEl.append(
      this.winningNumbersView.getEl(),
      this.bonusNumberView.getEl(),
      this.buttonEl
    );
    this.formEl.addEventListener("submit", this.#handleSubmit);

    parent.appendChild(this.formEl);
  }

  #createSubmitButton = () => {
    this.buttonEl.type = "submit";
    this.buttonEl.innerText = "확인";
    this.buttonEl.disabled = true;
  };

  #handleSubmit = (event) => {
    event.preventDefault();

    const winningNumbersInputValue = this.winningNumbersView.getValue();
    const winningNumberArray = winningNumbersInputValue.split(",").map(Number);
    const bonusNumberInputValue = this.bonusNumberView.getValue();
    const bonusNumber = Number(bonusNumberInputValue);

    try {
      this.#onSubmit(winningNumberArray, bonusNumber);
    } catch (error) {
      alert(error.message);
      this.winningNumbersView.clearValue();
      this.bonusNumberView.clearValue();
    }
  };

  setDisabled = (state) => {
    this.buttonEl.disabled = state;
  };
}

export default WinningNumbersInputView;
