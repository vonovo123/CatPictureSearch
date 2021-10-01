import BaseComponent from '../components/BaseComponent.js';

const DURATION = 2000;
export default class ErrorMessage extends BaseComponent {
  constructor(message, { status, position }) {
    // 개발자로 부터 position 컴포넌트 지정되면 상위 컴포넌트에 붙이고
    // 지정되어있지않으면 body에 붙인다.
    super(position ? position.$parent : document.body, 'div', {
      className: 'ErrorMessage',
      innerHTML: `
        ${status ? `<div>${status}</div>` : ''}
        <div>${message}</div>
      `,
      styles: {
        position: 'fixed',
        zIndex: 1001,
        left: '50%',
        top: '100px',
        transform: 'translate(-50%, -50%)',
      },
    });
    // 개발자 지정 위치가 있으면

    if (position) {
      // 에러위치 커스텀
      const { $parent = document.body, x = 0, y = 0 } = position;
      const { bottom, left } = $parent.getBoundingClientRect();
      this.$.style.left = `${left + x}px`;
      this.$.style.top = `${bottom + y}px`;
    }
    this.$.classList.add('fade-in');

    setTimeout(() => {
      console.log('remove');
      this.$.classList.remove('fade-in');
      this.$.classList.add('fade-out');
      this.$.ontransitionend = () => this.$.remove();
    }, DURATION);
  }
}
