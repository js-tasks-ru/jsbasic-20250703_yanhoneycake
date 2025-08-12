export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this._render();
    this._init();
  }

  _render() {
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.innerHTML = `
      <div class="slider__thumb" style="left: 0%">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0%"></div>
      <div class="slider__steps"></div>
    `;

    const stepsContainer = slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      if (i === this.value) span.className = 'slider__step-active';
      stepsContainer.appendChild(span);
    }

    return slider;
  }

  _init() {
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.valueElem = this.elem.querySelector('.slider__value');
    this.stepsElems = this.elem.querySelectorAll('.slider__steps span');
    this.thumb.ondragstart = () => false;
    this._updateVisuals(this.value);
    this.elem.addEventListener('click', (event) => {
      if (this.elem.classList.contains('slider_dragging')) return;

      let newValue = this._calculateValue(event);

      if (newValue !== this.value) {
        this.value = newValue;
        this._updateVisuals(newValue);
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }));
      }
    });

    this.thumb.addEventListener('pointerdown', this._onThumbPointerDown.bind(this));
  }

  _onThumbPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    const onPointerMove = (moveEvent) => this._onPointerMove(moveEvent);
    const onPointerUp = (upEvent) => {
      this._onPointerUp(upEvent, onPointerMove, onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  _onPointerMove(event) {
    event.preventDefault();

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    let segments = this.steps - 1;
    let value = Math.round(leftRelative * segments);
    let leftPercents = leftRelative * 100;

    this._moveTo(leftPercents, value);
  }

  _onPointerUp(event, onPointerMove, onPointerUp) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    let segments = this.steps - 1;
    let value = Math.round(leftRelative * segments);

    this.value = value;
    this._updateVisuals(value);
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  _moveTo(leftPercents, value) {
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.valueElem.textContent = value;
    this.stepsElems.forEach((span, idx) => {
      span.classList.toggle('slider__step-active', idx === value);
    });
  }

  _calculateValue(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    const left = event.clientX - sliderRect.left;
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let value = Math.round(leftRelative * segments);
    return value;
  }

  _updateVisuals(value) {
    let segments = this.steps - 1;
    let valuePercents = segments > 0 ? value / segments * 100 : 0;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.valueElem.textContent = value;
    this.stepsElems.forEach((span, idx) => {
      span.classList.toggle('slider__step-active', idx === value);
    });
  }
}
