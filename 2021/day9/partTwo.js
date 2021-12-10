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

let readings = input.split('\n');
let width = readings[0].length;
let height = readings.length;

let basinsByPosition = {};
let basinsByID = [];

function exploreBasin(checkPosition, basinID) {
  // console.log({checkPosition, basinID, basinsByPosition});
  if (!checkPosition.reading) {
    checkPosition.reading = parseInt(readings[checkPosition.y][checkPosition.x]);
  }
  let up, right, down, left;
  let x = checkPosition.x;
  let y = checkPosition.y;
  basinsByPosition[`${x}:${y}`] = basinID;
  basinsByID[basinID-1].push(`${x}:${y}`);
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
  // console.log(up, right, down, left);
  [up, right, down, left].forEach((position) => {
    if (position && position.reading !== 9 && !basinsByPosition[`${position.x}:${position.y}`]) {
      // console.log({position}, !basinsByPosition[`${position.x}:${position.y}`]);
      exploreBasin(position, basinID);
    }
  })
}
for (let row = 0;row < height;row++) {
  for (let col = 0;col < width;col++) {
    if (parseInt(readings[row][col], 10) !== 9 && !basinsByPosition[`${col}:${row}`]) {
      let newBasinID = Object.keys(basinsByID).length + 1;
      basinsByID.push([]);
      exploreBasin({reading: null, x: col, y: row}, newBasinID);
    }
  }
}

let total = 1;

let basinSizes = basinsByID.map((basin) => {
  return basin.length;
});

basinSizes.sort((a,b) => {
  return (a > b) ? 1 : (a < b) ? -1 : 0;
});

console.log(basinSizes);

for (let i = basinSizes.length - 1;i > basinSizes.length - 4;i--) {
  total *= basinSizes[i];
}

console.log(total);