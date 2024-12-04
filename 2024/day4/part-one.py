import re
total = 0


def count(arr):
    matches = 0
    for line in arr:
        str = ''.join(line)
        for match in list(re.finditer('XMAS', str)):
            matches += 1
        for match in list(re.finditer('SAMX', str)):
            matches += 1
    return matches


file = open("input.txt", "r")
# file = open("example.txt", "r")
rows = file.readlines()
for index, item in enumerate(rows):
    rows[index] = list(item.strip())
total += count(rows)
rotated = zip(*rows[::-1])
total += count(rotated)

# rotate 45 degrees right
rotated = []
for row in range(len(rows)):
    # print(row)
    cursorRow = row
    cursorCol = 0
    rowArray = []
    while cursorRow >= 0 and cursorCol <= row:
        # print(cursorRow, cursorCol)
        rowArray.append(rows[cursorRow][cursorCol])
        cursorRow -= 1
        cursorCol += 1
    # print(rowArray)
    if len(rowArray) > 0:
        rotated.append(rowArray)
for col in range(len(rows[0])):
    cursorRow = row
    cursorCol = col + 1
    rowArray = []
    while (cursorRow >= 0 and cursorCol < len(rows[0])):
        # print(cursorRow, cursorCol)
        rowArray.append(rows[cursorRow][cursorCol])
        cursorRow -= 1
        cursorCol += 1
    # print(rowArray)
    if len(rowArray) > 0:
        rotated.append(rowArray)
# print(rotated)
total += count(rotated)

# print('=======================')

# rotate 45 degrees left
rotated = []
for row in range(len(rows)):
    # print(row)
    cursorRow = row
    cursorCol = len(rows[0]) - 1
    rowArray = []
    while cursorRow >= 0 and cursorCol >= 0:
        # print(cursorRow, cursorCol)
        rowArray.append(rows[cursorRow][cursorCol])
        cursorRow -= 1
        cursorCol -= 1
    # print(rowArray)
    if len(rowArray) > 0:
        rotated.append(rowArray)
for col in range(len(rows[0])):
    cursorRow = row
    cursorCol = len(rows[0]) - 2 - col
    rowArray = []
    while (cursorRow >= 0 and cursorCol >= 0):
        # print(cursorRow, cursorCol)
        rowArray.append(rows[cursorRow][cursorCol])
        cursorRow -= 1
        cursorCol -= 1
    # print(rowArray)
    if len(rowArray) > 0:
        rotated.append(rowArray)
# print(rotated)
total += count(rotated)
print(total)
file.close()
