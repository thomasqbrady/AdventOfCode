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
    // const response = await fetch('day2/practice-part-one.txt');
    // const response = await fetch('day2/practice-part-two.txt');
    const response = await fetch("day2/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      let inputData = inputText.split("\n");
      processInput(inputData);
    });
  });

  // Part One
  // function processInput(games: Array<string>) {
  // 	let maxRed = 12;
  // 	let maxGreen = 13;
  // 	let maxBlue = 14;
  // 	games.map((game: string) => {
  // 		let gameParts: Array<string> = game.split(':');
  // 		let gameID = gameParts[0].trim().split(' ')[1].trim();
  // 		let highestFoundRed = 0;
  // 		let highestFoundGreen = 0;
  // 		let highestFoundBlue = 0;
  // 		gameParts[1]
  // 			.trim()
  // 			.split(';')
  // 			.map((handful: string) => {
  // 				handful
  // 					.trim()
  // 					.split(',')
  // 					.map((colorCount: string) => {
  // 						let parts = colorCount.trim().split(' ');
  // 						let count = parseInt(parts[0].trim(), 10);
  // 						let color = parts[1].trim();
  // 						switch (color) {
  // 							case 'red':
  // 								highestFoundRed = count > highestFoundRed ? count : highestFoundRed;
  // 								break;
  // 							case 'green':
  // 								highestFoundGreen = count > highestFoundGreen ? count : highestFoundGreen;
  // 								break;
  // 							case 'blue':
  // 								highestFoundBlue = count > highestFoundBlue ? count : highestFoundBlue;
  // 								break;
  // 						}
  // 					});
  // 			});
  // 		if (highestFoundRed > maxRed || highestFoundGreen > maxGreen || highestFoundBlue > maxBlue) {
  // 			console.log(`game ${gameID} was not possible`);
  // 		} else {
  // 			total += parseInt(gameID, 10);
  // 		}
  // 	});
  // }

  // Part Two
  function processInput(games: Array<string>) {
    let maxRed = 12;
    let maxGreen = 13;
    let maxBlue = 14;
    games.map((game: string) => {
      let gameParts: Array<string> = game.split(":");
      let gameID = gameParts[0].trim().split(" ")[1].trim();
      let highestFoundRed = 0;
      let highestFoundGreen = 0;
      let highestFoundBlue = 0;
      gameParts[1]
        .trim()
        .split(";")
        .map((handful: string) => {
          handful
            .trim()
            .split(",")
            .map((colorCount: string) => {
              let parts = colorCount.trim().split(" ");
              let count = parseInt(parts[0].trim(), 10);
              let color = parts[1].trim();
              switch (color) {
                case "red":
                  highestFoundRed =
                    count > highestFoundRed ? count : highestFoundRed;
                  break;
                case "green":
                  highestFoundGreen =
                    count > highestFoundGreen ? count : highestFoundGreen;
                  break;
                case "blue":
                  highestFoundBlue =
                    count > highestFoundBlue ? count : highestFoundBlue;
                  break;
              }
            });
        });
      let gamePower = highestFoundRed * highestFoundGreen * highestFoundBlue;
      text += `Game ${gameID} highest red: ${highestFoundRed} green: ${highestFoundGreen} blue: ${highestFoundBlue}<br>`;
      total += gamePower;
    });
  }
</script>

<p>{@html text}</p>
<p><strong>{total}</strong></p>

<style>
</style>
