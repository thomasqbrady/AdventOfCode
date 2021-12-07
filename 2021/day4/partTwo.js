const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let inputLines = input.split('\n\n');
let calls = inputLines.shift().split(',');
let width = 5, height = 5;
let winningBoards = [];

function makeBoards(input) {
  let boards = {};
  input.forEach((boardInput, boardIndex) => {
    if (!boards[boardIndex]) {
      boards[boardIndex] = {
        rows: {},
        cols: {}
      }
    }
    boardInput.split('\n').forEach((boardInputLine, lineIndex) => {
      let numbers = boardInputLine.trim().replace(/\s+/g, ',').split(',');
      // console.log({numbers});
      numbers.forEach((number, columnIndex) => {
        if (!boards[boardIndex].rows[lineIndex]) {
          boards[boardIndex].rows[lineIndex] = {}
        }
        boards[boardIndex].rows[lineIndex][parseInt(number, 10)] = false;
        if (!boards[boardIndex].cols[columnIndex]) {
          boards[boardIndex].cols[columnIndex] = {}
        }
        boards[boardIndex].cols[columnIndex][parseInt(number, 10)] = false;
      });
    })
  });
  return boards;
}

function getUnmarkedNumbers(board) {
  let unmarked = [];
  for (let row in board.rows) {
    for (let num in board.rows[row]) {
      if (!board.rows[row][num]) {
        unmarked.push(num);
      }
    }
  }
  return unmarked;
}

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');

let boards = makeBoards(inputLines);

function checkForWinners(_boards) {
  let winners = []
  for (let board in _boards) {
    let winner;
    for (let row in _boards[board].rows) {
      let allCalled = true;
      // console.log({row});
      for (let num in _boards[board].rows[row]) {
        // console.log(_boards[board].rows[row][num]);
        if (!_boards[board].rows[row][num]) {
          if (board === '9') {
            // console.log(board, {row, num}, _boards[board].rows[row][num]);
          }
          allCalled = false;
          break;
        }
      }
      if (allCalled && winningBoards.indexOf(board) === -1) {
        console.log(`board ${board} wins with row ${row}`, _boards[board].rows[row]);
        winningBoards.push(board);
        winners.push({
          board: board,
          row: row,
          col: null
        });
      } else {
        for (let col in _boards[board].cols) {
          allCalled = true;
          for (let num in _boards[board].cols[col]) {
            if (!_boards[board].cols[col][num]) {
              allCalled = false;
              break;
            }
          }
          if (allCalled && winningBoards.indexOf(board) === -1) {
            winningBoards.push(board);
            console.log(`board ${board} wins with col ${col}`, _boards[board].cols[col]);
            winners.push({
              board: board,
              row: null,
              col: col
            });
          }
        }
      }
      // console.log('here');
    }
  }
  return winners;
}


calls.forEach((call, index) => {
  console.log({call});
  let winner;
  for (let board in boards) {
    for (let i = 0;i < width;i++) {
      // console.log(`board: ${board} row: ${i} has call: ${call}`, boards[board].rows['' + i].hasOwnProperty(call));
      if (boards[board].rows['' + i].hasOwnProperty(call)) {
        boards[board].rows['' + i][call] = true;
      }
    }
    for (let i = 0;i < height;i++) {
      // console.log(`board: ${board} column: ${i} has call: ${call}`, boards[board].cols['' + i].hasOwnProperty(call));
      if (boards[board].cols['' + i].hasOwnProperty(call)) {
        boards[board].cols['' + i][call] = true;
      }
    }
  }
  winners = checkForWinners(boards);
  winners.forEach((winner) => {
    let unmarked = getUnmarkedNumbers(boards[winner.board]);
    let total = unmarked.reduce((accum, current) => {
      return accum += parseInt(current, 10);
    }, 0); 
    console.log(call, winner, unmarked, total, parseInt(call, 10) * total);
  });
});

let json = JSON.stringify(boards);
fs.writeFile('./output.json', json, (err) =>{
  if (err) {
    console.error(1, err);
  }
});
console.log({winningBoards}, Object.keys(boards));
