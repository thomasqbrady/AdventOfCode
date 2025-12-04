import re

total = 0
# file = open("example.txt", "r")
file = open("input.txt", "r")
diskMap = file.readline().strip()
blockMap = []
numFilesFound = 0
for index, detail in enumerate(diskMap):
    count = int(detail)
    cursor = '.'
    if index % 2 == 0:
        cursor = str(numFilesFound)
        numFilesFound += 1
    for i in range(count):
        blockMap.append(cursor)
print(blockMap)
try:
    match = blockMap.index('.')
except ValueError:
    match = -1
endIndex = len(blockMap) - 1
while match >= 0 and match < endIndex:
    firstFreeSpace = match
    character = blockMap[endIndex]
    blockMap[endIndex] = '.'
    blockMap[firstFreeSpace] = character
    try:
        match = blockMap.index('.')
    except ValueError:
        match = -1
    endIndex -= 1
    print(''.join(blockMap))
# print(blockMap)
total = 0
for index, character in enumerate(blockMap):
    if character != '.':
        total += int(character) * index
print(total)
file.close()
