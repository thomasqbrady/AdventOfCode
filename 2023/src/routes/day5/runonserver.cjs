let total = 0;
let text = "";
let inputArray = [];
let seedsString;
let seedToSoilString;
let soilToFertilizerString;
let fertilizerToWaterString;
let waterToLightString;
let lightToTemperatureString;
let temperatureToHumidityString;
let humidityToLocationString;

const fs = require("fs");
const input = fs.readFileSync("../../../static/day5/input.txt", "utf8");
// const input = fs.readFileSync(
//   "../../../static/day5/practice-part-one.txt",
//   "utf8"
// );
function translate(rulesString, id) {
  let operations = rulesString.split("\n");
  let numericID = parseInt(id, 10);
  // get rid of label
  operations.shift();
  let translation = "";
  operations.map((operation) => {
    let operationParts = operation.split(" ");
    let destinationIndex = parseInt(operationParts[0]);
    let originalIndex = parseInt(operationParts[1]);
    let moveCount = parseInt(operationParts[2]);
    // text += `looking for ${id} in originalIndex: ${originalIndex}-${
    //   originalIndex + moveCount
    // }<br>`;
    if (originalIndex <= numericID && numericID < originalIndex + moveCount) {
      let delta = numericID - originalIndex;
      // text += `found it! it's ${destinationIndex + delta}<br>`;
      translation = `${destinationIndex + delta}`;
    }
  });
  return translation !== "" ? translation : id;
}

function reverseLookup(rulesString, id) {
  let operations = rulesString.split("\n");
  let numericID = parseInt(id, 10);
  //   console.log({ operations, numericID });
  // get rid of label
  operations.shift();
  let translation = "";
  operations.map((operation) => {
    let operationParts = operation.split(" ");
    let destinationIndex = parseInt(operationParts[1]);
    let originalIndex = parseInt(operationParts[0]);
    let moveCount = parseInt(operationParts[2]);
    // console.log(
    //   `looking for ${id} in originalIndex: ${originalIndex}-${
    //     originalIndex + moveCount
    //   }`
    // );
    if (originalIndex <= numericID && numericID < originalIndex + moveCount) {
      let delta = numericID - originalIndex;
      //   console.log(`found it! it's ${destinationIndex + delta}`);
      translation = `${destinationIndex + delta}`;
    }
  });
  return translation !== "" ? translation : id;
}

// Part One
// function processInput(inputData) {
// seedsString = inputData[0];
// seedToSoilString = inputData[1];
// soilToFertilizerString = inputData[2];
// fertilizerToWaterString = inputData[3];
// waterToLightString = inputData[4];
// lightToTemperatureString = inputData[5];
// temperatureToHumidityString = inputData[6];
// humidityToLocationString = inputData[7];
//   let seeds = seedsString.split(":")[1].trim().split(" ");
//   text += `Seeds: ${seeds}<br>`;
//   let closest = Infinity;
//   seeds.map((seed) => {
//     let soil = translate(seedToSoilString, seed);
//     // text += `seed ${seed} is soil ${soil}<br>`;
//     let fertilizer = translate(soilToFertilizerString, soil);
//     // text += `soil ${soil} is fertilizer ${fertilizer}<br>`;
//     let water = translate(fertilizerToWaterString, fertilizer);
//     // text += `fertilizer ${fertilizer} is water ${water}<br>`;
//     let light = translate(waterToLightString, water);
//     // text += `water ${water} is light ${light}<br>`;
//     let temperature = translate(lightToTemperatureString, light);
//     // text += `light ${light} is temperature ${temperature}<br>`;
//     let humidity = translate(temperatureToHumidityString, temperature);
//     // text += `temperature ${temperature} is humidity ${humidity}<br>`;
//     let location = parseInt(
//       translate(humidityToLocationString, humidity),
//       10
//     );
//     // text += `humidity ${humidity} is location ${location}<br>`;
//     // text += `seed ${seed} is location ${location}<br>`;
//     if (location < closest) {
//       closest = location;
//     }
//   });
//   text += `Closest is ${closest}<br>`;
// }

function getSeedFromLocation(location) {
  let humidity = reverseLookup(humidityToLocationString, `${location}`);
  //   console.log(`location ${location} is humidity ${humidity}`);
  let temperature = reverseLookup(temperatureToHumidityString, humidity);
  //   console.log(`humidity ${humidity} is temperature ${temperature}`);
  let light = reverseLookup(lightToTemperatureString, temperature);
  //   console.log(`temperature ${temperature} is light ${light}`);
  let water = reverseLookup(waterToLightString, light);
  //   console.log(`light ${light} is water ${water}`);
  let fertilizer = reverseLookup(fertilizerToWaterString, water);
  //   console.log(`water ${water} is fertilizer ${fertilizer}`);
  let soil = reverseLookup(soilToFertilizerString, fertilizer);
  //   console.log(`fertilizer ${fertilizer} is soil ${soil}`);
  let seed = reverseLookup(seedToSoilString, `${soil}`);
  //   console.log(`soil ${soil} is seed ${seed}`);
  //   text += `location ${location} is seed ${seed}<br>`;
  //   console.log(`location ${location} is seed ${seed}`);
  return parseInt(seed, 10);
}

function checkForSeed(seed, seedRanges) {
  let found = false;
  for (let i = 0; i < seedRanges.length - 2; i += 2) {
    let startSeed = parseInt(seedRanges[i], 10);
    let count = parseInt(seedRanges[i + 1], 10);
    // text += `looking for ${seed} in ${startSeed} to ${startSeed + count}<br>`;
    if (startSeed <= seed && startSeed + count >= seed) {
      found = true;
    }
  }
  return found;
}

// Part Two
function processInput(inputData) {
  seedsString = inputData[0];
  seedToSoilString = inputData[1];
  soilToFertilizerString = inputData[2];
  fertilizerToWaterString = inputData[3];
  waterToLightString = inputData[4];
  lightToTemperatureString = inputData[5];
  temperatureToHumidityString = inputData[6];
  humidityToLocationString = inputData[7];

  //   console.log(seedsString);
  let seedRanges = seedsString.substring(7).split(" ");
  //   console.log(`Seed ranges: ${seedRanges}`);

  let found = false;
  let location = 0;

  while (!found) {
    let seed = getSeedFromLocation(location);
    found = checkForSeed(seed, seedRanges);
    console.log(`location: ${location} ${found}`);
    if (!found) {
      location += 1;
    }
  }
  //   text += `Closest location: ${location}<br>`;
  console.log(`Closest location: ${location}`);
  total = location;
  // let seeds = new Array<string>();

  // let seedFormula = seedsString.split(":")[1].trim().split(" ");
  // let closest = Infinity;
  // while (seedFormula.length > 0) {
  //   let startIndex = parseInt(seedFormula.shift() ?? "0", 10);
  //   let count = parseInt(seedFormula.shift() ?? "0", 10);
  //   text += `${startIndex} ${count}<br>`;
  //   let foundClosest = findClosest(startIndex, count);
  //   if (foundClosest < closest) {
  //     closest = foundClosest;
  //   }
  // }
  // text += `Closest is ${closest}<br>`;
}
processInput(input.split("\n\n"));
