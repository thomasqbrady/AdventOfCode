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

let mazeRows = input.split('\n');

let inProgress = {
  '0:0': 0
};
let finished = [];

while (Object.keys(inProgress).length > 0) {
  for (let position in inProgress) {
    let { x, y } = position.split(':');
    let risk = inProgress[position];
    if (x > 0) {
      inProgress[`${x - 1}:${y}`] = risk + 
    }
  }
}

// I GAVE UP