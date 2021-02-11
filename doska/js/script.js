//Пункты выбора
const selectInputs = () => {
   const elements = document.querySelectorAll('.form__select');
   elements.forEach(el => {
      const choices = new Choices(el, {
         searchEnabled: false,
         itemSelectText: '',
         position: 'bottom',
      });
   });
}
selectInputs();
//Слайдеры
var galleryThumbs = new Swiper('.gallery-thumbs', {
   spaceBetween: 8,
   slidesPerView: 5,
   loop: false,
   direction: 'vertical',
   freeMode: true,
   loopedSlides: 5, //looped slides should be the same
   watchSlidesVisibility: true,
   watchSlidesProgress: true,
   navigation: {
      nextEl: '.gallery-thumbs-wrapper .swiper-button-next',
      prevEl: '.gallery-thumbs-wrapper .swiper-button-prev',
    },
   breakpoints: {
      320: {
         slidesPerView: 3,
         direction: 'horizontal',
      },
      577: {
         direction: 'vertical',
         slidesPerView: 3,
         
      },
      769: {
         direction: 'vertical',
         slidesPerView: 3,
      },
      993: {
         slidesPerView: 4,
      },
      1200: {
         slidesPerView: 5,
      }
   }
 });
 var galleryTop = new Swiper('.gallery-top', {
   spaceBetween: 10,
   loop: false,
   loopedSlides: 5, //looped slides should be the same
   navigation: {
     nextEl: '.gallery-top .swiper-button-next',
     prevEl: '.gallery-top .swiper-button-prev',
   },
   thumbs: {
     swiper: galleryThumbs,
   }
 });