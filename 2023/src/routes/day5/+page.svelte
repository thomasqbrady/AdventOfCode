<script lang="ts">
  /**
   * I GAVE UP ON DOING THIS ONE IN THE BROWSER FOR PART 2 AND DID IT IN RUNONSERVER.CJS
   */

  /**
   * In getInput you'll find three nearly identical lines starting with const response =
   * Use the one for the problem you're working on, which is eithe
   *   * the part one practice data
   *   * the part two practice data
   *   * your input
   *
   * the onMount Svelte function will call getInput to import the input file and then
   * pass it to processInput. There will be two processInput functions in this file,
   * and one will be commented out. That will most likely be the part one method, and
   * it should have a comment saying so. The other should have a comment labeling it
   * part two.
   */
  import { onMount } from "svelte";
  import { parse } from "svelte/compiler";

  let total = 0;
  let text = "";
  let inputArray: Array<string> = [];
  let seedsString: string;
  let seedToSoilString: string;
  let soilToFertilizerString: string;
  let fertilizerToWaterString: string;
  let waterToLightString: string;
  let lightToTemperatureString: string;
  let temperatureToHumidityString: string;
  let humidityToLocationString: string;

  async function getInput() {
    const response = await fetch("day5/practice-part-one.txt");
    // const response = await fetch('day5/practice-part-two.txt');
    // const response = await fetch("day5/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n\n");
      processInput(inputArray);
    });
  });

  function translate(rulesString: string, id: string): string {
    let operations = rulesString.split("\n");
    let numericID = parseInt(id, 10);
    // get rid of label
    operations.shift();
    let translation = "";
    operations.map((operation: string) => {
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

  function reverseLookup(rulesString: string, id: string): string {
    let operations = rulesString.split("\n");
    let numericID = parseInt(id, 10);
    // get rid of label
    operations.shift();
    let translation = "";
    operations.map((operation: string) => {
      let operationParts = operation.split(" ");
      let destinationIndex = parseInt(operationParts[1]);
      let originalIndex = parseInt(operationParts[0]);
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

  // Part One
  // function processInput(inputData: Array<string>) {
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

  function getSeedFromLocation(location: number): number {
    let humidity = reverseLookup(humidityToLocationString, `${location}`);
    // text += `location ${location} is humidity ${humidity}<br>`;
    let temperature = reverseLookup(temperatureToHumidityString, humidity);
    // text += `humidity ${humidity} is temperature ${temperature}<br>`;
    let light = reverseLookup(lightToTemperatureString, temperature);
    // text += `temperature ${temperature} is light ${light}<br>`;
    let water = reverseLookup(waterToLightString, light);
    // text += `light ${light} is water ${water}<br>`;
    let fertilizer = reverseLookup(fertilizerToWaterString, water);
    // text += `water ${water} is fertilizer ${fertilizer}<br>`;
    let soil = reverseLookup(soilToFertilizerString, fertilizer);
    // text += `fertilizer ${fertilizer} is soil ${soil}<br>`;
    let seed = reverseLookup(seedToSoilString, `${soil}`);
    // text += `soil ${soil} is seed ${seed}<br>`;
    text += `location ${location} is seed ${seed}<br>`;
    return parseInt(seed, 10);
  }

  function checkForSeed(seed: number, seedRanges: Array<string>): boolean {
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
  function processInput(inputData: Array<string>) {
    seedsString = inputData[0];
    seedToSoilString = inputData[1];
    soilToFertilizerString = inputData[2];
    fertilizerToWaterString = inputData[3];
    waterToLightString = inputData[4];
    lightToTemperatureString = inputData[5];
    temperatureToHumidityString = inputData[6];
    humidityToLocationString = inputData[7];

    console.log(seedsString);
    let seedRanges = seedsString.substring(7).split(" ");
    // text += `Seed ranges: ${seedRanges}<br>`;

    let found = false;
    let location = 0;
    while (!found) {
      let seed = getSeedFromLocation(location);
      found = checkForSeed(seed, seedRanges);
      if (!found) {
        location++;
      }
      if (location === 100) {
        found = true;
      }
    }
    text += `Closest location: ${location}<br>`;
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
</script>

<div>
  <a href="/">Home</a>
  <p><strong>{total}</strong></p>
  <div class="flex flex-row">
    <div class="basis-3/5 text-xs">
      <!-- {#each inputArray as line}
        <p class="font-mono">{@html line.replace(/\n/g, "<br>")}</p>
      {/each} -->
    </div>
    <div class="basis-2/5">
      <p>{@html text}</p>
    </div>
  </div>
</div>
