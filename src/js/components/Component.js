/* eslint-disable no-new */
/* eslint-disable no-useless-constructor */
import BaseComponent from './BaseComponent.js';
import { ErrorMessage, CriticalErrorMessage } from '../UI/index.js';

export default class Component extends BaseComponent {
  constructor(target, tag, attribute) {
    super(target, tag, attribute);
  }

  // 에러 핸들러
  static handleError({
    e,
    errorTypes: types,
    showErrorMessage,
    errorPosition: position,
  }) {
    // 사용자가 지정한 errorTypes와 실제 발생한 에러의 타이이 일치할때
    if (types && types.length && types.some(type => type === e.type)) {
      // 에러타입이 api이 아니면 여기서 처리
      if (e.type !== 'api') {
        console.warn(e);
      }
      // 에러메세지를 사용하에게 보여줘야 하는 에러인 경우
      if (showErrorMessage) {
        new ErrorMessage(e.message, { status: e.status, position });
      } else {
        new CriticalErrorMessage(`${e.message} ${e.stack}`);
      }
    }
  }
}
