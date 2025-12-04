total = 0
invalidIDs = []
# file = open("example.txt", "r")
file = open("input.txt", "r")
ranges = file.readlines()[0].split(",")
file.close()


def isInvalidID(id):
    strID = str(id)
    middle = len(strID) // 2
    firstHalf = strID[:middle]
    secondHalf = strID[middle:]
    return firstHalf == secondHalf


for i, _range in enumerate(ranges):
    start, end = _range.split("-")
    startInt = int(start)
    endInt = int(end)
    for id in range(startInt, endInt + 1):
        if isInvalidID(id):
            invalidIDs.append(id)
for invalidID in invalidIDs:
    total += invalidID
print(total)
