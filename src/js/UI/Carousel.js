/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import Component from '../components/Component.js';
import { lazyLoad } from '../utils/index.js';
import { loadImage } from '../utils/LazyLoad.js';

export default class Carousel extends Component {
  constructor(
    $target,
    { slideTemplate, windowSlideSize = 5, autoPlay = 2000, duration = 300 }
  ) {
    const option = {
      className: 'Carousel',
      styles: { position: 'relative' },
      innerHTML: `
          <button class="Carousel-left-arrow btn"> < </button>
          <ul class="Carousel-slides">
          </ul>
          <button class="Carousel-right-arrow btn"> > </button>
      `,
    };
    super($target, 'div', option);

    this.$slidesWrapper = this.$.querySelector('.Carousel-slides');
    // 슬라이드 진행방향
    this.direction = 'next';
    this.interval = autoPlay;
    this.duration = duration;
    this.slideTemplate = slideTemplate;
    // 뷰포트 속 디폴드 카드 수
    this.initialWindowSize = windowSlideSize;
    // 변화 가능한 뷰포트 속 카드 수
    this.windowSlideSize = windowSlideSize;
    // 카드 너비
    this.slideWidth = 100 / this.windowSlideSize.toFixed(4);
    this.slideWidth += '%';

    this.index = 0;
    this.slideTo(this.index);
    window.addEventListener('resize', this.handleWindowResize);
    // autoPlay && this.autoPlay();
    this.bindEvents();
  }

  transitionOn() {
    this.$slidesWrapper.style.transition = `transform ${this.duration}ms ease-in-out`;
  }

  transitionOff() {
    this.$slidesWrapper.style.transition = '';
  }

  forceTransitionEnd() {
    this.$slidesWrapper.transition = '0ms';
  }

  slideTo(index) {
    // getBoundingClientRect 뷰포트내 요소의 크기스팩
    const { width } = this.$slidesWrapper.getBoundingClientRect();
    // transform : translate3d(x, y ,z) : 요소를 x, y, z 만큼 이동시킨다
    this.$slidesWrapper.style.transform = `translate3d(${
      -(width / this.windowSlideSize) * (index + this.windowSlideSize)
    }px, 0, 0)`;
  }

  onClick = e => {
    // button 요소의 type 은 submit
    if (e.target.type !== 'submit') return;

    // if (this.interval) {
    //   clearInterval(this.autoTimeout);

    //   this.resetInterval && clearInterval(this.resetInterval);
    // }

    switch (e.target.className) {
      case 'Carousel-left-arrow btn':
        this.direction = 'prev';
        this.prevSlide();
        break;
      case 'Carousel-right-arrow btn':
        this.direction = 'next';
        this.nextSlide();
        break;
      default:
    }
  };

  prevSlide() {
    // index 문제 발생시
    if (this.index === -this.windowSlideSize) {
      this.forceTransitionEnd();
      console.log('return');
      return;
    }
    this.transitionOn();
    this.index -= 1;
    this.slideTo(this.index);
    // 시작부분에 도달했을때
    if (this.index === -this.windowSlideSize) {
      this.$slidesWrapper.ontransitionend = () => {
        // easeinout 효과 끄기
        this.transitionOff();

        this.index = this.$slides.length - this.windowSlideSize;
        this.slideTo(this.index);
        this.$slidesWrapper.ontransitionend = null;
      };
    }
  }

  nextSlide() {
    if (this.index === this.$slides.length) {
      this.forceTransitionEnd();
      return;
    }
    this.transitionOn();
    this.index += 1;
    this.slideTo(this.index);
    if (this.index === this.$slides.length) {
      this.$slidesWrapper.ontransitionend = () => {
        this.transitionOff();
        this.index = 0;
        this.slideTo(this.index);
        this.$slidesWrapper.ontransitionend = null;
      };
    }
  }

  // UI 재수정
  adaptTo(type) {
    let buttonDisplay;
    let windowSlideSize;
    switch (type) {
      case 'mobile':
        buttonDisplay = 'none';
        windowSlideSize = 2;
        break;
      case 'overMobile':
        buttonDisplay = 'block';
        windowSlideSize = this.initialWindowSize;
        break;
      default:
        throw new Error(
          'you can adapt to device only with mobile and overMobile type'
        );
    }

    this.windowSlideSize = windowSlideSize;
    this.slideWidth = `${100 / this.windowSlideSize.toFixed(4)}%`;

    this.$.querySelectorAll('button').forEach(
      $btn => ($btn.style.display = buttonDisplay)
    );

    this.$.querySelectorAll('.Carousel-slide').forEach($slide => {
      $slide.style.width = this.slideWidth;
      $slide.style.height = '200px';
    });
  }

  handleWindowResize = () => {
    // window.matchMedia(mediaQueryString)
    // 뷰포트 max 사이즈가 576 이하면 모바일 모드
    if (window.matchMedia('(max-width:576px)').matches && !this.isMobile) {
      this.adaptTo('mobile');
      this.isMobile = true;
    }
    // 뷰포트 max 사이즈가 577 이상이면 데스크탑 모드
    if (window.matchMedia('(min-width:577px)').matches && this.isMobile) {
      this.adaptTo('overMobile');
      this.isMobile = false;
    }
  };

  render() {
    this.$slidesWrapper.innerHTML = this.slideTemplate;
    this.$slides = Array.from(this.$slidesWrapper.children);
    this.$slides.forEach($slide => {
      $slide.style.width = this.slideWidth;
    });

    // 맨앞부터 5개 슬라이드
    const front = this.$slides.slice(0, this.windowSlideSize);
    // 무한 슬라이드를 위해 맨뒤에 붙임
    front.forEach(node => {
      const $slide = node.cloneNode(true);
      $slide.id = 'front';
      this.$slidesWrapper.append($slide);
    });
    const back = this.$slides.slice(this.$slides.length - this.windowSlideSize);

    // 무한 슬라이드를 위해 맨앞에 붙임
    back.reverse().forEach(node => {
      loadImage(node);
      const $slide = node.cloneNode(true);
      $slide.id = 'back';
      this.$slidesWrapper.insertAdjacentElement('afterbegin', $slide);
    });
    // 맨뒤부터 5개 슬라이드
    // 모바일 모드
    if (window.matchMedia('(max-width:576px)').matches) {
      this.adaptTo('mobile');
      this.isMobile = true;
    }
    lazyLoad({
      root: this.$,
      rootMargin: '100%',
      threshold: 0,
    });
  }
}
