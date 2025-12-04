import re
import copy

directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
]


class Traveler:
    x = -1
    y = -1
    visited = {}
    startedAtX = -1
    startedAtY = -1
    path = ""


def hike():
    print('traveler count', len(travelers))
    traveler = travelers.pop(0)
    print('hiking on', traveler.x, traveler.y)
    traveler.visited[str(traveler.x) + ':' + str(traveler.y)] = 1
    traveler.path += " " + str(traveler.x) + ':' + str(traveler.y) + " "
    mapWidth = len(topoMap[0])
    mapHeight = len(topoMap)
    for direction in directions:
        # print('direction', direction)
        toX = traveler.x + direction[0]
        toY = traveler.y + direction[1]
        toStepStr = str(toX) + ':' + str(toY)
        if toStepStr not in traveler.visited:
            if toX >= 0 and toX < mapWidth and toY >= 0 and toY < mapHeight:
                if abs(int(topoMap[toY][toX]) - int(topoMap[traveler.y][traveler.x])) == 1:
                    if topoMap[toY][toX] == '9':
                        pathStr = str(traveler.startedAtX) + ':' + str(traveler.startedAtY) + '::' + \
                            str(toX) + ':' + str(toY)
                        traveler.path += " " + str(toX) + ':' + str(toY) + " "
                        print('got to the peak', traveler.path)
                        if not pathStr in paths:
                            paths[pathStr] = 1
                    else:
                        newTraveler = copy.deepcopy(traveler)
                        newTraveler.x = toX
                        newTraveler.y = toY
                        print('moving to', toX, toY)
                        travelers.append(newTraveler)
                # else:
                    # print('dead end at', toX, toY)
            # else:
                # print('off the map at', toX, toY)
        else:
            print('been to', toX, toY)


file = open("example.txt", "r")
# file = open("input.txt", "r")
topoMap = []
travelers = []
paths = {}
for row in file.readlines():
    topoMap.append(list(row.strip()))
for ri, row in enumerate(topoMap):
    for ci, col in enumerate(row):
        if col == '0':
            traveler = Traveler()
            traveler.x = ci
            traveler.y = ri
            traveler.startedAtX = ci
            traveler.startedAtY = ri
            travelers.append(traveler)

while len(travelers) > 0:
    hike()
print(paths)
print(len(paths.keys()))
file.close()
