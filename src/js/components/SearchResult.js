import Component from './Component.js';

export default class SearchResult extends Component {
  constructor($target) {
    super($target, 'div', { className: 'SearchResult' });
    // localStorage data 가 없으면 []
    const initialData = this.get('search-result', 'web') || [];
    // search-result 로 store에 접근할 수 잇도록 초기화
    this.set(initialData).on('search-result', ['local', 'web']);
    this.subscribe('search-result');
  }

  createCatCardHTML = cat => `
      <div class="item mb-3" id=${cat.id} data-name=${cat.name}>
        <div class="img-wrapper lazy card ">
          <img src=${cat.url} alt=${cat.name}  />
          <div class="img-placeholder"></div>
        </div>
        <div class="item-name"><span>test</span></div>
      </div>
  `;

  render = () => {
    const data = this.get('search-result', 'local');
    this.HTML(data.map(this.createCatCardHTML).join(''));
    // this.htmldata.map(this.createCatCardHTML)
  };
}
