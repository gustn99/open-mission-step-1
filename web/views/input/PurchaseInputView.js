class PurchaseInputView {
  #onSubmit;
  #onClickLottoButton;
  #onError;

  constructor(onSubmit, onClickLottoButton, onError) {
    this.formEl = document.createElement("form");

    this.purchaseAmountInputContainerEl = document.createElement("div");
    this.purchaseAmountLabelEl = document.createElement("label");
    this.purchaseAmountInputEl = document.createElement("input");

    this.lottoInputContainerEl = document.createElement("div");
    this.lottoLabelEl = document.createElement("label");
    this.lottoInputEl = document.createElement("input");
    this.lottoButtonEl = document.createElement("button");
    this.savedLottosContainerEl = document.createElement("div");

    this.purchaseButtonEl = document.createElement("button");

    this.#onSubmit = onSubmit;
    this.#onClickLottoButton = onClickLottoButton;
    this.#onError = onError;
  }

  render(parent) {
    this.#createPurchaseAmountInputContainer();
    this.#createLottoInputContainer();
    this.#createPurchaseButton();

    this.formEl.id = "purchase-form";
    this.formEl.append(
      this.purchaseAmountInputContainerEl,
      this.lottoInputContainerEl,
      this.purchaseButtonEl
    );
    this.formEl.addEventListener("submit", this.#handleSubmit);

    parent.appendChild(this.formEl);
  }

  #createPurchaseAmountInputContainer = () => {
    this.purchaseAmountLabelEl.htmlFor = "purchase-amount-input";
    this.purchaseAmountLabelEl.innerText = "구매 금액*";

    this.purchaseAmountInputEl.type = "text";
    this.purchaseAmountInputEl.id = "purchase-amount-input";

    this.purchaseAmountInputContainerEl.append(
      this.purchaseAmountLabelEl,
      this.purchaseAmountInputEl
    );
  };

  #createLottoInputContainer = () => {
    this.lottoLabelEl.htmlFor = "lotto-input";
    this.lottoLabelEl.innerText = "로또 번호";

    this.lottoInputEl.type = "text";
    this.lottoInputEl.id = "lotto-input";

    this.lottoButtonEl.type = "button";
    this.lottoButtonEl.innerText = "추가";
    this.lottoButtonEl.addEventListener("click", this.#handleLottoButtonClick);

    this.lottoInputContainerEl.append(
      this.lottoLabelEl,
      this.lottoInputEl,
      this.lottoButtonEl,
      this.savedLottosContainerEl
    );
  };

  #createPurchaseButton = () => {
    this.purchaseButtonEl.type = "submit";
    this.purchaseButtonEl.innerText = "구매";
  };

  #handleLottoButtonClick = () => {
    const lottoInputValue = this.lottoInputEl.value;
    const lotto = lottoInputValue.split(",").map(Number);

    this.#onClickLottoButton(lotto);
    this.lottoInputEl.value = "";
  };

  #handleSubmit = (event) => {
    event.preventDefault();

    const purchaseAmountInputValue = this.purchaseAmountInputEl.value;
    const purchaseAmount = Number(purchaseAmountInputValue);

    try {
      this.#onSubmit(purchaseAmount);
    } catch (error) {
      alert(error.message);
      this.#initInputValue();
      this.#onError();
    }
  };

  #initInputValue = () => {
    this.purchaseAmountInputEl.value = "";
    this.lottoInputEl.value = "";
  };

  setDisabled = (state) => {
    this.purchaseButtonEl.disabled = state;
    this.lottoButtonEl.disabled = state;
  };
}

export default PurchaseInputView;
