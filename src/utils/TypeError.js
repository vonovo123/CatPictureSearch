//type : api => 리다이렉트 에러/클라이언트 에러/api서버 에러
//Data : 조회결과없음
export default class TypeError extends Error {
  constructor(message, type) {
    super(message);
    this.type = type;
  }
}
