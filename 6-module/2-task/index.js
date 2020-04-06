'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;

    // template slider
    let template = `
      <div id="mainCarousel" class="main-carousel carousel slide">
        <ol class="carousel-indicators">
            <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator"></li>
            <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
            <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
        </ol>
        <div class="carousel-inner">
            <!--Вот здесь будет активный слайд-->

        </div>

        <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </button>
      </div>
    `;
    this.el.insertAdjacentHTML(`beforeend`, template);

    // created and added slides
    this.createSlide();

    // list carousel items
    this._carouselItemsList = this.el.querySelectorAll('.carousel-item');

    // list of indicators
    this._allIndicators = this.el.querySelectorAll('.carousel-indicator');

    // btns navi
    this._btnPrev = this.el.querySelector('.carousel-control-prev');
    this._btnNext = this.el.querySelector('.carousel-control-next');

    this._btnPrev.addEventListener('click', event => this.clickPrev(event));
    this._btnNext.addEventListener('click', event => this.clickNext(event));

    this._quantitySlides = this.slides.length;

    // add class Active for first slide
    this.addActiveSlide();

    // added event for Dot
    this._btnDot = this.el.querySelector('.carousel-indicators');
    this._btnDot.addEventListener('click', event => this.clickIndicator(event));
  }

  clickPrev(event) {
    let prevSlideId, idSlide;

    for (let item of this._carouselItemsList) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");

        idSlide = +item.getAttribute('data-slide');
        prevSlideId = idSlide - 1;

        let activeDot = this.el.querySelector(`[data-slide-to='${idSlide}']`);
        activeDot.classList.remove("active");
      }
    }

    if (prevSlideId === -1) {
      let prevSlideAdd = this.el.querySelector(`[data-slide='${this._quantitySlides - 1}']`);
      prevSlideAdd.classList.add("active");

      let activeDot = this.el.querySelector(`[data-slide-to='${this._quantitySlides - 1}']`);
      activeDot.classList.toggle("active");
    } else {
      let prevSlideAdd = this.el.querySelector(`[data-slide='${prevSlideId}']`);
      prevSlideAdd.classList.add("active");

      let activeDot = this.el.querySelector(`[data-slide-to='${prevSlideId}`);
      activeDot.classList.toggle("active");
    }
  }

  clickNext(event) {
    let nextSlideId, idSlide;

    for (let item of this._carouselItemsList) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");

        idSlide = +item.getAttribute('data-slide');
        nextSlideId = idSlide + 1;

        let activeDot = this.el.querySelector(`[data-slide-to='${idSlide}']`);
        activeDot.classList.remove("active");
      }
    }

    if (nextSlideId < this._quantitySlides) {
      let nextSlideAdd = this.el.querySelector(`[data-slide='${nextSlideId}']`);
      nextSlideAdd.classList.add("active");

      let activeDot = this.el.querySelector(`[data-slide-to='${nextSlideId}']`);
      activeDot.classList.toggle("active");
    } else {
      let nextSlideAdd = this.el.querySelector(`[data-slide='0']`);
      nextSlideAdd.classList.add("active");

      let activeDot = this.el.querySelector(`[data-slide-to='0']`);
      activeDot.classList.toggle("active");
    }
  }

  createSlide() {
    let allTemplateForSlide = "";

    let allSlides = this.el.querySelector('.carousel-inner');

    for (let variable of this.slides) {
      let templateForSlide = `
        <div class="carousel-item" data-slide="${variable.id}">
          <img src="${variable.img}" alt="Activelide">
          <div class="container">
              <div class="carousel-caption">
                  <h3 class="h1">${variable.title}</h3>

                  <div>
                      <a class="btn" href="#" role="button">
                          View all DEALS
                          <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                      </a>
                  </div>
              </div>
          </div>
        </div>
      `;

      allTemplateForSlide += templateForSlide;
    }

    return allSlides.insertAdjacentHTML(`beforeend`, allTemplateForSlide);
  }

  addActiveSlide() {
    for (let item of this._carouselItemsList) {
      if (+item.getAttribute('data-slide') === 0) {
        item.classList.add('active');
      }
    }

    let activeDot = this.el.querySelector(`[data-slide-to='0`);
    activeDot.classList.add("active");
  }

  clickIndicator(event) {
    let target = event.target;

    if (target.classList.contains('carousel-indicator')) {
      let targetNum = +target.getAttribute('data-slide-to');

      for (let item of this._carouselItemsList) {
        item.classList.remove("active");

        if (+item.getAttribute('data-slide') === targetNum) {
          item.classList.add("active");
        }
      }

      for (let dot of this._allIndicators) {
        dot.classList.remove('active');

        if (+dot.getAttribute('data-slide-to') === targetNum) {
          dot.classList.add('active');
        }
      }
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
