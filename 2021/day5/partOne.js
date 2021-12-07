const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8');

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
    console.log('plotting', {x1,y1,x2,y2});
    //vertical line
    if (!map[x1]) {
      map[x1] = {};
    }
    let i = 0;
    while ((y2 > y1) ? (y1 + i <= y2) : (y1 + i >= y2) ) {
      console.log(i);
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
    if (!map[y1]) {
      map[y1] = {};
    }
    let i = 0;
    while ((x2 > x1) ? (x1 + i <= x2) : (x1 + i >= x2) ) {
      console.log(i);
      if (!map[y1][x1 + i]) {
        map[y1][x1 + i] = 0;
      }
      map[y1][x1 + i] += 1;
      if (x2 > x1) {
        i++;
      } else {
        i--;
      }
    }
  }
});
console.log({map});