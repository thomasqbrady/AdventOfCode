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

  async function getInput() {
    // const response = await fetch("day11/practice-part-one.txt");
    // const response = await fetch('day11/practice-part-two.txt');
    const response = await fetch("day11/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  function log(...stuff: Array<any>) {
    text += stuff + "<br>";
  }

  type Coordinate = {
    x: number;
    y: number;
  };

  type RiseRun = {
    moveX: number;
    moveY: number;
  };

  // Part One
  function processInput(inputData: Array<string>) {
    let rows: Array<Array<string>> = [];
    let rowsToBeAddedIndices: Array<number> = [];
    let colCount = 0;
    let galaxyCoordinates: Array<Coordinate> = [];
    inputData.map((row, index) => {
      colCount = row.length;
      let filteredRow = row.replace(/\./g, "");
      if (filteredRow === "") {
        rowsToBeAddedIndices.push(index);
      }
      rows.push(row.split(""));
    });
    let colsToBeAddedIndices: Array<number> = [];
    for (let x = 0; x < colCount; x++) {
      let foundGalaxy = false;
      for (let y = 0; y < rows.length; y++) {
        if (rows[y][x] === "#") {
          galaxyCoordinates.push({ x: x, y: y });
          foundGalaxy = true;
        }
      }
      if (!foundGalaxy) {
        colsToBeAddedIndices.push(x);
      }
    }
    colCount += colsToBeAddedIndices.length;
    let colOffset = 0;
    colsToBeAddedIndices.map((colIndex) => {
      let newColIndex = colIndex + colOffset;
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        rows[rowIndex].splice(newColIndex, 0, ".");
      }
      galaxyCoordinates = galaxyCoordinates.map((coord: Coordinate) => {
        if (coord.x >= newColIndex) {
          coord.x += 1;
        }
        return coord;
      });
      colOffset++;
    });
    let insertionRow = Array(colCount).fill(".");
    let rowOffset = 0;
    rowsToBeAddedIndices.map((rowIndex) => {
      let newRowIndex = rowIndex + rowOffset;
      rows.splice(newRowIndex + rowOffset, 0, insertionRow);
      rowOffset++;
      galaxyCoordinates = galaxyCoordinates.map((coord: Coordinate) => {
        if (coord.y >= newRowIndex) {
          coord.y += 1;
        }
        return coord;
      });
    });
    let riseRuns: Map<string, RiseRun> = new Map();
    galaxyCoordinates.map((firstCoord) => {
      galaxyCoordinates.map((secondCoord) => {
        if (firstCoord !== secondCoord) {
          let lineID = `${firstCoord.x}:${firstCoord.y}-${secondCoord.x}:${secondCoord.y}`;
          let altLineID = `${secondCoord.x}:${secondCoord.y}-${firstCoord.x}:${firstCoord.y}`;
          if (!riseRuns.get(lineID) && !riseRuns.get(altLineID)) {
            riseRuns.set(lineID, {
              moveX: secondCoord.x - firstCoord.x,
              moveY: secondCoord.y - firstCoord.y,
            });
            total +=
              Math.abs(secondCoord.x - firstCoord.x) +
              Math.abs(secondCoord.y - firstCoord.y);
          }
        }
      });
    });
    console.log(riseRuns);
  }

  // Part Two
</script>

<div>
  <a href="/">Home</a>
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
</div>
