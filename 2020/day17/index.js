const utils = require('../utils.js');
const log = utils.log;

let input = `...#...#
..##.#.#
###..#..
........
...##.#.
.#.####.
...####.
..##...#`;

// input = `.#.
// ..#
// ###`;

let world = new Map();

let layer = [];
let z = 0;
let w = 0;
input.split('\n').forEach((row, y) => {
	row.split('').forEach((cube, x) => {
		let isActive = cube == '#';
		let id = `${ x },${ y },${ z },${ w }`;
		world.set(id, isActive);
	});
});

// log(world);

function getNeighbors(cubeX, cubeY, cubeZ, cubeW, world) {
	let neighbors = [];
	for (let x = cubeX - 1;x <= cubeX + 1;x++) {
		for (let y = cubeY - 1;y <= cubeY + 1;y++) {
			for (let z = cubeZ - 1;z <= cubeZ + 1;z++) {
				for (let w = cubeW - 1;w <= cubeW + 1;w++) {
					// don't check the cube itself, just the neighbors
					if (z != cubeZ || y != cubeY || x != cubeX || w != cubeW) {
						let key = `${ x },${ y },${ z },${ w }`;
						if (world.has(key)) {
							neighbors.push(world.get(key));
						} else {
							neighbors.push(false);
						}
					}
				}
			}
		}
	}
	return neighbors;
}

function cycle(world) {
	let keys = world.keys();
	let minX = 0;
	let minY = 0;
	let minZ = 0;
	let minW = 0;

	let maxX = 0;
	let maxY = 0;
	let maxZ = 0;
	let maxW = 0;

	for (let key of keys) {
		let [x, y, z, w] = key.split(',').map(position => parseInt(position, 10));
		minX = (x < minX) ? x : minX;
		maxX = (x > maxX) ? x : maxX;
		minY = (y < minY) ? x : minY;
		maxY = (y > maxY) ? x : maxY;
		minZ = (z < minZ) ? x : minZ;
		maxZ = (z > maxZ) ? x : maxZ;
		minW = (w < minW) ? w : minW;
		maxW = (w > maxW) ? w : maxW;
	}
	const newWorld = new Map();
	for (let x = minX - 1;x <= maxX + 1;x++) {
		for (let y = minY - 1;y <= maxY + 1;y++) {
			for (let z = minZ - 1;z <= maxZ + 1;z++) {
				for (let w = minW - 1;w <= maxW + 1;w++) {
					let neighbors = getNeighbors(x, y, z, w, world);
					let activeNeighbors = neighbors.filter((neighbor) => {
						return neighbor
					});
					let key = `${ x },${ y },${ z },${ w }`;
					let onActiveCube = false;
					if (world.has(key)) {
						onActiveCube = world.get(key);
					}
					// log(onActiveCube, activeNeighbors.length);
					if (onActiveCube) {
						if (activeNeighbors.length == 2 || activeNeighbors.length == 3) {
							newWorld.set(key, true);
						} else {
							newWorld.set(key, false);
						}
					} else {
						if (activeNeighbors.length == 3) {
							newWorld.set(key, true);
						} else {
							newWorld.set(key, false);
						}
					}
				}
			}
		}
	}
	return newWorld;
}

function sumActiveCubes(world) {
	let sum = 0;
	let cubes = world.values();
	for (let cube of cubes) {
		if (cube) { 
			sum++;
		}
	}
	return sum;
}
log(world);
log (`sum at start: ${ sumActiveCubes(world) }`);
world = cycle(world);
// log(world);
log (`sum after round 1: ${ sumActiveCubes(world) }`);
world = cycle(world);
log (`sum after round 2: ${ sumActiveCubes(world) }`);
world = cycle(world);
log (`sum after round 3: ${ sumActiveCubes(world) }`);
world = cycle(world);
log (`sum after round 4: ${ sumActiveCubes(world) }`);
world = cycle(world);
log (`sum after round 5: ${ sumActiveCubes(world) }`);
world = cycle(world);
log (`sum after round 6: ${ sumActiveCubes(world) }`);
