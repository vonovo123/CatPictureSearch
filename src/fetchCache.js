class FetchCache {
  constructor() {
    this.cache = {};
  }
  has(context, key) {
    //context : funcStr / key : query
    // eslint-disable-next-line no-prototype-builtins
    return !!this.cache[context] && this.cache[context].hasOwnProperty(key);
  }
  set(context, key, data) {
    if (this.cache[context]) {
      this.cache[context][key] = data;
      return;
    }
    this.cache[context] = {
      [key]: data,
    };
    return;
  }
  get(context, key) {
    if (!this.has(context, key)) {
      throw new Error('set context and key in fetchCache before get value');
    }
    return this.cache[context][key];
  }
}
const fetchCache = new FetchCache();
export default fetchCache;
