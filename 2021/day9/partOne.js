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
let lowPoints = [];
for (let row = 0;row < height;row++) {
  for (let col = 0;col < width;col++) {
    let reading = parseInt(readings[row][col], 10);
    let up = 10, right = 10, down = 10, left = 10;
    if (row > 0) {
      up = parseInt(readings[row - 1][col], 10);
    }
    if (col < width - 1) {
      right = parseInt(readings[row][col + 1], 10);
    }
    if (row < height - 1) {
      down = parseInt(readings[row + 1][col], 10);
    }
    if (col > 0) {
      left = parseInt(readings[row][col - 1], 10);
    }
    let lowest = true;
    [up, right, down, left].forEach((neighbor) => {
      if (reading >= neighbor) {
        lowest = false;
      }
    });
    if (lowest) {
      lowPoints.push(reading + 1);
    }
  }
};

console.log(lowPoints, lowPoints.reduce((accum, reading) => {
  return accum + reading
}));