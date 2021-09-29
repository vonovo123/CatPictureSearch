import fetchData from './fetchData.js';
// api url 별 메서드를 가지고 있는 api 객체
const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const api = {
  getCats: keyword =>
    fetchData(`${API_ENDPOINT}/api/cats/search?q=${keyword}`, 'keyword'),
  getRandomCats: () =>
    fetchData(`${API_ENDPOINT}/api/cats/random50`, 'getRandomCats'),
  getCatById: id => fetchData(`${API_ENDPOINT}/api/cats/${id}`, 'getCatById'),
};
export default api;
