import Component from './Component.js';
import { store } from '../store.js';
export default class SearchResult extends Component {
  constructor($parent) {
    super($parent, 'div', {
      className: 'container',
      innerHTML: `
        <div class="heroes" id="heroes"></div>
      `,
    });
    const initialData = this.get('random-search', 'web') || [];
    this.set(initialData).on('random-search', ['web', 'local']);
    this.subscribe('random-search');
  }
  createCatCardHTML = (cat) => `
    <div class="hero">
        <img class="image" src=${cat.url}></img>
      </div>
  `;

  render() {
    document.querySelector('.heroes').innerHTML = store
      .get('random-search')
      .data.map(this.createCatCardHTML)
      .join('');
  }
}
