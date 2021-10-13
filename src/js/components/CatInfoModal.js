import Modal from '../UI/Modal.js';

export default class CatInfoModal extends Modal {
  constructor($target, modalInfo) {
    const { url, name, temperament, origin } = modalInfo;
    const template = `<div class="content-wrapper pd-5 card">
                        <div class="title mb-3">
                          <span>${name}</span>
                          <div class="close btn">x</div>
                        </div>
                        <div class="image-wrapper mb-3">
                          <img src="${url}" alt="${name}"></img>
                        </div>
                        <div class="description>
                          <div>성격 : ${temperament}</div>
                          <div>출생지 : ${origin}</div>
                        </div>
                      </div>`;
    super($target, template, {
      className: 'catInfoModal',
      tabIndex: 0,
      styles: {
        transition: 'opacity 300ms',
        opacity: 0,
      },
    });
    this.$.focus();
    this.$.classList.add('fade-in');
    this.bindEvents();
  }

  removeWithFadeOut = () => {
    this.$.classList.remove('fade-in');
    this.$.classList.add('fade-out');
    this.$.ontransitionend = () => this.$.remove();
  };

  onClick = e => {
    if (e.taget === this.$.querySelector('.close') || e.target === this.$) {
      this.removeWithFadeOut();
    }
  };

  onKeyDown = e => {
    e.key === 'Escape' && this.removeWithFadeOut();
  };
}
