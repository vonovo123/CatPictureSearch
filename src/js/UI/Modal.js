import BackDrop from './BackDrop.js';

export default class Modal extends BackDrop {
  constructor($target, content, attributes) {
    super($target, {
      ...attributes,
      className: `Modal ${attributes.className || ''}`,
      styles: {
        ...attributes.styles,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    this.addHTML(this.$, content);
  }
}
