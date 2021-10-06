class LocalStorage {
  get = key => {
    return JSON.parse(window.localStorage.getItem(key));
  };

  set = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
}

const localStorage = new LocalStorage();
export default localStorage;
