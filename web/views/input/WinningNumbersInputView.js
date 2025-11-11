class WinningNumbersInputView {
  #onSubmit;

  constructor(onSubmit) {
    this.formEl = document.createElement("form");
    this.winningNumbersInputContainer = document.createElement("div");
    this.winningNumbersLabelEl = document.createElement("label");
    this.winningNumbersInputEl = document.createElement("input");
    this.bonusNumberInputContainer = document.createElement("div");
    this.bonusNumberLabelEl = document.createElement("label");
    this.bonusNumberInputEl = document.createElement("input");
    this.buttonEl = document.createElement("button");

    this.#onSubmit = onSubmit;
  }

  render(parent) {
    this.formEl.id = "purchase-form";

    this.winningNumbersLabelEl.htmlFor = "winning-numbers-input";
    this.winningNumbersLabelEl.innerText = "당첨 번호";

    this.winningNumbersInputEl.type = "text";
    this.winningNumbersInputEl.id = "winning-numbers-input";

    this.bonusNumberLabelEl.htmlFor = "bonus-number-input";
    this.bonusNumberLabelEl.innerText = "보너스 번호";

    this.bonusNumberInputEl.type = "text";
    this.bonusNumberInputEl.id = "bonus-number-input";

    this.buttonEl.type = "submit";
    this.buttonEl.innerText = "확인";
    this.buttonEl.disabled = true;

    this.winningNumbersInputContainer.append(
      this.winningNumbersLabelEl,
      this.winningNumbersInputEl
    );
    this.bonusNumberInputContainer.append(
      this.bonusNumberLabelEl,
      this.bonusNumberInputEl
    );

    this.formEl.append(
      this.winningNumbersInputContainer,
      this.bonusNumberInputContainer,
      this.buttonEl
    );
    this.formEl.addEventListener("submit", this.#handleSubmit);

    parent.appendChild(this.formEl);
  }

  #handleSubmit = (event) => {
    event.preventDefault();

    const winningNumbersInputValue = this.winningNumbersInputEl.value;
    const winningNumberArray = winningNumbersInputValue.split(",").map(Number);
    const bonusNumberInputValue = this.bonusNumberInputEl.value;
    const bonusNumber = Number(bonusNumberInputValue);

    this.#onSubmit(winningNumberArray, bonusNumber);
  };

  setDisabled = (state) => {
    this.buttonEl.disabled = state;
  };
}

export default WinningNumbersInputView;
