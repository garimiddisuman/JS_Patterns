const halfValue = function (number) {
  return number / 2;
}

const upperCase = function (string) {
  return string.toUpperCase(string);
}

const isOdd = function (element) {
  return element & 1 === 1;
}

const isMoreThan5Chars = function (element) {
  return element.length > 5;
}

const longest = function (longestString, string) {
  return longestString.length < string.length ? string : longestString;
}

const combine = function (string, slice) {
  return string + slice;
}

const multiply = function (value1, value2) {
  return value1 * value2;
}

const oddNumbersCount = function (count, number) {
  return isOdd(number) ? count + 1 : count;
}

/*------------------ Main Functions -------------------------*/
// square root, Half Value, Upper Case....
const Map = function (elements, opcode) {
  return elements.map(opcode);  // -->  mapping application..
  // const array = [];

  // for (const element of elements) {
  //   array.push(opcode(element));
  // }

  // return array;
}

// Odd Numbers, More Than 5 chars...
const filter = function (elements, opcode) {
  return elements.filter(opcode);  // --> filter application..
  // const array = []; 

  // for (const element of elements) {
  //   if (opcode(element))
  //     array.push(element);
  // }

  // return array;
}

// reduce .....
// concat strings, longest string, product of Numbers, Odd numbers count..
const reduce = function (strings, operation, result) {
  return strings.reduce(operation, result); // reduce application..
  // let final = result;

  // for (const element of strings) {
  //   final = operation(final, element);
  // }

  // return final;
}

// product of Numbers...
const product = function (array) {
  return reduce(array, multiply, 1);
}

// combined All strings, longest string.....
const getString = function (strings) {
  return reduce(strings, combine, '');
}

// Odd numbers count..
const getOddNumbersCount = function (numbers,) {
  return reduce(numbers, oddNumbersCount, 0);
}

/*------------------ Testing Section -------------------------*/
const display = function (content) {
  console.table(content);
}

const testAll = function () {
  const strings = ['aaaaaa', 'b', 'c', 'ddddddddd'];
  const array = [1, 4, 25, 9, 36];
  const array1 = [1, 2, 3, 4, 5];

  const tests = [
    ["upper case", strings, Map(strings, upperCase)],
    ["more than 5 Chars", strings, filter(strings, isMoreThan5Chars)],
    ["Longest string", strings, getString(strings, longest)],
    ["combine", strings, getString(strings)],
    ["Half values", array, Map(array, halfValue)],
    ["square root", array, Map(array, Math.sqrt)],
    ["Odd numbers", array, filter(array, isOdd)],
    ["Product of Numbers", array1, product(array1)],
    ["no Of odds", array1, getOddNumbersCount(array1)],
  ];

  display(tests);
}

testAll();