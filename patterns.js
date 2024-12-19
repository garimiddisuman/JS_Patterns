const STAR = "*";
const SPACE = " ";
const HYPHEN = "-";
const NEW_LINE = "\n";

/*------------------------ Combine Patterns ------------------------*/
function combinePatterns(array1, array2, width) {
  const combined = [];

  for (let i = 0; i < array1.length; i++) {
    array1[i] = array1[i].padEnd(width);
    const line = array1[i] + SPACE + array2[i];
    combined.push(line);
  }

  return combined.join(NEW_LINE);
}

/*------------------------ Hollow Diamond -------------------------*/
function hollowDiamond(height) {
  const diamondPattern = [STAR + SPACE.repeat(height - 2) + STAR];
  let rowLength = height - 1;

  for (let row = height - 2; row > 1; row -= 2) {
    const hollow = STAR + SPACE.repeat(row - 2) + STAR;
    diamondPattern.push(hollow.padStart(rowLength));
    diamondPattern.unshift(hollow.padStart(rowLength));
    rowLength -= 1;
  }

  diamondPattern.push(STAR.padStart(rowLength));
  diamondPattern.unshift(STAR.padStart(rowLength));
  return diamondPattern.join(NEW_LINE);
}

/*---------------------------- Diamond ----------------------------*/
function diamond(height) {
  const diamondPattern = [STAR.repeat(height)];
  let rowLength = height - 1;

  for (let row = height - 2; row > 0; row -= 2) {
    const stars = STAR.repeat(row);
    diamondPattern.push(stars.padStart(rowLength));
    diamondPattern.unshift(stars.padStart(rowLength));
    rowLength -= 1;
  }

  return diamondPattern.join(NEW_LINE);
}

/*------------------ To Get nearest odd value --------------------*/
function getOdd(number) {
  return [number - 1, number][number % 2];
}

/*----------------------- To Create Diamonds -----------------------*/
function createDiamonds(height, isDiamond) {
  const size = getOdd(height);

  if (size < 2) {
    return STAR;
  }

  return isDiamond ? diamond(size) : hollowDiamond(size);
}

/*---------------------------- Triangle ----------------------------*/
function triangle(height, width) {
  const triangle = [];

  for (let row = 1; row <= height; row++) {
    const string = STAR.repeat(row);
    triangle.push(string.padStart(width));
  }

  return triangle.join(NEW_LINE);
}

/*---------------------------- Rectangle ----------------------------*/
function rectangle(columns, rows, symbols) {
  const rectangle = [];

  for (let i = 1; i <= rows; i++) {
    const char = symbols[i % symbols.length];
    rectangle.push(char.repeat(columns));
  }

  return rectangle.join(NEW_LINE);
}

/*------------------------- Hollow Rectangle --------------------------*/
function hollowRectangle(columns, rows) {
  const border = STAR.repeat(columns);
  const line = [];

  if (columns < 3 || rows < 3) {
    return rectangle(columns, rows, STAR);
  }

  const spaces = SPACE.repeat(columns - 2);

  for (let i = 0; i < rows - 2; i++) {
    line.push(STAR + spaces + STAR);
  }

  line.push(border);
  line.unshift(border);
  return line.join(NEW_LINE);
}

function getIndex(style) {
  const patterns = [
    'filled-rectangle', 'hollow-rectangle', 'alternating-rectangle',
    'triangle', 'right-aligned-triangle', 'spaced-alternating-rectangle',
    'diamond', 'hollow-diamond'
  ];

  return patterns.indexOf(style);
}

function createPattern(columns, rows, style) {
  switch (getIndex(style)) {
    case 0: return rectangle(columns, rows, [STAR]);
    case 1: return hollowRectangle(columns, rows);
    case 2: return rectangle(columns, rows, [HYPHEN, STAR]);
    case 3: return triangle(columns, 0);
    case 4: return triangle(columns, columns);
    case 5: return rectangle(columns, rows, [SPACE, STAR, HYPHEN]);
    case 6: return createDiamonds(columns, true);
    case 7: return createDiamonds(columns, false);
  }
}

function generateCombinePatterns(columns, rows, style1, style2) {
  const array1 = createPattern(columns, rows, style1).split(NEW_LINE);
  const array2 = createPattern(columns, rows, style2).split(NEW_LINE);
  const width = isDiamond(style1) ? getOdd(columns) : columns;

  return combinePatterns(array1, array2, width);
}

function isDiamond(style) {
  return style.endsWith('diamond');
}

function generatePattern(style1, dimensions, style2) {
  const [columns, rows] = dimensions;

  if (columns === 0 || rows === 0) {
    return "";
  }

  if (style2) {
    return generateCombinePatterns(columns, rows, style1, style2);
  }

  return createPattern(columns, rows, style1);
}

/*---------------------- TESTING SECTION -------------------------------*/
function testGeneratePattern(style1, dimensions, expected, failed, style2) {
  const actual = generatePattern(style1, dimensions, style2);

  if (actual !== expected) {
    failed.push([style1, style2, dimensions, actual, expected]);
  }
}

function testFilledRectangle(failed) {
  testGeneratePattern('filled-rectangle', [0, 0], '', failed);
  testGeneratePattern('filled-rectangle', [1, 0], '', failed);
  testGeneratePattern('filled-rectangle', [1, 1], '*', failed);
  testGeneratePattern('filled-rectangle', [1, 1], '*', failed);
  testGeneratePattern('filled-rectangle', [0, 5], '', failed);
  testGeneratePattern('filled-rectangle', [7, 0], '', failed);
  const expected1 = '*****\n*****\n*****';
  testGeneratePattern('filled-rectangle', [5, 3], expected1, failed);
  testGeneratePattern('filled-rectangle', [2, 4], '**\n**\n**\n**', failed);
  const expected2 = '*****\n*****\n*****';
  testGeneratePattern('filled-rectangle', [5, 3], expected2, failed);
  testGeneratePattern('filled-rectangle', [2, 4], '**\n**\n**\n**', failed);
}

function testHollowRectangle(failed) {
  testGeneratePattern('hollow-rectangle', [0, 0], '', failed);
  testGeneratePattern('hollow-rectangle', [1, 0], '', failed);
  testGeneratePattern('hollow-rectangle', [1, 1], '*', failed);
  testGeneratePattern('hollow-rectangle', [0, 5], '', failed);
  testGeneratePattern('hollow-rectangle', [7, 0], '', failed);
  testGeneratePattern('hollow-rectangle', [4, 3], '****\n*  *\n****', failed);
  const expected1 = '*****\n*   *\n*   *\n*****';
  testGeneratePattern('hollow-rectangle', [5, 4], expected1, failed);
  testGeneratePattern('hollow-rectangle', [6, 2], '******\n******', failed);
  testGeneratePattern('hollow-rectangle', [5, 1], '*****', failed);
  testGeneratePattern('hollow-rectangle', [1, 5], '*\n*\n*\n*\n*', failed);
}

function testAlternatingRectangle(failed) {
  const expected1 = '***\n---\n***';
  testGeneratePattern("alternating-rectangle", [3, 3], expected1, failed);
  const expected2 = '*****\n-----\n*****\n-----';
  testGeneratePattern("alternating-rectangle", [5, 4], expected2, failed);
  const expected3 = '******\n------';
  testGeneratePattern('alternating-rectangle', [6, 2], expected3, failed);
  testGeneratePattern('alternating-rectangle', [4, 1], '****', failed);
  testGeneratePattern('alternating-rectangle', [0, 5], '', failed);
  testGeneratePattern('alternating-rectangle', [7, 0], '', failed);
}

function testTriangle(failed) {
  testGeneratePattern("triangle", [0], '', failed);
  testGeneratePattern("triangle", [1], '*', failed);
  testGeneratePattern("triangle", [2], '*\n**', failed);
  testGeneratePattern("triangle", [3], '*\n**\n***', failed);
  testGeneratePattern("triangle", [5], '*\n**\n***\n****\n*****', failed);
}

function testRightAlignedTriangle(failed) {
  testGeneratePattern("right-aligned-triangle", [0], '', failed);
  testGeneratePattern("right-aligned-triangle", [1], '*', failed);
  testGeneratePattern("right-aligned-triangle", [2], ' *\n**', failed);
  testGeneratePattern("right-aligned-triangle", [3], '  *\n **\n***', failed);
  const expected = '   *\n  **\n ***\n****';
  testGeneratePattern("right-aligned-triangle", [4], expected, failed);
}

function testSpacedAlternatingRectangle(failed) {
  testGeneratePattern("spaced-alternating-rectangle", [0, 0], '', failed);
  testGeneratePattern("spaced-alternating-rectangle", [1, 0], '', failed);
  const expect1 = '***\n---\n   \n***';
  testGeneratePattern("spaced-alternating-rectangle", [3, 4], expect1, failed);
  const expect2 = '*****\n-----\n     \n*****\n-----\n     ';
  testGeneratePattern("spaced-alternating-rectangle", [5, 6], expect2, failed);
  const expect3 = '****\n----\n    ';
  testGeneratePattern("spaced-alternating-rectangle", [4, 3], expect3, failed);
  const expect4 = '******\n------';
  testGeneratePattern("spaced-alternating-rectangle", [6, 2], expect4, failed);
}

function testDiamond(failed) {
  testGeneratePattern("diamond", [0], '', failed);
  testGeneratePattern("diamond", [1], '*', failed);
  testGeneratePattern("diamond", [2], '*', failed);
  testGeneratePattern("diamond", [3], ' *\n***\n *', failed);
  testGeneratePattern("diamond", [4], ' *\n***\n *', failed);
  testGeneratePattern("diamond", [5], '  *\n ***\n*****\n ***\n  *', failed);
}

function testHollowDiamond(failed) {
  testGeneratePattern('hollow-diamond', [0], "", failed);
  testGeneratePattern('hollow-diamond', [1], "*", failed);
  testGeneratePattern('hollow-diamond', [2], "*", failed);
  testGeneratePattern('hollow-diamond', [3], " *\n* *\n *", failed);
  testGeneratePattern('hollow-diamond', [4], " *\n* *\n *", failed);
  const expect1 = "  *\n * *\n*   *\n * *\n  *";
  testGeneratePattern('hollow-diamond', [5], expect1, failed);
  testGeneratePattern('hollow-diamond', [6], expect1, failed);
  const expect2 = "   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *";
  testGeneratePattern('hollow-diamond', [7], expect2, failed);
}

function testGenerateWithSecondPattern() {

}

function testWithSecondPattern(failed) {
  testGeneratePattern('filled-rectangle', [3, 3], '*** ***\n*** * *\n*** ***',
    failed, 'hollow-rectangle');
  testGeneratePattern('alternating-rectangle', [4, 3],
    '**** ****\n---- ----\n****     ', failed, 'spaced-alternating-rectangle');
  testGeneratePattern('alternating-rectangle', [4, 3],
    '**** ****\n---- ----\n****     ', failed, 'spaced-alternating-rectangle');

  const expected = '  *     *\n ***   * *\n***** *   *\n ***   * *\n  *     *';
  testGeneratePattern('diamond', [5], expected, failed, 'hollow-diamond');
  testGeneratePattern('diamond', [2], '* *', failed, 'diamond');
}

function disPlayFailingCases(failed) {
  if (failed.length === 0) {
    console.log(NEW_LINE, ' ---* "ALL TEST CASES PASSED" *---');
    console.log(SPACE.repeat(6), HYPHEN.repeat(22), NEW_LINE);
    return;
  }

  console.table(failed);
}

function testAll() {
  const failed = [];

  testFilledRectangle(failed);
  testHollowRectangle(failed);
  testAlternatingRectangle(failed);
  testTriangle(failed);
  testRightAlignedTriangle(failed);
  testSpacedAlternatingRectangle(failed);
  testDiamond(failed);
  testHollowDiamond(failed);
  testWithSecondPattern(failed);

  disPlayFailingCases(failed);
}

testAll();