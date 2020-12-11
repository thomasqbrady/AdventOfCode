const utils = require('../utils.js');
const log = utils.log;

let input = `165
78
151
15
138
97
152
64
4
111
7
90
91
156
73
113
93
135
100
70
119
54
80
170
139
33
123
92
86
57
39
173
22
106
166
142
53
96
158
63
51
81
46
36
126
59
98
2
16
141
120
35
140
99
121
122
58
1
60
47
10
87
103
42
132
17
75
12
29
112
3
145
131
18
153
74
161
174
68
34
21
24
85
164
52
69
65
45
109
148
11
23
129
84
167
27
28
116
110
79
48
32
157
130`;

// input = `19
// 16
// 15
// 12
// 11
// 10
// 7
// 6
// 5
// 4
// 1`;

// input = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3`;

let differences = {1: 0, 2: 0, 3: 0};
let adapters = input.split('\n');

adapters = utils.arrayStrToNum(adapters);
adapters = utils.numSort(adapters);

adapters = [0, ...adapters, adapters[adapters.length - 1] + 3];

function challengeOne(adapters) {
  adapters.forEach((adapter, index) => {
    if (index < adapters.length - 1) {
      differences[adapters[index + 1] - adapter]++;
    }
  });
  utils.log(`Challenge One: ${ differences[1] * differences[3] }`);
}

challengeOne(adapters);

console.log('--------------');

function countCombinations(list, memory = {}) {
  let key = list.join(',');
  let count = 1;
  if (memory[key]) {
    return memory[key];
  }
  for (let i=0;i < list.length - 2;i++) {
    if (list[i + 2] - list[i] <= 3) {
      let list2 = list.slice(i, i + 1).concat(list.slice(i + 2));
      count += countCombinations(list2, memory);
    }
  }
  memory[key] = count;
  return count;
}

utils.log(`Challenge Two: ${ countCombinations(adapters) }`);