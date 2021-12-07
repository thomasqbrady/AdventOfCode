const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let inputCoordinatePairs = input.split('\n');

let map = {}

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

inputCoordinatePairs.forEach((coordinatePairs) => {
  let pairs = coordinatePairs.split('->');
  let firstPair = pairs[0].trim().split(',');
  let secondPair = pairs[1].trim().split(',');
  let x1 = parseInt(firstPair[0], 10);
  let y1 = parseInt(firstPair[1], 10);
  let x2 = parseInt(secondPair[0], 10);
  let y2 = parseInt(secondPair[1], 10);

  if (x1 === x2) {
    //vertical line
    if (!map[x1]) {
      map[x1] = {};
    }
    let i = 0;
    while ((y2 > y1) ? (y1 + i <= y2) : (y1 + i >= y2) ) {
      if (!map[x1][y1 + i]) {
        map[x1][y1 + i] = 0;
      }
      map[x1][y1 + i] += 1;
      if (y2 > y1) {
        i++;
      } else {
        i--;
      }
    }
  }
  if (y1 === y2) {
    //horizontal line
    let i = 0;
    while ((x2 > x1) ? (x1 + i <= x2) : (x1 + i >= x2) ) {
      if (!map[x1 + i]) {
        map[x1 + i] = {};
      }
      if (!map[x1 + i][y1]) {
        map[x1 + i][y1] = 0;
      }
      map[x1 + i][y1] += 1;
      if (x2 > x1) {
        i++;
      } else {
        i--;
      }
    }
  }
});
console.log({map});
let scaryCount = 0;
for (let col in map) {
  let column = map[col];
  for (let row in column) {
    if (column[row] >= 2) {
      scaryCount++;
    }
  }
}
console.log(scaryCount);
