import Component from '../Component.js';
import api from '../../api/api.js';

export default class RanomSearchButton extends Component {
  constructor($target) {
    super($target, 'button', {
      textContent: '랜덤고양이',
      className: 'btn',
    });
    this.bindEvents();
  }

  updateSearchResult = async () => {
    const data = await this.tryFetchData(api.getRandomCats, {
      cb: ({ data }) => data,
      showLoading: true,
      cache: false,
      errorTypes: ['api'],
    });
    if (data) {
      this.set(data).on('search-result', ['local', 'web']);
    }
  };

  onClick = async () => {
    this.$.disable = true;
    this.updateSearchResult();
    this.$.disable = false;
  };
}
