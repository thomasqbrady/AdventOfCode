import re
total = 0
instructions = ""
file = open("input.txt", "r")
# file = open("example2.txt", "r")
for line in file.readlines():
    instructions += re.sub('\n', '', line)
print(instructions)
repaired = re.sub(r'don\'t\(\).*?do\(\)', '', instructions)
print('######')
print(repaired)
pairs = re.findall(r'mul\((\d+?,\d+?)\)', repaired)
for pair in pairs:
    print(pair)
    parts = pair.split(',')
    total += int(parts[0]) * int(parts[1])
print(total)
file.close()
