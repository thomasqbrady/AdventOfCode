const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

/*

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

*/

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

let signals = input.split('\n');

let count = 0;
signals.forEach((signal) => {
  let parts = signal.split('|');
  let signalPattern = parts[0];
  let outputValue = parts[1];
  let digits = outputValue.split(' ');
  digits.forEach((digit) => {
    switch(digit.length) {
      case 2 :
        console.log(`${digit} is 1`);
        count++;
        break;
      case 3 :
        console.log(`${digit} is 7`);
        count++;
        break;
      case 4 :
        console.log(`${digit} is 4`);
        count++;
        break;
      case 7 :
        console.log(`${digit} is 8`);
        count++;
        break;
    }
  });
});
console.log({count});
