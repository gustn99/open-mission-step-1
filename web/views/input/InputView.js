class InputView {
  #containerEl;
  #labelEl;
  #inputEl;

  constructor({ id, label, type = "text", required = false }) {
    this.#containerEl = document.createElement("div");
    this.#labelEl = document.createElement("label");
    this.#inputEl = document.createElement("input");

    this.#labelEl.htmlFor = id;
    this.#labelEl.innerText = `${label}${required ? "*" : ""}`;

    this.#inputEl.type = type;
    this.#inputEl.id = id;

    this.#containerEl.append(this.#labelEl, this.#inputEl);
  }

  getEl() {
    return this.#containerEl;
  }

  getValue() {
    return this.#inputEl.value;
  }

  clearValue() {
    this.#inputEl.value = "";
  }
}

export default InputView;
