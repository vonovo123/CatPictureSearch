import ApiError from '../utils/ApiError.js';
//api 에러 처리 및 데이터 call
const STATUS_ERROR_MESSAGE =
  '서버가 원활하지 않습니다. 잠시 후 다시 시도해주세요';

export default async function fetchData(url, name) {
  try {
    const res = await fetch(url);
    const apiStatusErrorMessage = getapiStatusErrorMessage(res, name);
    if (apiStatusErrorMessage)
      throw new ApiError(apiStatusErrorMessage, 'status', res.status);
    return res.json();
  } catch (e) {
    console.log('type', e.type);
    if (e.type === 'status') {
      throw new ApiError(STATUS_ERROR_MESSAGE, 'api', e.status);
    }
    throw new Error(e);
  }
}
const statusErrorMessage = {
  400: 'Redirect Error',
  500: 'Client Error',
  600: 'Server Error',
};
const getapiStatusErrorMessage = (res, name) => {
  let errorType = ['300', '400', '500', '600'];
  for (let i = 0; i < errorType.length; i++) {
    let type = errorType[i];
    if (res.status <= type) {
      if (type === '300') return false;
      return `Api request error : ${statusErrorMessage[type]}
                 with status code ${res.status} from ${name}`;
    }
  }
};
