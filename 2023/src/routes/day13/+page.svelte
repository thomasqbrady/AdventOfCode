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
    // const response = await fetch("day13/practice-part-one.txt");
    // const response = await fetch('day13/practice-part-two.txt');
    const response = await fetch("day13/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n\n");
      processInput(inputArray);
    });
  });

  function findMatchRows(
    rows: Array<string>,
    startRow: number,
    distance: number
  ): boolean {
    let foundMissMatch = true;
    while (startRow - distance > -1 && startRow < rows.length) {
      if (rows[startRow] === rows[startRow - distance]) {
        console.log(startRow, startRow - distance, "same row");
        startRow++;
        distance += 2;
      } else {
        console.log(startRow, startRow - distance, "not the same row");
        foundMissMatch = false;
        startRow = 0;
      }
    }
    return foundMissMatch;
  }

  function findMatchColumns(
    columns: Array<string>,
    startCol: number,
    distance: number
  ): boolean {
    let foundMissMatch = true;
    while (startCol - distance > -1 && startCol < columns.length) {
      if (columns[startCol] === columns[startCol - distance]) {
        console.log(startCol, startCol - distance, "same col");
        startCol++;
        distance += 2;
      } else {
        console.log(startCol, startCol - distance, "not the same col");
        foundMissMatch = false;
        startCol = 0;
      }
    }
    return foundMissMatch;
  }

  // Part One
  function processInput(patterns: Array<string>) {
    patterns.map((pattern, patternIndex) => {
      const rows = pattern.split("\n");
      let columns: Array<string> = Array(rows[0].length).fill("");
      rows.map((rowStr, rowIndex) => {
        const arrayColStr = rowStr.split("");
        arrayColStr.map((colStr, colIndex) => {
          columns[colIndex] += colStr;
        });
      });
      console.log(rows);
      rows.forEach((row, rowIndex) => {
        if (row === rows[rowIndex - 1]) {
          let hMirror = findMatchRows(rows, rowIndex, 1);
          if (hMirror) {
            total += rowIndex * 100;
            log(patternIndex, rowIndex * 100);
          }
        }
      });
      columns.forEach((column, colIndex) => {
        if (column === columns[colIndex - 1]) {
          let vMirror = findMatchColumns(columns, colIndex, 1);
          if (vMirror) {
            total += colIndex;
            log(patternIndex, colIndex);
          }
        }
      });
    });
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
