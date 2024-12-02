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
    const response = await fetch("day18/practice-part-one.txt");
    // const response = await fetch('day18/practice-part-two.txt');
    // const response = await fetch("day18/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  function replacer(): string {
    console.log(arguments);
    return Array(arguments[1].length).fill("@").join("");
  }

  // Part One
  function processInput(inputData: Array<string>) {
    let map = new Map();
    let x = 0,
      y = 0;
    inputData.map((instruction) => {
      let [direction, count, color] = instruction
        .replace(/[()]/g, "")
        .split(" ");
      let distance = parseInt(count, 10);
      switch (direction) {
        case "U":
          for (let i = 0; i < distance; i++) {
            y--;
            map.set(`${x}:${y}`, color);
          }
          break;
        case "R":
          for (let i = 0; i < distance; i++) {
            x++;
            map.set(`${x}:${y}`, color);
          }
          break;
        case "D":
          for (let i = 0; i < distance; i++) {
            y++;
            map.set(`${x}:${y}`, color);
          }
          break;
        case "L":
          for (let i = 0; i < distance; i++) {
            x--;
            map.set(`${x}:${y}`, color);
          }
          break;
      }
    });
    let topEdge = 0;
    let bottomEdge = 0;
    let leftEdge = 0;
    let rightEdge = 0;
    let addresses = Array.from(map.keys()).sort((left, right) => {
      const [leftXStr, leftYStr] = left.split(":");
      const [rightXStr, rightYStr] = right.split(":");
      const leftX = parseInt(leftXStr, 10);
      const leftY = parseInt(leftYStr, 10);
      const rightX = parseInt(rightXStr, 10);
      const rightY = parseInt(rightYStr, 10);
      let leftMost = Math.min(leftX, rightX);
      let rightMost = Math.max(leftX, rightX);
      let topMost = Math.min(leftY, rightY);
      let bottomMost = Math.max(leftY, rightY);
      topEdge = topEdge < topMost ? topEdge : topMost;
      leftEdge = leftEdge < leftMost ? leftEdge : leftMost;
      rightEdge = rightEdge > rightMost ? rightEdge : rightMost;
      bottomEdge = bottomEdge > bottomMost ? bottomEdge : bottomMost;
      if (leftY < rightY) {
        return -1;
      } else {
        if (leftY === rightY) {
          if (leftX < rightX) {
            return -1;
          }
        }
      }
      // console.log(1);
      return 1;
    });
    console.log({ topEdge, rightEdge, bottomEdge, leftEdge });
    let rows: Array<string> = [];
    for (let loopY = topEdge; loopY <= bottomEdge; loopY++) {
      let row = "";
      for (let loopX = leftEdge; loopX <= rightEdge; loopX++) {
        if (map.get(`${loopX}:${loopY}`)) {
          row += "#";
        } else {
          row += ".";
          map.set(`${loopX}:${loopY}`, 0);
        }
      }
      log(row);
      rows.push(row);
    }
    log("========================");
    log("========================");
    log("========================");
    rows.push(".#...#..#...#..");
    let count = 0;
    let lastCharacter = "";
    let final: Array<string> = [];
    rows.map((row) => {
      let inside = false;
      let replacementRow = '';
      row.split("").map((character, index) => {
        // log(character);
        let nextCharacter = row.length >= index + 1 ? row[index + 1] : "";
        switch (character) {
          case "#":
            if (
              (lastCharacter! += "#") ||
              (lastCharacter === "#" && nextCharacter === ".")
            ) {
              inside = !inside;
            }
            replacementRow += '#';
            break;
          case ".":
            if (inside) {
              replacementRow += '#';
            } else {
              replacementRow += '.';
            }
            break;
        }
        lastCharacter = character;
      });
      log(replacementRow);
      final.push(replacementRow);
    });

    total = count;
    // for (let loopY = topEdge; loopY <= bottomEdge; loopY++) {
    //   for (let loopX = leftEdge; loopX <= rightEdge; loopX++) {
    //     if (map.get(`${loopX}:${loopY}`) === 0) {
    //       let insideLeft = false;
    //       let insideUp = false;
    //       let insideDown = false;
    //       let insideRight = false;
    //       for (let searchX = loopX; searchX > leftEdge - 1; searchX--) {
    //         if (map.get(`${searchX}:${loopY}`)) {
    //           insideLeft = true;
    //         }
    //       }
    //       for (let searchX = loopX; searchX <= rightEdge; searchX++) {
    //         if (map.get(`${searchX}:${loopY}`)) {
    //           insideRight = true;
    //         }
    //       }
    //       for (let searchY = loopY; searchY > topEdge - 1; searchY--) {
    //         if (map.get(`${loopX}:${searchY}`)) {
    //           insideUp = true;
    //         }
    //       }
    //       for (let searchY = loopY; searchY <= bottomEdge; searchY++) {
    //         if (map.get(`${loopX}:${searchY}`)) {
    //           insideDown = true;
    //         }
    //       }
    //       if (insideDown && insideLeft && insideRight && insideUp) {
    //         map.set(`${loopX}:${loopY}`, 1);
    //       }
    //     }
    //   }
    // }
    // for (let loopY = topEdge; loopY <= bottomEdge; loopY++) {
    //   let row = "";
    //   for (let loopX = leftEdge; loopX <= rightEdge; loopX++) {
    //     if (map.get(`${loopX}:${loopY}`)) {
    //       row += "#";
    //     } else {
    //       row += ".";
    //     }
    //   }
    //   log(row);
    // }
    // let tiles = Array.from(map.values());
    // let cubicMeters = 0;
    // tiles.map((tile) => {
    //   if (tile !== 0) {
    //     // console.log(tile, cubicMeters);
    //     cubicMeters++;
    //   }
    // });
    // total = cubicMeters;
  }

  // Part Two
</script>

<p><strong>{total}</strong></p>
<div class="flex flex-row">
  <div class="basis-3/5">
    {#each inputArray as line}
      <p class="font-mono">{line}</p>
    {/each}
  </div>
  <div class="basis-2/5 text-[8px]">
    <p>{@html text}</p>
  </div>
</div>
