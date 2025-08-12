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
    this._updateVisuals(this.value);
    this.elem.addEventListener('click', (event) => {
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
  }

  _calculateValue(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    const left = event.clientX - sliderRect.left;
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
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
