import Component from '../components/Component.js';

export default class BackDrop extends Component {
  constructor($target, attributes) {
    super($target, 'div', {
      ...attributes,
      className: `Backdrop${attributes.className || ''}`,
      styles: {
        // 음영처리
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // 위치
        position: 'fixed',
        // z 축
        zIndex: 2000,
        // 위치
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...attributes.styles,
      },
    });
  }
}
