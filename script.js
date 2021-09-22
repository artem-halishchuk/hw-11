document.addEventListener('DOMContentLoaded', function() {
    class Slider {
        static FRAME_TIME = 50;
        static SLIDE_TIME = 5000;
        constructor(selector) {
            this.selector = selector;
            this.FRAME
        }
        init() {
            this.slider = document.querySelector(this.selector);
            this.wrapper = this.slider.querySelector('.slider__wrapper');
            this.arrowLeft = this.slider.querySelector('.slider__arrow-left');
            this.arrowrRight = this.slider.querySelector('.slider__arrow-right');
            this.bindEvents();
        }
        bindEvents() {
            this.arrowrRight.addEventListener('click', ()=>this.nextSlide(Slider.SLIDE_TIME));
        }

        nextSlide(time) {
            let frameCount = time/Slider.FRAME_TIME;
            let step = 50/frameCount
        }
    }
})