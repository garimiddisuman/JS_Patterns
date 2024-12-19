const add = function (a, b) {
  return a + b;
};

const multiply = function (a, b) {
  return a * b;
};

const product = function (x) {
  return x.reduce(multiply, 1);
};

const sum = function (x) {
  return x.reduce(add, 0);
};

const power = function (base, exponent) {
  return Math.pow(base, exponent);
};

const exponent = function (x) {
  return power(x[0], x[1]);
};

const transpose = function (x) {
  const transposed = [];

  for (let index = 0; index < x[0].length; index++) {
    const array = [];
    for (const element of x) {
      array.push(element[index]);
    }

    transposed.push(array);
  }

  return transposed;
};

const map = function (operation, ...arrays) {
  const fliped = transpose(arrays);

  return fliped.map(operation);
};

console.log(map(sum, [1, 2, 3], [3, 4, 3]), "<-- Addition");
console.log(map(product, [1, 2], [3, 4]), "<-- multiply");
console.log(map(exponent, [1, 2], [3, 4]), "<-- Power");