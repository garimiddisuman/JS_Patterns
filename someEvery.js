const isOdd = function (element) {
  return element & 1 === 1;
}

const isGreaterThan100 = function (number) {
  return number > 100;
}

const isNegative = function (number) {
  return number < 0;
}

const isLengthLessThan3 = function (string) {
  return string.length < 3;
}

const some = function (predicate, array) {
  for (const elements of array) {
    if (predicate(elements)) {
      return true;
    }
  }

  return false;
}

const every = function (predicate, array) {
  for (const elements of array) {
    if (predicate(elements)) {
      return false;
    }
  }

  return true;
}

const isGreaterThan100Present = function (array) {
  return some(isGreaterThan100, array);
}

const isOddPresent = function (array) {
  return some(isOdd, array);
}

const isAllPositives = function (array) {
  return every(isNegative, array);
}

const areAllStrsGreaterThan3 = function (array) {
  return every(isLengthLessThan3, array);
}

//------------- Testing ----------------
const display = function (content) {
  console.table([content]);
}

const testAll = function () {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [-2, 4, 6, 800];
  const string = ['suman', 'suman'];
  const string1 = ['suman', 'a'];

  const tests = [
    ['is atleat one Grater Than 100', array1, isGreaterThan100Present(array1)],
    ['is atleat one Grater Than 100', array2, isGreaterThan100Present(array2)],
    ['is Odd Present', array1, isOddPresent(array1)],
    ['is Odd Present', array2, isOddPresent(array2)],
    ['is it contain all positives', array1, isAllPositives(array1)],
    ['is it contain all positives', array2, isAllPositives(array2)],
    ['are All strings greater than 3 chars', string, areAllStrsGreaterThan3(string)],
    ['are All strings greater than 3 chars', string1, areAllStrsGreaterThan3(string1)],
  ];

  for (const test of tests) {
    display(test);
  }
}

testAll();