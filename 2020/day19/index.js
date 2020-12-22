const utils = require('../utils.js');
const log = utils.log;

let input = `101: 126 91 | 59 129
106: 91 84 | 129 113
0: 8 11
84: 91 86 | 129 91
72: 44 129 | 69 91
135: 91 129 | 129 91
133: 91 50 | 129 29
48: 129 5 | 91 27
39: 129 129 | 129 91
40: 91 125 | 129 71
134: 91 129 | 129 86
131: 113 91 | 90 129
12: 129 30 | 91 39
59: 88 91 | 95 129
116: 91 91 | 129 129
127: 30 129 | 95 91
118: 91 122 | 129 105
107: 123 91 | 68 129
11: 42 31
71: 52 129 | 103 91
50: 129 80 | 91 136
56: 91 39 | 129 54
53: 91 10 | 129 49
31: 108 91 | 85 129
43: 113 91 | 95 129
54: 91 129
37: 3 129 | 118 91
75: 70 91 | 57 129
51: 129 131 | 91 106
93: 15 129 | 81 91
41: 36 129 | 53 91
55: 60 129 | 98 91
2: 64 129 | 77 91
58: 129 88 | 91 47
114: 129 2 | 91 41
60: 129 95 | 91 84
132: 124 129 | 59 91
4: 129 104 | 91 9
94: 91 84 | 129 88
128: 91 54 | 129 84
100: 97 91 | 89 129
78: 28 91 | 65 129
117: 129 135 | 91 30
125: 87 91 | 59 129
22: 129 113 | 91 88
57: 91 25 | 129 73
44: 61 129 | 1 91
61: 131 129 | 18 91
90: 129 129 | 91 86
95: 129 129
80: 91 115 | 129 127
5: 91 109 | 129 39
15: 129 83 | 91 51
103: 129 54 | 91 54
126: 95 91
121: 114 129 | 133 91
129: "a"
70: 129 130 | 91 48
79: 88 129 | 95 91
99: 86 88
73: 94 91 | 92 129
34: 26 91 | 47 129
91: "b"
18: 91 135 | 129 134
98: 91 54 | 129 39
49: 129 30 | 91 30
46: 129 39 | 91 134
89: 91 66 | 129 37
42: 100 129 | 121 91
30: 129 91
96: 91 14 | 129 58
123: 88 91 | 47 129
85: 120 91 | 75 129
36: 129 10 | 91 76
102: 129 99 | 91 117
38: 129 134 | 91 30
28: 30 129 | 30 91
29: 129 96 | 91 13
52: 91 109 | 129 54
47: 91 129 | 91 91
3: 91 127 | 129 67
130: 23 129 | 35 91
27: 54 91 | 39 129
62: 91 109 | 129 135
66: 129 78 | 91 107
20: 95 129 | 134 91
21: 90 91 | 135 129
45: 91 90 | 129 30
83: 22 129 | 111 91
109: 86 86
19: 102 91 | 55 129
82: 91 95 | 129 88
69: 132 91 | 101 129
124: 129 135 | 91 134
6: 33 129 | 34 91
35: 54 129 | 113 91
64: 91 63 | 129 79
120: 91 40 | 129 4
17: 91 119 | 129 12
110: 129 112 | 91 17
26: 129 91 | 91 91
97: 91 19 | 129 110
115: 91 135 | 129 90
16: 39 91 | 54 129
9: 82 129 | 16 91
74: 134 129 | 47 91
108: 129 93 | 91 72
25: 129 62 | 91 45
81: 91 6 | 129 24
10: 91 90 | 129 54
65: 95 129 | 30 91
113: 91 91
112: 91 74 | 129 52
88: 129 86 | 91 91
13: 38 91 | 21 129
32: 86 39
14: 91 88 | 129 95
67: 113 129 | 54 91
23: 54 129 | 30 91
111: 47 129 | 134 91
104: 32 91 | 43 129
68: 129 90 | 91 30
77: 46 129 | 23 91
7: 86 90
86: 129 | 91
87: 90 129 | 26 91
24: 129 56 | 91 128
119: 129 47 | 91 109
8: 42
92: 91 90 | 129 134
122: 129 47 | 91 134
1: 129 7 | 91 20
63: 91 134 | 129 30
136: 91 115 | 129 7
76: 91 113 | 129 135
33: 129 116 | 91 54
105: 91 88 | 129 109

babaaaabbbbababaaaabaabb
aaabaaababbaaabbbbbbabaabbaabababababbaa
aaabbbbabbabaaaabbaabaab
babaabbabbbbbaabbabaabab
abaabaabbbabaabbabbbabab
abbaababbbababbabbaabaabaaabaaabbbbbbbba
bbbbabbbbbaaaabbbbbbabaabbabbbaaaabbaaabbaabbbabbaaaabaa
bbbbababaaabbababaaaabab
bbbabababaabbaaaabbbaaaa
aaabbbbaaaabaabaabaababbbaabbaab
bbabbaabbabbbbabaaabaaaa
bbbaaababbaabbbabaaabbbb
baabbbaabaaabbaabaabbbabaaaaabbbaabbbbbababbaabbbbbabaababbbbbbabbbabaaaaabaabbbababaaaa
abbabababaaaabbabbabbbbbabaaababaaaaaabb
aabbaabbbaabbbbaababbbbbbbbbaaaa
abaaabbbbababbabbaaabbaa
bbbaababaabaaabaabbaaabbaaaaabbbbbbbabbabaabaaaa
bbaaabaaabbaabbbabaaaaaa
abbaabaaababababbabaabab
bbbbabaaaabbabbababbbaba
abaababbaaabbbbbbaaabbabbaabbbaaaababaaababbbabbbbbbbbbb
baaabbababaababbbbbbabaaabbaabba
aaaabababbbbaababababbbbabbaabababbaaabbbabbaabb
baaaaabaabbbbabaabaabbaa
abaaabbaababaaaaaabaaaaa
bbaabbbbbbbaaabbaaabaabb
baaaaaaaabaaabbabaaaaaab
ababaabbbbaabbbbbabbaabb
ababaabbabaabbbbbbaaaabbaaaaaabbabaaaaaa
bbbbbbaaaabbabbabbabaabbbaabaaabaaaabaabaaabbbabaababbbb
babbbaaaaaabbabbbaababbaabaabaabaabbaabaaaaaabaabababaab
bbbaabaabaabbaaabbbbbbaaabbaaaba
abaabbbbbbbabbbbbbbaaabaabbbbbabaabaabbb
abbbaaabbbabbbbbababbaab
bbabbbaaabbbbabaaaaabbbbaaaaababbabbbbbaababaabaabaababa
aababaaabbabbbbabababbabaaaabbbbbbbbbbbabbbaabbabaaabbbbaaabbabb
abababbbbababbbbaabbabbabbababbb
abbabbaabbaabbbbbaabbaaaaabbaaaabbbaabbabbbbaabbaabbabab
aabababaabaaabbabababbbbbbbbaaba
bbabbabbbbaabbaaaaaabbbbbbababaabbaababa
bbaabaababaaabbabbbbbaababaabaabbaabaabb
aababbaabbbbaababaaabaab
baabaabaaabbabaaaaababbb
aaaabbbbaabbaaabbbaabbbaabbabbaabbaaaabbbbaaaababababababaaaaaab
baaaabbabaaabbbaaabaabab
aabbabbaaabbabbbabbbbaaa
aaabbbbbbaaaabbabaabbaab
babaabbaabbbaaababbbbbaa
abaababbabaabbabbaaababbbabaaaaa
bbaababbbbbabbbbbababbba
aababbaaaaabbbaaaaababbabbbababbbbaababbabaaaabbaabbabaa
aaabbabbababaaaabbaabaaa
bbaabbaaabababbbbbabaaaabaaabbabababaaaaababbbaaababbabb
aabaaabaaababbaabbaabbbbababababbababbaa
babaaabbbbabaabbbbaababbbaaaaabb
bbbbbabaaaaaabbababbabaabbaaabbb
aaabbbbabbaabaabaabaabaa
abababaaaaaabababaabaabb
baabbabaabbbaaabbabbbbbb
abababbbaaabbbbbbbaabaaa
abaaabbbbbabaaaabaaaabab
aababababaaabbabbbaaaaba
abababbbbbbbbaabbabbaaaa
bbaabbaabaabaabbbabaaababbaaabaababbbaba
aaababaabbabaaaaabbabbbaabbabbbbababbbbbbbabbbabaaabbaaa
abbabababbbbababbbaaabaa
babbbbbaabaaabbbabbaaaababaabbbbbbabbabbbbbabbaa
baabbabbaaabaaabbaabbbbbbaabbbabaabaabaaaabbaababaaaabaaaaaababbbbbbbaaabaaaabbb
babaababbabbaabaaaabaabb
bbbababababbaaabaabbbaaa
bbabaaabababaabababbbbaa
ababbbbabbbaabbaabbaabbaabbaaababaaaaaaa
aabbabbbbbaabbbbaaabbbbbaaabbabbabbbaaaaabbaaababaaaaabb
aaaaababbabbbaabbaababbbbabaaaaabbabbaabbbabbaab
babbbbbaababaaaaaaababbaabaaaaaabbababaa
babaabbababbbbbaaabbbabb
aabbaabbbbbaabababaaaaba
aaabbababbbbababaababbab
abbabbbabbbaaabbaaabaababbabbbaabbaabaaababbbaaa
aaababbaabbbabaaabababbbbbbbabbbbabaabbb
abbaaaabaaaaaaabbabaabaa
aaaabaababaaababbabbabab
aabaabaaaaaaaaabbbbbbaabbaabbbbaabaaaabbaabaabbbbaababbb
abaababbbbbaaabbbabbaaabbbbbaaab
ababaabaabaaabababaaabbbabaaaabbaaaaaaabaaaababbabbbaaaaaaababbb
bbbbbabbbbbaaabbabbbbaaa
abbaabaabaababaaabbaaaabbbababbabbabbbab
babbbaababbbaabaaaabbbbabbbbbaabaabbabaa
bbabaabaaaaabbaabaaabaaa
aabaaabbbbbbbbabaabbbabb
abaababbabbbaabaabbbaaabbabbbbaa
babbbaabaaaabbbbbaaabbbb
bababaaaababbababbbaabbaabaaaabb
ababaababbbbaaabaaaaabaababbaabbaaaabbabbbabbbbaabaaaababaaaabbb
abbaaabbbaaaababaaaabbababbaaabaaabbbaabbababaab
baabbbbaababaabbaabbabbbaaabbabaaabaaaaabbbbaaab
bbaabbbabbaaaabbaabbbbbabbabbbabbbaaabab
babababbbbabaaaabaaababababbaabb
baaabbbabbbbabababbaaaba
baaabbabbbabbbbbaabbabaa
bbaabbbababbbabbbabaaaaabbabaaba
bbaabbaaaabbbbbabbbbabbbaaaabbab
baaabababbbaaababaabbabb
aaaaababbbabbbbabaabaabaabbababb
babaabbabbabaaaaababaabaaaaaaaaa
abbbaabaaaaabaababbbabbabbbaaabbaaabaabb
bbabbbaaaaabaababababbbbbbbbaabbaabababb
abbabbbaabbababbabaabbba
aaaaababbbaabbbaabbababaaabaababaaababbb
aaabaaabbabbaaababbabbaabbabbaab
aaabababbaabaaabbaabbaab
babbbbaaaaaaaabbabababaabbabbabbaaababaababbaababbaaaaaa
babaaaabaababbaabaabbababbbbabababababbaaaaabbbabaaabbaa
aabbbbabbabbbaaabbbaababbbaababbabaaabbbbbbbbaaabababaabbbbbbaabbbbaaaba
aaabaabaaaaaaaababaababbbaaabaaababaabaa
abbbabbaabbbabaaaabababb
abababaaabbbabaabbabababaaaaabbbbbabbbbbbbbabaabaababaabbabababaabbbabab
bbbbbbababbbabaaabbaabba
aabaaabbbbaaaaaaaabbabaa
aabaaababbbbabababababbbaabaabbabaababab
ababbbaaaaababbabababbabaababaabbbbbaaaa
aabbaaabbaaaabbbaaaaabaaaaaaaaaa
bababbababbaaaababbabbbbbbaababbbbaabaaa
abaabaaaaabaaabbabbbabab
bbbababbaabbaababbaaaaaabbaaaaab
aabbbaabbbbbaaaaaaaabbabbaabaabbbbabbbbabaaaaaaaaaabbabbbaaaabbb
babababbabbababaaaabbbaabaaabaaaaaabaabb
baabbaaaaabbaaabbbaabbab
aaaaabbbbabbbaabbaaaaaab
aabbbbaabbaabbbbabbbbaab
bbbbabaababbbabbbbabaabbbaabbababbaabbaaaabaaaaa
ababababbbbabbbabbbabaaabbaababaaaaabbba
aababaaabaaababbabbbbbbabbabbaabbaaabaaa
ababaabbbaabbababbbaaabbbaababbbabaaaaba
abababbaaababababaaabbbabbbaaaab
aabaaabbaaaaaaabbabbabba
baaabbbababbbabbaaababbb
babbaaababbbabaabbbbbbba
bbabaaabbbabbbbbaabaabab
abababaabaabbababbbaabbb
aaabbabbaabbaaabababbbabaababaabaaaaabba
bbababbaabababbbbabbaaba
baaaabbabaabbaaabbbaabaaababbaaaaabbbaaa
aaaabbbaaabbbbbabaaabbaaaaababbabababaaaabaabbabbbbaaaabaababaab
bbabbbbbababaabababbbbbaabbbaabb
abaabbababbabbaabbaabbbabbbaaaabbbbbaaab
aabbaabbabbbbabbbbabbbaaabbbabbbabbbbabbaaaaabaa
bbabaaaabaaabbbabbbabababaabbbbaabaaaaabbaababbaabbaaaba
abbaababbbbbaaaabbbbaabbbbabbbabbaaabaabbabaababbbbaaaaa
aaaabababbaabbaabbbbbbabbabbaabb
baaaaabaaaaaaaababaababbaabababaabbbbaaa
abbabababbaaaaaabbaaabba
aaaabbbaabaabaababaabbabbaabaaaabababaaabaababbaaaaabababbaabaababaabaab
babbbabbbbbbbabbbbbbbaaa
abaaababbbabbabaabbbbabbbaaababaaaaabaaaaaabaabaabbbabbababaaabbbaabbbbaabbbabbb
bbabaabababbbaabbaabbababbaabbbbabaaaaaaaaabbaabbabbbbbb
aabbbbbbaabbabbbbbbaaabababbabaaaaabaaaa
bbbabbbaaababbaabaaababbbaaabaabbaaabaab
baabbaaaaaabbbbabbabaabaaaaabbbbbbbbbaba
abbabaabbababbabbbbabaab
abbabaabaabbbbbaaabaaabbbaabaaaa
aaaaababbaabaaabaabbabbbbbaabaabbabbababaababbab
aaaaabbbabbabbbabaaaaabb
aabbabbbbabbbaabaabbbbbbbbabbaaabaaaabbbbbabbaabbbaaabbbababbbba
bbbbababbbaaababaababbab
abbbaabababaabbaaababbba
bbbbbbababbbaabaabbbbabbbabbbaba
bbabaaaabbaabbbbabbbaabb
baaaabbababbaababbbbaaaabbaaabaabbaaaabababaaabaaabababb
bbabbaaaaabaaabbbbabbaba
bbaabbbbabaababbbbaaaaba
babababbabaababbabbbabab
bbabaaaabbbbbaabbaababaabaaaaaabbabaababaababbbaababbaaa
aaababbaaabababaabababbaabbabaaa
bbaabaabaabaabaaabbbaaabbbaabaabbbbbbbbaabbbaabbabaaaabb
baaaaabaaaaababababbabbbaabbbbaabbbbabbbbbaaababbaaabaab
baaaabbbababaabababababa
abbbbaaababbbaaabbabaabbaaabbabaabbabaaabbbbabbaabaabbababbbbbaabaabaababbaaabaababbbabb
babbbbbaabbababaabababaaaaaaaabbaabaaabbababbbbaabaabbbaababbaba
aaaaaabbbabbbbbaaabababaabaaabba
aabaaabbaaabbbbababbbaaa
abaabbbbaabbbbabbbbbbaba
abbbaaabaaaaababbbbbbbabbbbabaabaaaabaaa
bbbaaabaababaaaaabaaabaa
bbaaabbbbaabbbabbbbbabbaabaaaaba
abababbabbabbbbbabbaaaba
abbaabababbaaabbbabbaaaa
abaabaaaabaaabbbaababaab
baaabbbabbabbabbaabaaaab
bbaabbabaababbbbbabaabbbababaaabaabbbbabaababaaabaabbabbababaaab
bababbbbbbababbabbbabbaa
aabaabaaaaaaabaaaabaabbb
abbbaaababaabaaaabbabbbaabbbaaaabaabaaaa
aaaaaaaaaaaabaabbaabbbabababbaabaaabbabb
bbbabbbbbabaabbaabbbbaab
aabbabbbbababbabbaabaaba
bbabbbbbbbabaabbaaaabbab
aaaaababaabbbbabbabbaaba
bbbabbbaaabaaabbaaaababaaaabaaaaaabababb
bbbbabababaabaabbabaabbabbbabbabbabbbbbb
aababaaaaaabbbbbaabbabab
abbbabbabaaaaabbbaaaaaaabbabbabaaabbaabbbbaaaabbbbaababbabaaababbababbbb
bbaabbbaaabababaaaaaababbbbababaabbababbababbaaaaaaaaaabbabaababbbaaababbbabbaaa
aaaaabbbaababbaababababbbabbbbbababababa
aabbbbbbabaabaaabaaaabbbaabbbaaaaaabbbbb
bbbbbabbbaabaaabbababbbbbbbaaabaaabaaabaaababbbbbabbabbaabbaabbb
aabbaaaaaabbbbabaababaaaabbababbaaababbb
aabaabbbabbaabbabababaaaabbaabbbabaaabaa
aaababbabbabaabaabababaaaaabababbbbbabbabbbbaaaa
abbbabbaabbaabaabbabababbbbababaabbbbaaa
baaabbbaaabbabbbabbbbabaabababaabbaabaabbbbbaabb
bbbabbbbabbaabaaabbbabaaaabababaaaaaaabbbbaabaaa
abaaabbbbbbbbabbaaaaababbababaabaabaaabbababbaaabaabbbaa
aaabababbbabaaabababaaaababbbaba
aabbaabbbaabbbaaabaaaabb
abbababaaabbaaaaaaaaaaabbbabbbaabababbababaaaaaa
aaaababbbbbabbbbaaabababbbbaaabaabbababb
bbbabaaaabbbbabbabbbbababbaaabba
abaaabbbbababbababbabbaabbaaabaababbbaaa
abababaaabaaabbaababbbbb
ababaaaaaabaabaababbbbbaaababaab
abbaabaaaaaaaabbbbabaababbaaaaaabbbabaaabbabbbbabbabbbabbbabbaba
baabbaaaaaaabbbbababbabb
aababaaaabababbabaaaaabaababaabaababaabbaabbbaaababbbbaa
bbababbbababbbbaaabbbaab
baaabbbbbbbbbabaabaabbbbababaababbaabaabaabbababaaababbaabbaabbaaababaaabbabaaabbbabaaaa
aaaaabbabbaaaaaababaaabaabaaababababbbaaaabbbaaaabbaabaaabababab
bbaabbaabbabbbaaaaaaabbbbaabaaababbbbaaababaabbbbabaabab
bbbbabababbabbbbaaaababaabbaabba
bbbaababbabababbababaabaaaabbbaaaabbbaab
bbabaabbbabaaaabbabbbabbbbbbbaaaaaabaaaa
abbababbbabaabbaabbbbaaa
baabaaaaaaababbaabbbaaaaabbbaaababbabbbbabbbbbbaabbbabba
aabbababaaabaaaabbbaaaaaabbbbaab
bababbbaabaabaaabaababba
bbbaaabbbbbbaabaabbbbbab
bbbbabbbbaaaaabbbbaabbab
bbbabbbababbbabbbabbabab
abaabaaababaabbabbbbbabbbbbbabababbbbbbb
ababaababaabbaaabaaaabbbbabaaaabbbbbabbbaababbabaabbbabb
aaaabababaabbabababababa
baababaabbbbbbabbaabbaab
abababaaabbbabbaaaabaaabaaaaaaaa
bbaabbbbaabbabbaabbbaababbbaabaaaabaaaba
babababaaaabbbbbaaabbbbabbaabaaabaaaabbbababbbbaababbababbaaaaab
bbbaabaaabbabbaabbaabaaa
babbaabbbabaabababbaabaabaabaabbaabbabbbaaaabaabbbbbbbbbaaabaaababaaaaaabbbbaaaabbbabaaa
babbbbbaaabaaabbaabaaaab
bababbababaaabbaabbaabbb
bbaabbbbaaaaabaaabbabbbbbbbbbaaa
bababbabbbabbbbbabbbbabbabababbaaabbaaabbbaaabbabaaaababbbbaaaabbbabbbab
bbaabaabaaababaabbbbbbbb
bbaabbaaaabbaabaabbabbaabaaabbbaaaabbabbbabbbaba
bbbababbbbbbaababbbaabbbbaababba
bababbababababbabbaaabab
aaabababbbaabbbbbbabbbba
bbbabbbaaaababaaabbbbabbbbabbabbabbbbaab
aaabababababaaaaaabaaaab
abbbaaabbbbbbaabaaaaabba
abbaaabbbaababaabaabbaab
aabaabaaabbaaaabbaababaaaabaaabbabbabaaa
abbabaabbbbbbaabbbbbabaaabbbabbbabbaaaaa
aaaaababaaaaaaabbbaababbbbaabaabaaaaaabbaabaaaabbaabbabb
abbbabbaaaabbabaaaabaabb
bbabbabbbbbbbbaaabaaabbbbabaaaaa
aaaaabbbabaabbbbbbbaaaabbabbbbbbbabbaababbbbabba
babbbaabbabbbbbabbabbaab
abaaaaaabbbaabbaaaabaabaaaabbbbabbbbbbaabbababaaabbbaabbbbaabaaabaababaaababbbab
aabaaababbaabbbbabbaabbaabbaabbb
abbaaaabaaaaaabbaabbbbbbabababbaabbbbababbaabbabbaabaaba
baababaabaaaaababbaaaaba
abbabbaabaaababaabbbbbbaabbabababbabaaabaaaabbab
abaaaaaaabbabababaaaaabbaaaaaaabaaababbbbbaaaaaababaaaabbabbbaaabaaabbabbaaaabbbabbbbbbb
bbbababbbaaababaabbaabba
abababbbbbabaaaaaaabbaab
baaabababbbaaabaaabaaabbababbaba
abaaabbabaabbbbaabbbaabbabbaaabbababbaababbbbbbaabaaabababbabaab
bbaaaaaaaabbaababaabaaaa
bbbbbbababaaabbaabbbabaaaaaabbaaaaaaabaabbbbabba
bbbbbbaaabbababababbbbbababbbaabababaaab
baaabbabbaaaaababababbbbabbababaabbaaaaaababaaabaabbababaaabbababbababab
babaaabbbaaabbaabbbabbbbbaabbaabaababbab
bbaababbaaaabababbaaabbb
aaaabbbbbaabaaababaaaaaa
abbbabaaaabaaababbaaaaaabbbbbbabbaabaaababbbbaabaabaaaaaaabaaaab
aabbbbbbaaabbbaaababbaba
abbbbabbabbabbbbaaaabbbbaabbbaba
bbbbabaaaaaaaabbbbaaabab
bbbaaabababbbaabbabbabbbabaabbba
babaababbabbbaabbabbbbbabbaabbaabbbbbabaabbbaabababaaabb
bbababbaabbababbaabaabbb
bbaabbaaaababaaababaabbaabbbabaabaabbbbbaaabbaba
abaabbbbbaababaabaaaabab
bbabbaaaaabbaababbaababa
bababbbaabbabbababbbbaababababbaababbbbaaaabbbba
abababbbbaaabababaaaabbabbaaabaa
aabbaababaabbababbaabbbbaabbabbabaabbabbbbaabbab
aaaaabaaabaaabbbaababbaaababbabaabbaaaba
bbaabbbaaabbbbbaababababaaababaaabbbabbabbabbababbbbababbabbbabaaabaaaba
abbabbbbaabaabaaaaaabaaa
bbbaababbbbbabaabbaaaaba
aabbabbbbabaaabbaaababbababbbbbb
bbbbabbbbbbaaabaabbaaaba
aaabbabbbbbababbbbaabaabbbbabbaaabbbbbbbabababababbabbbbabbabaabbbbbbababaababaabbbaaabbabbbabba
bbbbabababbabaabbaaaaabbbbbabbabaabbabbbababababbabaabab
bbaaaaaabaabaaabaaababaabbbaaabbaababaaabababaabaabaabbaaaabaabb
abaaabbabbaaaaaabbbabbabbbbaaaabaababbab
bbbaabaaabbaababbbbaabaabbabababababbaab`;

// input = `0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"

// ababbb
// bababa
// abbbab
// aaabbb
// aaaabbb
// `;

let inputParts = input.split('\n\n');
let rules = inputParts[0].split('\n');
let messages = inputParts[1].split('\n');

let ruleMap = new Map();
rules.forEach((rule) => {
	let parts = rule.split(':');
	ruleMap.set(parts[0], parts[1].trim().replace(/"/g, ''));
});

function translateRule(rule, ruleMap) {
	let options = rule.split('|');
	if (options.length > 1) {

	} else {
		let parts = rule.split(' ');
		if (parts.length > 1) {

		} else {
			if (parseInt(rule, 10)) {
				return ruleMap.get(rule);
			} else {
				return rule;
			}
		}
	}
}

function doIt(solutionList, ruleMap) {
	solutionList.forEach((solution, solutionIndex) => {
		let solutionArr = solution.split(' ');
		for (let i = 0;i < solutionArr.length;i++) {
			let rule = solutionArr[i];
			if (rule != 'a' && rule != 'b') {
				let replacementRule = ruleMap.get(rule);
				if (replacementRule.indexOf('|') > -1) {
					let options = replacementRule.split('|');
					let solutionArr2 = [...solutionArr];
					solutionArr[i] = options[0].trim();
					solutionArr2[i] = options[1].trim();
					solutionList[solutionIndex] = solutionArr.join(' ');
					solutionList.push(solutionArr2.join(' '));
					return doIt(solutionList, ruleMap);
				} else {
					solutionArr[i] = replacementRule;
					solutionList[solutionIndex] = solutionArr.join(' ');
					return doIt(solutionList, ruleMap);
					// return solution;
				}
			}
		}
	});
	return solutionList;
}

let solutionList = [ruleMap.get('0')];

let possiblesolutions = doIt(solutionList, ruleMap);

let sum = 0;

messages.forEach((message) => {
	message = message.split('').join(' ');
	log(message, possiblesolutions);
	if (possiblesolutions.indexOf(message) > -1) {
		sum++;
	}
});

log(sum);



































