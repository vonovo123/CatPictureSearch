/* eslint-disable class-methods-use-this */
import Component from '../Component.js';

export default class SearchHistory extends Component {
  constructor($target) {
    super($target, 'ul', {
      className: 'SearchHistory mb-3',
    });
    this.set([]).on('history', 'local');
    this.subscribe('history');
  }

  render() {
    this.HTML(
      this.$,
      this.get('history', 'local')
        .map(searched => {
          return `<li class=btn>${searched}</li>`;
        })
        .join('')
    );
  }
}
