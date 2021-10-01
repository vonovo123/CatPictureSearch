import Component from './src/js/components/Component.js';
import api from './src/js/api/api.js';

export default class App extends Component {
  constructor(target) {
    super(target, 'div', {
      className: 'App',
      styles: { width: '100px', height: '200px', backgroundColor: 'green' },
    });
    this.bindEvents();
    this.getData();
    console.log('teurn');
  }

  getData = async () => {
    const data = await this.tryFetchData(api.getRandomCats, 'random', {
      cb: ({ data }) => data,
      showLoading: true,
      errorTypes: ['status'],
      // errorPosition: { $parent: document.body, x: 0, y: 0 },
    });
  };

  onClick = () => {
    console.log('click');
  };
}
