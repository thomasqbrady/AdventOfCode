export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/day10": [5],
		"/day11": [6],
		"/day12": [7],
		"/day13": [8],
		"/day14": [9],
		"/day15": [10],
		"/day16": [11],
		"/day17": [12],
		"/day18": [13],
		"/day1": [4],
		"/day2": [14],
		"/day3": [15],
		"/day4": [16],
		"/day5": [17],
		"/day6": [18],
		"/day7": [19],
		"/day8": [20],
		"/day9": [21],
		"/day": [3]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';