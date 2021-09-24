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
        this.toSlide = this.slider.querySelector('.slider__toSlide');
        this.bindEvents();
        this.frameCount = Slider.SLIDE_TIME/Slider.FRAME_TIME; // SLIDE_TIME/FRAME_TIME 2000мС/16мС = 125 кадров за 2 секунды, 62,5 кадра в секунду
        this.step = 100/this.frameCount; //100% / 62,5 = 1,6% за один шаг здвигаем на 1,6%
        this.currentPosition = 0; //текущая позиция
        this.direction = 0;
    }
    bindEvents() {
        this.slider.addEventListener('click', ()=> {
            this.nextSlide();
            this.direction = 0;
        });
        this.autoSlide();

        this.toSlide.addEventListener('click', ()=>{
            this.direction = 0;
            this.toSlideItem = event.target.dataset.numberSlide;

            this.toSlideFunction();
        })
    }
    toSlideFunction() {

        this.currentSlide = this.wrapper.children[0].dataset.numberSlide;
        this.iteration = Math.abs((this.currentSlide - this.toSlideItem));
        console.log(this.iteration);

        if (this.timer !== null) return; //проверка идет ли анимация

        this.currentPosition = 0;
        this.timer = setInterval(()=>{ // запуск интервала в 2 секунды

            if (this.toSlideItem === this.currentSlide) return;
            if(this.currentPosition <= -100) {
                clearInterval(this.timer);
                this.timer = null; //флаг идет ли анимация
                this.wrapper.append(this.wrapper.children[0]); //после остановки перекидываем слайды
                this.wrapper.style.marginLeft = '';
                if (this.toSlideItem !== this.currentSlide) this.toSlideFunction();
                //else return;
            }
            this.currentPosition -= this.step;
            this.wrapper.style.marginLeft = this.currentPosition+'%';
        }, Slider.FRAME_TIME/this.iteration);
    }




    autoSlide() {
        document.onmousemove = () => {
            let positionFieldX = this.slider.getBoundingClientRect().left;
            let positionFieldY = this.slider.getBoundingClientRect().top;
            let widthField = parseInt(window.getComputedStyle(this.slider).width);
            let heightField = parseInt(window.getComputedStyle(this.slider).height);
            if (event.clientY > positionFieldY && event.clientY < (positionFieldY+heightField)) {
                if(event.clientX > positionFieldX && event.clientX < (positionFieldX + widthField/2)) {
                    this.direction = -1;
                }
                else  if(event.clientX > (positionFieldX + widthField/2) && event.clientX < (positionFieldX + widthField)) {
                    this.direction = 1
                }
            }
            else this.direction = 0;
        }
        this.intervalAuto = setInterval(()=>{
            if (this.timer !== null) return;
            if (this.direction === 1) this.sliderRight();
            if (this.direction === -1) this.sliderLeft();
        }, Slider.SLIDE_TIME_AUTO+Slider.SLIDE_TIME);
        if(this.direction === 0) clearInterval(this.intervalAuto);
    }

    nextSlide() { //быстрая прокрутка, мотать к 3-5 слайду, передавать меньшее время
        if (this.timer !== null) return; //проверка идет ли анимация
        if (event.target === this.arrowrRight) this.sliderRight();
        if (event.target === this.arrowLeft) this.sliderLeft();
    }
    sliderRight() {
        this.currentPosition = 0;
        this.timer = setInterval(()=>{ // запуск интервала в 2 секунды
            if(this.currentPosition <= -100) {
                clearInterval(this.timer);
                this.timer = null; //флаг идет ли анимация
                this.wrapper.append(this.wrapper.children[0]); //после остановки перекидываем слайды
                this.wrapper.style.marginLeft = '';
                return;
            }
            this.currentPosition -= this.step;
            this.wrapper.style.marginLeft = this.currentPosition+'%';
        }, Slider.FRAME_TIME);
    }
    sliderLeft() {
        this.wrapper.prepend(this.wrapper.children[4]);
        this.currentPosition = -100;
        this.timer = setInterval(()=> { // запуск интервала в 2 секунды
            if(this.currentPosition >= 0) {

                clearInterval(this.timer);
                this.timer = null; //флаг идет ли анимация
                this.wrapper.prepend(this.wrapper.children[0]); //после остановки перекидываем слайды
                this.wrapper.style.marginLeft = '';
                return;
            }
            this.currentPosition += this.step;
            this.wrapper.style.marginLeft = this.currentPosition+'%';
        }, Slider.FRAME_TIME);
    }
}
Slider.FRAME_TIME = 16;
Slider.SLIDE_TIME = 1000;
//Slider.AUTO_SCROL_TIME = 2000;
Slider.SLIDE_TIME_AUTO = 2000;

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