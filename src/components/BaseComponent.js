/**
 * BaseComponent
 * 가상 dom 생성
 * 이벤트 바인드
 * dom 요소 추가
 */
export default class BaseComponent {
  //target : 요소를 붙일 부모요소
  //tag : 요소의 tag
  //attributes : 요소의 style, id, name, class
  constructor($target, tag, attributes) {
    //insertAdjacentElement method의 포지션으로
    //beforebegin : element 앞에
    //afterbegin : element 안의 첫번째 child로
    //beforeend : element 안의 마지막 chlid로
    //afterend : element의 뒤에
    //가 올 수 있음
    let insertPosition;
    //typeof배열은 'object' 이기때문에 불명확함 배열 instanceof Array로 대체
    if ($target instanceof Array) {
      [this.$parent, insertPosition] = $target;
    } else {
      this.$parent = $target;
    }

    const $ = document.createElement(tag);
    this.$ = $;
    //attributes {
    //  styles: { },
    //  name: '',
    //  className: '',
    //  id : '',
    // ...
    //}
    attributes &&
      Object.entries(attributes).forEach(([fieldName, fieldValue]) => {
        if (fieldName === 'styles') {
          return Object.entries(fieldValue).forEach(
            ([fieldName, fieldValue]) => {
              $.style[fieldName] = fieldValue;
            }
          );
        }
        if (fieldValue) {
          $[fieldName] = fieldValue;
        }
      });
    insertPosition
      ? this.$parent.insertAdjacentElement(insertPosition, this.$)
      : this.$parent.append(this.$);
  }
  //이벤트바인드 공통
  bindEvents() {
    Object.entries(this).forEach(([fieldName, fieldValue]) => {
      if (fieldName.indexOf('on') === 0) {
        let eventType = fieldName.slice(2).toLowerCase();
        this.$.addEventListener(eventType, fieldValue);
      }
    });
  }
  //template를 $target에 덮어쓴다.
  HTML($target, template) {
    //파라미터가 하나만 들어오면(즉, target이 없으면)
    if (!template) {
      template = $target;
      $target = this.$;
    }
    $target.innerHTML = template; //target내부에 덮어씀 tag가 들어가야함
  }
  //'div' tag로 template를 감싸서 target에 추가한다.
  addHTML($target, template) {
    //파라미터가 하나만 들어오면(즉, target이 없으면)
    if (!template) {
      template = $target;
      $target = this.$;
    }
    //target내부에 추가 tag 필요없음
    $target.append(template);
  }
}
