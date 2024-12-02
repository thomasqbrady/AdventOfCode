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

  function log(...stuff: Array<any>) {
    text += stuff + "<br>";
  }

  async function getInput() {
    // const response = await fetch("day14/practice-part-one.txt");
    // const response = await fetch('day14/practice-part-two.txt');
    const response = await fetch("day14/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  const north: Array<number> = [0, -1];
  const west: Array<number> = [-1, 0];
  const south: Array<number> = [0, 1];
  const east: Array<number> = [1, 0];

  const directions: Array<Array<number>> = [north, west, south, east];

  function hashCode(s: string): number {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  }

  function tumble(map: Array<Array<string>>): Array<Array<string>> {
    directions.map((direction, index) => {
      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;
      let deltaX = 1;
      let deltaY = 1;
      if (index > 1) {
        startX = map[0].length - 1;
        startY = map.length - 1;
        endX = -1;
        endY = -1;
        deltaX = -1;
        deltaY = -1;
      } else {
        endX = map[0].length;
        endY = map.length;
      }
      for (let x = startX; x !== endX; x += deltaX) {
        for (let y = startY; y !== endY; y += deltaY) {
          let tile = map[y][x];
          if (tile === "O") {
            let lastX = x;
            let lastY = y;
            let toX = x + direction[0];
            let toY = y + direction[1];
            while (
              toY >= 0 &&
              toY < map.length &&
              toX >= 0 &&
              toX < map[0].length &&
              map[toY][toX] !== "#" &&
              map[toY][toX] !== "O"
            ) {
              // map[lastY][lastX] = ".";
              // map[toY][toX] = "O";
              lastX = toX;
              lastY = toY;
              toX += direction[0];
              toY += direction[1];
            }
            map[y][x] = ".";
            map[lastY][lastX] = "O";
          }
        }
      }
    });
    return map;
  }

  // Part One
  function processInput(inputData: Array<string>) {
    let map: Array<Array<string>> = [];
    let seen = new Set();
    let seenIndices = new Map();
    inputData.map((row) => {
      map.push(row.split(""));
    });
    let runCount = 1000000000;
    // let runCount = 10;
    for (let i = 0; i < runCount; i++) {
      console.log({ i });
      map = tumble(map);
      let hash = hashCode(JSON.stringify(map));
      if (seen.has(hash)) {
        let firstSpotting = seenIndices.get(hash);
        let loopLength = i - firstSpotting;
        let cyclesLeft = 1000000000 - 1 - i;
        let cyclesLeftAfterLastLoop = cyclesLeft % loopLength;
        console.log({ loopLength, cyclesLeft, cyclesLeftAfterLastLoop });
        for (let j = 0; j < cyclesLeftAfterLastLoop; j++) {
          map = tumble(map);
        }
        map.map((row, rowIndex) => {
          row.map((col) => {
            if (col === "O") {
              total += map.length - rowIndex;
            }
          });
        });
        return;
      } else {
        seen.add(hash);
        seenIndices.set(hash, i);
      }
      console.log(JSON.stringify(map));
      console.log(hash);
    }
  }

  // Part Two
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
