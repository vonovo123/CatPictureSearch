import ApiError from '../utils/ApiError.js';
// Promise to Json
// api에러시 공통 예외처리 방법정의
// eslint-disable-next-line consistent-return
const STATUS_ERROR_MESSAGE =
  '서버가 원활하지 않습니다. 잠시 후 다시 시도해주세요';

const statusErrorMessages = [
  false,
  'Redirects Error',
  'Client Error',
  'Server Error',
];
const getStatusErrorMessage = (res, name) => {
  const errorTypes = [300, 400, 500, 600];
  errorTypes.forEach((errorType, i) => {
    if (res.status < errorType) {
      if (errorType === 300) {
        // 정상
        return false;
      }
      return `API request error : ${statusErrorMessages[i]} with status code ${res.status} from ${name}`;
    }
  });
};
const fetchData = async (url, name) => {
  const res = await fetch(url);
  // fetch 함수내부에서 api 통신중 에러가난 경우에는 javascript tyr/catch로 예외처리를 할 수 없기 때문에
  // 직접 예외처리한다.
  const statusErrorMessage = getStatusErrorMessage(res, name);
  if (statusErrorMessage)
    throw new ApiError(statusErrorMessage, 'status', res.status);
  return res.json();
};

export default fetchData;
