console.log('app is running!!');
import Component from './components/Component.js';
import { api } from './api/api.js';
export default class App extends Component {
  constructor(target) {
    super(target, 'div', { innerHTML: 'test' });
    this.bindEvents();
  }
  onClick = async (e) => {
    let data = await this.tryFetchData(api.getRandomCats, {
      cb: (data) => {
        return data;
      },
      errorTypes: ['api'],
    });
    console.log(data);
  };
}
