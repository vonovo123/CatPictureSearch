//api에러처리를 위해 fetch영역 별도 분리
import fetchData from './fetchData.js';
const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const api = {
  getRandomCats: () =>
    fetchData(API_ENDPOINT + '/api/cats/random501', 'getRandomCats'),
};
