<script lang="ts">
  import { onMount } from "svelte";

  let total = 0;
  let text = "";

  async function getInput() {
    // const response = await fetch('day1/practice-part-one.txt');
    // const response = await fetch('day1/practice-part-two.txt');
    const response = await fetch("day1/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      let inputData = inputText.split("\n");
      processInput(inputData);
    });
  });

  // Part One
  function processInput(inputData: Array<string>) {}

  // Part Two
</script>

<div>
  <a href="/">Home</a>
  <p>{@html text}</p>
  <p><strong>{total}</strong></p>
</div>

<style>
</style>
