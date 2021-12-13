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

let sections = input.split('\n\n');
let lines = sections[0].split('\n');
let instructions = sections[1].split('\n');

let paper = [];

lines.forEach((line) => {
  let coordinates = line.split(',');
  for (let i = paper.length;i <= coordinates[1];i++) {
    paper.push([]);
  }
  paper[coordinates[1]].push(parseInt(coordinates[0], 10));
});

console.log({paper});

let instructionCount = 1;

instructions.forEach((instruction, instructionIndex) => {
  if (instructionIndex >= instructionCount) {
    return
  }
  let parts = instruction.split(' ')[2].split('=');
  let direction = parts[0];
  let place = parts[1];
  switch (direction) {
    case 'x' :
      // console.log({paper});
      paper.forEach((row) => {
        row.forEach((dot, index) => {
          if (dot > place) {
            let newDot = 10 - dot;
            if (!row.includes(newDot)) {
              row[index] = newDot;
            } else {
              row.splice(index, 1);
            }
          }
        });
      });
      break;
    case 'y' :
      paper.splice(place,1);
      let bottom = paper.splice(place).reverse();
      bottom.forEach((dots, row) => {
        dots.forEach((dot) => {
          if (!paper[row].includes(dot)) {
            paper[row].push(dot);
          }
        })
      });
      break;
  }
});

let dotCount = 0;
paper.forEach((row) => {
  dotCount += row.length;
});
console.log({dotCount})