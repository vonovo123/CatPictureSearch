import DarkModeToggler from './src/js/components/DarkModeToggler.js';
import Component from './src/js/components/Component.js';
import Banner from './src/js/components/Banner.js';
import Search from './src/js/components/Search/index.js';
import SearchResult from './src/js/components/SearchResult.js';

export default class App extends Component {
  constructor($target) {
    super($target, 'div', { id: 'App' });
    // this.bindEvents();
    // this.getData();
    // 하위 컴포넌트 정의
    this.children = [
      new DarkModeToggler(this.$),
      new Banner(this.$),
      new Search(this.$),
      new SearchResult(this.$),
    ];
  }

  render = () => {
    this.children.forEach(child => {
      child.render && child.render();
    });
    document.querySelector('input').focus();
  };
}
