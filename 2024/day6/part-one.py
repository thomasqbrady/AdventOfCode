total = 0
file = open("input.txt", "r")
# file = open("example.txt", "r")
pos = (0, 0)
map = [list(row.strip()) for row in file.readlines()]
for rowIndex, row in enumerate(map):
    if "^" in row:
        pos = (row.index("^"), rowIndex)
mapHeight = len(map)
mapWidth = len(map[0])
heading = 0
directions = [
    (0, -1),
    (1, 0),
    (0, 1),
    (-1, 0)
]
breadcrumbs = []


def turn():
    global heading
    heading += 1
    if heading == len(directions):
        heading = 0


def move():
    global pos
    # print('moving from', pos)
    breadcrumbs.append(pos)
    x = pos[0]
    y = pos[1]
    x += directions[heading][0]
    y += directions[heading][1]
    if map[y][x] == '#':
        # print('obstacle at', x, y)
        # print('turned from heading', heading)
        turn()
        # print('to', heading)
    else:
        pos = (x, y)
        # print('to', pos)
        if x == mapWidth-1 or x == 0 or y == mapHeight-1 or y == 0:
            print('escaped', x, y)
            breadcrumbs.append(pos)
            return True
        else:
            return False


escaped = False
while not escaped:
    escaped = move()
print(pos)
print(len(list(set(breadcrumbs))))
file.close()
