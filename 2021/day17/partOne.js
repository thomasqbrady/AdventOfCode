const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

let [ useless, coordinateRanges ] = input.split(':');
let [ xRanges, yRanges ] = coordinateRanges.trim().split(',');

let [ xMin, xMax ] = xRanges.split('=')[1].trim().split('..').map((num) => {
  return parseInt(num, 10);
}).sort((a, b) => {
  return (a > b) ? 1 : (a < b) ? -1 : 0;
});
let [ yMin, yMax ] = yRanges.split('=')[1].trim().split('..').map((num) => {
  return parseInt(num, 10);
}).sort((a, b) => {
  return (a > b) ? 1 : (a < b) ? -1 : 0;
});

function tick(x, y, rise, run, highest = 0) {
  // console.log({x, y, rise, run});
  x += run;
  y += rise;
  if (y > highest) {
    highest = y;
  }
  if (run > 0) {
    run -= 1;
  }
  if (run < 0) {
    run += 1;
  }
  rise -= 1;
  if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
    return { highest };
  }
  if (x > xMax || y < yMin) {
    return false;
  }
  return tick(x, y, rise, run, highest);
}

let record = 0;
for (let run = 0;run < xMax;run++) {
  for (let rise = yMin;rise < 2000;rise++) {
    let { highest } = tick(0, 0, rise, run);
    if (highest > record) {
      record = highest;
    }
  }
}
console.log({record});