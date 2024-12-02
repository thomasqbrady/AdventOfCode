leftList = []
rightList = []
file = open("input.txt", "r")
for line in file.readlines():
    parts = line.split()
    leftList.append(int(parts[0]))
    rightList.append(int(parts[1]))
file.close()
leftList.sort()
rightList.sort()
total = 0
for index, listItem in enumerate(leftList):
    diff = abs(leftList[index] - rightList[index])
    total = total + diff
print(total)
