/* eslint-disable no-unused-expressions */
import Component from '../Component.js';
import api from '../../api/api.js';
import TypeError from '../../utils/TypeError.js';

export default class SearchInput extends Component {
  constructor($target) {
    super($target, 'input', {
      className: 'btn',
      placeholder: '고양이를 검색해보세요',
    });
    this.bindEvents();
  }

  updateSearchResult = async keyword => {
    const data = await this.tryFetchData(api.getCats, keyword, {
      cb: ({ data }) => {
        if (data.length === 0) {
          throw new TypeError(
            '검색하신 고양이 이미지가 존재하지 않습니다. 다른 고양이를 검색해주세요',
            'data'
          );
        }
        return data;
      },
      showLoading: true,
      cache: true,
      errorTypes: ['api', 'data'],
    });
    if (data) {
      this.set(data).on('search-result', ['local', 'web']);
    }
  };

  updateSearchHistory = keyword => {
    const searchHistory = this.get('history', 'local');
    searchHistory.length === 5 && searchHistory.shift();
    this.set([...searchHistory, keyword]).on('history', 'local');
  };

  onKeyUp = e => {
    const keyword = e.target.value;
    if (keyword !== '') {
      if (e.keyCode === 13) {
        if (!this.isLoading) {
          this.updateSearchResult(keyword);
          this.updateSearchHistory(keyword);
          this.$.value = '';
        }
      }
    }
  };

  onClick = e => {
    console.log(this);
    this.$.value = '';
  };
}
