import BaseComponent from '../components/BaseComponent.js';
export default class Loading extends BaseComponent {
  constructor() {
    const template = {
      className: 'loading',
      innerHTML: `
            <span class="loading">
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
            </span>
          `,
    };
    super(document.body, 'div', template);
  }
}
