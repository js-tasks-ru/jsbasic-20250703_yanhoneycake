export default class Modal {
  constructor() {
    this._keydownHandler = this._onKeyDown.bind(this);
    this._createModal();
  }

  _createModal() {
    this.elem = document.createElement('div');
    this.elem.className = 'modal';
    this.elem.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;

    this.bodyElem = this.elem.querySelector('.modal__body');
    this.titleElem = this.elem.querySelector('.modal__title');
    this.closeBtn = this.elem.querySelector('.modal__close');
    this.closeBtn.addEventListener('click', () => this.close());
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this._keydownHandler);
  }

  close() {
    if (this.elem.parentElement) {
      this.elem.parentElement.removeChild(this.elem);
    }
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._keydownHandler);
  }

  setTitle(title) {
    this.titleElem.textContent = title;
  }

  setBody(node) {
    this.bodyElem.innerHTML = '';
    this.bodyElem.appendChild(node);
  }

  _onKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
