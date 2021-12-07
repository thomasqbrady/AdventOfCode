const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let fishList = input.split(',');
let fishMap = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0
}
let numberOfDays = 256;

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

function makeMap(list) {
  list.forEach((fishTimer) => {
    fishMap[fishTimer] += 1;
  })
}

function ellapseTime(days) {
  for (let i = 0;i < days;i++) {
    let newFishMap = {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0
    }
    let newFishToAdd = 0;
    for (let j = 0;j < 9;j++) {
      switch (j) {
        case 0:
          newFishMap[6] += parseInt(fishMap[0], 10);
          newFishToAdd = parseInt(fishMap[0], 10);
          break;
        default :
          newFishMap[j - 1] += parseInt(fishMap[j], 10);
          break;
      }
    }
    newFishMap[8] += newFishToAdd;
    console.log('before', {fishMap, newFishMap});
    fishMap = Object.assign({},newFishMap);
    console.log(i, fishMap);
  }
}

function countFish(fishMap) {
  let total = 0;
  for (let count in fishMap) {
    total += parseInt(fishMap[count], 10);
  }
  console.log(total, 'fish');
}

makeMap(fishList);
ellapseTime(256);
countFish(fishMap);

console.log(fishMap)