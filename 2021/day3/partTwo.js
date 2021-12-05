const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8');

let logs = input.split('\n');

let counts = {}

logs.forEach((log) => {
  log.split('').forEach((bit, index) => {
    bit = parseInt(bit,10);
    if (!counts[index]) {
      counts[index] = {};
    }
    counts[index][bit] ? counts[index][bit] += 1 : counts[index][bit] = 1;
  });
});

console.log({counts});

function readLifeSupport(_logs, column, high) {
  console.log({_logs, column, high});
  if (column == _logs[0].length) {
    return _logs;
  }
  let match;
  if (high) {
    if (counts[column][0] > counts[column][1]) {
      match = 0;
    } else {
      if (counts[column][0] < counts[column][1]) {
        match = 1;
      } else {
        match = 1;
      }
    }
  } else {
    if (counts[column][0] > counts[column][1]) {
      match = 1;
    } else {
      if (counts[column][0] < counts[column][1]) {
        match = 0;
      } else {
        match = 0;
      }
    }
  }
  _logs.forEach((log, index) => {
    let bit = parseInt(log[column], 10);
    console.log({log, index, bit, match});
    if (bit !== match) {
      console.log('removing ', log, 'because ', log[column], ' does not match ', match);
      _logs.splice(index,1);
      counts[column][bit] -= 1;
    }
  });
  return readLifeSupport(_logs, column + 1, high);
}

console.log(readLifeSupport([...logs], 0, true));