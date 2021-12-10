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

let openers = ['(', '[', '{', '<'];
let closers = [')', ']', '}', '>'];
let values = {
  ')': 1, 
  ']': 2, 
  '}': 3, 
  '>': 4
}
let repairedLines = [];
let lines = input.split('\n');

let scores = [];

lines.forEach((line, index) => {
  let lineScore = 0;
  console.log({line, index});
  let nests = [];
  for (let i = 0;i < line.length;i++) {
    let character = line[i];
    if (openers.includes(character)) {
      nests.push(character);
    }
    if (closers.includes(character)) {
      let index = closers.indexOf(character);
      let opener = openers[index];
      if (nests[nests.length-1] === opener) {
        nests.pop();
      } else {
        console.log(`Unexpected ${character}`);
        return;
      }
    }
  }
  for (let i = nests.length - 1;i >= 0;i--) {
    let index = openers.indexOf(nests[i]);
    let closer = closers[index];
    lineScore *= 5;
    lineScore += values[closer];
    line += closer;
  }
  console.log('repaired for point value of', lineScore);
  repairedLines.push(line);
  scores.push(lineScore);
});

scores.sort((a, b) => {
  return a > b ? 1 : a < b ? -1 : 0;
})
console.log(scores[Math.floor(scores.length/2)]);