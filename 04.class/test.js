class Animal {
  setType(type) {
    this.type = type;
  }
  getType() {
    return this.type;
  }
}

var o1 = new Animal();
o1.setType("Cat");
console.log(o1.getType());
