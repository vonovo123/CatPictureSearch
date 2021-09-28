import Component from './src/js/components/Component.js';

export default class App extends Component {
  constructor(target) {
    super(target, 'div', {
      className: 'App',
      styles: { width: '100px', height: '200px', backgroundColor: 'green' },
    });
    this.bindEvents();
  }

  onClick = () => {
    console.log('click');
  };
}
