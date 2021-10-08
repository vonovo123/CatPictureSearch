import Component from './Component.js';
import api from '../api/api.js';
import Carousel from '../UI/Carousel.js';

export default class Banner extends Component {
  constructor($target) {
    const attribute = {
      className: 'Banner',
    };
    super($target, 'div', attribute);
  }

  async render() {
    console.log(this.$);
    console.log('render Banner');
    const option = {
      cb: ({ data }) => data,
      cache: false,
      errorType: ['api'],
      showErrorMessage: false,
    };
    const bannerData = await this.tryFetchData(api.getRandomCats, option);
    const slideTemplate = bannerData
      .map(({ url, name, id }) => {
        return `<li class="Carousel-slide pd-1 mb-3" id-${id}>
                <div class="img-wrapper card lazy">
                  <img data-src=${url} alt=${name}>
                  <div class="img-placeholder"/>
                </div>
              </li>
            `;
      })
      .join('');
    // this.HTML(bannerHTML);

    const carouselOpt = {
      slideTemplate,
      windowSlideSize: 5,
      autoPlay: 2000,
      duration: 300,
    };
    new Carousel(this.$, carouselOpt).render();
  }
}
