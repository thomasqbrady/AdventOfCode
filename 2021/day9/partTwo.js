const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8');

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');


function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

let readings = input.split('\n');
let width = readings[0].length;
let height = readings.length;

let basins = {}

function exploreBasin(checkPosition, basin) {
  console.log('checking',checkPosition.x,checkPosition.y);
  if (!checkPosition.reading) {
    checkPosition.reading = parseInt(readings[checkPosition.y][checkPosition.x]);
  }
  let up, right, down, left;
  let x = checkPosition.x;
  let y = checkPosition.y;
  basin[`${x}:${y}`] = true;
  if (y > 0) {
    up = {
      reading: parseInt(readings[y - 1][x], 10),
      x: x,
      y: y - 1
    };
  }
  if (x < width - 1) {
    right = {
      reading: parseInt(readings[y][x + 1], 10),
      x: x + 1,
      y: y
    };
  }
  if (y < height - 1) {
    down = {
      reading: parseInt(readings[y + 1][x], 10),
      x: x,
      y: y + 1
    };
  }
  if (x > 0) {
    left = {
      reading: parseInt(readings[y][x - 1], 10),
      x: x - 1,
      y: y
    };
  }
  console.log(up, right, down, left);
  [up, right, down, left].forEach((position) => {
    if (position && position.reading !== 9 && !basin[`${position.x}:${position.y}`]) {
      exploreBasin(position);
    }
  })
}
for (let row = 0;row < 1;row++) {
  for (let col = 0;col < width;col++) {
    if (parseInt(readings[row][col], 10) !== 9) {
      let newBasinID = Object.keys(basins).length;
      basins[newBasinID] = {};
      exploreBasin
    }
  }
}