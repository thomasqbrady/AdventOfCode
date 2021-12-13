const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');


function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}


let lines = input.split('\n');

let map = {};
let solutions = 0;

lines.forEach((passage) => {
  let rooms = passage.split('-');
  let firstRoom = rooms[0];
  let secondRoom = rooms[1];
  if (!map[firstRoom]) {
    map[firstRoom] = [];
  }
  if (!map[secondRoom]) {
    map[secondRoom] = [];
  }
  map[firstRoom].push(secondRoom);
  map[secondRoom].push(firstRoom);
});

// console.log({map});

function findPaths(room, path) {
  // console.log(path);
  if (room === 'end') {
    console.log('found end', path);
    solutions++;
    return path;
  }
  if (room === room.toLowerCase() && path.includes(room)) {
    // console.log('been here before... dead end', room, path);
    return path;
  }
  path.push(room);
  let waysForward = map[room];
  waysForward.forEach((nextRoom) => {
    // console.log(room, nextRoom);
    return findPaths(nextRoom, [...path]);
  });
}

findPaths('start', []);

console.log({solutions});