<script lang="ts">
  import { onMount } from "svelte";

  let total = 1;
  let text = "";
  // let inputArray: Array<string> = [];

  async function getInput() {
    // const response = await fetch("day6/practice-part-one.txt");
    // const response = await fetch('day6/practice-part-two.txt');
    const response = await fetch("day6/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      let inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  // Part One
  // function processInput(inputData: Array<string>) {
  //   let timeRow = inputData[0]
  //     .split(":")[1]
  //     .trim()
  //     .replace(/\s+/g, " ")
  //     .split(" ");
  //   let distanceRow = inputData[1]
  //     .split(":")[1]
  //     .trim()
  //     .replace(/\s+/g, " ")
  //     .split(" ");
  //   for (let raceIndex = 0; raceIndex < timeRow.length; raceIndex++) {
  //     let waysToWin = 0;
  //     let raceTime = parseInt(timeRow[raceIndex], 10);
  //     let raceDistance = parseInt(distanceRow[raceIndex], 10);
  //     for (let holdTime = 1; holdTime < raceTime; holdTime++) {
  //       let potentialDistance = (raceTime - holdTime) * holdTime;
  //       if (potentialDistance > raceDistance) {
  //         waysToWin++;
  //       }
  //     }
  //     text += `There are ${waysToWin} ways to win race ${raceIndex + 1}<br>`;
  //     total *= waysToWin;
  //   }
  // }

  // Part Two
  function processInput(inputData: Array<string>) {
    let raceTime = parseInt(inputData[0]
      .split(":")[1]
      .trim()
      .replace(/\s+/g, ""), 10);
    let raceDistance = parseInt(inputData[1]
      .split(":")[1]
      .trim()
      .replace(/\s+/g, ""), 10);
    console.log(raceTime, raceDistance);
    let waysToWin = 0;
    for (let holdTime = 1; holdTime < raceTime; holdTime++) {
      let potentialDistance = (raceTime - holdTime) * holdTime;
      if (potentialDistance > raceDistance) {
        waysToWin++;
      }
    }
    text += `There are ${waysToWin} ways to win the race<br>`;
    total *= waysToWin;
  }
</script>

<div>
  <a href="/">Home</a>
  <p><strong>{total}</strong></p>
  <div class="flex flex-row">
    <div class="basis-3/5 text-xs">
      <!-- {#each inputArray as line}
        <p class="font-mono">{line}</p>
      {/each} -->
    </div>
    <div class="basis-2/5">
      <p>{@html text}</p>
    </div>
  </div>
</div>
