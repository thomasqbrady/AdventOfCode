<script lang="ts">
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

  let total = 0;
  let text = "";
  let inputArray: Array<string> = [];
  let beams: Array<Beam> = [];
  let map = new Map();
  let width = 0;
  let height = 0;
  let energized = new Map();
  let mapped = new Map();

  function log(...stuff: Array<any>) {
    text += stuff + "<br>";
  }

  async function getInput() {
    // const response = await fetch("day16/practice-part-one.txt");
    // const response = await fetch('day16/practice-part-two.txt');
    const response = await fetch("day16/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  type Beam = {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
  };

  function tick() {
    beams = beams.filter((beam) => {
      beam.x += beam.dirX;
      beam.y += beam.dirY;
      let offTheBoard =
        beam.x < 0 || beam.x >= width || beam.y < 0 || beam.y >= height;
      let alreadySeen = mapped.get(
        `${beam.x}:${beam.y}:${beam.dirX}:${beam.dirY}`
      );
      if (offTheBoard || alreadySeen) {
        // console.log(
        //   `skipping this one because offTheBoard: ${offTheBoard} alreadySeen: ${alreadySeen}`
        // );
      }
      return (
        !offTheBoard &&
        !mapped.get(`${beam.x}:${beam.y}:${beam.dirX}:${beam.dirY}`)
      );
    });
    beams.map((beam, index) => {
      mapped.set(`${beam.x}:${beam.y}:${beam.dirX}:${beam.dirY}`, 1);
      energized.set(`${beam.x}:${beam.y}`, 1);
      let tile = map.get(`${beam.x}:${beam.y}`);
      // console.log(`beam ${index} landed at ${beam.x}:${beam.y}`);
      // console.log(`The tile at this position is ${tile}`);
      switch (tile) {
        case "-":
          if (Math.abs(beam.dirY) == 1) {
            beam.dirX = -1;
            beam.dirY = 0;
            let newBeam = { x: beam.x, y: beam.y, dirX: 1, dirY: 0 };
            // console.log(
            //   `adding beam at ${newBeam.x}:${newBeam.y} heading ${newBeam.dirX}:${newBeam.dirY}`
            // );
            beams.push(newBeam);
          }
          break;
        case "|":
          if (Math.abs(beam.dirX) == 1) {
            beam.dirX = 0;
            beam.dirY = -1;
            let newBeam = { x: beam.x, y: beam.y, dirX: 0, dirY: 1 };
            // console.log(
            //   `adding beam at ${newBeam.x}:${newBeam.y} heading ${newBeam.dirX}:${newBeam.dirY}`
            // );
            beams.push(newBeam);
          }
          break;
        case "/":
          if (beam.dirY === 0) {
            let formerDirection = beam.dirX;
            beam.dirX = 0;
            beam.dirY = formerDirection * -1;
            // console.log(
            //   `beam ${index} was heading ${formerDirection}:0, but is now going 0:${
            //     formerDirection * -1
            //   }`
            // );
          } else {
            let formerDirection = beam.dirY;
            beam.dirX = formerDirection * -1;
            beam.dirY = 0;
            // console.log(
            //   `beam ${index} was heading 0:${formerDirection}, but is now going ${
            //     formerDirection * -1
            //   }:0`
            // );
          }
          break;
        case "\\":
          if (beam.dirY === 0) {
            let formerDirection = beam.dirX;
            beam.dirX = 0;
            beam.dirY = formerDirection;
            // console.log(
            //   `beam ${index} was heading ${formerDirection}:0, but is now going 0:${
            //     formerDirection * -1
            //   }`
            // );
          } else {
            let formerDirection = beam.dirY;
            beam.dirX = formerDirection;
            beam.dirY = 0;
            // console.log(
            //   `beam ${index} was heading 0:${formerDirection}, but is now going ${
            //     formerDirection * -1
            //   }:0`
            // );
          }
        case ".":
          break;
      }
    });
    // console.log(beams.length, JSON.stringify(beams));
    // console.log("=================");
  }

  // Part One
  // function processInput(inputData: Array<string>) {
  //   beams.push({ x: -1, y: 0, dirX: 1, dirY: 0 });
  //   height = inputData.length;
  //   inputData.map((row, rowIndex) => {
  //     width = row.length;
  //     row.split("").map((col, colIndex) => {
  //       map.set(`${colIndex}:${rowIndex}`, col);
  //     });
  //   });
  //   let totalEnergy = energized.size;
  //   while (beams.length > 0) {
  //     tick();
  //     console.log(`Energized: ${energized.size} beams: ${beams.length}`);
  //   }
  // }

  // Part Two
  function processInput(inputData: Array<string>) {
    beams.push({ x: -1, y: 0, dirX: 1, dirY: 0 });
    height = inputData.length;
    inputData.map((row, rowIndex) => {
      width = row.length;
      row.split("").map((col, colIndex) => {
        map.set(`${colIndex}:${rowIndex}`, col);
      });
    });
    let highestEnergized = 0;
    // down from top
    for (let i = 0; i < width; i++) {
      beams = [];
      energized = new Map();
      mapped = new Map();
      beams.push({ x: i, y: -1, dirX: 0, dirY: 1 });
      // console.log(`starting from ${i}:-1`);
      while (beams.length > 0) {
        tick();
        // console.log(`Energized: ${energized.size} beams: ${beams.length}`);
      }
      highestEnergized = Math.max(highestEnergized, energized.size);
    }

    // up from bottom
    for (let i = 0; i < width; i++) {
      beams = [];
      energized = new Map();
      mapped = new Map();
      beams.push({ x: i, y: height, dirX: 0, dirY: -1 });
      // console.log(`starting from ${i}:-1`);
      while (beams.length > 0) {
        tick();
        // console.log(`Energized: ${energized.size} beams: ${beams.length}`);
      }
      highestEnergized = Math.max(highestEnergized, energized.size);
    }

    // left to right
    for (let i = 0; i < height; i++) {
      beams = [];
      energized = new Map();
      mapped = new Map();
      beams.push({ x: -1, y: i, dirX: 1, dirY: 0 });
      // console.log(`starting from ${i}:-1`);
      while (beams.length > 0) {
        tick();
        // console.log(`Energized: ${energized.size} beams: ${beams.length}`);
      }
      highestEnergized = Math.max(highestEnergized, energized.size);
    }

    // right to left
    for (let i = 0; i < height; i++) {
      beams = [];
      energized = new Map();
      mapped = new Map();
      beams.push({ x: width, y: i, dirX: -1, dirY: 0 });
      // console.log(`starting from ${i}:-1`);
      while (beams.length > 0) {
        tick();
        // console.log(`Energized: ${energized.size} beams: ${beams.length}`);
      }
      highestEnergized = Math.max(highestEnergized, energized.size);
    }
    total = highestEnergized;
  }
</script>

<p><strong>{total}</strong></p>
<div class="flex flex-row">
  <div class="basis-3/5 text-xs">
    {#each inputArray as line}
      <p class="font-mono">{line}</p>
    {/each}
  </div>
  <div class="basis-2/5">
    <p>{@html text}</p>
  </div>
</div>
