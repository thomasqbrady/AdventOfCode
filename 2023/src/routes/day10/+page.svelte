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
        // console.log(tileToCheck);
        if (pipeTiles.includes(tileToCheck)) {
          // console.log(roundCorner(direction, tileToCheck));
          return roundCorner(direction, tileToCheck);
        }
      }
    }
    return cardToMove.get("NOMOVE") ?? [0, 0];
  }

  // Part One
  // function processInput(inputText: string) {
  //   console.log(inputText);
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
  //   // console.log(`from ${currRow}:${currCol} can go`);
  //   // console.log(direction);
  //   // console.log(`to ${nextTile} at ${currRow + move[0]}:${currCol + move[1]}`);
  //   let steps = 1;
  //   currRow = currRow + move[0];
  //   currCol = currCol + move[1];
  //   // for (let i = 0; i < 100; i++) {
  //   while (nextTile !== "S") {
  //     move = roundCorner(direction, map[currRow][currCol]);
  //     direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
  //     nextTile = map[currRow + move[0]][currCol + move[1]];
  //     // console.log(`from ${currRow}:${currCol} can go`);
  //     // console.log(direction);
  //     // console.log(
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

  // Part Two
  function processInput(inputText: string) {
    console.log(inputText);
    let inputData = inputText.split("\n");
    let startPosition = inputText.replace(/\n/g, "").indexOf("S");
    inputData.map((row, index) => {
      colCount = row.length;
      map.push(row.split(""));
    });
    let doppleganger: Array<Array<string>> = [];
    for (let i = 0; i < map.length - 1; i++) {
      let row: Array<string> = new Array(colCount).fill("O");
      doppleganger.push(row);
    }
    let currRow = Math.floor(startPosition / colCount);
    let currCol = startPosition % colCount;
    doppleganger[currRow][currCol] = "*";
    let move = findPipe(currRow, currCol);
    let direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
    let nextTile = map[currRow + move[0]][currCol + move[1]];
    // console.log(`from ${currRow}:${currCol} can go`);
    // console.log(direction);
    // console.log(`to ${nextTile} at ${currRow + move[0]}:${currCol + move[1]}`);
    let steps = 1;
    currRow = currRow + move[0];
    currCol = currCol + move[1];
    // for (let i = 0; i < 100; i++) {
    while (nextTile !== "S") {
      doppleganger[currRow][currCol] = "*";
      move = roundCorner(direction, map[currRow][currCol]);
      direction = moveToCard.get(`[${move[0]}, ${move[1]}]`) ?? "NOMOVE";
      nextTile = map[currRow + move[0]][currCol + move[1]];
      // console.log(`from ${currRow}:${currCol} can go`);
      // console.log(direction);
      // console.log(
      //   `to ${nextTile} at ${currRow + move[0]}:${currCol + move[1]}`
      // );
      currRow = currRow + move[0];
      currCol = currCol + move[1];
      steps++;
    }
    console.log(doppleganger);
    // for (let row = 0; row < doppleganger.length - 1; row++) {
    //   let foundCol = false;
    //   for (let col = 0; col < colCount; col++) {
    //     if (doppleganger[row][col] === "*") {
    //       foundCol = true;
    //     }
    //     if (!foundCol) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    //   for (let col = colCount - 1; col >= 0; col--) {
    //     if (doppleganger[row][col] === "*") {
    //       foundCol = true;
    //     }
    //     if (!foundCol) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    // }
    // for (let row = doppleganger.length - 1; row >= 0; row--) {
    //   let foundCol = false;
    //   for (let col = 0; col < colCount; col++) {
    //     // console.log(row, col, doppleganger.length, colCount, doppleganger[row]);
    //     if (doppleganger[row][col] === "*") {
    //       foundCol = true;
    //     }
    //     if (!foundCol) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    //   for (let col = colCount - 1; col >= 0; col--) {
    //     if (doppleganger[row][col] === "*") {
    //       foundCol = true;
    //     }
    //     if (!foundCol) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    // }
    // for (let col = 0; col < colCount; col++) {
    //   let foundRow = false;
    //   for (let row = 0; row < doppleganger.length - 1; row++) {
    //     if (doppleganger[row][col] === "*") {
    //       foundRow = true;
    //     }
    //     if (!foundRow) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    //   for (let row = doppleganger.length - 1; row >= 0; row--) {
    //     if (doppleganger[row][col] === "*") {
    //       foundRow = true;
    //     }
    //     if (!foundRow) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    // }
    // for (let col = colCount - 1; col >= 0; col--) {
    //   let foundRow = false;
    //   for (let row = 0; row < doppleganger.length - 1; row++) {
    //     if (doppleganger[row][col] === "*") {
    //       foundRow = true;
    //     }
    //     if (!foundRow) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    //   for (let row = doppleganger.length - 1; row >= 0; row--) {
    //     if (doppleganger[row][col] === "*") {
    //       foundRow = true;
    //     }
    //     if (!foundRow) {
    //       doppleganger[row][col] = ".";
    //     }
    //   }
    // }

    // for (let row = 0; row < doppleganger.length - 1; row++) {
    //   let lastCol = ".";
    //   for (let col = 0; col < colCount; col++) {
    //     if (doppleganger[row][col] === "O" && lastCol === ".") {
    //       doppleganger[row][col] = ".";
    //       lastCol = ".";
    //     } else {
    //       lastCol = doppleganger[row][col];
    //     }
    //   }
    //   for (let col = colCount - 1; col >= 0; col--) {
    //     if (doppleganger[row][col] === "O" && lastCol === ".") {
    //       doppleganger[row][col] = ".";
    //       lastCol = ".";
    //     } else {
    //       lastCol = doppleganger[row][col];
    //     }
    //   }
    // }
    // for (let col = 0; col < colCount; col++) {
    //   let lastCol = ".";
    //   for (let row = 0; row < doppleganger.length - 1; row++) {
    //     if (doppleganger[row][col] === "O" && lastCol === ".") {
    //       doppleganger[row][col] = ".";
    //       lastCol = ".";
    //     } else {
    //       lastCol = doppleganger[row][col];
    //     }
    //   }
    //   for (let row = doppleganger.length - 1; row >= 0; row--) {
    //     if (doppleganger[row][col] === "O" && lastCol === ".") {
    //       doppleganger[row][col] = ".";
    //       lastCol = ".";
    //     } else {
    //       lastCol = doppleganger[row][col];
    //     }
    //   }
    // }

    // for (let row = 0; row < doppleganger.length; row++) {
    //   for (let col = 0; col < colCount; col++) {
    //     if (doppleganger[row][col] === "O") {
    //       for (let i = -1; i <= 1; i++) {
    //         for (let j = -1; j <= 1; j++) {
    //           let checkRow = row + i;
    //           let checkCol = col + j;
    //           if (checkRow < 0) checkRow = 0;
    //           if (checkRow >= doppleganger.length)
    //             checkRow = doppleganger.length - 1;
    //           if (checkCol < 0) checkCol = 0;
    //           if (checkCol >= colCount) checkCol = colCount - 1;
    //           if (doppleganger[checkRow][checkCol] === ".") {
    //             doppleganger[row][col] = ".";
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // doppleganger.map((row) => {
    //   console.log(JSON.stringify(row.join("")));
    // });
    // console.log(
    //   doppleganger
    //     .join("")
    //     .replace(/,/g, "")
    //     .replace(/\*O*./g, "")
    //     .replace(/\*/g, "")
    //     .replace(/\./g, "").length
    // );
  }
</script>

<div>
  <a href="/">Home</a>
  <p><strong>{total}</strong></p>
  <div class="flex flex-row">
    <div class="basis-3/5 text-xs"></div>
    <div class="basis-2/5">
      <p>{@html text}</p>
    </div>
  </div>
</div>
