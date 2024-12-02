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
    // const response = await fetch("day9/practice-part-one.txt");
    // const response = await fetch('day9/practice-part-two.txt');
    const response = await fetch("day9/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  // Part One
  // function processInput(inputData: Array<string>) {
  //   inputData.map((history) => {
  //     let histories: Array<Array<number>> = [];
  //     let values = history.split(" ").map((value) => parseInt(value, 10));
  //     histories.push(values);
  //     let working = true;
  //     while (working) {
  //       let values = histories[histories.length - 1];
  //       const notZero = (element: number) => {
  //         return element !== 0;
  //       };
  //       if (values.some(notZero)) {
  //         let newLayer: Array<number> = [];
  //         for (let i = 1; i < values.length; i++) {
  //           newLayer.push(values[i] - values[i - 1]);
  //         }
  //         histories.push(newLayer);
  //       } else {
  //         working = false;
  //       }
  //     }
  //     working = true;
  //     while (working) {
  //       if (histories.length == 1) {
  //         let history = histories[0];
  //         let prediction = history[history.length - 1];
  //         text += `predicted value: ${prediction}<br>`;
  //         total += prediction;
  //         break;
  //       }
  //       let diffs = histories[histories.length - 1];
  //       let previousLayer = histories[histories.length - 2];
  //       for (let i = 0; i < diffs.length - 1; i++) {
  //         previousLayer[i + 1] = previousLayer[i] + diffs[i];
  //       }
  //       previousLayer.push(
  //         previousLayer[previousLayer.length - 1] + diffs[diffs.length - 1]
  //       );
  //       histories.pop();
  //     }
  //   });
  // }

  // Part Two
  function processInput(inputData: Array<string>) {
    inputData.map((history) => {
      let histories: Array<Array<number>> = [];
      let values = history.split(" ").map((value) => parseInt(value, 10));
      histories.push(values);
      let working = true;
      while (working) {
        let values = histories[histories.length - 1];
        const notZero = (element: number) => {
          return element !== 0;
        };
        if (values.some(notZero)) {
          let newLayer: Array<number> = [];
          for (let i = 1; i < values.length; i++) {
            newLayer.push(values[i] - values[i - 1]);
          }
          histories.push(newLayer);
        } else {
          working = false;
        }
      }
      working = true;
      while (working) {
        if (histories.length == 1) {
          let history = histories[0];
          let prediction = history[0];
          text += `predicted value: ${prediction}<br>`;
          total += prediction;
          break;
        }
        let diffs = histories[histories.length - 1];
        let previousLayer = histories[histories.length - 2];
        for (let i = diffs.length - 1; i > 0; i--) {
          previousLayer[i] = previousLayer[i - 1] + diffs[i];
        }
        previousLayer.unshift(previousLayer[0] - diffs[0]);
        histories.pop();
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
