class PurchaseInputView {
  #onSubmit;

  constructor(onSubmit) {
    this.formEl = document.createElement("form");
    this.purchaseAmountInputContainerEl = document.createElement("div");
    this.purchaseAmountLabelEl = document.createElement("label");
    this.purchaseAmountInputEl = document.createElement("input");
    this.purchaseButtonEl = document.createElement("button");

    this.#onSubmit = onSubmit;
  }

  render(parent) {
    this.formEl.id = "purchase-form";

    this.purchaseAmountLabelEl.htmlFor = "purchase-amount-input";
    this.purchaseAmountLabelEl.innerText = "구매 금액";

    this.purchaseAmountInputEl.type = "text";
    this.purchaseAmountInputEl.id = "purchase-amount-input";

    this.purchaseButtonEl.type = "submit";
    this.purchaseButtonEl.innerText = "구매";

    this.purchaseAmountInputContainerEl.append(
      this.purchaseAmountLabelEl,
      this.purchaseAmountInputEl
    );
    this.formEl.append(
      this.purchaseAmountInputContainerEl,
      this.purchaseButtonEl
    );
    this.formEl.addEventListener("submit", this.#handleSubmit);

    parent.appendChild(this.formEl);
  }

  #handleSubmit = (event) => {
    event.preventDefault();

    const purchaseAmountInputValue = this.purchaseAmountInputEl.value;
    const purchaseAmount = Number(purchaseAmountInputValue);

    this.#onSubmit(purchaseAmount);
  };

  setDisabled = (state) => {
    this.purchaseButtonEl.disabled = state;
  };
}

export default PurchaseInputView;
