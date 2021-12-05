// REMOVED THE SOLUTION TO PART ONE ACCIDENTALLY

const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

let commands = input.split('\n');

let position = { x: 0, y: 0, aim: 0};

for (let i = 0;i < commands.length;i++) {
  let command = commands[i].split(' ');
  let direction = command[0];
  let distance = parseInt(command[1], 10);
  switch (direction) {
    case 'forward' :
      position.x += distance;
      position.y += position.aim * distance;
      break;
    case 'down' :
      position.aim += distance;
      break;
    case 'up' :
      position.aim -= distance;
      break;
  }
}

console.log(position, position.x * position.y);