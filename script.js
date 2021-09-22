class Slider {
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
        let step = 100/frameCount;
        let currentPosition = 0;
        this.timer = setInterval(()=>{
            if(currentPosition <= -100) {
                clearInterval(this.timer);
                this.timer = null; //флаг идет ли анимация
                //stop
                return;
            }
            currentPosition -= step;
            this.wrapper.style.marginLeft = currentPosition+'%';
        }, Slider.FRAME_TIME);
    }
}
Slider.FRAME_TIME = 50;
Slider.SLIDE_TIME = 5000;
document.addEventListener('DOMContentLoaded', function() {
    let slider = new Slider('.slider');
    slider.init();
})