<script lang="ts">
  import { onMount } from "svelte";

  let total = 0;
  let text = "";
  let inputArray: Array<string> = [];

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
