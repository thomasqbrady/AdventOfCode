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

let parts = input.split('\n\n');
let polymer = parts[0];
let rules = parts[1].split('\n');

let steps = 10;

for (let i = 0;i < steps;i++) {
  let chains = [];
  for (let j=0;j < polymer.length - 1;j++) {
    chains.push(polymer.substr(j, 2));
  }
  chains.forEach((chain, index) => {
    // console.log({chain});
    rules.forEach((rule) => {
      let [match, insertion] = rule.split(' -> ');
      if (chain === match) {
        // console.log({match});
        let [left, right] = chain.split('');
        chains[index] = left + insertion;
        if (index === chains.length - 1) {
          chains[index] += right;
        }
      }
    });
  });
  polymer = chains.join('');
}

let counts = {};
polymer.split('').forEach((character) => {
  if (!counts[character]) {
    counts[character] = 0;
  }
  counts[character] += 1;
});
let most = 0, least = 1000000;
for (let character in counts) {
  if (counts[character] > most) {
    most = counts[character];
  }
  if (counts[character] < least) {
    least = counts[character];
  }
}
console.log({most, least}, most - least);