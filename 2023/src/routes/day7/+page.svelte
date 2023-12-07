<script lang="ts">
  import { onMount } from "svelte";

  let total = 0;
  let text = "";
  let inputArray: Array<string> = [];

  const values = new Map();
  for (let i = 2; i < 10; i++) {
    values.set(`${i}`, i);
  }
  values.set("T", 10);
  values.set("J", 11);
  values.set("Q", 12);
  values.set("K", 13);
  values.set("A", 14);

  type Hand = {
    cards: Array<string>;
    score: number;
    bid: number;
  };

  async function getInput() {
    // const response = await fetch("day7/practice-part-one.txt");
    // const response = await fetch('day7/practice-part-two.txt');
    const response = await fetch("day7/input.txt");
    return response.text();
  }

  onMount(() => {
    getInput().then((inputText) => {
      inputArray = inputText.split("\n");
      processInput(inputArray);
    });
  });

  function processHand(hand: string, bid: string, wildCards = false): Hand {
    let handMap = new Map();
    hand.split("").map((card: string) => {
      if (!handMap.has(card)) {
        handMap.set(card, 1);
      } else {
        const newCount = handMap.get(card) + 1;
        handMap.set(card, newCount);
      }
    });
    let counts = Array.from(handMap.values());
    let cardKeys = Array.from(handMap.keys());

    if (wildCards) {
      const wildCardCount = handMap.get("J");
      if (wildCardCount > 0 && wildCardCount < 5) {
        let index = cardKeys.indexOf("J");
        counts.splice(index, 1);
        let highestCount = counts.sort().splice(counts.length - 1, 1)[0];
        highestCount += wildCardCount;
        counts.push(highestCount);
      }
    }
    // high card
    let score = 1;
    if (counts.includes(5)) {
      // five of a kind
      score = 7;
    } else {
      if (counts.includes(4)) {
        // four of a kind
        score = 6;
      } else {
        if (counts.includes(3)) {
          if (counts.includes(2)) {
            // full house
            score = 5;
          } else {
            // three of a kind
            score = 4;
          }
        } else {
          if (counts.includes(2)) {
            if (JSON.stringify(counts.sort()) === "[1,2,2]") {
              // two pair
              score = 3;
            } else {
              // one pair
              score = 2;
            }
          }
        }
      }
    }
    let handModel: Hand = {
      cards: hand.split(""),
      score: score,
      bid: parseInt(bid, 10),
    };
    return handModel;
  }

  // Part One
  // function processInput(rounds: Array<string>) {
  //   let hands: Array<Hand> = rounds.map((round: string, index: number) => {
  //     let [cards, bid] = round.split(" ");
  //     let hand = processHand(cards, bid);
  //     text += `Hand: [${hand.cards}] score: ${hand.score}<br>`;
  //     return hand;
  //   });
  //   hands.sort((handA: Hand, handB: Hand) => {
  //     if (handB.score > handA.score) {
  //       return -1;
  //     }
  //     if (handA.score > handB.score) {
  //       return 1;
  //     }
  //     // hands are of same type
  //     for (let i = 0; i < 5; i++) {
  //       let cardAValue = values.get(handA.cards[i]);
  //       let cardBValue = values.get(handB.cards[i]);
  //       if (cardBValue > cardAValue) {
  //         return -1;
  //       }
  //       if (cardAValue > cardBValue) {
  //         return 1;
  //       }
  //     }
  //     text += `these are equal: ${handA.cards} & ${handB.cards}<br>`;
  //     return 0;
  //   });
  //   hands.forEach((hand: Hand, index: number) => {
  //     text += `Hand ${index + 1} bid: ${hand.bid}<br>`;
  //     total += (index + 1) * hand.bid;
  //   });
  // }

  // Part Two
  function processInput(rounds: Array<string>) {
    values.set("J", 1);
    let hands: Array<Hand> = rounds.map((round: string, index: number) => {
      let [cards, bid] = round.split(" ");
      let hand = processHand(cards, bid, true);
      text += `Hand: [${hand.cards}] score: ${hand.score}<br>`;
      return hand;
    });
    hands.sort((handA: Hand, handB: Hand) => {
      if (handB.score > handA.score) {
        return -1;
      }
      if (handA.score > handB.score) {
        return 1;
      }
      // hands are of same type
      for (let i = 0; i < 5; i++) {
        let cardAValue = values.get(handA.cards[i]);
        let cardBValue = values.get(handB.cards[i]);
        if (cardBValue > cardAValue) {
          return -1;
        }
        if (cardAValue > cardBValue) {
          return 1;
        }
      }
      text += `these are equal: ${handA.cards} & ${handB.cards}<br>`;
      return 0;
    });
    hands.forEach((hand: Hand, index: number) => {
      text += `Hand ${index + 1}: ${hand.cards} score: ${hand.score} bid: ${
        hand.bid
      } adds round score of ${(index + 1) * hand.bid}<br>`;
      total += (index + 1) * hand.bid;
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
