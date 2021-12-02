const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./test.txt', 'utf8');

let measurements = input.split('\n');

let increaseCount = 0;
let width = 3;

let lastSum = 0;

for (let i = 0; i < width; i++) {
  lastSum += parseInt(measurements[i], 10);
}

for (let i = width;i < measurements.length;i++) {
  let newSum = lastSum - parseInt(measurements[i - width], 10) + parseInt(measurements[i]);
  console.log(lastSum, newSum);
  if (newSum > lastSum) {
    increaseCount++;
  }
  lastSum = newSum;
}

console.log(increaseCount);