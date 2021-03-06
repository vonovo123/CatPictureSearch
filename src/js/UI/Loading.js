import BaseComponent from '../components/BaseComponent.js';

export default class Loading extends BaseComponent {
  constructor() {
    super(document.body, 'div', {
      className: 'loading',
      innerHTML: `
        <span class='loading'>
          <span class='loading-dot'></span>
          <span class='loading-dot'></span>
          <span class='loading-dot'></span>
        </span> 
      `,
    });
  }
}
