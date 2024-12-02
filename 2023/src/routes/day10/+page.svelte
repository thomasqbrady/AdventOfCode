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
  const pipeTiles = ["|", "-", "L", "J", "7", "F"];
  let map: Array<Array<string>> = [];
  let colCount = 0;
  let cardToMove: Map<string, Array<number>> = new Map();
  cardToMove.set("N", [-1, 0]);
  cardToMove.set("E", [0, 1]);
  cardToMove.set("S", [1, 0]);
  cardToMove.set("W", [0, -1]);
  cardToMove.set("NOMOVE", [0, 0]);
  let moveToCard: Map<string, string> = new Map();
  moveToCard.set("[-1, 0]", "N");
  moveToCard.set("[0, 1]", "E");
  moveToCard.set("[1, 0]", "S");
  moveToCard.set("[0, -1]", "W");
  moveToCard.set("[0, 0]", "NOMOVE");

  type DirectionKey = {
    text: string;
  };

  async function getInput() {
    // const response = await fetch("day10/practice-part-one.txt");
    // const response = await fetch("day10/practice-part-two.txt");
    const response = await fetch("day10/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      // inputArray = inputText.split("\n");
      processInput(inputText);
    });
  });

  function roundCorner(direction: string, tile: string): Array<number> {
    if (tile === "|") {
      if (direction === "N") {
        return cardToMove.get("N") ?? [0, 0];
      }
      if (direction === "S") {
        return cardToMove.get("S") ?? [0, 0];
      }
    }
    if (tile === "-") {
      if (direction === "W") {
        return cardToMove.get("W") ?? [0, 0];
      }
      if (direction === "E") {
        return cardToMove.get("E") ?? [0, 0];
      }
    }
    if (tile === "L") {
      if (direction === "W") {
        return cardToMove.get("N") ?? [0, 0];
      }
      if (direction === "S") {
        return cardToMove.get("E") ?? [0, 0];
      }
    }
    if (tile === "J") {
      if (direction === "E") {
        return cardToMove.get("N") ?? [0, 0];
      }
      if (direction === "S") {
        return cardToMove.get("W") ?? [0, 0];
      }
    }
    if (tile === "7") {
      if (direction === "E") {
        return cardToMove.get("S") ?? [0, 0];
      }
      if (direction === "N") {
        return cardToMove.get("W") ?? [0, 0];
      }
    }
    if (tile === "F") {
      if (direction === "W") {
        return cardToMove.get("S") ?? [0, 0];
      }
      if (direction === "N") {
        return cardToMove.get("E") ?? [0, 0];
      }
    }
    return cardToMove.get("NOMOVE") ?? [0, 0];
  }

  function findPipe(row: number, col: number): Array<number> {
    let directionsToCheck = ["N", "S", "E", "W"];
    for (let i = 0; i < directionsToCheck.length; i++) {
      const direction = directionsToCheck[i];
      const directionMatrix = cardToMove.get(direction) ?? [0, 0];
      const checkRow = row + directionMatrix[0];
      const checkCol = col + directionMatrix[1];
      if (
        checkRow >= 0 &&
        checkRow < map.length &&
        checkCol >= 0 &&
        checkCol < colCount
      ) {
        let tileToCheck =
          map[row + directionMatrix[0]][col + directionMatrix[1]];
        if (pipeTiles.includes(tileToCheck)) {
          return roundCorner(direction, tileToCheck);
        }
      }
    }
    return cardToMove.get("NOMOVE") ?? [0, 0];
  }

  // Part One
  // function processInput(inputText: string) {
  //   let inputData = inputText.split("\n");
  //   let startPosition = inputText.replace(/\n/g, "").indexOf("S");
  //   inputData.map((row, index) => {
  //     colCount = row.length;
  //     map.push(row.split(""));
  //   });
  //   let currRow = Math.floor(startPosition / colCount);
  //   let currCol = startPosition % colCount;
  //   let move = findPipe(currRow, currCol);
  //   let direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
  //   let nextTile = map[currRow + move[0]][currCol + move[1]];
  //   let steps = 1;
  //   currRow = currRow + move[0];
  //   currCol = currCol + move[1];
  //   // for (let i = 0; i < 100; i++) {
  //   while (nextTile !== "S") {
  //     move = roundCorner(direction, map[currRow][currCol]);
  //     direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
  //     nextTile = map[currRow + move[0]][currCol + move[1]];
  //     //   `to ${nextTile} at ${currRow + move[0]}:${currCol + move[1]}`
  //     // );
  //     currRow = currRow + move[0];
  //     currCol = currCol + move[1];
  //     steps++;
  //   }
  //   total = steps / 2;
  // }

  function matchCount(str: string, regex: RegExp): number {
    return str?.match(regex)?.length ?? 0;
  }

  function sweep(
    map: Array<Array<string>>,
    rowIndex: number,
    colIndex: number
  ) {
    let isOutside = false;
    if (rowIndex > 0) {
      if (map[rowIndex - 1][colIndex] === ".") {
        isOutside = true;
      }
    }
    if (rowIndex < map.length - 1) {
      if (map[rowIndex + 1][colIndex] === ".") {
        isOutside = true;
      }
    }
    if (colIndex < colCount - 1) {
      if (map[rowIndex][colIndex + 1] === ".") {
        isOutside = true;
      }
    }
    if (colIndex > 0) {
      if (map[rowIndex][colIndex - 1] === ".") {
        isOutside = true;
      }
    }
    if (map[rowIndex][colIndex] === "O" && isOutside) {
      map[rowIndex][colIndex] = ".";
    }
  }

  // Part Two
  function processInput(inputText: string) {
    let inputData = inputText.split("\n");
    let startPosition = inputText.replace(/\n/g, "").indexOf("S");
    inputData.map((row, index) => {
      colCount = row.length;
      map.push(row.split(""));
    });
    let doppleganger: Array<Array<string>> = [];
    for (let i = 0; i < map.length; i++) {
      let row: Array<string> = new Array(colCount).fill("O");
      doppleganger.push(row);
    }
    let currRow = Math.floor(startPosition / colCount);
    let currCol = startPosition % colCount;
    doppleganger[currRow][currCol] = "*";
    let move = findPipe(currRow, currCol);
    let direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
    let nextTile = map[currRow + move[0]][currCol + move[1]];
    let steps = 1;
    currRow = currRow + move[0];
    currCol = currCol + move[1];
    while (nextTile !== "S") {
      doppleganger[currRow][currCol] = "*";
      move = roundCorner(direction, map[currRow][currCol]);
      direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
      nextTile = map[currRow + move[0]][currCol + move[1]];
      currRow = currRow + move[0];
      currCol = currCol + move[1];
      steps++;
    }
    doppleganger[0].map((col, index) => {
      if (col === "O") {
        doppleganger[0][index] = ".";
      }
    });
    doppleganger[doppleganger.length - 1].map((col, index) => {
      if (col === "O") {
        doppleganger[0][index] = ".";
      }
    });
    doppleganger.map((row, rowIndex) => {
      if (doppleganger[rowIndex][0] === "O") {
        doppleganger[rowIndex][0] = ".";
      }
      if (doppleganger[rowIndex][colCount - 1] === "O") {
        doppleganger[rowIndex][colCount - 1] = ".";
      }
    });

    doppleganger.map((row, rowIndex) => {
      row.map((col, colIndex) => {
        sweep(doppleganger, rowIndex, colIndex);
      });
      for (let colIndex = colCount - 1; colIndex >= 0; colIndex--) {
        sweep(doppleganger, rowIndex, colIndex);
      }
    });
    for (let rowIndex = doppleganger.length - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        sweep(doppleganger, rowIndex, colIndex);
      }
      for (let colIndex = colCount - 1; colIndex >= 0; colIndex--) {
        sweep(doppleganger, rowIndex, colIndex);
      }
    }
    console.log(doppleganger.join("\n"));
    doppleganger.map((row) => {
      row.map((col) => {
        total += col === "O" ? 1 : 0;
      });
    });
  }
</script>

<p><strong>{total}</strong></p>
<div class="flex flex-row">
  <div class="basis-3/5 text-xs"></div>
  <div class="basis-2/5">
    <p>{@html text}</p>
  </div>
</div>
