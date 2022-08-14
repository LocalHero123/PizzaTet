new Swiper('.gallery__slider', {

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },

   slidesPerView: 1,

   autoHeight: true,

   speed: 800,

   breakpoints: {
      640: {
         slidesPerView: 2,
      },
      950: {
         slidesPerView: 3,
      },
   }
});