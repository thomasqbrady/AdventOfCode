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

function findGoldenCoinTime(arrivalTime, schedule) {
  let longestRoute = 0;
  let scheduleNums = []
  let goldenOffsets = []
  schedule.forEach((routeLength) => {
    if (routeLength != 'x') {
      let length = parseInt(routeLength, 10);
      scheduleNums.push(length);
      if (length > longestRoute) {
        longestRoute = length;
      }
    } else {
      scheduleNums.push(-1);
    }
  });
  // Only need to check the interval of the longest route
  let longestRouteIndex = schedule.indexOf(longestRoute.toString());
  for (let i = 0;i < scheduleNums.length;i++) {
    if (schedule[i] == 'x') {
      goldenOffsets.push('x')
    } else {
      goldenOffsets.push(scheduleNums.length - (longestRouteIndex + i));
    }
  }
  let foundIt = false;
  let timestamp;
  let i = 100000000000000;
  // let i = 0;
  while(!foundIt) {
    // log('while');
    i++;
    let paceBusDepartureTime = i * longestRoute;
    // log(paceBusDepartureTime);
    let offsets = [];
    for (let j = 0;j < scheduleNums.length;j++) {
      // log('for');
      let busInterval = scheduleNums[j];
      if (busInterval != -1) {
        let nearestDepartureCount;
        if (j > longestRouteIndex) {
          nearestDepartureCount = Math.ceil(paceBusDepartureTime / busInterval);
        } else {
          nearestDepartureCount = Math.floor(paceBusDepartureTime / busInterval);
        }
        // log(paceBusDepartureTime - (nearestDepartureCount * busInterval) != goldenOffsets[j]);
        if (paceBusDepartureTime - (nearestDepartureCount * busInterval) != goldenOffsets[j]) {
          // log('break ' + j);
          break;
        } else {
          // log('match ' + j);
          offsets.push(paceBusDepartureTime - (nearestDepartureCount * busInterval));
        }
        // log(`bus: ${ busInterval } ${ (nearestDepartureCount * busInterval) } paceBus: ${ paceBusDepartureTime }`);
      } else {
        offsets.push('x');
      }
    }
    foundIt = (offsets.join('') == goldenOffsets.join(''));
    // foundIt = j == scheduleNums.length;
    timestamp = paceBusDepartureTime;
  }
  log(timestamp);
}

findGoldenCoinTime(arrivalTime, schedule.split(','));