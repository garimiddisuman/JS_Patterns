const FORWARD = '\\';
const BACKWARD = '/';
const STAR = "*";
const NEW_LINE = '\n';
const SPACE = ' ';
const LESS_THAN = '≺';
const GREATER_THAN = '≻';
const UP = 'ᐱ';
const DOWN = 'ᐯ';

function hollowDiamond(height) {
  const diamondPattern = [LESS_THAN + SPACE.repeat(height - 2) + GREATER_THAN];
  let rowLength = height - 1;

  for (let row = height - 2; row > 1; row -= 2) {
    const lower = FORWARD + SPACE.repeat(row - 2) + BACKWARD;
    diamondPattern.push(lower.padStart(rowLength));
    const upper = BACKWARD + SPACE.repeat(row - 2) + FORWARD;
    diamondPattern.unshift(upper.padStart(rowLength));
    rowLength -= 1;
  }

  diamondPattern.push(DOWN.padStart(rowLength));
  diamondPattern.unshift(UP.padStart(rowLength));
  return diamondPattern.join(NEW_LINE);
}

const hollow = function (number) {
  const size = [number - 1, number][number % 2];

  if (size < 2) {
    return STAR;
  }

  return hollowDiamond(size);
}

console.log(hollow(15));