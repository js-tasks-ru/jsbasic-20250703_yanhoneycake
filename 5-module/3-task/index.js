function initCarousel() {
  const inner = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const slides = inner.children;
  const slideCount = slides.length;

  arrowLeft.style.display = 'none';
  let currentSlide = 0;

  function updateSlide() {
    const slideWidth = inner.offsetWidth;
    inner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

    if (currentSlide === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (currentSlide === slideCount - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }

  arrowRight.addEventListener('click', () => {
    if (currentSlide < slideCount - 1) {
      currentSlide++;
      updateSlide();
    }
  });

  arrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  });
}
