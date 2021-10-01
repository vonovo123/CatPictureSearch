/* eslint-disable no-const-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-useless-constructor */
import BaseComponent from './BaseComponent.js';
import fetchCache from '../fetchCache.js';
import { Loading, ErrorMessage, CriticalErrorMessage } from '../UI/index.js';

export default class Component extends BaseComponent {
  isLoading;

  constructor(target, tag, attribute) {
    super(target, tag, attribute);
  }

  // 에러 핸들러 start
  handleError({
    e,
    errorTypes: types,
    showErrorMessage,
    errorPosition: position,
  }) {
    // 사용자가 지정한 예상되는 에러와  실제 발생한 에러가 일치할때
    if (types && types.length && types.some(type => type === e.type)) {
      // 에러타입이 api이 아니면 여기서 처리
      if (e.type !== 'api') {
        console.warn(e);
      }
      // 에러메세지를 사용하에게 보여줘야 하는 에러인 경우
      if (showErrorMessage) {
        new ErrorMessage(e.message, { status: e.status, position });
      }
      // 불일치하면 크리티컬에러 발생
    } else {
      new CriticalErrorMessage(`${e.message} ${e.stack}`);
    }
  }
  // 에러 핸들러 end

  // 예외처리 가능한 비동기 fetch함수를 만든다.
  async tryFetchData(fetchData, query, options) {
    // query 가 필요없는 api call 일경우
    if (!options) {
      options = query;
    }
    const {
      cb,
      showLoading = true,
      cache = true,
      errorTypes,
      errorPosition,
      showErrorMessage = true,
    } = options || {};
    // api 캐싱을 위해 apiMethod 저장
    let funcStr = null;
    if (cache) {
      funcStr = fetchData.toString();
      if (fetchCache.has(funcStr, query)) {
        return fetchCache.get(funcStr, query);
      }
    }
    if (this.isLoading) return;
    this.isLoading = true;
    const loading = showLoading && new Loading();
    try {
      let data = await fetchData(query);
      data = cb(data);
      if (cache) {
        fetchCache.set(funcStr, query, data);
      }
      return data;
    } catch (e) {
      // 에러, 사용자 예상 에러타입, 에러화면노출여부, 에러 위치
      this.handleError({ e, errorTypes, showErrorMessage, errorPosition });
    } finally {
      // eslint-disable-next-line no-unused-expressions
      loading && loading.$.remove();
      this.isLoading = false;
    }
  }
}
