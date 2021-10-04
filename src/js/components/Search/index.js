import Component from '../Component.js';
import SearchInput from './SearchInput.js';
import RandomSearchButton from './RandomSearchButton.js';
import SearchHistory from './SearchHistory.js';

export default class Search extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Search',
      innerHTML: `<div class="Search-cat mb-3">
                  </div>
                 <div class="Search-history" >
                </div>`,
    });
    const $searchCat = this.$.querySelector('.Search-cat');
    const $searchHistory = this.$.querySelector('.Search-history');

    this.children = [
      new SearchInput($searchCat),
      new RandomSearchButton($searchCat),
      new SearchHistory($searchHistory),
    ];
  }
}
