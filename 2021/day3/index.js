const fs = require('fs');
const { posix } = require('path/posix');
const input = fs.readFileSync('./input.txt', 'utf8');

let logs = input.split('\n');

let bitMatrixOn = [];
let bitMatrixOff = [];

for (let i = 0;i < logs[0].length;i++) {
  bitMatrixOn.push([]);
  bitMatrixOff.push([]);
}

// console.log(bitMatrixOn, bitMatrixOff);

logs.forEach((log) => {
  log.split('').forEach((bit, index) => {
    if (bit === '0') {
      bitMatrixOff[index].push(bit);
    } else {
      bitMatrixOn[index].push(bit);
    }
  });
});

// console.log(bitMatrixOn, bitMatrixOff);

function getReadings(onArray, offArray, high) {
  // console.log({onArray, offArray});
  if (onArray.length == 0) {
    return '';
  }
  let bit = '';
  let onCount = onArray.shift().length;
  let offCount = offArray.shift().length;
  if (high) {
    if (onCount > offCount) {
      bit ='1';
    } else {
      bit = '0'
    }
  } else {
    if (onCount > offCount) {
      bit = '0';
    } else {
      bit = '1';
    }
  }

  return bit + getReadings(onArray, offArray, high)
}

let gamma = parseInt(getReadings([...bitMatrixOn], [...bitMatrixOff], true), 2);
let epsilon = parseInt(getReadings([...bitMatrixOn], [...bitMatrixOff]), 2);
let powerUsage = gamma * epsilon;
console.log({gamma, epsilon, powerUsage});