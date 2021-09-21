console.log('app is running!!');
import Component from './components/Component.js';
import SearchResult from './components/SearchResult.js';
import { api } from './api/api.js';
export default class App extends Component {
  constructor(target) {
    super([target, 'afterbegin'], 'div', {
      className: 'App',
      id: 'App',
      innerHTML: '',
    });
    this.updateRamdomCat();
    this.children = [new SearchResult(this.$)];
  }

  async updateRamdomCat() {
    const data = await this.tryFetchData(api.getRandomCats, {
      cb: (data) => {
        return data;
      },
      cache: false,
      errorTypes: ['api'],
    });
    if (data) this.set(data).on('random-search', ['local', 'web']);
  }
  render() {
    this.children.forEach((child) => child.render && child.render());
  }
}
