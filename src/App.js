console.log('app is running!!');
import Component from './components/Component.js';
import { api } from './api/api.js';
export default class App extends Component {
  constructor(target) {
    super(target, 'div', { innerHTML: 'test' });
    this.bindEvents();
  }

  onClick = () => {
    this.tryFetchData(api.getRandomCats, 'test', {
      cb: (data) => {
        return data;
      },
    });
  };
}
