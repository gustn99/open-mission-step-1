class OutputView {
  static print(parent, data) {
    const container = document.createElement("p");
    container.innerText = data;
    parent.replaceChildren(container);
  }
}

export default OutputView;
