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

  async function getInput() {
    // const response = await fetch('day1/practice-part-one.txt');
    // const response = await fetch('day1/practice-part-two.txt');
    const response = await fetch("day1/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      let inputData = inputText.split("\n");
      retrieveValues(inputData);
    });
  });

  // Part One
  // function retrieveValues(inputData: Array<string>) {
  //     let total = 0;
  //     inputData.map((value: string, index: number) => {
  //         let numericString = value.replace(/[^0-9]/g, '').split('');
  //         let numericValue = parseInt('' + numericString[0] + numericString[numericString.length - 1], 10);
  //         total += numericValue;
  //     });
  //     console.log(total);
  // }

  // Part Two

  function retrieveValues(inputData: Array<string>) {
    let words = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    inputData.map((value: string, index: number) => {
      let numbersOnThisLine = new Array<number>();
      let lineString = "";
      value.split("").map((character: string, index: number) => {
        switch (character) {
          case "1":
            lineString = "";
            numbersOnThisLine.push(1);
            break;
          case "2":
            lineString = "";
            numbersOnThisLine.push(2);
            break;
          case "3":
            lineString = "";
            numbersOnThisLine.push(3);
            break;
          case "4":
            lineString = "";
            numbersOnThisLine.push(4);
            break;
          case "5":
            lineString = "";
            numbersOnThisLine.push(5);
            break;
          case "6":
            lineString = "";
            numbersOnThisLine.push(6);
            break;
          case "7":
            lineString = "";
            numbersOnThisLine.push(7);
            break;
          case "8":
            lineString = "";
            numbersOnThisLine.push(8);
            break;
          case "9":
            lineString = "";
            numbersOnThisLine.push(9);
            break;
          default:
            lineString += character;
            words.map((numberWord: string, index: number) => {
              let regEx = new RegExp(numberWord);
              if (regEx.test(lineString)) {
                numbersOnThisLine.push(index + 1);
                // leave the last letter, as it might be the start of another candidate
                lineString = lineString.substring(lineString.length - 1);
              }
            });
            break;
        }
      });
      let numericValue = parseInt(
        "" +
          numbersOnThisLine[0] +
          numbersOnThisLine[numbersOnThisLine.length - 1],
        10
      );
      total += numericValue;
      text += value + " => " + total + "<br>";
    });
  }
</script>

<div>
  <a href="/">Home</a>
  <p>{@html text}</p>
  <p><strong>{total}</strong></p>
</div>

<style>
</style>
