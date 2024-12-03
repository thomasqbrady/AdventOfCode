import re
total = 0
file = open("input.txt", "r")
# file = open("example.txt", "r")
for line in file.readlines():
    working = re.findall(r'mul\((\d+,\d+)\)', line)
    for pair in working:
        # print(pair)
        parts = pair.split(',')
        total += int(parts[0]) * int(parts[1])
print(total)
file.close()
