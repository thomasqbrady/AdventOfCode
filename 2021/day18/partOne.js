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

let numbers = input.split('\n');

console.log(numbers);

function explodePass(number) {
  let nestLevel = 0;
  for (let i = 0;i < number.length;i++) {
    if (number[i] === '[') {
      nestLevel += 1;
      if (nestLevel === 5) {
        console.log(number[i + 1]);
      }
    }
    if (number[i] === ']') {
      nestLevel -= 1;
    }
  }
}

numbers.forEach((number) => {
  explodePass(number);
})