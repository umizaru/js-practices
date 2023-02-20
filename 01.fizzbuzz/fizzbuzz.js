let numbers = [];
for (let i = 1; i <= 20; i++) {
  numbers.push(i);
}
numbers.forEach((number) => {
  if (number % 15 == 0) {
    console.log("FizzBuzz");
  } else if (number % 5 == 0) {
    console.log("Buzz");
  } else if (number % 3 == 0) {
    console.log("Fizz");
  } else {
    console.log(number);
  }
});
