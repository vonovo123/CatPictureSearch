import BaseComponent from '../components/BaseComponent.js';

export default class CriticalErrorMessage extends BaseComponent {
  constructor(message) {
    super(document.body, 'div', {
      innerHTML: `
          <p>알수없는 에러가 발생했습니다.</p>
          <p>${message}</p>
          <p>페이지 클릭시 화면으로 돌아갑니다.</p>
      `,
      className: 'CriticalErrorMessage',
      styles: {
        position: 'fixed',
        zIndex: 1001,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
    });
    this.bindEvents();
  }

  onClick = () => {
    this.$.remove();
  };
}
