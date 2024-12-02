const _Graph = require("node-dijkstra");

const fs = require("fs");
const input = fs.readFileSync("static/day17/practice-part-one.txt", "utf8");
// const input = fs.readFileSync("static/day17/input.txt", "utf8");

let total = 0;
let text = "";
let inputArray = [];
const graph = new _Graph();
const visited = new Map();
const created = new Map();
const sourceNodeName = "0:0";
let destinationNodeName;

function log() {
  text += arguments + "<br>";
}

function resetDistances(origDistances, direction) {
  switch (direction) {
    case "north":
      return {
        north: origDistances.north + 1,
        east: 0,
        west: 0,
        south: 0,
      };
    case "east":
      return {
        east: origDistances.east + 1,
        west: 0,
        south: 0,
        north: 0,
      };
    case "south":
      return {
        south: origDistances.south + 1,
        west: 0,
        north: 0,
        east: 0,
      };
    case "west":
      return {
        west: origDistances.west + 1,
        south: 0,
        north: 0,
        east: 0,
      };
  }
  return {
    north: 0,
    east: 0,
    south: 0,
    west: 0,
  };
}

function navigate(graph, cellsToBeChecked, rows) {
  let cellToCheck = cellsToBeChecked.shift() ?? {
    x: 0,
    y: 0,
    cameFrom: "",
    distances: { north: 0, east: 0, south: 0, west: 0 },
  };
  let x = cellToCheck.x;
  let y = cellToCheck.y;
  let nodeName = `${x}:${y}`;
  if (visited.get(nodeName)) {
    return;
  }
  let destX = rows[0].length - 1;
  let destY = rows.length - 1;
  let connectedNodes = {};
  //   console.log(
  //     `checking cell ${x}:${y}, came from ${cellToCheck.cameFrom} dest: ${destX}:${destY}`
  //   );
  //   console.log(
  //     `distances traveled: n(${cellToCheck.distances.north}) e(${cellToCheck.distances.east}) s(${cellToCheck.distances.south}) w(${cellToCheck.distances.west})`
  //   );
  if (
    cellToCheck.distances.north <= 3 &&
    y > 0 &&
    cellToCheck.cameFrom !== "north"
  ) {
    // console.log("can go north");
    connectedNodes[`${x}:${y - 1}`] = parseInt(rows[y - 1][x], 10);
    cellsToBeChecked.push({
      x: x,
      y: y - 1,
      cameFrom: "south",
      distances: resetDistances(cellToCheck.distances, "north"),
    });
    // console.log(JSON.stringify(cellsToBeChecked));
  }
  if (
    cellToCheck.distances.east <= 3 &&
    x < destX &&
    cellToCheck.cameFrom !== "east"
  ) {
    // console.log("can go east");
    connectedNodes[`${x + 1}:${y}`] = parseInt(rows[y][x + 1], 10);
    cellsToBeChecked.push({
      x: x + 1,
      y: y,
      cameFrom: "west",
      distances: resetDistances(cellToCheck.distances, "east"),
    });
    // console.log(JSON.stringify(cellsToBeChecked));
  }
  if (
    cellToCheck.distances.south <= 3 &&
    y < destY &&
    cellToCheck.cameFrom !== "south"
  ) {
    // console.log("can go south");
    connectedNodes[`${x}:${y + 1}`] = parseInt(rows[y + 1][x], 10);
    cellsToBeChecked.push({
      x: x,
      y: y + 1,
      cameFrom: "north",
      distances: resetDistances(cellToCheck.distances, "south"),
    });
    // console.log(JSON.stringify(cellsToBeChecked));
  }
  if (
    cellToCheck.distances.west <= 3 &&
    x > 0 &&
    cellToCheck.cameFrom !== "west"
  ) {
    // console.log("can go west");
    connectedNodes[`${x - 1}:${y}`] = parseInt(rows[y][x - 1], 10);
    cellsToBeChecked.push({
      x: x - 1,
      y: y,
      cameFrom: "east",
      distances: resetDistances(cellToCheck.distances, "west"),
    });
    // console.log(JSON.stringify(cellsToBeChecked));
  }
  graph.addNode(nodeName, connectedNodes);
  visited.set(nodeName, 1);
}

// Part One
function processInput(inputData) {
  let distances = {
    north: 0,
    east: 0,
    south: 0,
    west: 0,
  };

  let cellsToBeChecked = [{ x: 0, y: 0, cameFrom: "", distances: distances }];
  while (cellsToBeChecked.length > 0) {
    // for (let i = 0; i < 1000; i++) {
    // if (cellsToBeChecked[0].x == )
    navigate(graph, cellsToBeChecked, inputData);
  }
  let destX = inputData[0].length - 1;
  let destY = inputData.length - 1;
  destinationNodeName = `${destX}:${destY}`;
  console.log(graph);
  console.log(graph.path(sourceNodeName, destinationNodeName, { cost: true }));
}

processInput(input.split("\n"));
