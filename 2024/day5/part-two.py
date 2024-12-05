total = 0


def scan(baddies, repaired):
    while len(baddies) > 0:
        for updateIndex, badUpdate in enumerate(baddies):
            isValid = True
            for updatePageIndex in reversed(range(len(badUpdate))):
                updatePage = badUpdate[updatePageIndex]
                if updatePage in ruleDict.keys():
                    updatePageRules = ruleDict[updatePage]
                    for updatePageRule in updatePageRules:
                        if updatePageRule in badUpdate:
                            foundAt = badUpdate.index(updatePageRule)
                            if foundAt < updatePageIndex:
                                isValid = False
                                page = badUpdate[foundAt]
                                badUpdate.remove(page)
                                badUpdate.insert(updatePageIndex, page)
            if isValid:
                updateToMove = baddies[updateIndex]
                baddies.remove(updateToMove)
                repaired.append(updateToMove)
    return repaired


file = open("input.txt", "r")
# file = open("example.txt", "r")
rows = ''.join(file.readlines())
parts = rows.split('\n\n')
rulesArr = [rule.split('|') for rule in parts[0].split('\n')]
ruleDict = {}
baddies = []
middles = 0
for rulePair in rulesArr:
    if rulePair[0] in ruleDict.keys():
        ruleDict[rulePair[0]].append(rulePair[1])
    else:
        ruleDict[rulePair[0]] = [rulePair[1]]
updates = [update.split(',') for update in parts[1].split('\n')]
for updateIndex, update in enumerate(updates):
    passes = True
    for updatePageIndex, updatePage in enumerate(update):
        if updatePageIndex > 0 and updatePage in ruleDict.keys():
            updatePageRules = ruleDict[updatePage]
            for updatePageRule in updatePageRules:
                if updatePageRule in update:
                    foundAt = update.index(updatePageRule)
                    if foundAt < updatePageIndex:
                        passes = False
    if not passes:
        baddies.append(update)
finalList = scan(baddies, [])
for updateSet in finalList:
    middles += int(updateSet[int((len(updateSet)-1)/2)])
print(middles)
file.close()
