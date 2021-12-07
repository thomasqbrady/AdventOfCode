const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let fishList = input.split(',');
let numberOfDays = 80;

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

for (let i = 0;i < numberOfDays;i++) {
  let newFish = 0;
  fishList.forEach((fish, index) => {
    let currentTime = parseInt(fish, 10);
    if (currentTime == 0) {
      newFish++;
      fishList[index] = 6;
    } else {
      fishList[index] = currentTime - 1;
    }
  });
  for (let j = 0;j < newFish;j++) {
    fishList.push(8);
  }
  console.log(i, fishList.length);
}

