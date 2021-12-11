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


let lines = input.split('\n');

let octopi = [];

function log() {
  console.log('--------------------');
  // octopi.forEach((row) => {
  //   console.log(row.join(' '));
  // })
  console.log(octopi.map((row) => row.join('  ').replace(/(\d\d)  /g, '$1 ')).join('\n'));
}

lines.forEach((line) => {
  let row = [];
  line.split('').forEach((col) => {
    row.push(parseInt(col, 10));
  });
  octopi.push(row);
})

let flashes = 0;

function flash(row, col) {
  console.log('flash', row, col);
  flashes++;
  octopi[row][col] += 1;
  for (let i = -1;i < 2;i++) {
    let checkRow = row + i;
    for (let j = -1;j < 2;j++) {
      let checkCol = col + j;
      if (checkRow >= 0 && checkRow < octopi.length) {
        if (checkCol >= 0 && checkCol < octopi[row].length) {
          if (!(checkRow === row && checkCol === col)) {
            let foundOne = octopi[checkRow][checkCol] === 10;
            octopi[checkRow][checkCol] += 1;
            if (foundOne) {
              flash(checkRow, checkCol);
            }
          }
        }
      }
    }
  }
  log();
}

function getCheck() {
  return octopi.map((row) => row.join(' ')).join(' ');
}

for (let step = 0;step < 100;step++) {
  console.log({step});
  log();
  octopi.forEach((cols, row) => {
    for (let col = 0;col < cols.length;col++) {
      octopi[row][col] += 1;
    }
  });
  console.log('after + 1');
  log();

  let test = getCheck();
  while (test.includes('10')) {
    octopi.forEach((cols, row) => {
      for (let col = 0;col < cols.length;col++) {
       if (octopi[row][col] === 10) {
          // console.log('f',octopi[row][col]);
          flash(row, col);
        }
      }
    });
    log();
    test = getCheck();
  }
  console.log('after flashing');
  log();
  octopi.forEach((cols, row) => {
    for (let col = 0;col < cols.length;col++) {
      if (octopi[row][col] > 9) {
        octopi[row][col] = 0;
      }
    }
  });
  console.log('after resetting');
  log();
}
console.log({flashes});