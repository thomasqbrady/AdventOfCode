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
  let inputText: string = "";

  function log(...stuff: Array<any>) {
    text += stuff + "<br>";
  }

  async function getInput() {
    // const response = await fetch("day15/practice-part-one.txt");
    // const response = await fetch("day15/practice-part-two.txt");
    const response = await fetch("day15/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputTextStr) => {
      inputText = inputTextStr;
      processInput(inputText);
    });
  });

  // Part One
  // function processInput(sequence: string) {
  //   sequence.split(",").map((segment) => {
  //     let segmentTotal = 0;
  //     for (let i = 0; i < segment.length; i++) {
  //       // console.log("<<<<<");
  //       // console.log(segmentTotal, segment.charCodeAt(i));
  //       segmentTotal += segment.charCodeAt(i);
  //       // console.log(segmentTotal);
  //       segmentTotal *= 17;
  //       // console.log(segmentTotal);
  //       segmentTotal = segmentTotal % 256;
  //       console.log(segment[i], segmentTotal);
  //       console.log(">>>>>");
  //     }
  //     total += segmentTotal;
  //   });
  // }

  function hash(segment: string): number {
    let segmentTotal = 0;
    for (let i = 0; i < segment.length; i++) {
      // console.log("<<<<<");
      // console.log(segmentTotal, segment.charCodeAt(i));
      segmentTotal += segment.charCodeAt(i);
      // console.log(segmentTotal);
      segmentTotal *= 17;
      // console.log(segmentTotal);
      segmentTotal = segmentTotal % 256;
    }
    return segmentTotal;
  }

  // Part Two
  function processInput(sequence: string) {
    let map = new Map();
    sequence.split(",").map((lensOperation, index) => {
      // console.log("lensOp", lensOperation, index);
      // if (index > 3) {
      //   console.log("STOP");
      //   return;
      // }
      let removeIndex = lensOperation.indexOf("-");
      let label = "",
        focalLength = "";
      if (removeIndex > -1) {
        [label, focalLength] = lensOperation.split("-");
      } else {
        [label, focalLength] = lensOperation.split("=");
      }
      let boxNumber = hash(label);
      let box = map.get(boxNumber);
      if (removeIndex > -1) {
        if (box) {
          console.log("remove", label, `from box ${boxNumber}`, box);
          let removalIndex = box[0].indexOf(label);
          if (removalIndex > -1) {
            // console.log("removing", label);
            box[0].splice(removalIndex, 1);
            box[1].splice(removalIndex, 1);
          } else {
            // console.log("did not need to remove");
          }
        }
      } else {
        if (!box) {
          // console.log("new box", boxNumber);
          // console.log("add", label, `to box ${boxNumber}`);
          map.set(boxNumber, [[label], [focalLength]]);
        } else {
          let foundIndex = box[0].indexOf(label);
          if (foundIndex > -1) {
            // console.log("replace", label, `in box ${boxNumber}`);
            box[1][foundIndex] = focalLength;
          } else {
            // console.log("add", label, `to box ${boxNumber}`);
            box[0].push(label);
            box[1].push(focalLength);
          }
        }
      }
      console.log(map);
    });
    map.forEach((box, boxNumber) => {
      let boxMultiplier = 1 + boxNumber;
      box[1].forEach((focalLength: number, index: number) => {
        let focalPower = boxMultiplier * (1 + index) * focalLength;
        console.log(
          `${box[0][index]}: ${boxMultiplier} (box ${boxNumber}) * ${
            1 + index
          } (slot) * ${focalLength} (focal length) = ${focalPower}`
        );
        total += focalPower;
      });
    });
  }
</script>

<p><strong>{total}</strong></p>
<div class="flex flex-row">
  <div class="basis-3/5 text-xs">
    <p class="font-mono">{inputText}</p>
  </div>
  <div class="basis-2/5">
    <p>{@html text}</p>
  </div>
</div>
