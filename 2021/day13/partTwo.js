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

// console.log({paper});

instructions.forEach((instruction) => {
  let parts = instruction.split(' ')[2].split('=');
  let direction = parts[0];
  let place = parseInt(parts[1], 10);
  switch (direction) {
    case 'x' :
      // console.log({paper});
      paper.forEach((row) => {
        // console.log('before', place);
        // console.log({row});
        row.forEach((dot, index) => {
          // console.log({dot, index});
          if (dot > place) {
            // let newDot = 10 - dot;
            let newDot = place - Math.abs(place - dot);
            // console.log(dot, 'becomes', newDot);
            if (!row.includes(newDot)) {
              row[index] = newDot;
            } else {
              row[index] = -1;
            }
          }
        });
        while (row.indexOf(-1) >= 0) {
          row.splice(row.indexOf(-1),1);
        }
        // console.log('after');
        // console.log({row});
      });
      break;
    case 'y' :
      paper.splice(place,1);
      let bottom = paper.splice(place);
      bottom.forEach((dots, row) => {
        // console.log('before');
        // console.log({dots});
        dots.forEach((dot) => {
          if (!paper[(paper.length - 1) - row].includes(dot)) {
            paper[(paper.length - 1) - row].push(dot);
          }
        })
        // console.log('after');
        // console.log({dots});
      });
      break;
  }
});

let dotCount = 0;
let readout = '';
paper.forEach((row) => {
  row.sort((a,b) => {
    return (a > b) ? 1 : (b > a) ? -1 : 0;
  });
  for (let i = 0;i <= row[row.length - 1];i++) {
    if (row.includes(i)) {
      readout += '#';
    } else {
      readout += '.';
    }
  }
  readout += '\n';
});

console.log(readout);