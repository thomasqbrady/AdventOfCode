const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let crabPositions = input.split(',');

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

function makeFrequencyMap(array) {
  let map = {};
  array.forEach((element) => {
    if (!map[element]) {
      map[element] = 0;
    }
    map[element] += 1;
  });
  return map;
}

function getModes(map) {
  let modes = [{
    element: null,
    count: 0
  }];
  for (let element in map) {
    let mode;
    if (modes.length > 0) {
      mode = modes[0];
    }
    if (map[element] > mode.count) {
      modes = [
        {
          element: element,
          count: map[element]
        }
      ];
    }
    if (map[element] === mode.count) {
      modes.push({
        element: element,
        count: map[element]
      })
    }
  }
  return modes;
}

function getMedian(map) {
  let keyStrings = Object.keys(map);
  let elements = keyStrings.map((element) => {
    return parseInt(element, 10);
  });
  elements.sort((a,b) => {
    return a - b;
  });
  let middleIndex = Math.round(elements.length/2) - 1;
  // console.log(elements, middleIndex);
  if (elements.length % 2 === 0) {
    // console.log('even number', elements[middleIndex], elements[middleIndex+1]);
    return Math.round((elements[middleIndex] + elements[middleIndex+1])/2);
  } else {
    // console.log('odd number', elements[middleIndex]);
    return elements[middleIndex];
  }
}

function getMean(crabPositions) {
  let total = crabPositions.reduce((accum, curr) => {
    return parseInt(accum, 10) + parseInt(curr, 10);
  });
  let mean = Math.round(total / crabPositions.length);
  console.log({total, mean});
  return mean;
}

let map = makeFrequencyMap(crabPositions);
let modes = getModes(map);
let median = getMedian(map);
let mean = getMean(crabPositions);
console.log({median, modes});

let minFuelUsed = 9999999999999;
crabPositions.forEach((position) => {
  let totalFuelUsed = 0;
  crabPositions.forEach((otherPosition) => {
    let fuelUsed = Math.abs(position - otherPosition);
    totalFuelUsed += fuelUsed;
  });
  minFuelUsed = Math.min(minFuelUsed, totalFuelUsed);
});

console.log({minFuelUsed});