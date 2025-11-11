class OutputView {
  static print(parent, data) {
    const container = document.createElement("p");
    container.innerText = data;
    parent.appendChild(container);
  }
}

export default OutputView;
