class Store {
  constructor() {
    this.store = {};
  }
  set(context, data) {
    console.log(context);
    if (!this.store[context]) {
      this.store[context] = {
        data,
        elements: [],
      };
      return;
    }
    this.store[context].data = data;
    this.publish(context);
  }
  get(context) {
    return this.store[context];
  }

  subscribe(context, element) {
    this.store[context].elements.push(element);
  }

  publish(context) {
    this.store[context].elements.forEach((e) => {
      e.render();
    });
  }
}

export const store = new Store();
