import Component from '../Component.js';

export default class SearchHistory extends Component {
  constructor($target) {
    super($target, 'ul', {
      className: 'SearchHistory mb-3',
      innerHTML: `<li class="btn">dummy1</li><li class="btn">dummy2</li>`,
    });
  }
}
