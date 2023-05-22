class MyClass {
  myMethod() {
    // メソッドのロジック
    this.someFunction();
  }

  someFunction() {
    console.log("Hello, World!");
    // 切り出された関数のロジック
  }
}
const test = new MyClass();
test.myMethod();
