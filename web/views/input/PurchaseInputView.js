import InputView from "./InputView";

class PurchaseInputView {
  #onSubmit;
  #onClickLottoButton;
  #onError;

  constructor(onSubmit, onClickLottoButton, onError) {
    this.formEl = document.createElement("form");

    this.purchaseAmountView = new InputView({
      id: "purchase-amount-input",
      label: "구매 금액",
      required: true,
    });

    this.lottoView = new InputView({
      id: "lotto-input",
      label: "로또 번호",
    });
    this.lottoButtonEl = document.createElement("button");

    this.purchaseButtonEl = document.createElement("button");

    this.#onSubmit = onSubmit;
    this.#onClickLottoButton = onClickLottoButton;
    this.#onError = onError;
  }

  render(parent) {
    this.#createLottoButton();
    this.#createPurchaseButton();

    this.formEl.id = "purchase-form";
    this.formEl.append(
      this.purchaseAmountView.getEl(),
      this.lottoView.getEl(),
      this.purchaseButtonEl
    );
    this.formEl.addEventListener("submit", this.#handleSubmit);

    parent.appendChild(this.formEl);
  }

  #createLottoButton = () => {
    this.lottoButtonEl.type = "button";
    this.lottoButtonEl.innerText = "추가";
    this.lottoButtonEl.addEventListener("click", this.#handleLottoButtonClick);

    const lottoContainer = this.lottoView.getEl();
    lottoContainer.appendChild(this.lottoButtonEl);
  };

  #createPurchaseButton = () => {
    this.purchaseButtonEl.type = "submit";
    this.purchaseButtonEl.innerText = "구매";
  };

  #handleLottoButtonClick = () => {
    const lottoInputValue = this.lottoInputEl.value;
    if (lottoInputValue === "") return;

    const lotto = lottoInputValue.split(",").map(Number);
    this.#onClickLottoButton(lotto);
    this.lottoInputEl.value = "";
  };

  #handleSubmit = (event) => {
    event.preventDefault();

    const purchaseAmountInputValue = this.purchaseAmountView.getValue();
    const purchaseAmount = Number(purchaseAmountInputValue);

    try {
      this.#onSubmit(purchaseAmount);
    } catch (error) {
      alert(error.message);
      this.purchaseAmountView.clearValue();
      this.lottoView.clearValue();
      this.#onError();
    }
  };

  setDisabled = (state) => {
    this.purchaseButtonEl.disabled = state;
    this.lottoButtonEl.disabled = state;
  };
}

export default PurchaseInputView;
