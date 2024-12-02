<script lang="ts">
  import { onMount } from "svelte";

  let total = 0;
  let text = "";
  let inputArray: Array<string> = [];

  async function getInput() {
    // const response = await fetch("day8/practice-part-one.txt");
    // const response = await fetch("day8/practice-part-two.txt");
    const response = await fetch("day8/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n\n");
      processInput(inputArray);
    });
  });

  function navigate(
    stopName: string,
    turnTo: string,
    map: Map<string, Array<string>>
  ): string {
    // text += `stopName: ${stopName} turnTo: ${turnTo}<br>`;
    let stop = map.get(stopName) ?? ["", ""];
    if (turnTo === "L") {
      // text += `next stop: ${stop[0]}<br>`;
      return stop[0];
    }
    // text += `next stop: ${stop[1]}<br>`;
    return stop[1];
  }

  // Part One
  // function processInput(inputData: Array<string>) {
  //   let turnOrder = inputData[0].trim().split("");
  //   let dictionary = inputData[1].split("\n");
  //   let map = new Map();
  //   dictionary.map((definition) => {
  //     let parts = definition.split(" = ");
  //     let term = parts[0].trim();
  //     let meaningsString = parts[1];
  //     let meanings = meaningsString
  //       .substring(1, meaningsString.length - 1)
  //       .split(", ");
  //     map.set(term, meanings);
  //   });
  //   let stopName = "AAA";
  //   let turnIndex = 0;
  //   let turnCount = 0;
  //   while (stopName !== "ZZZ") {
  //     stopName = navigate(
  //       stopName,
  //       turnOrder[turnCount % turnOrder.length],
  //       map
  //     );
  //     turnCount++;
  //   }
  //   text += `Got to ZZZ in ${turnCount} turns`;
  //   total = turnCount;
  // }

  function findPath(
    stopName: string,
    turnOrder: Array<string>,
    turnOrderIndex: number,
    map: Map<string, Array<string>>,
    turnCount: number
  ): number {
    text += `Turn ${turnCount}: from ${stopName} `;
    let nextStopName = navigate(stopName, turnOrder[turnOrderIndex], map);
    text += `turning ${turnOrder[turnOrderIndex]} arriving at ${nextStopName}<br>`;
    if (nextStopName.substring(nextStopName.length - 1) !== "Z") {
      return findPath(
        nextStopName,
        turnOrder,
        turnOrderIndex + 1,
        map,
        turnCount + 1
      );
    } else {
      return turnCount;
    }
  }

  // borrowed from https://www.tutorialspoint.com/calculating-the-lcm-of-multiple-numbers-in-javascript
  function gcd2(a: number, b: number): number {
    if (!b) {
      return b === 0 ? a : NaN;
    }
    return gcd2(b, a % b);
  }

  function lcm2(a: number, b: number): number {
    return (a * b) / gcd2(a, b);
  }

  function findLCM(integers: Array<number>): number {
    let n = 1;
    for (let i = 0; i < integers.length; i++) {
      n = lcm2(integers[i], n);
    }
    return n;
  }

  // Part Two
  function processInput(inputData: Array<string>) {
    let turnOrder = inputData[0].trim().split("");
    let dictionary = inputData[1].split("\n");
    let map = new Map();
    let startingPoints: Array<string> = [];
    dictionary.map((definition) => {
      let parts = definition.split(" = ");
      let term = parts[0].trim();
      if (term.substring(term.length - 1) === "A") {
        startingPoints.push(term);
      }
      let meaningsString = parts[1];
      let meanings = meaningsString
        .substring(1, meaningsString.length - 1)
        .split(", ");
      map.set(term, meanings);
    });
    let frequencies: Array<number> = [];
    let step = 0;
    while (startingPoints.length > 0) {
      let nextStops: Array<string> = [];
      startingPoints.map((stopName) => {
        let direction = turnOrder[step % turnOrder.length];
        let nextStop = navigate(stopName, direction, map);
        if (nextStop.substring(nextStop.length - 1) === "Z") {
          frequencies.push(step + 1);
        } else {
          nextStops.push(nextStop);
        }
      });
      step++;
      startingPoints = nextStops;
    }
    text += `frequencies: ${frequencies}<br>`;
    text += `lcm: ${findLCM(frequencies)}<br>`;
  }
</script>

<p><strong>{total}</strong></p>
<div class="flex flex-row">
  <div class="basis-3/5 text-xs overflow-hidden">
    {#each inputArray as line}
      <p class="font-mono">{line}</p>
    {/each}
  </div>
  <div class="basis-2/5">
    <p>{@html text}</p>
  </div>
</div>
