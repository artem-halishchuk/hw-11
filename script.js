document.addEventListener('DOMContentLoaded', function() {
    class slider {
        constructor(selector) {
            this.selector = selector;
        }
        init() {
            this.slider = document.querySelector(this.selector);
            this.wrapper = this.slider.querySelector('.slider__wrapper');
            this.arrowLeft = this.slider.querySelector('.slider__arrow-left');
            this.arrowrRight = this.slider.querySelector('.slider__arrow-right');
            this.bindEvents();
        }
        bindEvents() {
            this.arrowrRight.addEventListener('click', ()=>this.nextSlide());
        }

        nextSlide() {

        }
    }
})