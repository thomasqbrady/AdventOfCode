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

function polymerize(steps) {
  function react(pair, generation) {
    if (generation >= steps) {
      return
    }
    // console.log({pair, generation, steps});
    let match = ruleMap[pair];
    // console.log(pair + '->' + match + 'x' + pairs[pair]);
    generation += 1;
    pairs[pair] -= 1;
    if (pairs[pair] === 0) {
      delete pairs[pair];
    }
    let [first, second] = pair.split('');
    let leftPair = first + match;
    let rightPair = match + second;
    // console.log('+' + leftPair + ' ' + rightPair);
    if (!pairs[leftPair]) {
      pairs[leftPair] = 0;
    }
    pairs[leftPair] += 1;
    if (!pairs[rightPair]) {
      pairs[rightPair] = 0;
    }
    pairs[rightPair] += 1;
    if (!counts[match]) {
      counts[match] = 0;
    }
    counts[match] += 1;
    react(leftPair, generation);
    react(rightPair, generation);
  }
  for (let pair in pairs) {
    react(pair, 0);
  }
}

polymerize(40);

console.log({pairs});

let letters = Object.keys(counts);
let most = 0;
let least = 100000000;
letters.forEach((letter) => {
  if (counts[letter] > most) {
    most = counts[letter];
  }
  if (counts[letter] < least) {
    least = counts[letter];
  }
})
console.log({most, least}, most - least);