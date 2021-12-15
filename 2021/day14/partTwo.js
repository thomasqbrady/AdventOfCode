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

let ruleMap = {};

rules.forEach((rule) => {
  let ruleParts = rule.split(' -> ');
  ruleMap[ruleParts[0]] = ruleParts[1];
})

let counts = {};
let pairs = {};

polymer.split('').forEach((character, index) => {
  if (index < polymer.length - 1) {
    let pair = character + polymer.substring(index + 1, index + 2);
    if (!pairs[pair]) {
      pairs[pair] = 0;
    }
    pairs[pair] += 1;
  }
  if (!counts[character]) {
    counts[character] = 0;
  }
  counts[character] += 1;
});

console.log({pairs, counts});

function evolve(polymer, generations) {
  // console.log('evolve', polymer);
  function polymerize(polymer) {
    // console.log('polymerize');
    return Object.keys(polymer).reduce((newPolymer, pair) => {
      let character = ruleMap[pair];
      // console.log({newPolymer, pair, character}, polymer[pair], newPolymer[pair]);
      counts[character] = (counts[character] || 0) + polymer[pair];
      newPolymer[pair[0] + character] = (newPolymer[pair[0] + character] || 0) + polymer[pair];
      newPolymer[character + pair[1]] = (newPolymer[character + pair[1]] || 0) + polymer[pair];
      return newPolymer;
    }, {});
  }
  for (let i = 0;i < generations;i++) {
    console.log({i});
    polymer = polymerize(polymer);
  }
  // console.log({polymer, counts});
}

evolve(pairs, 40);

let values = Object.values(counts);
// console.log(values);
// console.log(Math.max(...values),Math.min(...values));
console.log(Math.max(...values) - Math.min(...values));

// let letters = Object.keys(counts);
// let most = 0;
// let least = 100000000;
// letters.forEach((letter) => {
//   if (counts[letter] > most) {
//     most = counts[letter];
//   }
//   if (counts[letter] < least) {
//     least = counts[letter];
//   }
// })
// console.log({most, least}, most - least);