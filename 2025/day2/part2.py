total = 0
invalidIDs = []
# file = open("example.txt", "r")
file = open("input.txt", "r")
ranges = file.readlines()[0].split(",")
file.close()


def isInvalidID(id):
    strID = str(id)
    # print(f"Checking ID: {strID}")
    length = len(strID)
    for tokenLength in range(2, length+1):
        token = strID[:length//tokenLength]
        # print(f"Is it this?: {token * tokenLength}")
        if token * tokenLength == strID:
            # print(f"Found invalid ID: {strID}")
            return True
    return False


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
