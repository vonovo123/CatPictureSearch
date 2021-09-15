import BaseComponent from './BaseComponent.js';
import fetchCache from '../fetchCache.js';
import { ErrorMessage, CriticalErrorMessage, Loading } from '../UI/index.js';
import { store } from '../store.js';
import { localStorage } from '../utils/localStorage.js';
/**
 * Component
 * 에러핸들링
 * CRUD
 * 하위 요소 렌더링
 * 데이터 공유(store)
 * 캐싱
 */

/**
 * setData
 * data를 type 별(web/ local)로 저장한다
 * context를 키 값으로 한다.
 * context는 api함수명
 *
 */
const setData = (data, context, type) => {
  switch (type) {
    case 'local':
      console.log(data);
      store.set(context, data);
      break;
    case 'web':
      localStorage.set('dev-matching-' + context, data);
  }
};

/**
 * getData
 * 공유된 혹은 웹 캐싱된 data를 type 별(web/ local)로 가져온다
 * context를 키 값으로 한다.
 * context는 api함수명
 */
const getData = (context, type) => {
  switch (type) {
    case 'local':
      return store.get(context);
    case 'web':
      return localStorage.get('dev-matching-' + context);
  }
};
export default class Component extends BaseComponent {
  isLoading;
  constructor($target, tag, attributes) {
    super($target, tag, attributes);
  }
  //tryFecthData : api call 및 캐싱 처리
  //handleError : 에러 핸들링
  //set // type 별 데이터 set
  //get //type 별 데이터 get
  //subscribe //데이터를 공유할 컴포넌트 등록
  //api call 및 api 캐싱처리
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
    let funcStr;
    if (cache) {
      funcStr = fetchData.toString();
      if (fetchCache.has(funcStr, query)) {
        return fetchCache.get(funcStr, query);
      }
    }
    //로딩중일때 요청 들어오면 무시
    if (this.isLoading) return;

    //로딩 화면 on
    const loading = showLoading && new Loading();
    //api call 하고 콜백으로 컴포넌트로 결과 데이터 전달
    //콜백에서 데이터 처리 후 다시 받아서(casing을 위해)
    try {
      this.isLoading = true;
      let { data } = await fetchData(query);
      if (cb) data = cb(data);
      //casing in
      if (cache) {
        fetchCache.set(funcStr, query, data);
      }
      return data;
    } catch (e) {
      this.handleError({ e, errorTypes, showErrorMessage, errorPosition });
    } finally {
      this.isLoading = false;
      loading.$.remove();
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
  get(context, type) {
    return getData(context, type);
  }
  set(data) {
    return {
      on: (context, type) => {
        if (type instanceof Array) {
          type.forEach((t) => {
            setData(data, context, t);
          });
        } else {
          setData(data, context, type);
        }
      },
    };
  }
}
