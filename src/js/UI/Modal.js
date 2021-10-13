/* eslint-disable new-cap */
import BackDrop from './BackDrop.js';

export default class Modal extends BackDrop {
  constructor($target, content, attributes) {
    super($target, {
      ...attributes,
      className: `Modal ${attributes.className || ''}`,
      styles: {
        ...attributes.styles,
        // 요소 가운데 정렬을 위해
        display: 'flex',
        // 행축 가운데
        justifyContent: 'center',
        // 열축 가운데
        alignItems: 'center',
      },
    });
    if (typeof content === 'string') {
      this.addHTML(this.$, content);
    } else if (typeof content === 'function') {
      this.$content = new content(this.$);
      this.render();
    }
    this.bindEvents();
  }

  render() {
    this.$content && this.$content.render && this.$content.render();
  }
}
