const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');

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

let total = 0;

function removeArrFromArr(first, second) {
  return first.filter((character) => {
    return !second.includes(character);
  });
}

signals.forEach((signal, index) => {
  let parts = signal.split('|');
  let signalPattern = parts[0].trim();
  let outputValue = parts[1].trim();
  let digits = signalPattern.split(' ');
  let map = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    cypher: {
      'abcefg': 0,
      'cf': 1,
      'acdeg': 2,
      'acdfg': 3,
      'bcdf': 4,
      'abdfg': 5,
      'abdefg': 6,
      'acf': 7,
      'abcdefg': 8,
      'abcdfg': 9
    },
    reverse: {}
  }
  digits.forEach((digit) => {
    switch(digit.length) {
      case 2:
        // IT'S A ONE
        // console.log(`${digit} is 1`)
        map[1] = digit.split('').sort((a, b) => {
          return (a > b) ? 1 : b > a ? -1 : 0;
        });
        break;
      case 3:
        // IT'S A SEVEN
        // console.log(`${digit} is 7`)
        map[7] = digit.split('').sort((a, b) => {
          return (a > b) ? 1 : b > a ? -1 : 0;
        });
        break;
      case 4:
        // IT'S A FOUR
        // console.log(`${digit} is 4`)
        map[4] = digit.split('').sort((a, b) => {
          return (a > b) ? 1 : b > a ? -1 : 0;
        });
        break;
      case 7:
        // IT'S AN EIGHT
        // console.log(`${digit} is 8`)
        map[8] = digit.split('').sort((a, b) => {
          return (a > b) ? 1 : b > a ? -1 : 0;
        });
        break;
    }
  });
  digits.forEach((digit) => {
    let characters = digit.split('').sort((a, b) => {
      return (a > b) ? 1 : b > a ? -1 : 0;
    });
    switch(digit.length) {
      case 5:
        // IT'S TWO, THREE, OR FIVE
        let allMatched = true;
        map[1].forEach((character) => {
          // console.log(`does ${characters} include ${character}`);
          if (!characters.includes(character)) allMatched = false;
        });
        if (allMatched) {
          map[3] = characters;
          let a = [...map[7]];
          a = removeArrFromArr(a, map[1]);
          // console.log({a});
          map['a'] = a[0];
          map.reverse[a[0]] = 'a';
          let g = [...map[3]];
          g = removeArrFromArr(g, map[4]);
          g = removeArrFromArr(g, a);
          // console.log({g});
          map['g'] = g[0];
          map.reverse[g[0]] = 'g';
          let d = [...map[3]];
          d = removeArrFromArr(d, map[1]);
          d = removeArrFromArr(d, a);
          d = removeArrFromArr(d, g);
          // console.log({d});
          map['d'] = d[0];
          map.reverse[d[0]] = 'd';
          let b = [...map[4]];
          b = removeArrFromArr(b, map[3]);
          // console.log({b});
          map['b'] = b[0];
          map.reverse[b[0]] = 'b';
        }
        // console.log(digit, allMatched);
        break;
    }
  });
  digits.forEach((digit) => {
    let characters = digit.split('').sort((a, b) => {
      return (a > b) ? 1 : b > a ? -1 : 0;
    });
    switch(digit.length) {
      case 5:
        // IT'S TWO OR FIVE
        if (characters.includes(map['b'])) {
          // IT'S FIVE
          map[5] = characters;
        } else {
          if (map[3].join('') !== characters.join('')) {
            // IT'S TWO
            map[2] = characters;
          }
        }
        break;
    }
  });
  let c = [...map[4]];
  c = removeArrFromArr(c, map[5]);
  // console.log({c});
  map['c'] = c[0];
  map.reverse[c[0]] = 'c';
  let e = [...map[2]];
  e = removeArrFromArr(e, map[3]);
  // console.log({e});
  map['e'] = e[0];
  map.reverse[e[0]] = 'e';
  let f = [...map[1]];
  f = removeArrFromArr(f, c);
  // console.log({f});
  map['f'] = f[0];
  map.reverse[f[0]] = 'f';
  digits.forEach((digit) => {
    let characters = digit.split('').sort((a, b) => {
      return (a > b) ? 1 : b > a ? -1 : 0;
    });
    switch(digit.length) {
      case 6:
        // IT'S ZERO, SIX, OR NINE
        if (characters.includes(map['d'])) {
          if (characters.includes(map['c'])) {
            // IT'S NINE
            map[9] = characters;
          } else {
            // IT'S SIX
            map[6] = characters;
          }
        } else {
          // IT'S ZERO
          map[0] = characters;
        }
        break;
    }
  });
  // console.log({index, outputValue, map});
  // console.log({map});
  let stringNum = '';
  outputValue.split(' ').forEach((digit) => {
    let decoded = digit.split('').map((character) => {
      return map.reverse[character]
    }).sort((a,b) => { return (a > b) ? 1 : b > a ? -1 : 0; }).join('');
    let translated = map.cypher[decoded];
    stringNum += translated;
    // console.log({digit, decoded, translated, stringNum});
  });
  console.log(stringNum);
  total += parseInt(stringNum, 10);
});
console.log({total});
