const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8');

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');


function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

let readings = input.split('\n');
for (let row = 0;row < readings.length;row++) {
  for (let col = 0;col < readings[row].length;col++) {
    let reading = readings[row][col];
    console.log({reading});
  }
};