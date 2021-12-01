const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let measurements = input.split('\n');

let increaseCount = 0;

console.log(measurements[0], measurements[measurements.length-1])

for (let i = 0;i < measurements.length - 1;i++) {
// for (let i = 0;i < 10;i++) {
  // console.log(measurements[i], measurements[i+1], measurements[i + 1] > measurements[i])
  if (parseInt(measurements[i + 1], 10) > parseInt(measurements[i], 10)) {
    increaseCount++;
    // console.log('increase', increaseCount);
  }
}

console.log(increaseCount);