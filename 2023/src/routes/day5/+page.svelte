<script lang="ts">
  import { onMount } from "svelte";

  let total = 0;
  let text = "";
  let inputArray: Array<string> = [];
  let memo: any = {};

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
    let rulesStringId = rulesString.substring(0, 15);
    if (!memo.hasOwnProperty(rulesStringId)) {
      memo[rulesStringId] = {};
    }
    if (memo[rulesStringId].hasOwnProperty(id)) {
      return memo[rulesStringId][id];
    }
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
    memo[rulesStringId][id] = translation;
    return translation !== "" ? translation : id;
  }

  // Part One
  // function processInput(inputData: Array<string>) {
  //   let [
  //     seedsString,
  //     seedToSoilString,
  //     soilToFertilizerString,
  //     fertilizerToWaterString,
  //     waterToLightString,
  //     lightToTemperatureString,
  //     temperatureToHumidityString,
  //     humidityToLocationString,
  //   ] = inputData;
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

  // Part Two
  function processInput(inputData: Array<string>) {
    let [
      seedsString,
      seedToSoilString,
      soilToFertilizerString,
      fertilizerToWaterString,
      waterToLightString,
      lightToTemperatureString,
      temperatureToHumidityString,
      humidityToLocationString,
    ] = inputData;
    let seeds = new Array<string>();

    let seedFormula = seedsString.split(":")[1].trim().split(" ");
    let closest = Infinity;
    while (seedFormula.length > 0) {
      let startIndex = parseInt(seedFormula.shift() ?? "0", 10);
      let count = parseInt(seedFormula.shift() ?? "0", 10);
      for (let i = 0; i < count; i++) {
        let soil = translate(seedToSoilString, `${startIndex + i}`);
        text += `seed ${startIndex + i} is soil ${soil}<br>`;
        let fertilizer = translate(soilToFertilizerString, soil);
        // text += `soil ${soil} is fertilizer ${fertilizer}<br>`;
        let water = translate(fertilizerToWaterString, fertilizer);
        // text += `fertilizer ${fertilizer} is water ${water}<br>`;
        let light = translate(waterToLightString, water);
        // text += `water ${water} is light ${light}<br>`;
        let temperature = translate(lightToTemperatureString, light);
        // text += `light ${light} is temperature ${temperature}<br>`;
        let humidity = translate(temperatureToHumidityString, temperature);
        // text += `temperature ${temperature} is humidity ${humidity}<br>`;
        let location = parseInt(
          translate(humidityToLocationString, humidity),
          10
        );
        // text += `humidity ${humidity} is location ${location}<br>`;
        // text += `seed ${seed} is location ${location}<br>`;
        if (location < closest) {
          closest = location;
        }
      }
    }
    text += `Closest is ${closest}<br>`;
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
