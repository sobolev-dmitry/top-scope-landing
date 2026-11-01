document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.my-reviews-slider', {
    slidesPerView: 'auto',      // слайды берут свою ширину из CSS
    spaceBetween: 20,           // отступ между карточками
    loop: false,

    breakpoints: {
      640: {
        slidesPerView: 1,       // на мобильном — 1 карточка
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 'auto',  // на планшете — сколько влезет по 400px
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 'auto',  // на десктопе — авто
        spaceBetween: 20,
      }
    },
  });
});
