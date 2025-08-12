export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this._render();
    this._initRibbon();
    this._addEventListeners();
  }

  _render() {
    const ribbon = document.createElement('div');
    ribbon.className = 'ribbon';

    const arrowLeft = document.createElement('button');
    arrowLeft.type = 'button';
    arrowLeft.className = 'ribbon__arrow ribbon__arrow_left';
    arrowLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    ribbon.appendChild(arrowLeft);

    const ribbonInner = document.createElement('nav');
    ribbonInner.className = 'ribbon__inner';

    for (let {id, name} of this.categories) {
      let a = document.createElement('a');
      a.href = '#';
      a.className = 'ribbon__item';
      a.dataset.id = id;
      a.textContent = name;
      ribbonInner.appendChild(a);
    }

    ribbon.appendChild(ribbonInner);

    const arrowRight = document.createElement('button');
    arrowRight.type = 'button';
    arrowRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    arrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    ribbon.appendChild(arrowRight);

    return ribbon;
  }

  _initRibbon() {
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    const firstItem = this.elem.querySelector('.ribbon__item');
    if (firstItem) {
      firstItem.classList.add('ribbon__item_active');
    }
  }

  _updateArrows() {
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;

    if (scrollLeft > 0) {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    }

    if (scrollRight > 1) {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    }
  }

  _addEventListeners() {
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this._updateArrows();
    });

    this.ribbonInner.addEventListener('click', (event) => {
      let a = event.target.closest('.ribbon__item');
      if (!a) return;
      event.preventDefault();

      let active = this.ribbonInner.querySelector('.ribbon__item_active');
      if (active) {
        active.classList.remove('ribbon__item_active');
      }
      a.classList.add('ribbon__item_active');

      let customEvent = new CustomEvent('ribbon-select', {
        detail: a.dataset.id,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });
  }
}

