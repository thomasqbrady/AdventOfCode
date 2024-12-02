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
    const response = await fetch("day1/practice-part-one.txt");
    // const response = await fetch('day1/practice-part-two.txt');
    // const response = await fetch("day1/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  // Part One
  function processInput(inputData: Array<string>) {}

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
