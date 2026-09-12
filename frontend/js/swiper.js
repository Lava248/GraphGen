document.addEventListener("DOMContentLoaded", function () {

    const graphSwiper = new Swiper(".graphSwiper", {

        slidesPerView: 1,

        spaceBetween: 25,

        loop: true,

        grabCursor: true,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },

        navigation: {
            nextEl: ".graphSwiper .swiper-button-next",
            prevEl: ".graphSwiper .swiper-button-prev"
        },

        pagination: {
            el: ".graphSwiper .swiper-pagination",
            clickable: true
        },

        breakpoints: {

            600: {
                slidesPerView: 2
            },

            1000: {
                slidesPerView: 3
            }

        }

    });

});

/* =========================
   HOW GRAPHGEN SWIPER
========================= */

const howSwiper = new Swiper(".howSwiper", {

    slidesPerView: 1,

    spaceBetween: 30,

    loop: true,

    grabCursor: true,

    navigation: {

        nextEl: ".how-next",

        prevEl: ".how-prev"

    },

    pagination: {

        el: ".how-pagination",

        clickable: true

    },

});

/* =========================
   VISUAL SHOWCASE SWIPER
========================= */

const visualSwiper = new Swiper(".visualSwiper", {

    slidesPerView: 1,

    spaceBetween: 20,

    loop: true,

    autoplay: {

        delay: 2500,

        disableOnInteraction: false

    },

    pagination: {

        el: ".visual-pagination",

        clickable: true

    }

});