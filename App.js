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
  }

  getData = async () => {
    const { data } = await this.tryFetchData(api.getRandomCats);
    console.log(data);
  };

  onClick = () => {
    console.log('click');
  };
}
