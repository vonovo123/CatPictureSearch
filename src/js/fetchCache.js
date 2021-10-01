/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
class FetchCache {
  constructor() {
    this.cache = {};
  }

  has(context, key) {
    return !!this.cache[context] && this.cache[context].hasOwnProperty(key);
  }

  set(context, key, value) {
    console.log(this.cache[context]);
    console.log(key);
    console.log(value);

    if (this.cache[context]) {
      // 이미 있으면 덮어쓰기
      this.cache[context][key] = value;
      return this.cache[context][key];
    }
    this.cache[context] = {
      [key]: value,
    };
    return this.cache[context];
  }

  get(context, key) {
    if (!this.cache[context])
      throw Error('set context and key in fetchCache before get value');
    return this.cache[context][key];
  }
}

const fetchCache = new FetchCache();

export default fetchCache;
