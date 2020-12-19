const utils = require('../utils.js');
const log = utils.log;

let input = `0
3
6`;

input = `15
12
0
14
3
1`;

function playFirstGame(startingNumbers, count) {
  let startTime = new Date().getTime();
  let game = {};
  let lastNum, lastNumCount;
  startingNumbers.forEach((num, index) => {
    let previouslyStored = game[num];
    let thisRoundsNumber;
    if (previouslyStored) {
      previouslyStored.rounds.push(index);
    } else {
      game[num] = {
        rounds: [index]
      }
    }
    lastNum = num;
    lastNumCount = game[num].rounds.length;
    // log(`turn ${ index + 1 }: ${ num }`);
  });
  // log(game);
  for (let i=startingNumbers.length;i < count;i++) {
    // log(lastNum, lastNumCount);
    let prevNumInfo = game[lastNum];
    // log(`previous number was ${ lastNum } in round ${ i - 1 } for its ${ prevNumInfo.rounds.length } time`);
    let newNum;
    let count = 1;
    if (lastNumCount == 1) {
      // log(`so this round's number is 0`)
      newNum = '0';
    } else {
      // log(`so this round's number is ${ lastNum }'s last two rounds diffed ${ prevNumInfo.rounds[prevNumInfo.rounds.length - 1] } - ${ prevNumInfo.rounds[prevNumInfo.rounds.length - 2] }`);
      newNum = (prevNumInfo.rounds[prevNumInfo.rounds.length - 1] - prevNumInfo.rounds[prevNumInfo.rounds.length - 2]).toString();
    }
    if (game[newNum]) {
      game[newNum].rounds.push(i);
    } else {
      game[newNum] = {
        rounds: [i]
      }
    }
    lastNum = newNum;
    lastNumCount = game[newNum].rounds.length;
    // log(`turn ${ i + 1 }: ${ newNum }`);
  }
  log(lastNum, new Date().getTime() - startTime);
}


// playFirstGame(input.split('\n'), 2020);
playFirstGame(input.split('\n'), 30000000);