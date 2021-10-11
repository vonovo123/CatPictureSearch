import Component from './Component.js';
import { lazyLoad } from '../utils/index.js';

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

  onClick = e => {};

  createCatCardHTML = cat => `
      <div class="item mb-3" id=${cat.id} data-name=${cat.name}>
        <div class="img-wrapper lazy card ">
          <img data-src=${cat.url} alt=${cat.name}  />
          <div class="img-placeholder"></div>
        </div>
        <div class="item-name"></div>
      </div>
  `;

  render = () => {
    const data = this.get('search-result', 'local');
    this.HTML(data.map(this.createCatCardHTML).join(''));
    lazyLoad();
  };
}
