import BaseComponent from '../components/BaseComponent.js';
export default class CriticalErrorMessage extends BaseComponent {
  constructor(message) {
    const template = {
      className: `CriticalErrorMessage`,
      innerHTML: `
          <p>알수없는 애러가 발생했습니다.</p>
          <p>${message}</p>
          <p>페이지 클릭 시 개발 화면으로 돌아갑니다.</p>
        `,
      styles: {
        position: 'fixed',
        zIndex: 2000,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    };
    super(document.body, 'div', template);
    this.bindEvents();
  }
  onClick = () => {
    this.$.remove();
  };
}
