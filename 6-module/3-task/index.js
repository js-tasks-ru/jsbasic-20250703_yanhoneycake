import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentIndex = 0;

    this.elem = this.render();
    this.initCarousel();
    this.addEventListeners();
  }

  render() {
    let slidesHTML = this.slides.map(slide => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('');

    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${slidesHTML}
        </div>
      </div>
    `);
  }

  initCarousel() {
    this.inner = this.elem.querySelector('.carousel__inner');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.update();
  }

  update() {
    this.arrowLeft.style.display = this.currentIndex === 0 ? 'none' : '';
    this.arrowRight.style.display = this.currentIndex === this.slides.length - 1 ? 'none' : '';

    let offset = -this.inner.offsetWidth * this.currentIndex;
    this.inner.style.transform = `translateX(${offset}px)`;
  }

  addEventListeners() {
    this.arrowRight.addEventListener('click', () => {
      if (this.currentIndex < this.slides.length - 1) {
        this.currentIndex++;
        this.update();
      }
    });

    this.arrowLeft.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.update();
      }
    });

    this.elem.addEventListener('click', (event) => {
      let button = event.target.closest('.carousel__button');
      if (!button) return;

      let slide = event.target.closest('.carousel__slide');
      if (!slide) return;

      let id = slide.dataset.id;
      const customEvent = new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });
  }
}
