const utils = require('../utils.js');
const log = utils.log;

let input = `1000511
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,409,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,19,x,x,x,23,x,x,x,x,x,x,x,353,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`;

// input = `939
// 7,13,x,x,59,x,31,19`;

const parts = input.split('\n');

const arrivalTime = parts[0];
const schedule = parts[1];

function findFirstBus(arrivalTime, schedule) {
  let times = schedule.split(',');
  let bestTime = 1000000000, busID;
  times.map((busInterval) => {
    if (busInterval != 'x') {
      busInterval = parseInt(busInterval, 10);
      let closestTimeMultiplier = Math.ceil(arrivalTime / busInterval);
      let departureTime = closestTimeMultiplier * busInterval;
      if ((departureTime >= arrivalTime && departureTime < bestTime)) {
        bestTime = departureTime;
        busID = busInterval;
      }
    }
  });
  let waitTime = bestTime - arrivalTime;

  log(`waitTime: ${ waitTime } busID: ${ busID } solution: ${ waitTime * busID }`);
}

// findFirstBus(arrivalTime, schedule);

/*
// Credit where it's due, I could not figure this one out, even 
// when I thought I understood the CRT method. This is copy pasta
// from https://github.com/tpatel/advent-of-code-2020/blob/main/day13.js
*/

function findGoldenCoinTime(buses) {
  const timestamps = [];

  buses.forEach((bus, index) => {
      if(bus != 'x') timestamps.push({id: parseInt(bus), delta: index});
  });

  let step = timestamps[0].id;
  let t = step;

  for(let j=1; j<timestamps.length; j++) {
      while((t+timestamps[j].delta) % timestamps[j].id !== 0) {
          t += step;
      }
      step *= timestamps[j].id;
  }
  console.log(t);
}

findGoldenCoinTime(schedule.split(','));