import re


def simplify(val):
    lastCharIndex = len(val) - 1
    if val == '.':
        return val
    else:
        return val[lastCharIndex]


def findSegment(endIndex):
    segmentWidth = 0
    while bmapStr[endIndex] == '.':
        endIndex -= 1
    segmentCharacter = bmapStr[endIndex]
    while bmapStr[endIndex] == segmentCharacter:
        endIndex -= 1
        segmentWidth += 1
    return [endIndex, segmentWidth]


total = 0
file = open("example.txt", "r")
# file = open("input.txt", "r")
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
# print(blockMap)
bmapStr = ''.join(list(map(simplify, blockMap)))
# print(bmapStr)
segmentWidth = 0
endIndex = len(bmapStr) - 1
while endIndex > 0:
    [endIndex, segmentWidth] = findSegment(endIndex)
    # print(endIndex, segmentWidth, bmapStr[endIndex])
    searchString = r"\d\.{" + re.escape(str(segmentWidth)) + "}"
    # print('searchString', searchString)
    thing = re.search(searchString, bmapStr)
    if thing != None:
        startIndex = thing.start() + 1
        if startIndex < endIndex:
            for i in range(segmentWidth):
                character = blockMap[i + endIndex + 1]
                blockMap[i + endIndex + 1] = '.'
                blockMap[startIndex + i] = character
    bmapStr = ''.join(list(map(simplify, blockMap)))
    print(bmapStr)
# print(blockMap)
print(bmapStr)
total = 0
for index, character in enumerate(bmapStr):
    if character != '.':
        total += int(character) * index
print(total)
file.close()
