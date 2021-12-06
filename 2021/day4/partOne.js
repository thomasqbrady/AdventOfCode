const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8');

let inputLines = input.split('\n\n');

let calls = inputLines.shift().split(',');

function makeBoards(input, width, height) {
  let boards = {};
  input.forEach((boardInput, boardIndex) => {
    if (!boards[boardIndex]) {
      boards[boardIndex] = {
        rows: {},
        columns: {}
      }
    }
    boardInput.split('\n').forEach((boardInputLine, lineIndex) => {
      let numbers = boardInputLine.split(' ');
      numbers.forEach()
      boards[boardIndex].rows[]
    })
  });
}
makeBoards(inputLines, 5, 5);