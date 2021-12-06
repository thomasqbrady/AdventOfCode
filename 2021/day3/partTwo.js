const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let logs = input.split('\n');

function makeMap(_logs) {
  let map = {
    unique: [],
    counts: {}
  };
  _logs.forEach((log) => {
    if (map.unique.indexOf(log) === -1) {
      map.unique.push(log);
    }
    log.split('').forEach((bit, index) => {
      bit = parseInt(bit,10);
      if (!map.counts[index]) {
        map.counts[index] = {};
      }
      map.counts[index][bit] ? map.counts[index][bit] += 1 : map.counts[index][bit] = 1;
    });
  });
  return map;
}

function readLifeSupport(map, column, high) {
  // console.log({map});
  if (column === map.unique[0].length || map.unique.length === 1) {
    return map.unique;
  }
  let match;
  if (high) {
    if (map.counts['' + column]['0'] > map.counts['' + column]['1']) {
      match = 0;
    } else {
      if (map.counts['' + column]['0'] < map.counts['' + column]['1']) {
        match = 1;
      } else {
        match = 1;
      }
    }
  } else {
    if (map.counts['' + column]['0'] > map.counts['' + column]['1']) {
      match = 1;
    } else {
      if (map.counts['' + column]['0'] < map.counts['' + column]['1']) {
        match = 0;
      } else {
        match = 0;
      }
    }
  }
  // console.dir({map, match, column}, { depth: null });
  [...map.unique].forEach((reading) => {
    let matchBit = parseInt(reading[column], 10);
    // console.log({reading, matchBit, match});
    if (matchBit !== match) {
      let index = map.unique.indexOf(reading);
      // console.log(`removing ${reading} at index of ${index} because ${reading[column]} in column ${column } does not match ${match}`);
      map.unique.splice(index, 1);
      reading.split('').forEach((bit, index) => {
        map.counts['' + index]['' + bit] -= 1;
      });
    }
  });
  // console.log('AFTER');
  // console.dir({map, match}, { depth: null });
  return readLifeSupport(map, column + 1, high);
}

let map = makeMap([...logs]);
// console.log('=====================================');
// console.log('S        T        A        R        T');
// console.log('=====================================');
let oxygen = parseInt(readLifeSupport(map, 0, true), 2);
map = makeMap([...logs]);
let co2 = parseInt(readLifeSupport(map, 0, false), 2);
console.log({oxygen, co2}, oxygen * co2);