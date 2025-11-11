class PurchaseInputView {
  #onSubmit;

  constructor(onSubmit) {
    this.formEl = document.createElement("form");
    this.inputContainerEl = document.createElement("div");
    this.labelEl = document.createElement("label");
    this.inputEl = document.createElement("input");
    this.buttonEl = document.createElement("button");

    this.#onSubmit = onSubmit;
  }

  render(parent) {
    this.formEl.id = "purchase-form";

    this.labelEl.htmlFor = "purchase-amount-input";
    this.labelEl.innerText = "구매 금액";

    this.inputEl.type = "text";
    this.inputEl.id = "purchase-amount-input";

    this.buttonEl.type = "submit";
    this.buttonEl.innerText = "구매";

    this.inputContainerEl.append(this.labelEl, this.inputEl);
    this.formEl.append(this.inputContainerEl, this.buttonEl);
    this.formEl.addEventListener("submit", this.#handleSubmit);

    parent.appendChild(this.formEl);
  }

  #handleSubmit = (event) => {
    event.preventDefault();

    const inputValue = this.inputEl.value;
    const purchaseAmount = Number(inputValue);

    this.#onSubmit(purchaseAmount);
  };

  setDisabled = (state) => {
    this.buttonEl.disabled = state;
  };
}

export default PurchaseInputView;
