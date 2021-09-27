/* eslint-disable no-unused-expressions */
export default class BaseComponent {
  /**
   * @param {*} target : 상위 컴포넌트
   * @param {*} tag : 컴포넌트 태그
   * @param {*} attributes : 컴포넌트 속성
   */
  constructor(target, tag, attributes) {
    let insertPosition; // 컴포넌트 상위요소와 관련된 특정 위치 (beforebegin, afterbegin, beforeend, afterend)
    // target이 [taget, insertPosition]인 경우 insertPosition은
    // 컴포넌트 상위요소와 관련된 특정위치이다.
    if (target instanceof Array) {
      [this.$parent, insertPosition] = target;
      console.log('insertPosition', insertPosition);
    } else {
      this.$parent = target;
    }
    // 컴포넌트
    const $ = document.createElement(tag);

    // attributes가 존재하면 순회하며 컴포넌트 속성 설정
    // eslint-disable-next-line no-unused-expressions
    attributes &&
      Object.entries(attributes).forEach(([fieldName, fieldValue]) => {
        // 속성이 style일 경우 value가 객체이기 때문에 한번 더 순회
        if (fieldName === 'styles') {
          Object.entries(fieldValue).forEach(([styleName, styleValue]) => {
            $.style[styleName] = styleValue;
          });
        }
        $[fieldName] = fieldValue;
      });

    this.$ = $;
    insertPosition
      ? this.$parent.insertAdjacentElement(insertPosition, this.$)
      : this.$parent.append(this.$);

    console.log(this);
    console.log(this.$);
  }

  // 컴포넌트의 특정 요소에 이벤트 바인딩
  bindEvents() {
    Object.entries(this).forEach(([fieldName, fieldValue]) => {
      if (fieldName.indexOf('on') !== 0) return; // 'onXXXX'의 형태가 아니면 바인딩하지않음
      const eventType = fieldName.slice(2).toLowerCase();
      this.$.addEventListener(eventType, fieldValue);
    });
  }

  // 상위요소 $parent에 template 삽입
  HTML($parent, template) {
    // $parent가 없는경우 당 컴포넌트에 template 삽입
    if (!template) {
      template = $parent;
      $parent = this.$;
    }
    $parent.innerHTML = template;
  }

  addHTML($parent, template) {
    // $parent가 없는경우 당 컴포넌트에 template 삽입
    if (!template) {
      template = $parent;
      $parent = this.$;
    }
    const $temp = document.createElement('div');
    $temp.innerHTML(template);
    $parent.append(...$temp);
  }
}
