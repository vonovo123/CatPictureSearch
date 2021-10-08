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

    this.slideTemplate = slideTemplate;
    this.$slidesWrapper = this.$.querySelector('.Carousel-slides');
    // 뷰포트 속 슬라이드 갯수
    this.windowSlideSize = windowSlideSize;
    // 카드 높이
    this.slideWidth = 100 / this.windowSlideSize.toFixed(4);
    this.slideWidth += '%';
  }

  render() {
    this.$slidesWrapper.innerHTML = this.slideTemplate;
    this.$slides = Array.from(this.$slidesWrapper.children);
    this.$slides.forEach($slide => {
      console.log($slide);
      $slide.style.width = this.slideWidth;
    });
    console.log(this.$slides);
    // this.HTML();
    lazyLoad({
      root: this.$,
      rootMargin: '100%',
      threshold: 0,
    });
  }
}
