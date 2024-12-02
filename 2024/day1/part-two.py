leftList = []
rightList = []
file = open("input.txt", "r")
for line in file.readlines():
    parts = line.split()
    leftList.append(int(parts[0]))
    rightList.append(int(parts[1]))
file.close()
total = 0
for listItem in leftList:
    multiplier = rightList.count(listItem)
    total = total + (listItem * multiplier)
print(total)
