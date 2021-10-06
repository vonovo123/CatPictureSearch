import Component from './src/js/components/Component.js';

import Search from './src/js/components/Search/index.js';

export default class App extends Component {
  constructor(target) {
    super(target, 'div', { id: 'app' });
    // this.bindEvents();
    // this.getData();
    // 하위 컴포넌트 정의
    this.children = [new Search(this.$)];
  }
}
