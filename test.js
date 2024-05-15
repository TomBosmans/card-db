class MyClass {
  constructor() {
    this._prop1 = "value1";
    this._prop2 = "value2";
  }

  get prop1() {
    return this._prop1;
  }

  get prop2() {
    return this._prop2;
  }

  get getters() {
    return this.constructor.getters
  }

  static get getters() {
    return Object.keys(Object.getOwnPropertyDescriptors(this.prototype)).filter(
      (key) => {
        const descriptor = Object.getOwnPropertyDescriptor(this.prototype, key);
        return typeof descriptor.get === "function";
      },
    );
  }
}

const myInstance = new MyClass()

console.log(MyClass.getters) // Output: ['prop1', 'prop2']
console.log(myInstance.getters) // Output: ['prop1', 'prop2']
