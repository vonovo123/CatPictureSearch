/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
import Component from './Component.js';
import { lazyLoad, TypeError } from '../utils/index.js';
import CatInfoModal from './CatInfoModal.js';
import api from '../api/api.js';
import observeBottomOf from '../utils/observeBottomOf.js';

export default class SearchResult extends Component {
  constructor($target) {
    super($target, 'div', { className: 'SearchResult' });
    // localStorage data 가 없으면 []
    const initialData = this.get('search-result', 'web') || [];
    // search-result 로 store에 접근할 수 잇도록 초기화
    this.set(initialData).on('search-result', ['local', 'web']);
    this.subscribe('search-result');

    this.bindEvents();
  }

  onMouseOver = e => {
    const $item = e.target.closest('.item');
    if (!$item) return;
    const { name } = $item.dataset;
    const $itemName = $item.querySelector('.item-name');
    if ($itemName.textContent) return;
    this.addHTML($itemName, `<span>${name}</span>`);
  };

  onMouseOut = e => {
    const $item = e.target.closest('.item');
    if (!$item) return;
    $item.querySelector('.item-name').textContent = '';
  };

  onClick = async e => {
    const $catCard = e.target.closest('.item');
    if (!$catCard) return;
    const catInfo = await this.tryFetchData(api.getCatById, $catCard.id, {
      cb: ({ data }) => {
        if (!data)
          throw new TypeError(
            '클릭하신 고양이 정보를 불러올수 없습니다.',
            'data'
          );
        return data;
      },
      errorTypes: ['api', 'data'],
    });
    catInfo && new CatInfoModal(document.body, catInfo);
  };

  createCatCardHTML = cat => `
      <div class="item mb-3" id=${cat.id} data-name=${cat.name}>
        <div class="img-wrapper lazy card ">
          <img data-src=${cat.url} alt=${cat.name}  />
          <div class="img-placeholder"></div>
        </div>
        <div class="item-name"></div>
      </div>
  `;

  renderNextCats = async () => {
    const cats = await this.tryFetchData(api.getRandomCats, {
      cb: ({ data }) => data,
      showErrorMessage: false,
      showLoading: false,
      errorTypes: ['api'],
    });
    if (!cats) {
      this.renderNextCats();
      return;
    }
    this.addHTML(cats.map(this.createCatCardHTML).join(''));
  };

  infiniteNextCats = () => {
    observeBottomOf(this.$, async unobserve => {
      if (this.isLoading) return;
      await this.renderNextCats();
      lazyLoad();
      // 로직 후 옵져버 삭제
      unobserve();
      this.infiniteNextCats();
    });
  };

  render = () => {
    const data = this.get('search-result', 'local');
    this.HTML(data.map(this.createCatCardHTML).join(''));
    lazyLoad();

    this.infiniteNextCats();
  };
}
