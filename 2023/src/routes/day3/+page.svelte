<script lang="ts">
  import { onMount } from "svelte";

  let total = 0;
  let text = "";
  let inputArray = new Array<string>();
  let isNumber = new RegExp(/[0-9]/);
  let isSymbol = new RegExp(/[^0-9.]/);
  let rows = new Array<Array<string>>();
  let rowCount = 0;
  let colCount = 0;

  async function getInput() {
    // const response = await fetch("day3/practice-part-one.txt");
    // const response = await fetch("day3/practice-part-two.txt");
    const response = await fetch("day3/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  function findEndOfNumber(startX: number, y: number): [string, number] {
    let collectedNumberString = "";
    for (let x = startX; x < colCount; x++) {
      let cell = rows[y][x];
      if (!isNumber.test(cell)) {
        return [collectedNumberString, x - 1];
      } else {
        collectedNumberString += cell;
      }
    }
    return [collectedNumberString, colCount - 1];
  }

  function checkForSymbol(
    startX: number,
    endX: number,
    originY: number
  ): boolean {
    let foundSymbol = false;
    for (let y = originY - 1; y <= originY + 1; y++) {
      if (y >= 0 && y < rowCount) {
        for (let x = startX - 1; x <= endX + 1; x++) {
          if (x >= 0 && x < colCount) {
            let cell = rows[y][x];
            if (isSymbol.test(cell)) {
              foundSymbol = true;
            }
          }
        }
      }
    }
    return foundSymbol;
  }

  // Part One
  // function processInput(lines: Array<string>) {
  //   rowCount = lines.length;
  //   lines.map((row) => {
  //     let rowArray = row.split("");
  //     rows.push(rowArray);
  //     colCount = rowArray.length;
  //   });
  //   for (let y = 0; y < rowCount; y++) {
  //     for (let x = 0; x < colCount; x++) {
  //       let cell = rows[y][x];
  //       if (isNumber.test(cell)) {
  //         let endOfNumber: [string, number] = findEndOfNumber(x, y);
  //         let foundSymbol = checkForSymbol(x, endOfNumber[1], y);
  //         text += `Found number: ${endOfNumber[0]} presense of symbol: ${foundSymbol}<br>`;
  //         if (foundSymbol) {
  //           total += parseInt(endOfNumber[0], 10);
  //         }
  //         x = endOfNumber[1];
  //       }
  //     }
  //   }
  // }

  function findWholeNumber(
    originX: number,
    originY: number
  ): [number, number, number] {
    let x = originX;
    while (x >= 0) {
      if (isNumber.test(rows[originY][x])) {
        x--;
      } else {
        break;
      }
    }
    x++;
    let startX = x;
    text += `start of number at origin ${originX}:${originY} is ${startX} and x is ${x}<br>`;
    let numberString = "";
    while (x < colCount) {
      let cell = rows[originY][x];
      if (isNumber.test(cell)) {
        numberString += cell;
        x++;
      } else {
        break;
      }
    }
    let endX = x - 1;
    text += `end of number at origin ${originX}:${originY} is ${endX}<br>`;
    text += `number is ${numberString}<br>`;
    return [startX, endX, parseInt(numberString, 10)];
  }

  function findNumberNeighbors(originX: number, originY: number): number {
    text += `searching from ${originX}:${originY}<br>`;
    let foundNumbers: Array<number> = [];
    for (let y = originY - 1; y <= originY + 1; y++) {
      if (y >= 0 && y < rowCount) {
        for (let x = originX - 1; x <= originX + 1; x++) {
          if (x >= 0 && x < colCount) {
            let cell = rows[y][x];
            // text += `checking ${x}:${y} ${cell}<br>`;
            if (isNumber.test(cell)) {
              text += `Number ${cell} found near * at ${originX}/${originY}<br>`;
              let foundNumberInfo = findWholeNumber(x, y);
              x = foundNumberInfo[1];
              text += `whole neighbor is ${foundNumberInfo[2]}<br>`;
              foundNumbers.push(foundNumberInfo[2]);
            }
          }
        }
      }
    }
    if (foundNumbers.length == 2) {
      text += `<strong>Gear: ${foundNumbers[0]}*${foundNumbers[1]}</strong><br>`;
      return foundNumbers[0] * foundNumbers[1];
    }
    return 0;
  }

  // Part Two
  function processInput(lines: Array<string>) {
    rowCount = lines.length;
    lines.map((row) => {
      let rowArray = row.split("");
      rows.push(rowArray);
      colCount = rowArray.length;
    });
    for (let y = 0; y < rowCount; y++) {
      for (let x = 0; x < colCount; x++) {
        let cell = rows[y][x];
        if (cell === "*") {
          total += findNumberNeighbors(x, y);
        }
      }
    }
  }
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
