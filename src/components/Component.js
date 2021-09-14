import BaseComponent from './BaseComponent.js';
import { ErrorMessage, CriticalErrorMessage } from '../UI/index.js';
/**
 * Component
 * 에러핸들링
 * CRUD
 * 하위 요소 렌더링
 * 캐싱
 */
export default class Component extends BaseComponent {
  isLoading;
  constructor($target, tag, attributes) {
    super($target, tag, attributes);
  }
  //api call 및 캐싱처리
  async tryFetchData(fetchData, query, options) {
    if (!options) {
      options = query;
    }
    const {
      cb,
      errorTypes,
      cache = true,
      errorPosition,
      showErrorMessage = true,
      showLoading = true,
    } = options || {};
    //fetchData/query별 cash가 있으면 가져오기
    //로딩중일때 요청 들어오면 무시
    if (this.isLoading) return;

    //로딩 화면 on

    //api call 하고 콜백으로 컴포넌트로 결과 데이터 전달
    //콜백에서 데이터 처리 후 다시 받아서(casing을 위해)
    try {
      this.isLoading = true;
      let { data } = await fetchData(query);
      if (cb) data = cb(data);
      //casing in
      return data;
    } catch (e) {
      this.handleError({ e, errorTypes, showErrorMessage, errorPosition });
    } finally {
      this.isLoading = false;
    }
  }
  //errorHandling
  handleError({
    e,
    errorTypes: types,
    showErrorMessage,
    errorPosition: position,
  }) {
    if (types && types.length && types.some((type) => type === e.type)) {
      //사용자가 지정한 에러상황이면 에러메세지 보여줌
      if (showErrorMessage) {
        new ErrorMessage(e.message, { status: e.status, position });
      }
    } else {
      //사용자 지정 에러상황에 해당하지않으면 critical한 error로 간주
      new CriticalErrorMessage(`
            ${e.message}
            ${e.stack}
        `);
    }
  }
}
