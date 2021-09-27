// import Component from './src/js/components/Component.js';
import BaseComponent from './src/js/components/BaseComponent.js';

export default class App extends BaseComponent {
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
