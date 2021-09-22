document.addEventListener('DOMContentLoaded', function() {
    class Slider {
        static FRAME_TIME = 50;
        static SLIDE_TIME = 5000;
        constructor(selector) {
            this.selector = selector;
            this.timer = null;
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

        nextSlide(time) { //быстрая прокрутка, мотать к 3-5 слайду, передавать меньшее время
            let frameCount = time/Slider.FRAME_TIME;
            let step = 50/frameCount;
            let currentPosition = 0;
            this.timer = setInterval(()=>{
                if(currentPosition <= -50) {
                    clearInterval(this.timer);
                    this.timer = null;
                    //stop
                    return;
                }
                currentPosition -= step;

            }, Slider.FRAME_TIME);
        }
    }
})