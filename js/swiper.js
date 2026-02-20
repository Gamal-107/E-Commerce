

function sliderImages() {
  let swiper = new Swiper(".left", {
    pagination: {
      el: ".left-pag",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
    },
    loop: true,
  });
}
sliderImages()



let swiperInstance;

function sliderHotImages() {
  swiperInstance = new Swiper(".slide_product", {
    slidesPerView: 5,
    spaceBetween: 20,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false, // continue autoplay after user interactions
      pauseOnMouseEnter: true, // if you want to pause on mouse enter
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true,
    breakpoints: {
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      800: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      }
    }
  });

}
