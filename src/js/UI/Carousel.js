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
    // 시작위치
    this.index = 0;
    // windowSlideSize 만큼의 여분의 슬라이드를 시작점 앞에 남겨놓음
    this.slideTo(this.index);
    // 반응형
    window.addEventListener('resize', this.handleWindowResize);
    // 슬라이드 자동이동
    autoPlay && this.autoPlay();
    // 이벤트 바인드
    this.bindEvents();
  }

  // 부드럽게 옆으로 이동하는 효과 켜기
  transitionOn() {
    this.$slidesWrapper.style.transition = `transform ${this.duration}ms ease-in-out`;
  }

  // 부드럽게 옆으로 이동하는 효과 끄기
  transitionOff() {
    this.$slidesWrapper.style.transition = '';
  }

  // slidesWrapper 효과 종료
  forceTransitionEnd() {
    this.$slidesWrapper.transition = '0ms';
  }

  // 슬라이드를 시작점에서 왼쪽으로 windowSlideSize 만큼 이동시킨다.
  slideTo(index) {
    // getBoundingClientRect 뷰포트내 요소의 크기스팩
    const { width } = this.$slidesWrapper.getBoundingClientRect();
    // transform : translate3d(x, y ,z) : 요소를 x, y, z 만큼 이동시킨다
    this.$slidesWrapper.style.transform = `translate3d(${
      -(width / this.windowSlideSize) * (index + this.windowSlideSize)
    }px, 0, 0)`;
  }

  // 왼쪽으로 이동
  prevSlide() {
    // index 에러 발생시
    if (this.index === -this.windowSlideSize) {
      this.forceTransitionEnd();
      return;
    }
    // 자연스러운 이동 트렌지션 켜기
    this.transitionOn();
    // 인덱스 하나씩 줄이기
    this.index -= 1;
    // 카드
    this.slideTo(this.index);

    // 슬라이드 첫부분에 도달했을때
    if (this.index === -this.windowSlideSize) {
      // Css 전이효과가 끝나면 콜백 실행
      this.$slidesWrapper.ontransitionend = () => {
        // easeinout 효과 없에기
        this.transitionOff();
        // 인덱스를 맨뒤로 이동
        this.index = this.$slides.length - this.windowSlideSize;
        // 인덱스에 맞게 카드이동
        this.slideTo(this.index);
        // ontransitionend 없에기
        this.$slidesWrapper.ontransitionend = null;
      };
    }
  }

  // 오른쪽으로 이동
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

  // 화살표 버튼 클릭시
  onClick = e => {
    // button 요소의 type 은 submit
    if (e.target.type !== 'submit') return;

    // 자동이동 일시정지
    if (this.interval) {
      clearInterval(this.autoTimeout);
      this.resetInterval && clearInterval(this.resetInterval);
    }

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
    if (this.interval) {
      // duration 후 자동이동 다시 실행
      this.resetInterval = setTimeout(() => this.autoPlay(), this.duration);
    }
  };

  onTouchstart = e => {
    const { clientX, clientY } = e.touches[0];
    this.touchStart = e.timeStamp;
    this.touchPosition = { clientX, clientY };
    // 자동이동 제거
    if (this.interval) {
      clearInterval(this.autoTimeout);
      clearInterval(this.resetInterval);
    }
  };

  onTouchend = e => {
    const { clientX, clientY } = e.changedTouches[0];
    const { timeStamp } = e;

    const dx = clientX - this.touchPosition.clientX;
    const dy = clientY - this.touchPosition.clientY;
    const dt = timeStamp - this.touchStart;

    if (dx === 0) {
      if (this.interval) {
        console.log('auto');
        this.autoPlay();
      }

      return;
    }
    // 터치 거리
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    // 속도
    const velocity = distance / dt;
    const k = 10;
    const force = velocity ** 2 * k;
    let skips = Math.floor(Math.sqrt(force)) || 1;
    // 드래그 강도만큼 페이지 이동
    while (skips) {
      dx > 0 ? this.prevSlide() : this.nextSlide();
      skips--;
    }
    this.direction = dx > 0 ? 'prev' : 'next';

    if (this.interval) {
      this.autoPlay();
    }
  };

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
    // 효과 끄기
    this.transitionOff();
    // index 기준으로 슬라이드 이동
    this.slideTo(this.index);
    // 효과 켜기
    this.transitionOn();
  };

  // 자동이동
  autoPlay() {
    this.autoTimeout = setInterval(() => {
      const fncName = this.direction === 'next' ? 'nextSlide' : 'prevSlide';
      this[fncName]();
    }, this.interval);
  }

  render() {
    this.$slidesWrapper.innerHTML = this.slideTemplate;
    this.$slides = Array.from(this.$slidesWrapper.children);
    this.$slides.forEach($slide => {
      $slide.style.width = this.slideWidth;
    });

    // 맨앞부터 5개 슬라이드
    const front = this.$slides.slice(0, this.windowSlideSize);
    const back = this.$slides.slice(this.$slides.length - this.windowSlideSize);

    // 무한 슬라이드를 위해 맨뒤에 붙임
    front.forEach(node => {
      const $slide = node.cloneNode(true);
      $slide.id = 'front';
      this.$slidesWrapper.append($slide);
    });

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
