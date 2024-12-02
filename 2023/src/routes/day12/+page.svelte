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
    const response = await fetch("day12/practice-part-one.txt");
    // const response = await fetch('day12/practice-part-two.txt');
    // const response = await fetch("day12/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput([...inputArray]);
    });
  });

  // Part One
  // function processInput(possibilities: Array<string>) {
  //   let superPositionsExist = true;
  //   while (superPositionsExist) {
  //     let superPositionsFoundThisPass = false;
  //     possibilities.map((possibility: string, index) => {
  //       let superPositionIndex = possibility.indexOf("?");
  //       if (superPositionIndex > -1) {
  //         superPositionsFoundThisPass = true;
  //         const firstPart = possibility.substring(0, superPositionIndex);
  //         const secondPart = possibility.substring(superPositionIndex + 1);
  //         possibilities[index] = firstPart + "." + secondPart;
  //         let newPossibility = firstPart + "#" + secondPart;
  //         possibilities.push(newPossibility);
  //       }
  //     });
  //     superPositionsExist = superPositionsFoundThisPass;
  //   }
  //   possibilities.map((possibility, index) => {
  //     possibilities[index] = possibility
  //       .replace(/\.+/g, ".")
  //       .replace(/^\.+/g, "")
  //       .replace(/\.* /g, " ");
  //   });
  //   possibilities.map((possibility) => {
  //     const [str, countsStr] = possibility.split(" ");
  //     const found = str
  //       .replace(/(#)+/g, (match): string => {
  //         return `${match.length}`;
  //       })
  //       .replace(/\./g, ",");
  //     if (found === countsStr) {
  //       console.log("MATCH!!!");
  //     }
  //   });
  // }

  // Part Two
  function processInput(possibilities: Array<string>) {
    let superPositionsExist = true;
    possibilities = possibilities.map((possibility) => {
      const [positions, counts] = possibility.split(" ");
      return `${positions}?${positions}?${positions}?${positions}?${positions} ${counts}`;
    });
    while (superPositionsExist) {
      let superPositionsFoundThisPass = false;
      possibilities.map((possibility: string, index) => {
        let superPositionIndex = possibility.indexOf("?");
        if (superPositionIndex > -1) {
          superPositionsFoundThisPass = true;
          const firstPart = possibility.substring(0, superPositionIndex);
          const secondPart = possibility.substring(superPositionIndex + 1);
          possibilities[index] = firstPart + "." + secondPart;
          let newPossibility = firstPart + "#" + secondPart;
          possibilities.push(newPossibility);
        }
      });
      superPositionsExist = superPositionsFoundThisPass;
    }
    possibilities.map((possibility, index) => {
      possibilities[index] = possibility
        .replace(/\.+/g, ".")
        .replace(/^\.+/g, "")
        .replace(/\.* /g, " ");
    });
    possibilities.map((possibility) => {
      const [str, countsStr] = possibility.split(" ");
      const found = str
        .replace(/(#)+/g, (match): string => {
          return `${match.length}`;
        })
        .replace(/\./g, ",");
      if (found === countsStr) {
        console.log("MATCH!!!");
      }
    });
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
