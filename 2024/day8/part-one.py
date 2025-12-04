total = 0
# file = open("example.txt", "r")
file = open("input.txt", "r")


def drawLine(start, end):
    if start[0] < end[0]:
        lineStr = "" + str(start[0]) + ":" + str(start[1]) + \
            "," + str(end[0]) + ":" + str(end[1])
        found = lines.get(lineStr)
        if found:
            return found
        else:
            lines[lineStr] = True
    else:
        lineStr = "" + str(end[0]) + ":" + str(end[1]) + \
            "," + str(start[0]) + ":" + str(start[1])
        found = lines.get(lineStr)
        if found:
            return found
        else:
            lines[lineStr] = True
    rise = end[1] - start[1]
    run = end[0] - start[0]
    antinode = (end[0] + run, end[1] + rise)
    if (antinode[0] >= 0 and antinode[0] < mapWidth and antinode[1] >= 0 and antinode[1] < mapHeight):
        # print(start, end, antinode)
        antinodes.append(antinode)
    antinode = (start[0] - run, start[1] - rise)
    if (antinode[0] >= 0 and antinode[0] < mapWidth and antinode[1] >= 0 and antinode[1] < mapHeight):
        # print(start, end, antinode)
        antinodes.append(antinode)


def findPairs(list, index):
    anchor = list[index]
    rest = list[:index] + list[index + 1:]
    for target in rest:
        riseRun = drawLine(anchor, target)


antinodes = []
antennaMap = [list(row.strip()) for row in file.readlines()]
antennaDict = {}
lines = {}
mapWidth = len(antennaMap[0])
mapHeight = len(antennaMap)
for ri, row in enumerate(antennaMap):
    for ci, col in enumerate(row):
        if col != '.':
            found = antennaDict.get(col)
            if not found:
                antennaDict[col] = []
            antennaDict[col].append([ci, ri])

for freq in antennaDict.keys():
    # print(freq)
    for index in range(len(antennaDict[freq])):
        findPairs(antennaDict[freq], index)
    # print(len(set(antinodes)), set(antinodes))
print(len(set(antinodes)))
file.close()
