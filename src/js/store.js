class Store {
  constructor() {
    this.store = {};
  }

  has(context) {
    return !!this.store[context];
  }

  set(context, data) {
    if (!this.has(context)) {
      this.store[context] = {
        data,
        elements: [],
      };
      return this.store[context];
    }
    this.store[context].data = data;
    this.publish(context);
    return this.store[context];
  }

  get(context) {
    return this.store[context].data;
  }

  subscribe(context, element) {
    this.store[context].elements.push(element);
  }

  publish(context) {
    this.store[context].elements.forEach(element => {
      element.render();
    });
  }
}
const store = new Store();
export default store;
