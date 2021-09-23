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
        this.slider.addEventListener('click', (event)=>this.nextSlide(Slider.SLIDE_TIME, event));
    }

    nextSlide(time, event) { //быстрая прокрутка, мотать к 3-5 слайду, передавать меньшее время
        if (this.timer !== null) return; //проверка идет ли анимация
        let frameCount = time/Slider.FRAME_TIME; // SLIDE_TIME/FRAME_TIME 2000мС/16мС = 125 кадров за 2 секунды, 62,5 кадра в секунду
        let step = 100/frameCount; //100% / 62,5 = 1,6% за один шаг здвигаем на 1,6%
        let currentPosition = 0; //текущая позиция

        if (event.target === this.arrowrRight) {
            this.timer = setInterval(()=>{ // запуск интервала в 2 секунды

                if(currentPosition <= -100) {
                    clearInterval(this.timer);
                    this.timer = null; //флаг идет ли анимация
                    this.wrapper.append(this.wrapper.children[0]); //после остановки перекидываем слайды
                    this.wrapper.style.marginLeft = '';
                    return;
                }
                currentPosition -= step;
                this.wrapper.style.marginLeft = currentPosition+'%';

            }, Slider.FRAME_TIME);
        }

        if (event.target === this.arrowLeft) {
            this.wrapper.prepend(this.wrapper.children[4]);
            currentPosition = -100;
            this.timer = setInterval(()=> { // запуск интервала в 2 секунды
                if(currentPosition >= 0) {
                    clearInterval(this.timer);
                    this.timer = null; //флаг идет ли анимация
                    this.wrapper.prepend(this.wrapper.children[0]); //после остановки перекидываем слайды
                    this.wrapper.style.marginLeft = '';
                    return;
                }
                currentPosition += step;
                this.wrapper.style.marginLeft = currentPosition+'%';
            }, Slider.FRAME_TIME);
        }
        
    }
}
Slider.FRAME_TIME = 16;
Slider.SLIDE_TIME = 1500;

document.addEventListener('DOMContentLoaded', function() {
    let slider = new Slider('.slider');
    slider.init();
})

//в другую сторону обратный порядок
//1. действия по маргину, смещаем туда
//2. потом крутим сюда
//3. перед таймером переместим на тот слайд и добавим маргинов
//взять последний элемент сделать prepend во врапер и крутим в обратную сторону

//реализация кругляшков - хранить номер слайда на котором находимся
//и запускать цыклично - когда закончилась первая анимация, то запустилась вторая
//для этого использоват колбеки в функциях nextSlide(time), который будет говорить, что слайд закончился