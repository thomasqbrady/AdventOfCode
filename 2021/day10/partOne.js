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
  ')': 3, 
  ']': 57, 
  '}': 1197, 
  '>': 25137
}

let lines = input.split('\n');

let score = 0;

lines.forEach((line, index) => {
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
        score += values[character];
        break;
      }
    }
  }
});

console.log({score});