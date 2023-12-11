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
    // const response = await fetch("day4/practice-part-one.txt");
    // const response = await fetch('day4/practice-part-two.txt');
    const response = await fetch("day4/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  // Part One
  // function processInput(lines: Array<string>) {
  //   lines.map((line: string) => {
  //     let cardValue = 0.5;
  //     let winnersAndHand = line.split(":")[1].trim().split("|");
  //     let winningNumbers = winnersAndHand[0].trim().split(" ");
  //     let hand = winnersAndHand[1].trim().split(" ");
  //     text += `winners: ${winningNumbers}<br>`;
  //     text += `hand: ${hand}<br>`;
  //     hand.map((heldNumber: string) => {
  //       if (heldNumber != "" && winningNumbers.includes(heldNumber)) {
  //         cardValue *= 2;
  //         text += `${heldNumber} is a winner! Card value is now ${cardValue}<br>`;
  //       }
  //     });
  //     if (cardValue > 0.5) {
  //       total += cardValue;
  //     }
  //   });
  // }

  // Part Two
  function processInput(lines: Array<string>) {
    let copies: Array<number> = Array(lines.length).fill(1);
    lines.map((line: string, index: number) => {
      text += `Card ${index + 1} (x${copies[index]})<br>`;
      let cardValue = 0;
      let winnersAndHand = line
        .replace(/\s+/g, " ")
        .split(":")[1]
        .trim()
        .split("|");
      let winningNumbers = winnersAndHand[0].trim().split(" ");
      let hand = winnersAndHand[1].trim().split(" ");
      // text += `winners: ${winningNumbers}<br>`;
      // text += `hand: ${hand}<br>`;
      hand.map((heldNumber: string) => {
        if (heldNumber != "" && winningNumbers.includes(heldNumber)) {
          cardValue += 1;
          // text += `${heldNumber} is a winner! Card value is now ${cardValue}<br>`;
        }
      });
      if (cardValue > 0) {
        text += `Adding ${cardValue} cards...<br>`;
        for (let i = 1; i <= cardValue; i++) {
          if (index + i < copies.length) {
            text += `Adding cop(y|ies) of card ${index + 1 + i}<br>`;
            copies[index + i] += copies[index];
          }
        }
      }
    });
    total = copies.reduce((acc, curr) => {
      return acc + curr;
    });
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
