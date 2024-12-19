const fixedWidth = function (c, r) {
  return Array(r).fill(c);
}

const varyingWidth = function (x) {
  return Array.from({ length: x }, function (_, i) { return i + 1; });
}

const row = function (times) {
  return '*'.repeat(times);
}

const hollowrow = function (times) {
  return '*' + ' '.repeat(times - 2) + '*';
}

const hollowDimensions = function (array) {
  const sliced = [array.at(0)].concat([array.slice(1, -1)]).concat(array.at(-1));
  return sliced;
}

const rectangle = function (c, r) {
  const width = fixedWidth(c, r);
  const rows = width.map(row);

  return rows.join('\n');
}

const triangle = function (height) {
  const width = varyingWidth(height);
  const rows = width.map(row);

  return rows.join('\n');
}

const fill = function (array) {
  return [row(array[0]), (array[1].map(hollowrow)).join("\n"), row(array[2])];
}

const hollowRectangle = function (c, r) {
  const width = fixedWidth(c, r);
  const dimensions = hollowDimensions(width);
  const rows = fill(dimensions);

  return rows.join('\n');
}

const hollowTriangle = function (height) {
  const width = varyingWidth(height);
  const dimensions = hollowDimensions(width)
  const rows = fill(dimensions);

  return rows.join('\n');
}

console.log(rectangle(6, 2));
console.log(triangle(6));
console.log(hollowRectangle(5, 5));
console.log(hollowTriangle(5));