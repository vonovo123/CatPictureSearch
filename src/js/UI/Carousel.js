/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import Component from '../components/Component.js';
import { lazyLoad } from '../utils/index.js';

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
    this.bindEvents();
  }

  onClick = e => {
    // button 요소의 type 은 submit
    if (e.target.type !== 'submit') return;
    // if (this.interval) {
    // console.log(this.interval);
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

  prevSlide() {}

  slideTo(index) {
    // getBoundingClientRect 뷰포트내 요소의 크기스팩
    const { width } = this.$slidesWrapper.getBoundingClientRect();
    // transform : translate3d(x, y ,z) : 요소를 x, y, z 만큼 이동시킨다
    this.$slidesWrapper.style.transform = `translate3d(${
      -(width / this.windowSlideSize) * (index + this.windowSlideSize)
    }px, 0, 0)`;
  }

  // UI 재수정
  adaptTo(type) {
    let buttonDisplay;
    let windowSlideSize;
    console.log('type', type);
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
    // this.HTML();
    lazyLoad({
      root: this.$,
      rootMargin: '100%',
      threshold: 0,
    });
  }
}
